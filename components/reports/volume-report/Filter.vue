<template>
  <div class="rounded-large border p-4 bg-white">
    <div class="flex justify-between w-full mb-6">
      <page-title-20 :title="'Фильтр'" />
    </div>
    <div class="gap-4 grid grid-cols-3"
         v-for="(s,index) in filterStates" :key="index">
      <div v-for="cols in s" :key="cols.key">
        <i-title v-if="cols.key !== 'btn' && cols.key !== 'tor'">
          {{ cols.name }}
        </i-title>
        <div v-if="cols.key === 'tor'" class="mt-2">
          <div class="fs-12">Даты</div>
          <div class="border rounded-lg h-42px mt-2 grid grid-cols-2">
            <div class="date-picker">
              <input class="my-input  fa-solid mainLoginInput p-[6px] rounded-lg"
                     type="date"
                     placeholder="Выбрать">
            </div>
            <div class="date-picker">
              <input class="my-input  fa-solid mainLoginInput p-[6px] rounded-lg"
                     type="date"
                     placeholder="Выбрать">
            </div>
          </div>
        </div>
        <flex-row v-if="cols.key === 'btn'" class="h-10 flex w-full justify-end gap-2 mt-9">
          <m-btn class="w-full h-9">
            Применить
          </m-btn>
          <sm-btn class="px-2 py-2">
            <IconReloadSVG/>
          </sm-btn>
        </flex-row>
        <menu-btn class="w-full" v-if="cols.key !== 'btn' && cols.key !== 'tor'">
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
      name: "Категория продуктов",
      key: "categoryProduct"
    },
    {
      name: "Статус",
      key: "status"
    },
    {
      name: "Тип цены",
      key: "priceType"
    },
    {
      name: "Супервайзер",
      key: "superviser"
    },
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
      key: "segment"
    },
    {
      name: "Тип оплаты",
      key: "paymentType"
    },
    {
      name: "Группа товаров",
      key: "productGroup"
    },
    {
      name: "Склад",
      key: "warehouses"
    },
    {
      name: "Склад",
      key: "warehouses"
    },
    {
      name: "День",
      key: "btn"
    }
  ],
});
// Methods

</script>

<style scoped>

</style>
