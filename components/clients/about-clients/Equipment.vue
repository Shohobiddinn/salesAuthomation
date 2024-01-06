<template>
  <div class="flex text-[24px] font-[500]">Инвертарии</div>
  <div class="rounded-lg bg-white border-grey mt-3 px-[2px]">
    <div class="flex mb-4 flex-row gap-4 ml-4 mt-3 items-center">
      <div @click="draggableMain = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <SettingsRlpDiscountsTableCheckbox
        :headers="clientDevicesStore.headers"
      ></SettingsRlpDiscountsTableCheckbox>
      <div>
        <search-input
          @change="clientDevicesStore.searchFromMain"
          class="w-full h-38px"
        />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="w-full overflow-auto">
      <data-table
        :headers="clientDevicesStore.headers"
        :loading="clientDevicesStore.loadingMainTable"
        @sort="clientDevicesStore.sortMainTableData"
        :sorted="clientDevicesStore.paramsOfMainTable.OrderBy"
      >
        <template #body>
          <c-tr
            v-for="(data, index) in clientDevicesStore.dataOfMainTable?.items"
            :key="data.id"
          >
            <c-td-no-edit v-for="key in clientDevicesStore.headers" :key="key">
              <div class="py-2">
                <div v-if="key.key === 'orderNumber'">
                  {{ index + 1 }}
                </div>
                <div v-else>
                  {{ data[key.key] }}
                </div>
              </div>
            </c-td-no-edit>
          </c-tr>
        </template>
      </data-table>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14"> Показать по </span>
        <page-size-btn
          :current-size="clientDevicesStore.paramsOfMainTable.PageSize"
          @setPageSize="clientDevicesStore.setPageSizeToMain"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="clientDevicesStore.dataOfMainTable?.total_pages"
          :current-page="clientDevicesStore.dataOfMainTable?.page_number"
          @setPage="clientDevicesStore.setPageToMain"
        />
      </div>
    </div>
  </div>
  <div class="flex text-[24px] font-[500] mt-4">Изъятие инвентарей</div>
  <div class="rounded-lg bg-white border-grey mt-3 px-[2px]">
    <div class="flex mb-4 flex-row gap-4 ml-4 mt-3 items-center">
      <div @click="draggableWithdraw = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <SettingsRlpDiscountsTableCheckbox :headers="withdrawHeaders" />
      <div>
        <search-input
          @change="clientDevicesStore.searchFromWithdraw"
          class="w-full h-38px"
        />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="w-full overflow-auto">
      <data-table
        :headers="withdrawHeaders"
        :loading="clientDevicesStore.loadingWithdrawTable"
        @sort="clientDevicesStore.sortWithdrawTableData"
        :sorted="clientDevicesStore.paramsOfWithdrawTable.OrderBy"
      >
        <template #body>
          <c-tr
            v-for="(data, index) in clientDevicesStore.dataOfWithdrawTable
              ?.items"
            :key="data.id"
          >
            <c-td-no-edit v-for="key in withdrawHeaders" :key="key">
              <div class="py-2">
                <div v-if="key.key === 'orderNumber'">
                  {{ index + 1 }}
                </div>
                <div v-if="key.key === 'withdrawal_date'">
                  {{ getFormattedDate(data[key.key]) }}
                </div>
                <div v-else>
                  {{ data[key.key] }}
                </div>
              </div>
            </c-td-no-edit>
          </c-tr>
        </template>
      </data-table>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14"> Показать по </span>
        <page-size-btn
          :current-size="clientDevicesStore.paramsOfWithdrawTable.PageSize"
          @setPageSize="clientDevicesStore.setPageSizeToWithdraw"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="clientDevicesStore.dataOfWithdrawTable?.total_pages"
          :current-page="clientDevicesStore.dataOfWithdrawTable?.page_number"
          @setPage="clientDevicesStore.setPageToWithdraw"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggableMain || draggableWithdraw">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="onChangeHeaders"
          :templates="
            draggableWithdraw ? withdrawHeaders : clientDevicesStore.headers
          "
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
import moment from "moment";
// store
const clientDevicesStore = useClientDetailsDevicesStore("main");

// props
const props = defineProps({
  isActive: Boolean,
});

// State
const route = useRoute();
const clientId = ref(route.params.id);
const draggableMain = ref(false);
const draggableWithdraw = ref(false);
const withdrawHeaders = ref([
  ...clientDevicesStore.headers,
  {
    name: "Дата изъятия",
    checked: true,
    key: "withdrawal_date",
    thWidth: "140px",
  },
]);

// Methods
watchEffect(() => {
  if (props.isActive) {
    clientDevicesStore.paramsOfMainTable.clientId = clientId.value;
    clientDevicesStore.paramsOfWithdrawTable.clientId = clientId.value;
  }
});

const onChangeHeaders = (param) => {
  if (draggableMain.value) {
    clientDevicesStore.headers = param;
  }
  if (draggableWithdraw.value) {
    withdrawHeaders.value = param;
  }
  draggableMain.value = false;
  draggableWithdraw.value = false;
};

function draggableDialog() {
  draggableMain.value = false;
  draggableWithdraw.value = false;
}

const getFormattedDate = (date) => {
  return date && moment(date).format("YYYY-MM-DD");
};
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
.bg-rg {
  background: rgba(22, 117, 6, 0.04);
}
.bg-rg1 {
  background: rgba(59, 7, 99, 0.04);
}
</style>
