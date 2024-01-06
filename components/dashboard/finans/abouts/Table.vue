<template>
  <div class="w-full overflow-auto pb-3 bg-white mb-2 rounded-lg border-grey">
    <div class="flex justify-around"><div>
      <div class="fs-12 fw-6 py-2">За этот месяц</div>
    </div>
      <div class="fs-12 fw-6 py-2">За этот месяц</div></div>
    <table class="w-full rounded-t-large overflow-hidden whitespace-nowrap">
      <thead>
      <tr class="bg-lotion border-b-1 border-t-1">
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
            <button @click="openProducts(index)" v-if="key.key === 'month'" class="flex justify-start fw-4 fs-14 items-center text-gray-400">
              <IconPlus v-if="showProduct.index !== index"/>
              <span class="fw-6 text-[20px]" v-if="showProduct.isActive && showProduct.index === index">-</span>
              <div class="ml-2 text-gray-700">
                {{ data[key.key] }}
              </div>
            </button>
            <flex-col v-if="key.key !== 'month'" class="py-2">
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
                <flex-row v-if="key.key === 'productCategory'" :class="product.month === 'Валюта' ? 'text-blue-500' : ''" class="justify-between pl-4 fs-14 fw-4 text-gray-400">
                  {{product[key.key]}}
                </flex-row>
                <flex-row v-if="key.key !== 'productCategory'" :class="product.month === 'Валюта' ? 'text-blue-500' : ''" class="justify-between fs-14 fw-4 text-gray-400">
                  {{product[key.key]}}
                </flex-row>
              </flex-col>
            </td>
          </tr>
        </template>
      </template>
      <tr class="border-t-1 bg-input">
        <td class="fs-14 text-gray-3 pl-3 py-2">Остаток</td>
        <td class="fs-14 fw-6 text-blue-20 pl-3 py-2 "></td>
        <td class="fs-14 fw-6 text-blue-20 pl-3 py-2 "></td>
        <td class="fs-14 fw-6 text-blue-20 pl-3 py-2 ">10 000 000</td>
      </tr>
      </tbody>
    </table>
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
  showProduct.value.isActive = true
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
    name: "Месяц",
    checked:true,
    key: "month",
    type:"month",
    thWidth:'120px',
    bRadius:'8px'
  },
  {
    name: "Дебет (Заказы)",
    checked:true,
    key: "debit",
    type:"debit",
    thWidth:'120px'
  },
  {
    name: "Кредит (Оплаты)",
    checked:true,
    key: "credit",
    type:"credit",
    thWidth:'100px'
  },
  {
    name: "Сальдо (Итого)",
    checked:true,
    key: "balance",
    type:"balance",
    thWidth:'70px'
  },
  {
    name: "Дебет (Заказы)",
    checked:true,
    key: "order",
    type:"order",
    thWidth:'70px'
  },

  {
    name: "Дебет (Заказы)",
    checked:true,
    key: "order",
    type:"order",
    thWidth:'70px'
  },
  {
    name: "Кредит (Оплаты)",
    checked:true,
    key: "payment",
    type:"payment",
    thWidth:'70px'
  },
  {
    name: "Сальдо (Итого)",
    checked:true,
    key: "result",
    type:"result",
    thWidth:'70px'
  }
]);
const loadedData = ref([
  {
    month:"Приход",
    debt:"12368",
    credit:"12368",
    balance:"12368",
    order:"12368",
    payment:"12368",
    result:"12368",
    items:[
      {
        month:"Валюта",
        debt:"",
        credit:"",
        balance:"",
        order:"",
        payment:"",
        result:"",
      },
      {
        month:"Наличный",
        debt:"100 000",
        credit:"100 000",
        balance:"100 000",
        order:"100 000",
        payment:"100 000",
        result:"100 000",
      },
      {
        month:"Наличный",
        debt:"100 000",
        credit:"100 000",
        balance:"100 000",
        order:"100 000",
        payment:"100 000",
        result:"100 000",
      },
      {
        month:"Наличный",
        debt:"100 000",
        credit:"100 000",
        balance:"100 000",
        order:"100 000",
        payment:"100 000",
        result:"100 000",
      },
      {
        month:"Транзакции",
        debt:"",
        credit:"",
        balance:"",
        order:"",
        payment:"",
        result:"",
      },
      {
        month:"Наличный",
        debt:"100 000",
        credit:"100 000",
        balance:"100 000",
        order:"100 000",
        payment:"100 000",
        result:"100 000",
      },
      {
        month:"Наличный",
        debt:"100 000",
        credit:"100 000",
        balance:"100 000",
        order:"100 000",
        payment:"100 000",
        result:"100 000",
      },
    ]
  },
  {
    month:"Приход",
    debt:"12368",
    credit:"12368",
    balance:"12368",
    order:"12368",
    payment:"12368",
    result:"12368",
    items:[
      {
        month:"Валюта",
        debt:"",
        credit:"",
        balance:"",
        order:"",
        payment:"",
        result:"",
      },
      {
        month:"Наличный",
        debt:"100 000",
        credit:"100 000",
        balance:"100 000",
        order:"100 000",
        payment:"100 000",
        result:"100 000",
      },
      {
        month:"Наличный",
        debt:"100 000",
        credit:"100 000",
        balance:"100 000",
        order:"100 000",
        payment:"100 000",
        result:"100 000",
      },
      {
        month:"Наличный",
        debt:"100 000",
        credit:"100 000",
        balance:"100 000",
        order:"100 000",
        payment:"100 000",
        result:"100 000",
      },
      {
        month:"Транзакции",
        debt:"",
        credit:"",
        balance:"",
        order:"",
        payment:"",
        result:"",
      },
      {
        month:"Наличный",
        debt:"100 000",
        credit:"100 000",
        balance:"100 000",
        order:"100 000",
        payment:"100 000",
        result:"100 000",
      },
      {
        month:"Наличный",
        debt:"100 000",
        credit:"100 000",
        balance:"100 000",
        order:"100 000",
        payment:"100 000",
        result:"100 000",
      },
    ]
  },
  {
    month:"Приход",
    debt:"12368",
    credit:"12368",
    balance:"12368",
    order:"12368",
    payment:"12368",
    result:"12368",
    items:[
      {
        month:"Валюта",
        debt:"",
        credit:"",
        balance:"",
        order:"",
        payment:"",
        result:"",
      },
      {
        month:"Наличный",
        debt:"100 000",
        credit:"100 000",
        balance:"100 000",
        order:"100 000",
        payment:"100 000",
        result:"100 000",
      },
      {
        month:"Наличный",
        debt:"100 000",
        credit:"100 000",
        balance:"100 000",
        order:"100 000",
        payment:"100 000",
        result:"100 000",
      },
      {
        month:"Наличный",
        debt:"100 000",
        credit:"100 000",
        balance:"100 000",
        order:"100 000",
        payment:"100 000",
        result:"100 000",
      },
      {
        month:"Транзакции",
        debt:"",
        credit:"",
        balance:"",
        order:"",
        payment:"",
        result:"",
      },
      {
        month:"Наличный",
        debt:"100 000",
        credit:"100 000",
        balance:"100 000",
        order:"100 000",
        payment:"100 000",
        result:"100 000",
      },
      {
        month:"Наличный",
        debt:"100 000",
        credit:"100 000",
        balance:"100 000",
        order:"100 000",
        payment:"100 000",
        result:"100 000",
      },
    ]
  },
])
</script>

<style scoped>

</style>
