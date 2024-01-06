<!-- <template>
  <div class="grid grid-cols-3 gap-4 mt-4">
            <multiply-selection :filter.sync="filter.isSelectWarehouse" @toggle="toggle => filter.isSelectWarehouse = toggle" :name="'Агент'"/>
            <multiply-selection :filter.sync="filter.isSelectAgent" @toggle="toggle => filter.isSelectAgent = toggle" :name="'Город'"/>
            <multiply-selection :filter.sync="filter.isSelectProduct" @toggle="toggle => filter.isSelectProduct = toggle" :name="'Категория клиентов'"/>
            <multiply-selection :filter.sync="filter.isSelectType" @toggle="toggle => filter.isSelectType = toggle" :name="'Тип оплаты'"/>
            <multiply-selection :filter.sync="filter.isSelectWarehouse" @toggle="toggle => filter.isSelectWarehouse = toggle" :name="'День'"/>
            <multiply-selection :filter.sync="filter.isSelectAgent" @toggle="toggle => filter.isSelectAgent = toggle" :name="'Экспедитор'"/>
            <div>
              <div class="fs-12">Сумма от-до</div>
              <div class="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <div class="text-[#8FA0A0] fs-14">От</div>
                  <div class="border"></div>
                </div>
                <div>
                  <div class="text-[#8FA0A0] fs-14">до</div>
                  <div class="border"></div>
                </div>
              </div>
            </div>
            <multiply-selection :filter.sync="filter.isSelectProduct" @toggle="toggle => filter.isSelectProduct = toggle" :name="'Статус'"/>
            <div class="flex justify-end w-full h-40px mt-[34px]">
              <button class="w-[92%] py-2 rounded-lg bg-[#299B9B] text-white">Применить</button>
              <boutton class="mt-3 ml-3"><IconRe/></boutton>
            </div>
          </div> -->
          


<template>
    <rounded-white-container class="gap-4">
      <flex-row class="items-center justify-between gap-4">
          <div class="text-gray-3 text-[20px] fw-6">
            Фильтр
          </div>
         <div class="flex items-center gap-4">
          <div class="fw-4 fs-16 text-gray-3">Действителен с</div>
          <div>
          <DatePicker />
        </div>
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
          <div class="grid justify-end">
            <flex-row  v-if="cols.key === 'btn'">
            <m-btn class="w-[214px]">
              Применить
            </m-btn>
            <sm-btn class="px-2 py-3">
              <IconReloadSVG/>
            </sm-btn>
          </flex-row>
          </div>
  
          <menu-btn class="w-full"
                    v-if="cols.key !== 'btn' && cols.key !== 'range' && cols.key !== 'radio'">
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
  const date = ref(false);
  const filter = ref({
  isSelectWarehouse: false,
  isSelectAgent: false,
  isSelectProduct: false,
  isSelectType: false,
})
  // State
  const filterStates = ref({
    secondRow: [
      {
        name: "Агент",
        key: "productGroups"
      },
      {
        name: "Территория",
        key: "agents"
      },
      {
        name: "Категория",
        key: "weekDays"
      },
      {
        name: "День",
        key: "customerTypes"
      },
    ],
    thirdRow: [
  
      {
        key: "radio"
      },
      {
        key: "btn"
      },
    ]
  });
  // Methods
  
  </script>
