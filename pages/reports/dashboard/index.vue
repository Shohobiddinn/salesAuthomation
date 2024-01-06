<template>
  <div class="mt-4">
    <DoubleTab
      first-tab-name="Итого"
      second-tab-name="Информации"
      third-tab-name="Лимит"
      fourth-tab-name="Dashboard"
      fifth-tab-name="Сводка"
      borderless
    >
      <template #first>
        <ReportsDashboardFiltr />
        <div class="my-4">
          <page-title :title="'По супервайзерам'" />
        </div>
        <ReportsDashboardAllDataTable />
        <ReportsDashboardAllDataTableTwo />
      </template>
      <template #second>
        <div class="mt-4">
          <ReportsDashboardFiltr />
        </div>
        <div class="mt-4">
          <ReportsDashboardDataTable />
        </div>
      </template>
      <template #third>
        <ReportsDashboardLimitDataTable />
      </template>
      <template #fourth>
        <ReportsDashboardFiltr />
        <div>
          <div class="my-5">
            <page-title-20 :title="'Ноллаш бўйича умумий маълумот'" />
          </div>
          <ReportsDashboardBarChart />
          <div class="grid grid-cols-2 gap-5 mt-5">
            <ReportsDashboardDoughnutChart />
            <ReportsDashboardBarChart />
          </div>
        </div>
      </template>
      <template #fifth>
        <ReportsDashboardFiltr />
        <div class="mt-6">
          <ReportsDashboardSummaryDatatable />
        </div>
      </template>
    </DoubleTab>
  </div>
</template>
