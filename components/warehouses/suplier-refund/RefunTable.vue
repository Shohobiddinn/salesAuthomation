<template>
  <div class="mt-4">
    <div>
      <div class="rounded-lg bg-white border-grey mt-3 px-[2px] relative w-full">
        <div class=" table-containers overflow-y-auto">
          <data-table-common2 :headers="headers"
                      @sort="sortData"
                      :sorted="sortedData">
            <template #body>
              <c-tr v-for="(data, index) in loadedData" :trBg="false" :key="data">
                <c-td v-for="key in headers" :key="key" >
                  <div class="py-2">
                    <div class="mt-[-10px] mb-[-10px]" v-if="key.key === 'active'">
                      <button class="h-[33px]  w-[80px] fs-12 bg-[#E3FCF0] rounded-[41px]">Активный</button>
                    </div>
                    <div v-if="key.checked && key.key !== 'block' && key.key !== 'quantity' && key.key !== 'price' && key.key !== 'range'">
                      {{ data[key.key] }}
                    </div>
                    <div v-if="key.checked && key.key === 'range'">
                      <multiply-selections :name="'Склад приёма *'" :h="true" :filter.sync="filter.isCash" @toggle="toggle => filter.isCash = toggle"/>
                    </div>
                    <div v-if="key.checked && key.key === 'block'">
                      <input class="border rounded-lg h-8 w-20 p-2 focus:border-blue-10 active:border-blue-10" type="number">
                    </div>
                    <div v-if="key.checked && key.key === 'price'">
                      <input class="border rounded-lg h-8 w-20 p-2 focus:border-blue-10 active:border-blue-10" type="number">
                    </div>
                    <div v-if="key.checked && key.key === 'quantity'">
                      <input class="border rounded-lg h-8 w-20 p-2 relative focus:border-blue-10 active:border-blue-10" type="number">
                    </div>
                  </div>
                </c-td>
                <c-td>
                  <button><IconTrash/></button>
                </c-td>
              </c-tr>
              <c-tr>
                <td></td>
                <td><div class="fs-14 ml-2">Итого</div></td>
                <td></td>
                <td><div class="ml-2">1569 шт</div></td>
                <td><div class="ml-2">1569 шт</div></td>
                <td><div class="ml-2">1569 шт</div></td>
                <td><div class="fs-16 text-[#299B9B] font-[600] py-2">40 400 000 UZS</div></td>
              </c-tr>
            </template>
          </data-table-common2>
          <div class="flex justify-end pb-2 pr-2">
            <button class="border border-blue-20 rounded-lg bg-white p-2 text-black fs-14">Добавить продукт</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
const filter = ref({
  isCash:false
})

let headers = ref([
  {
    name: "Код",
    checked:true,
    key: "code",
    type: "code",
    thWidth:'40px',
    bRadius:'8px'
  },
  {
    name: "Ассортимент",
    checked:true,
    key: "range",
    thWidth:'250px'
  },
  {
    name: "Цена",
    checked:true,
    key: "price",
    thWidth:'120px'
  },
  {
    name: "На складе\n",
    checked:true,
    key: "warehouses",
    thWidth:'120px'
  },
  {
    name: "Блок",
    checked:true,
    key: "block",
    thWidth:'120px'
  },
  {
    name: "Количество",
    checked:true,
    key: "quantity",
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
    key: "totalAmount",
    thWidth:'120px'
  },
]);

const loadedData = ref([
  {
    code: "13268",
    range: "\"Dena\" - Слива Вишня Яблоко - 1л",
    price:"100 000 000 сум",
    warehouses:"13268",
    block:"156 бл.",
    quantity:"156 бл.",
    volume:"15 шт",
    totalAmount:"100 000 000 сум"
  },
  {
    code: "13268",
    range: "\"Dena\" - Слива Вишня Яблоко - 1л",
    price:"100 000 000 сум",
    warehouses:"13268",
    block:"156 бл.",
    quantity:"156 бл.",
    volume:"15 шт",
    totalAmount:"100 000 000 сум"
  },
  {
    code: "13268",
    range: "\"Dena\" - Слива Вишня Яблоко - 1л",
    price:"100 000 000 сум",
    warehouses:"13268",
    block:"156 бл.",
    quantity:"156 бл.",
    volume:"15 шт",
    totalAmount:"100 000 000 сум"
  },
  {
    code: "13268",
    range: "\"Dena\" - Слива Вишня Яблоко - 1л",
    price:"100 000 000 сум",
    warehouses:"13268",
    block:"156 бл.",
    quantity:"156 бл.",
    volume:"15 шт",
    totalAmount:"100 000 000 сум"
  },
  {
    code: "13268",
    range: "\"Dena\" - Слива Вишня Яблоко - 1л",
    price:"100 000 000 сум",
    warehouses:"13268",
    block:"156 бл.",
    quantity:"156 бл.",
    volume:"15 шт",
    totalAmount:"100 000 000 сум"
  },
  {
    code: "13268",
    range: "\"Dena\" - Слива Вишня Яблоко - 1л",
    price:"100 000 000 сум",
    warehouses:"13268",
    block:"156 бл.",
    quantity:"156 бл.",
    volume:"15 шт",
    totalAmount:"100 000 000 сум"
  },
  {
    code: "13268",
    range: "\"Dena\" - Слива Вишня Яблоко - 1л",
    price:"100 000 000 сум",
    warehouses:"13268",
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
</style>

