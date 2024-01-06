<template>
  <div class="mt-4">
    <div class="font-[600] text-[24px]">Продукты</div>{{products}}
    <div class="w-full mt-4">
      <div class="rounded-lg">
        <button
            v-for="(item, index) in data.product_groups"
            :key="item.id"
            @click="selectCategory(index, item.category_id)"
            :class="[
            groupCategory.isActive && groupCategory.index === index
              ? 'order bgc'
              : '',
          ]"
            class="px-4 py-2 order border-r bg-white text-[#8FA0A0]"
        >
          {{ item.category_name }}
        </button>
      </div>
    </div>
    <div>
      <div class="rounded-lg bg-white border-grey mt-3 px-[2px] relative w-full">
        <div class=" w-full overflow-auto">
          <data-table :headers="headers"
                      @sort="sortData"
                      :sorted="sortedData">
            <template #body>
              <c-tr v-for="data in productsByCategory" :key="data">
                <c-td-no-edit v-for="(key, index) in headers" :key="key" >
                  <div class="py-2">
                    <div class="mt-[-10px] mb-[-10px]" v-if="key.key === 'active'">
                      <button class="h-[33px]  w-[80px] fs-12 bg-[#E3FCF0] rounded-[41px]">Активный</button>
                    </div>
                    <div v-if="key.checked === true && key.key !== 'no'">
                      {{ data[key.key] }}
                    </div>
                    <div v-if="key.checked === true && key.key === 'no'">
                      {{ index +1 }}
                    </div>
                  </div>
                </c-td-no-edit>
              </c-tr>
              <c-tr>
                <td></td>
                <td><div class="fs-14 ml-2">Итого</div></td>
                <td></td>
                <td><div class="ml-2">{{productsDa.unit}} шт</div></td>
                <td><div class="ml-2">{{productsDa.unit}} шт</div></td>
                <td><div class="ml-2">{{productsDa.unit}} шт</div></td>
                <td><div class="fs-16 text-[#299B9B] font-[600] py-2">{{productsDa.totalAmount}}</div></td>
              </c-tr>
            </template>
          </data-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
const props = defineProps({
  data:Array,
  productsByCategory:Array
})
const emit = defineEmits(['selectCategory'])
const groupCategory = ref({
  isActive: true,
  index: 0,
});
const products = ref()
const productsDa = ref({
  totalAmount:0,
  unit:0
})
function totalAmount(sum, num) {
  return sum + num;
}
function selectCategory(index, id){
  emit('selectCategory',index,id)
  groupCategory.value.isActive = true
  groupCategory.value.index = index
  // products.value = data.product_groups.filter(i => i.category_id === id)
  for(let i = 0; i < props.products.value.length; i++){
    productsDa.value.totalAmount += products.value[i].total_cost
    productsDa.value.unit += products.value[i].unit
  }

}
let headers = ref([
  {
    name: "№",
    checked:true,
    key: "no",
    thWidth:'40px',
    bRadius:'8px'
  },
  {
    name: "Ассортимент",
    checked:true,
    key: "name",
    thWidth:'250px'
  },
  {
    name: "Цена",
    checked:true,
    key: "price",
    thWidth:'120px'
  },
  {
    name: "Блок",
    checked:true,
    key: "unit",
    thWidth:'120px'
  },
  {
    name: "Количество",
    checked:true,
    key: "count",
    thWidth:'120px'
  },
  {
    name: "Объем",
    checked:true,
    key: "volume",
    thWidth:'120px'
  },
  {
    name: "Общая сумма",
    checked:true,
    key: "total_cost",
    thWidth:'120px'
  },
]);

const amount = ref(0)
function inputValue(param){
  amount.value = param
}
const loadedData = ref([
  {
    no: "1",
    range: "\"Dena\" - Слива Вишня Яблоко - 1л",
    price:"100 000 000 сум",
    block:"156 бл.",
    quantity:"156 бл.",
    volume:"15 шт",
    totalAmount:"100 000 000 сум"
  },
  {
    no: "1",
    range: "\"Dena\" - Слива Вишня Яблоко - 1л",
    price:"100 000 000 сум",
    block:"156 бл.",
    quantity:"156 бл.",
    volume:"15 шт",
    totalAmount:"100 000 000 сум"
  },
  {
    no: "1",
    range: "\"Dena\" - Слива Вишня Яблоко - 1л",
    price:"100 000 000 сум",
    block:"156 бл.",
    quantity:"156 бл.",
    volume:"15 шт",
    totalAmount:"100 000 000 сум"
  },
  {
    no: "1",
    range: "\"Dena\" - Слива Вишня Яблоко - 1л",
    price:"100 000 000 сум",
    block:"156 бл.",
    quantity:"156 бл.",
    volume:"15 шт",
    totalAmount:"100 000 000 сум"
  },
  {
    no: "1",
    range: "\"Dena\" - Слива Вишня Яблоко - 1л",
    price:"100 000 000 сум",
    block:"156 бл.",
    quantity:"156 бл.",
    volume:"15 шт",
    totalAmount:"100 000 000 сум"
  },
  {
    no: "1",
    range: "\"Dena\" - Слива Вишня Яблоко - 1л",
    price:"100 000 000 сум",
    block:"156 бл.",
    quantity:"156 бл.",
    volume:"15 шт",
    totalAmount:"100 000 000 сум"
  },
  {
    no: "1",
    range: "\"Dena\" - Слива Вишня Яблоко - 1л",
    price:"100 000 000 сум",
    block:"156 бл.",
    quantity:"156 бл.",
    volume:"15 шт",
    totalAmount:"100 000 000 сум"
  },
])
let sortedData = ref({key: '', mode: ''});

function sortData(data) {
  sortedData.value = data
}

</script>

<style scoped>
.bl-r{
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
}

/* Checked */
.form_radio_btn input[type=radio]:checked + label {
  background: #299B9B;
  color: white;
  text-align: center;
  height: 44px;
}
.bl-r {
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
}
/* Checked */
.form_radio_btn input[type="radio"]:checked + label {
  background: #299b9b;
  color: white;
  text-align: center;
  height: 44px;
}
.form_radio_btn input[type="radio"]:checked > .ch:last-child {
  background: #299b9b;
  color: white;
  text-align: center;
  height: 44px;
}
.order:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.order:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.bgc {
  background: #299b9b;
  color: white;
}

</style>
