<template>
  <div class="rounded border overflow-auto w-full">
    <table class="w-full">
      <thead>
        <tr>
          <td
            v-for="item in headerTs"
            :key="item"
            class="fs-12 bor font-bold secondary-gray-text py-3 border-x-1 pl-7.5"
          >
            {{ item.name }}
          </td>
        </tr>
        <tr class="border-y-1 bg-[#F4F9F9]">
          <th
            class="p-2"
            v-for="header in headers"
            :key="header"
            :class="'border-x-1'"
          >
            <div :style="{ width: header.thWidth }">
              <div class="flex justify-between p-1 gap-1 fs-14 fw-4 py-3">
                <div
                  class="text-[#424F4F]"
                  :class="header.name === 'Клиент' && 'fw-6'"
                >
                  {{ header.name }}
                </div>
                <div v-if="header.name === 'Клиент'">
                  <IconSettingsAlt
                    class="cursor-pointer"
                    @click="updateModalValue()"
                  />
                </div>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="data in loadedData" :key="data">
          <c-tr>
            <c-td-no-edit
              v-for="key in headers"
              :key="key"
              :class="'border-x-1'"
            >
              <div class="py-4">
                {{ data[key.key] }}
              </div>
            </c-td-no-edit>
          </c-tr>
        </template>
      </tbody>
    </table>
  </div>

  <transition name="modal">
    <div v-if="popUpIsOpen">
      <d-modal
        @closeDialog="onClosePopUp"
        :name="'Агент'"
        :dataContainerWidth="'618px'"
      >
        <ReportSaleClientSettingDialog />
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
const popUpIsOpen = ref(false);

const onClosePopUp = () => {
  popUpIsOpen.value = false;
};

const updateModalValue = () => {
  popUpIsOpen.value = !popUpIsOpen.value;
};

const headerTs = ref([
  {
    name: "",
  },
  {
    name: "1",
  },
  {
    name: "2",
  },
  {
    name: "3",
  },
  {
    name: "4",
  },
  {
    name: "5",
  },
  {
    name: "6",
  },
]);
const headers = ref([
  {
    name: "1",
    key: "name",
    thWidth: "41px",
  },
  {
    name: "Клиент",
    key: "okb",
    thWidth: "230px",
  },
  {
    name: "Итоговая сумма Количество",
    key: "amount1",
    thWidth: "230px",
  },
  {
    thWidth: "230px",
  },
  {
    thWidth: "230px",
  },
  {
    thWidth: "230px",
  },
  {
    thWidth: "230px",
  },
]);
const loadedData = ref([
  {
    name: "2",
    okb: "123312",
    amount1: "1123312",
  },
  {
    name: "2",
    okb: "123312",
    amount1: "1123312",
  },
  {
    name: "5",
    okb: "123312",
    amount1: "1123312",
  },
  {
    name: "2",
    okb: "123312",
    amount1: "1123312",
  },
  {
    name: "2",
    okb: "123312",
    amount1: "1123312",
  },
  {
    name: "2",
    okb: "123312",
    amount1: "1123312",
  },
  {
    name: "2",
    okb: "123312",
    amount1: "1123312",
  },
]);
</script>
