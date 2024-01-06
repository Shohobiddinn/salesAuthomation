<template>
  <rounded-white-container class="gap-4">
    <flex-row class="items-center justify-between gap-4">
      <div>
        <span class="text-gray-3 text-[20px] fw-6"> Фильтр </span>
      </div>
      <div>
        <DatePicker />
      </div>
    </flex-row>
    <flex-row class="gap-4 mt-4 justify-end" v-for="raw in filterStates" :key="raw">
      <flex-col class="w-1/3" v-for="cols in raw" :key="cols.key">
        <i-title v-if="cols.key !== 'btn'">
          {{ cols.name }}
        </i-title>
        <flex-row class="h-full items-end gap-2" v-if="cols.key === 'btn'">
          <m-btn class="w-full"> Применить </m-btn>
          <sm-btn class="px-4 py-3">
            <IconReloadSVG />
          </sm-btn>
        </flex-row>
        <menu-btn
          class="w-full"
          v-if="cols.key !== 'btn'"
        >
          <template #btn>
            <m-btn-outlined class="border-grey flex items-center w-full gap-2">
              <fa-icon hash="&#xf078" />
              Выбрать
            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col class="gap-2">
              <search-input />
              <DashboardKassaIncomeFilterItems :data="filterStateItems[cols.key]" />
            </flex-col>
          </template>
        </menu-btn>
      </flex-col>
    </flex-row>
  </rounded-white-container>
</template>

<script setup>
// States
const filterStates = ref({
  firstRow: [
    {
      name: "Агент",
      key: "agents",
    },
    {
      name: "Экспедитор",
      key: "expeditor",
    },
    {
      name: "Территория",
      key: "territory",
    },
  ],
  secondRow: [
    {
      name: "Касса",
      key: "cashRegister",
    },
    {
      name: "Категория клиента",
      key: "clientCategory",
    },
    {
      key: "btn",
    },
  ],
});

// region Filter States
const filterStateItems = ref({
  agents: [
    {
      name: "Агент 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Агент 2",
      id: "id2",
      selected: true,
    },
    {
      name: "Агент 3",
      id: "id3",
      selected: true,
    },
    {
      name: "Агент 4",
      id: "id4",
      selected: true,
    },
  ],
  expeditor: [
    {
      name: "Экспедитор 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Экспедитор 2",
      id: "id2",
      selected: false,
    },
    {
      name: "Экспедитор 3",
      id: "id3",
      selected: false,
    },
    {
      name: "Экспедитор 4",
      id: "id4",
      selected: false,
    },
  ],
  territory: [
    {
      name: "Территория 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Территория 2",
      id: "id2",
      selected: false,
    },
    {
      name: "Территория 3",
      id: "id3",
      selected: false,
    },
    {
      name: "Территория 4",
      id: "id4",
      selected: false,
    },
  ],
  cashRegister: [
    {
      name: "Касса 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Касса 2",
      id: "id2",
      selected: false,
    },
    {
      name: "Касса 3",
      id: "id3",
      selected: false,
    },
    {
      name: "Касса 4",
      id: "id4",
      selected: false,
    },
  ],
  clientCategory: [
    {
      name: "Категория клиента 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Категория клиента 2",
      id: "id2",
      selected: false,
    },
    {
      name: "Категория клиента 3",
      id: "id2",
      selected: false,
    },
    {
      name: "Категория клиента 4",
      id: "id3",
      selected: true,
    },
  ],
});
// Methods
</script>
