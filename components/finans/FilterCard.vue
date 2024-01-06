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
      <flex-col class="w-1/4" v-for="cols in raw" :key="cols.key">
        <i-title v-if="cols.key !== 'btn'">
          {{ cols.name }}
        </i-title>
        <flex-row class="h-full items-end gap-2" v-if="cols.key === 'btn'">
          <m-btn class="w-full"> Применить </m-btn>
          <sm-btn class="px-4 py-3">
            <IconReloadSVG />
          </sm-btn>
        </flex-row>
        <flex-row class="gap-4 mb-2 items-center" v-if="cols.key === 'range'">
          <div class="flex gap-2 border-b-1 items-center">
            <span class="fs-14 text-gray-400"> От </span>
            <input type="text" class="w-11/12" v-model="priceRange[0]" />
          </div>
          <div class="flex gap-2 border-b-1 items-center">
            <span class="text-gray-400"> до </span>
            <input type="number" class="w-11/12" v-model="priceRange[1]" />
          </div>
        </flex-row>
        <div class="w-full h-full" v-if="cols.key === 'range'">
          <Slider
            v-model="priceRange"
            :step="priceStep"
            :min="price.min"
            :max="price.max"
            class="slider-blue z-0"
            :tooltips="false"
          />
        </div>
        <menu-btn
          class="w-full"
          v-if="cols.key !== 'btn' && cols.key !== 'range'"
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
              <FinansFilterItems :data="filterStateItems[cols.key]" />
            </flex-col>
          </template>
        </menu-btn>
      </flex-col>
    </flex-row>
  </rounded-white-container>
</template>

<script setup>
import Slider from "@vueform/slider";

// States
const priceRange = ref([300, 600]);
const priceStep = ref(10);
const price = ref({ min: 10, max: 1000 });
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
      name: "Тип оплаты",
      key: "paymentType",
    },
    {
      name: "Касса",
      key: "cashRegister",
    },
  ],
  secondRow: [
    {
      name: "Территория",
      key: "territory",
    },
    {
      name: "Тип",
      key: "types",
    },
    {
      name: "Даты",
      key: "dates",
    },
    {
      name: "Сумма от-до",
      key: "range",
    },
  ],
  thirdRow: [
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
  paymentType: [
    {
      name: "Тип оплаты 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Тип оплаты 2",
      id: "id2",
      selected: false,
    },
    {
      name: "Тип оплаты 3",
      id: "id3",
      selected: false,
    },
    {
      name: "Тип оплаты 4",
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
  types: [
    {
      name: "Тип 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Тип 2",
      id: "id2",
      selected: false,
    },
    {
      name: "Тип 3",
      id: "id2",
      selected: false,
    },
    {
      name: "Тип 4",
      id: "id3",
      selected: true,
    },
  ],
  dates: [
    {
      name: "Даты 1",
      selected: false,
    },
    {
      name: "Даты 2",
      selected: false,
    },
    {
      name: "Даты 3",
      selected: false,
    },
    {
      name: "Даты 4",
      selected: false,
    },
  ],
});
// Methods
</script>

<style scoped>
.slider-base,
.slider-connects {
  z-index: 0 !important;
}
</style>
<style src="@vueform/slider/themes/default.css"></style>