<template>
  <div>
    <div class="flex justify-between mt-7">
      <page-title title="Начальные балансы клиентов" />
      <div class="flex gap-5">
        <nuxt-link to="/dashboard/initial-balance-clients/AddPayment">
          <m-btn class="w-53 mt-2">Добавить</m-btn>
        </nuxt-link>
        <div v-click-outside="outside" class="relative">
          <button @click="imports = !imports" class="flex px-2 mt-2.3 mr-4 bg-white py-2.4 px-5 rounded-lg">
            <div class="pr-2"><icon-imports /></div>
            <div>Импортировать</div>
          </button>
          <div v-if="imports" class="rounded-lg w-[161px] h-[117px] top-[40px] border bg-white absolute z-50">
            <div class="fs-12 border-b border-[#E1E4E4] m-3 pb-2 cursor-pointer">Импорт по ИД</div>
            <div class="fs-12 border-b border-[#E1E4E4] m-3 pb-2 cursor-pointer">Импорт по Коду</div>
            <div class="fs-12 m-2 pb-2 cursor-pointer">Импорт по ИНН</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <DashboardInitialBalanceClientsDataTable />
    </div>
  </div>
</template>

<script setup>
const imports = ref(false)
function outside() {
  imports.value = false
}
</script>

<style scoped></style>
