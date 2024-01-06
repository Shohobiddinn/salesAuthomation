<template>
  <div>
    <div class="flex justify-between mt-[23px] mb-[18px]">
      <div class="fw-6 fs-24 text-[#424F4F]">По территориям</div>
      <div class="flex items-center gap-[18px]">
        <div class="fw-4 fs-16 text-[#000000]">Филиал</div>

        <div><MultiSelect /></div>

        <div>
          <DatePicker />
        </div>

        <div>
          <flex-row class="h-full w-full gap-2">
            <m-btn class="w-[80%] mx-w-60"> Применить </m-btn>
            <sm-btn class="px-4 py-3">
              <IconReloadSVG />
            </sm-btn>
          </flex-row>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <GeneralReportDataTable />
    </div>

    <div class="fw-6 fs-24 text-[#424F4F] mb-4">По территориям</div>

    <div class="mb-6">
      <GeneralReportBranchDataTable />
    </div>
  </div>
</template>
