<template>
  <flex-col class="gap-6 pt-6">
    <flex-row>
      <p-title>
        Продажи по клиентам
      </p-title>
    </flex-row>
    <flex-row>
      <ReportCustomerFilterCard/>
    </flex-row>
    <flex-row>
      <ReportCustomerTableHeader/>
    </flex-row>
    <flex-row>
      <ReportCustomerCustomersTable/>
    </flex-row>
    <flex-row>
      <p-title>
        По агентам
      </p-title>
    </flex-row>
    <flex-row>
      <ReportCustomerCustomersTable/>
    </flex-row>
  </flex-col>
</template>

<script setup>
</script>

<style scoped>

</style>