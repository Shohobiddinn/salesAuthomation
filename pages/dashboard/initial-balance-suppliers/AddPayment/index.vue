<template>
 <div>
   <div class="flex justify-between mt-7">
     <button @click="$router.go(-1)" class="h-11 w-40 flex justify-center items-center bg-[#FFFFFF] text-black rounded-lg border">
       <div class="flex">
         <IconArrowLeft class="mt-[5px] mr-2.5"></IconArrowLeft>
         Назад
         <slot></slot>
       </div>
     </button>
     <m-btn class="w-40">Добавить</m-btn>
   </div>
   <div class="flex flex-col my-6.5 bg-white rounded-lg">
     <div class="flex flex-col p-12.5 gap-10">
       <p-title> Добавить начальные остатки </p-title>
       <div class="flex justify-between">
         <PageTitle20 :title="'Поставщик'" />
         <div class="flex flex-col gap-6 w-[60%]">
           <div class="flex flex-col w-full gap-2.5">
             <label for="client-inp" class="fs-12"
             >Клиент <span class="text-red-3 fs-16">*</span></label
             >
             <DInput
                 :form="true"
                 :id="'client-inp'"
                 :placeholder="'Введите название клиента'"
                 :type="'text'"
                 class="h-11"
             />
           </div>
         </div>
       </div>
     </div>
     <div>
       <div class="h-[1px] bg-[#E1E4E4]"></div>
       <div class="flex flex-col p-12.5 gap-10">
         <div class="flex justify-between">
           <div class="flex gap-6">
             <PageTitle20 :title="'Оплата'" />
           </div>
           <div class="flex flex-col gap-6 w-[60%]">
             <div class="flex flex-col w-full gap-2.5">
               <label for="client-inp" class="fs-12"
               >Даты оплаты <span class="text-red-3 fs-16">*</span></label
               >
               <DInputDatePicker class="h-11" :values="''" />
             </div>

             <div class="flex flex-col w-full gap-2.5">
               <label class="fs-12"
               >Тип оплаты <span class="text-red-3 fs-16">*</span></label
               >
               <multiply-selections :h="true" />
             </div>

             <div class="flex flex-col w-full gap-2.5">
               <label class="fs-12"
               >Тип остатки * <span class="text-red-3 fs-16">*</span></label
               >
               <multiply-selections :h="true" />
             </div>
             <div class="flex flex-col w-full gap-2.5">
               <label class="fs-12"
               >Сумма <span class="text-red-3 fs-16">*</span></label
               >
               <d-input></d-input>
             </div>
             <div class="flex flex-col w-full gap-2.5">
               <label class="fs-12">Комментарии</label>
               <textarea
                   placeholder="Добавить комментарии"
                   :type="'text'"
                   class="rounded-lg border h-[100px] p-2 w-full outline-none h-40"
               />
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>

<script setup>

import InputFormsPayment from "~/components/finans/InputFormsPayment.vue";
</script>

<style scoped>

</style>
