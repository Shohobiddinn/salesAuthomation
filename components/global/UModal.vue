<template>
  <div class="block z-[9999999]" :onclick="defineOk">
    <div
      class="fixed z-[9999999] top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.8)] flex items-center justify-center"
    >
      <div id="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
  <div id="close"></div>
  <div id="toggle"></div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  name: String,
});

const emit = defineEmits(["closeDialog"]);
// State

// Methods
function closeModal() {
  emit("closeDialog");
}

function defineOk(e) {
  const myElement = ref(document.getElementById("modal-content"));
  if (myElement.value) {
    if (!myElement.value.contains(e.target)) {
      if (window.getSelection().toString()) return;
      closeModal();
    }
  }
}
</script>

<style scoped>
.data-container {
  max-width: 450px;
}

.data-header {
  background-color: #fafdfd;
}

.close-btn {
  color: #374957;
}
</style>
