import { createStore } from 'vuex'

import postModules from './modules/posts'
import authModules from './modules/auth'

export default createStore({
  
  modules: {
    posts:postModules,
    auth:authModules
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
