<template>
  <div class="rounded-lg bg-white border-grey px-[2px]">
    <div class="overflow-y-auto table-containers">
      <data-table-common2 :headers="headers"
                  @sort="sortData"
                  :sorted="sortedData">
        <template #body>
          <template v-for="(data, index) in loadedData" :key="index">
            <c-tr class="border-b-none b-bottom cursor-pointer">
              <c-td-no-edit v-for="key in headers" :key="key" >
                <div class="p-2" v-if="key.checked && key.key !== 'category'">
                  {{ data[key.key] }}
                </div>
                <div class="p-2 text-blue-10 flex" v-if="key.key === 'category'">
                  <span class="mt-2 mr-2"> <IconArrowBottom /></span>
                  {{ data[key.key] }}
                </div>
              </c-td-no-edit>
            </c-tr>
          </template>
          <tr class="border-t border-gray-40 ">
            <td><div class="fw-6 mt-2 ml-3">Total</div></td>
            <td><div class="fw-6 mt-2 ml-3"></div></td>
            <td><div class="fw-6 mt-2 ml-3">99 шт</div></td>
            <td><div class="fw-6 mt-2 ml-3">109 шт</div></td>
            <td><div class="fw-6 mt-2 ml-3">99 шт</div></td>
            <td><div class="fw-6 mt-2 ml-3"></div></td>
            <td><div class="fw-6 mt-2 ml-3"></div></td>
            <td><div class="fw-6 mt-2 ml-3">153 000 000</div></td>
          </tr>
        </template>
      </data-table-common2>
    </div>
  </div>
</template>

<script setup>
// State
import {ref} from "vue";
const searchText = ref("")
const availablePages = ref(28)
let currentPage = ref(1)
let pageSize = ref(10)
const draggable = ref(false)
// Methods
const dataContainerWidth = ref('1140px')
const changeStatus = ref(false)
function draggableDialog(){
  draggable.value = false
}

let headers = ref([
  {
    name: "№",
    checked:true,
    key: "no",
    type:"no",
    thWidth:'60px'
  },
  {
    name: "Категория",
    checked:true,
    key: "category",
    type:"category",
    thWidth:'120px',
    bRadius:'8px'
  },
  {
    name: "Бл",
    checked:true,
    key: "bl",
    type:"bl",
    thWidth:'120px'
  },
  {
    name: "Кол-во",
    checked:true,
    key: "qty",
    type:"qty",
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
    name: "Бонус",
    checked:true,
    key: "bonus",
    type:"bonus",
    thWidth:'100px'
  },
  {
    name: "Бонус",
    checked:true,
    key: "bonus",
    type:"bonus",
    thWidth:'70px'
  },
  {
    name: "Сумма",
    checked:true,
    key: "amount",
    type:"amount",
    thWidth:'70px'
  }
]);
const loadedData = ref([
  {
    no:"1",
    category:"Snickers",
    bl:"1,5",
    qty:"15 ШТ",
    volume:"2 кг",
    bonus:"5%",
    amount:"330 000",
  },
  {
    no:"1",
    category:"Snickers",
    bl:"1,5",
    qty:"15 ШТ",
    volume:"2 кг",
    bonus:"5%",
    amount:"330 000",
  },
  {
    no:"1",
    category:"Snickers",
    bl:"1,5",
    qty:"15 ШТ",
    volume:"2 кг",
    bonus:"5%",
    amount:"330 000",
  },
  {
    no:"1",
    category:"Snickers",
    bl:"1,5",
    qty:"15 ШТ",
    volume:"2 кг",
    bonus:"5%",
    amount:"330 000",
  },
  {
    no:"1",
    category:"Snickers",
    bl:"1,5",
    qty:"15 ШТ",
    volume:"2 кг",
    bonus:"5%",
    amount:"330 000",
  },
  {
    no:"1",
    category:"Snickers",
    bl:"1,5",
    qty:"15 ШТ",
    volume:"2 кг",
    bonus:"5%",
    amount:"330 000",
  },
])
let sortedData = ref({key: '', mode: ''});


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
.b-bottom:last-child{
  border-bottom: 1px solid #E1E4E4;
}
</style>
