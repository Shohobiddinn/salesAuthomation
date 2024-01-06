<template>
  <div>
    <div
      class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center mt-6"
    >
      <p-title> Склады </p-title>
      <div class="flex gap-4 justify-self-end">
        <m-btn @click="dialogStore.openDialog" class="justify-self-auto">
          Добавить склад
        </m-btn>
      </div>
    </div>
    <div class="w-[30%] h-[44px] flex bg-white rounded-lg mt-4 mb-4">
      <div
        v-for="item in tabs"
        :key="item.number"
        class="form_radio_btn inline-block h-full w-[50%]"
      >
        <input
          :checked="item.number === amount"
          :id="item.tab"
          @input="inputValue(item.number)"
          type="radio"
          name="product"
          :value="amount"
          class="hidden"
        />
        <label
          class="text-center inline-block cursor-pointer leading-[100%] hover:text-gray-500 w-full py-[14px] px-4 fs-14"
          :class="[
            amount === 2 && 'rounded-r-large',
            amount === 1 && 'rounded-l-large',
          ]"
          :for="item.tab"
          >{{ item.name }}</label
        >
      </div>
    </div>
    <div>
      <WarehousesWarehousesDataTable :is-active="amount === 1" />
    </div>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal
          @closeDialog="dialogStore.closeDialog"
          :name="
            dialogStore.singleData?.id
              ? 'Сохранить новый склад'
              : 'Добавить новый склад'
          "
        >
          <div class="relative">
            <WarehousesWarehousesDialogBody />
          </div>
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
const dialogStore = useDialogStore("warehouses");
const tabs = ref([
  {
    name: "Активные",
    number: 1,
    tab: "tab1",
  },
  {
    name: "Не активные",
    number: 2,
    tab: "tab2",
  },
]);
const amount = ref(1);

function inputValue(param) {
  amount.value = param;
}
</script>

<style scoped>
/* Checked */
.form_radio_btn input[type="radio"]:checked + label {
  background: #299b9b;
  color: white;
  text-align: center;
  height: 44px;
}
</style>
