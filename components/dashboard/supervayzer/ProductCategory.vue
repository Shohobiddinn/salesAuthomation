<template>
  <div>
    <div class="flex justify-between mt-4">
      <div class="flex gap-4">
        <button
          class="rounded-lg border w-6 h-6 p-1.5 bg-white hover:bg-gray-200 mt-2"
        >
          <ArrowBottom />
        </button>
        <div class="text-blue-10 text-[24px] fw-6">По категории продуктов</div>
      </div>
    </div>
    <div class="rounded-lg bg-white border-grey px-[2px] mt-2">
      <div class="flex justify-between">
        <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
          <div @click="draggable = true">
            <i-btn>
              <IconColsSVG />
            </i-btn>
          </div>
          <SettingsRlpDiscountsTableCheckbox
            :headers="headers"
          ></SettingsRlpDiscountsTableCheckbox>
          <div>
            <search-input
              :value="searchText"
              @updated="searchUpdated"
              class="w-full h-38px"
            />
          </div>
          <div>
            <excel-btn :size="'340kb'"></excel-btn>
          </div>
        </div>
        <div class="flex gap-4 m-4">
          <div class="pt-2 check">
            <label>
              <input type="checkbox" />
              <span></span>
            </label>
          </div>
          <div class="mt-1.5">Скрыть нулевые цифры</div>
        </div>
      </div>
      <div class="overflow-auto table-containers">
        <data-table :headers="supervisorStore.templates" @sort="sortData" :sorted="sortedData">
          <template #body>
            <template v-for="(data, index) in categories?.items" :key="index">
              <c-tr class="b-bottom cursor-pointer">
                <c-td-no-edit v-for="key in supervisorStore.templates" :key="key">
                  <button @click="categoryDetail(data.id)"
                      class="py-2 underline pb-2"
                      v-if="key.key === 'name' && key.checked"
                  >
                    {{ data[key.key] }}
                  </button>
                  <div class="py-2" v-if="key.key !== 'name' && key.checked">
                    {{ data[key.key] }}
                  </div>
                </c-td-no-edit>
              </c-tr>
            </template>
            <td
              v-for="(item, index) in result"
              class="fs-14 fw-6 text-gray-3 pl-3 py-2"
            >
              <div v-if="headers[index] && headers[index].checked">
                {{ item.name }}
              </div>
            </td>
          </template>
        </data-table>
      </div>
      <div class="flex justify-between w-full">
        <div class="flex p-3 gap-2 items-center">
          <span class="secondary-gray-text fs-14"> Показать по </span>
          <page-size-btn :current-size="filters.pageSize" @setPageSize="setPageSize" />
        </div>
        <div class="p-3">
          <page-index
            :available-pages="categories?.total_pages"
            :current-page="categories?.page_number"
            @setPage="setPage"
          />
        </div>
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="category.isActive">
      <d-modal
          :dataContainerWidth="'921px'"
          @closeDialog="closeOperation"
          :name="'Cola cola'"
      >
        <div class="relative w-full">
          <DashboardSupervayzerDialogTable :filters="filters" :details="details"/>
        </div>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// State
import { ref } from "vue";
import ArrowBottom from "~/components/icon/ArrowBottom.vue";
import {useSupervisorStore} from "~/stores/dashboard/supervisor/supervisor.store";
const props = defineProps({
  supervisorStore:Object,
  categories:Array,
  filters:Object
})
const supervisorStore = useSupervisorStore('')
const filter = ref({
  page:1,
  pageSize:10,
  date:props.filters.date,
  supervisorId:props.filters.supervisorId,
  categoryId:null
})
const category = ref({
  isActive:false
})
function closeOperation(){
  category.value.isActive = false
}
const details = ref(null)
async function categoryDetail(id){
  filter.value.categoryId = id
  category.value.isActive = true
  details.value = await supervisorStore.getCategoryDetail(filter.value)
}
watch(filter.value,async ()=>{
  details.value = await supervisorStore.getCategoryDetail(filter.value)
})
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);
// Methods
function draggableDialog() {
  draggable.value = false;
}
const result = ref([
  {
    name: "Итоги",
  },
  {
    name: "13126",
  },
  {
    name: "13126",
  },
  {
    name: "13126",
  },
  {
    name: "13126",
  },
]);
let headers = ref([
  {
    name: "Категория",
    checked: true,
    key: "category",
    type: "category",
    thWidth: "40px",
    bRadius: "8px",
  },
  {
    name: "Доля",
    checked: true,
    key: "share",
    type: "share",
    thWidth: "100px",
  },
  {
    name: "Сумма",
    checked: true,
    key: "amount",
    type: "amount",
    thWidth: "100px",
  },
  {
    name: "Объем",
    checked: true,
    key: "volume",
    type: "volume",
    thWidth: "8 0px",
  },
  {
    name: "АКБ",
    checked: true,
    key: "akb",
    type: "akb",
    thWidth: "70px",
  },
]);

let sortedData = ref({ key: "", mode: "" });
// Methods
function searchUpdated(text) {
  console.log(text);
}
function sortData(data) {
  sortedData.value = data;
}
function setPage(index) {
  props.filters.page = index;
}
function setPageSize(size) {
  console.log('sdsdsdsdsd',size)
  props.filters.pageSize = size;
}
</script>

<style scoped></style>
