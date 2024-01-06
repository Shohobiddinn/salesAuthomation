<template>
  <div class="py-9 px-5 flex flex-col gap-7.5">
    <div class="flex justify-between">
      <p-title>Лицензия</p-title>
      <nuxt-link to="/dashboard/license/payment-history">
        <m-btn-outlined class="bg-white">
          <flex-row class="gap-2 items-center">
            <IconHistory />
            <div>История платежей / акт сверки</div>
          </flex-row>
        </m-btn-outlined>
      </nuxt-link>
    </div>
    <flex-row class="gap-5">
      <div class="w-[40%] flex flex-col gap-5">
        <DashboardLicenseMyBalance
          :balanceAmount="100000000"
          :description="'Баланс дилера'"
          @onReplanishBalance="isReplanishBalance = true"
        />
        <rounded-white-container>
          <div class="text-gray-3 text-lg font-semibold">Инструкция</div>
          <!-- Video uchun joy -->
          <div></div>
        </rounded-white-container>
      </div>
      <div class="w-[60%]">
        <rounded-white-container class="flex flex-col gap-6">
          <div class="text-gray-3 text-lg font-semibold">Активные лицензии</div>
          <DashboardLicenseDataTable @onReplaceLicense="onReplaceLicense" />
        </rounded-white-container>
      </div>
    </flex-row>
    <transition name="modal">
      <div v-if="isReplanishBalance">
        <d-modal
          @closeDialog="isReplanishBalance = false"
          :name="'Пополнение баланса'"
        >
          <DashboardLicenseReplanishBalancePopup />
        </d-modal>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="isReplaceLicense">
        <d-modal
          @closeDialog="isReplaceLicense = false"
          :name="`Заменить (за ${currentDate})`"
        >
          <DashboardLicenseReplaceLicensePopup />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
const isReplanishBalance = ref(false);
const isReplaceLicense = ref(false);
const currentDate = ref(moment().format("MMMM, YYYY"));

const onReplaceLicense = (data: object) => {
  console.log(data);

  isReplaceLicense.value = true;
};
</script>

<style></style>
