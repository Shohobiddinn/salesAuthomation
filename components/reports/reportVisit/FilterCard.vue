<template>
  <rounded-white-container class="gap-4">
    <flex-row class="items-center justify-between gap-4">
      <div>
        <span class="text-gray-3 text-[20px] fw-6"> Фильтр </span>
      </div>
    </flex-row>
    <flex-row
      class="justify-end items-center gap-4 mt-4"
      v-for="row in filterStates"
      :key="row"
    >
      <flex-col class="w-1/5" v-for="cols in row" :key="cols.key">
        <i-title v-if="cols.key !== 'btn' && cols.key !== 'checkbox'">
          {{ cols.name }}
        </i-title>

        <menu-btn
          class="w-full"
          v-if="cols.key !== 'btn' && cols.key !== 'checkbox'"
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
        <flex-row v-if="cols.key === 'checkbox'" class="gap-2.5 justify-end">
          <checkbox />
          <label>{{ cols.name }}</label>
        </flex-row>
        <flex-row v-if="cols.key === 'btn'" class="h-full">
          <m-btn class="w-full"> Применить </m-btn>
          <sm-btn class="px-4 py-3">
            <IconReloadSVG />
          </sm-btn>
        </flex-row>
      </flex-col>
    </flex-row>
  </rounded-white-container>
</template>

<script setup>
// States
const filterStates = ref({
  firstRow: [
    {
      name: "Визиты",
      key: "visits",
    },
    {
      name: "Статус",
      key: "status",
    },
    {
      name: "Тип посещение",
      key: "visitType",
    },
    {
      name: "Месяц",
      key: "months",
    },
    {
      name: "Год",
      key: "years",
    },
  ],
  secondRow: [
    {
      name: "Кол-во. визиты",
      key: "checkbox",
    },
    {
      key: "btn",
    },
  ],
});

// Filter State Items
const filterStateItems = ref({
  visits: [
    {
      name: "Визиты 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Визиты 2",
      id: "id2",
      selected: false,
    },
    {
      name: "Визиты 3",
      id: "id3",
      selected: false,
    },
    {
      name: "Визиты 4",
      id: "id4",
      selected: false,
    },
  ],
  status: [
    {
      name: "Статус 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Статус 2",
      id: "id2",
      selected: false,
    },
    {
      name: "Статус 3",
      id: "id3",
      selected: false,
    },
    {
      name: "Статус 4",
      id: "id4",
      selected: false,
    },
  ],
  visitType: [
    {
      name: "Тип посещение 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Тип посещение 2",
      id: "id2",
      selected: false,
    },
    {
      name: "Тип посещение 3",
      id: "id3",
      selected: false,
    },
    {
      name: "Тип посещение 4",
      id: "id4",
      selected: false,
    },
  ],
  months: [
    {
      name: "Январь",
      selected: false,
    },
    {
      name: "Февраль",
      selected: false,
    },
    {
      name: "Март",
      selected: false,
    },
    {
      name: "Апрель",
      selected: false,
    },
    {
      name: "Май",
      selected: false,
    },
    {
      name: "Июнь",
      selected: false,
    },
    {
      name: "Июль",
      selected: false,
    },
    {
      name: "Август",
      selected: false,
    },
    {
      name: "Сентябрь",
      selected: false,
    },
    {
      name: "Октябрь",
      selected: false,
    },
    {
      name: "Ноябрь",
      selected: false,
    },
    {
      name: "Декабрь",
      selected: false,
    },
  ],
  years: [
    {
      name: "2023",
      selected: false,
    },
    {
      name: "2022",
      selected: false,
    },
    {
      name: "2022",
      selected: false,
    },
    {
      name: "2021",
      selected: false,
    },
    {
      name: "2020",
      selected: false,
    },
    {
      name: "2019",
      selected: false,
    },
    {
      name: "2018",
      selected: false,
    },
    {
      name: "2017",
      selected: false,
    },
    {
      name: "2016",
      selected: false,
    },
    {
      name: "2015",
      selected: false,
    },
    {
      name: "2014",
      selected: false,
    },
    {
      name: "2013",
      selected: false,
    },
  ],
});
// Methods
</script>
    