<template>
  <div class="rounded-lg bg-white border-grey px-[2px]">
    <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>

      <table-filter :templates="headers"></table-filter>
      <div>
        <search-input
          @change="clientsBalancesStore.search"
          class="w-full h-38px"
        />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="w-full overflow-auto">
      <data-table
        :headers="headers"
        :loading="clientsBalancesStore.loading"
        :check="isAllTableChecked"
        @getAllId="getAllClientsId()"
      >
        <template #body>
          <template
            v-for="data in clientsBalancesStore.data?.items"
            :key="data?.client_id"
          >
            <c-tr class="border-b-none b-bottom cursor-pointer">
              <c-td-no-edit v-for="key in headers" :key="key">
                <div class="pt-2 check" v-if="key.key === 'checkbox'">
                  <label>
                    <input
                      type="checkbox"
                      :id="data.id"
                      :checked="isTableChecked(data.client_id)"
                      @change="onSelectClient(data.client_id)"
                    />
                    <span></span>
                  </label>
                </div>
                <div
                  v-for="clientBalance in data.balance"
                  :key="clientBalance?.currency_id"
                >
                  <div v-if="key.key === clientBalance?.currency_id">
                    {{ clientBalance?.amount }}
                  </div>
                </div>
                <div
                  v-if="key.key === 'term_date'"
                  class="pt-2 check text-red underline"
                  @click="onOpenChangeDeadline(data?.client_id, data?.client_name, data?.term_date)"
                >
                  {{ getFormattedDate(data[key.key]) }}
                </div>
                <div v-else-if="key.key === 'last_payment_date'" class="flex items-center justify-center">
                  {{ getFormattedDate(data[key.key]) }}
                </div>
                <div v-else :class="key.key === 'days_since_last_payment' && 'flex items-center justify-center'">
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
          :current-size="clientsBalancesStore.params.page_size"
          @setPageSize="clientsBalancesStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="clientsBalancesStore.data?.total_pages"
          :current-page="clientsBalancesStore.data?.page_number"
          @setPage="clientsBalancesStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="onChangeTableHeaders"
          :templates="clientsBalancesStore.headers"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="changeDeadlineInfo.clientId">
      <d-modal
        @closeDialog="onClosechangeDeadline"
        :dataContainerWidth="'812px'"
        :name="'Изменить срок'"
      >
        <clients-customer-balances-change-deadline-dialog :changeDeadlineInfo="changeDeadlineInfo" @closeDialog="onClosechangeDeadline"/>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
import moment from "moment";

// store
const clientsBalancesStore = useClientsBalancesStore("main");

// State
const isAllTableChecked = ref(false);
const draggable = ref(false);

const changeDeadlineInfo = ref({
  clientId: '',
  clientName: '',
  currentTerm: ''
});

// Methods
onMounted(async () => {
  await clientsBalancesStore.getData();
});

const getAllClientsId = () => {
  isAllTableChecked.value = !isAllTableChecked.value;
  if (isAllTableChecked.value) {
    clientsBalancesStore.clientsIds = clientsBalancesStore.data?.items.map(
      (client) => client.client_id
    );
  } else {
    clientsBalancesStore.setNullMultipleDialog();
  }
};

const isTableChecked = (client_id) => {
  return clientsBalancesStore.clientsIds.find((id) => client_id === id);
};

const onSelectClient = (client_id) => {
  if (!isTableChecked(client_id)) {
    clientsBalancesStore.clientsIds.push(client_id);
  } else {
    clientsBalancesStore.clientsIds = clientsBalancesStore.clientsIds.filter(
      (id) => id !== client_id
    );
  }
};

const onChangeTableHeaders = (param) => {
  clientsBalancesStore.headers = param;
  draggable.value = false;
};

const onOpenChangeDeadline = (clientId, clientName, currentTerm) => {
  changeDeadlineInfo.value.clientId = clientId
  changeDeadlineInfo.value.clientName = clientName
  changeDeadlineInfo.value.currentTerm = currentTerm
}

function onClosechangeDeadline() {
  changeDeadlineInfo.value.clientId = ""
  changeDeadlineInfo.value.clientName = ""
  changeDeadlineInfo.value.currentTerm = ""
}

function draggableDialog() {
  draggable.value = false;
}

const headers = computed(() => {
  if (clientsBalancesStore.data?.items?.length) {
    let balanceArrayWithMaxlength = getBalanceArrayWithMaxlength();
    balanceArrayWithMaxlength = balanceArrayWithMaxlength.map((balance) => ({
      key: balance?.currency_id,
      id: balance?.currency_id,
      name: balance?.currency_name,
      bgHeader: "#e1e1e1",
      thWidth: "180px",
      checked: true,
    }));
    return [...clientsBalancesStore.headers, ...balanceArrayWithMaxlength];
  } else return clientsBalancesStore.headers;
});

const getBalanceArrayWithMaxlength = () => {
  let max = 0;
  let balanceArrayWithmaxlength = [];
  for (const item of clientsBalancesStore.data.items) {
    if (item?.balance?.length && item.balance.length > max) {
      max = item.balance.length;
      balanceArrayWithmaxlength = item.balance;
    }
  }

  return balanceArrayWithmaxlength;
};

const getFormattedDate = (date) => {
  return date && moment(date).format("YYYY-MM-DD");
};

// Methods
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
.check label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
.check label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
.check [type="checkbox"]:checked + span:before {
  content: "\f106";
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all 0.4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299b9b;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.b-bottom:last-child {
  border-bottom: 1px solid #e1e4e4;
}
.b-top-none {
  border-top: none;
}
.bgy {
  background: rgba(189, 127, 6, 0.1);
}
.bg-accepted {
  background: rgba(35, 192, 10, 0.1);
}
.bg-new {
  background: rgba(41, 155, 155, 0.1);
}
.td-shadow {
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.04);
}
</style>
