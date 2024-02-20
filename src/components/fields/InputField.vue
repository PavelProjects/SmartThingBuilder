<script>
export default {
  props: {
    label: String,
    placeholder: String,
    type: String,
    modelValue: String,
    required: Boolean,
  },
  emits: ['update:modelValue'],
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
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :type="type"
      :class="{ required: notValid }"
      :title="notValid ? 'Поле обязательно для заполнения' : ''"
    />
  </div>
</template>