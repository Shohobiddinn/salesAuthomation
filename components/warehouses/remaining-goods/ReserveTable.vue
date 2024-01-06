<template>
  <flex-row class="w-full overflow-auto pb-3 bg-white mb-2 rounded-lg border-grey mt-4">
    <table class="w-full rounded-t-large overflow-hidden whitespace-nowrap ">
      <thead>
      <tr class="bg-lotion child">
        <td>
          <button class="flex pl-4 w-8 justify-start fw-4 fs-14 items-center text-gray-400">
            <IconArrowBottom/>
          </button>
        </td>
        <template v-for="(header, index) in headers" :key="headers">
          <td class="fw-4 text-gray-3 px-2 py-2.5 ">
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
      <tr class="bg-lotion child border-b-1">
        <td v-for="i in 4"></td>
        <td class="pl-3 text-gray-400 border-t-1">
          <div class="flex w-full">
            <div class="border-r-1 py-2 fs-12 w-[44%]">
              ШТ
            </div>
            <div class="py-2 pl-4 fs-12 w-[56%]">
              Сумма
            </div>
          </div>
        </td>
      </tr>
      </thead>
      <tbody>
      <template v-for="(data, index) in loadedData" :key="data">
        <tr class="border-t-1 child">
          <td>
            <button @click="openProducts(index)" class="flex pl-4 w-8 justify-start fw-4 fs-14 items-center text-gray-400">
              <IconArrowBottom/>
            </button>
          </td>
          <td v-for="key in headers" :key="key" class="pl-3">
            <flex-col  class="">
              <flex-row class="justify-start fw-4 fs-14 items-center text-gray-700">
                <div v-if="key.key !== 'refundRequest' && key.key !== 'available'">
                  {{ data[key.key] }}
                </div>
                <div v-if="key.key === 'refundRequest'" class="flex w-full">
                  <div class="border-r-1 py-2 w-[44%]">
                    {{ data[key.key].name }}
                  </div>
                  <div class="py-2 pl-4 w-[56%]">
                    {{ data[key.key].name1 }}
                  </div>
                </div>
                <div v-if="key.key === 'available'" class="flex w-full">
                  <div class="border-r-1 py-2 w-[44%]">
                    {{ data[key.key].name }}
                  </div>
                  <div class="py-2 pl-4 w-[56%]">
                    {{ data[key.key].name1 }}
                  </div>
                </div>
              </flex-row>
            </flex-col>
          </td>
        </tr>
        <template v-if="showProduct.isActive && showProduct.index === index">
          <tr v-for="(product, chIndex) in data.items" :key="'children'+index + chIndex" class="child">
            <td></td>
            <td v-for="key in headers" :key="key" class="pl-3">
              <flex-col class="">
                <flex-row  class="justify-between fs-14 fw-4 text-gray-400">
                  <div v-if="key.key !== 'refundRequest' && key.key !== 'available'">
                    {{ product[key.key] }}
                  </div>
                  <div v-if="key.key === 'refundRequest'" class="flex w-full">
                    <div class=" py-2 w-[44%]">
                      {{ product[key.key].name }}
                    </div>
                    <div class="py-2 border-l-1  pl-[14px] w-[56%]">
                      {{ product[key.key].name1 }}
                    </div>
                  </div>
                  <div v-if="key.key === 'available'" class="flex w-full">
                    <div class=" py-2 w-[44%]">
                      {{ product[key.key].name }}
                    </div>
                    <div class="py-2 border-l-1  pl-[14px] w-[56%]">
                      {{ product[key.key].name1 }}
                    </div>
                  </div>
                </flex-row>
              </flex-col>
            </td>
          </tr>
        </template>
      </template>
      <tr class="border-t-1 bg-input">
        <td class="fs-14 text-gray-3 pl-3 py-2"></td>
        <td class="fs-14 text-gray-3 pl-3 py-2">Total</td>
        <td class="fs-14 fw-6 text-black pl-3 py-2 "></td>
        <td class="fs-14 fw-6 text-black pl-3 py-2 "></td>
        <td class="fs-14 fw-6 text-black pl-3 py-2 ">
          <div class="flex">
            <div>13126</div>
            <div class="ml-24">100 000 000 сум</div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </flex-row>
</template>

<script setup>
// Stores
import {ref} from "vue";
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});
// State
const showProduct = ref({
  isActive:false,
  index:0
})
function openProducts(index){
  showProduct.value.isActive = !showProduct.value.isActive
  showProduct.value.index = index
}
const searchText = ref("")
const availablePages = ref(28)
let currentPage = ref(1)
let pageSize = ref(10)
const {isActive} = toRefs(props);
let sortedData = ref({key: '', mode: ''});

// Methods
let headers = ref([
  {
    name: "№",
    checked:true,
    key: "no",
    type:"no",
    thWidth:'30px',
    bRadius:'8px'
  },
  {
    name: "Название",
    checked:true,
    key: "name",
    type:"name",
    thWidth:'100px'
  },
  {
    name: "Код товара",
    checked:true,
    key: "productCode",
    type:"productCode",
    thWidth:'300px'
  },
  {
    name: "Доступно",
    checked:true,
    key: "available",
    type:"available",
    thWidth:'250px'
  }
]);
const loadedData = ref([
  {
    no:"1",
    name:"Dena",
    productCode:"13268",
    available:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    items:[
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        available:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        available:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        available:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      }
    ]
  },
  {
    no:"1",
    name:"Dena",
    productCode:"13268",
    available:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    items:[
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        available:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        available:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        available:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      }
    ]
  },
  {
    no:"1",
    name:"Dena",
    productCode:"13268",
    available:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    items:[
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        available:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        available:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        available:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      }
    ]
  },
  {
    no:"1",
    name:"Dena",
    productCode:"13268",
    available:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    items:[
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        available:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        available:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        available:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      }
    ]
  },
  {
    no:"1",
    name:"Dena",
    productCode:"13268",
    available:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    items:[
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        available:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        available:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        available:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      }
    ]
  },
  {
    no:"1",
    name:"Dena",
    productCode:"13268",
    available:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    items:[
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        available:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        available:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        available:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      }
    ]
  },
])
</script>
<style scoped>
.child td:nth-child(4){
  border-right: 1px solid #E1E4E4;
}
.child td:nth-child(5){
  border-right: 1px solid #E1E4E4;
}
</style>

