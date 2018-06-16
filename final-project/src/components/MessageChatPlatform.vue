<template>
  <div>
    <div class="container">
      <div class="row">
      <div class="col-lg-3 col-md-3 col-sm-3">
<h1>FRIENDS</h1>
        <ul id="friends" v-if="users && users.length">
          <li v-for="user in users">
            <button v-on:click="receiverSelect(user.username)" class="users">
            <p><strong id="hero">{{user.username}}</strong></p>
            </button>
          </li>
        </ul>
    </div>
      <div class="col-lg-9 col-md-9 col-sm-9">
          <div class="row">
            <div class="container">
              <div id="messages">

              </div>
            </div>
          </div>
        <div class="row">
          <input id="inputMsg" v-on:submit="sendMessage" class="inputBox" size="80" type="text"/>
          <button v-on:click="sendMessage" class="inputBox">Send</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import io from 'socket.io-client'
  import auth from './Authentication'

  let socket= io('http://localhost:3001/')

  localStorage.receiver=''

  socket.on('nextMessage', function(data){
      let node = document.createElement('DIV');
      let textnode = document.createTextNode(data.content);
      node.appendChild(textnode);
      document.getElementById('messages').appendChild(node);
  })

  export default {
    data() {
      return {
        users: [],
        errors: [],
        receiver:'',
        sender:localStorage.username,
        currentRoom:'',
        currentRoom2:'',
        messages: []
      }
    },
    methods: {
      receiverSelect: function (username) {
        this.receiver = username
        localStorage.receiver = this.receiver

        socket.emit('room-info', {roomName: (this.sender+username), roomName2: (username+this.sender)})

        if (this.receiver !== this.sender) {
          //2 rooms due to design of room-name
          console.log('inside')
          this.currentRoom = this.sender + username
          localStorage.currRoom = this.currentRoom
          this.currentRoom2 = username+ this.sender
          localStorage.currRoom2 = this.currentRoom2

          //Clean message board
          let myNode = document.getElementById('messages')
          while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild)
          }
          //Build message history
          for(let i = 0; i<this.messages.length; i++){
              if((this.messages[i].receiver===this.receiver) || (this.messages[i].receiver===this.sender && this.messages[i].sender===this.receiver)){
                  let node = document.createElement('DIV')
                  let textnode = document.createTextNode(this.messages[i].sender+' : '+this.messages[i].content)
                  node.appendChild(textnode)
                  document.getElementById('messages').appendChild(node)
                  }
              }
          }
      },
      sendMessage: function () {
        let msg = document.getElementById('inputMsg')
        socket.emit('message', {content: msg.value, receiver: this.receiver, sender: this.sender, roomName: this.currentRoom, roomName2: this.currentRoom2});
        let node = document.createElement('DIV')
        let textnode = document.createTextNode(this.sender+' : '+msg.value)
        node.appendChild(textnode)
        document.getElementById('messages').appendChild(node)
      }
    },
    // Fetches posts when the component is created.
    created() {
      axios.get('http://localhost:3000/users')
        .then(response => {
          // JSON responses are automatically parsed.
          this.users = response.data
          for(let i=0;i<this.users.length;i++){
            if(this.users[i].username===localStorage.username){
                this.messages = this.users[i].messages
            }
          }
        })
        .catch(e => {
          this.errors.push(e);
        })
    }
  }
</script>

<style>

#friends {
  list-style: none;
}
#friends li:active button{
      background-color: darkseagreen;
    }
  .inputBox{
    border: 3px solid cadetblue;
  }
  .users{
    border: 5px solid black;
    border-radius: 10px;
    margin-top:7px;
  }
  #messages{
    border: 3px solid cadetblue;
  }

</style>
