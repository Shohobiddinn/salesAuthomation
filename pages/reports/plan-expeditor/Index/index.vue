<template>
  <div class="flex flex-col gap-9.5 py-9.5 px-5">
    <div class="flex justify-between items-center">
      <p-title>Визит экспедиторов</p-title>
      <div class="flex gap-4.5">
        <nuxt-link to="/reports/control-expeditor/">
          <m-btn-outlined class="border-color-primary bg-white">
            Контроль эспедитора
          </m-btn-outlined>
        </nuxt-link>
        <nuxt-link to="/reports/return-reception/">
          <m-btn>Прием возврат</m-btn>
        </nuxt-link>
      </div>
    </div>
    <flex-col class="gap-6">
      <div class="flex gap-7.5 items-center">
        <div class="text-black text-base">Выбрать эспедитора</div>
        <multiply-selections
          v-click-outside="clickOutside"
          :filter="filter.isSelectExpeditor"
          @toggle="(toggle) => (filter.isSelectExpeditor = toggle)"
          class="w-1/4"
        />
      </div>
      <ReportsTaraDataTable
        :headers="taraHeaders"
        :loadedData="taraLoadedData"
      />
    </flex-col>
  </div>
</template>

<script setup lang="ts">
const filter = ref({
  isSelectExpeditor: false,
});

const clickOutside = () => {
  filter.value.isSelectExpeditor = false;
};

const taraHeaders = ref([
  {
    name: "Доставщик",
    checked: true,
    key: "deliveryman",
    type: "deliveryman",
    thWidth: "120px",
  },
  {
    name: "Плановый визит",
    checked: true,
    key: "visitPlan",
    type: "visitPlan",
    thWidth: "140px",
  },
  {
    name: "Посещено",
    checked: true,
    key: "visited",
    type: "visited",
    thWidth: "140px",
  },
  {
    name: "Не посещено",
    checked: true,
    key: "notVisited",
    type: "notVisited",
    thWidth: "140px",
  },
  {
    name: "Доставка фактов",
    checked: true,
    key: "deliverFact",
    type: "deliverFact",
    thWidth: "140px",
  },
  {
    name: "Полный возврат",
    checked: true,
    key: "fullReturn",
    type: "fullReturn",
    thWidth: "140px",
  },
  {
    name: "Оплата",
    checked: true,
    key: "payment",
    type: "payment",
    thWidth: "120px",
  },
]);

const taraLoadedData = ref([
  {
    deliveryman: "Abdumalik labo",
    visitPlan: "1523",
    visited: "1523",
    notVisited: "1523",
    deliverFact: "1523",
    fullReturn: "1523",
    payment: "1523",
  },
  {
    deliveryman: "Abdumalik labo",
    visitPlan: "1523",
    visited: "1523",
    notVisited: "1523",
    deliverFact: "1523",
    fullReturn: "1523",
    payment: "1523",
  },
  {
    deliveryman: "Abdumalik labo",
    visitPlan: "1523",
    visited: "1523",
    notVisited: "1523",
    deliverFact: "1523",
    fullReturn: "1523",
    payment: "1523",
  },
  {
    deliveryman: "Abdumalik labo",
    visitPlan: "1523",
    visited: "1523",
    notVisited: "1523",
    deliverFact: "1523",
    fullReturn: "1523",
    payment: "1523",
  },
  {
    deliveryman: "Abdumalik labo",
    visitPlan: "1523",
    visited: "1523",
    notVisited: "1523",
    deliverFact: "1523",
    fullReturn: "1523",
    payment: "1523",
  },
  {
    deliveryman: "Abdumalik labo",
    visitPlan: "1523",
    visited: "1523",
    notVisited: "1523",
    deliverFact: "1523",
    fullReturn: "1523",
    payment: "1523",
  },
  {
    deliveryman: "Abdumalik labo",
    visitPlan: "1523",
    visited: "1523",
    notVisited: "1523",
    deliverFact: "1523",
    fullReturn: "1523",
    payment: "1523",
  },
  {
    deliveryman: "Abdumalik labo",
    visitPlan: "1523",
    visited: "1523",
    notVisited: "1523",
    deliverFact: "1523",
    fullReturn: "1523",
    payment: "1523",
  },
  {
    deliveryman: "Abdumalik labo",
    visitPlan: "1523",
    visited: "1523",
    notVisited: "1523",
    deliverFact: "1523",
    fullReturn: "1523",
    payment: "1523",
  },
]);
</script>

<style>
</style>