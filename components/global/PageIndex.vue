<template>
  <div class="flex" v-if="dataChecked">
    <div class="flex gap-1"
         v-if="availablePages <= 5">
      <index-btn v-for="index in availablePages"
                 :is-active="index === currentPage"
                 @click="setPage(index)"
                 :key="index">
        {{ index }}
      </index-btn>
    </div>
    <div class="flex gap-1" v-if="availablePages > 5">
      <index-btn :is-active="false"
                 v-if="currentPage !== 1"
                 @click="setPage(1)">
        1
      </index-btn>
      <span class="font-bold"
            v-if="(currentPage - 1) !== 1 && currentPage !== 1">
        ..
      </span>
      <index-btn :is-active="false"
                 @click="setPage(currentPage - 1)"
                 v-if="(currentPage - 1) !== 1 && currentPage !== 1">
        {{ currentPage - 1 }}
      </index-btn>
      <index-btn :is-active="true">
        {{ currentPage }}
      </index-btn>
      <index-btn :is-active="false"
                 @click="setPage(currentPage + 1)"
                 v-if="(currentPage + 1) !== availablePages && currentPage !== availablePages">
        {{ currentPage + 1}}
      </index-btn>
      <span class="text-bold font-bold"
            v-if="(currentPage + 1) !== availablePages && currentPage !== availablePages">
        ...
      </span>
      <index-btn v-if="currentPage !== availablePages"
                 @click="setPage(availablePages)">
        {{ availablePages }}
      </index-btn>
    </div>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";

const props = defineProps({
  currentPage: Number,
  availablePages: Number
})
const _value = ref({name:props.availablePages});
const emit = defineEmits([
    "setPage"
])

// State

let isBig = ref(false)
let dataChecked = ref(false)


// Methods

function checkIsLarge() {
  if (_value.value > 5){
    isBig.value = true
  }
  dataChecked.value = true
}
function setPage(index){
  emit("setPage", index)
}
watch(props.availablePages,()=>{
  checkIsLarge()
})

onMounted(() => {
  checkIsLarge()
})
</script>

<style scoped>

</style>
