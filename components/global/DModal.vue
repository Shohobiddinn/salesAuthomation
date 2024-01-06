<template>
  <div @click="defineOk" class="block z-[99999999999] relative">
    <div  class="fixed z-[9999999] top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.8)] flex items-center justify-center">
      <rounded-white-container :style="{maxWidth: dataContainerWidth}" id="data-card" class="data-container">
        <div>
          <div class="rounded-t-large border-b-1px -mx-4 data-header px-4 pb-4 flex justify-between items-center">
          <span class="text-20px fw-6 text-gray-3">
            {{ name }}
          </span>
            <span>
            <index-btn :is-active="false" @click="closeModal" class="close-btn">
              <fa-icon :hash="'&#xf00d'"/>
            </index-btn>
          </span>
          </div>
          <div class="flex relative pt-2 pb-4 px-4" :class="withOverflow && 'overflow-auto'">
            <slot></slot>
          </div>
        </div>
      </rounded-white-container>

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
  dataContainerHeight: {
    type: String,
    required: false,
  },
  withOverflow: Boolean
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
      if (window!.getSelection()!.toString()) return;
      closeModal();
    }
  }
}
</script>

<style scoped>
.data-container {
  background-color: white;
}

.data-header {
  background-color: #fafdfd;
}

.close-btn {
  color: #374957;
}
</style>
