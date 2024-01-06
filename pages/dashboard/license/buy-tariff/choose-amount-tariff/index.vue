<template>
  <flex-col class="gap-6 py-7.5 px-5">
    <back-btn @click="$router.go(-1)" class="w-1/8 mt-1.5"></back-btn>
    <p-title class="mt-1.5">Выберите количество</p-title>
    <div class="overflow-auto bg-white rounded-lg">
      <data-table
        :headers="headers"
        @sort="sortData"
        :sorted="sortedData"
        :withInformationAboveHeader="true"
      >
        <template #body>
          <template v-for="data in loadedData" :key="data">
            <c-tr>
              <c-td-no-edit v-for="key in headers" :key="key">
                <div v-if="key.key === 'amount'" class="py-3 5">
                  <input
                    type="number"
                    class="my-input outline-none rounded-lg border-1 w-1/4 px-3.5 py-2 bg-lotion"
                    v-model="data[key.key]"
                  />
                </div>
                <div v-else class="py-3.5">
                  {{ data[key.key] }}
                </div>
              </c-td-no-edit>
            </c-tr>
          </template>
        </template>
      </data-table>
    </div>
    <div class="flex w-full justify-end">
      <flex-col class="gap-2 w-1/5">
        <div class="text-xs text-gray-3">Сумма: 0 / месяц</div>
        <div class="text-xs text-gray-3">0 x 3 месяц = 0 сум</div>
        <div class="text-base font-semibold">
          <span class="text-black">К оплате:</span>
          <span class="text-[#299B9B]">1 813 315 000 сум</span>
        </div>
        <m-btn class="mt-1 w-full h-9.5">Перейти к оплате</m-btn>
      </flex-col>
    </div>
  </flex-col>
</template>

<script setup lang="ts">
const headers = ref([
  {
    name: "№",
    checked: true,
    key: "number",
    type: "come",
    thWidth: "40px",
  },
  {
    name: "Название пакета	",
    checked: true,
    key: "nameOfPackage",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "Цена",
    checked: true,
    key: "price",
    type: "price",
    thWidth: "120px",
  },
  {
    name: "Количество",
    checked: true,
    key: "amount",
    type: "amount",
    thWidth: "120px",
  },
  {
    name: "Общая сумма ",
    checked: true,
    key: "totalSum",
    type: "totalSum",
    thWidth: "120px",
  },
]);

const loadedData = ref([
  {
    number: "1",
    nameOfPackage: "Админ",
    price: "100 000 000 сум",
    amount: 0,
    totalSum: "100 000 000 сум",
  },
  {
    number: "1",
    nameOfPackage: "Админ",
    price: "100 000 000 сум",
    amount: 0,
    totalSum: "100 000 000 сум",
  },
  {
    number: "1",
    nameOfPackage: "Админ",
    price: "100 000 000 сум",
    amount: 0,
    totalSum: "100 000 000 сум",
  },
  {
    number: "1",
    nameOfPackage: "Админ",
    price: "100 000 000 сум",
    amount: 0,
    totalSum: "100 000 000 сум",
  },
  {
    number: "1",
    nameOfPackage: "Админ",
    price: "100 000 000 сум",
    amount: 0,
    totalSum: "100 000 000 сум",
  },
  {
    number: "1",
    nameOfPackage: "Админ",
    price: "100 000 000 сум",
    amount: 0,
    totalSum: "100 000 000 сум",
  },
  {
    number: "1",
    nameOfPackage: "Админ",
    price: "100 000 000 сум",
    amount: 0,
    totalSum: "100 000 000 сум",
  },
  {
    number: "1",
    nameOfPackage: "Админ",
    price: "100 000 000 сум",
    amount: 0,
    totalSum: "100 000 000 сум",
  },
  {
    number: "1",
    nameOfPackage: "Админ",
    price: "100 000 000 сум",
    amount: 0,
    totalSum: "100 000 000 сум",
  },
]);

let sortedData = ref({ key: "", mode: "" });

function sortData(data: any) {
  sortedData.value = data;
}
</script>

<style>
</style>