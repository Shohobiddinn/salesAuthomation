<template>
  <rounded-white-container class="flex flex-col gap-4.5 p-4.5">
    <flex-col class="gap-2">
      <div class="text-black text-lg font-medium">1 месяц</div>
      <div class="text-base text-red-3">Экономия 0 сум</div>
    </flex-col>
    <flex-col>
      <flex-row class="justify-between">
        <flex-row class="gap-2">
          <div
            class="w-[14px] h-[14px] rounded-[50%] bg-[#299B9B1F] flex justify-center items-center"
          >
            <IconCheck :color="'#299B9B'" />
          </div>
          <div class="fs-12 text-gray-3">Админ:</div>
        </flex-row>
        <div class="fs-12 text-black">100 000 сум</div>
      </flex-row>
    </flex-col>
    <flex-col>
      <flex-row class="justify-between">
        <flex-row class="gap-2">
          <div
            class="w-[14px] h-[14px] rounded-[50%] bg-[#299B9B1F] flex justify-center items-center"
          >
            <IconCheck :color="'#299B9B'" />
          </div>
          <div class="fs-12 text-gray-3">Админ:</div>
        </flex-row>
        <div class="fs-12 text-black">100 000 сум</div>
      </flex-row>
    </flex-col>
    <flex-col>
      <flex-row class="justify-between">
        <flex-row class="gap-2">
          <div
            class="w-[14px] h-[14px] rounded-[50%] bg-[#299B9B1F] flex justify-center items-center"
          >
            <IconCheck :color="'#299B9B'" />
          </div>
          <div class="fs-12 text-gray-3">Админ:</div>
        </flex-row>
        <div class="fs-12 text-black">100 000 сум</div>
      </flex-row>
    </flex-col>
    <flex-col>
      <flex-row class="justify-between">
        <flex-row class="gap-2">
          <div
            class="w-[14px] h-[14px] rounded-[50%] bg-[#299B9B1F] flex justify-center items-center"
          >
            <IconCheck :color="'#299B9B'" />
          </div>
          <div class="fs-12 text-gray-3">Админ:</div>
        </flex-row>
        <div class="fs-12 text-black">100 000 сум</div>
      </flex-row>
    </flex-col>
    <flex-col>
      <flex-row class="justify-between">
        <flex-row class="gap-2">
          <div
            class="w-[14px] h-[14px] rounded-[50%] bg-[#299B9B1F] flex justify-center items-center"
          >
            <IconCheck :color="'#299B9B'" />
          </div>
          <div class="fs-12 text-gray-3">Админ:</div>
        </flex-row>
        <div class="fs-12 text-black">100 000 сум</div>
      </flex-row>
    </flex-col>
    <flex-col>
      <flex-row class="justify-between">
        <flex-row class="gap-2">
          <div
            class="w-[14px] h-[14px] rounded-[50%] bg-[#299B9B1F] flex justify-center items-center"
          >
            <IconCheck :color="'#299B9B'" />
          </div>
          <div class="fs-12 text-gray-3">Админ:</div>
        </flex-row>
        <div class="fs-12 text-black">100 000 сум</div>
      </flex-row>
    </flex-col>
    <flex-col>
      <flex-row class="justify-between">
        <div class="fs-12 text-gray-3">Всего</div>
        <div class="fs-12 text-[#299B9B] font-semibold">100 000 сум</div>
      </flex-row>
    </flex-col>
    <nuxt-link to="/dashboard/license/buy-tariff/choose-amount-tariff/">
      <m-btn class="w-full">Обменить</m-btn>
    </nuxt-link>
  </rounded-white-container>
</template>

<script>
export default {};
</script>

<style>
</style>