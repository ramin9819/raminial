import { createStore } from 'vuex'

import postModules from './modules/posts'
import authModules from './modules/auth'
import userModules from './modules/user'

export default createStore({
  
  modules: {
    posts:postModules,
    auth:authModules,
    user:userModules
  },
  state(){
    return {
      categories:['tech','sport','stock','programming','food','comedy','funny','game']
    }
  },
  getters:{
    getCategories(state){
      return state.categories
    }
  }
})
