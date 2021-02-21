// import axios from 'axios'
export default {
  namespaced: true,
  state() {
    return {
      posts: [],
      singlePost:{},
      comments:[]
    };
  },
  getters: {
    getPosts(state) {
      return state.posts;
    },
    getPost(state) {
        // console.log(state.singlePost,'getters')
      return state.singlePost;
    },
   
    getComments(state){
      // console.log(state.comments,'getters')
        return state.comments
    }
  },
  mutations: {
    setPosts(state, payload) {
      state.posts = payload;
    },
    setSinglePost(state, payload) {
      // console.log(payload.post, 'setpost')
      state.singlePost = payload.post;
      state.comments=payload.comments
    },
  },
  actions: {
    async setPosts(context) {
      const response = await fetch("http://localhost:3000/", {
        method: "GET",
      });
      // const response=  await axios.get('http://0.0.0.0:3000/')
      const responseData = await response.json();
      if (!response.ok) {
        //error handling
      }
      console.log(responseData.message);
      context.commit("setPosts", responseData.posts);
    },
    async setSinglePost(context, payload) {
      const response = await fetch(`http://localhost:3000/post/${payload}`, {
        method: "GET",
      });
      // const response=  await axios.get('http://0.0.0.0:3000/')
      const responseData = await response.json();
      if (!response.ok) {
        //error handling
      }
      if (!response.ok) {
        const error =new Error(responseData.message || 'failed to fetch')
        throw error
      }
      console.log(responseData.message);
      context.commit("setSinglePost", responseData);
    },
  },
};
