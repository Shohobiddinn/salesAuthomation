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
        <flex-col class="w-1/4"
                  v-for="cols in s"
                  :key="cols.key">
          <i-title v-if="cols.key !== 'btn'">
            {{ cols.name }}
          </i-title>
          <flex-row class="h-full items-end gap-2" v-if="cols.key === 'btn'">
            <m-btn class="w-full">
              Применить
            </m-btn>
            <sm-btn class="px-4 py-3">
              <IconReloadSVG/>
            </sm-btn>
          </flex-row>
  
          <menu-btn class="w-full"
                    v-if="cols.key !== 'btn' && cols.key !== 'range'">
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
                <AuditPhotoReportFilterItems 
                  :data="customerStore[cols.key]" />
              </flex-col>
            </template>
          </menu-btn>
        </flex-col>
      </flex-row>
    </rounded-white-container>
  </template>
  
  <script setup>
  import Slider from "@vueform/slider";
  // Store
  const customerStore = useReportCustomerStore("main");
  
  // State
  const filterStates = ref({
    thirdRow: [
      {
        name: "Город",
        key: "regions"
      },
      {
        name: "Активный",
        key: "regions"
      },
      {
        name: "Тип оплаты",
        key: "paymentMethod"
      },
      {
        name: "Тип оплаты",
        key: "btn"
      },
    ]
  });
  
  </script>
  