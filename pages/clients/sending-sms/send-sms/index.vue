<template>
   <div>
     <div class="flex justify-between">
       <button @click="$router.push('/clients/combining-clients')" class="h-[44px] px-[46px] mt-8 bg-[#FFFFFF] text-black rounded-lg border">
         <div class="flex">
           <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
           Назад
           <slot></slot>
         </div>
       </button>
       <div class="flex gap-4 mt-8">
         <button class="bg-white border border-[#299B9B] h-[42px] px-4 rounded-lg">
           <div class="flex">
             <IconStack/>
             <div class="ml-3">Шаблон</div>
           </div>
         </button>
         <button class="bg-white border border-[#299B9B] h-[42px] px-4 rounded-lg">
           <div class="flex">
             <IconBoxSVG class="mt-1"/>
             <div class="ml-3">Архив</div>
           </div>
         </button>
       </div>
     </div>
     <div class="mt-4">
       <page-title :title="'Отправить смс'"/>
     </div>
     <div class="flex w-full gap-4 mt-4">
        <div class="w-[35%] h-[170px] bg-white rounded-lg">
          <div class="h-[8px] w-full rounded-t-lg bg-[#299B9B]"></div>
          <div>
            <div class="flex justify-center items-center w-full h-full p-4">
              <div class="flex mt-4">
                <div class="h-[54px] pl-[14px] pt-[14px] w-[54px] rounded-[50%] bg-[#E9F5FC]"><IconWallet/></div>
                <div class="ml-4">
                  <div class="fw-5 text-[24px] ml-4">654</div>
                  <div class="fs-14">СМС остатка</div>
                </div>
              </div>
            </div>
            <div class="mx-4 mt-2">
              <button class="rounded-lg py-2 w-full bg-[#299B9B] text-white">Купить смс</button>
            </div>
          </div>
        </div>
       <div class="w-[65%] h-[170px] bg-white rounded-lg">
         <div class="h-[8px] w-full rounded-t-lg bg-[#D10505]">
           <div class="pt-12 pl-8"><page-title :title="'Напоминание !'"/></div>
           <div class="ml-8">один смс состоит из 160 латинских и 70 кириллических символов</div>
         </div>
       </div>
     </div>
     <div class="mt-5">
       <ClientsSendingSmsDatatable/>
     </div>
   </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>
