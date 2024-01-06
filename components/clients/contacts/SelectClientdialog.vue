<template>
  <div class="w-full">
    <div v-click-outside="clickOutside" class="w-full rounded-lg bg-white border-grey px-[2px]">
      <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
        <div>
          <search-input :value="searchText"
                        @updated="searchUpdated"
                        class="w-full h-38px"/>
        </div>
        <div class="ml-4 fs-14">Клиент</div>
        <div class="w-[230px]">
          <multiply-selections :filter.sync="filter.isSelectAgent" @toggle="toggle => filter.isSelectAgent = toggle" :name="'Агент'"/>
        </div>
      </div>
      <div class=" w-full overflow-auto">
        <data-table :headers="headers"
                    @sort="sortData"
                    :sorted="sortedData">
          <template #body>
            <template v-for="(data, index) in loadedData" :key="index">
              <c-tr class="border-b-none b-bottom cursor-pointer">
                <c-td-no-edit v-for="key in headers" :key="key" >
                  <div class="pt-2 -ml-1 check" v-if="key.key === 'checkbox'">
                    <checkbox :values="key.checked"/>
                  </div>
                  <div class="" v-if="key.checked">
                    {{ data[key.key] }}
                  </div>
                </c-td-no-edit>
              </c-tr>
            </template>
          </template>
        </data-table>
      </div>
      <div class="flex justify-between w-full">
        <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14">
          Показать по
        </span>
          <page-size-btn :current-size="pageSize" @setPageSize="setPageSize"/>
        </div>
        <div class="p-3">
          <page-index :available-pages="availablePages"
                      :current-page="currentPage"
                      @setPage="setPage"/>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-4">
      <button class="bg-[#EEF7F7] rounded-lg py-2 px-24">Отменить</button>
      <button class="bg-[#299B9B] text-white rounded-lg py-2 px-24" >Добавить</button>
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
const selectModal = ref(false)
function selectDialog(){
  selectModal.value = false
}
const clickOutside = () => {}
const filter = ref({
  isSelectAgent: false
})
let headers = ref([
  {
    name: "",
    checked:true,
    key: "checkbox",
    type:"checkbox",
    thWidth:'100px'
  },
  {
    name: "ID",
    checked:true,
    key: "id",
    type:"id",
    thWidth:'80px'
  },
  {
    name: "Имя",
    checked:true,
    key: "name",
    type:"name",
    thWidth:'120px',
    bRadius:'8px'
  },
  {
    name: "Название фирмы",
    checked:true,
    key: "firmName",
    type:"firmName",
    thWidth:'140px'
  },
  {
    name: "Номер телефона",
    checked:true,
    key: "phoneNumber",
    type:"phoneNumber",
    thWidth:'140px'
  },
  {
    name: "Категория",
    checked:true,
    key: "category",
    type:"category",
    thWidth:'100px'
  },
  {
    name: "category",
    checked:true,
    key: "territory",
    type:"territory",
    thWidth:'120px'
  },
  {
    name: "Адрес",
    checked:true,
    key: "adress",
    type:"adress",
    thWidth:'100px'
  },
  {
    name: "Ориентир",
    checked:true,
    key: "location",
    type:"location",
    thWidth:'120px'
  },
  {
    name: "Баланс",
    checked:true,
    key: "balance",
    type:"balance",
    thWidth:'120px'
  },
  {
    name: "Просрочки",
    checked:true,
    key: "delays",
    type:"delays",
    thWidth:'120px'
  },
]);
const loadedData = ref([
  {
    id:"ID1326",
    name:"Fakhriyor",
    firmName:"KKhalmatov",
    phoneNumber:"+998 97 628 28 82",
    category:"3",
    territory:"Lorem ipsum",
    adress:"Lorem ipsum",
    location:"Lorem ipsum",
    balance:"3",
    delays:"2021-10-27"
  },
  {
    id:"ID1326",
    name:"Fakhriyor",
    firmName:"KKhalmatov",
    phoneNumber:"+998 97 628 28 82",
    category:"3",
    territory:"Lorem ipsum",
    adress:"Lorem ipsum",
    location:"Lorem ipsum",
    balance:"3",
    delays:"2021-10-27"
  },
  {
    id:"ID1326",
    name:"Fakhriyor",
    firmName:"KKhalmatov",
    phoneNumber:"+998 97 628 28 82",
    category:"3",
    territory:"Lorem ipsum",
    adress:"Lorem ipsum",
    location:"Lorem ipsum",
    balance:"3",
    delays:"2021-10-27"
  },
  {
    id:"ID1326",
    name:"Fakhriyor",
    firmName:"KKhalmatov",
    phoneNumber:"+998 97 628 28 82",
    category:"3",
    territory:"Lorem ipsum",
    adress:"Lorem ipsum",
    location:"Lorem ipsum",
    balance:"3",
    delays:"2021-10-27"
  },
  {
    id:"ID1326",
    name:"Fakhriyor",
    firmName:"KKhalmatov",
    phoneNumber:"+998 97 628 28 82",
    category:"3",
    territory:"Lorem ipsum",
    adress:"Lorem ipsum",
    location:"Lorem ipsum",
    balance:"3",
    delays:"2021-10-27"
  },
  {
    id:"ID1326",
    name:"Fakhriyor",
    firmName:"KKhalmatov",
    phoneNumber:"+998 97 628 28 82",
    category:"3",
    territory:"Lorem ipsum",
    adress:"Lorem ipsum",
    location:"Lorem ipsum",
    balance:"3",
    delays:"2021-10-27"
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
  bottom: 40px;
  top: 40px;
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
  cursor:pointer;
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.04)
}
</style>
