<template>
  <div>
    <div>
      <div class="flex justify-between mt-7">
        <page-title :title="'Обороты по поставщикам'" />
        <div v-click-outside="outside" class="flex relative">
          <button
            @click="actions = !actions"
            class="py-2 px-5 bg-white w-40 rounded-lg font-[500]"
          >
            <span class="fs-14 fw-6 mr-2">X</span> Actions
          </button>
          <div
            v-if="actions"
            class="absolute z-50 w-50 rounded-lg bg-white right-0 top-12 px-4"
          >
            <button
              v-for="item in act"
              class="fs-14 py-2 border-b-1 w-full text-start"
            >
              {{ item.name }}
            </button>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <DashboardDebtsOrdersFilterCard />
      </div>
      <div class="flex justify-between mt-5">
        <page-title :title="'Таблица'" />
        <div class="flex gap-5">
          <button
            @click="closedOrder = true"
            class="fs-14 font-[500] rounded-lg bg-white py-2 px-5"
          >
            Закрытие заказа предоплатой
          </button>
          <m-btn @click="payment = true" class="w-50">Оплатить</m-btn>
        </div>
      </div>
      <div class="mt-5">
        <DashboardDebtsOrdersDataTable />
      </div>
    </div>
    <transition name="modal">
      <div v-if="payment">
        <h-no-modal @closeDialog="closePayment" :dataContainerWidth="'1325px'">
          <DashboardDebtsOrdersPaymentsDebtsDialog />
        </h-no-modal>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="closedOrder">
        <h-no-modal @closeDialog="closeOrder" :dataContainerWidth="'1325px'">
          <LazyDashboardDebtsOrdersClosedOrdersDialog />
        </h-no-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
const actions = ref(false);
function outside() {
  actions.value = false;
}
const payment = ref(false);
function closePayment() {
  payment.value = false;
}
const closedOrder = ref(false);
function closeOrder() {
  closedOrder.value = false;
}
const act = ref([
  {
    name: "Взаиморасчёт",
  },
  {
    name: "Пересчитать сроки",
  },
  {
    name: "Отчёт по поступленям",
  },
  {
    name: "Все клиенты",
  },
  {
    name: "Итоги по клиентам",
  },
]);
</script>

<style scoped></style>
