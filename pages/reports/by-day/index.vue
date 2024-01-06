<template>
  <div class="mt-6">
    <page-title :title="'Отчёт по дням'" class="!my-6" />
    <ReportsByDayFiltr />
    <page-title :title="'По агентам'" class="!my-6" />
    <ReportsByDayDataTable />
  </div>
</template>
