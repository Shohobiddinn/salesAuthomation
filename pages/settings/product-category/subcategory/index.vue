<template>
  <div>
    <RoundedWhiteContainer>
    <div class="grid grid-cols-1 justify-items-stretch w-full mb-7 gap-6 items-center">
      <div>
        <transparent-btn @click="$router.push('/settings/product-category')">
          <fa-icon hash="&#xf060"/> Назад
        </transparent-btn>
      </div>
      <div>
        <span class="text-lg font-semibold">
          Подкатегории
        </span>
      </div>
      <div>
        <m-btn @click="dialogStore.openDialog"
               class="justify-self-auto">
          Добавить Подкатегорию
        </m-btn>
      </div>
    </div>
    <DoubleTab first-tab-name="Активный" second-tab-name="Не активный">
      <template #first>
        <SettingsProductCategorySubcategoryActiveData :is-active="true"/>
      </template>
      <template #second>
        <SettingsProductCategorySubcategoryActiveData :is-active="false"/>
      </template>
    </DoubleTab>
  </RoundedWhiteContainer>
  <transition name="modal">
    <div v-if="dialogStore.isDialogOpen">
      
  <d-modal
           @closeDialog="dialogStore.closeDialog"
           name="Добавить подкатегорию">
    <SettingsProductCategorySubcategoryNewDataBody/>
  </d-modal>
    </div>
  </transition>
  </div>
</template>

<script setup>
const dialogStore = useDialogStore("product_sub_category");
</script>

<style scoped>

</style>
