<template>
  <div>
    <div class="w-full">
      <div class="flex justify-end">
<!--        <div class="flex gap-4 w-full">-->
<!--          <div class="text-[18px] mt-2">Статус</div>-->
<!--          <select-->
<!--            class="form-select appearance-none my-input w-[70%] block p-2 border-primary-gray border-1 rounded-lg text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid transition ease-in-out focus:text-gray-700 focus:border-cyan-600 focus:outline-none"-->
<!--            aria-label="Default select example"-->
<!--          >-->
<!--            <option v-for="key in 10" :value="key.id">Выбрать</option>-->
<!--          </select>-->
<!--        </div>-->
<!--        <flex-row-->
<!--          class="rounded-lg bg-lotion h-full gap-2 items-center px-5 py-0.9"-->
<!--        >-->
<!--          <div class="flex gap-2">-->
<!--            <input type="radio" name="radio" />-->
<!--            <i-title> Дата заявки </i-title>-->
<!--          </div>-->
<!--          <div class="flex gap-2">-->
<!--            <input type="radio" name="radio" />-->
<!--            <i-title> Дата отгрузки </i-title>-->
<!--          </div>-->
<!--        </flex-row>-->
        <div class="flex justify-center mt-4">
          <div class="date-picker w-full">
            <input @input="inputEvent($event.target.value)" v-model="date" class="my-input w-full fa-solid mainLoginInput p-2 border-primary-gray border-1 rounded-lg"
                   type="date"
                   placeholder="Выбрать">
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-5 mt-4">
        <div class="bg-white h-[375px] rounded-lg p-6">
          <div class="flex gap-4">
            <button class="rounded-lg border w-6 h-6 p-1.5 hover:bg-gray-200">
              <ArrowBottom />
            </button>
            <div class="-mt-3.5">
              <div class="font-[600] text-[24px] mt-2">Общая сумма заявок на {{moment(date).format("DD-MMM")}}</div>
            </div>
          </div>
          <div class="fs-14 text-gray-400 mt-6">Общая сумма</div>
          <div class="text-[28px] mt-4 text-blue-10 fw-6">{{totalOrdersAmount}}</div>
          <div class="grid grid-cols-2 gap-4 mt-2">
            <div>
              <div v-for="item in totalOrders">
                <div class="fs-14 text-gray-400 mt-3">{{item.currency}}</div>
                <div class="text-[20px] fw-5">{{item.amount}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white h-[375px] rounded-lg">
          <div class="flex justify-center">
            <page-title :title="'Общая сумма заявок на 15 ноя.'" />
          </div>
          <DashboardSupervayzerDoughnutChart :categories="categories.items" :amount="amount" :name="name" :color="color"/>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-4 mt-4">
        <div class="p-4 rounded-lg bg-red-100">
          <div class="text-gray">Посещение (по визитам)</div>
          <page-title20 class="text-red" :title="totalVisit?.rebase" />
          <div class="flex justify-between mt-2">
            <div>
              <div class="fs-12 fw-4">План</div>
              <span class="fs-12 fw-6">{{ totalVisit?.plan }}</span>
            </div>
            <div>
              <div class="fs-12 fw-4">Факт</div>
              <span class="fs-12 fw-6">{{ totalVisit?.fakt }}</span>
            </div>
          </div>
        </div>
        <div class="p-4 rounded-lg bg-[#FFF9EF]">
          <div class="text-gray">Успешные визиты</div>
          <page-title20 class="text-[#482E03]" :title="orderTotal?.rebase" />
          <div class="flex justify-between mt-2">
            <div>
              <div class="fs-12 fw-4">План</div>
              <span class="fs-12 fw-6">{{orderTotal?.plan}}</span>
            </div>
            <div>
              <div class="fs-12 fw-4">Факт</div>
              <span class="fs-12 fw-6">{{ orderTotal?.fakt }}</span>
            </div>
          </div>
        </div>
        <div class="p-4 rounded-lg bg-green-100">
          <div class="text-gray">Посещение (по GPS)</div>
          <page-title20
            @click="isProduct = true"
            class="text-green-800"
            :title="'80%'"
          />
          <div class="flex justify-between mt-2">
            <div>
              <div class="fs-12 fw-4">План</div>
              <span class="fs-12 fw-6">222</span>
            </div>
            <div>
              <div class="fs-12 fw-4">Факт</div>
              <span class="fs-12 fw-6">222</span>
            </div>
          </div>
        </div>
        <div class="p-4 rounded-lg bg-green-100">
          <div class="text-gray">Фото отчеты</div>
          <page-title20 class="text-green-800" :title="photoTotal?.rebase" />
          <div class="flex justify-between mt-2">
            <div>
              <div class="fs-12 fw-4">План</div>
              <span class="fs-12 fw-6">{{ photoTotal?.plan }}</span>
            </div>
            <div>
              <div class="fs-12 fw-4">Факт</div>
              <span class="fs-12 fw-6">{{ photoTotal?.fakt }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between mt-4">
        <div class="flex gap-4">
          <button
            class="rounded-lg border w-6 h-6 p-1.5 bg-white hover:bg-gray-200"
          >
            <ArrowBottom />
          </button>
          <div class="-mt-3.5">
            <page-title :title="'Дневной отчет по визитам'" />
          </div>
        </div>
        <div class="flex gap-4">
          <div class="pt-2 check">
            <label>
              <input type="checkbox" />
              <span></span>
            </label>
          </div>
          <div class="mt-1.5">Дневной отчет по визитам</div>
        </div>
      </div>
      <div class="flex justify-between mt-3">
        <div class="flex gap-5">
          <div>
            <search-input class="w-full h-38px" />
          </div>
          <div class="flex gap-2 border h-10 bg-white rounded-lg p-2">
            <f-f-r-r-list />
            <div class="fs-14 fw-5">Стольбцы 3/10</div>
          </div>
          <div>
            <excel-btn :size="'340kb'"></excel-btn>
          </div>
        </div>
<!--        <MultiSelect />-->
        <div class="flex-row">
          <select v-model="dataSupervisor.supervisorId" class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
            <option value="Sale">Sale</option>
            <option v-for="item in superviserStore.data?.items" :value="item.id">{{item.first_name}}</option>
          </select>
        </div>
      </div>
      <div>
        <DashboardSupervayzerDataTable :filters="filtersDailyCategories" :dailyReport="dailyReport"/>
      </div>
      <div class="mt-4">
        <DashboardSupervayzerProductCategory :filters="filtersProductCategories" :supervisorStore="supervisorStore" :categories="categories"/>
      </div>
      <div class="mt-4">
        <DashboardSupervayzerSalesAgents :filters="filtersSalesAgent" :salesAgents="salesAgents"/>
      </div>
      <div class="mt-4">
        <DashboardSupervayzer :filters="filtersSupervisor" :salesSupervisor="salesSupervisor"/>
      </div>
      <div class="mt-4">
        <DashboardSupervayzerProductCategoryByAgent :headers="headers" :salesSupervisorAgentCategoryReport="salesSupervisorAgentCategoryReport"/>
      </div>
      <div class="mt-8">
        <DashboardSupervayzerProductCategoryBySVR :headers="headersS" :salesSupervisorCategoryReport="salesSupervisorCategoryReport"/>
      </div>
    </div>
    <transition name="modal">
      <div v-if="isProduct">
        <d-modal
          :dataContainerWidth="'921px'"
          @closeDialog="closeOperation"
          :name="'Cola cola'"
        >
          <div class="relative w-full">
            <DashboardSupervayzerDialogTable />
          </div>
        </d-modal>
      </div>
    </transition>
    <loading-modal v-if="loading"
                   name="Управление меню таблицы">
      <Loading/>
    </loading-modal>
  </div>
</template>

<script setup>
import ArrowBottom from "~/components/icon/ArrowBottom.vue";
import FFRRList from "~/components/icon/FFRRList.vue";
import moment from "moment/moment";
import {useSupervisorStore} from "~/stores/dashboard/supervisor/supervisor.store";
import {ref} from "vue";
import {useSupervisorsStore} from "~/stores/command/supervisor/supervisor.store";
const filter = ref({
  isClients: false,
});
const loading = ref(false)
const supervisorStore = useSupervisorStore('')
const date = ref('')
const superviserStore = useSupervisorsStore('')
const filters = ref({
  date:moment().format("YYYY-MM-DD"),
  supervisorId:null
})
const filtersCategories = ref({
  page:1,
  pageSize:10,
  date:moment().format("YYYY-MM-DD"),
  supervisorId:null
})
const filtersDailyCategories = ref({
  page:1,
  pageSize:10,
  date:moment().format("YYYY-MM-DD"),
  supervisorId:null
})
const filtersProductCategories = ref({
  page:1,
  pageSize:10,
  date:moment().format("YYYY-MM-DD"),
  supervisorId:null
})
const filtersSalesAgent = ref({
  page:1,
  pageSize:10,
  date:moment().format("YYYY-MM-DD"),
  supervisorId:null
})
const filtersSupervisor = ref({
  page:1,
  pageSize:10,
  date:moment().format("YYYY-MM-DD"),
  supervisorId:null
})
function clickOutside() {
  filter.value.isClients = false;
}
const isProduct = ref(false);
const totalOrders = ref([])
const categories = ref([])
const totalOrdersAmount = ref(null)
const photoTotal = ref(null)
const orderTotal = ref(null)
const totalVisit = ref(null)
const dailyReport = ref(null)
const salesAgents = ref(null)
const salesSupervisor = ref(null)
const salesSupervisorAgentCategoryReport = ref(null)
const salesSupervisorCategoryReport = ref(null)
let dataChart = ref([])
let dataSupervisor = ref({
  supervisorId:null
})

const inputEvent = async (e) =>{
  localStorage.setItem('dateSuper', e)
  filters.value.date = e
  filtersCategories.value.date = e
  try {
    loading.value = true
    totalOrders.value = await supervisorStore.getTotalOrders(filters.value)
    categories.value = await supervisorStore.getSupervisorCategories(filtersProductCategories.value)
    photoTotal.value = await supervisorStore.getTotalVisitPhoto(filters.value)
    orderTotal.value = await supervisorStore.getTotalVisitOrder(filters.value)
    totalVisit.value = await supervisorStore.getTotalVisit(filters.value)
    dailyReport.value = await supervisorStore.getDialyReport(filtersDailyCategories.value)
    salesAgents.value = await supervisorStore.getSalesAgent(filtersCategories.value)
    salesSupervisor.value = await supervisorStore.getSalesSupervisor(filtersSupervisor.value)
    salesSupervisorAgentCategoryReport.value = await supervisorStore.getSalesSupervisorAgentCategoryReport(filtersCategories.value)
    salesSupervisorCategoryReport.value = await supervisorStore.getSalesSupervisorCategoryReport(filtersCategories.value)
    for (let i = 0; i < totalOrders.value.length; i++){
      totalOrdersAmount.value += totalOrders.value[i].amount
    }
  }catch (error){

  }finally {
    loading.value = false
  }
}
watch(filtersProductCategories.value, async ()=>{
  dailyReport.value = await supervisorStore.getDialyReport(filtersDailyCategories.value)
})
watch(filtersDailyCategories.value, async ()=>{
  dailyReport.value = await supervisorStore.getSupervisorCategories(filtersDailyCategories.value)
})
watch(filtersSalesAgent.value, async ()=>{
  salesAgents.value = await supervisorStore.getSalesAgent(filtersSalesAgent.value)
})
watch(filtersSupervisor.value, async ()=>{
  salesSupervisor.value = await supervisorStore.getSalesSupervisor(filtersSupervisor.value)
})
watch(dataSupervisor.value, async ()=>{
  filters.value.supervisorId = dataSupervisor.value.supervisorId
  filtersCategories.value.supervisorId = dataSupervisor.value.supervisorId
  filtersProductCategories.value.supervisorId = dataSupervisor.value.supervisorId
  filtersDailyCategories.value.supervisorId = dataSupervisor.value.supervisorId
  filtersSupervisor.value.supervisorId = dataSupervisor.value.supervisorId
  try {
    loading.value = true
    totalOrders.value = await supervisorStore.getTotalOrders(filters.value)
    categories.value = await supervisorStore.getSupervisorCategories(filtersProductCategories.value)
    photoTotal.value = await supervisorStore.getTotalVisitPhoto(filters.value)
    orderTotal.value = await supervisorStore.getTotalVisitOrder(filters.value)
    totalVisit.value = await supervisorStore.getTotalVisit(filters.value)
    dailyReport.value = await supervisorStore.getDialyReport(filtersDailyCategories.value)
    salesAgents.value = await supervisorStore.getSalesAgent(filtersCategories.value)
    salesSupervisor.value = await supervisorStore.getSalesSupervisor(filtersSupervisor.value)
    salesSupervisorAgentCategoryReport.value = await supervisorStore.getSalesSupervisorAgentCategoryReport(filtersCategories.value)
    salesSupervisorCategoryReport.value = await supervisorStore.getSalesSupervisorCategoryReport(filtersCategories.value)
    for (let i = 0; i < totalOrders.value.length; i++){
      totalOrdersAmount.value += totalOrders.value[i].amount
    }
  }catch (error){

  }finally {
    loading.value = false
  }
})
function closeOperation() {
  isProduct.value = false;
}
let headers = ref([
  {
    name: "Агент",
    checked: true,
    key: "employee",
    type: "employee",
    thWidth: "160px",
    bRadius: "8px",
  },
  {
    name: "Сумма",
    checked: true,
    key: "total",
    type: "total",
    thWidth: "100px",
  },
]);
let headersS = ref([
  {
    name: "Агент",
    checked: true,
    key: "employee",
    type: "employee",
    thWidth: "160px",
    bRadius: "8px",
  },
  {
    name: "Сумма",
    checked: true,
    key: "total",
    type: "total",
    thWidth: "100px",
  },
]);
onMounted(async ()=>{
  // date.value = localStorage.getItem('dateSuper')
  // filter.value.date = date.value
  // filtersCategories.value.date = date.value
  // console.log('localStorage.getItem(',localStorage.getItem('dateSuper'))
  // totalOrders.value = await supervisorStore.getTotalOrders(filters.value)
  // categories.value = await supervisorStore.getSupervisorCategories(filtersCategories.value)
  // console.log('sssssssssss',totalOrders.value)
  // for (let i = 0; i < totalOrders.value.length; i++){
  //   totalOrdersAmount.value += totalOrders.value[i].amount
  // }
  // for (let i = 0; i < categories.value?.items.length; i++){
  //   dataChart.value.push(categories.value?.items[i].amount)
  // }
    await superviserStore.getData(true)
})
const agentCategory = ref([])
const color = ref([])
onBeforeMount(async ()=>{
  date.value = localStorage.getItem('dateSuper')
  filters.value.date = date.value
  filtersCategories.value.date = date.value
  console.log('localStorage.getItem(',localStorage.getItem('dateSuper'))
  totalOrders.value = await supervisorStore.getTotalOrders(filters.value)
  categories.value = await supervisorStore.getSupervisorCategories(filtersCategories.value)
  photoTotal.value = await supervisorStore.getTotalVisitPhoto(filters.value)
  orderTotal.value = await supervisorStore.getTotalVisitOrder(filters.value)
  totalVisit.value = await supervisorStore.getTotalVisit(filters.value)
  dailyReport.value = await supervisorStore.getDialyReport(filtersCategories.value)
  salesAgents.value = await supervisorStore.getSalesAgent(filtersSalesAgent.value)
  salesSupervisor.value = await supervisorStore.getSalesSupervisor(filtersCategories.value)
  salesSupervisorAgentCategoryReport.value = await supervisorStore.getSalesSupervisorAgentCategoryReport(filtersCategories.value)
  salesSupervisorCategoryReport.value = await supervisorStore.getSalesSupervisorCategoryReport(filtersCategories.value)
  console.log('sssssssssss',totalOrders.value)
  for (let i = 0; i < totalOrders.value.length; i++){
    totalOrdersAmount.value += totalOrders.value[i].amount
  }
  for (let i = 0; i < salesSupervisorAgentCategoryReport.value?.items.length; i++){
    for (let j = 0; j < salesSupervisorAgentCategoryReport.value?.items[i].akb.detail.length; j++){
      headers.value.push({
        name: salesSupervisorAgentCategoryReport.value?.items[i].akb.detail[j].category_name,
        checked: true,
        key: salesSupervisorAgentCategoryReport.value?.items[i].akb.detail[j].category_name,
        type: salesSupervisorAgentCategoryReport.value?.items[i].akb.detail[j].category_name,
        thWidth: "350px",
      })
    }
  }
  for (let i = 0; i < salesSupervisorCategoryReport.value?.items.length; i++){
    for (let j = 0; j < salesSupervisorCategoryReport.value?.items[i].akb.detail.length; j++){
      headersS.value.push({
        name: salesSupervisorCategoryReport.value?.items[i].akb.detail[j].category_name,
        checked: true,
        key: salesSupervisorCategoryReport.value?.items[i].akb.detail[j].category_name,
        type: salesSupervisorCategoryReport.value?.items[i].akb.detail[j].category_name,
        thWidth: "350px",
      })
    }
  }
  for (let i = 0; i < categories.value?.items.length; i++){
    color.value.push('#' + Math.floor(Math.random() * 16777215).toString(16))
  }
})
// const buildTime = useInjectedBuildTime();
const amount = computed(()=> {
  return categories.value.items?.map(item => item?.share);
})
const name = computed(()=> {
  return categories.value.items?.map(item => item?.name);
})

</script>

<style scoped>
input[type="radio"] {
  /* ...existing styles */
  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #299b9b;
  border: 1px solid #cccccc;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
}

input[type="radio"]:checked::before {
  transform: scale(1);
}

.form_radio_btn {
  display: inline-block;
}

.form_radio_btn input[type="radio"] {
  display: none;
}

.form_radio_btn label {
  display: inline-block;
  cursor: pointer;
  line-height: 100%;
  user-select: none;
}

/* Checked */
.form_radio_btn input[type="radio"]:checked + label {
  background: #299b9b;
  color: white;
}

/* Hover */
.form_radio_btn label:hover {
  color: #666;
}

/* Disabled */
.form_radio_btn input[type="radio"]:disabled + label {
  background: #efefef;
  color: #666;
}
.check label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
.check label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
.check [type="checkbox"]:checked + span:before {
  content: "\f106";
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all 0.4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299b9b;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.date-picker input{
  width: 100%;
  padding-left: 45px;
  position: relative;
}
.date-picker input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  color: rgba(0, 0, 0, 0);
  opacity: 1;
  display: block;
  background: url(~/assets/svg/date-pickerscg.svg) no-repeat;
  width: 20px;
  height: 20px;
  left: 10px;
  border-width: thin;
  top: 12px;
}
</style>
