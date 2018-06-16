import Vue from 'vue'
import Router from 'vue-router'
import Authentication from '@/components/Authentication'
import MessageChatPlatform from '@/components/MessageChatPlatform'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Authentication
    },
    {
      path: '/chat',
      name: 'Message Chat Platform',
      component: MessageChatPlatform
    }
  ], mode: 'history'
})
