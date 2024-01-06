<template>
  <div class="dropdown" id="toggle">
    <button @click="toggleOpen = !toggleOpen">
      <span class="mr-1">
        <svg width="3" height="17" viewBox="0 0 3 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 3C2.32842 3 2.99999 2.32843 2.99999 1.5C2.99999 0.671573 2.32842 0 1.5 0C0.671572 0 0 0.671573 0 1.5C0 2.32843 0.671572 3 1.5 3Z" fill="#424F4F"/>
          <path d="M1.5 10C2.32843 10 3 9.32843 3 8.5C3 7.67157 2.32843 7 1.5 7C0.671573 7 0 7.67157 0 8.5C0 9.32843 0.671573 10 1.5 10Z" fill="#424F4F"/>
          <path d="M1.49999 17C2.32841 17 2.99998 16.3284 2.99998 15.5C2.99998 14.6716 2.32841 14 1.49999 14C0.671568 14 0 14.6716 0 15.5C0 16.3284 0.671568 17 1.49999 17Z" fill="#424F4F"/>
        </svg>
      </span>
    </button>
    <div id="slide" class="flex z-50 dropdown-content px-2 mt-1.5 rounded-lg shadow-xl border-1 border-grey"
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

<script setup>
import {onMounted, ref} from 'vue'

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
  toggleOpen.value = false
  document.removeEventListener('click', function emp(e){})
}
function emptyF(){}
function setPageSize(size){
  toggleOpen.value = false
  emit("setPageSize", size)
}


onMounted(() => {
  const open = ref(document.getElementById("toggle"));
  const slide = ref(document.getElementById("slide"));
  const close = ref(document.getElementById("close"));
  document.addEventListener('click', function clickeds(e){
    if (!slide.value.contains(e.target) && !open.value.contains(e.target) || close.value.contains(e.target)) {
      clicked()
    }
  });
})

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
  right: 60px;
  z-index: 99999999;
}

.dropdown-content a {
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #ddd;}

.show {display:block;}
</style>

