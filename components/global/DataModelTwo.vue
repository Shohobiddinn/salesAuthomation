<template>
  <div class="block z-50" :onclick="defineOk">
    <div class="fixed z-[99999] top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.8)] flex items-center justify-center">
      <rounded-white-container id="data-card" class="data-container">
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
          <div class="flex pt-2 pb-4 px-4">
            <slot></slot>
          </div>
        </div>
      </rounded-white-container>
    </div>
  </div>
  <div id="close"></div>
  <div id="toggle"></div>
</template>

<script setup>

import {ref} from "vue";

const props = defineProps({
  name: String,
})

const emit = defineEmits([
  'closeDialog'
])
// State

// Methods
function closeModal() {
  emit('closeDialog')
}

function defineOk(e) {
  const myElement = ref(document.getElementById("data-card"))
  if (myElement.value){
    if (!myElement.value.contains(e.target)){
      closeModal()
    }
  }
}

</script>

<style scoped>
.data-container {
  max-width: 650px;
}

.data-header {
  background-color: #FAFDFD;
}

.close-btn {
  color: #374957;
}
</style>

