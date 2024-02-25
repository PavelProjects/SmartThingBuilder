<script>
export default {
  props: {
    label: String,
    modelValue: Boolean,
    required: Boolean,
  },
  emits: ["update:modelValue"],
  computed: {
    notValid() {
      return this.required && !this.modelValue
    }
  }
}
</script>

<template>
  <div class="field-container">
    <p v-if="label">{{ label }}</p>
    <input
      :checked="modelValue"
      @input="$emit('update:modelValue', $event.target.checked)"
      type="checkbox"
      :class="{ required: notValid }"
      :title="notValid ? 'Поле обязательно для заполнения' : ''"
    />
  </div>
</template>

<style scoped>
  input {
    margin: auto auto;
    height: 20px;
    width: 20px;
  }
</style>