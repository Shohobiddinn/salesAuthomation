<template>
  <div>
    <button
      @click="$router.push('/clients/combining-clients')"
      class="h-[44px] px-[46px] mt-8 bg-[#FFFFFF] text-black rounded-lg border"
    >
      <div class="flex">
        <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
        Назад
        <slot></slot>
      </div>
    </button>
    <div class="w-full">
      <div class="flex mt-6 w-[60%] rounded-lg bg-white border">
        <button
          @click="clickActive"
          :class="sms.isActive ? 'active' : ''"
          class="w-full w-[40%] tex h-full flex py-3"
        >
          <div class="ml-2"><IconLightingAlt :isActive="sms.isActive" /></div>
          <div class="text-center ml-3 fs-14">Активные смс пакеты</div>
        </button>
        <button
          @click="clickPay"
          :class="sms.isPay ? 'active' : ''"
          class="w-full w-[35%] tex h-full flex py-3"
        >
          <div class="ml-2 mt-[5px]"><IconShoppingCartSVG /></div>
          <div class="text-center ml-3 fs-14 mt-[2px]">Купить смс пакеты</div>
        </button>
        <button
          @click="clickShablon"
          :class="sms.isShablon ? 'active' : ''"
          class="w-full w-[25%] tex h-full flex py-3"
        >
          <div class="ml-2"><IconInvoice :isActive="sms.isShablon" /></div>
          <div class="text-center ml-3 fs-14">Шаблон смс</div>
        </button>
      </div>
    </div>
    <div v-show="sms.isActive">
      <ClientsSendingSmsActive />
    </div>
    <div v-show="sms.isPay">
      <ClientsSendingSmsBuySmsPackage />
    </div>
    <div v-show="sms.isShablon">
      <ClientsSendingSmsShablon />
    </div>
  </div>
</template>

<script setup>
const sms = ref({
  isActive: false,
  isPay: false,
  isShablon: false,
});
function clickActive() {
  sms.value.isActive = true;
  sms.value.isPay = false;
  sms.value.isShablon = false;
}
function clickPay() {
  sms.value.isActive = false;
  sms.value.isPay = true;
  sms.value.isShablon = false;
}
function clickShablon() {
  sms.value.isActive = false;
  sms.value.isPay = false;
  sms.value.isShablon = true;
}
</script>

<style scoped>
.active {
  background: #299b9b;
  color: white;
}
.tex:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border: 1px solid #f0f1f1;
}
.tex:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid #f0f1f1;
}
</style>
