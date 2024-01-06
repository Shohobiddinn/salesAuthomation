<template>
  <rounded-white-container class="gap-4">
    <flex-row class="items-center justify-between gap-4">
      <div>
        <span class="text-gray-3 text-[20px] fw-6"> Фильтр </span>
      </div>
      <div class="flex gap-4">
        <DatePicker />
      </div>
    </flex-row>
    <flex-row class="gap-4 mt-4" v-for="row in filterStates" :key="row">
      <flex-col class="w-1/3 grow" v-for="cols in row" :key="cols.key">
        <i-title v-if="cols.key !== 'btn'">
          {{ cols.name }}
        </i-title>
        <flex-row class="h-full items-end gap-2" v-if="cols.key === 'btn'">
          <m-btn class="w-full"> Применить </m-btn>
          <sm-btn class="px-4 py-3">
            <IconReloadSVG />
          </sm-btn>
        </flex-row>
        <menu-btn class="w-full" v-if="cols.key !== 'btn'">
          <template #btn>
            <m-btn-outlined
              class="border-grey grow flex items-center w-full gap-2"
            >
              <fa-icon hash="&#xf078" />
              Выбрать
            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col class="gap-2">
              <search-input />
              <ReportCustomerFilterItems :data="filterStateItems[cols.key]" />
            </flex-col>
          </template>
        </menu-btn>
      </flex-col>
    </flex-row>
  </rounded-white-container>
</template>

<script setup>
// Filter States
const filterStates = ref({
  firstRow: [
    {
      name: "Агент",
      key: "agents",
    },
    {
      name: "Сегменты клиентов",
      key: "customerSegments",
    },
    {
      name: "Территория",
      key: "territories",
    },
  ],
  secondRow: [
    {
      name: "Тип цены",
      key: "priceType",
    },
    {
      name: "Продукт",
      key: "product",
    },
    {
      key: "btn",
    },
  ],
});

//Filter State Items
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
  territories: [
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
  customerSegments: [
    {
      name: "Сегменты клиентов 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Сегменты клиентов 2",
      id: "id2",
      selected: false,
    },
    {
      name: "Сегменты клиентов 3",
      id: "id3",
      selected: false,
    },
    {
      name: "Сегменты клиентов 4",
      id: "id4",
      selected: false,
    },
  ],
  priceType: [
    {
      name: "Тип цены 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Тип цены 2",
      id: "id2",
      selected: false,
    },
    {
      name: "Тип цены 3",
      id: "id3",
      selected: false,
    },
    {
      name: "Тип цены 4",
      id: "id4",
      selected: false,
    },
  ],
  product: [
    {
      name: "Продукт 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Продукт 2",
      id: "id2",
      selected: false,
    },
    {
      name: "Продукт 3",
      id: "id3",
      selected: false,
    },
    {
      name: "Продукт 4",
      id: "id4",
      selected: false,
    },
  ],
});
// Methods
</script>

