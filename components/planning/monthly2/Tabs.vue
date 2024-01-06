<template>
    <div class="grid grid-cols-2 tab-btn">
      <button
        class="px-3 py-3 fs-14 fw-4 rounded-l-lg"
        @click="activeTab = activeTab !== 1 ? 1 : 0"
        :class="
          activeTab === 1
            ? 'text-white button-bg hover:bg-teal-600 active:bg-teal-700'
            : 'border-1 border border-color-primary'
        "
      >
        Факт
      </button>
      <button
        class="px-5 py-3 fs-14 fw-4 rounded-r-lg"
        @click="activeTab = activeTab !== 2 ? 2 : 0"
        :class="
          activeTab === 2
            ? 'text-white button-bg hover:bg-teal-600 active:bg-teal-700'
            : 'border-1 border border-color-primary border-l-0'
        "
      >
        Прогноз
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  let activeTab = ref(0);
  </script>
  
  <style scoped>
  .my-input:active {
    border-color: var(--primary-color);
  }
  .my-input:focus {
    outline: none !important;
    border: 1px solid var(--primary-color);
  }
  </style>
  