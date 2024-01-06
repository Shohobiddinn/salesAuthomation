<template>
  <div class="rounded-large border-primary-gray border-1">
    <div class="w-full overflow-auto rounded-t-large -mt-[1px]">
      <data-table :headers="headers"
                  @sort="sortData"
                  :sorted="sortedData">
        <template #body>
          <c-tr v-for="data in kpiStore?.items" :key="data">
            <c-td class="td" v-for="key in headers" :key="key" >
              <div class="flex flex-row my-1 gap-2" v-if="key.key === 'edit'">
                <m-btn @click="edit(data.id)"
                       class="whitespace-nowrap">
                  Изменить
                </m-btn>
                <button v-if="data.is_active" @click="kpiInActivite(data.id)" class="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700 active-bg-red-800">
                  Деактивировать
                </button>
                <button v-else @click="kpiActivite(data.id)" class="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700 active-bg-red-800">
                   активировать
                </button>
              </div>
              <div v-else-if="key.key === 'share'">
                <percent-input/>
              </div>
              <div v-else class="py-2">
                {{ data[key.key] }}
              </div>
            </c-td>
          </c-tr>
        </template>
      </data-table>
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
  </div>
</template>

<script setup>

// State
const props = defineProps({
  kpiStore:Array
})
const emit = defineEmits(['kpiActivite','kpiInActivite'])
let router = useRouter()
let headers = ref([
  {
    name: "Задача",
    checked:true,
    key: "name",
    thWidth:'auto',
    bLeft:'8px'
  },
  {
    name: "Тип задачи",
    checked:true,
    key: "type",
    thWidth:'auto'
  },
  {
    name: "Вознаграждение",
    checked:true,
    key: "bonus",
    thWidth:'auto'
  },
  {
    name: "Долга KPI",
    checked:true,
    key: "kpi_share",
    thWidth:'auto'
  },
  {
    name: "Изменить/Удалить",
    checked:true,
    key: "edit",
    thWidth:'auto'
  },
]);
function edit(id){
  router.push({ path:'/command/kpi-install/tasks/new', query: {id: id}})
}
let sortedData = ref({key: '', mode: ''});
const availablePages = ref(28)
let currentPage = ref(1)
let pageSize = ref(10)

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
function kpiActivite(id){
  emit('kpiActivite',id)
}
function kpiInActivite(id){
  emit('kpiInActivite',id)
}
</script>

<style scoped>

</style>
