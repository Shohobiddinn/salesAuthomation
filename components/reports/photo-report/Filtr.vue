<template>
<div class="rounded-large border p-4 bg-white">
    <div class="flex justify-between w-full mb-6">
            <page-title-20 :title="'Фильтр'" />
            <div class="flex gap-4">
              <div
                class="rounded-large justify-center items-center flex gap-2 bg-[#F4F9F9] px-8"
              >
                <radio-btn>Дата заявки</radio-btn>
                <radio-btn>Дата отгрузки</radio-btn>
              </div>
              <DatePicker />
            </div>
    </div>
    <div class="gap-4 grid grid-cols-4"
              v-for="(s,index) in filterStates" :key="index">
      <div v-for="cols in s" :key="cols.key">
            <i-title>
            {{ cols.name }}
            </i-title>
            <menu-btn class="w-full">
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
<flex-row class="h-full flex justify-end gap-2 mt-4">
      <m-btn class="w-[20%]">
        Применить
      </m-btn>
      <sm-btn class="px-4 py-3">
        <IconReloadSVG/>
      </sm-btn>
    </flex-row>
</div> 
</template>

<script setup>
// Store
const customerStore = useReportCustomerStore("main");

// State
const filterStates = ref({
  firstRow: [
    {
      name: "Пользователь",
      key: "agents"
    },
    {
      name: "Пользователи",
      key: "territories"
    },
    {
      name: "Категория",
      key: "territories"
    },
    {
      name: "Категория клиентов",
      key: "territories"
    },
     {
      name: "Территория",
      key: "territories"
    },
     {
      name: "Статус",
      key: "territories"
    },  {
      name: "Клиенты",
      key: "territories"
    },  {
      name: "Рейтинг",
      key: "territories"
    },  {
      name: "Канал сбыта",
      key: "territories"
    },
   
  ],
});
// Methods

</script>

<style scoped>

</style>
