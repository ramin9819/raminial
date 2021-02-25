export default{
    state(){
        return {}
    },
    getters:{},
    mutations:{},
    actions:{
        async userSignup(_,payload){
            console.log(JSON.stringify(payload))
            const response =await fetch('http://localhost:3000/auth/signup',{
                method:'POST',
                body:JSON.stringify(payload)
            })
            // const responseData= await response.json()
            console.log(response.message)

        }
    }
}