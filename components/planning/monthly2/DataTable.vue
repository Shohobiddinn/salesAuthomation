<template>
    <div class="w-full pb-3 bg-white mb-2 rounded-lg border-grey">
      <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
        <div>
          <i-btn>
            <IconColsSVG />
          </i-btn>
        </div>
        <SettingsRlpDiscountsTableCheckbox
          :headers="headers"
        ></SettingsRlpDiscountsTableCheckbox>
        <div>
          <search-input
            :value="searchText"
            @updated="searchUpdated"
            class="w-full h-38px"
          />
        </div>
        <div>
          <excel-btn :size="'340kb'"></excel-btn>
        </div>

        <PlanningMonthly2Tabs class="absolute right-10" />
      </div>
      <flex-row class="overflow-auto">
        <table class="w-full rounded-t-large overflow-hidden whitespace-nowrap">
          <thead>
            <tr class="bg-lotion">
              <template v-for="header in headers" :key="headers">
                <td class="fw-4 text-gray-3 px-2 py-2.5">
                  <div :style="{ width: header.thWidth }">
                    <flex-row
                      class="justify-start fw-4 fs-14 items-center text-gray-400"
                    >
                      <span>
                        {{ header.name }}
                      </span>
                      <div
                      class="grid pb-1 pl-1"
                    >
                      <fa-icon class="fa-icon cursor-pointer pb-[2px]"
                      :class="!(sortedData.field === header.key &&
                      sortedData.mode) ? '-my-0.8':'-mb-0'"
                      v-if="!(sortedData.field === header.key &&
                      !sortedData.mode)" @click="sortData(header.key,
                      false)"
                      hash="&#xf0d8"/>
                      <fa-icon class="fa-icon cursor-pointer"
                      :class="!(sortedData.field === header.key &&
                      !sortedData.mode) ? '-my-3.5':'mt-0'"
                      v-if="!(sortedData.field === header.key &&
                      sortedData.mode)" @click="sortData(header.key, true)"
                      hash="&#xf0d7"/>
                    </div>
                    </flex-row>
                  </div>
                </td>
              </template>
            </tr>
          </thead>
          <tbody>
            <template v-for="(data, index) in loadedData" :key="data">
              <tr>
                <td v-for="key in headers" :key="key" class="pl-3">
                  <button
                    @click="openProducts(index)"
                    v-if="key.key === 'product' && key.checked"
                    class="flex justify-start fw-4 fs-14 items-center text-gray-400"
                  >
                    <IconArrowBottom />
                    <div class="ml-2 text-gray-700">
                      {{ data[key.key] }}
                    </div>
                  </button>
                  <flex-col v-if="key.key !== 'product'" class="py-2">
                    <flex-row
                      class="justify-start fw-4 fs-14 items-center text-gray-700"
                    >
                      <div>
                        {{ data[key.key] }}
                      </div>
                    </flex-row>
                  </flex-col>
                </td>
              </tr>
              <template
                v-if="showProduct.isActive && showProduct.index === index"
              >
                <tr
                  v-for="(product, chIndex) in data.items"
                  :key="'children' + index + chIndex"
                >
                  <td v-for="key in headers" :key="key" class="px-3">
                    <flex-col class="">
                      <flex-row
                        v-if="key.key === 'product'"
                        class="justify-between pl-4 fs-14 fw-4 text-gray-400"
                      >
                        {{ data[key.key] }}
                      </flex-row>
                      <flex-row
                        v-if="key.key !== 'product'"
                        class="justify-between fs-14 fw-4 text-gray-400"
                      >
                        {{ data[key.key] }}
                      </flex-row>
                    </flex-col>
                  </td>
                </tr>
              </template>
            </template>
            <tr class="border-t-1 bg-input">
              <td class="fs-14 text-gray-3 pl-3 py-2">Все агенты</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">13126</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">13126</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">13126</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">13126</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">13126</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">13126</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">13126</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">13126</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">13126</td>
            </tr>
          </tbody>
        </table>
      </flex-row>
    </div>
  </template>

  <script setup>

  const showProduct = ref({
    isActive: false,
    index: 0,
  });
  function openProducts(index) {
    showProduct.value.isActive = !showProduct.value.isActive;
    showProduct.value.index = index;
  }
  const searchText = ref("");
  let sortedData = ref({ key: "", mode: "" });

// Methods
function searchUpdated(text) {
  console.log(text);
}

function sortData(field, mode) {
  sortedData.value = { field, mode };
}


  let headers = ref([
    {
      name: "Агент",
      checked: true,
      key: "product",
      type: "product",
      thWidth: "120px",
      bRadius: "8px",
    },
    {
      name: "План",
      checked: true,
      key: "remain",
      type: "remain",
      thWidth: "140px",
    },
    {
      name: "Факт",
      checked: true,
      key: "quantity",
      type: "quantity",
      thWidth: "100px",
    },
    {
      name: "%",
      checked: true,
      key: "adjustments",
      type: "adjustments",
      thWidth: "90px",
    },
    {
      name: "Прогноз",
      checked: true,
      key: "returnShelf",
      type: "returnShelf",
      thWidth: "120px",
    },
    {
      name: "Сумма",
      checked: true,
      key: "movement",
      type: "movement",
      thWidth: "100px",
    },
    {
      name: "Количевство",
      checked: true,
      key: "sale",
      type: "sale",
      thWidth: "90px",
    },
    {
      name: "Объем",
      checked: true,
      key: "supplier",
      type: "supplier",
      thWidth: "160px",
    },
    {
      name: "АКБ",
      checked: true,
      key: "adjust",
      type: "adjust",
      thWidth: "160px",
    },
    {
      name: "Кол-во Заказов",
      checked: true,
      key: "bonus",
      type: "bonus",
      thWidth: "160px",
    },
  ]);
  const loadedData = ref([
    {
      product: "ТП Андрей",
      remain: "Lorem ipsum",
      quantity: "13268",
      adjustments: "13268",
      returnShelf: "13268",
      movement: "13268",
      sale: "13268",
      supplier: "13268",
      adjust: "13268",
      bonus: "13268",
      items: [
        {
          product: "ТП Андрей",
          remain: "Lorem ipsum",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          sale: "13268",
          supplier: "13268",
          adjust: "13268",
          bonus: "13268",
        },
        {
          product: "ТП Андрей",
          remain: "Lorem ipsum",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          sale: "13268",
          supplier: "13268",
          adjust: "13268",
          bonus: "13268",
        },
        {
          product: "ТП Андрей",
          remain: "Lorem ipsum",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          sale: "13268",
          supplier: "13268",
          adjust: "13268",
          bonus: "13268",
        },
      ],
    },
    {
      product: "ТП Андрей",
      remain: "Lorem ipsum",
      quantity: "13268",
      adjustments: "13268",
      returnShelf: "13268",
      movement: "13268",
      sale: "13268",
      supplier: "13268",
      adjust: "13268",
      bonus: "13268",
      items: [
        {
          product: "ТП Андрей",
          remain: "Lorem ipsum",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          sale: "13268",
          supplier: "13268",
          adjust: "13268",
          bonus: "13268",
        },
        {
          product: "ТП Андрей",
          remain: "Lorem ipsum",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          sale: "13268",
          supplier: "13268",
          adjust: "13268",
          bonus: "13268",
        },
        {
          product: "ТП Андрей",
          remain: "Lorem ipsum",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          sale: "13268",
          supplier: "13268",
          adjust: "13268",
          bonus: "13268",
        },
      ],
    },
    {
      product: "ТП Андрей",
      remain: "Lorem ipsum",
      quantity: "13268",
      adjustments: "13268",
      returnShelf: "13268",
      movement: "13268",
      sale: "13268",
      supplier: "13268",
      adjust: "13268",
      bonus: "13268",
      items: [
        {
          product: "ТП Андрей",
          remain: "Lorem ipsum",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          sale: "13268",
          supplier: "13268",
          adjust: "13268",
          bonus: "13268",
        },
        {
          product: "ТП Андрей",
          remain: "Lorem ipsum",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          sale: "13268",
          supplier: "13268",
          adjust: "13268",
          bonus: "13268",
        },
        {
          product: "ТП Андрей",
          remain: "Lorem ipsum",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          sale: "13268",
          supplier: "13268",
          adjust: "13268",
          bonus: "13268",
        },
      ],
    },
    {
      product: "ТП Андрей",
      remain: "Lorem ipsum",
      quantity: "13268",
      adjustments: "13268",
      returnShelf: "13268",
      movement: "13268",
      sale: "13268",
      supplier: "13268",
      adjust: "13268",
      bonus: "13268",
      items: [
        {
          product: "ТП Андрей",
          remain: "Lorem ipsum",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          sale: "13268",
          supplier: "13268",
          adjust: "13268",
          bonus: "13268",
        },
        {
          product: "ТП Андрей",
          remain: "Lorem ipsum",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          sale: "13268",
          supplier: "13268",
          adjust: "13268",
          bonus: "13268",
        },
        {
          product: "Dena",
          remain: "Lorem ipsum",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          sale: "13268",
          supplier: "13268",
          adjust: "13268",
          bonus: "13268",
        },
      ],
    },
    {
      product: "ТП Андрей",
      remain: "Lorem ipsum",
      quantity: "13268",
      adjustments: "13268",
      returnShelf: "13268",
      movement: "13268",
      sale: "13268",
      supplier: "13268",
      adjust: "13268",
      bonus: "13268",
      items: [
        {
          product: "Dena",
          remain: "Lorem ipsum",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          sale: "13268",
          supplier: "13268",
          adjust: "13268",
          bonus: "13268",
        },
        {
          product: "ТП Андрей",
          remain: "Lorem ipsum",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          sale: "13268",
          supplier: "13268",
          adjust: "13268",
          bonus: "13268",
        },
        {
          product: "ТП Андрей",
          remain: "Lorem ipsum",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          sale: "13268",
          supplier: "13268",
          adjust: "13268",
          bonus: "13268",
        },
      ],
    },
    {
      product: "ТП Андрей",
      remain: "Lorem ipsum",
      quantity: "13268",
      adjustments: "13268",
      returnShelf: "13268",
      movement: "13268",
      sale: "13268",
      supplier: "13268",
      adjust: "13268",
      bonus: "13268",
      items: [
        {
          product: "ТП Андрей",
          remain: "Lorem ipsum",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          sale: "13268",
          supplier: "13268",
          adjust: "13268",
          bonus: "13268",
        },
        {
          product: "ТП Андрей",
          remain: "Lorem ipsum",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          sale: "13268",
          supplier: "13268",
          adjust: "13268",
          bonus: "13268",
        },
        {
          product: "ТП Андрей",
          remain: "Lorem ipsum",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          sale: "13268",
          supplier: "13268",
          adjust: "13268",
          bonus: "13268",
        },
      ],
    },
  ]);
  </script>
