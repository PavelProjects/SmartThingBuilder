<script>
import { generateCode } from "./codegen/codeGenerator";
import ComponentsView from "./components/ComponentsView.vue";
import { useCodeComponentsStore } from "./stores/useCodeComponentsStore";

export default {
  components: {
    ComponentsView,
  },
  data() {
    const comps = useCodeComponentsStore();
    return {
      store: comps,
    };
  },
  computed: {
    codeTemplate() {
      try {
        return generateCode(this.store);
      } catch (error) {
        return error;
      }
    },
  },
};
</script>

<template>
  <div class="editor">
    <ComponentsView />
    <textarea :value="codeTemplate" disabled></textarea>
  </div>
</template>

<style scoped>
.editor {
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 15px;
  height: 100vh;
}
textarea {
  flex: 4 0 auto;
  /* height: 95vh; */
  height: 100%;
  margin: 0 auto;
  resize: none;
}
</style>
