<template>
  <div class="py-11 px-5 w-full">
    <div class="flex justify-between">
      <h3 class="font-semibold text-2xl text-black text-gray-3">
        Дневной отчёт
      </h3>
      <div class="flex gap-24px">
        <div class="flex gap-18px items-center">
          <div class="fs-12 my-2 font-normal fs-14">Тип</div>
          <div
            @click="filter.isSelectType = !filter.isSelectType"
            class="flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-48 gap-14px"
          >
            <div class="ml-4 mt-2 arrow-icon">
              <IconArrowBottom />
            </div>
            <div class="fs-14 ml-2 text-gray-3">Мерчендайзер</div>
          </div>
        </div>
        <DatePicker />
      </div>
    </div>
    <div class="grid grid-cols-5 gap-5 mt-4">
      <auditDailyReportBox
        :boxTitle="'Посещения'"
        :mainPercentage="0"
        :planPercentage="0"
        :factPercentage="0"
        class="bg-[#23c00a1a]"
      />
      <auditDailyReportBox
        :boxTitle="'Аудит'"
        :mainPercentage="0"
        :planPercentage="0"
        :factPercentage="0"
        class="bg-[#bd7f061a]"
      /><auditDailyReportBox
        :boxTitle="'Опрос'"
        :mainPercentage="0"
        :planPercentage="0"
        :factPercentage="0"
        class="bg-[#F6ECFF]"
      /><auditDailyReportBox
        :boxTitle="'Фотоотчёты'"
        :mainPercentage="0"
        :planPercentage="0"
        :factPercentage="0"
        class="bg-[#ECEBF4]"
      />
      <auditDailyReportBox
        :boxTitle="'GPS'"
        :mainPercentage="0"
        :planPercentage="0"
        :factPercentage="0"
        class="bg-[#ECEBF4]"
      />
    </div>
    <div class="flex justify-between pt-10">
      <div class="flex gap-24px items-center">
        <h3 class="font-semibold text-2xl text-black text-gray-3">Таблица</h3>
        <excel-btn :size="'300kb'" />
      </div>
      <m-btn-outlined class="border-color-primary bg-white">
        Все картинки
      </m-btn-outlined>
    </div>
    <auditDailyReportDataTable />
  </div>
</template>

<script setup>
</script>

<style scoped>
/* .container {
  background-color: #f2f5f5 !important;
} */
</style>