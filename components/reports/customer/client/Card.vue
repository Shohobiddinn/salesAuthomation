<template>
  <div
    class="rounded-large p-5 text-black"
    :class="
      type === 'all' ? 'bg-[rgba(35,192,10,0.1)]' : 'bg-[rgba(41,155,155,0.1)]'
    "
  >
    <h2 class="font-semibold text-base">{{ title }}</h2>
    <div class="flex justify-between mt-2 items-center">
      <p class="text-[#424F4F] font-semibold text-2xl m-0">53.2 %</p>
      <div class="flex flex-col gap-2 text-sm">
        <div>
          <span class="font-normal opacity-20 mr-2">ОКБ</span>
          <span>227 </span>
        </div>
        <div>
          <span class="font-normal opacity-20 mr-2">АКБ</span>
          <span>227 </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  type: String,
  title: String,
})
</script>
