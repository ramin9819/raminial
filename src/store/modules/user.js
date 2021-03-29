export default {
  namespaced: true,
  state() {
    return {
      posts: null,
      user: {},
      selectedUserPosts:null,
      selectedUser:{},
      isFollowed:false,
      followers:null
    };
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getIsFollowed(state){
      return state.isFollowed
    },
    getPosts(state) {
      return state.posts;
    },
    getSelectedUserPosts(state){
      return state.selectedUserPosts
    },
    getSelectedUser(state){
      return state.selectedUser
    },
    getuserFollowersNum(state){
      return state.followers
    }
  },
  mutations: {
    setProfile(state, payload) {
      state.posts = payload.posts;
      state.user = payload.user;
    },
    setUserProfile(state,payload){
      state.selectedUser=payload.user
      state.selectedUserPosts=payload.posts
      state.followers=payload.followers
    },
    setIsFollowed(state,payload){
      state.isFollowed=payload
    }
  },
  actions: {
    async addPost(context, payload) {
      const token = context.rootGetters["auth/getToken"];
      console.log(token);
      const response = await fetch("http://localhost:3000/add-post/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || "couldn't fetch");
        throw error;
      }
      console.log(responseData);
    },
    async deletePost(context, payload) {
      const token = context.rootGetters["auth/getToken"];
      const response = await fetch(
        `http://localhost:3000/delete-post/${payload}`,
        {
          method: "DELETE",
          headers:{
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || "couldn't fetch");
        throw error;
      }

      console.log(responseData.message);
      context.dispatch('getProfile')
    },

    async getProfile(context) {
      const token = context.rootGetters["auth/getToken"];
      const response = await fetch("http://localhost:3000/profile", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || "couldn't fetch");
        throw error;
      }
      console.log(responseData.message);
      context.commit("setProfile", responseData);
    },
    async changeName(context, payload) {
      const user = context.state.user;
      user.name = payload;
      const token = context.rootGetters["auth/getToken"];
      const response = await fetch("http://localhost:3000/edit-profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || "couldn't fetch");
        throw error;
      }
      localStorage.setItem("name", payload);

      console.log(responseData.message);
      context.commit("setProfile", {
        user: responseData.user,
        posts: context.state.posts,
      });
    },
    async changeEmail(context, payload) {
      const user = context.state.user;
      user.email = payload;
      const token = context.rootGetters["auth/getToken"];
      const response = await fetch("http://localhost:3000/edit-profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || "couldn't fetch");
        throw error;
      }
      console.log(responseData.message);
      context.commit("setProfile", {
        user: responseData.user,
        posts: context.state.posts,
      });
    },
    async getUserProfile(context,payload){
      const getUserId = context.rootGetters["auth/getUserId"];
      const userId=payload
      const response= await fetch(`http://localhost:3000/user-profile/${userId}`,{
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId:getUserId}),
      })
      const responseData =await response.json()
      
      if (!response.ok) {
        const error = new Error(responseData.message || "couldn't fetch");
        throw error;
      }
      console.log(responseData.message)
      console.log(responseData.isFollowed)
      context.commit('setUserProfile',responseData)
      context.commit('setIsFollowed',responseData.isFollowed)
    },
    async follow(context,payload){
      const token = context.rootGetters["auth/getToken"];
      const userId = payload
      const response= await fetch(`http://localhost:3000/follow-user/${userId}`,{
        method:'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        }
      })
      const responseData= await response.json()
      if (!response.ok) {
        const error = new Error(responseData.message || "couldn't fetch");
        throw error;
      }
      console.log(responseData)
      context.commit('setIsFollowed',responseData.isFollowed)
    }
  },
};
