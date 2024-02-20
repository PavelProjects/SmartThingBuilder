<script>
export default {
  props: {
    label: String,
    modelValue: String,
    values: Array,
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
    <select 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :title="notValid ? 'Поле обязательно для заполнения' : ''"
    >
      <option
        v-for="{ value, caption } of values"
        :key="value" 
        :value="value">{{ caption ?? value }}
      </option>
    </select>
  </div>
</template>