<template>
  <div>
    <div class="flex flex-row my-6">
      <button @click="$router.go(-1)"
              class="border-1 rounded-lg bg-white hover:bg-gray-50 active:bg-gray-200 py-2 px-6 whitespace-nowrap flex gap-2 items-center border-primary-gray">
        <IconBackArrowSVG/> Назад
      </button>
    </div>
    <!--  {{data}}-->
    <rounded-white-container>
      <div class="-mx-4 -mt-4">
        <div class="w-full overflow-auto rounded-t-large">
          <data-table :headers="headers"
                      @sort="sortData"
                      :sorted="sortedData">
            <template #body>
              <c-tr v-for="(datad, ind) in loadedData" :key="datad">
                <c-td class="td" v-for="(key,index) in headers" :key="key" >
                  <d-input placeholder="1000"
                           type="number"
                           class="my-1 whitespace-nowrap"
                           :value="getInputValue(ind, key.task_id)"
                           @input="defineChange($event.target.value,key.task_id,datad.employee_id)"
                           v-if="key.key === headers[index].key && data[ind].tasks &&
                         key.task_id === headers[index].task_id &&
                         key.key !== 'agent' && key.key !== 'time_sheet_salary'">
                  </d-input>
                  <d-input placeholder="1000"
                           type="number"
                           class="my-1 whitespace-nowrap"
                           :value="data[ind].time_sheet_salary"
                           @change="(value) => data[ind].time_sheet_salary = value"
                           v-if="key.key === 'time_sheet_salary'">
                  </d-input>
                  <div v-else-if="key.checked === true && key.key === 'agent'" class="py-2">
                    {{ datad[key.key] }}
                  </div>
                </c-td>
              </c-tr>
            </template>
          </data-table>
        </div>
      </div>
    </rounded-white-container>
    <!--    {{loadedData}}-->

    <div class="flex flex-row justify-end mt-6">
      <m-btn @click="save">
        Применить
      </m-btn>
    </div>
    <d-modal v-if="errorMessage"
             @closeDialog="closeDialog"
             name="Ошибка">
      <div class="w-full">
        <Internal500 :data="data1"></Internal500>
      </div>
    </d-modal>
    <loading-modal v-if="loading"
                   name="Управление меню таблицы">
      <Loading/>
    </loading-modal>
  </div>

</template>

<script setup>
import {useKpiSettingsStore} from "~/stores/command/kpi-settings/kpi-settings.store";
const router = useRouter()
const kpiSettingsStore = useKpiSettingsStore('')

// State
let headers = ref([
  {
    name: "Агенты",
    checked: true,
    key: "agent",
    thWidth: "120px",
    bLeft: "8px",
  },
  {
    name: "Период",
    checked:true,
    key: "time_sheet_salary",
    thWidth:'120px'
  }
]);
const route = useRoute()
function defineChange(v, taskId, employee_id){
  let findIndex = data.value.findIndex(j => j.employee_id === employee_id)
  if ( v !== "0"){
    if (!data.value[findIndex].tasks.find(i => i.task_id === taskId)){
      data.value[findIndex].tasks.push({task_id:taskId,value:v})
    }else {
      let indexOf = data.value[findIndex].tasks.findIndex(i => i.task_id === taskId)
      data.value[findIndex].tasks[indexOf].value = v
      if (indexOf && data.value[findIndex].tasks[indexOf].value === ""){
        data.value[findIndex].tasks = []
      }
    }
  }
  console.log('log',data.value)
}
function getInputValue(ind, task_id){
  if (data.value[ind] && data.value[ind].tasks){
    const findIndex = data.value[ind].tasks.findIndex(i => i.task_id === task_id)
    if (findIndex !== -1){
      return data.value[ind].tasks[findIndex].value
    }else {
      return null
    }
  }
}
const loadedData = ref([])
const task = ref()
const data = ref([])
// Methods
let errorMessage = ref(false)
function closeDialog(){
  errorMessage.value = false
}
const data1 = ref({name:'', messages:''})
let loading = ref(false)
let statusCode = ref(null)
async function save(){
  try {
    loading.value = true
    await kpiSettingsStore.add(data.value)
  }catch (error){
    data1.value.messages = error.response.data.Messages
    data1.value.name = error.response.statusText
    statusCode.value = error.response.status
    console.log()
  }finally {
    if (statusCode.value === 500){
      errorMessage.value = true
    }else {
      router.push('/command/kpi-install')
    }
    loading.value = false
  }

}
function setPageSize(size){
  pageSize.value = size
}
onMounted(()=>{
  if (kpiSettingsStore.datas === null){
    router.push('/command/kpi-install/install')
  }
  for (let i = 0; i < kpiSettingsStore.datas.employees.length; i++){
    loadedData.value.push({
      agent:kpiSettingsStore.datas.employees[i].employee_name,
      time_sheet_salary:kpiSettingsStore.datas.employees[i].time_sheet_salary,
      employee_id:kpiSettingsStore.datas.employees[i].employee_id,
      tasks:kpiSettingsStore.datas.employees[i].tasks,
    })
    data.value.push({
      year:route.query.year,
      month:route.query.month,
      employee_id:kpiSettingsStore.datas.employees[i].employee_id,
      time_sheet_salary:kpiSettingsStore.datas.employees[i].time_sheet_salary,
      tasks:kpiSettingsStore.datas.employees[i].tasks,
    })
  }
  for (let i = 0; i < kpiSettingsStore.datas.tasks.length; i++){
    headers.value.push({
      name:kpiSettingsStore.datas.tasks[i].task_name,
      checked:true,
      key: kpiSettingsStore.datas.tasks[i].task_name,
      thWidth:'120px',
      task_id:kpiSettingsStore.datas.tasks[i].task_id
    })
  }
  console.log('headers',headers.value)
})
const task1 = {
  task_id:null,
  value:null
}
// const currentProducts = computed({
//   get: () => {
//     const inProducts = [];
//     if (data.value && data.value.length > 0) {
//       data.value.forEach((it) => {
//         const savedProduct = data.value[it].tasks?.find(
//             (sIt) => sIt.value > 0
//         );
//         if (savedProduct) {
//           inProducts.push({
//             ...task1,
//             ...savedProduct,
//             product_id: it.product_id,
//             product_name: it.product_name,
//             blog: Math.ceil(savedProduct.count / it.quantity_in_package),
//           });
//         } else {
//           inProducts.push({
//             ...task1,
//             product_id: it.product_id,
//             product_name: it.product_name,
//           });
//         }
//       });
//     }
//     return inProducts;
//   },
//   set: (prods) => {
//     console.log("prods", prods);
//   },
// });
let sortedData = ref({key: '', mode: ''});
const dataContainerWidth = ref('346px')
const searchText = ref("")
const availablePages = ref(28)
let currentPage = ref(1)
let pageSize = ref(10)
function sortData(data) {
  sortedData.value = data;
}
function setPage(index){
  currentPage.value = index
}
</script>

<style scoped>

</style>
