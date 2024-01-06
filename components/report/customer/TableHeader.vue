<template>
  <flex-row class="w-full items-center justify-between whitespace-nowrap">
    <flex-row class="gap-6 items-center">
      <p-title> Список Клиентов </p-title>
      <flex-row class="">
        <button
          v-for="tab in customerStore.tableTabs"
          class="first:rounded-l-lg last:rounded-r-lg px-4 py-2 border-r-1 last:border-0 fs-14 fw-4"
          :class="
            customerStore.tableActiveTab === tab.key
              ? 'button-bg text-white'
              : 'bg-white secondary-gray-text'
          "
          @click="customerStore.tableActiveTab = tab.key"
        >
          {{ tab.name }}
        </button>
      </flex-row>
    </flex-row>
    <flex-row class="gap-6">
      <nuxt-link to="/reports/customer/auditor">
        <m-btn-outlined class="border-color-primary bg-white">
          Действие с аудитором
        </m-btn-outlined>
      </nuxt-link>
      <m-btn-outlined class="border-color-primary bg-white">
        Показать на карте
      </m-btn-outlined>
    </flex-row>
  </flex-row>
</template>

<script setup>
const customerStore = useReportCustomerStore("main")
</script>

<style scoped></style>
