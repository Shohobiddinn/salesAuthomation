<template>
  <flex-row class="w-full overflow-auto pb-3 bg-white mb-2 rounded-lg border-grey">
    <table class="w-full rounded-t-large overflow-hidden whitespace-nowrap">
      <thead>
      <tr class="bg-lotion border-b-1">
        <template v-for="header in headers" :key="headers">
          <td class="fw-4 text-gray-3 px-2 py-2.5 ">
            <flex-row :style="{width: header.thWidth}" class="justify-start fw-4 fs-14 items-center text-gray-400">
            <span>
              {{header.name}}
            </span>
            </flex-row>
          </td>
        </template>
      </tr>
      </thead>
      <tbody>
      <template v-for="(data, index) in loadedData" :key="data">
        <tr class="border-t-1">
          <td v-for="key in headers" :key="key" class="pl-3">
            <button @click="openProducts(index)" v-if="key.key === 'productCategory'" class="flex justify-start fw-4 fs-14 items-center text-gray-400">
              <IconArrowBottom/>
              <div class="ml-2 text-gray-700">
                {{ data[key.key] }}
              </div>
            </button>
            <flex-col v-if="key.key !== 'productCategory'" class="py-2">
              <flex-row class="justify-start fw-4 fs-14 items-center text-gray-700">
                <div >
                  {{ data[key.key] }}
                </div>
              </flex-row>
            </flex-col>
          </td>
        </tr>
        <template v-if="showProduct.isActive && showProduct.index === index">
          <tr v-for="(product, chIndex) in data.items" :key="'children'+index + chIndex">
              <td v-for="key in headers" :key="key" class="px-3">
                <flex-col class="">
                  <flex-row v-if="key.key === 'productCategory'" class="justify-between pl-4 fs-14 fw-4 text-gray-400">
                    {{data[key.key]}}
                  </flex-row>
                  <flex-row v-if="key.key !== 'productCategory'" class="justify-between fs-14 fw-4 text-gray-400">
                    {{data[key.key]}}
                  </flex-row>
                </flex-col>
              </td>
          </tr>
        </template>
      </template>
      <tr class="border-t-1 bg-input">
        <td class="fs-14 text-gray-3 pl-3 py-2">Общее количество</td>
        <td class="fs-14 fw-6 text-blue-20 pl-3 py-2 ">449</td>
        <td class="fs-14 fw-6 text-blue-20 pl-3 py-2 ">449</td>
        <td class="fs-14 fw-6 text-blue-20 pl-3 py-2 ">449</td>
        <td class="fs-14 fw-6 text-blue-20 pl-3 py-2 ">449</td>
        <td class="fs-14 fw-6 text-blue-20 pl-3 py-2 ">449</td>
        <td class="fs-14 fw-6 text-blue-20 pl-3 py-2 ">449</td>
        <td class="fs-14 fw-6 text-blue-20 pl-3 py-2 ">449</td>
      </tr>
      </tbody>
    </table>
  </flex-row>
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
    name: "Категория товара",
    checked:true,
    key: "productCategory",
    type:"productCategory",
    thWidth:'120px',
    bRadius:'8px'
  },
  {
    name: "Шт",
    checked:true,
    key: "sht",
    type:"sht",
    thWidth:'120px'
  },
  {
    name: "Код товара",
    checked:true,
    key: "productCode",
    type:"productCode",
    thWidth:'100px'
  },
  {
    name: "Объем",
    checked:true,
    key: "volume",
    type:"volume",
    thWidth:'70px'
  },
  {
    name: "Цена",
    checked:true,
    key: "price",
    type:"price",
    thWidth:'120px'
  },
  {
    name: "Сумма",
    checked:true,
    key: "amount",
    type:"amount",
    thWidth:'100px'
  },
  {
    name: "Комментарий к заказу",
    checked:true,
    key: "orderComment",
    type:"orderComment",
    thWidth:'180px'
  },
  {
    name: "Дата последнего закупа",
    checked:true,
    key: "lastPurchase",
    type:"lastPurchase",
    thWidth:'160px'
  },

]);
const loadedData = ref([
  {
    productCategory:"Dena",
    sht:"449",
    productCode:"449",
    volume:"449",
    price:"132",
    amount:"132",
    orderComment:"132",
    lastPurchase:"132",
    items:[
      {
        productCategory:"Dena",
        sht:"449",
        productCode:"449",
        volume:"449",
        price:"132",
        amount:"132",
        orderComment:"132",
        lastPurchase:"132",
      },
      {
        productCategory:"Dena",
        sht:"449",
        productCode:"449",
        volume:"449",
        price:"132",
        amount:"132",
        orderComment:"132",
        lastPurchase:"132",
      }
    ]
  },
  {
    productCategory:"Dena",
    sht:"449",
    productCode:"449",
    volume:"449",
    price:"132",
    amount:"132",
    orderComment:"132",
    lastPurchase:"132",
    items:[
      {
        productCategory:"Dena",
        sht:"449",
        productCode:"449",
        volume:"449",
        price:"132",
        amount:"132",
        orderComment:"132",
        lastPurchase:"132",
      },
      {
        productCategory:"Dena",
        sht:"449",
        productCode:"449",
        volume:"449",
        price:"132",
        amount:"132",
        orderComment:"132",
        lastPurchase:"132",
      }
    ]
  },
  {
    productCategory:"Dena",
    sht:"449",
    productCode:"449",
    volume:"449",
    price:"132",
    amount:"132",
    orderComment:"132",
    lastPurchase:"132",
    items:[
      {
        productCategory:"Dena",
        sht:"449",
        productCode:"449",
        volume:"449",
        price:"132",
        amount:"132",
        orderComment:"132",
        lastPurchase:"132",
      },
      {
        productCategory:"Dena",
        sht:"449",
        productCode:"449",
        volume:"449",
        price:"132",
        amount:"132",
        orderComment:"132",
        lastPurchase:"132",
      }
    ]
  },
  {
    productCategory:"Dena",
    sht:"449",
    productCode:"449",
    volume:"449",
    price:"132",
    amount:"132",
    orderComment:"132",
    lastPurchase:"132",
    items:[
      {
        productCategory:"Dena",
        sht:"449",
        productCode:"449",
        volume:"449",
        price:"132",
        amount:"132",
        orderComment:"132",
        lastPurchase:"132",
      },
      {
        productCategory:"Dena",
        sht:"449",
        productCode:"449",
        volume:"449",
        price:"132",
        amount:"132",
        orderComment:"132",
        lastPurchase:"132",
      }
    ]
  },
  {
    productCategory:"Dena",
    sht:"449",
    productCode:"449",
    volume:"449",
    price:"132",
    amount:"132",
    orderComment:"132",
    lastPurchase:"132",
    items:[
      {
        productCategory:"Dena",
        sht:"449",
        productCode:"449",
        volume:"449",
        price:"132",
        amount:"132",
        orderComment:"132",
        lastPurchase:"132",
      },
      {
        productCategory:"Dena",
        sht:"449",
        productCode:"449",
        volume:"449",
        price:"132",
        amount:"132",
        orderComment:"132",
        lastPurchase:"132",
      }
    ]
  },
  {
    productCategory:"Dena",
    sht:"449",
    productCode:"449",
    volume:"449",
    price:"132",
    amount:"132",
    orderComment:"132",
    lastPurchase:"132",
    items:[
      {
        productCategory:"Dena",
        sht:"449",
        productCode:"449",
        volume:"449",
        price:"132",
        amount:"132",
        orderComment:"132",
        lastPurchase:"132",
      },
      {
        productCategory:"Dena",
        sht:"449",
        productCode:"449",
        volume:"449",
        price:"132",
        amount:"132",
        orderComment:"132",
        lastPurchase:"132",
      }
    ]
  },
])
</script>

<style scoped>

</style>
