<template>
  <div>
    <div class="flex justify-between mt-4">
      <page-title
        :title="isOrder ? 'Заявки Van Selling' : 'Возврат Van Selling'"
      />
      <div class="mt-2">
        <m-btn @click="returnContainers = true">Создать {{isOrder ? 'заявку' : 'возврат'}}</m-btn>
      </div>
    </div>
    <OrdersOrderVanSellingFilterCard />
    <div class="mt-4">
      <OrdersOrderVanSellingDataTable />
    </div>
    <transition name="modal">
      <div v-if="returnContainers">
        <h-no-modal
          @closeDialog="containerDialog"
          :dataContainerWidth="'1043px'"
          :name="'Управление меню таблицы'"
        >
          <OrdersOrderVanSellingDialog @closeDialog="containerDialog" />
        </h-no-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
// states
const route = useRoute();
const returnContainers = ref(false);

// hooks
const isOrder = computed(() => {
  return route.query.order_type === "1";
});

// methods
function containerDialog() {
  returnContainers.value = false;
}
</script>
