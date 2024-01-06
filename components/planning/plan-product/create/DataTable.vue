<template>
  <div class="bg-white w-full rounded-lg">
    <div class="overflow-auto">
      <table class="w-full rounded-t-large overflow-hidden whitespace-nowrap">
        <thead>
          <tr class="bg-lotion">
            <template v-for="header in headers" :key="header">
              <td class="fw-4 text-gray-3 px-4 py-2.5 border-t-1">
                <div :style="{ width: header.thWidth }">
                  <flex-row
                    class="justify-start fw-4 fs-14 items-center text-gray-400"
                  >
                    <span>
                      {{ header.name }}
                    </span>
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
                  v-if="key.key === 'product'"
                  class="flex justify-start fw-4 fs-14 items-center text-gray-400"
                >
                  <div class="ml-2 text-gray-700">
                    {{ data[key.key] }}
                  </div>
                </button>
                <flex-col v-if="key.key !== 'product'" class="py-2">
                  <flex-row
                    class="justify-start fw-4 fs-14 items-center text-gray-700"
                  >
                    <div>
                      <input
                        type="number"
                        :placeholder="data[key.key]"
                        class="border-1 outline-none p-3 rounded-lg"
                      />
                    </div>
                  </flex-row>
                </flex-col>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div class="flex justify-end p-[18px]">
    <m-btn class="w-[237px]"> Сохранить </m-btn>

  </div>
  </div>
</template>

<script setup>
const filter = ref({
  isSelectMonth: false,
  isSelectYear: false,
});

const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});

const showProduct = ref({
  isActive: false,
  index: 0,
});
function openProducts(index) {
  showProduct.value.isActive = !showProduct.value.isActive;
  showProduct.value.index = index;
}

let headers = ref([
  {
    name: "Агент",
    checked: true,
    key: "product",
    type: "product",
    thWidth: "180px",
    bRadius: "8px",
  },
  {
    name: "Андрей ака",
    checked: true,
    key: "pn",
    type: "inp",
    thWidth: "160px",
  },
  {
    name: "Андрей ака",
    checked: true,
    key: "bt",
    type: "bt",
    thWidth: "160px",
  },
  {
    name: "Андрей ака",
    checked: true,
    key: "pt",
    type: "pt",
    thWidth: "160px",
  },
  {
    name: "Андрей ака",
    checked: true,
    key: "sr",
    type: "sr",
    thWidth: "160px",
  },
  {
    name: "Андрей ака",
    checked: true,
    key: "cht",
    type: "cht",
    thWidth: "160px",
  },
]);
const loadedData = ref([
  {
    product: "Coca cola 1.5",
    pn: "Пишите  ",
    bt: "Пишите",
    sr: "Пишите",
    cht: "Пишите",
    pt: "Пишите",
  },
  {
    product: "Coca cola 1.5",
    pn: "Пишите",
    bt: "Пишите",
    sr: "Пишите",
    cht: "Пишите",
    pt: "Пишите",
    cht: "Пишите",
  },

  {
    product: "Coca cola 1.5",
    pn: "Пишите ",
    bt: "Пишите",
    sr: "Пишите",
    cht: "Пишите",
    pt: "Пишите",
  },

  {
    product: "Coca cola 1.5",
    pn: "Пишите  ",
    bt: "Пишите",
    sr: "Пишите",
    cht: "Пишите",
    pt: "Пишите",
  },
  {
    product: "Coca cola 1.5",
    pn: "Пишите ",
    bt: "Пишите",
    sr: "Пишите",
    cht: "Пишите",
    pt: "Пишите",
  },
  {
    product: "Coca cola 1.5",
    pn: "Пишите  ",
    bt: "Пишите",
    sr: "Пишите",
    cht: "Пишите",
    pt: "Пишите",
  },
]);
</script>
