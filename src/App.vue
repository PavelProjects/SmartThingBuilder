<script>
import { generateCode } from './codegen/codeGenerator';
  import ComponentsView from './components/ComponentsView.vue';
  import { useCodeComponentsStore } from './stores/useCodeComponentsStore';

  export default {
    components: {
      ComponentsView
    },
    data() {
      const comps = useCodeComponentsStore()
      return {
        store: comps
      }
    },
    computed: {
      codeTemplate() {
        return generateCode(this.store)
      }
    }
  }

</script>

<template>
  <main-container>
    <ComponentsView />
    <textarea :value="codeTemplate" disabled></textarea>
  </main-container>
</template>

<style scoped>
  main-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100%;
  }
  textarea {
    height: 100vh;
    font-size: 20px;
    background-color: var(--color-background-mute);
    color: var(--color-text)
  }
</style>