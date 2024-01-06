<template>
<div class="rounded-large border p-4">
          <div class="flex justify-between w-full mb-6">
            <page-title-20 :title="'Фильтр'" />
            <div class="flex gap-4">
              <div
                class="rounded-large justify-center items-center flex gap-2 bg-blue-50 px-8"
              >
                <radio-btn>Дата заявки</radio-btn>
                <radio-btn>Дата отгрузки</radio-btn>
              </div>
              <DatePicker />
            </div>
          </div>
           <div class="gap-4 grid grid-cols-4"
              v-for="(s,index) in filterStates" :key="index">
      <div
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
        <flex-row >
        <div v-if="cols.key === 'date'" >
          <DatePicker />
        </div>
        </flex-row>
       
        <menu-btn class="w-full"
                  v-if="cols.key !== 'btn' && cols.key !== 'range' && cols.key !== 'radio' && cols.key !== 'key'&& cols.key !== 'date'">
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
      </div>
    </div>
        </div>
   
</template>

<script setup>
// Store
const customerStore = useReportCustomerStore("main");

// State
const filterStates = ref({
  firstRow: [
    {
      name: "Агент",
      key: "agents"
    },
    {
      name: "Территория",
      key: "territories"
    },
    {
      name: "Сегменты клиентов",
      key: "territories"
    },
    {
      name: "Тип оплаты",
      key: "territories"
    },
     {
      name: "Категория продукты",
      key: "territories"
    },
     {
      name: "Продукты",
      key: "territories"
    },
    {
      name: "Статус заказа",
      key: "territories"
    },
    {
      key: "btn"
    },

  ],
});
// Methods

</script>

<style scoped>

</style>
