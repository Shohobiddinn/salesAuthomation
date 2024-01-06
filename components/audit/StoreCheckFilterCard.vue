<template>
    <rounded-white-container class="gap-4">
      <flex-row class="items-center justify-between gap-4">
        <div>
          <span class="text-gray-3 text-[20px] fw-6">
            Фильтр
          </span>
        </div>
        <div>
          <DatePicker />
        </div>
      </flex-row>
      <flex-row class="gap-4 mt-4"
                v-for="s in filterStates">
        <flex-col class="w-full"
                  v-for="cols in s"
                  :key="cols.key">
          <i-title v-if="cols.key !== 'btn'">
            {{ cols.name }}
          </i-title>
          <div>
            <flex-row class="h-full gap-2 flex justify-end" v-if="cols.key === 'btn'">
            <m-btn class="w-[223px]">
              Применить
            </m-btn>
            <sm-btn class="px-4 py-3">
              <IconReloadSVG/>
            </sm-btn>
          </flex-row>
       
          <flex-row class=" gap-2 items-center flex justify-end -mr-[250px]" v-if="cols.key === 'check'">
      <label>
        <input type='checkbox'>
        <span></span>
      </label>
      <span class="whitespace-nowrap fs-16 fw-4">
        Итог по категориям
      </span>
    </flex-row>
          </div>
  
          <menu-btn class="w-full"
                    v-if="cols.key !== 'btn' && cols.key !== 'range' && cols.key !== 'check'">
            <template #btn>
              <m-btn-outlined
                class="border-grey flex items-center w-full gap-2">
                <fa-icon hash="&#xf078" />
                Выбрать
              </m-btn-outlined>
            </template>
            <template #content>
              <flex-col class="gap-2">
                <search-input />
                <ReportCustomerFilterItems
                  :data="customerStore[cols.key]" />
              </flex-col>
            </template>
          </menu-btn>
        </flex-col>
      </flex-row>
    </rounded-white-container>
  </template>
  
  <script setup>
  // Store
  const customerStore = useReportCustomerStore("main");
  
  // State
  const filterStates = ref({
    secondRow: [
      {
        name: "Аудит",
        key: "productGroups"
      },
      {
        name: "Мерчант",
        key: "agents"
      },
      {
        name: "Статус",
        key: "weekDays"
      },
      {
        name: "Категория",
        key: "customerTypes"
      },
    ],
    thirdRow: [
      {
        key: "check"
      },
      {
        key: "btn"
      },
    ]
  });
  // Methods
  
  </script>
  