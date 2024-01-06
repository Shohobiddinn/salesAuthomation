<template>
  <rounded-white-container class="flex flex-col gap-4.5">
    <div class="text-gray-3 text-lg font-semibold">Мой баланс</div>
    <flex-row class="items-center gap-4.5">
      <div
        class="bg-[#E9F5FC] rounded-[50%] w-54px h-54px flex justify-center items-center"
      >
        <IconWallet />
      </div>
      <flex-col class="gap-1">
        <div class="text-black text-lg font-medium">
          {{ balanceAmount }} сум
        </div>
        <div class="text-[#B3B3B3] text-base">{{ description }}</div>
      </flex-col>
    </flex-row>
    <m-btn class="mt-1.5" @click="onReplanishBalance">Пополнить счёт</m-btn>
    <nuxt-link to="/dashboard/license/buy-tariff" class="w-full">
      <button
        class="w-full bg-light-green px-8 h-10.5 fs-14 fw-4 text-white rounded-lg hover:bg-[#28a745] active:bg-[#158103]"
      >
        Купить лицензию
      </button>
    </nuxt-link>
  </rounded-white-container>
</template>

<script setup lang="ts">
const props = defineProps({
  description: String,
  balanceAmount: Number,
});

const emit = defineEmits(["onReplanishBalance"]);

const onReplanishBalance = () => {
  emit("onReplanishBalance");
};
</script>

<style>
</style>