<template>
  <div class="flex flex-col gap-7.5 py-9 px-5">
    <div class="flex justify-between items-center">
      <p-title>Накопительный бонус</p-title>
      <m-btn>По клиентам</m-btn>
    </div>
    <ReportsBonusAccumulationFilterCard class="mt-2" />
    <ReportsBonusAccumulationDataTable />
  </div>
</template>
