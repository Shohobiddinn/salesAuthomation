<template>
  <div>
    <div class="flex justify-between mt-7">
      <page-title :title="'Оплаты поставщикам'"/>
      <div class="flex gap-4">
        <nuxt-link to="/dashboard/payment-suppliers/create-payment">
          <m-btn class="w-50">Добавить</m-btn>
        </nuxt-link>
      </div>
    </div>
    <div class="mt-4">
      <DashboardPaymentSuppliersFilterCard/>
    </div>
    <div class="mt-7">
      <DashboardPaymentSuppliersDataTable/>
    </div>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>
