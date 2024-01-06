<template>
   <div>
     <div class="flex">
       <div class="font-bold">Название</div>
       <div class="font-bold">Сумма</div>
     </div>
     <div class="flex mt-2 gap-4">
       <div class="w-58 h-11 border rounded-lg flex p-2 text-[14px] text-gray-3">1 mln</div>
       <input type="number" class="w-58 h-11 border rounded-lg flex p-2">
       <button class="h-10.5 bg-red-700 text-white w-30 rounded-lg">Удалить</button>
     </div>
   </div>
</template>

<script setup>

const configuration = ref([

])
function add(){

}
</script>

<style scoped>

</style>
