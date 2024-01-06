<template>
  <div>
    <div>
      <div class="flex justify-between mt-7">
        <page-title :title="'Остатки денежных средств'" />
        <div class="flex gap-5">
          <div class="mt-2">
            <date-picker />
          </div>
          <flex-row class="h-full items-end gap-2">
            <m-btn class="w-50 h-9.5"> Применить </m-btn>
            <sm-btn class="px-4 py-3">
              <IconReloadSVG />
            </sm-btn>
          </flex-row>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <DashboardCashBalanceDataTable />
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
};
</script>

<style scoped></style>
