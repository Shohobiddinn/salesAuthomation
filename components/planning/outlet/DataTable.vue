<template>
    <div class="bg-white w-full rounded mb-4">
      <div class="flex items-center p-4">
        <div class="grid grid-cols-2 items-center">
          <div class="flex gap-8">
            <NuxtLink
              to="#"
              @click="activeTab = activeTab !== 1 ? 1 : 1"
              :class="
                activeTab === 1
                  ? 'text-[#299B9B]'
                  : 'text-[#8FA0A0] active:text-[#299B9B]'
              "
              >Line tab</NuxtLink
            >
            <NuxtLink
              to="#"
              @click="activeTab = activeTab !== 2 ? 2 : 2"
              :class="
                activeTab === 2
                  ? 'text-[#299B9B]'
                  : 'text-[#8FA0A0] active:text-[#299B9B]'
              "
              >Line tab</NuxtLink
            >
            <NuxtLink
              to="#"
              @click="activeTab = activeTab !== 3 ? 3 : 3"
              :class="
                activeTab === 3
                  ? 'text-[#299B9B]'
                  : 'text-[#8FA0A0] active:text-[#299B9B]'
              "
              >Line tab</NuxtLink
            >
            <NuxtLink
              to="#"
              @click="activeTab = activeTab !== 4 ? 4 : 4"
              :class="
                activeTab === 4
                  ? 'text-[#299B9B]'
                  : 'text-[#8FA0A0] active:text-[#299B9B]'
              "
              >Line tab</NuxtLink
            >
            <NuxtLink
              to="#"
              @click="activeTab = activeTab !== 5 ? 5 : 5"
              :class="
                activeTab === 5
                  ? 'text-[#299B9B]'
                  : 'text-[#8FA0A0] active:text-[#299B9B]'
              "
              >Line tab</NuxtLink
            >
          </div>
  
          <div class="flex gap-4 items-center">
            <DatePicker class="w-fit"/>
  
            <div
              @click="filter.isSelectAgent = !filter.isSelectAgent"
              class="w-[203px] mr-[18px] flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
            >
              <div class="ml-4 mt-2">
                <IconArrowBottom />
              </div>
              <div class="fs-14 text-gray ml-2">2023</div>
            </div>
  
            <div class="flex justify-end">
              <button class="py-2 w-[165px] rounded-lg bg-[#299B9B] text-white">
                Применить
              </button>
              <button class="ml-3"><IconRe /></button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="overflow-auto">
        <table class="w-full rounded-t-large overflow-hidden whitespace-nowrap">
          <thead>
            <tr class="bg-lotion">
              <td v-for="headerT in headerTs" class="border-t-1">
               <div :class="headerT.name === 'АКБ/ОКБ' && 'border-l-1 py-3'">
                <span class="ml-6">{{ headerT.name }}</span>
               </div>
              </td>
            </tr>
            <tr class="bg-lotion">
              <template v-for="header in headers" :key="headers">
                <td class="fw-4 text-gray-3 px-3 py-2.5 border-t-1">
                  <div :style="{ width: header.thWidth }" >
                    <flex-row
                      class="justify-start fw-4 fs-14 items-center text-gray-400 "
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
                <td v-for="key in headers" :key="key" class="pl-3 border-y-1">
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
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">13126</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">13126</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">13126</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">13126</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">13126</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">132</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">132</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">132</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">123</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">123</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">123</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">123</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">123</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">123</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">123</td>
              <td class="fs-14 fw-6 text-[#299B9B] pl-3 py-2">123</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  let activeTab = ref(0);
  const filter = ref({
    isSelectMonth: false,
    isSelectYear: false,
  });
  
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
let headerTs = ref([
  {
    name: "Прогноз Продаж",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "АКБ/ОКБ",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
  {
    name: "",
  },
])

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
      name: "Пн",
      checked: true,
      key: "pn",
      type: "pn",
      thWidth: "60px",
    },
    {
      name: "Вт",
      checked: true,
      key: "bt",
      type: "bt",
      thWidth: "60px",
    },
    {
      name: "Ср",
      checked: true,
      key: "sr",
      type: "sr",
      thWidth: "60px",
    },
    {
      name: "Чт",
      checked: true,
      key: "cht",
      type: "cht",
      thWidth: "60px",
    },
    {
      name: "Пт",
      checked: true,
      key: "pt",
      type: "pt",
      thWidth: "60px",
      border: "border",
    },
    {
      name: "Сб",
      checked: true,
      key: "sb",
      type: "sb",
      thWidth: "60px",
      border: "border",
    },
    {
      name: "Вс",
      checked: true,
      key: "vs",
      type: "vs",
      thWidth: "60px",
      border: "border",
    },
    {
      name: "Общий",
      checked: true,
      key: "total",
      type: "total",
      thWidth: "60px",
      border: "border",
    },
    {
      name: "Пн",
      checked: true,
      key: "num1",
      type: "num1",
      thWidth: "60px",
    },
    {
      name: "Вт",
      checked: true,
      key: "num2",
      type: "num2",
      thWidth: "60px",
    },
    {
      name: "Ср",
      checked: true,
      key: "num3",
      type: "num3",
      thWidth: "58px",
    },
    {
      name: "Чт",
      checked: true,
      key: "num4",
      type: "num4",
      thWidth: "58px",
    },
    {
      name: "Пт",
      checked: true,
      key: "num5",
      type: "num5",
      thWidth: "58px",
    },
    {
      name: "Сб",
      checked: true,
      key: "num6",
      type: "num6",
      thWidth: "58px",
    },
    {
      name: "Вс",
      checked: true,
      key: "num7",
      type: "num7",
      thWidth: "58px",
    },
    {
      name: "Общий",
      checked: true,
      key: "num8",
      type: "num8",
      thWidth: "58px",
    },
  ]);
  const loadedData = ref([
    {
      product: "ТП Андрей",
      pn: "132",
      bt: "13268",
      sr: "13268",
      cht: "13268",
      pt: "13268",
      sb: "13268",
      vs: "13268",
      total: "13268",
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
      pn: "132",
      bt: "13268",
      sr: "13268",
      cht: "13268",
      pt: "13268",
      sb: "13268",
      vs: "13268",
      total: "13268",
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
      pn: "132",
      bt: "13268",
      sr: "13268",
      cht: "13268",
      pt: "13268",
      sb: "13268",
      vs: "13268",
      total: "13268",
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
      pn: "132",
      bt: "13268",
      sr: "13268",
      cht: "13268",
      pt: "13268",
      sb: "13268",
      vs: "13268",
      total: "13268",
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
      pn: "132",
      bt: "13268",
      sr: "13268",
      cht: "13268",
      pt: "13268",
      sb: "13268",
      vs: "13268",
      total: "13268",
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
      pn: "132",
      bt: "13268",
      sr: "13268",
      cht: "13268",
      pt: "13268",
      sb: "13268",
      vs: "13268",
      total: "13268",
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
  ]);
  </script>
  
  
  