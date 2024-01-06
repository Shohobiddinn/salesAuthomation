<template>
  <div class="flex items-center justify-between my-4.5">
    <div class="text-[24px] font-[500]">Долги</div>
    <menu-btn class="h-11 w-1/8">
      <template #btn>
        <m-btn
          @click="onOpenDropdown('priceType')"
          class="border-grey flex items-center gap-2 w-full"
        >
          <fa-icon hash="&#xf078" />
          {{
            selectedPriceType.name || "Оплата"
          }}
        </m-btn>
      </template>
      <template #content>
        <div class="overflow-auto">
          <FilterItems
            :data="priceTypes"
            :singleSelect="true"
            :selectedItems="selectedPriceType.id"
            @onSingleItemSelect="onSelectPriceType($event)"
            @onLoadElse="onLoadElsePriceTypes"
          />
        </div>
      </template>
    </menu-btn>
  </div>
  <div v-if="debtBalances" class="flex gap-4 mb-5">
    <div
      v-for="debt in debtBalances"
      :key="debt.balance"
      class="h-[130px] w-[313px] border rounded-lg"
    >
      <div class="h-[12px] w-full br-t" :class="randomColor()"></div>
      <div class="h-full w-full flex justify-center items-center">
        <div>
          <div class="text-[#000] text-[24px] font-[600]">
            {{ debt.balance }}
          </div>
          <div class="text-[#000] fs-16 font-[400]">
            {{ debt.currency.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="rounded-lg bg-white border-grey mt-3 px-[2px]">
    <div class="flex mb-4 flex-row gap-4 ml-4 mt-3 items-center">
      <div @click="draggableMain = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <SettingsRlpDiscountsTableCheckbox
        :headers="clientDebtsStore.headersOfMainTable"
      ></SettingsRlpDiscountsTableCheckbox>
      <div>
        <search-input
          @change="clientDebtsStore.searchFromMain"
          class="w-full h-38px"
        />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="w-full overflow-auto">
      <data-table
        :headers="clientDebtsStore.headersOfMainTable"
        :loading="clientDebtsStore.loadingMainTable"
      >
        <template #body>
          <c-tr
            v-for="data in clientDebtsStore.dataOfMainTable?.items"
            :key="data?.object_id"
          >
            <c-td-no-edit
              v-for="key in clientDebtsStore.headersOfMainTable"
              :key="key"
            >
              <div class="py-2">
                <div
                  v-if="key.key === 'type'"
                  class="cursor-pointer underline"
                  @click="paymentInfo = data?.object_id"
                >
                  {{ data[key.key] }}
                </div>
                <div v-else-if="key.key === 'income'">
                  {{ data[key.key] }} {{ data.currency_title }}
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
          :current-size="clientDebtsStore.paramsOfMainTable.pageSize"
          @setPageSize="clientDebtsStore.setPageSizeToMain"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="clientDebtsStore.dataOfMainTable?.total_pages"
          :current-page="clientDebtsStore.dataOfMainTable?.page_number"
          @setPage="clientDebtsStore.setPageToMain"
        />
      </div>
    </div>
  </div>
  <div class="text-[24px] font-[500] mt-5 mb-3">Финансовый отчет</div>
  <div class="rounded-lg bg-white border-grey mt-3 px-[2px]">
    <div class="flex mb-4 flex-row gap-4 ml-4 mt-3 items-center">
      <div @click="draggableReport = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <SettingsRlpDiscountsTableCheckbox
        :headers="clientDebtsStore.headersOfReportTable"
      ></SettingsRlpDiscountsTableCheckbox>
      <div>
        <search-input
          @change="clientDebtsStore.searchFromReport"
          class="w-full h-38px"
        />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="w-full overflow-auto">
      <data-table
        :headers="clientDebtsStore.headersOfReportTable"
        :loading="clientDebtsStore.loadingReportTable"
        @sort="clientDebtsStore.sortReportTableData"
        :sorted="clientDebtsStore.paramsOfReportTable.OrderBy"
      >
        <template #body>
          <c-tr
            v-for="data in clientDebtsStore.dataOfReportTable?.items"
            :key="data"
          >
            <c-td-no-edit
              v-for="key in clientDebtsStore.headersOfReportTable"
              :key="key"
            >
              <div class="py-2">
                <div>
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
          :current-size="clientDebtsStore.paramsOfReportTable.PageSize"
          @setPageSize="clientDebtsStore.setPageSizeToReport"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="clientDebtsStore.dataOfReportTable?.total_pages"
          :current-page="clientDebtsStore.dataOfReportTable?.page_number"
          @setPage="clientDebtsStore.setPageToReport"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggableMain || draggableReport">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="onChangeHeaders"
          :templates="
            draggableReport
              ? clientDebtsStore.headersOfReportTable
              : clientDebtsStore.headersOfMainTable
          "
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="paymentModal">
      <d-modal @closeDialog="paymentDialog" :name="'Оплата'">
        <ClientsAboutClientsPaymentDialog :clientId="clientId" :priceType="selectedPriceType" @closeDialog="paymentDialog"/>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="paymentInfo">
      <d-p-modal
        @closeDialog="paymentInfo = null"
        :dataContainerWidth="'504px'"
        :name="'Оплата'"
      >
        <ClientsAboutClientsPaymentDataDialog
          :debtId="paymentInfo"
          @onOpenConversionDialog="onOpenConversionDialog"
          @onOpenChangePaymentDialog="onOpenChangePaymentDialog"
        />
      </d-p-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="isConversion">
      <d-p-modal
        @closeDialog="isConversion = false"
        :dataContainerWidth="'623px'"
        :name="'Конвертация'"
      >
        <ClientsAboutClientsConversionDialog />
      </d-p-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="isChangePayment">
      <d-p-modal
        @closeDialog="isChangePayment = false"
        :dataContainerWidth="'623px'"
        :name="'Изменить оплату'"
      >
        <ClientsAboutClientsChangePaymentDialog />
      </d-p-modal>
    </div>
  </transition>
</template>

<script setup>
// store
const clientDebtsStore = useClientsDebtsStore("main");

// props
const props = defineProps({
  isActive: Boolean,
});

// State
const route = useRoute();
const clientId = ref(route.params.id)
const draggableMain = ref(false);
const draggableReport = ref(false);
const paymentModal = ref(false);
const paymentInfo = ref(false);
const isConversion = ref(false)
const isChangePayment = ref(false)
const debtBalances = ref(null);
const priceTypes = ref(null);
const selectedPriceType = ref({
  id: '',
  name: ''
});
const colorsArr = ref(["#D10505", "#BD7F06", "#057CD1"]);

const priceTypesParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

// Methods
const onOpenDropdown = async (state) => {
  if (state === "priceType" && !priceTypes.value) {
    await getPriceTypes();
  }
};

const getPriceTypes = async () => {
  priceTypes.value = await clientDebtsStore.getPriceTypes(
    priceTypesParams.value
  );
};

const onLoadElsePriceTypes = async () => {
  priceTypesParams.value.page_size += 10;
  await getPriceTypes();
};

const getSelectedName = (selectedId, state) => {
  if (state === "priceType" && priceTypes.value) {
    return priceTypes.value.items?.find(
      (priceType) => priceType.id === selectedId
    )?.name;
  }
};

const onChangeHeaders = (param) => {
  if (draggableMain.value) {
    clientDebtsStore.headersOfMainTable = param;
  }
  if (draggableReport.value) {
    clientDebtsStore.headersOfReportTable = param;
  }
  draggableMain.value = false;
  draggableReport.value = false;
};

const onSelectPriceType = (priceTypeId) => {
  selectedPriceType.value.id = priceTypeId
  selectedPriceType.value.name = getSelectedName(priceTypeId, 'priceType')
  paymentModal.value = true
}

const randomColor = () => {
  const idx = Math.floor(Math.random() * colorsArr.value.length);
  return colorsArr.value[idx];
};

function paymentDialog() {
  paymentModal.value = false;
}

function draggableDialog() {
  draggableMain.value = false;
  draggableReport.value = false;
}

const onOpenConversionDialog = () => {
  paymentInfo.value = null
  isConversion.value = true
}

const onOpenChangePaymentDialog = () => {
  paymentInfo.value = null
  isChangePayment.value = true
}

watchEffect(async () => {
  if (props.isActive) {
    clientDebtsStore.paramsOfMainTable.clientId = clientId.value;
    debtBalances.value = await clientDebtsStore.getDebtBalances();
    clientDebtsStore.paramsOfReportTable.clientId = clientId.value;
  }
});
</script>

<style scoped>
.br-t {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
</style>
