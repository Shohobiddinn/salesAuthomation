<template>
  <div class="rounded-large border-primary-gray border-1 bg-white">
    <div v-click-outside="outside" class="w-full overflow-auto rounded-t-large -mt-[1px]">
      <data-table :headers="headers"
                  @sort="sortData"
                  :sorted="sortedData">
        <template #body>
          <c-tr v-for="(data,index) in kpiGroupStore.data" :key="data">
            <c-td class="td py-3 whitespace-nowrap" v-for="key in headers" :key="key">
              <div v-if="key.key === 'name'">
                {{ data[key.key] }}
              </div>
              <div v-if="key.key === 'templates'">
                {{ data.templates[0] }}
              </div>
            </c-td>
            <c-td :key="index" class="">
              <div
                  :key="index"
                  @click="openDropdown(index)"
                  class="relative td-shadow p-2 drop"
              >
                <div :key="index" class="cursor-pointer w-[30px] p-[10px]">
                  <svg
                      width="3"
                      height="17"
                      viewBox="0 0 3 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M1.5 3C2.32842 3 2.99999 2.32843 2.99999 1.5C2.99999 0.671573 2.32842 0 1.5 0C0.671572 0 0 0.671573 0 1.5C0 2.32843 0.671572 3 1.5 3Z"
                        fill="#424F4F"
                    />
                    <path
                        d="M1.5 10C2.32843 10 3 9.32843 3 8.5C3 7.67157 2.32843 7 1.5 7C0.671573 7 0 7.67157 0 8.5C0 9.32843 0.671573 10 1.5 10Z"
                        fill="#424F4F"
                    />
                    <path
                        d="M1.49999 17C2.32841 17 2.99998 16.3284 2.99998 15.5C2.99998 14.6716 2.32841 14 1.49999 14C0.671568 14 0 14.6716 0 15.5C0 16.3284 0.671568 17 1.49999 17Z"
                        fill="#424F4F"
                    />
                  </svg>
                </div>
                <div
                    :key="index"
                    :class="{ 'active-down': td.isActive && td.index === index }"
                    class="bg-white bottom-[-23px] down rounded-lg z-50 w-[170px] border h-[84px] right-[44px] absolute"
                >
                  <div class="m-3">
                    <div
                        @click="()=>dialogStore.edit({...data})"
                        class="flex border-b cursor-pointer pb-2"
                    >
                      <div>
                        <IconEdit />
                      </div>
                      <div class="fs-12 text-[#299B9B] ml-2 mt-1">
                        Редактрировать
                      </div>
                    </div>
                    <div
                        @click="deleteF(data.id)"
                        class="flex mt-1 cursor-pointer"
                    >
                      <div class="mt-1">
                        <IconTrash />
                      </div>
                      <div class="fs-12 ml-3 mt-1 text-red">Удалить агента</div>
                    </div>
                  </div>
                </div>
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
import {useKpiGroupStore} from "~/stores/command/kpi-group-templates/kpi-group-templates.store";
import {notify} from "@kyvg/vue3-notification";

const props = defineProps({
  isActive: Boolean
})
const dialogStore = useDialogStore('kpi-group')
const kpiGroupStore = useKpiGroupStore('')
function openDropdown(index) {
  if (td.index === index){
    td.isActive = !td.isActive;
    td.index = index;
  }else {
    td.isActive = true
    td.index = index;
  }
}
function outside(){
  td.isActive = false
}
const td = reactive({
  isActive: false,
  index: -1,
});
let headers = ref([
  {
    name: "Название",
    checked:true,
    key: "name",
    thWidth:'auto',
    bLeft:'8px'
  },
  {
    name: "Тип задачи",
    checked:true,
    key: "templates",
    thWidth:'220px'
  },
]);
const loadedData = ref([
  {
    task: "Задача 1",
    type: "Блок продаж",
    reward: "Вознаграждение"
  },
  {
    task: "Задача 1",
    type: "Блок продаж",
    reward: "Вознаграждение"
  },
  {
    task: "Задача 1",
    type: "Блок продаж",
    reward: "Вознаграждение"
  },
  {
    task: "Задача 1",
    type: "Блок продаж",
    reward: "Вознаграждение"
  },
  {
    task: "Задача 1",
    type: "Блок продаж",
    reward: "Вознаграждение"
  },
])
const deleteF = async (id) => {
  notify({title: "Пожалуйста подождите!"});

    await kpiGroupStore.deleteF(id);
    await kpiGroupStore.getData()
    notify({title: "Udalite!"})
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
onMounted(()=>{
  kpiGroupStore.getData()
})
</script>

<style scoped>
.down {
  display: none;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
  rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}

.active-down {
  display: block;
  background-color: white;
}

.down:after {
  position: absolute;
  content: "";
  right: -11px;
  bottom: 20px;
  top: 20px;
  border-left: 15px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
</style>
