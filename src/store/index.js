import { createStore } from 'vuex'

import postModules from './modules/posts'

export default createStore({
  
  modules: {
    posts:postModules
  }
})
