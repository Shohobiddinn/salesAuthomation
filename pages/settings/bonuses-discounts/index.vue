<template>
  <div>
    <RoundedWhiteContainer>
      <div class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center">
        <div>
          <span class="text-lg font-semibold"> 15. Бонусы и скидки </span>
        </div>
      </div>
      <DoubleTab
        first-tab-name="Бонусы"
        second-tab-name="Ручные бонусы"
        third-tab-name="Авто скидки"
        fourth-tab-name="Ручные скидки"
        @change="activeTab = $event"
      >
        <template #first v-if="activeTab === 1">
          <SettingsBonusesDiscountsAutoTable :isActive="true" />
        </template>
        <template #second v-if="activeTab === 2">
          <SettingsBonusesDiscountsManualTable :isActive="true" />
        </template>
        <template #third v-if="activeTab === 3">
          <SettingsBonusesDiscountsAutoDiscountTable :isActive="true" />
        </template>
        <template #fourth v-if="activeTab === 4">
          <SettingsDataTable :isActive="true" />
        </template>
      </DoubleTab>
      <div class="rounded-lg grid grid-cols-4 border border-[#299B9B] w-[90%] mt-4">
        <button
          @click="$router.push('/settings/bonuses-discounts/create-auto-bonus')"
          class="py-2 fs-14 border-[#299B9B] border-r"
        >
          Создать бонус
        </button>
        <button
          @click="$router.push('/settings/bonuses-discounts/create-bonus')"
          class="py-2 fs-14 border-[#299B9B] border-r"
        >
          Создать ручной бонус
        </button>
        <button
          @click="$router.push('/settings/bonuses-discounts/create-auto-discount')"
          class="py-2 fs-14 border-[#299B9B] border-r"
        >
          Создать автоскидку
        </button>
        <button class="fs-14 border-[#299B9B]" @click="dialogStore.openDialog">
          Создать Ручную скидку
        </button>
      </div>
    </RoundedWhiteContainer>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal @closeDialog="dialogStore.closeDialog" :name="'Ручные скидки'">
          <SettingsBonusesDiscountsManualDiscountDialog />
        </d-modal>
      </div>
    </transition>
  </div>
</template>
<script setup>
// State
const dialogStore = useDialogStore("manual-discount");

// State
const activeTab = ref(1);
</script>
