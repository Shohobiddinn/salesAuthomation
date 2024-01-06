<template>
  <div class="bg-white w-full rounded-lg border">
    <div>
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
                  v-if="key.key"
                  class="flex justify-start fw-4 fs-14 items-center text-gray-400"
                >
                  <div class="ml-2 text-gray-700">
                    {{ data[key.key] }}
                  </div>
                </button>
                <flex-col v-if="key.key == 'bt'" class="py-2">
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
let headers = ref([
  {
    name: "№",
    checked: true,
    key: "product",
    type: "product",
    thWidth: "30px",
    bRadius: "8px",
  },
  {
    name: "Название категорий",
    checked: true,
    key: "pn",
    type: "inp",
    thWidth: "200px",
  },
  {
    name: "Вес в процентах",
    checked: true,
    key: "bt",
    type: "bt",
    thWidth: "60px",
  },
]);
const loadedData = ref([
  {
    product: "1",
    pn: "Coca cola",
  },
  {
    product: "1",
    pn: "Coca cola",
  },

  {
    product: "1",
    pn: "Coca cola",
  },

  {
    product: "1",
    pn: "Coca cola",
  },
  {
    product: "1",
    pn: "Coca cola",
  },
  {
    product: "1",
    pn: "Coca cola",
  },
]);
</script>
