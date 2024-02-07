<template>
  <input :value="modelValue" @input="updateInput" class="input" />
</template>
<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number]
  },
  emits: ["update:model-value"],
  methods: {
    updateInput(event) {
      this.$emit('update:model-value', event.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 10px;
}
</style>