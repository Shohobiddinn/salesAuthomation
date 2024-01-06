<template>
  <div>
    <div>
      <rounded-white-container>
        <div class="flex justify-between">
          <div class="text-[18px] font-[600]">1. Мерчандайзеры</div>
          <div class="flex">
            <button
              @click="configurationCompanyModal = true"
              class="py-2 rounded-lg px-8 bg-[#057CD1] text-white mr-4"
            >
              Конфигурация для компании
            </button>
            <m-btn @click="auditorModal = true">Добавить</m-btn>
          </div>
        </div>
        <DoubleTab first-tab-name="Активный" second-tab-name="Не активный">
          <template #first>
            <CommandTeamsAuditorsActiveData :is-active="true" />
          </template>
          <template #second>
            <CommandTeamsAuditorsNoActiveData :is-active="false" />
          </template>
        </DoubleTab>
      </rounded-white-container>
    </div>
    <transition name="modal">
      <div v-if="configurationCompanyModal">
        <d-modal
          :dataContainerWidth="'541px'"
          @closeDialog="configurationCompanyDialog"
          :name="'Конфигурация для компании'"
        >
          <div class="relative">
            <CommandTeamsAuditorsConfigurationCompanyDialog
              @closeDialog="configurationCompanyDialog"
            />
          </div>
        </d-modal>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="auditorModal">
        <d-modal @closeDialog="auditorDialog" :name="'Добавить Мерчандайзера'">
          <CommandTeamsAuditorsDialogBody @closeDialog="auditorDialog" />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
const configurationCompanyModal = ref(false);
function configurationCompanyDialog() {
  configurationCompanyModal.value = false;
}
const auditorModal = ref(false);
function auditorDialog() {
  auditorModal.value = false;
}
</script>

<style scoped></style>
