<template>
  <div>
    <div>
      <div class="flex justify-between mt-7">
        <page-title :title="'Обороты по клиентам'" />
        <m-btn @click="checkout = true" class="w-63 mt-2"
          >Конструктор отчётов</m-btn
        >
      </div>
      <div class="mt-5">
        <DashboardTurnoverClientsFilterCard />
      </div>
      <div class="flex justify-between mt-5">
        <page-title :title="'Таблица'" />
        <div class="flex gap-5">
          <button
            class="rounded-lg border border-blue-20 py-2 px-11 fs-14 bg-white"
          >
            Отправить смс
          </button>
          <button
            class="rounded-lg border border-blue-20 py-2 px-11 fs-14 bg-white"
          >
            Оплатить
          </button>
        </div>
      </div>
      <div class="mt-5">
        <DashboardTurnoverClientsDataTable />
      </div>
    </div>
    <transition name="modal">
      <div v-if="checkout">
        <h-no-modal @closeDialog="closeCheckout" :dataContainerWidth="'1325px'">
          <DashboardTurnoverClientsPrixodCheckout />
        </h-no-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
const checkout = ref(false);
function closeCheckout() {
  checkout.value = false;
}
</script>

<style scoped></style>
