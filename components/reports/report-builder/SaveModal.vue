<template>
  <flex-col class="w-full gap-3">
    <label for="reportName">Название отчёта</label>
    <DInput
      :form="true"
      :id="'reportName'"
      :placeholder="'Введите Ф.И.О'"
      :type="'text'"
      :value="reportName"
      @change="setReportName"
      class="h-11 w-full"
    />
    <nuxt-link :to="`/reports/report-builder/${reportName}`"
      ><m-btn class="mt-3 w-full" :class="!reportName && 'cursor-not-allowed'"
        >Добавить</m-btn
      ></nuxt-link
    >
  </flex-col>
</template>

<script setup lang="ts">
const reportName = ref("");

const setReportName = (newValue: string) => {
  reportName.value = newValue;
};
</script>

<style>
</style>