<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{ invalid: !name.isValid }">
        <label for="name">name</label>
        <input
          type="text"
          id="name"
          v-model.trim="name.value"
          @blur="changevalidity('name')"
        />
        <p v-if="!name.isValid">name can not be null</p>
      </div>
      <div class="form-control" :class="{ invalid: !email.isValid }">
        <label for="email">email</label>
        <input
          type="email"
          id="email"
          v-model.number="email.value"
          @blur="changevalidity('email')"
        />
        <p v-if="!email.isValid">email must valid</p>
      </div>
      <div class="form-control" :class="{ invalid: !password.isValid }">
        <label for="password">password</label>
        <input
          type="password"
          id="password"
          v-model.trim="password.value"
          @blur="changevalidity('password')"
        />
        <p v-if="!password.isValid">password can not be null</p>
      </div>
      <div class="form-control" :class="{ invalid: !repeatPassword.isValid }">
        <label for="repeatPassword">repeatPassword</label>
        <input
          type="password"
          id="repeatPassword"
          v-model.trim="repeatPassword.value"
          @blur="checkPassword('repeatPassword')"
        />
        <p v-if="!repeatPassword.isValid">passwords doesn't match</p>
      </div>
      <div class="form-control">
        <h3>favorite category</h3>
        <category-item
          :categories="getCategories"
          @add-category="addCategory"
        ></category-item>
      </div>
      <base-button>signup</base-button>
    </form>
  </base-card>
</template>

<script>
import CategoryItem from "../../components/auth/CategoryItem";
export default {
  components: { CategoryItem },
  data() {
    return {
      name: {
        value: "",
        isValid: true,
      },
      email: {
        value: "",
        isValid: true,
      },
      password: {
        value: "",
        isValid: true,
      },
      repeatPassword: {
        value: "",
        isValid: true,
      },
      categories: [],
      isValid: true,
    };
  },
  computed: {
    getCategories() {
      return this.$store.getters.getCategories;
    },
  },
  methods: {
    addCategory(value) {
      this.categories = value;
    },
    checkPassword() {
      if (this.password.value != this.repeatPassword.value) {
        this.repeatPassword.isValid = false;
      } else {
        this.repeatPassword.isValid = true;
      }
    },
    changevalidity(input) {
      if (
        this[input].value === "" ||
        !this[input].value ||
        this[input].length < 1
      ) {
        this[input].isValid = false;
      } else {
        this[input].isValid = true;
      }
    },
    validateForm() {
      this.isValid = true;
      if (this.name.value === "") {
        this.name.isValid = false;
        this.isValid = false;
      }
      if (this.email.value === "") {
        this.email.isValid = false;
        this.isValid = false;
      }
      if (this.password.value === "") {
        this.password.isValid = false;
        this.isValid = false;
      }
      if (this.repeatPassword.value !== this.password.value) {
        this.repeatPassword.isValid = false;
        this.isValid = false;
      }
    },
    async submitForm() {
      this.validateForm();
      if (!this.isValid) {
        this.isValid = true;
        return;
      }
      const formData = {
        name: this.name.value,
        password: this.password.value,
        email: this.email.value,
        likedCategory: this.categories,
      };

      console.log(formData);
      try{
      await this.$store.dispatch('auth/userSignup',formData)
      console.log('done')
      this.$router.replace('login')
      }catch(error){
          console.log(error)
      }
    },
  },
};
</script>

<style scoped>
form {
  width: 30%;
}
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid p,
.invalid div label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>