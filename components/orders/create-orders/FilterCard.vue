<template>
  <rounded-white-container>
    <flex-row
      class="gap-4 mt-4 justify-end"
      v-for="row in createOrdersStore.filterStates"
      :key="row"
    >
      <flex-col class="w-1/4" v-for="cols in row" :key="cols.key">
        <i-title v-if="cols.key !== 'btn'">
          {{ cols.name }}
        </i-title>
        <flex-row
          class="h-full w-full justify-end items-end gap-2"
          v-if="cols.key === 'btn'"
        >
          <m-btn class="w-2/3" @click="onApplyFilter"> Применить </m-btn>
          <sm-btn class="px-4 py-3">
            <IconReloadSVG />
          </sm-btn>
        </flex-row>
        <menu-btn
          class="w-full"
          v-if="
            cols.key !== 'btn' && cols.key !== 'range' && cols.key !== 'radio'
          "
          @click="onOpenDropdown($event, cols.key)"
        >
          <template #btn>
            <m-btn-outlined class="border-grey flex items-center w-full gap-2">
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
                :selectedItems="selectedAgents"
                @onSelectItems="selectedAgents = $event"
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
                :selectedItems="selectedTerritories"
                @onSelectItems="selectedTerritories = $event"
                @onLoadElse="onLoadElseTerritories"
              />
            </flex-col>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'category'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                :data="categories"
                :selectedItems="selectedCategories"
                @onSelectItems="selectedCategories = $event"
                @onLoadElse="onLoadElseCategory"
              />
            </flex-col>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'day'"
            >
              <FilterItems
                :data="days"
                :selectedItems="selectedDays"
                @onSelectItems="selectedDays = $event"
              />
            </flex-col>
          </template>
        </menu-btn>
      </flex-col>
    </flex-row>
  </rounded-white-container>
</template>

<script setup>
// Stores
const createOrdersStore = useCreateOrdersStore("main");

// states

const agents = ref(null);
const territories = ref(null);
const categories = ref(null);
const days = ref({
  items: [
    { name: "Monday", id: "Monday" },
    { name: "Tuesday", id: "Tuesday" },
    { name: "Wednesday", id: "Wednesday" },
    { name: "Thursday", id: "Thursday" },
    { name: "Friday", id: "Friday" },
    { name: "Saturday", id: "Saturday" },
    { name: "Sunday", id: "Sunday" },
  ],
});

const selectedAgents = ref([]);
const selectedTerritories = ref([]);
const selectedCategories = ref([]);
const selectedDays = ref([]);

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
      value: ["true"],
    },
  ],
});

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
      value: ["true"],
    },
  ],
});

const categoriesParams = ref({
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
      value: ["true"],
    },
  ],
});

// methods
const getAgents = async () => {
  agents.value = await createOrdersStore.getAgents(agentsParams.value);
};

const getTerritories = async () => {
  territories.value = await createOrdersStore.getTerritories(
    territoriesParams.value
  );
};

const getCategories = async () => {
  categories.value = await createOrdersStore.getClientCategories(
    categoriesParams.value
  );
};

const onOpenDropdown = async (value, state) => {
  if (state === "agent" && !agents.value) {
    await getAgents();
    return;
  }
  if (state === "territory" && !territories.value) {
    await getTerritories();
    return;
  }
  if (state === "category" && !categories.value) {
    await getCategories();
    return;
  }
  return;
};

const onLoadElseAgents = async () => {
  agentsParams.value.page_size += 10;
  await getAgents();
};

const onLoadElseTerritories = async () => {
  territoriesParams.value.page_size += 10;
  await getTerritories();
};

const onLoadElseCategory = async () => {
  categoriesParams.value.page_size += 10;
  await getCategories();
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
  if (state === "category") {
    categoriesParams.value.search = value;
    await getCategories();
    return;
  }
  return;
};

const onApplyFilter = () => {
  createOrdersStore.params.agent = selectedAgents.value;
  createOrdersStore.params.territory = selectedTerritories.value;
  createOrdersStore.params.category = selectedCategories.value;
  createOrdersStore.params.day = selectedDays.value;
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
</style>
