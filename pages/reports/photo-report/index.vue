<template>
  <div>
    <div class="my-6">
      <p-title>Фото отчёты</p-title>
    </div>
    <ReportsPhotoReportFiltr />
    <ReportsPhotoReportDataTable />
    <div class="my-6 flex justify-between">
      <div class="flex gap-2">
        <m-btn>Отработать</m-btn>
        <white-btn>Отработать</white-btn>
      </div>
      <filtr-btn>Все картинки</filtr-btn>
    </div>
    <ReportsPhotoReportModal />
  </div>
</template>
