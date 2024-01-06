<template>
  <div class="mt-[41px]">
    <back-btn :link="link"></back-btn>
    <div class="rounded-lg bg-white border-grey py-3 mt-4">
      <div class="flex flex-row gap-4 px-4 items-center">
        <div @click="draggable = true">
          <i-btn>
            <IconColsSVG />
          </i-btn>
        </div>
        <table-filter :headers="headers"></table-filter>
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
      <div class="mt-3 w-full overflow-auto">
        <data-table-no-edit
          :headers="headers"
          @sort="sortData"
          :sorted="sortedData"
        >
          <template #body>
            <c-tr v-for="data in loadedData" :key="data">
              <c-td-no-edit
                v-if="headers[0]"
                :style="{ borderRight: headers[0].borderR }"
              >
                <div>
                  <nuxt-link to="/settings-page/team-comunity">
                    {{ data[headers[0].key] }}
                  </nuxt-link>
                </div>
              </c-td-no-edit>
              <c-td-no-edit
                v-if="headers[1]"
                :style="{ borderRight: headers[1].borderR }"
              >
                <div>
                  {{ data[headers[1].key] }}
                </div>
              </c-td-no-edit>
              <c-td-no-edit
                v-if="headers[2]"
                :style="{ borderRight: headers[2].borderR }"
              >
                <div>
                  {{ data[headers[2].key] }}
                </div>
              </c-td-no-edit>
              <c-td-no-edit
                v-if="headers[3]"
                :style="{ borderRight: headers[3].borderR }"
              >
                <div>
                  {{ data[headers[3].key] }}
                </div>
              </c-td-no-edit>
              <c-td-no-edit>
                <div class="flex w-[300px] justify-end">
                  <button @click="duty = true" class="dolg">Долг</button>
                  <button @click="payment = true" class="pay ml-4">
                    Оплата
                  </button>
                </div>
              </c-td-no-edit>
            </c-tr>
          </template>
        </data-table-no-edit>
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
        <d-modal
          @closeDialog="draggableDialog"
          :name="'Добавить нового партнера'"
        >
          <drag-and-drop></drag-and-drop>
        </d-modal>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="duty">
        <data-model-two @closeDialog="dutyDialog" :name="'Дать в долг'">
          <SettingsPartnerDutyDialog></SettingsPartnerDutyDialog>
        </data-model-two>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="payment">
        <data-model-two @closeDialog="paymentDialog" :name="'Оплата'">
          <SettingsPartnerPaymentDialog></SettingsPartnerPaymentDialog>
        </data-model-two>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DataTableNoEdit from "~/components/global/DataTableNoEdit.vue";
import CTdNoEdit from "~/components/global/CTdNoEdit.vue";
const dataContainerWidth = ref("650px");
const link = ref("/settings/partner");
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const duty = ref(false);
const payment = ref(false);
const draggable = ref(false);
function dutyDialog() {
  duty.value = false;
}
function paymentDialog() {
  payment.value = false;
}
function draggableDialog() {
  draggable.value = false;
}
let headers = ref([
  {
    name: "Название",
    checked: false,
    key: "name",
    thWidth: "290px",
    borderR: "1px solid #E1E4E4",
  },
  {
    name: "Наличный",
    checked: false,
    key: "spot",
    thWidth: "180px",
    borderR: "1px solid #E1E4E4",
  },
  {
    name: "Без наличный сум",
    checked: false,
    key: "noCash",
    thWidth: "180px",
    borderR: "1px solid #E1E4E4",
  },
  {
    name: "Доллар США",
    checked: false,
    key: "dollar",
    thWidth: "180px",
    borderR: "1px solid #E1E4E4",
  },
]);
const loadedData = ref([
  {
    name: "Team comunity",
    spot: "100 000 000",
    noCash: "100 000 000",
    dollar: "100 000 000",
    btn: "",
  },
  {
    name: "Team comunity",
    spot: "100 000 000",
    noCash: "100 000 000",
    dollar: "100 000 000",
    btn: "",
  },
  {
    name: "Team comunity",
    spot: "100 000 000",
    noCash: "100 000 000",
    dollar: "100 000 000",
    btn: "",
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

<style scoped>
.dolg {
  background: #f5e0e0;
  border-radius: 8px;
  color: red;
  padding: 9px 35px;
  font-size: 14px;
  line-height: 19px;
}
.pay {
  background: rgba(41, 155, 155, 0.1);
  border-radius: 8px;
  color: #299b9b;
  padding: 9px 35px;
  font-size: 14px;
  line-height: 19px;
}
</style>
