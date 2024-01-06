<template>
  <div class="dropdown flex-none" id="toggle-1">
    <button class="px-2 py-1.5 fs-14 text-white bg-none"
            @click="isOpen = !isOpen">
      <IconInfoSVG/>
    </button>
    <div id="slide-1" class="flex dropdown-content px-4 mt-1.5 rounded-lg shadow-xl border-1 border-grey"
         :class="isOpen ? 'show': ''">
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  value: {
    type: String,
    required: true,
  }
});
const isOpen = ref(false);
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #ffffff;
  z-index: 1;
}

.dropdown-content a {
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.show {
  display: block;
}
</style>