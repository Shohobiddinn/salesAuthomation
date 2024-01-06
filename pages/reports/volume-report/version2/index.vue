<template>
  <div class="flex flex-col gap-6 py-10 px-5">
    <p-title>По SKU</p-title>
    <ReportsVolumeReportFilterCard />
    <div class="flex gap-5">
      <ReportsVolumeReportAmountBox
        class="bg-[#23C00A19] w-1/4"
        :amount="299"
        :title="'ОКБ'"
      />
      <ReportsVolumeReportAmountBox
        class="bg-[#299B9B19] w-1/4"
        :amount="299"
        :title="'АКБ'"
      />
    </div>
    <ReportsVolumeReportDataTable />
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>