<template>
    <div class="w-full">
      <div class="flex justify-center w-full">
        <div>
          <IconTrashB/>
        </div>
      </div>
      <div class="flex justify-center w-full mt-7">
        <div class="text-[18px] text-center w-[250px] font-[600]">
          Вы действительно хотите удалить?
        </div>
      </div>
      <div class="grid grid-cols-2 gap-6 mt-4">
        <button class="fs-14 bg-[#FAFDFD] border rounded-lg py-3">
          Нет, выйти
        </button>
        <button class="fs-14 bg-[#D10505] rounded-lg text-white disabled" >
          Да, удалить
        </button>
      </div>
    </div>
 </template>
 
 <script setup>

 
 </script>
 
