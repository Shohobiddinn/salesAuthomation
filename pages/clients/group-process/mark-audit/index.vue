<template>
 <div>
   <button @click="$router.push('/clients/clients')" class="h-[44px] px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border">
     <div class="flex">
       <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
       Назад
       <slot></slot>
     </div>
   </button>
   <div class="mt-2 text-[24px] font-[600] text-[#424F4F]">
     Отметить для аудита
   </div>
   <div class="w-full overflow-auto bg-white rounded-[12px] border mt-4">
     <table v-click-outside="clickOutside" class="w-full border border-[#E1E4E4] overflow-auto rounded-[12px] bg-white">
       <tr class="border-b border-[#E1E4E4] ">
         <th  v-for="key in headers" :key="key">
           <div v-if="key.key === 'name'" class="fs-12 p-2 text-[#424F4F]">{{key.name}}</div>
           <div class=" p-2" v-if="key.key === 'auditor'">
             <div class="flex justify-end">
               <div class="fs-12  text-[#424F4F]">{{key.name}}</div>
               <div class="flex check ml-4">
                 <div class=" mr-2">
                   <label>
                     <input type='checkbox'>
                     <span></span>
                   </label>
                 </div>
                 <div class="fs-12 text-[#424F4F] w-[200px]">Указать для всех одниковые дни</div>
               </div>
             </div>
           </div>
         </th>
       </tr>
       <tr  class="border-b border-[#E1E4E4]" v-for="(data, index) in loadedData" :key="data">
         <td class="p-2" v-for="key in headers" :key="key">
           <div v-if="key.key === 'name'" class="fs-14 text-[#013636]" :style="{width: key.thWidth}">{{ data[key.key] }}</div>
           <div v-if="key.key === 'auditor'">
             <div class="flex justify-end mr-24">
               <div class="flex check pt-1">
                 <div>
                   <label>
                     <input type='checkbox'>
                     <span></span>
                   </label>
                 </div>
                 <div class="fs-14 ml-2 text-[#013636]">{{data.auditor}}</div>
<!--                 <div class="pl-1 fs-12 text-[#013636]">{{data.auditor}}</div>-->
               </div>
             </div>
           </div>
         </td>
       </tr>
     </table>
   </div>
   <div class="flex justify-end mt-2"><m-btn>Сохранить</m-btn></div>
 </div>
</template>

<script setup>

import {ref} from "vue";
const filter = ref({
  isPerforming: false,
  isClient: false,
  index: -1
})
const clickOutside = () => {
  filter.value.isPerforming = false;
  filter.value.isClient = false;
}
function selectAuditor(index){
  filter.value.isPerforming = !filter.value.isPerforming;
  filter.value.index = index
}
let headers = ref([
  {
    name: "Название клиента",
    checked:true,
    key: "name",
    thWidth:'250px',
    bRadius:'8px'
  },
  {
    name: "Аудитор",
    checked:true,
    key: "auditor",
    thWidth:'300px'
  },
]);
const loadedData = ref([
  {
    name: "Muhammad Baraka Savdo",
    auditor: "Отметить для аудитора",
  },
  {
    name: "Muhammad Baraka Savdo",
    auditor: "Отметить для аудитора",
  },
  {
    name: "Muhammad Baraka Savdo",
    auditor: "Отметить для аудитора",
  },
  {
    name: "Muhammad Baraka Savdo",
    auditor: "Отметить для аудитора",
  },
  {
    name: "Muhammad Baraka Savdo",
    auditor: "Отметить для аудитора",
  },
  {
    name: "Muhammad Baraka Savdo",
    auditor: "Отметить для аудитора",
  },
  {
    name: "Muhammad Baraka Savdo",
    auditor: "Отметить для аудитора",
  },
])
</script>

<style scoped>
.check label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
.check label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #D2D7D7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
.check [type=checkbox]:checked + span:before {
  content: '\f106';
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all .4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299B9B;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
