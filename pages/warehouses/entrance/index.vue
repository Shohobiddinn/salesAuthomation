<template>
  <div>
    <div>
      <div
        class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center mt-6"
      >
        <p-title> Поступление </p-title>
        <div class="flex gap-4 justify-self-end">
          <DatePicker :initialFromDate="initialFromDate" class="w-fit" @onApply="dateRange = $event" />
          <button @click="dialogStore.openDialog" class="flex px-2 mt-2 mr-4">
            <div class="pr-2"><icon-imports /></div>
            <div>Импортировать</div>
          </button>
          <nuxt-link to="/warehouses/entrance/create-parish">
            <m-btn class="justify-self-auto"> Добавить приход </m-btn>
          </nuxt-link>
        </div>
      </div>
      <div>
        <WarehousesEntranceDataTable :dateRange="dateRange" />
      </div>
      <transition name="modal">
        <div v-if="dialogStore.isDialogOpen">
          <h-no-modal
            :dataContainerWidth="'807px'"
            @closeDialog="dialogStore.closeDialog"
            :name="'Добавить новый склад'"
          >
            <div class="relative w-full">
              <WarehousesEntranceDialogBody />
            </div>
          </h-no-modal>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import router from "#app/plugins/router.mjs";
import moment from "moment";

const dialogStore = useDialogStore("warehouses");
const initialFromDate = ref('this-month')

const dateRange = ref();
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
