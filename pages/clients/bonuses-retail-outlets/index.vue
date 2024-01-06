<template>
  <div>
    <div>
      <div class="flex justify-between mt-2">
        <page-title :title="'Остатки в торговых точках'" />
        <div class="flex mt-3">
          <button
            class="bg-white rounded-lg border border-[#299B9B] hover:bg-blue-50 py-2 px-4 mr-4"
          >
            Базовая представленность
          </button>
          <m-btn @click="pratcentSaleModal = true">Коффициент продажа</m-btn>
        </div>
      </div>
      <div class="mt-4">
        <ClientsBonusesRetailOutletsFilter :filterByActiveTab="activeTab"/>
      </div>
      <div class="mt-4">
        <DoubleTab first-tab-name="По продуктам" second-tab-name="По категории" @change="activeTab = $event">
          <template #first>
            <ClientsBonusesRetailOutletsProductDataTable :is-active="activeTab === 1"/>
          </template>
          <template #second>
            <ClientsBonusesRetailOutletsCategorydataTable :is-active="activeTab === 2"/>
          </template>
        </DoubleTab>
      </div>
      <div class="flex mt-3">
        <button
          class="bg-white rounded-lg border hover:bg-blue-50 border-[#299B9B] py-2 px-4 mr-4"
        >
          Скачать шаблон
        </button>
        <m-btn>Загрузить шаблон</m-btn>
      </div>
    </div>
    <transition name="modal">
      <div v-if="pratcentSaleModal">
        <d-modal
          @closeDialog="pratcentSaleDialog"
          :dataContainerWidth="'618px'"
          :name="'Установите коэффициент продажа'"
        >
          <ClientsBonusesRetailOutletsPratsentsaleDialog />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
const activeTab = ref(1)
const pratcentSaleModal = ref(false);
function pratcentSaleDialog() {
  pratcentSaleModal.value = false;
}
</script>

<style scoped></style>
