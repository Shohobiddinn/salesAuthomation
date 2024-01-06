<template>
  <div v-click-outside="clickOutside" class="rounded-lg bg-white border-grey px-[2px]">
    <div class=" w-full overflow-auto">
      <data-table :headers="headers"
                  @sort="sortData"
                  :sorted="sortedData">
        <template #body>
          <template v-for="(data, index) in loadedData" :key="index">
            <c-tr class="border-b-none b-bottom cursor-pointer">
              <c-td-no-edit v-for="key in headers" :key="key" >
                <div class="pt-2 ml-[-3px] check" v-if="key.key === 'checkbox'">
                  <checkbox :values="key.checked"/>
                </div>
                <div @click="paymentModal = true" class="pt-2 check" v-if="key.key === 'id'">
                  {{ data[key.key] }}
                </div>
                <div class="" v-if="key.checked && key.key !== 'id'">
                  {{ data[key.key] }}
                </div>
              </c-td-no-edit>
            </c-tr>
          </template>
        </template>
      </data-table>
    </div>
    <div class="flex justify-between w-full mt-[-10px]">
      <div class="flex p-3 gap-4 items-center">
        <button class="bg-[#D10505] rounded-lg py-2 px-6 text-white">Очистить</button>
        <button class="bg-[#D10505] rounded-lg py-2 px-6 text-white">Удалить (выбранные)</button>
      </div>
      <div class="p-3 flex gap-4">
        <div class="flex gap-4 mt-2">
          <div class="text-[#8FA0A0]">Итого</div>
          <div class="text-[#299B9B] fw-6">10 000</div>
        </div>
        <button class="bg-[#299B9B] rounded-lg py-2 px-6 text-white">Отправить</button>
      </div>
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

let headers = ref([
  {
    name: "",
    checked:true,
    key: "checkbox",
    type:"checkbox",
    thWidth:'100px'
  },
  {
    name: "№",
    checked:true,
    key: "no",
    type:"no",
    thWidth:'40px'
  },
  {
    name: "Шаблон",
    checked:true,
    key: "pattern",
    type:"pattern",
    thWidth:'140px',
    bRadius:'8px'
  },
  {
    name: "Отправитель",
    checked:true,
    key: "sender",
    type:"sender",
    thWidth:'120px'
  },
  {
    name: "Номер телефона",
    checked:true,
    key: "phoneNumber",
    type:"phoneNumber",
    thWidth:'140px'
  },
  {
    name: "Сообщения",
    checked:true,
    key: "message",
    type:"message",
    thWidth:'100px'
  },
  {
    name: "Смс",
    checked:true,
    key: "sms",
    type:"sms",
    thWidth:'100px'
  },
  {
    name: "Дата создания",
    checked:true,
    key: "dateCreation",
    type:"dateCreation",
    thWidth:'180px'
  },
  {
    name: "Действие",
    checked:true,
    key: "action",
    type:"action",
    thWidth:'100px'
  }
]);
const loadedData = ref([
  {
    no:"1",
    pattern:"Lorem ipsum",
    sender:"Fakhriyor",
    phoneNumber:"+998 97 628 28 82",
    message:"Lorem ipsum",
    sms:"Lorem ipsum",
    dateCreation:"dateCreation",
    action:"Lorem ipsum"
  },
  {
    no:"1",
    pattern:"Lorem ipsum",
    sender:"Fakhriyor",
    phoneNumber:"+998 97 628 28 82",
    message:"Lorem ipsum",
    sms:"Lorem ipsum",
    dateCreation:"dateCreation",
    action:"Lorem ipsum"
  },
  {
    no:"1",
    pattern:"Lorem ipsum",
    sender:"Fakhriyor",
    phoneNumber:"+998 97 628 28 82",
    message:"Lorem ipsum",
    sms:"Lorem ipsum",
    dateCreation:"dateCreation",
    action:"Lorem ipsum"
  },
  {
    no:"1",
    pattern:"Lorem ipsum",
    sender:"Fakhriyor",
    phoneNumber:"+998 97 628 28 82",
    message:"Lorem ipsum",
    sms:"Lorem ipsum",
    dateCreation:"dateCreation",
    action:"Lorem ipsum"
  },
  {
    no:"1",
    pattern:"Lorem ipsum",
    sender:"Fakhriyor",
    phoneNumber:"+998 97 628 28 82",
    message:"Lorem ipsum",
    sms:"Lorem ipsum",
    dateCreation:"dateCreation",
    action:"Lorem ipsum"
  },
  {
    no:"1",
    pattern:"Lorem ipsum",
    sender:"Fakhriyor",
    phoneNumber:"+998 97 628 28 82",
    message:"Lorem ipsum",
    sms:"Lorem ipsum",
    dateCreation:"dateCreation",
    action:"Lorem ipsum"
  },
])
let sortedData = ref({key: '', mode: ''});

// Methods
function searchUpdated(text) {
  console.log(text)
}

function sortData(data) {
  sortedData.value = data
}

function setPage(index){
  currentPage.value = index
}

function setPageSize(size){
  pageSize.value = size
}

</script>

<style scoped>
.down{
  display: none;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
.active-down{
  display: block;
  background-color: white;
}
.down:after{
  position: absolute;
  content: '';
  right: -11px;
  bottom: 20px;
  top: 20px;
  border-left: 15px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
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
.b-top-none{
  border-top: none;
}
.bgy{
  background: rgba(189, 127, 6, 0.1);
}
.bg-accepted{
  background: rgba(35, 192, 10, 0.1);
}
.bg-new{
  background: rgba(41, 155, 155, 0.1);
}
.td-shadow{
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.04)
}
</style>

