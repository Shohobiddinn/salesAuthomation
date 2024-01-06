<template>
    <flex-row class="w-full overflow-auto pb-3 bg-white rounded-lg border-grey">
      <table class="w-full rounded-t-large overflow-hidden whitespace-nowrap ">
        <thead>
        <tr class="border-b-1">
          <td v-for="mainHeader in mainHeaders" key="mainHeader" class="py-4 pl-5 borderH">{{mainHeader.name}}</td>
        </tr>
        <tr class="bg-lotion  border-b-1 ">
          <template v-for="header in headers" :key="headers">
            <td class="fw-4 text-gray-3 px-5 py-2.5 borderH">
              <div :style="{width: header.thWidth}">
                <flex-row  class="justify-start fw-4 fs-14 items-center text-gray-400">
              <span>
                {{header.name}}
              </span>
                </flex-row>
              </div>
            </td>
          </template>
        </tr>
        </thead>
        <tbody>
        <template v-for="(data, index) in loadedData" :key="data">
          <tr>
            <td v-for="key in headers" :key="key" class="pl-3 py-4 borderH">
              <di class="flex justify-start fw-4 fs-14 items-center text-gray-400">
                <div class="ml-2 text-gray-700">
                  {{ data[key.key] }}
                </div>
              </di>
             
            </td>
          </tr>
        
        </template>
        </tbody>
      </table>
    </flex-row>
  </template>
  
  <script setup>
  // Stores
  import {ref} from "vue";
  
  
  let mainHeaders = ref([
    {
      name: "Продукт",
    },
    {
      name: "Андрей ака",

    },
    {
      name: "",

    },
    {
      name: "Андрей ака",
    },
    {
      name: "",
    },
    {
      name: "Андрей ака",

    },
    {
      name: "",

    },
    {
      name: "Андрей ака",
   
    },
    {
      name: "",
    },
    {
      name: "Андрей ака",
    },
    
  
  ]);
  
  let headers = ref([
    {
      name: "",
      checked:true,
      key: "product",
      type:"product",
      thWidth:'120px',
  
    },
    {
      name: "Факт",
      checked:true,
      key: "remain",
      type:"remain",
      thWidth:'70px'
    },
    {
      name: "Факт",
      checked:true,
      key: "quantity",
      type:"quantity",
      thWidth:'70px'
    },
    {
      name: "Факт",
      checked:true,
      key: "adjustments",
      type:"adjustments",
      thWidth:'70px'
    },
    {
      name: "Факт",
      checked:true,
      key: "returnShelf",
      type:"returnShelf",
      thWidth:'70px'
    },
    {
      name: "Факт",
      checked:true,
      key: "movement",
      type:"movement",
      thWidth:'70px'
    },
    {
      name: "Факт",
      checked:true,
      key: "sale",
      type:"sale",
      thWidth:'70px'
    },
    {
      name: "Факт",
      checked:true,
      key: "supplier",
      type:"supplier",
      thWidth:'70px'
    },
    {
      name: "Факт",
      checked:true,
      key: "adjust",
      type:"adjust",
      thWidth:'70px'
    },
    {
      name: "Факт",
      checked:true,
      key: "bonus",
      type:"bonus",
      thWidth:'70px'
    },
    {
      name: "Факт",
      checked:true,
      key: "fact",
      type:"fact",
      thWidth:'70px'
    },
  
  ]);
  const loadedData = ref([
    {
      product:"Dena",
      remain:"13268",
      quantity:"13268",
      adjustments:"13268",
      returnShelf:"13268",
      movement:"13268",
      sale:"13268",
      supplier:"13268",
      adjust:"13268",
      bonus:"13268",
    },
    {
      product:"Dena",
      remain:"13268",
      quantity:"13268",
      adjustments:"13268",
      returnShelf:"13268",
      movement:"13268",
      sale:"13268",
      supplier:"13268",
      adjust:"13268",
      bonus:"13268",
     
    },
    {
      product:"Dena",
      remain:"13268",
      quantity:"13268",
      adjustments:"13268",
      returnShelf:"13268",
      movement:"13268",
      sale:"13268",
      supplier:"13268",
      adjust:"13268",
      bonus:"13268",
      
    },
    {
      product:"Dena",
      remain:"13268",
      quantity:"13268",
      adjustments:"13268",
      returnShelf:"13268",
      movement:"13268",
      sale:"13268",
      supplier:"13268",
      adjust:"13268",
      bonus:"13268",
    
    },
    {
      product:"Dena",
      remain:"13268",
      quantity:"13268",
      adjustments:"13268",
      returnShelf:"13268",
      movement:"13268",
      sale:"13268",
      supplier:"13268",
      adjust:"13268",
      bonus:"13268",
    
    },
    {
      product:"Dena",
      remain:"13268",
      quantity:"13268",
      adjustments:"13268",
      returnShelf:"13268",
      movement:"13268",
      sale:"13268",
      supplier:"13268",
      adjust:"13268",
      bonus:"13268",
  
    },
  ])
  </script>
  
  <style scoped>
  .borderH:nth-child(odd){
    border-right: 1px solid #E1E4E4;
  }
  </style>
  