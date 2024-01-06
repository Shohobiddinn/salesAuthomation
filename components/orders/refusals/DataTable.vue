<template>
  <div class="rounded-lg bg-white border-grey px-[2px]">
    <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <SettingsRlpDiscountsTableCheckbox
        :headers="employeeRejectsStore.templates"
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
    <div class="min-h-[200px] overflow-auto">
      <data-table
        :loading="employeeRejectsStore.isLoading"
        :headers="employeeRejectsStore.templates"
        @sort="sortData"
        :sorted="sortedData"
        :isEmpty="!employeeRejectsStore.data?.items.length"
      >
        <template #body>
          <template v-for="(data, index) in employeeRejectsStore.data?.items" :key="index">
            <c-tr class="b-bottom">
              <c-td-no-edit
                v-for="key in employeeRejectsStore.templates"
                :key="key"
              >
                <div v-if="key.key === 'no'" class="py-2">
                  {{ ++index }}
                </div>
                <div v-else-if="key.key === 'client_name'" class="underline cursor-pointer">
                  {{ data[key.key] }}
                </div>
                <div v-else-if="key.key === 'date'">
                  {{ getFormattedDate(data[key.key]) }}
                </div>
                <div v-else>
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
        <span class="secondary-gray-text fs-14"> Показать по </span>
        <page-size-btn
          :current-size="employeeRejectsStore.params.PageSize"
          @setPageSize="employeeRejectsStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="employeeRejectsStore.data?.total_pages"
          :current-page="employeeRejectsStore.data?.page_number"
          @setPage="employeeRejectsStore.setPage"
        />
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
</template>

<script setup>
import moment from "moment";

// store
const employeeRejectsStore = useEmployeeRejectsStore('main')

// State
const searchText = ref("");
const draggable = ref(false);
let sortedData = ref({ key: "", mode: "" });

// Methods
onMounted(async ()=>{
  await employeeRejectsStore.getData()
})

const getFormattedDate = (date) => {
  return date && moment(date).format("YYYY-MM-DD HH:MM");
};

function draggableDialog() {
  draggable.value = false;
}

function searchUpdated(text) {
  console.log(text);
}

function sortData(data) {
  sortedData.value = data;
}

function setPage(index) {
  currentPage.value = index;
}
</script>

<style scoped>
.b-bottom:last-child {
  border-bottom: 1px solid #e1e4e4;
}
</style>
