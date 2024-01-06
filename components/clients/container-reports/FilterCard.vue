<template>
  <rounded-white-container class="gap-4">
    <flex-row class="items-center justify-between gap-4">
      <div>
        <span class="text-gray-3 text-[20px] fw-6">
          Фильтр
        </span>
      </div>
<!--      <div class="flex gap-4">-->
<!--        <div class="flex flex-row items-center gap-2">-->
<!--              <span class="text-gray-3 fs-14 fw-4">-->
<!--                Статус-->
<!--              </span>-->
<!--          <label class="switch">-->
<!--            <input v-model="filters.is_active" type="checkbox">-->
<!--            <span class="slider round"></span>-->
<!--          </label>-->
<!--        </div>-->
<!--        <DatePicker/>-->
<!--      </div>-->
    </flex-row>
    <flex-row class="gap-4"
              v-for="s in filterStates">
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
                  :selectedItems="filters.agent"
                  @onSelectItems="selectAgents"
                  @onLoadElse="onLoadElseUsers"
              />
            </flex-col>
            <flex-col
                class="gap-2 max-h-88 overflow-auto pr-2"
                v-if="cols.key === 'territory'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                  :data="territories"
                  :selectedItems="filters.territory"
                  @onSelectItems="selectTerritories"
                  @onLoadElse="onLoadElseTerritories"
              />
            </flex-col>
            <flex-col
                class="gap-2 max-h-88 overflow-auto pr-2"
                v-if="cols.key === 'tara'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                  :data="taras"
                  :selectedItems="filters.tara"
                  @onSelectItems="selectTaras"
                  @onLoadElse="onLoadElseTaras"
              />
            </flex-col>
          </template>
        </menu-btn>
      </flex-col>
    </flex-row>
    <flex-row class="h-full justify-end items-end gap-2">
    <m-btn @click="$emit('filterClicked')" class="w-[22%] mt-5">
      Применить
    </m-btn>
    <sm-btn class="px-4 py-3">
      <IconReloadSVG/>
    </sm-btn>
  </flex-row>
  </rounded-white-container>
</template>

<script setup>

const props = defineProps({
  filters:Object
})
const clientsTara = useClientsTaraStore('')



const agents = ref(null);
const territories = ref(null)
const taras = ref(null)

function selectAgents(param){
  props.filters.agent = param
}
function selectTerritories(param){
  props.filters.territory = param
}
function selectTaras(param){
  props.filters.tara = param
}
const onLoadElseUsers = async () => {
  usersParams.value.page_size += 10;
  await getUsers();
};
const onLoadElseTerritories = async () => {
  territoriesParams.value.page_size += 10;
  await getTerritories();
};
const onLoadElseTaras = async () => {
  territoriesParams.value.page_size += 10;
  await getTaras();
};
const usersParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "id",
    is_asc: true,
  },
});
const territoriesParams = ref({
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
const getUsers = async () => {
  const data = await clientsTara.getAgent(usersParams.value);
  agents.value = data
  agents.value = JSON.parse(JSON.stringify(data))
};
const getTerritories = async () => {
  const data = await clientsTara.getTerritories(territoriesParams.value);
  territories.value = data
  territories.value = JSON.parse(JSON.stringify(data))
};
const getTaras = async () => {
  const data = await clientsTara.getTara(territoriesParams.value);
  taras.value = data
  taras.value = JSON.parse(JSON.stringify(data))
};
const onOpenDropdown = async (value, state) => {
  if ((state === "agent") && !agents.value) {
    await getUsers();
    return;
  }
  if (state === "territory" && !territories.value) {
    await getTerritories();
    return;
  }
  if (state === "tara" && !taras.value) {
    await getTaras();
    return;
  }
  return;
};
const search = async (value, state) => {
  if (state === "agent") {
    usersParams.value.search = value;
    await getUsers();
    return;
  }
  if (state === "territory") {
    territoriesParams.value.search = value;
    await getTerritories();
    return;
  }
  if (state === "tara") {
    territoriesParams.value.search = value;
    await getTaras();
    return;
  }
  return;
};
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
      name: "Тара",
      key: "tara"
    }
  ]
});
const filterData = ref({
  agent:[],
  clientsCategory:[],
  territory:[],
})

</script>

<style scoped>

</style>
