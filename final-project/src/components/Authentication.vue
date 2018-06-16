<template>
  <div id="auth">
    <img src="../assets/logo.png">
    <div class="hello">
      <div>
        <h1>User Authentication</h1>
      </div>
      <div>
        <span>
      <div class="auth">
      <label><strong>Username</strong></label>
        </div>
      <div><input id="username" type="text"/>
        </div>
    </span>
        <span>
      <div class="auth">
      <label><strong>Password </strong></label>
        </div>
      <div><input id="password" type="password"/>
        </div>
    </span>
        <div style="margin-top: 20px">
          <div>
          <button v-on:click="submitLogin" id="login" class="btn btn-primary">Login</button>
        </div>
          <div style="margin-top: 15px">
          <button v-on:click="register" id="register" class="btn btn-primary">New User?  Register</button>
        </div>
        </div>
      </div>
      <div id="authFailed" class="alert-danger"></div>
      <div id="warning"><p><strong>Disclaimer :</strong>
        We do not hash your passwords. <strong>MUHAHAHAHAHA !!!</strong></p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import router from '../router'

  export default {
      methods: {
      register : function(){
        let username = document.getElementById("username").value
        let password = document.getElementById("password").value

        axios.post('http://localhost:3000/users/register', {
          username: username,
          password: password
        })
          .then(response => {
            localStorage.setItem('username', username)
            router.push('/chat')
          })
          .catch(e => {
            this.errors.push(e);
          })
      },
      submitLogin : function(){
        let resultElement = document.getElementById("authFailed")
        let username = document.getElementById("username").value
        let password = document.getElementById("password").value

        axios.post('http://localhost:3000/users/login', {
          username: username,
          password: password
        })
          .then(response => {
            if(!response.data.length >0){
              resultElement.style.display = "block"
              resultElement.innerHTML = "Sorry, this Username and Password does not match our records!\nPlease try again."
            }
            else {
              resultElement.style.display = "none"
              localStorage.setItem('username', username)
              router.push('/chat')
            }
          })
          .catch(e => {
            this.errors.push(e);
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #warning {
    margin-top: 120px;
  }

  #button {
    margin-top: 30px;
  }

  .auth {
    margin-top: 25px;
  }

  #authFailed{
    margin-top: 20px;
    border-radius: 20px;
  }
</style>
