<template>
  <excel-btn :size="'340kb'"></excel-btn>
  <flex-row class="w-full overflow-auto pb-3 bg-white mb-2 rounded-lg border-grey mt-4">
    <table class="w-full rounded-t-large overflow-hidden whitespace-nowrap ">
      <thead>
      <tr class="bg-lotion child border-b-1">
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
                <div v-if="key.key !== 'actualBalance' && key.key !== 'newOrder' && key.key !== 'availableForSale'">
                  {{ data[key.key] }}
                </div>
                <div v-if="key.key === 'actualBalance'" class="grid grid-cols-2">
                  <div class="border-r-1 py-2">
                    {{ data[key.key].name }}
                  </div>
                  <div class="py-2 pl-4">
                    {{ data[key.key].name1 }}
                  </div>
                </div>
                <div v-if="key.key === 'newOrder'" class="grid grid-cols-2">
                  <div class="border-r-1 py-2">
                    {{ data[key.key].name }}
                  </div>
                  <div class="py-2 pl-4">
                    {{ data[key.key].name1 }}
                  </div>
                </div>
                <div v-if="key.key === 'availableForSale'" class="grid grid-cols-2">
                  <div class="border-r-1 py-2">
                    {{ data[key.key].name }}
                  </div>
                  <div class="py-2 pl-4">
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
            <td v-for="key in headers" :key="key" class="px-3">
              <flex-col class="">
                <flex-row  class="justify-between fs-14 fw-4 text-gray-400">
                  <div v-if="key.key !== 'actualBalance' && key.key !== 'newOrder' && key.key !== 'availableForSale'">
                    {{ product[key.key] }}
                  </div>
                  <div v-if="key.key === 'actualBalance'" class="grid grid-cols-2">
                    <div class=" py-2">
                      {{ product[key.key].name }}
                    </div>
                    <div class="py-2 border-l-1  pl-[14px]">
                      {{ product[key.key].name1 }}
                    </div>
                  </div>
                  <div v-if="key.key === 'newOrder'" class="grid grid-cols-2">
                    <div class=" py-2">
                      {{ product[key.key].name }}
                    </div>
                    <div class="py-2 border-l-1  pl-[14px]">
                      {{ product[key.key].name1 }}
                    </div>
                  </div>
                  <div v-if="key.key === 'availableForSale'" class="grid grid-cols-2">
                    <div class="py-2">
                      {{ product[key.key].name }}
                    </div>
                    <div class="py-2 border-l-1  pl-[14px]">
                      {{ product[key.key].name1 }}
                    </div>
                  </div>
                </flex-row>
<!--                <flex-row v-if="key.key !== 'product'" class="justify-between fs-14 fw-4 text-gray-400">-->
<!--                  {{product[key.key]}}-->
<!--                </flex-row>-->
              </flex-col>
            </td>
          </tr>
        </template>
      </template>
      <tr class="border-t-1 bg-input">
        <td class="fs-14 text-gray-3 pl-3 py-2"></td>
        <td class="fs-14 text-gray-3 pl-3 py-2">Общий</td>
        <td class="fs-14 fw-6 text-black pl-3 py-2 ">13126</td>
        <td class="fs-14 fw-6 text-black pl-3 py-2 ">13126</td>
        <td v-for="i in 3" class="fs-14 fw-6 text-black pl-3 py-2 ">
          <div class="flex">
            <div>13126</div>
            <div class="ml-24">100 000 000 сум</div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </flex-row>
  <div class="flex gap-6 mt-4">
    <nuxt-link to="/warehouses/remaining-goods/movement-goods-warehouses" class="rounded-lg border border-blue-20 p-2 fs-14 px-4">Движения товаров на складе</nuxt-link>
  </div>
</template>

<script setup>
// Stores
import {ref} from "vue";

const expeditorStore = useReportExpeditorStore("main")

const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});
// State
import {useProductCategoryStore} from "~/stores/settings/product-categories/product-categories.store";

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
const dialogStore = useDialogStore("product_category");
const productActiveStore = useProductCategoryStore(isActive.value.toString())
let sortedData = ref({key: '', mode: ''});

// Methods
onMounted(() => {
  productActiveStore.getData(isActive.value);
});
// Methods
function getShipmentByCategory(categoryId, shipments, product){
  const category = getCategoryProducts(categoryId, shipments)
  return category.products.filter(c => c.product === product)[0]
}
function getCategoryProducts(categoryId, shipments){
  return shipments.filter(s => s.category === categoryId)[0]
}
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
    thWidth:'100px'
  },
  {
    name: "Фактический остаток",
    checked:true,
    key: "actualBalance",
    type:"actualBalance",
    thWidth:'250px'
  },
  {
    name: "Новые заявки",
    checked:true,
    key: "newOrder",
    type:"newOrder",
    thWidth:'250px'
  },
  {
    name: "Доступно для продаж",
    checked:true,
    key: "availableForSale",
    type:"availableForSale",
    thWidth:'250px'
  }
]);
const loadedData = ref([
  {
    no:"1",
    name:"Dena",
    productCode:"13268",
    actualBalance:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    newOrder:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    availableForSale:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    items:[
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        actualBalance:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        newOrder:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        availableForSale:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        actualBalance:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        newOrder:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        availableForSale:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        actualBalance:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        newOrder:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        availableForSale:{
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
    actualBalance:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    newOrder:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    availableForSale:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    items:[
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        actualBalance:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        newOrder:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        availableForSale:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        actualBalance:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        newOrder:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        availableForSale:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        actualBalance:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        newOrder:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        availableForSale:{
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
    actualBalance:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    newOrder:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    availableForSale:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    items:[
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        actualBalance:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        newOrder:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        availableForSale:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        actualBalance:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        newOrder:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        availableForSale:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        actualBalance:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        newOrder:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        availableForSale:{
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
    actualBalance:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    newOrder:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    availableForSale:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    items:[
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        actualBalance:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        newOrder:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        availableForSale:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        actualBalance:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        newOrder:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        availableForSale:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        actualBalance:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        newOrder:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        availableForSale:{
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
    actualBalance:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    newOrder:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    availableForSale:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    items:[
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        actualBalance:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        newOrder:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        availableForSale:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        actualBalance:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        newOrder:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        availableForSale:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        actualBalance:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        newOrder:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        availableForSale:{
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
    actualBalance:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    newOrder:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    availableForSale:{
      name:"13268",
      name1:"100 000 000 сум"
    },
    items:[
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        actualBalance:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        newOrder:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        availableForSale:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        actualBalance:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        newOrder:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        availableForSale:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      },
      {
        no:"1",
        name:"Dena",
        productCode:"13268",
        actualBalance:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        newOrder:{
          name:"13268",
          name1:"100 000 000 сум"
        },
        availableForSale:{
          name:"13268",
          name1:"100 000 000 сум"
        },
      }
    ]
  },
])
</script>
<style scoped>
.child td:nth-child(3){
  border-right: 1px solid #E1E4E4;
}
.child td:nth-child(4){
  border-right: 1px solid #E1E4E4;
}
.child td:nth-child(5){
  border-right: 1px solid #E1E4E4;
}
.child td:nth-child(6){
  border-right: 1px solid #E1E4E4;
}
</style>

