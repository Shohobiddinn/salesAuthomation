<template>
  <div class="mt-8">
    <rounded-white-container class="mt-6">
      <page-title title="Акт сверки с поставщиком" />

      <DashboardActReconcilitionExpeditorFilterCard />
    </rounded-white-container>
    <div class="flex justify-between mt-4">
      <div><page-title title="Таблица"></page-title></div>
      <div>
        <button class="p-1.5 px-4 rounded-lg border border-blue-20 mt-2">
          <div class="flex">
            <div><IconPrinter :act="true" /></div>
            <div class="ml-2 fs-14">Печать</div>
          </div>
        </button>
      </div>
    </div>
    <div class="mt-4">
      <DashboardActReconcilitionExpeditorDataTable />
    </div>
  </div>
</template>
