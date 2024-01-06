<template>
  <div class="overflow-auto rounded-lg border-1">
    <div class="text-gray-3 text-lg font-semibold p-4.5">{{ currentDate }}</div>
    <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
      <template #body>
        <template v-for="data in loadedData" :key="data">
          <c-tr>
            <c-td-no-edit v-for="key in headers" :key="key">
              <div class="py-2">
                {{ data[key.key] }}
              </div>
            </c-td-no-edit>
            <c-td>
              <div
                class="p-2 mr-2 cursor-pointer left-shadow"
                @click="onReplaceLicense(data)"
              >
                <IconSortRightLeft></IconSortRightLeft>
              </div>
            </c-td>
          </c-tr>
        </template>
      </template>
    </data-table>
  </div>
</template>

<script setup>
import moment from "moment";
const currentDate = ref(moment().local("ru").format("MMMM, YYYY (сейчас)"));

const emit = defineEmits(["onReplaceLicense"]);

const headers = ref([
  {
    name: "№",
    checked: true,
    key: "number",
    type: "come",
  },
  {
    name: "Кол-во пользователей",
    checked: true,
    key: "usersAmount",
    type: "come",
  },
  {
    name: "Тип лицензии",
    checked: true,
    key: "licenseType",
    type: "come",
  },
  {
    name: "Цена",
    checked: true,
    key: "price",
    type: "come",
  },
  {
    name: "Период",
    checked: true,
    key: "period",
    type: "come",
  },
  {
    name: "Кол-во",
    checked: true,
    key: "amount",
    type: "come",
  },
  {
    name: "Итого",
    checked: true,
    key: "total",
    type: "come",
  },
]);

const loadedData = ref([
  {
    number: 1,
    usersAmount: "Админ (1 шт)",
    licenseType: "Admin-30",
    price: "100 000 000",
    period: "1-30 Ноябрь, 2022	",
    amount: "1 шт",
    total: "1 шт",
  },
  {
    number: 2,
    usersAmount: "Админ (1 шт)",
    licenseType: "Admin-30",
    price: "100 000 000",
    period: "1-30 Ноябрь, 2022	",
    amount: "1 шт",
    total: "1 шт",
  },
  {
    number: 3,
    usersAmount: "Админ (1 шт)",
    licenseType: "Admin-30",
    price: "100 000 000",
    period: "1-30 Ноябрь, 2022	",
    amount: "1 шт",
    total: "1 шт",
  },
  {
    number: 4,
    usersAmount: "Админ (1 шт)",
    licenseType: "Admin-30",
    price: "100 000 000",
    period: "1-30 Ноябрь, 2022	",
    amount: "1 шт",
    total: "1 шт",
  },
  {
    number: 5,
    usersAmount: "Админ (1 шт)",
    licenseType: "Admin-30",
    price: "100 000 000",
    period: "1-30 Ноябрь, 2022	",
    amount: "1 шт",
    total: "1 шт",
  },
  {
    number: 6,
    usersAmount: "Админ (1 шт)",
    licenseType: "Admin-30",
    price: "100 000 000",
    period: "1-30 Ноябрь, 2022	",
    amount: "1 шт",
    total: "1 шт",
  },
]);

let sortedData = ref({ key: "", mode: "" });

function sortData(data) {
  sortedData.value = data;
}

const onReplaceLicense = (data) => {
  emit("onReplaceLicense", data);
};
</script>

<style scoped>
.left-shadow {
  box-shadow: -4px 0px 4px rgba(0, 0, 0, 0.04);
}
</style>