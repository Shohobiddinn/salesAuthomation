<template>
  <div class="rounded-lg bg-white border-grey px-[2px]">
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
      <div class="flex p-3 gap-4">
        <button
          v-if="!active.isEdite"
          @click="edite"
          class="fs-14 w-35 h-10.5 bg-[#EEF5F5] rounded-lg"
        >
          Изменить
        </button>
        <button
          v-if="active.isEdite"
          @click="reset"
          class="fs-14 w-35 h-10.5 bg-[#EEF5F5] rounded-lg"
        >
          Отменить
        </button>
        <m-btn v-if="active.isEdite" @click="create">Сохранить</m-btn>
      </div>
    </div>
    <div class="overflow-auto table-containers">
      <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
        <template #body>
          <template v-for="(data, index) in loadedData" :key="index">
            <c-tr class="b-bottom cursor-pointer">
              <c-td-no-edit v-for="key in headers" :key="key">
                <button
                  class="py-2 pb-2 bg-yellow-100 text-yellow-600 rounded-20 px-3"
                  v-if="key.key === 'status'"
                >
                  {{ data[key.key] }}
                </button>
                <div
                  class="py-2"
                  v-if="
                    key.key !== 'nov1' &&
                    key.key !== 'general' &&
                    key.key !== 'nov2' &&
                    key.key !== 'nov3' &&
                    key.key !== 'nov4' &&
                    key.key !== 'nov5' &&
                    key.key !== 'nov6' &&
                    key.key !== 'nov6' &&
                    key.key !== 'nov7' &&
                    key.key !== 'nov8'
                  "
                >
                  {{ data[key.key] }}
                </div>
                <div class="py-2" v-if="key.key === 'nov1'">
                  <div v-if="!active.isEdite">{{ data[key.key] }}</div>
                  <div v-if="active.isEdite">
                    <div class="flex">
                      <input
                        class="border-[1px] w-12 p-1.5 rounded-l-lg my-input"
                        placeholder="25"
                        type="number"
                      />
                      <input
                        class="border-[1px] p-1.5 rounded-r-lg -ml-[1px] my-input"
                        placeholder="Комментарии"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div class="py-2" v-if="key.key === 'general'">
                  <div v-if="!active.isEdite">{{ data[key.key] }}</div>
                  <div v-if="active.isEdite">
                    <div class="flex">
                      <input
                        class="border-[1px] w-12 p-1.5 rounded-l-lg my-input"
                        placeholder="25"
                        type="number"
                      />
                      <input
                        class="border-[1px] p-1.5 rounded-r-lg -ml-[1px] my-input"
                        placeholder="Комментарии"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div class="py-2" v-if="key.key === 'nov2'">
                  <div v-if="!active.isEdite">{{ data[key.key] }}</div>
                  <div v-if="active.isEdite">
                    <div class="flex">
                      <input
                        class="border-[1px] w-12 p-1.5 rounded-l-lg my-input"
                        placeholder="25"
                        type="number"
                      />
                      <input
                        class="border-[1px] p-1.5 rounded-r-lg -ml-[1px] my-input"
                        placeholder="Комментарии"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div class="py-2" v-if="key.key === 'nov3'">
                  <div v-if="!active.isEdite">{{ data[key.key] }}</div>
                  <div v-if="active.isEdite">
                    <div class="flex">
                      <input
                        class="border-[1px] w-12 p-1.5 rounded-l-lg my-input"
                        placeholder="25"
                        type="number"
                      />
                      <input
                        class="border-[1px] p-1.5 rounded-r-lg -ml-[1px] my-input"
                        placeholder="Комментарии"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div class="py-2" v-if="key.key === 'nov4'">
                  <div v-if="!active.isEdite">{{ data[key.key] }}</div>
                  <div v-if="active.isEdite">
                    <div class="flex">
                      <input
                        class="border-[1px] w-12 p-1.5 rounded-l-lg my-input"
                        placeholder="25"
                        type="number"
                      />
                      <input
                        class="border-[1px] p-1.5 rounded-r-lg -ml-[1px] my-input"
                        placeholder="Комментарии"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div class="py-2" v-if="key.key === 'nov5'">
                  <div v-if="!active.isEdite">{{ data[key.key] }}</div>
                  <div v-if="active.isEdite">
                    <div class="flex">
                      <input
                        class="border-[1px] w-12 p-1.5 rounded-l-lg my-input"
                        placeholder="25"
                        type="number"
                      />
                      <input
                        class="border-[1px] p-1.5 rounded-r-lg -ml-[1px] my-input"
                        placeholder="Комментарии"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div class="py-2" v-if="key.key === 'nov6'">
                  <div v-if="!active.isEdite">{{ data[key.key] }}</div>
                  <div v-if="active.isEdite">
                    <div class="flex">
                      <input
                        class="border-[1px] w-12 p-1.5 rounded-l-lg my-input"
                        placeholder="25"
                        type="number"
                      />
                      <input
                        class="border-[1px] p-1.5 rounded-r-lg -ml-[1px] my-input"
                        placeholder="Комментарии"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div class="py-2" v-if="key.key === 'nov7'">
                  <div v-if="!active.isEdite">{{ data[key.key] }}</div>
                  <div v-if="active.isEdite">
                    <div class="flex">
                      <input
                        class="border-[1px] w-12 p-1.5 rounded-l-lg my-input"
                        placeholder="25"
                        type="number"
                      />
                      <input
                        class="border-[1px] p-1.5 rounded-r-lg -ml-[1px] my-input"
                        placeholder="Комментарии"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div class="py-2" v-if="key.key === 'nov8'">
                  <div v-if="!active.isEdite">{{ data[key.key] }}</div>
                  <div v-if="active.isEdite">
                    <div class="flex">
                      <input
                        class="border-[1px] w-12 p-1.5 rounded-l-lg my-input"
                        placeholder="25"
                        type="number"
                      />
                      <input
                        class="border-[1px] p-1.5 rounded-r-lg -ml-[1px] my-input"
                        placeholder="Комментарии"
                        type="text"
                      />
                    </div>
                  </div>
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
        <page-size-btn :current-size="pageSize" @setPageSize="setPageSize" />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="availablePages"
          :current-page="currentPage"
          @setPage="setPage"
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
  <transition name="modal">
    <div v-if="payment">
      <d-modal
        @closeDialog="closePayment"
        :dataContainerWidth="'625px'"
        :name="'Оплата № 6'"
      >
        <DashboardPaymentSuppliersDialog />
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// State
import { ref } from "vue";
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);
// Methods
const active = ref({
  isCreate: false,
  isEdite: false,
});
function edite() {
  active.value.isEdite = true;
}
function create() {
  active.value.isCreate = true;
  active.value.isEdite = false;
}
function reset() {}
function draggableDialog() {
  draggable.value = false;
}
const payment = ref(false);
function closePayment() {
  payment.value = false;
}
let headers = ref([
  {
    name: "Должность",
    checked: true,
    key: "important",
    type: "important",
    thWidth: "140px",
    bRadius: "8px",
  },
  {
    name: "ТП",
    checked: true,
    key: "tp",
    type: "tp",
    thWidth: "170px",
  },
  {
    name: "Общее",
    checked: true,
    key: "general",
    type: "general",
    thWidth: "120px",
  },
  {
    name: "1 - ноя.",
    checked: true,
    key: "nov1",
    type: "nov1",
    thWidth: "120px",
  },
  {
    name: "1 - ноя.",
    checked: true,
    key: "nov2",
    type: "nov2",
    thWidth: "120px",
  },
  {
    name: "1 - ноя.",
    checked: true,
    key: "nov3",
    type: "nov3",
    thWidth: "120px",
  },
  {
    name: "1 - ноя.",
    checked: true,
    key: "nov4",
    type: "nov4",
    thWidth: "120px",
  },
  {
    name: "1 - ноя.",
    checked: true,
    key: "nov5",
    type: "nov5",
    thWidth: "120px",
  },
  {
    name: "1 - ноя.",
    checked: true,
    key: "nov6",
    type: "nov6",
    thWidth: "120px",
  },
  {
    name: "1 - ноя.",
    checked: true,
    key: "nov7",
    type: "nov7",
    thWidth: "120px",
  },
  {
    name: "1 - ноя.",
    checked: true,
    key: "nov8",
    type: "nov8",
    thWidth: "120px",
  },
]);
const loadedData = ref([
  {
    important: "Супервайзер",
    tp: "Андрей ТП",
    general: "1",
    nov1: "1",
    nov2: "1",
    nov3: "1",
    nov4: "1",
    nov5: "1",
    nov6: "1",
    nov7: "1",
    nov8: "1",
  },
  {
    important: "Супервайзер",
    tp: "Андрей ТП",
    general: "1",
    nov1: "0",
    nov2: "0",
    nov3: "0",
    nov4: "0",
    nov5: "0",
    nov6: "0",
    nov7: "0",
    nov8: "0",
  },
  {
    important: "Супервайзер",
    tp: "Андрей ТП",
    general: "1",
    nov1: "1",
    nov2: "1",
    nov3: "1",
    nov4: "1",
    nov5: "1",
    nov6: "1",
    nov7: "1",
    nov8: "1",
  },
  {
    important: "Супервайзер",
    tp: "Андрей ТП",
    general: "1",
    nov1: "1",
    nov2: "1",
    nov3: "1",
    nov4: "1",
    nov5: "1",
    nov6: "1",
    nov7: "1",
    nov8: "1",
  },
  {
    important: "Супервайзер",
    tp: "Андрей ТП",
    general: "1",
    nov1: "1",
    nov2: "1",
    nov3: "1",
    nov4: "1",
    nov5: "1",
    nov6: "1",
    nov7: "1",
    nov8: "1",
  },
  {
    important: "Супервайзер",
    tp: "Андрей ТП",
    general: "1",
    nov1: "1",
    nov2: "1",
    nov3: "1",
    nov4: "1",
    nov5: "1",
    nov6: "1",
    nov7: "1",
    nov8: "1",
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
</script>

<style scoped></style>
