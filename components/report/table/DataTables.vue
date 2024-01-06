<template>
  <rounded-white-container>
    <flex-row class="justify-between items-center">
      <flex-row class="gap-4">
        <div>
          <i-btn>
            <IconColsSVG />
          </i-btn>
        </div>
        <div>
          <i-btn>
            <IconRowSVG />
          </i-btn>
        </div>
        <div>
          <search-input
            :value="searchText"
            @updated="searchUpdated"
            class="w-full h-38px"
          />
        </div>
        <div>
          <excel-btn :size="'460kb'"></excel-btn>
        </div>
      </flex-row>
      <flex-row class="gap-4 items-center">
        <cancel-btn> Изменить </cancel-btn>
        <filtr-btn @click="configModal = true"> Конфигурации </filtr-btn>
      </flex-row>
    </flex-row>
    <div class="w-full overflow-auto mt-4">
      <flex-row class="mb-3">
        <div class="border-x-1">
          <data-table
            :headers="headers.tp"
            @sort="sortData"
            class="h-full"
            :sorted="sortedData"
          >
            <template #body>
              <c-tr v-for="data in loadedData.tp">
                <c-td-no-edit
                  :custom-padding="true"
                  v-for="key in headers.tp"
                  class="px-2 py-3"
                >
                  {{ data[key.key] }}
                </c-td-no-edit>
              </c-tr>
            </template>
          </data-table>
        </div>
        <div class="border-r-1">
          <data-table
            :headers="headers.photoReport"
            @sort="sortData"
            class="h-full"
            :sorted="sortedData"
          >
            <template #body>
              <c-tr v-for="data in loadedData.photoReport">
                <c-td-no-edit
                  :custom-padding="true"
                  v-for="key in headers.photoReport"
                  class="px-2 py-3"
                >
                  {{ data[key.key] }}
                </c-td-no-edit>
              </c-tr>
            </template>
          </data-table>
        </div>
        <div class="border-r-1">
          <data-table
            :headers="headers.other"
            @sort="sortData"
            class="h-full"
            :sorted="sortedData"
          >
            <template #body>
              <c-tr v-for="data in loadedData.other">
                <c-td-no-edit
                  :custom-padding="true"
                  v-for="key in headers.other"
                  class="px-2 py-3"
                >
                  {{ data[key.key] }}
                </c-td-no-edit>
              </c-tr>
            </template>
          </data-table>
        </div>
        <div class="border-r-1 whitespace-nowrap">
          <data-table
            :headers="headers.byGps"
            @sort="sortData"
            class="h-full"
            :sorted="sortedData"
          >
            <template #body>
              <c-tr v-for="data in loadedData.byGps">
                <c-td-no-edit
                  :custom-padding="true"
                  v-for="key in headers.byGps"
                  class="px-2 py-3"
                >
                  {{ data[key.key] }}
                </c-td-no-edit>
              </c-tr>
            </template>
          </data-table>
        </div>
        <div class="border-r-1 whitespace-nowrap">
          <data-table
            :headers="headers.total"
            @sort="sortData"
            class="h-full"
            :sorted="sortedData"
          >
            <template #body>
              <c-tr v-for="data in loadedData.total">
                <c-td-no-edit
                  :custom-padding="true"
                  v-for="key in headers.total"
                  class="px-2 py-3"
                >
                  {{ data[key.key] }}
                </c-td-no-edit>
              </c-tr>
            </template>
          </data-table>
        </div>
        <div class="border-r-1 whitespace-nowrap">
          <data-table
            :headers="headers.total"
            @sort="sortData"
            class="h-full"
            :sorted="sortedData"
          >
            <template #body>
              <c-tr v-for="data in loadedData.total">
                <c-td-no-edit
                  :custom-padding="true"
                  v-for="key in headers.total"
                  :key="key"
                  class="px-2"
                >
                  <div v-if="key.key === 'accrued'">
                    <input
                      class="border-[1px] w-12 p-1.5 rounded-l-lg my-input"
                      placeholder="0"
                      type="number"
                    />
                    <input
                      class="border-[1px] p-1.5 rounded-r-lg -ml-[1px] my-input"
                      placeholder="Комментарии"
                      type="text"
                    />
                  </div>
                  <div v-else>
                    {{ data[key.key] }}
                  </div>
                </c-td-no-edit>
              </c-tr>
            </template>
          </data-table>
        </div>
      </flex-row>
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
  </rounded-white-container>
  <transition name="modal">
    <div v-if="configModal">
      <d-modal @closeDialog="closeConfigModal" :name="'Конфигурации'">
        <ReportTableConfigBody />
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// State

const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);

const loadedData = ref({
  total: [
    { total: "60%", accrued: "20" },
    { total: "60%", accrued: "20" },
    { total: "60%", accrued: "20" },
    { total: "60%", accrued: "20" },
    { total: "60%", accrued: "20" },
    { total: "60%", accrued: "20" },
  ],
  byGps: [
    { f: "40+6", s: "20%" },
    { f: "40+6", s: "20%" },
    { f: "40+6", s: "20%" },
    { f: "40+6", s: "20%" },
    { f: "40+6", s: "20%" },
    { f: "40+6", s: "20%" },
  ],
  tp: [
    { tp: "Андрей ТП" },
    { tp: "Андрей ТП" },
    { tp: "Андрей ТП" },
    { tp: "Андрей ТП" },
    { tp: "Андрей ТП" },
    { tp: "Андрей ТП" },
  ],
  photoReport: [
    { photo: "40+6 20%" },
    { photo: "40+6 20%" },
    { photo: "40+6 20%" },
    { photo: "40+6 20%" },
    { photo: "40+6 20%" },
    { photo: "40+6 20%" },
  ],
  other: [
    { plan: "40", order: "30+9", reject: "60+9", total: "30%" },
    { plan: "40", order: "30+9", reject: "60+9", total: "30%" },
    { plan: "40", order: "30+9", reject: "60+9", total: "30%" },
    { plan: "40", order: "30+9", reject: "60+9", total: "30%" },
    { plan: "40", order: "30+9", reject: "60+9", total: "30%" },
    { plan: "40", order: "30+9", reject: "60+9", total: "30%" },
  ],
});
const headers = ref({
  total: [
    {
      name: "Общее %",
      key: "total",
      thWidth: "auto",
      checked: true,
    },
    {
      name: "Начислено",
      key: "accrued",
      thWidth: "auto",
      checked: true,
    },
  ],
  byGps: [
    {
      name: "Факт по GPS",
      key: "f",
      thWidth: "auto",
      checked: true,
    },
    {
      name: "План",
      key: "s",
      thWidth: "auto",
      checked: false,
    },
  ],
  other: [
    {
      name: "План",
      key: "plan",
      thWidth: "auto",
      checked: true,
    },
    {
      name: "Заказ",
      key: "order",
      thWidth: "auto",
      checked: true,
    },
    {
      name: "Отказы",
      key: "reject",
      thWidth: "auto",
      checked: true,
    },
    {
      name: "Итого",
      key: "total",
      thWidth: "auto",
      checked: true,
    },
  ],
  tp: [
    {
      name: "ТП",
      key: "tp",
      thWidth: "140px",
      checked: true,
    },
  ],
  photoReport: [
    {
      name: "Фотоотчёт",
      key: "photo",
      thWidth: "140px",
      checked: true,
    },
  ],
});
let sortedData = ref({ key: "", mode: "" });
let configModal = ref(false);

// Methods
function sortData(data) {
  sortedData.value = data;
}

function closeConfigModal() {
  configModal.value = false;
}
</script>

<style scoped></style>
