<template>
  <div>
    <div class="flex justify-between mt-4">
      <page-title :title="'Отказы'"/>
      <nuxt-link to="/clients/clients/create-clients" class="mt-2">
        <m-btn>Добавить клиента</m-btn>
      </nuxt-link>
    </div>
    <div class="mt-4">
      <OrdersRefusalsFiltr />
    </div>
    <div class="mt-4">
      <OrdersRefusalsDataTable />
    </div>
  </div>

</template>
