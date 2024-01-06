<template>
  <flex-row class="w-full overflow-auto pb-3 bg-white mb-2 rounded-lg border-grey mt-4">
    <table class="w-full rounded-t-large overflow-hidden whitespace-nowrap ">
      <thead>
      <tr class="bg-lotion child border-b-1">
        <template v-for="(header, index) in headers" :key="headers">
          <td class="fw-4 text-gray-3 px-2 py-2.5 ">
            <div class="flex p-1 gap-1 fs-14 fw-4">
              <div :style="{width: header.thWidth}">
                <flex-row  class="justify-start fw-4 fs-14 items-center text-gray-400">
            <span>
              {{header.name}}
            </span >
                </flex-row>
              </div>
              <div v-if="header.key !== 'ty'" class="grid -mt-1">
                <fa-icon class="fa-icon cursor-pointer h-1"
                         hash="&#xf0d8"/>
                <fa-icon class="fa-icon cursor-pointer h-1 -mt-1"
                         hash="&#xf0d7"/>
              </div>
            </div>
          </td>
        </template>
      </tr>
      </thead>
      <tbody>
      <template v-for="(data, index) in loadedData" :key="data">
        <tr class="border-t-1 child">
          <td v-for="key in headers" :key="key" class="pl-3">
            <flex-col  class="">
              <flex-row class="justify-start fw-4 fs-14 items-center text-gray-700">
                <div v-if="key.key !== 'quantitys' && key.key !== 'price'" class="p-2">
                  {{ data[key.key] }}
                </div>
                <div v-if="key.key === 'quantitys'" class="p-2">
                  <input type="number" class="border rounded-lg w-30 p-1">
                </div>
                <div v-if="key.key === 'price'" class="p-2">
                  <input type="number" class="border rounded-lg w-30 p-1">
                </div>
              </flex-row>
            </flex-col>
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

const expeditorStore = useReportExpeditorStore("main")

const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});
// State
import {useProductCategoryStore} from "~/stores/settings/product-categories/product-categories.store";
// import {K} from "~/.output/public/_nuxt/entry.001aa4b5";

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
    name: "Код",
    checked:true,
    key: "code",
    type:"code",
    thWidth:'100px'
  },
  {
    name: "товара",
    checked:true,
    key: "product",
    type:"product",
    thWidth:'150px'
  },
  {
    name: "Блок",
    checked:true,
    key: "block",
    type:"block",
    thWidth:'100px'
  },
  {
    name: "Количество",
    checked:true,
    key: "quantity",
    type:"quantity",
    thWidth:'100px'
  },
  {
    name: "",
    checked:true,
    key: "ty",
    type:"ty",
    thWidth:'150px'
  },
  {
    name: "В количестве",
    checked:true,
    key: "quantitys",
    type:"quantitys",
    thWidth:'100px'
  }
  ,
  {
    name: "Цена",
    checked:true,
    key: "price",
    type:"price",
    thWidth:'100px'
  }
]);
const loadedData = ref([
  {
    no:"1",
    code:"12345",
    product:"Lorem ipsum lorem ipsum",
    block:"1091 бл. 4 шт.",
    quantity:"13096 шт.",
    quantitys:"Lorem ipsum lorem ipsum",
    price:"sd"
  },
  {
    no:"1",
    code:"12345",
    product:"Lorem ipsum lorem ipsum",
    block:"1091 бл. 4 шт.",
    quantity:"13096 шт.",
    quantitys:"Lorem ipsum lorem ipsum",
    price:""
  },
  {
    no:"1",
    code:"12345",
    product:"Lorem ipsum lorem ipsum",
    block:"1091 бл. 4 шт.",
    quantity:"13096 шт.",
    quantitys:"Lorem ipsum lorem ipsum",
    price:""
  },
  {
    no:"1",
    code:"12345",
    product:"Lorem ipsum lorem ipsum",
    block:"1091 бл. 4 шт.",
    quantity:"13096 шт.",
    quantitys:"Lorem ipsum lorem ipsum",
    price:""
  },
  {
    no:"1",
    code:"12345",
    product:"Lorem ipsum lorem ipsum",
    block:"1091 бл. 4 шт.",
    quantity:"13096 шт.",
    quantitys:"Lorem ipsum lorem ipsum",
    price:""
  },
  {
    no:"1",
    code:"12345",
    product:"Lorem ipsum lorem ipsum",
    block:"1091 бл. 4 шт.",
    quantity:"13096 шт.",
    quantitys:"Lorem ipsum lorem ipsum",
    price:""
  },
])
</script>
<style scoped>
.child td:nth-child(3){
  border-right: 1px solid #E1E4E4;
}
.child td:nth-child(5){
  border-right: 1px solid #E1E4E4;
}
.child td:nth-child(5){
  border-right: 1px solid #E1E4E4;
}
.child td:nth-child(6){
  border-right: 1px solid #E1E4E4;
}
</style>


