<template>
  <rounded-white-container class="gap-4">
    <flex-row class="items-center justify-between gap-4">
      <div>
        <span class="text-gray-3 text-[20px] fw-6">
          Фильтр
        </span>
      </div>
      <div class="w-1/6">
        <DatePicker :initialFromDate="'2023-01-01'" @onApply="onApplyDate" />
      </div>
    </flex-row>
    <flex-row class="gap-4"
              v-for="s in filterStates" :key="s">
      <flex-col class="w-full"
                v-for="cols in s"
                :key="cols.key">
        <i-title v-if="cols.key !== 'btn' && cols.key !== 'status'">
          {{ cols.name }}
        </i-title>
        <menu-btn class="w-full" @click="onOpenDropdown($event, cols.key)">
          <template #btn>
            <m-btn-outlined
                class="border-grey flex items-center w-full gap-2">
              <fa-icon hash="&#xf078" />
              Выбрать
            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col
                class="gap-2 max-h-88 overflow-auto pr-2"
                v-if="cols.key === 'agent'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                  :data="agents"
                  :selectedItems="filters.Agents"
                  @onSelectItems="selectAgents"
                  @onLoadElse="onLoadElseAgents"
              />
            </flex-col>
            <flex-col
                class="gap-2 max-h-88 overflow-auto pr-2"
                v-if="cols.key === 'territory'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                  :data="territories"
                  :selectedItems="filters.Territories"
                  @onSelectItems="selectTerritories"
                  @onLoadElse="onLoadElseTerritories"
              />
            </flex-col>
            <flex-col
                class="gap-2 max-h-88 overflow-auto pr-2"
                v-if="cols.key === 'rejects'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                  :data="rejects"
                  :selectedItems="filters.Rejects"
                  @onSelectItems="selectRejects"
                  @onLoadElse="onLoadElseRejects"
              />
            </flex-col>
            <flex-col
                class="gap-2 max-h-88 overflow-auto pr-2"
                v-if="cols.key === 'client'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                  :data="clientCategories"
                  :selectedItems="filters.Clients"
                  @onSelectItems="selectClients"
                  @onLoadElse="onLoadElseClientCategories"
              />
            </flex-col>
          </template>
        </menu-btn>
      </flex-col>
    </flex-row>
    <flex-row class="h-full justify-end items-end gap-2">
      <m-btn @click="onApplyFilters" class="w-[22%] mt-5">
        Применить
      </m-btn>
      <sm-btn class="px-4 py-3">
        <IconReloadSVG/>
      </sm-btn>
    </flex-row>
  </rounded-white-container>
</template>

<script setup>
import moment from "moment";

// store
const employeeRejectsStore = useEmployeeRejectsStore('main')

// states
const agents = ref(null);
const agentsParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: "is_active",
      value: ['true'],
    }
  ],
});

const territories = ref(null)
const territoriesParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: "is_active",
      value: ['true'],
    }
  ],
});

const clientCategories = ref(null)
const clientCategoriesParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "id",
    is_asc: true,
  },
  filter: [
    {
      field: "is_active",
      value: ['true'],
    }
  ],
});

const rejects = ref(null)
const rejectsParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "id",
    is_asc: true,
  },
  filter: [
    {
      field: "is_active",
      value: ['true'],
    }
  ],
});

const filters = ref({
  Page: 1,
  PageSize: 10,
  Date:{
    FromValue: moment('2023-01-01').format("YYYY-MM-DD"),
    ToValue: moment().format('YYYY-MM-DD'),
  },
  agents: [],
  territories: [],
  rejects: [],
  clients: [],
})

const filterStates = ref({
  firstRow: [
    {
      name: "Агент",
      key: "agent"
    },
    {
      name: "Территория",
      key: "territory"
    },
    {
      name: "Причины отказа",
      key: "rejects"
    },
    {
      name: "Категории клиентов",
      key: "client"
    }
  ]
});

// methods
const onApplyDate = (value) => {
  filters.value.Date.ToValue = value.toDate
  filters.value.Date.FromValue = value.fromDate
}

function selectAgents(param){
  filters.value.Agents = param
}

function selectTerritories(param){
  filters.value.Territories = param
}

function selectClients(param){
  filters.value.Clients = param
}

function selectRejects(param){
  filters.value.Rejects = param
}

const getAgents = async () => {
  const data = await employeeRejectsStore.getAgent(agentsParams.value);
  agents.value = data
};

const onLoadElseAgents = async () => {
  agentsParams.value.page_size += 10;
  await getAgents();
};

const getTerritories = async () => {
  const data = await employeeRejectsStore.getTerritories(territoriesParams.value);
  territories.value = data
};

const onLoadElseTerritories = async () => {
  territoriesParams.value.page_size += 10;
  await getTerritories();
};

const getRejects = async () => {
  const data = await employeeRejectsStore.getRejects(rejectsParams.value);
  rejects.value = data
};

const onLoadElseRejects = async () => {
  rejectsParams.value.page_size += 10;
  await getRejects();
};

const getClientCategories = async () => {
  const data = await employeeRejectsStore.getClientCategories(clientCategoriesParams.value);
  clientCategories.value = data
};

const onLoadElseClientCategories = async () => {
  territoriesParams.value.page_size += 10;
  await getClientCategories();
};

const onOpenDropdown = async (value, state) => {
  if ((state === "agent") && !agents.value) {
    await getAgents();
    return;
  }
  if (state === "territory" && !territories.value) {
    await getTerritories();
    return;
  }
  if (state === "client" && !clientCategories.value) {
    await getClientCategories();
    return;
  }
  if (state === "rejects" && !rejects.value) {
    await getRejects();
    return;
  }
  return;
};

const search = async (value, state) => {
  if (state === "agent") {
    agentsParams.value.search = value;
    await getAgents();
    return;
  }
  if (state === "territory") {
    territoriesParams.value.search = value;
    await getTerritories();
    return;
  }
  if (state === "client") {
    territoriesParams.value.search = value;
    await getClientCategories();
    return;
  }
  if (state === "rejects") {
    rejectsParams.value.search = value;
    await getRejects();
    return;
  }
  return;
};

const onApplyFilters = () => {
  employeeRejectsStore.params.Page = filters.value.Page
  employeeRejectsStore.params.PageSize = filters.value.PageSize
  employeeRejectsStore.params.agents = [...filters.value.agents]
  employeeRejectsStore.params.territories = [...filters.value.territories]
  employeeRejectsStore.params.clients = [...filters.value.clients]
  employeeRejectsStore.params.rejects = [...filters.value.rejects]
  employeeRejectsStore.params.Date = filters.value.Date
}
</script>
