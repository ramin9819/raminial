export default {
  namespaced: true,
  state() {
    return {
      // email:'',
      token: null,
      userName: null,
      userId: null,
      didLogout: false
    };
  },
  getters: {
    // getEmail(state){
    //     return state.email
    // }
    didLogout(state){
        return state.isLogout
    },
    isAuth(state){
        return !!state.token
    },
    getToken(state){
      return state.token
    },
    getName(state){
      return state.userName
    },
    getUserId(state){
      return state.userId
    }
    
  },
  mutations: {
    // signup(state,payload){
    //     state.email=payload.email
    //     console.log(state.email)
    // }
    setUser(state, payload) {
      state.token = payload.token;
      state.userName = payload.name;
      state.userId = payload.userId;
    },
  },
  actions: {
    setUser(context){
      const token = localStorage.getItem('token')
      const UserId=localStorage.getItem('userId')
      const name=localStorage.getItem('name')
      context.commit('setUser',{
        token:token,
        userId:UserId,
        name:name
      })
    },
    async userSignup(context, payload) {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      // const responseData= await response.json()
      if (!response.ok) {
        const error = new Error(response.message || "couldn't fetch");
        throw error;
      }
      //    context.commit('signup',responseData)
    },
    async login(context, payload) {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || "couldn't fetch");
        throw error;
      }
      console.log(responseData.message);
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("userId", responseData.userId);
      localStorage.setItem("name", responseData.name);
      context.commit("setUser", responseData);
    },
    logout(context){
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('name')
        context.commit('setUser',{
            token:'',
            userId:'',
            name:''
        })
    }
  },
};
