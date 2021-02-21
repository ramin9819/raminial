<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email"> your E-Mail</label>
        <input type="email" id="email" v-model="email" />
      </div>

      <div class="form-control">
        <label for="password">password</label>
        <input id="message" v-model="password" />
      </div>

      <div class="form-control">
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
      </div>
      <p class="errors" v-if="!isValid">
        please enter a valid email and passsword
      </p>
      <div class="actions">
        <base-button>Login</base-button>
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
      type: null,
    };
  },
  methods: {
    submitForm() {
      this.isValid = true;
      if (
        this.password.length < 3 ||
        this.email === "" ||
        !this.email.includes("@")||
        this.type===null
      ) {
        this.isValid = false;
        return;
      }
      console.log(this.email, this.password, this.type);
      //   this.isLoading = true;
      //   try {
      //     if (this.mode === "login") {
      //       await this.$store.dispatch("login", {
      //         email: this.email,
      //         password: this.password,
      //       });
      //     } else {
      //       await this.$store.dispatch("signupUser", {
      //         email: this.email,
      //         password: this.password,
      //       });
      //     }
      //     const url = this.$route.query.url || "coaches";
      //     this.$router.replace(url);
      //   } catch (error) {
      //     this.error = error.message || "failed";
      //   }
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

input[type='radio'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.7rem;
}
input[type='radio'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='radio']:focus {
  outline: #3d008d solid 1px;
}
.errors {
  font-weight: bold;
  color: red;
}
h3{
    margin: 1rem 0 0.5rem 0 ;
}
</style>