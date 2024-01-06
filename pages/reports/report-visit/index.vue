<template>
  <div class="flex flex-col gap-7.5 py-9 px-5">
    <div class="flex justify-between items-center">
      <p-title>Отчет по дневному посещению</p-title>
      <m-btn>По клиентам</m-btn>
    </div>
    <ReportsReportVisitFilterCard class="mt-2" />
    <ReportsReportVisitDataTable />
  </div>
</template>
