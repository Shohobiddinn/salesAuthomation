<template>
  <flex-col class="w-full gap-6 py-6 justify-center items-center">
    <div
      class="w-full flex items-center justify-center border-1 rounded-large py-5 gap-3 bg-lotion"
    >
      <div>
        <IconUnlock />
      </div>
      <div class="text-gray-3 fs-14">Лицензия Доставщик (100 000 / мес)</div>
      <div class="text-gray-3 font-semibold fs-14">{{ licenseAmount }} шт</div>
    </div>
    <flex-col>
      <div class="flex items-center">
        <div class="text-gray-3 text-base w-3/5 mb-2.5">Заменить на</div>
        <label for="licenseAmount" class="w-2/5 mb-2.5">Кол-во</label>
      </div>
      <div class="rounded-lg border-1 flex w-full">
        <multiply-selections
          :filter="isSelectPackage"
          :name="'Выберите пакет'"
          :h="true"
          :borderless="true"
          v-click-outside="() => (isSelectPackage = false)"
          @toggle="(toggle) => (isSelectPackage = toggle)"
          class="w-3/5 h-full"
        />
        <span class="h-full w-[1px] bg-[#D2D7D7]"></span>
        <DInput
          :form="true"
          :id="'licenseAmount'"
          :type="'text'"
          :value="licenseAmount"
          :borderless="true"
          @change="onChangeLicenseAmount"
          class="h-11 w-2/5 bg-lotion"
        />
      </div>
    </flex-col>
    <m-btn class="w-full">Обменить</m-btn>
  </flex-col>
</template>

<script setup lang="ts">
const isSelectPackage = ref(false);
const licenseAmount = ref(1);

const onChangeLicenseAmount = (newValue: any) => {
  licenseAmount.value = newValue;
};
</script>

<style>
</style>