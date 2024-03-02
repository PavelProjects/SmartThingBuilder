<script>
  import { generateCode } from './codegen/codeGenerator';
  import ComponentsView from './components/ComponentsView.vue';
  import { useCodeComponentsStore } from './stores/useCodeComponentsStore';

  export default {
    components: {
      ComponentsView,
    },
    data() {
      const comps = useCodeComponentsStore()
      return {
        store: comps,
      }
    },
    computed: {
      codeTemplate() {
        try {
          return generateCode(this.store)
        } catch (error) {
          return error
        }
      }
    }
  }

</script>

<template>
  <div class="main-container">
    <ComponentsView />
    <textarea :value="codeTemplate" disabled></textarea>
  </div>
</template>

<style scoped>
  .main-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 15px;
  }
  textarea {
    height: 95vh;
    width: 900px;
    margin: 0 auto;
    resize: none;
  }
</style>