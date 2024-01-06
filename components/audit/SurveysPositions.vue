<template>
  <div class="flex w-full flex-col gap-6">
    <div class="w-1/3">
      <search-input
        :value="searchText"
        @updated="searchUpdated"
        class="w-full h-10.5"
      />
    </div>
    <auditSmallDataTable
      :headers="headerDataTable"
      :loadedData="loadedDataTable"
    />
    <div class="flex justify-end w-full mt-7.5">
      <button class="py-2 w-1/4 h-11 rounded-lg bg-[#299B9B] text-white">
        Сохранить
      </button>
    </div>
  </div>
</template>


<script setup>
const searchText = ref("");
const searchUpdated = (text) => {
  console.log(text);
};
const headerDataTable = ref([
  {
    name: "Имя",
    checked: true,
    key: "name",
    thWidth: "120px",
    type: "come",
  },
  {
    name: "Роль",
    checked: true,
    key: "role",
    thWidth: "120px",
    type: "come",
  },
]);

const loadedDataTable = ref([
  {
    name: "Merchendaizer",
    role: "Супервайзер",
  },
  {
    name: "Merchendaizer",
    role: "Супервайзер",
  },
  {
    name: "Merchendaizer",
    role: "Супервайзер",
  },
  {
    name: "Merchendaizer",
    role: "Супервайзер",
  },
  {
    name: "Merchendaizer",
    role: "Супервайзер",
  },
  {
    name: "Merchendaizer",
    role: "Супервайзер",
  },
]);
</script>
