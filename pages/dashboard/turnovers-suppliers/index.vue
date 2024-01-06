<template>
 <div>
   <div class="flex justify-between mt-7">
     <page-title :title="'Обороты по поставщикам'"/>
     <div class="flex justify-between gap-4">
       <date-picker/>
       <flex-row class="h-full flex justify-end gap-2">
         <m-btn class="w-54 h-10">
           Применить
         </m-btn>
         <sm-btn class="px-4 py-2 -mt-1">
           <IconReloadSVG/>
         </sm-btn>
       </flex-row>
     </div>
   </div>
   <div class="mt-5">
     <DashboardTurnoversSuppliersDataTable/>
   </div>
 </div>
</template>

<script setup>

</script>

<style scoped>

</style>
