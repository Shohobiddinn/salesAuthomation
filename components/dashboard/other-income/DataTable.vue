<template>
  <div class="w-full">
    <div class="rounded-lg bg-white border-grey px-[2px]">
      <div class="flex justify-between">
        <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
          <div @click="draggable = true">
            <i-btn>
              <IconColsSVG />
            </i-btn>
          </div>
          <SettingsRlpDiscountsTableCheckbox
            :headers="otherincomeStore.templates"
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
        <div class="p-3">
          <m-btn @click="dialogStore.openDialog" class="w-40">Добавить</m-btn>
        </div>
      </div>
      <div class="overflow-auto table-containers">
        <data-table
          :headers="otherincomeStore.templates"
          @sort="sortData"
          :sorted="sortedData"
        >
          <template #body>
            <template
              v-for="(data, index) in otherincomeStore.data?.items"
              :key="index"
            >
              <c-tr class="b-bottom cursor-pointer">
                <c-td-no-edit
                  v-for="key in otherincomeStore.templates"
                  :key="key"
                >
                  <div class="py-2.5 check" v-if="key.key === 'checkbox'">
                    <checkbox :values="key.checked" />
                  </div>
                  <div
                    @click="payment = true"
                    class="underline pb-2"
                    v-if="key.key === 'supplier' && key.checked"
                  >
                    {{ data[key.key] }}
                  </div>
                  <div class="" v-if="key.key !== 'supplier' && key.checked">
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
            :current-size="otherincomeStore.params.page_size"
            @setPageSize="otherincomeStore.setPageSize"
          />
        </div>
        <div class="p-3">
          <page-index
            :available-pages="otherincomeStore.data?.total_pages"
            :current-page="otherincomeStore.data?.page_number"
            @setPage="otherincomeStore.setPage"
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
    <div v-if="dialogStore.isDialogOpen">
      <d-modal
        @closeDialog="dialogStore.closeDialog"
        :dataContainerWidth="'400px'"
        :name="'Добавить приход'"
      >
        <DashboardOtherIncomeDialog />
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// State
import { useOtherIncome } from "~/stores/dashboard/other-income/other-income.store";

const dialogStore = useDialogStore("otherIncome");
const otherincomeStore = useOtherIncome("");
import { ref } from "vue";
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
    name: "",
  },
  {
    name: "Итоги",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "10 000 000",
  },
  {
    name: "0",
  },
  {
    name: "10 000 000",
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
  currentPage.value = index;
}
function setPageSize(size) {
  pageSize.value = size;
}
const queryParam = ref({
  currency: null,
  from: null,
  to: null,
});
onMounted(() => {
  otherincomeStore.getData(queryParam);
});
</script>

<style scoped></style>
