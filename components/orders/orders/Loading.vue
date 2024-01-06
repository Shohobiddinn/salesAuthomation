<template>
  <div>
    <div class="grid grid-cols-3 gap-4">
      <multiply-selection class="mt-1" :filter.sync="filter.isProductStatus" @toggle="toggle => filter.isProductStatus = toggle" :name="'Статус товара'"/>
      <multiply-selection class="mt-1" :filter.sync="filter.isProductStatus" @toggle="toggle => filter.isProductStatus = toggle" :name="'Категории продуктов'"/>
      <multiply-selection class="mt-1" :filter.sync="filter.isProductStatus" @toggle="toggle => filter.isProductStatus = toggle" :name="'Категории продуктов'"/>
    </div>
    <div class="flex justify-end mt-6 mb-3">
      <m-btn>Загрузить одним файлом</m-btn>
    </div>
  </div>
  <div class="w-full border"></div>
  <div>
    <page-title20 :title="'Загрузить отдельными файлами'"></page-title20>
  </div>
  <div v-click-outside="outside" class="flex gap-4 mt-3 relative">
    <SettingsButton @click="download = !download" :title="'Загрузить зав склад'"/>
    <SettingsButton :title="'Загрузить Экспедитор'"/>
    <SettingsButton :title="'Накладные'"/>
    <SettingsButton :title="'Реестр'"/>
    <div v-show="download" class="bg-white px-4 border absolute top-12 rounded-lg">
      <button v-for="i in 6" class="flex gap-4 py-2 border-b border-gray-40">
        <span><IconDownload/></span>
        <span class="fs-14 fw-4">110 загруз зав склада</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import SettingsButton from "~/components/global/SettingsButton.vue";
const download = ref(false)
const filter = ref({
  isProductStatus: false,
  isProductCategory: false,
  isProductGroup: false
})
function outside(){
  download.value = false
}
</script>

<style scoped>

</style>
