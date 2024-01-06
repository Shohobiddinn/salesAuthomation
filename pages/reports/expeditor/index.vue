<template>
  <div>
    <flex-row class="my-6">
      <p-title> Отгрузки по экпедиторам </p-title>
    </flex-row>
    <flex-row>
      <ReportExpeditorFilterCard />
    </flex-row>
    <flex-row class="my-6">
      <ReportExpeditorTable />
    </flex-row>
  </div>
</template>

<script>
export default {
  name: "index",
}
</script>

<style scoped></style>
