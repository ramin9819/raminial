<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email"> your E-Mail</label>
        <input type="email" id="email" v-model="email" />
      </div>

      <div class="form-control">
        <label for="password">password</label>
        <input :type="passwordType" id="message" v-model="password" />
        <input type="checkbox" id="showPassword" :onclick="showPassword" />
        <label for="showPassword">show password</label>
      </div>

      <!-- <div class="form-control">
        <h3>login as:</h3>
        <div>
          <input type="radio" id="user" value="user" v-model="type" />
          <label for="user">user</label>
        </div>
        <div>
          <input type="radio" id="writer" value="writer" v-model="type" />
          <label for="writer">writer</label>
        </div>
        <div>
          <input type="radio" id="admin" value="admin" v-model="type" />
          <label for="admin">admin</label>
        </div>
      </div> -->
      <p  v-if="!isValid" class="errors">
        please enter a valid email and passsword
      </p>
      <p v-if="error" class="errors" > {{error}}</p>
      <div class="actions">
        <base-button @submit.prevent="submitForm">Login</base-button>
        <br />
        <p>
          if you don't have a sccount please
          <router-link to="/signup">signup</router-link>
        </p>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      isValid: true,
      password: "",
      email: "",
      // type: null,
      error:'',
      passwordType: "password",
    };
  },
  // created(){
  //   this.email=this.$store.getters['auth/getEmail']
  //   console.log(this.$store.getters['auth/getEmail'])
  // },
  methods: {
    showPassword() {
      if (this.passwordType === "password") {
        this.passwordType = "text";
      } else {
        this.passwordType = "password";
      }
    },
    async submitForm() {
      this.isValid = true;
      if (
        this.password.length < 3 ||
        this.email === "" ||
        !this.email.includes("@")
        // this.type===null
      ) {
        this.isValid = false;
        return;
      }
      this.error=''
      console.log(this.email, this.password);
      //   this.isLoading = true;
      try {
        await this.$store.dispatch("auth/login", {
          email: this.email,
          password: this.password,
        });
        this.$router.replace("/");
      } catch (error) {
        this.error = error.message || "failed";
        console.log(this.error)
      }
      //   this.isLoading = false;
    },
  },
};
</script>

<style scoped>
form {
  width: 30%;
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

input[type="radio"] + label,
input[type="checkbox"] + label {
  font-weight: bold;
  display: inline;
  margin: 0 0 0 0.7rem;
}
input[type="radio"],
input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="radio"]:focus {
  outline: #3d008d solid 1px;
}
.errors {
  font-weight: bold;
  color: red;
}
h3 {
  margin: 1rem 0 0.5rem 0;
}
</style>
