<template>
  <div>
    <div class="flex w-full flex-row justify-between my-6">
      <p-title>
        KPI Установка 2
      </p-title>
      <div class="flex">
        <div class="w-40">
          <d-select
              :value="data.supervisorId"
              @change="selectSupervisor"
          >
            <option v-for="key in supervisorStore.data?.items" :value="key.id">
              {{ key.first_name }}
            </option>
          </d-select>
        </div>

        <div class="date-picker ml-4">
          <input @input="inputEvent($event.target.value)" v-model="data.date" class="my-input  fa-solid mainLoginInput p-2 border-primary-gray border-1 rounded-lg"
                 type="date"
                 placeholder="Выбрать">
        </div>
      </div>
    </div>
    <CommandKpiInstall2DataTables :newData="newData" :getAgentDetail="getAgentDetail" :kpiAgentsDetailsStore="kpiAgentsDetailsStore"/>
  </div>

</template>

<script setup>
import moment from "moment/moment";
import {useKpiAgentsStore} from "~/stores/command/kpi-agents/kpi-agents";
const kpiAgentsDetailsStore = useKpiAgentsStore('')

const data = ref({
  date:'',
  supervisorId:''
})
const newData = ref({
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
const supervisorStore = useSupervisorsStore('')
async function selectSupervisor(value){
  data.value.supervisorId = value
  await getAgentDetail()
}
async function inputEvent(value){
  data.value.date = value
  await getAgentDetail()
}


const getAgentDetail = async () => {
  newData.value.address = []
  newData.value.codes = []
  newData.value.workday = []
  newData.value.delivered  = []
  newData.value.debut = []
  newData.value.incomes = []
  newData.value.auto = []
  newData.value.bonus = []
  newData.value.addBonus = []
  newData.value.totals = []
  newData.value.tasks = []
  await kpiAgentsDetailsStore.getDataAgentsDetails(data.value.date, data.value.supervisorId)
  for (let i = 0; i < kpiAgentsDetailsStore.dataAgentsDetail?.employees.length; i++){
    newData.value.address.push({person:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].employee_name})
    newData.value.codes.push({
      name:'12211'
    })
    newData.value.workday.push(
        {
          plan:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].working_day,
          fact:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].worked_day,
          v:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].total_percent,
          fix:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].time_sheet_salary,
          accrued:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].total_salary
        })
    newData.value.debut.push({debut:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].total_debt})
    newData.value.delivered.push(
        {
          allFact:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].order_delivered,
          monthRefund:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].order_refund,
          limit:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].consignation_limit,
          limitLast:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].last_month_consignation_limit,
          limitNow:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].current_consignation,
          prasent:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].current_consignation_percent
        })
    newData.value.incomes.push(
        {
          incomePlan:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].planned_income_amount,
          income:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].income,
          incomeFact:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].income_fact,
          incomeB:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].income_percent,
          incomeBonus:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].income_percent,
          incomeAccured:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].income_percent
        })
    newData.value.auto.push(
        {
          autoCar:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].has_car,
          autoIncome:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].for_car_expenses,
        })
    newData.value.bonus.push(
        {
          autoBonus:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].additional_bonus,
        })
    newData.value.addBonus.push(
        {
          addBonus:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].founder_bonus,
        })
    newData.value.totals.push(
        {
          total:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].total,
        })
    newData.value.tasks.push(
        {
          plan_id:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].plan_id,
          // kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].tasks
          tasks:[],
          consignation:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].consignation_limit,
          planned_income:0,
          for_car_expenses:0,
          founder_bonus:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].founder_bonus,
          additional_bonus:kpiAgentsDetailsStore.dataAgentsDetail?.employees[i].additional_bonus,
        })
  }
}
onMounted(async ()=>{
  await supervisorStore.getData()
  data.value.supervisorId = supervisorStore.data?.items[0].id
  data.value.date = moment().format("YYYY-MM-DD");
  await getAgentDetail()
  console.log('data.value',data.value)
  console.log('data.value.date',data.value.date)
})
</script>

<style scoped>
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
