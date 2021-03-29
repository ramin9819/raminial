<template>
    <base-card>
        <form @submit.prevent="submitForm">
      <div class="form-control" :class="{ invalid: !title.isValid }">
        <label for="title">title</label>
        <input
          type="text"
          id="title"
          v-model.trim="title.value"
          @blur="changevalidity('title')"
        />
        <p v-if="!title.isValid">title can not be null</p>
      </div>
      <div class="form-control" :class="{ invalid: !content.isValid }">
        <label for="content">content</label>
        <textarea
          type="content"
          id="content"
          v-model.number="content.value"
          @blur="changevalidity('content')"
          rows="15"
        />
        <p v-if="!content.isValid">content must valid</p>
      </div>
      <div class="form-control">
        <h3>select post category</h3>
        <category-item
          :categories="getCategories"
          @add-category="addCategory"
        ></category-item>
      </div>
      <base-button>add post</base-button>
    </form>
    </base-card>
</template>


<script>
import CategoryItem from "../../components/auth/CategoryItem";
export default {
  components: { CategoryItem },
  data() {
    return {
      title: {
        value: "",
        isValid: true,
      },
      content: {
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
      if (this.title.value === "") {
        this.title.isValid = false;
        this.isValid = false;
      }
      if (this.content.value === "") {
        this.content.isValid = false;
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
        title: this.title.value,
        content: this.content.value,
        category: this.categories,
        imageUrl:"image/1.jpg",
      };

      console.log(formData);
      try{
      await this.$store.dispatch('user/addPost',formData)
      console.log('done')
      this.$router.replace('/')
      }catch(error){
          console.log(error)
      }
    },
  },
};
</script>

<style scoped>

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