<template>
  <div>
    <div class="flex justify-between mt-7">
      <page-title :title="'Табел'"/>
      <div class="flex gap-5">
        <div class="flex gap-5">
          <div class="flex-row mt-4">
            <span class="text-gray-3 fs-14 fw-4">
              Должность
            </span>
          </div>
          <div class="flex-row mt-3">
            <select class="border max-w-65 min-w-50 h-10 bg-[#FAFDFD] rounded-lg ">
              <option value="">Выбрать</option>
              <option value="">hello</option>
              <option value="">hello</option>
              <option value="">hello</option>
            </select>
          </div>
        </div>
        <div class="flex gap-5">
          <div class="flex-row mt-4">
            <span class="text-gray-3 fs-14 fw-4">
              Сотрудник
            </span>
          </div>
          <div class="flex-row mt-3">
            <select class="border max-w-65 min-w-50 h-10 bg-[#FAFDFD] rounded-lg ">
              <option value="">Выбрать</option>
              <option value="">hello</option>
              <option value="">hello</option>
              <option value="">hello</option>
            </select>
          </div>
        </div>
        <div class="mt-3">
          <date-picker/>
        </div>
        <flex-row class="h-full items-end gap-2">
          <m-btn class="w-50 h-9.5">
            Применить
          </m-btn>
          <sm-btn class="px-4 py-3">
            <IconReloadSVG/>
          </sm-btn>
        </flex-row>
      </div>
    </div>
    <div class="mt-5">
      <DashboardTableDataTable/>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>
