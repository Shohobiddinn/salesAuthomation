<template>
  <div class="flex flex-col gap-6">
    <div class="flex justify-between mt-4">
      <page-title :title="'Возврат тары'" />
      <div class="mt-2">
        <nuxt-link
          :to="{
            path: '/orders/create-orders',
            query: { refund: 'tara' },
          }"
        >
          <m-btn>Добавить возврат</m-btn>
        </nuxt-link>
      </div>
    </div>
    <div>
      <OrdersReturnContainersFilterCard />
    </div>
    <div class="mt-1.5">
      <OrdersReturnContainersDataTable />
    </div>
  </div>
</template>
