<template>
    <div class="w-full pb-3 bg-white mb-2 rounded-lg border-grey">
      <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
        <div @click="draggable = true">
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
  
        <PlanningMonthly2DayLeftTabs class="absolute right-10" />
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
                    v-if="key.key === 'product'"
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
              <td class="fs-14 fw-6 text-black pl-3 py-2">13126</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2">13126</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2">13126</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2">13126</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2">13126</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2">132</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2">132</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2">132</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2">123</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2">123</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2">123</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2">123</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2">123</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2">123</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2">123</td>
              <td class="fs-14 fw-6 text-black pl-3 py-2">123</td>
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
      name: "Доля",
      checked: true,
      key: "remain",
      type: "remain",
      thWidth: "100px",
    },
    {
      name: "План",
      checked: true,
      key: "quantity",
      type: "quantity",
      thWidth: "100px",
    },
    {
      name: "Факт",
      checked: true,
      key: "adjustments",
      type: "adjustments",
      thWidth: "90px",
    },
    {
      name: "%",
      checked: true,
      key: "returnShelf",
      type: "returnShelf",
      thWidth: "120px",
    },
    {
      name: "Прогноз",
      checked: true,
      key: "movement",
      type: "movement",
      thWidth: "100px",
      border: "border",
    },
    {
      name: "1",
      checked: true,
      key: "num1",
      type: "num1",
      thWidth: "58px",
    },
    {
      name: "2",
      checked: true,
      key: "num2",
      type: "num2",
      thWidth: "58px",
    },
    {
      name: "3",
      checked: true,
      key: "num3",
      type: "num3",
      thWidth: "58px",
    },
    {
      name: "4",
      checked: true,
      key: "num4",
      type: "num4",
      thWidth: "58px",
    },
    {
      name: "5",
      checked: true,
      key: "num5",
      type: "num5",
      thWidth: "58px",
    },
    {
      name: "6",
      checked: true,
      key: "num6",
      type: "num6",
      thWidth: "58px",
    },
    {
      name: "7",
      checked: true,
      key: "num7",
      type: "num7",
      thWidth: "58px",
    },
    {
      name: "8",
      checked: true,
      key: "num8",
      type: "num8",
      thWidth: "58px",
    },
    {
      name: "9",
      checked: true,
      key: "num9",
      type: "num9",
      thWidth: "58px",
    },
    {
      name: "10",
      checked: true,
      key: "num10",
      type: "num10",
      thWidth: "58px",
    },
    {
      name: "11",
      checked: true,
      key: "num11",
      type: "num11",
      thWidth: "58px",
    },
  ]);
  const loadedData = ref([
    {
      product: "ТП Андрей",
      remain: "132",
      quantity: "13268",
      adjustments: "13268",
      returnShelf: "13268",
      movement: "13268",
      num1: "136",
      num2: "123",
      num3: "132",
      num4: "132",
      num5: "132",
      num6: "132",
      num7: "132",
      num8: "132",
      num9: "132",
      num10: "132",
      num11: "136",
      items: [
        {
          product: "ТП Андрей",
          remain: "132",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          num1: "136",
          num2: "123",
          num3: "132",
          num4: "132",
          num5: "132",
          num6: "132",
          num7: "132",
          num8: "132",
          num9: "132",
          num10: "132",
          num11: "136",
        },
        {
          product: "ТП Андрей",
          remain: "132",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          num1: "136",
          num2: "123",
          num3: "132",
          num4: "132",
          num5: "132",
          num6: "132",
          num7: "132",
          num8: "132",
          num9: "132",
          num10: "132",
          num11: "136",
        },
        {
          product: "ТП Андрей",
          remain: "Lorem ipsum",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          num1: "136",
          num2: "123",
          num3: "132",
          num4: "132",
          num5: "132",
          num6: "132",
          num7: "132",
          num8: "132",
          num9: "132",
          num10: "132",
          num11: "136",
        },
      ],
    },
    {
      product: "ТП Андрей",
      remain: "132",
      quantity: "13268",
      adjustments: "13268",
      returnShelf: "13268",
      movement: "13268",
      num1: "136",
      num2: "123",
      num3: "132",
      num4: "132",
      num5: "132",
      num6: "132",
      num7: "132",
      num8: "132",
      num9: "132",
      num10: "132",
      num11: "136",
      items: [
        {
          product: "ТП Андрей",
          remain: "132",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          num1: "136",
          num2: "123",
          num3: "132",
          num4: "132",
          num5: "132",
          num6: "132",
          num7: "132",
          num8: "132",
          num9: "132",
          num10: "132",
          num11: "136",
        },
        {
          product: "ТП Андрей",
          remain: "132",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          num1: "136",
          num2: "123",
          num3: "132",
          num4: "132",
          num5: "132",
          num6: "132",
          num7: "132",
          num8: "132",
          num9: "132",
          num10: "132",
          num11: "136",
        },
        {
          product: "ТП Андрей",
          remain: "132",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          num1: "136",
          num2: "123",
          num3: "132",
          num4: "132",
          num5: "132",
          num6: "132",
          num7: "132",
          num8: "132",
          num9: "132",
          num10: "132",
          num11: "136",
        },
      ],
    },
    {
      product: "ТП Андрей",
      remain: "132",
      quantity: "13268",
      adjustments: "13268",
      returnShelf: "13268",
      movement: "13268",
      num1: "136",
      num2: "123",
      num3: "132",
      num4: "132",
      num5: "132",
      num6: "132",
      num7: "132",
      num8: "132",
      num9: "132",
      num10: "132",
      num11: "136",
      items: [
        {
          product: "ТП Андрей",
          remain: "132",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          num1: "136",
          num2: "123",
          num3: "132",
          num4: "132",
          num5: "132",
          num6: "132",
          num7: "132",
          num8: "132",
          num9: "132",
          num10: "132",
          num11: "136",
        },
        {
          product: "ТП Андрей",
          remain: "132",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          num1: "136",
          num2: "123",
          num3: "132",
          num4: "132",
          num5: "132",
          num6: "132",
          num7: "132",
          num8: "132",
          num9: "132",
          num10: "132",
          num11: "136",
        },
        {
          product: "ТП Андрей",
          remain: "132",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          num1: "136",
          num2: "123",
          num3: "132",
          num4: "132",
          num5: "132",
          num6: "132",
          num7: "132",
          num8: "132",
          num9: "132",
          num10: "132",
          num11: "136",
        },
      ],
    },
    {
      product: "ТП Андрей",
      remain: "132",
      quantity: "13268",
      adjustments: "13268",
      returnShelf: "13268",
      movement: "13268",
      num1: "136",
      num2: "123",
      num3: "132",
      num4: "132",
      num5: "132",
      num6: "132",
      num7: "132",
      num8: "132",
      num9: "132",
      num10: "132",
      num11: "136",
      items: [
        {
          product: "ТП Андрей",
          remain: "132",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          num1: "136",
          num2: "123",
          num3: "132",
          num4: "132",
          num5: "132",
          num6: "132",
          num7: "132",
          num8: "132",
          num9: "132",
          num10: "132",
          num11: "136",
        },
        {
          product: "ТП Андрей",
          remain: "132",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          num1: "136",
          num2: "123",
          num3: "132",
          num4: "132",
          num5: "132",
          num6: "132",
          num7: "132",
          num8: "132",
          num9: "132",
          num10: "132",
          num11: "136",
        },
        {
          product: "Dena",
          remain: "132",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          num1: "136",
          num2: "123",
          num3: "132",
          num4: "132",
          num5: "132",
          num6: "132",
          num7: "132",
          num8: "132",
          num9: "132",
          num10: "132",
          num11: "136",
        },
      ],
    },
    {
      product: "ТП Андрей",
      remain: "132",
      quantity: "13268",
      adjustments: "13268",
      returnShelf: "13268",
      movement: "13268",
      num1: "136",
      num2: "123",
      num3: "132",
      num4: "132",
      num5: "132",
      num6: "132",
      num7: "132",
      num8: "132",
      num9: "132",
      num10: "132",
      num11: "136",
      items: [
        {
          product: "Dena",
          remain: "132",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          num1: "136",
          num2: "123",
          num3: "132",
          num4: "132",
          num5: "132",
          num6: "132",
          num7: "132",
          num8: "132",
          num9: "132",
          num10: "132",
          num11: "136",
        },
        {
          product: "ТП Андрей",
          remain: "132",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          num1: "136",
          num2: "123",
          num3: "132",
          num4: "132",
          num5: "132",
          num6: "132",
          num7: "132",
          num8: "132",
          num9: "132",
          num10: "132",
          num11: "136",
        },
        {
          product: "ТП Андрей",
          remain: "132",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          num1: "136",
          num2: "123",
          num3: "132",
          num4: "132",
          num5: "132",
          num6: "132",
          num7: "132",
          num8: "132",
          num9: "132",
          num10: "132",
          num11: "136",
        },
      ],
    },
    {
      product: "ТП Андрей",
      remain: "132",
      quantity: "13268",
      adjustments: "13268",
      returnShelf: "13268",
      movement: "13268",
      num1: "136",
      num2: "123",
      num3: "132",
      num4: "132",
      num5: "132",
      num6: "132",
      num7: "132",
      num8: "132",
      num9: "132",
      num10: "132",
      num11: "136",
      items: [
        {
          product: "ТП Андрей",
          remain: "132",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          num1: "136",
          num2: "123",
          num3: "132",
          num4: "132",
          num5: "132",
          num6: "132",
          num7: "132",
          num8: "132",
          num9: "132",
          num10: "132",
          num11: "136",
        },
        {
          product: "ТП Андрей",
          remain: "132",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          num1: "136",
          num2: "123",
          num3: "132",
          num4: "132",
          num5: "132",
          num6: "132",
          num7: "132",
          num8: "132",
          num9: "132",
          num10: "132",
          num11: "136",
        },
        {
          product: "ТП Андрей",
          remain: "132",
          quantity: "13268",
          adjustments: "13268",
          returnShelf: "13268",
          movement: "13268",
          num1: "136",
          num2: "123",
          num3: "132",
          num4: "132",
          num5: "132",
          num6: "132",
          num7: "132",
          num8: "132",
          num9: "132",
          num10: "132",
          num11: "136",
        },
      ],
    },
  ]);
  </script>
  
  <style scoped>
  .child td:nth-child(2) {
    border-right: 1px solid #e1e4e4;
  }
  .child td:nth-child(8) {
    border-right: 1px solid #e1e4e4;
  }
  </style>
  