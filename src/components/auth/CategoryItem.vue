<template>
  <div class="categories">
    <div v-for="category in categories" :key="category" class="category">
      <input
        type="checkbox"
        :id="category"
        :value="category"
        @click="addCategory(category)"
      />
      <label :for="category">{{ category }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: ["categories"],
  emits: ["add-category"],
  data() {
    return { cate: [] };
  },
  methods: {
    addCategory(value) {
      this.cate.push(value);
      this.$emit("add-category", this.cate);
    },
  },
};
</script>

<style scoped>
input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0rem;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

.category {
  display: inline-block;
  padding-right: 1rem;
}
</style>