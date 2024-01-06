<template>
  <div class="flex flex-col gap-7.5 py-9 px-5">
    <div class="flex justify-between items-center">
      <p-title>По тарам</p-title>
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
    <ReportsTaraFilterCard />
    <ReportsTaraDataTable
      :headers="generealHeaders"
      :loadedData="generalLoadedData"
      class="mt-2.5"
    />
    <flex-col class="pt-2.5 gap-6">
      <p-title>Тара</p-title>
      <ReportsTaraDataTable
        :headers="taraHeaders"
        :loadedData="taraLoadedData"
        class="mt-2.5"
      />
    </flex-col>
  </div>
</template>

<script setup lang="ts">
const generealHeaders = ref([
  {
    name: "ID клиента",
    checked: true,
    key: "clientId",
    type: "clientId",
    thWidth: "120px",
  },
  {
    name: "Клиент",
    checked: true,
    key: "client",
    type: "client",
    thWidth: "120px",
  },
  {
    name: "Территория",
    checked: true,
    key: "territory",
    type: "territory",
    thWidth: "120px",
  },
  {
    name: "Тара",
    checked: true,
    key: "tara",
    type: "tara",
    thWidth: "120px",
  },
  {
    name: "Кол-во",
    checked: true,
    key: "amount",
    type: "amount",
    thWidth: "120px",
  },
  {
    name: "Номер телефона",
    checked: true,
    key: "phoneNumber",
    type: "phoneNumber",
    thWidth: "140px",
  },
  {
    name: "ИНН",
    checked: true,
    key: "inn",
    type: "inn",
    thWidth: "140px",
  },
]);

const generalLoadedData = ref([
  {
    clientId: "ID1326",
    client: "ТП Андрей",
    territory: "Алмазар",
    tara: "Тара",
    amount: "3",
    phoneNumber: "+998 97 628 28 82",
    inn: "216546216589",
  },
  {
    clientId: "ID1326",
    client: "ТП Андрей",
    territory: "Алмазар",
    tara: "Тара",
    amount: "3",
    phoneNumber: "+998 97 628 28 82",
    inn: "216546216589",
  },
  {
    clientId: "ID1326",
    client: "ТП Андрей",
    territory: "Алмазар",
    tara: "Тара",
    amount: "3",
    phoneNumber: "+998 97 628 28 82",
    inn: "216546216589",
  },
  {
    clientId: "ID1326",
    client: "ТП Андрей",
    territory: "Алмазар",
    tara: "Тара",
    amount: "3",
    phoneNumber: "+998 97 628 28 82",
    inn: "216546216589",
  },
  {
    clientId: "ID1326",
    client: "ТП Андрей",
    territory: "Алмазар",
    tara: "Тара",
    amount: "3",
    phoneNumber: "+998 97 628 28 82",
    inn: "216546216589",
  },
  {
    clientId: "ID1326",
    client: "ТП Андрей",
    territory: "Алмазар",
    tara: "Тара",
    amount: "3",
    phoneNumber: "+998 97 628 28 82",
    inn: "216546216589",
  },
  {
    clientId: "ID1326",
    client: "ТП Андрей",
    territory: "Алмазар",
    tara: "Тара",
    amount: "3",
    phoneNumber: "+998 97 628 28 82",
    inn: "216546216589",
  },
  {
    clientId: "ID1326",
    client: "ТП Андрей",
    territory: "Алмазар",
    tara: "Тара",
    amount: "3",
    phoneNumber: "+998 97 628 28 82",
    inn: "216546216589",
  },
  {
    clientId: "ID1326",
    client: "ТП Андрей",
    territory: "Алмазар",
    tara: "Тара",
    amount: "3",
    phoneNumber: "+998 97 628 28 82",
    inn: "216546216589",
  },
]);

const taraHeaders = ref([
  {
    name: "Тара",
    checked: true,
    key: "tara",
    type: "tara",
    thWidth: "120px",
  },
  {
    name: "Отгруз",
    checked: true,
    key: "shipment",
    type: "shipment",
    thWidth: "120px",
  },
  {
    name: "Итого",
    checked: true,
    key: "total",
    type: "total",
    thWidth: "140px",
  },
]);

const taraLoadedData = ref([
  {
    tara: "Тара",
    shipment: "100",
    total: "1000",
  },
  {
    tara: "Тара",
    shipment: "100",
    total: "1000",
  },
  {
    tara: "Тара",
    shipment: "100",
    total: "1000",
  },
  {
    tara: "Тара",
    shipment: "100",
    total: "1000",
  },
  {
    tara: "Тара",
    shipment: "100",
    total: "1000",
  },
  {
    tara: "Тара",
    shipment: "100",
    total: "1000",
  },
  {
    tara: "Тара",
    shipment: "100",
    total: "1000",
  },
  {
    tara: "Тара",
    shipment: "100",
    total: "1000",
  },
  {
    tara: "Тара",
    shipment: "100",
    total: "1000",
  },
]);
</script>

<style>
</style>