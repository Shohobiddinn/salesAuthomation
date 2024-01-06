<template>
  <button
    @click="openProcess"
    class="flex hover:bg-blue-50 justify-center fs-14 py-2 px-4 border border-[#299B9B] rounded-lg bg-white ml-3"
  >
    <div><IconFrame :result="result" /></div>
    <div class="fs-14 ml-1 mt-[2px]">Групповая обработка</div>
  </button>
  <div
    v-if="process"
    class="absolute card-shadow rounded-lg px-4 py-2 bg-white right-0 top-[50px] z-50 card"
  >
    <div
      v-for="i in groupProcess"
      @click="$router.push(i.url)"
      class="fs-14 border-b border-[#E1E4E4] py-1 cursor-pointer"
    >
      {{ i.name }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  groupProcess: {
    type: Array,
  },
});
const result = ref({
  resultTable: true,
});
const process = ref(false);
function openProcess() {
  process.value = !process.value;
}
</script>

<style scoped></style>
