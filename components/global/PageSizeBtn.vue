<template>
  <div class="dropdown" id="toggle" v-click-outside="clicked">
    <button class="button-bg px-2 py-1.5 fs-14 text-white rounded-lg hover:bg-teal-600 active:bg-teal-700"
            @click="toggleOpen = !toggleOpen">
      <span class="mr-1">
        <fa-icon hash="&#xf078"/>
      </span>
      <span>
        {{ currentSize }}
      </span>
    </button>
    <div id="slide" class="flex dropdown-content px-2 mt-1.5 rounded-lg shadow-xl border-1 border-grey"
         :class="toggleOpen ? 'show': ''">
      <a v-for="size in availableSizes"
         :key="size"
         class="px-3 py-1 my-1 rounded-lg border-1 border-primary-gray"
         @click="setPageSize(size)"
         href="javascript:void(0)">
        {{ size }}
      </a>
    </div>
  </div>
  <div id="close"></div>
</template>

<script setup lang="ts">
const emit = defineEmits([
  'setPageSize'
])

const props = defineProps({
  currentSize: Number
})

// State
let toggleOpen = ref(false)
const availableSizes = ref([
  10, 20, 40, 50, 70, 80, 100
])

// Methods
function clicked() {
  toggleOpen.value = false;
}

function setPageSize(size: number) {
  toggleOpen.value = false
  emit("setPageSize", size)
}
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
