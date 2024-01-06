<template>
  <div>
    <div>
      <rounded-white-container class="mt-6">
        <page-title :title="'Акт сверки'" />
        <div class="grid grid-cols-2 gap-4">
          <div class="flex gap-5 w-full mt-0.3">
            <div class="w-full">
              <div class="flex-row">
                <span class="text-gray-3 fs-14 fw-4"> Клиент </span>
              </div>
              <div class="flex-row">
                <select
                  class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]"
                >
                  <option value="">Выбрать</option>
                  <option value="">hello</option>
                  <option value="">hello</option>
                  <option value="">hello</option>
                </select>
              </div>
            </div>
            <div class="w-full">
              <div class="flex-row">
                <span class="text-gray-3 fs-14 fw-4"> Клиент </span>
              </div>
              <div class="flex-row">
                <select
                  class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]"
                >
                  <option value="">Выбрать</option>
                  <option value="">hello</option>
                  <option value="">hello</option>
                  <option value="">hello</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div class="fs-12">Выберите дату</div>
            <flex-row
              class="gap-4 mb-2 mt-2 w-full items-center border p-1.7 rounded-lg h-11.5"
            >
              <div class="flex gap-1 w-1/2 border-r-1 items-center h-full">
                <div class="w-full flex gap-1 items-center h-11">
                  <span class="fs-14 text-gray-400 w-1/10 mt-2"> От </span>
                  <DInputDatePicker borderless class="w-9/10 h-full" />
                </div>
              </div>
              <div class="flex gap-1 w-1/2 items-center h-11">
                <div class="w-full flex gap-1 items-center">
                  <span class="text-gray-400 w-1/10"> до </span>
                  <DInputDatePicker borderless class="w-9/10 h-full" />
                </div>
              </div>
            </flex-row>
          </div>
        </div>
        <div class="flex justify-end">
          <flex-row class="h-full flex justify-end gap-2 mt-6">
            <m-btn class="w-full h-9"> Показать результат </m-btn>
            <sm-btn class="px-4 py-2">
              <IconReloadSVG />
            </sm-btn>
          </flex-row>
        </div>
      </rounded-white-container>
    </div>
    <div class="mt-4">
      <page-title :title="'Результаты'" />
    </div>
    <div class="mt-4">
      <DashboardActReconcilition2DataTable />
    </div>
  </div>
</template>

<script setup></script>
