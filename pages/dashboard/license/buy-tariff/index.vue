<template>
  <flex-col class="gap-6 py-7.5 px-5">
    <back-btn @click="$router.go(-1)" class="w-1/8 mt-1.5"></back-btn>
    <p-title class="mt-1.5">Выберите тариф и период</p-title>
    <flex-row class="gap-4.5 items-center">
      <div>Эспедитор</div>
      <multiply-selections
        :filter="isSelectExpeditor"
        :h="true"
        v-click-outside="() => (isSelectExpeditor = false)"
        @toggle="(toggle) => (isSelectExpeditor = toggle)"
        class="w-1/5"
      />
    </flex-row>
    <flex-row class="gap-5">
      <DashboardLicenseTariffPlan v-for="item in 4" :key="item" class="w-1/4" />
    </flex-row>
    <flex-col class="gap-2 justify-center items-center w-full">
      <div class="text-xl font-medium secondary-gray-text">Или</div>
      <div class="text-black font-medium text-xl mt-2.5">
        Можете выбрать 10-20 дней
      </div>
      <div class="text-xs secondary-gray-text">
        Eсли вы начнете работать с середины месяца {{ getCurrentYear }}
      </div>
      <flex-row class="gap-3 pt-4 w-full justify-center items-center">
        <nuxt-link
          to="/dashboard/license/buy-tariff/choose-amount-tariff"
          class="w-2/7"
        >
          <filtr-btn class="w-full h-11">Выбрать 10 дней</filtr-btn>
        </nuxt-link>
        <nuxt-link
          to="/dashboard/license/buy-tariff/choose-amount-tariff"
          class="w-2/7"
        >
          <filtr-btn class="w-full h-11">Выбрать 20 дней</filtr-btn>
        </nuxt-link>
      </flex-row>
    </flex-col>
  </flex-col>
</template>

<script setup lang="ts">
import moment from "moment";
const isSelectExpeditor = ref(false);
const getCurrentYear = ref(moment().format("YYYY"));
</script>

<style>
</style>