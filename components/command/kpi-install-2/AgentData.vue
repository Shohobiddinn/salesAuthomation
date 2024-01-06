<template>
  <div class="flex">
    <div class="border-1">
      <div class="p-2">
        10.03.2022
      </div>
      <div class="flex -mb-4.8">
        <data-table :headers="newHeaders.codes"
                    @sort="sortData"
                    :sorted="sortedData"
                    class="">
          <template #body>
            <c-tr v-for="data in newData.codes"
                  :key="data" class="h-13 border-r-1">
              <c-td-no-edit class="whitespace-nowrap p-2"
                            :custom-padding="true"
                            v-for="key in newHeaders.codes"
                            :key="key">
                {{ data.name }}
              </c-td-no-edit>
            </c-tr>
          </template>
        </data-table>
        <data-table :headers="newHeaders.address"
                    @sort="sortData"
                    :sorted="sortedData">
          <template #body>
            <c-tr v-for="data in newData.address"
                  :key="data" class="last:text-primary h-13 ">
              <c-td-no-edit class="whitespace-nowrap p-2"
                            :custom-padding="true"
                            v-for="key in newHeaders.address"
                            :key="key">
                {{ data[key.key] }}
              </c-td-no-edit>
            </c-tr>
          </template>
        </data-table>
      </div>
      <div class="flex h-12 py-3">
        <div class="mr-5 ml-2 mt-1 fs-12 text-gray-400">
          Супервайзер
        </div>
        <span class="fs-14 ml-5 mt-1 fw-6">
          {{kpiAgentsDetailsStore.dataAgentsDetail?.user.employee_name}}
        </span>
      </div>
    </div>
    <div class="w-full overflow-auto">
      <div class="flex flex-row">
        <div class="border-1 border-l-0">
          <div class="p-2">
            Фикса иш куни
          </div>
          <div class="flex -mb-4.8">
            <data-table :headers="newHeaders.workday"
                        @sort="sortData"
                        :sorted="sortedData">
              <template #body>
                <c-tr v-for="data in newData.workday"
                      :key="data"
                      class="last:text-primary h-13 ">
                  <c-td-no-edit class="whitespace-nowrap p-2"
                                :custom-padding="true"
                                v-for="key in newHeaders.workday">
                    {{ data[key.key] }}
                  </c-td-no-edit>
                </c-tr>
              </template>
            </data-table>
          </div>
          <div class="flex w-full fw-6 h-10 py-3 px-2">
            <div class="w-18">{{kpiAgentsDetailsStore.dataAgentsDetail?.user.worked_day}}</div>
            <div class="w-18">{{kpiAgentsDetailsStore.dataAgentsDetail?.user.working_day}}</div>
            <div class="w-15">{{kpiAgentsDetailsStore.dataAgentsDetail?.user.total_percent}}</div>
            <div class="w-18">{{kpiAgentsDetailsStore.dataAgentsDetail?.user.time_sheet_salary}}</div>
            <div class="w-18">{{kpiAgentsDetailsStore.dataAgentsDetail?.user.total_salary}}</div>
          </div>
        </div>
        <div class="border-1 border-l-0">
          <div class="p-2 bg-red-200">
            Дебютовка
          </div>
          <div class="flex -mb-4.8">
            <data-table :headers="newHeaders.debut"
                        @sort="sortData"
                        :sorted="sortedData">
              <template #body>
                <c-tr v-for="data in newData.debut"
                      :key="data"
                      class="last:text-primary h-13 ">
                  <c-td-no-edit class="whitespace-nowrap p-1"
                                :custom-padding="true"
                                v-for="key in newHeaders.debut">
                    <div class="py-2">
                      {{ data[key.key] }}
                    </div>

                  </c-td-no-edit>
                </c-tr>
              </template>
            </data-table>
          </div>
          <div class="flex w-full fw-6 h-10 py-3 px-2">
            <div class="w-18">{{kpiAgentsDetailsStore.dataAgentsDetail?.user.total_debt}}</div>
          </div>
        </div>
        <div class="border-1 border-l-0">
          <div class="p-2">
            Таркатилган товар умумий фиксаси
          </div>
          <div class="flex -mb-4.8">
            <data-table :headers="newHeaders.delivered"
                        @sort="sortData"
                        :sorted="sortedData">
              <template #body>
                <c-tr v-for="(data,index) in newData.delivered"
                      :key="data"
                      class="last:text-primary h-13">
                  <c-td-no-edit class="whitespace-nowrap  p-1"
                                :custom-padding="true"
                                v-for="key in newHeaders.delivered">
                    <div>
                         <span v-if="key.key !== 'limit'">
                      {{ data[key.key] }}
                    </span>
                      <span v-if="key.key === 'limit' && newHeaders.tasks.length < 0">
                      {{ data[key.key] }}
                    </span>
                      <span v-if="key.key === 'limit' && newHeaders.tasks.length > 0">
                      <d-input :value="newData.tasks[index].consignation"
                               @change="(value) => newData.tasks[index].consignation = value"/>
                    </span>
                    </div>

                  </c-td-no-edit>
                </c-tr>
              </template>
            </data-table>
          </div>
          <div class="flex w-full fw-6 h-10 py-3 px-2">
            <div class="w-41">{{kpiAgentsDetailsStore.dataAgentsDetail?.user.order_delivered}}</div>
            <div class="w-46">{{kpiAgentsDetailsStore.dataAgentsDetail?.user.order_refund}}</div>
            <div class="w-38">{{kpiAgentsDetailsStore.dataAgentsDetail?.user.consignation_limit}}</div>
            <div class="w-42">{{kpiAgentsDetailsStore.dataAgentsDetail?.user.last_month_consignation_limit }}</div>
            <div class="w-42">{{kpiAgentsDetailsStore.dataAgentsDetail?.user.current_consignation}}</div>
            <div class="w-26">{{kpiAgentsDetailsStore.dataAgentsDetail?.user.current_consignation_percent}}</div>
          </div>
        </div>
        <div v-if="newHeaders.tasks.length > 0" class="border-1 border-l-0">
          <div class="p-2">
            Новый KPI
          </div>
          <div class="flex -mb-4.8">
            <data-table :headers="newHeaders.tasks"
                        @sort="sortData"
                        :sorted="sortedData">
              <template #body>
                <c-tr v-for="(data,ind) in newData.tasks"
                      :key="data"
                      class="last:text-primary h-13 last:font-semibold">
                  <c-td-no-edit class="whitespace-nowrap p-1"
                                v-for="(key, index) in newHeaders.tasks">
                    <div >
                      <d-input
                          :value="getInputValue(ind, key.id)"
                          @input="defineChange($event.target.value,key.id,data.plan_id)"
                      />
                    </div>

                  </c-td-no-edit>
                </c-tr>
              </template>
            </data-table>
          </div>
          <div class="flex w-full fw-6 h-10 py-3 px-2">
            <div class="w-41">{{kpiAgentsDetailsStore.dataAgentsDetail?.user.order_delivered}}</div>
            <div class="w-46">{{kpiAgentsDetailsStore.dataAgentsDetail?.user.order_refund}}</div>
          </div>
        </div>
        <div class="border-1 border-l-0">
          <div class="p-2">
            Умумий кирим
          </div>
          <div class="flex -mb-4.8">
            <data-table :headers="newHeaders.incomes"
                        @sort="sortData"
                        :sorted="sortedData">
              <template #body>
                <c-tr v-for="data in newData.incomes"
                      :key="data"
                      class="last:text-primary h-13 last:font-semibold">
                  <c-td-no-edit class="whitespace-nowrap p-2"
                                :custom-padding="true"
                                v-for="key in newHeaders.incomes">
                    {{ data[key.key] }}
                  </c-td-no-edit>
                </c-tr>
              </template>
            </data-table>
          </div>
          <div class="flex fw-6 w-full h-10 py-3 px-2">
            <div class="w-29">{{kpiAgentsDetailsStore.dataAgentsDetail?.user.planned_income_amount}}</div>
            <div class="w-30">{{kpiAgentsDetailsStore.dataAgentsDetail?.user.income}}</div>
            <div class="w-30">{{kpiAgentsDetailsStore.dataAgentsDetail?.user.income_fact}}</div>
            <div class="w-30">{{kpiAgentsDetailsStore.dataAgentsDetail?.user.income_percent }}</div>
            <div class="w-29">{{kpiAgentsDetailsStore.dataAgentsDetail?.user.income_percent}}</div>
            <div class="w-24">{{kpiAgentsDetailsStore.dataAgentsDetail?.user.income_percent}}</div>
          </div>
        </div>
        <div class="border-1 border-l-0">
          <div class="p-2">
            АВТО
          </div>
          <div class="flex -mb-4.8">
            <data-table :headers="newHeaders.auto"
                        @sort="sortData"
                        :sorted="sortedData">
              <template #body>
                <c-tr v-for="data in newData.auto"
                      :key="data"
                      class="last:text-primary h-13 last:font-semibold">
                  <c-td-no-edit class="whitespace-nowrap p-2"
                                :custom-padding="true"
                                v-for="key in newHeaders.auto">
                    {{ data[key.key] }}
                  </c-td-no-edit>
                </c-tr>
              </template>
            </data-table>
          </div>
        </div>
        <div class="border-1 border-l-0">
          <div class="p-2">
            Учреди-тель дан бонус
          </div>
          <div class="flex -mb-4.8">
            <data-table :headers="newHeaders.bonus"
                        @sort="sortData"
                        :sorted="sortedData">
              <template #body>
                <c-tr v-for="(data, index) in newData.bonus"
                      :key="data"
                      class="last:text-primary h-13 last:font-semibold">
                  <c-td-no-edit class="whitespace-nowrap p-1"
                                :custom-padding="true"
                                v-for="key in newHeaders.bonus">
                      <span v-if="key.key === 'autoBonus' && !selectedBonus.isSelected">
                        {{ data[key.key] }}
                      </span>
                    <span v-if="key.key === 'autoBonus' && selectedBonus.isSelected">
                        <d-input :value="newData.tasks[index].founder_bonus"
                                 @change="(value) => newData.tasks[index].founder_bonus = value"/>
                      </span>
                  </c-td-no-edit>
                </c-tr>
              </template>
            </data-table>
          </div>
        </div>
        <div class="border-1 border-l-0">
          <div class="p-2">
            Доп. бонус
          </div>
          <div class="flex -mb-4.8">
            <data-table :headers="newHeaders.addBonus"
                        @sort="sortData"
                        :sorted="sortedData">
              <template #body>
                <c-tr v-for="(data, index) in newData.addBonus"
                      :key="data"
                      class="last:text-primary h-13 ">
                  <c-td-no-edit class="whitespace-nowrap p-1"
                                :custom-padding="true"
                                v-for="key in newHeaders.addBonus">
                      <span v-if="key.key === 'addBonus' && !selectedBonus.isSelected">
                        {{ data[key.key] }}
                      </span>
                    <span v-if="key.key === 'addBonus' && selectedBonus.isSelected">
                        <d-input :value="newData.tasks[index].additional_bonus"
                                 @change="(value) => newData.tasks[index].additional_bonus = value"/>
                      </span>
                  </c-td-no-edit>
                </c-tr>
              </template>
            </data-table>
          </div>
        </div>
        <div class="border-1 border-l-0">
          <div class="p-2">
            ЖАЪМИ
          </div>
          <div class="flex -mb-4.8">
            <data-table :headers="newHeaders.totals"
                        @sort="sortData"
                        :sorted="sortedData">
              <template #body>
                <c-tr v-for="data in newData.totals"
                      :key="data"
                      class="last:text-primary h-13 ">
                  <c-td-no-edit class="whitespace-nowrap p-2"
                                :custom-padding="true"
                                v-for="key in newHeaders.totals">
                    {{ data[key.key] }}
                  </c-td-no-edit>
                </c-tr>
              </template>
            </data-table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <d-modal v-if="dialogStore.isDialogOpen"
           @closeDialog="dialogStore.closeDialog"
           name="Добавить">
    <CommandKpiInstall2Dialog @deTasks="deTasks"/>
  </d-modal>
</template>

<script setup>
const props = defineProps({
  newData:Object,
  newHeaders:Object,
  selectedBonus:Boolean
})
import {useKpiAgentsStore} from "~/stores/command/kpi-agents/kpi-agents";

const dialogStore = useDialogStore('kpi-agents')

const kpiAgentsDetailsStore = useKpiAgentsStore('')
const loadedData = ref([
  {
    date:{},
    workday:{},
    debut:{},
    sharedProducts:{},
    commonIncoming:{},
    auto:{},
    bonce1:{},
    bounce2:{},
    total:{}
  }
])
let sortedData = ref({key: '', mode: ''});

function getInputValue(ind, id){
  if (props.newData.tasks[ind] && props.newData.tasks[ind].tasks){
    const findIndex = props.newData.tasks[ind].tasks.findIndex((i) => i.task_id === id)
    if (findIndex !== -1){
      return props.newData.tasks[ind].tasks[findIndex].value
    }else {
      return []
    }
  }
}
function defineChange(v, taskId, plan_id){
  let findIndex = props.newData.tasks.findIndex(j => j.plan_id === plan_id)
  if ( v !== "0"){
    if (props.newData.tasks[findIndex].tasks === null || !props.newData.tasks[findIndex].tasks.find(i => i.task_id === taskId)){
      console.log('ffffffffffff')
      props.newData.tasks[findIndex].tasks.push({task_id:taskId,value:v})
    }else {
      let indexOf = props.newData.tasks[findIndex].tasks?.findIndex(i => i.task_id === taskId)
      props.newData.tasks[findIndex].tasks[indexOf].value = v
      if (indexOf && props.newData.tasks[findIndex].tasks[indexOf].value === ""){
        props.newData.tasks[findIndex].tasks = []
      }
    }
  }
}
function deTasks(value){
  console.log('value', value)
  for(let i = 0; i < value.length; i++){
    props.newHeaders.tasks.push({
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
  draggable.value = false
}

function sortData(data) {
  sortedData.value = data
}

</script>

<style scoped>

</style>
