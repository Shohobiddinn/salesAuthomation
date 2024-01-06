<template>
  <div class="w-full overflow-auto pb-3 bg-white  rounded-lg border-grey mt-4">
    <div class="flex justify-between border-b-1">
      <div class="m-4 w-100 flex gap-5">
        <div class="fs-12 mt-3">Склад</div>
        <multiply-selections class="w-50" :name="'Склад'" :h="true" :filter.sync="filter.isCash" @toggle="toggle => filter.isCash = toggle"/>
      </div>
      <div class="flex items-center gap-5 m-4 w-2/5">
        <DatePicker />
        <m-btn class="w-50">Добавить</m-btn>
      </div>
    </div>
    <div class="flex gap-4 p-2">
      <search-input/>
      <excel-btn :size="'340kb'"></excel-btn>
      <excel-btn :size="'340kb'"></excel-btn>
    </div>
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
            <flex-col  class="py-2">
              <flex-row class="justify-start fw-4 fs-14 items-center text-gray-700">
                <div >
                  {{ data[key.key] }}
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
                <flex-row v-if="key.key === 'product'" class="justify-between pl-4 fs-14 fw-4 text-gray-400">
                  {{data[key.key]}}
                </flex-row>
                <flex-row v-if="key.key !== 'product'" class="justify-between fs-14 fw-4 text-gray-400">
                  {{data[key.key]}}
                </flex-row>
              </flex-col>
            </td>
          </tr>
        </template>
      </template>
      </tbody>
    </table>
  </div>
  <div class="flex gap-6 mt-4">
    <nuxt-link to="/warehouses/remaining-goods/movement-goods-warehouses" class="rounded-lg border border-blue-20 p-2 fs-14 px-4">Движения товаров на складе</nuxt-link>
    <button class="rounded-lg border border-blue-20 p-2 fs-14 px-4">Движение одного товара</button>
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
const filter = ref({
  isCash:false
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
    name: "Категория",
    checked:true,
    key: "category",
    type:"no",
    thWidth:'50px',
    bRadius:'8px'
  },
  {
    name: "Количество",
    checked:true,
    key: "quantity",
    type:"quantity",
    thWidth:'100px'
  },
  {
    name: "Объем",
    checked:true,
    key: "volume",
    type:"volume",
    thWidth:'100px'
  }
]);
const loadedData = ref([
  {
    category:"Coca cola",
    quantity:"12344",
    volume:"13268",
    items:[
      {
        category:"Coca cola",
        quantity:"12344",
        volume:"13268",
      },
      {
        category:"Coca cola",
        quantity:"12344",
        volume:"13268",
      },
      {
        category:"Coca cola",
        quantity:"12344",
        volume:"13268",
      }
    ]
  },
  {
    category:"Coca cola",
    quantity:"12344",
    volume:"13268",
    items:[
      {
        category:"Coca cola",
        quantity:"12344",
        volume:"13268",
      },
      {
        category:"Coca cola",
        quantity:"12344",
        volume:"13268",
      },
      {
        category:"Coca cola",
        quantity:"12344",
        volume:"13268",
      }
    ]
  },
  {
    category:"Coca cola",
    quantity:"12344",
    volume:"13268",
    items:[
      {
        category:"Coca cola",
        quantity:"12344",
        volume:"13268",
      },
      {
        category:"Coca cola",
        quantity:"12344",
        volume:"13268",
      },
      {
        category:"Coca cola",
        quantity:"12344",
        volume:"13268",
      }
    ]
  },
  {
    category:"Coca cola",
    quantity:"12344",
    volume:"13268",
    items:[
      {
        category:"Coca cola",
        quantity:"12344",
        volume:"13268",
      },
      {
        category:"Coca cola",
        quantity:"12344",
        volume:"13268",
      },
      {
        category:"Coca cola",
        quantity:"12344",
        volume:"13268",
      }
    ]
  },
  {
    category:"Coca cola",
    quantity:"12344",
    volume:"13268",
    items:[
      {
        category:"Coca cola",
        quantity:"12344",
        volume:"13268",
      },
      {
        category:"Coca cola",
        quantity:"12344",
        volume:"13268",
      },
      {
        category:"Coca cola",
        quantity:"12344",
        volume:"13268",
      }
    ]
  },
  {
    category:"Coca cola",
    quantity:"12344",
    volume:"13268",
    items:[
      {
        category:"Coca cola",
        quantity:"12344",
        volume:"13268",
      },
      {
        category:"Coca cola",
        quantity:"12344",
        volume:"13268",
      },
      {
        category:"Coca cola",
        quantity:"12344",
        volume:"13268",
      }
    ]
  },
])
</script>
<style scoped>
</style>


