<template>
  <rounded-white-container>
    <div class="flex flex-row justify-between items-center">
<!--      <div class="flex flex-row gap-2">-->
<!--        <div @click="draggable = true">-->
<!--          <i-btn>-->
<!--            <IconColsSVG/>-->
<!--          </i-btn>-->
<!--        </div>-->
<!--        <table-filter :templates="unitsStore.templates"></table-filter>-->
<!--        <div>-->
<!--          <search-input-->
<!--              @change="unitsStore.search"-->
<!--              class="w-full h-38px"/>-->
<!--        </div>-->
<!--        <div>-->
<!--          <excel-btn :size="'340kb'"></excel-btn>-->
<!--        </div>-->
<!--      </div>-->
      <div v-if="newHeaders.tasks.length > 0" class="flex flex-row gap-2">
        <button v-if="selectedBonus.isSelected" class="rounded-lg bg-green-100 text-green-500 px-9 py-2.5">
          Бонус добавлен
        </button>
        <button v-if="!selectedBonus.isSelected" @click="addBonus" class="rounded-lg bg-blue-600 text-white px-9 py-2.5">
          Доб. бонус
        </button>
        <button @click="cancel" class="rounded-lg bg-gray-30 px-9 py-2.5">
          Отменить
        </button>
        <m-btn @click="save">
          Сохранить
        </m-btn>
      </div>
      <div v-else class="flex flex-row gap-2">
        <menu-btn>
          <template #btn>
            <dm-btn> Настроить цвета </dm-btn>
          </template>
          <template #content>
            <button class="whitespace-nowrap border-b-1 py-2 w-full text-start">
              Настройки супервайзера
            </button>
            <button class="whitespace-nowrap border-b-1 py-2 w-full text-start">
              Настройки Агента
            </button>
            <button class="whitespace-nowrap border-b-1 py-2 w-full text-start">
              Настройки Экспедитора
            </button>
            <button class="whitespace-nowrap py-2 w-full text-start">
              Настройки Территории
            </button>
          </template>
        </menu-btn>
        <m-btn @click="dialogStore.openDialog">
          Добавить KPI
        </m-btn>
      </div>

    </div>
    <div class="flex flex-row my-4 items-center gap-4">
      <button :class="isActive ? 'fs-14 fw-6 text-primary border-color-primary border-b-2':'fs-14'"
              @click="agent">
        Агент
      </button>
      <button :class="!isActive ? 'fs-14 fw-6 text-primary border-color-primary border-b-2':'fs-14'"
              @click="supervisor">
        Доставщик
      </button>
    </div>
    <div v-if="isActive">
      <CommandKpiInstall2AgentData :newData="newData" :newHeaders="newHeaders" :selectedBonus="selectedBonus"/>
    </div>
    <div v-if="!isActive">
      <CommandKpiInstall2AgentData :newData="newDataSupervisor" :newHeaders="newHeaders" :selectedBonus="selectedBonus"/>
    </div>
  </rounded-white-container>
<!--  <d-modal v-if="draggable"-->
<!--           @closeDialog="draggableDialog"-->
<!--           :name="'Управление меню таблицы'">-->
<!--    <drag-and-drop @change="(value) => unitsStore.templates = value"-->
<!--                   :templates="unitsStore.templates"></drag-and-drop>-->
<!--  </d-modal>-->
  <loading-modal v-if="loading"
                 name="Управление меню таблицы">
    <Loading/>
  </loading-modal>
</template>

<script setup >
// State
import {useKpiAgentsStore} from "~/stores/command/kpi-agents/kpi-agents";
const props = defineProps({
  kpiAgentsDetailsStore:Object,
  newData:Object,
  getAgentDetail:Object
})
const draggable = ref(false);
const isActive = ref(true)
const tasks = ref([])
// Store
const dialogStore = useDialogStore('kpi-agents')
const loadedData = ref([
  {
    date: {},
    workday: {},
    debut: {},
    sharedProducts: {},
    commonIncoming: {},
    auto: {},
    bonce1: {},
    bounce2: {},
    total: {},
  },
]);
let sortedData = ref({ key: "", mode: "" });
const newHeaders = ref({
  codes: [
    {
      name: "Код",
      checked: true,
      key: "code",
      thWidth: "auto",
      bLeft: "8px",
    },
  ],
  address: [
    {
      name: "Район",
      checked: true,
      key: "region",
      thWidth: "auto",
      bLeft: "8px",
    },
    {
      name: "ТП",
      checked: true,
      key: "person",
      thWidth: "auto",
      bLeft: "8px",
    },
  ],
  workday: [
    {
      name: "План",
      checked: true,
      key: "plan",
      thWidth: "auto",
      bLeft: "8px",
    },
    {
      name: "Факт",
      checked: true,
      key: "fact",
      thWidth: "auto",
      bLeft: "8px",
    },
    {
      name: "В%",
      checked: true,
      key: "v",
      thWidth: "auto",
      bLeft: "8px",
    },
    {
      name: "Фикса",
      checked: true,
      key: "fix",
      thWidth: "auto",
      bLeft: "8px",
    },
    {
      name: "Начислено",
      checked: true,
      key: "accrued",
      thWidth: "auto",
      bLeft: "8px",
    },
  ],
  debut: [
    {
      name: "Начислено",
      checked: false,
      key: "debut",
      thWidth:'auto',
      bLeft:'8px'
    }
  ],
  delivered:[
    {
      name: "Общий чик. факт",
      checked:true,
      key: "allFact",
      thWidth:'150px',
      bLeft:'8px'
    },
    {
      name: "Шу ойдаги возврат",
      checked:true,
      key: "monthRefund",
      thWidth:'150px',
      bLeft:'8px'
    },
    {
      name: "Ноллаш лимит",
      checked:true,
      key: "limit",
      thWidth:'150px',
      bLeft:'8px'
    },
    {
      name: "Эски ой ноллаши",
      checked:true,
      key: "limitLast",
      thWidth:'150px',
      bLeft:'8px'
    },
    {
      name: "Ноллашда турган",
      checked:true,
      key: "limitNow",
      thWidth:'150px',
      bLeft:'8px'
    },
    {
      name: "%",
      checked:true,
      key: "prasent",
      thWidth:'50px',
      bLeft:'8px'
    },
  ],
  incomes:[
    {
      name: "План",
      checked:true,
      key: "incomePlan",
      thWidth:'100px',
      bLeft:'8px'
    },
    {
      name: "Кирим",
      checked:true,
      key: "income",
      thWidth:'100px',
      bLeft:'8px'
    },
    {
      name: "Факт",
      checked:true,
      key: "incomeFact",
      thWidth:'100px',
      bLeft:'8px'
    },
    {
      name: "В%",
      checked:true,
      key: "incomeB",
      thWidth:'100px',
      bLeft:'8px'
    },
    {
      name: "Бонус",
      checked:true,
      key: "incomeBonus",
      thWidth:'100px',
      bLeft:'8px'
    },
    {
      name: "Начислено",
      checked:true,
      key: "incomeAccured",
      thWidth:'50px',
      bLeft:'8px'
    },
  ],
  auto:[
    {
      name: "Машина",
      checked:true,
      key: "autoCar",
      thWidth:'100px',
      bLeft:'8px'
    },
    {
      name: "Кирим",
      checked:true,
      key: "autoIncome",
      thWidth:'100px',
      bLeft:'8px'
    }
  ],
  bonus:[
    {
      name: "",
      checked:true,
      key: "autoBonus",
      type:'come',
      thWidth:'200px',
      bLeft:'8px'
    }
  ],
  addBonus:[
    {
      name: "",
      checked:true,
      key: "addBonus",
      type:'come',
      thWidth:'200px',
      bLeft:'8px'
    }
  ],
  totals:[
    {
      name: "Хисобланди",
      checked:true,
      key: "total",
      thWidth:'100px',
      bLeft:'8px'
    }
  ],
  tasks:[]
})

const newDataSupervisor = ref({
  debut:[
  ],
  codes: [

  ],
  address:[],
  workday:[

  ],
  delivered:[],
  incomes:[],
  auto:[],
  bonus:[],
  addBonus:[],
  totals:[],
  tasks:[]
})

const selectedBonus = ref({
  isSelected:false
})
function addBonus(){
  selectedBonus.value.isSelected = !selectedBonus.value.isSelected
}
function cancel(){
  newHeaders.value.tasks = []
  selectedBonus.value.isSelected = false
}
function deTasks(value){
  console.log('value', value)
  for(let i = 0; i < value.length; i++){
    newHeaders.value.tasks.push({
      name:value[i].name,
      checked:true,
      key: value[i].name,
      thWidth:'120px',
      id:value[i].id
    })
  }
}
// Methods
function draggableDialog() {
  draggable.value = false;
}

function sortData(data) {
  sortedData.value = data
}
let loading = ref(false)

const save = async () => {
  try {
    loading.value = true
    props.newData.tasks = props.newData.tasks.filter(i => i.tasks !== [])
    await props.kpiAgentsDetailsStore.add(props.newData.tasks)
  }catch (error){
    // data1.value.messages = error.response.data.Messages
    // data1.value.name = error.response.statusText
    // statusCode.value = error.response.status
    console.log()
  }finally {
    // if (statusCode.value === 500){
    //   errorMessage.value = true
    // }
    await props.getAgentDetail()
    selectedBonus.value.isSelected = false
    newHeaders.value.tasks = []
    loading.value = false
  }
}
async function supervisor(){
  isActive.value = false
  selectedBonus.value.isSelected = false
  newHeaders.value.tasks = []
  await props.kpiAgentsDetailsStore.getDataSupervisorDetails()
  for (let i = 0; i < props.kpiAgentsDetailsStore.dataSupervisorDetail?.employees.length; i++){
    newDataSupervisor.value.address.push({person:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].employee_name})
    newDataSupervisor.value.workday.push(
        {
          plan:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].working_day,
          fact:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].worked_day,
          v:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].total_percent,
          fix:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].time_sheet_salary,
          accrued:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].total_salary
        })
    newDataSupervisor.value.debut.push({debut:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].total_debt})
    newDataSupervisor.value.delivered.push(
        {
          allFact:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].order_delivered,
          monthRefund:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].order_refund,
          limit:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].consignation_limit,
          limitLast:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].last_month_consignation_limit,
          limitNow:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].current_consignation,
          prasent:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].current_consignation_percent
        })
    newDataSupervisor.value.incomes.push(
        {
          incomePlan:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].planned_income_amount,
          income:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].income,
          incomeFact:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].income_fact,
          incomeB:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].income_percent,
          incomeBonus:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].income_percent,
          incomeAccured:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].income_percent
        })
    newDataSupervisor.value.auto.push(
        {
          autoCar:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].has_car,
          autoIncome:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].for_car_expenses,
        })
    newDataSupervisor.value.bonus.push(
        {
          autoBonus:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].total_bonus,
        })
    newDataSupervisor.value.addBonus.push(
        {
          addBonus:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].founder_bonus,
        })
    newDataSupervisor.value.totals.push(
        {
          total:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].total,
        })
    newDataSupervisor.value.tasks.push(
        {
          plan_id:props.kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].plan_id,
          tasks:[],
          consignation:0,
          planned_income:0,
          for_car_expenses:0,
          founder_bonus:0,
          additional_bonus:0
        })
  }
}
function agent(){
  isActive.value = true
  selectedBonus.value.isSelected = false
  newHeaders.value.tasks = []
  props.kpiAgentsDetailsStore.getDataAgentsDetails()
}

onMounted(async () =>{
})
</script>

<style scoped>
label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  background: white;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
[type="checkbox"]:checked + span:before {
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
</style>
