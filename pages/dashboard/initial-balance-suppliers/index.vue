<template>
  <div>
    <div class="flex justify-between mt-7">
      <page-title :title="'Начальные балансы (остатки) поставщиков'"/>
      <div class="flex gap-5">
        <nuxt-link to="/dashboard/initial-balance-suppliers/AddPayment">
          <m-btn  class="w-53 mt-2">Добавить</m-btn>
        </nuxt-link>
      </div>
    </div>
    <div class="mt-5">
      <DashboardInitialBalanceSuppliersDataTable/>
    </div>
  </div>
</template>

<script setup>
const imports = ref(false)
function outside(){
  imports.value = false
}
</script>

<style scoped>

</style>
