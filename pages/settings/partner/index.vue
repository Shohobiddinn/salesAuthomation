<template>
  <div>
    <RoundedWhiteContainer>
      <div class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center">
        <div>
          <span class="text-lg font-semibold"> 18. Партнеры </span>
        </div>
        <div class="flex justify-self-end">
          <m-btn @click="openPartnerModal = true" class="justify-self-auto w-60">
            Добавить нового партнера
          </m-btn>

          <filtr-btn class="ml-3">
            <nuxt-link to="/settings-page/partner-tranzaction">Транзакция</nuxt-link>
          </filtr-btn>
        </div>
      </div>

      <DoubleTab first-tab-name="Активный" second-tab-name="Не акный" @change="activeTab = $event">
        <template #first>
          <SettingsPartnerActiveData :is-active="activeTab === 1" :store-status="true" />
        </template>
        <template #second>
          <SettingsPartnerActiveData :is-active="activeTab === 2" :store-status="false" />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>

    <transition name="modal">
      <div v-if="openPartnerModal">
        <d-modal @closeDialog="openPartnerModal = false" name="Добавить нового партнерa">
          <div class="relative">
            <SettingsPartnerDialogBody @closeDialog="openPartnerModal = false" />
          </div>
        </d-modal>
      </div>
    </transition>
  </div>
</template>
<script setup>
const dialogStore = useDialogStore("partner");
// State
const openPartnerModal = ref(false);
const activeTab = ref(1);
</script>
