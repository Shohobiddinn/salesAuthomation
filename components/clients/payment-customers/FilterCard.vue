<template>
  <rounded-white-container class="gap-4 p-6">
    <flex-row class="items-center justify-between gap-4">
      <div>
        <span class="text-gray-3 text-[20px] fw-6">
          Фильтр
        </span>
      </div>
      <!-- <div>
        <DatePicker />
      </div> -->
    </flex-row>
    <div class="grid grid-cols-3 gap-5 mt-4" v-for="s in filterStates" :key="s">
      <div v-for="cols in s" :key="cols.key">
        <i-title>{{ cols.name }}</i-title>
        <menu-btn v-if="cols.key !== 'btn' && cols.key !== 'range' && cols.key !== 'dates'"
          class="w-full"
          @click="onOpenDropdown($event, cols.key)"
        >
          <template #btn>
            <m-btn-outlined
              class="border-grey flex items-center bg-lotion w-full gap-2 h-11"
            >
              <div class="w-full flex items-center justify-between">
                <div class="flex gap-2">
                  <fa-icon hash="&#xf078;" />
                  <div>
                    {{
                      cols.isSingleSelect
                        ? (cols.data && cols.getSelectedData !== null ? getSingleSelectedName(cols.data, cols.getSelectedData) : "Выбрать")
                        : "Выбрать"
                    }}
                  </div>
                </div>
                <div
                  v-if="!cols.isSingleSelect && cols.data?.total_count"
                  class="ml-1"
                >
                  {{ cols.getSelectedData?.length }} из
                  {{ cols.data?.total_count }}
                </div>
                <div
                  v-if="cols.getSelectedData?.length > 0 && cols.key === 'cashboxes'"
                  class="ml-1"
                >
                  {{ cols.getSelectedData?.length }} из
                  {{ cols.data.items.length }}
                </div>
              </div>
            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col class="gap-2 max-h-88 overflow-auto pr-2">
              <search-input
                v-if="!cols.isSingleSelect && cols.key !== 'days'"
                @change="search($event, cols.key)"
              />
              <FilterItems
                :data="cols?.data"
                :selectedItems="cols.getSelectedData"
                :singleSelect="cols.isSingleSelect"
                @onSelectItems="cols.setSelectedData = $event"
                @onSingleItemSelect="cols.setSelectedData = $event"
                @onLoadElse="cols?.onLoadElse"
              />
            </flex-col>
          </template>
        </menu-btn>
        <flex-row v-if="cols.key === 'dates'" class="mt-2 w-full">
          <div class="border-1 rounded-lg grid grid-cols-2 w-full">
            <DInputDatePicker :value="dateTimeFrom" withoutTime borderless class="border-r-1 w-full" @change="(newVal) => dateTimeFrom = newVal"/>
            <DInputDatePicker :value="dateTimeTo" withoutTime borderless class="w-full" @change="(newVal) => dateTimeTo = newVal"/>
          </div>
        </flex-row>
        <flex-row class="gap-4 mb-2 items-center" v-if="cols.key === 'range'">
          <div class="flex gap-2 border-b-1 items-center">
            <span class="fs-14 text-gray-400">
              От
            </span>
            <input type="text" class="w-11/12" v-model="clientsPaymentStore.priceRange[0]" />
          </div>
          <div class="flex gap-2 border-b-1 items-center">
            <span class="text-gray-400">
              до
            </span>
            <input type="number" class="w-11/12" v-model="clientsPaymentStore.priceRange[1]">
          </div>
        </flex-row>
        <div class="w-full h-full" v-if="cols.key === 'range'">
          <Slider 
            v-model="clientsPaymentStore.priceRange"
            :step="clientsPaymentStore.priceStep"
            :min="clientsPaymentStore.price.min"
            :max="clientsPaymentStore.price.max"
            class="slider-blue z-0"
            :tooltips="false" />
        </div>
        <flex-row v-if="cols.key === 'btn'" class="items-end gap-2">
          <m-btn @click="onSetFilters" class="w-full h-11 mt-4">
            Применить
          </m-btn>
          <sm-btn class="px-4 py-3">
            <IconReloadSVG />
          </sm-btn>
        </flex-row>
      </div>
    </div>
  </rounded-white-container>
</template>

<script setup>
import Slider from "@vueform/slider";

// Store
const clientsPaymentStore = useClientsPaymentStore("main");

// states
const agents = ref(null);
const selectedAgents = ref([]);
const territories = ref(null);
const selectedTerritories = ref([]);
const expeditors = ref(null);
const selectedExpeditors = ref([]);
const priceTypes = ref(null);
const selectedPriceTypes = ref([]);
const cashboxes = ref({items: []})
const selectedcashboxes = ref([])

const agentsParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "id",
    is_asc: true,
  },
});

const territoryParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

const expeditorsParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

const priceTypesParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

const cashboxesParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

const filterStates = ref({
  firstRow: [
    {
      name: "Агент",
      key: "agents",
      get data() {
        return agents.value || [];
      },
      get getSelectedData() {
        return selectedAgents.value;
      },
      set setSelectedData(value) {
        selectedAgents.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseAgents();
      },
    },
    {
      name: "Экспедитор",
      key: "expeditors",
      get data() {
        return expeditors.value || [];
      },
      get getSelectedData() {
        return selectedExpeditors.value;
      },
      set setSelectedData(value) {
        selectedExpeditors.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseExpeditors();
      },
    },
    {
      name: "Тип оплаты",
      key: "priceTypes",
      get data() {
        return priceTypes.value || [];
      },
      get getSelectedData() {
        return selectedPriceTypes.value;
      },
      set setSelectedData(value) {
        selectedPriceTypes.value = value;
      },
      onLoadElse: async () => {
        await onLoadElsePriceTypes();
      },
    },
  ],
  secondRow: [    
    {
      name: "Касса",
      key: "cashboxes",
      get data() {
        return cashboxes.value || [];
      },
      get getSelectedData() {
        return selectedcashboxes.value;
      },
      set setSelectedData(value) {
        selectedcashboxes.value = value;
      },
      onLoadElse: async () => {
        await onLoadElsecashboxes();
      },
    },
    {
      name: "Территории",
      key: "territories",
      get data() {
        return territories.value || [];
      },
      get getSelectedData() {
        return selectedTerritories.value;
      },
      set setSelectedData(value) {
        selectedTerritories.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseTerritories();
      },
    },    
    {
      name: "Тип",
      key: "transactionType",
      // get data() {
      //   return priceTypes.value || [];
      // },
      // get getSelectedData() {
      //   return selectedPriceTypes.value;
      // },
      // set setSelectedData(value) {
      //   selectedPriceTypes.value = value;
      // },
      // onLoadElse: async () => {
      //   await onLoadElseGetPriceTypes();
      // },
    }
  ],
  thirdRow: [
    {
      name: "Сумма от-до",
      key: "range"
    },
    {
      name: "Даты",
      key: "dates",
    },
    {
      key: "btn",
    },
  ]
});

// methods
const onOpenDropdown = async (value, state) => {
  if (state === "agents" && !agents.value) {
    await getAgents();
    return;
  }
  if (state === "territories" && !territories.value) {
    await getTerritories();
    return;
  }
  if (state === "cashboxes" && !cashboxes.items?.length) {
    await getcashboxes();
    return;
  }
  if (state === "priceTypes" && !priceTypes.value) {
    await getPriceTypes();
    return;
  }
  if (state === "expeditors" && !expeditors.value) {
    await getExpeditors();
    return;
  }
};

const search = async (value, state) => {
  if (state === "agent") {
    agentsParams.value.search = value;
    await getAgents();
    return;
  }
  if (state === "territories") {
    territoryParams.value.search = value;
    await getTerritories();
    return;
  }
  // if (state === "cashboxes") {
  //   cashboxesParams.value.search = value;
  //   await getcashboxes();
  //   return;
  // }
  if (state === "priceTypes") {
    priceTypesParams.value.search = value;
    await getPriceTypes();
    return;
  }
  if (state === "expeditors") {
    expeditorsParams.value.search = value;
    await getExpeditors();
    return;
  }
};

const onSetFilters = () => {
  clientsPaymentStore.params.agent = [...selectedAgents.value];
  clientsPaymentStore.params.territory = [...selectedTerritories.value];
  clientsPaymentStore.params.cashbox = [...selectedcashboxes.value];
  clientsPaymentStore.params.price_type = [...selectedPriceTypes.value];
  clientsPaymentStore.params.expeditor = [...selectedExpeditors.value];
  clientsPaymentStore.setPage(1)
};

const getAgents = async () => {
  agents.value = await clientsPaymentStore.getAgents(agentsParams.value);
};

const onLoadElseAgents = async () => {
  agentsParams.value.page_size += 10;
  await getAgents();
};

const getTerritories = async () => {
  territories.value = await clientsPaymentStore.getTerritories(territoryParams.value);
};

const onLoadElseTerritories = async () => {
  territoryParams.value.page_size += 10;
  await getTerritories();
};

const getcashboxes = async () => {
  cashboxes.value.items = await clientsPaymentStore.getcashboxes();
};

const onLoadElsecashboxes = async () => {
  cashboxesParams.value.page_size += 10;
  await getcashboxes();
};

const getExpeditors = async () => {
  expeditors.value = await clientsPaymentStore.getExpeditors(expeditorsParams.value);
};

const onLoadElseExpeditors = async () => {
  expeditorsParams.value.page_size += 10;
  await getExpeditors();
};

const getPriceTypes = async () => {
  priceTypes.value = await clientsPaymentStore.getPriceTypes(priceTypesParams.value);
};

const onLoadElsePriceTypes = async () => {
  priceTypesParams.value.page_size += 10;
  await getPriceTypes();
};


const getSingleSelectedName = (data, value) => {
  return data?.items?.find((val) => val.id === value)?.name;
};

</script>

<style scoped>
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

input[type="radio"] {
  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #299B9B;
  border: 1px solid #cccccc;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
}
input[type="radio"]:checked::before {
  transform: scale(1);
}
.form_radio_btn {
  display: inline-block;
}
.form_radio_btn input[type=radio] {
  display: none;
}
.form_radio_btn label {
  display: inline-block;
  cursor: pointer;
  line-height: 100%;
  user-select: none;
}

/* Checked */
.form_radio_btn input[type=radio]:checked + label {
  background: #299B9B;
  color: white;
}

/* Hover */
.form_radio_btn label:hover {
  color: #666;
}

/* Disabled */
.form_radio_btn input[type=radio]:disabled + label {
  background: #efefef;
  color: #666;
} 
.slider-base, .slider-connects {
  z-index: 0 !important;
}

</style>

<style src="@vueform/slider/themes/default.css"></style>

