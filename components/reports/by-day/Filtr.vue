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
            </div>
    </div>
    <div class="gap-4 grid grid-cols-4"
              v-for="(s,index) in filterStates" :key="index">
      <div v-for="cols in s" :key="cols.key">
            <i-title v-if="cols.key !== 'btn'">
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
       <flex-row class="h-full items-end gap-2" >
          <m-btn class="w-full">
            Применить
          </m-btn>
          <sm-btn class="px-4 py-3">
            <IconReloadSVG/>
          </sm-btn>
        </flex-row>
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
      name: "Статус",
      key: "agents"
    },
    {
      name: "Категория товара",
      key: "territories"
    },
    {
      name: "Товар",
      key: "territories"
    },
  ],
});
// Methods

</script>

<style scoped>

</style>
