<template>
  <select :value="modelValue" @change="changeOption">
    <option disabled value="">Choose any one</option>
    <option v-for="option in options" :key="option.value" :value="option.value">{{ option.name }}</option>
  </select>
</template>

<script>
export default {
  name: 'my-select',
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(e) {
      this.$emit("update:modelValue", e.target.value)
    }
  }
}
</script>

<style></style>