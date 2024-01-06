<template>
  <rounded-white-container>
    <div class="-mx-4 -mt-4">
      <div class="w-full overflow-auto rounded-t-large">
        <data-table :headers="headers"
                    @sort="sortData"
                    :sorted="sortedData">
          <template #body>
            <c-tr v-for="data in kpiSettingsStore.dataList?.items" :key="data">
              <c-td class="td" v-for="key in headers" :key="key" >
                <m-btn @click="save(data.month,data.year)"
                       class="my-1 whitespace-nowrap"
                       v-if="key.key === 'edit'">
                  Установка KPI
                </m-btn>
                <div v-else-if="key.checked === true && key.key === 'employees'" class="py-2">
                  {{ data.employees[0] }}
                </div>
                <div v-else-if="key.checked === true && key.key === 'year'" class="py-2">
                  {{ data[key.key] }}
                </div>
              </c-td>
            </c-tr>
          </template>
        </data-table>
      </div>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14">
          Показать по
        </span>
        <page-size-btn :current-size="kpiSettingsStore.params.pageSize" @setPageSize="kpiSettingsStore.setPageSize"/>
      </div>
      <div class="p-3">
        <page-index :available-pages="kpiSettingsStore.dataList?.total_pages"
                    :current-page="kpiSettingsStore.dataList?.page_number"
                    @setPage="kpiSettingsStore.setPage"/>
      </div>
    </div>
  </rounded-white-container>
  <loading-modal v-if="loading"
                 name="Управление меню таблицы">
    <Loading/>
  </loading-modal>
</template>

<script setup>

// State
const router = useRouter()
const kpiSettingsStore = useKpiSettingsStore('')
let loading = ref(false)

let headers = ref([
  {
    name: "Агенты",
    checked:true,
    key: "employees",
    thWidth:'120px',
    bLeft:'8px'
  },
  {
    name: "Период",
    checked:true,
    key: "year",
    thWidth:'120px'
  },
  {
    name: "Изменить",
    checked:true,
    key: "edit",
    thWidth:'120px'
  },
]);

let sortedData = ref({key: '', mode: ''});
const dataContainerWidth = ref('346px')
const searchText = ref("")
const availablePages = ref(28)
let currentPage = ref(1)
let pageSize = ref(10)
const data = ref({
  year:null,
  month:null,
  role:1,
  group:null
})
const save = async (month, year) =>{
  try {
    loading.value = true
    data.value.month = month
    data.value.year = year
    await kpiSettingsStore.getSettings(data.value)
  }catch (error){

  }finally {
    loading.value = false
    router.push({path:'/command/kpi-install/install/result', query:{month:month, year:year}})
  }
}
// Methods
function sortData(data) {
  sortedData.value = data
}

function setPage(index){
  currentPage.value = index
}

function setPageSize(size){
  pageSize.value = size
}
const params = ref({
  page:1,
  pageSize:10
})
onMounted(()=>{
  kpiSettingsStore.getSettingsList()
})
</script>

<style scoped>

</style>
