<template>
  <div class="block z-[999999999]" :onclick="defineOk">
    <div class="fixed z-[9999999999] top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.8)] flex items-center justify-center">
        <div>
          <div class="flex relative py-2 px-4">
            <slot></slot>
          </div>
        </div>
    </div>
  </div>
  <div id="close"></div>
  <div id="toggle"></div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: String,
  dataContainerWidth: {
    default: "450px",
    required: false,
  },
  bgLotion: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["closeDialog"]);
// State

// Methods
function closeModal() {
  emit("closeDialog");
}

function defineOk(e: any) {
  const myElement = ref(document.getElementById("data-card"));
  if (myElement.value) {
    if (!myElement.value.contains(e.target)) {
      closeModal();
    }
  }
}
</script>

<style scoped>
.z-ind {
  z-index: 1;
}

.data-header {
  background-color: #fafdfd;
}

.close-btn {
  color: #374957;
}
</style>
