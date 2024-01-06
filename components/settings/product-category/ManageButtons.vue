<template>
  <div class="grid grid-cols-3 mt-4 w-full items-center">
    <div class="flex flex-row gap-3 col-span-2">
      <dm-btn class="" @click="draggable = true">
        <IconHamburgerMenuSVG />
      </dm-btn>
      <m-btn @click="dialogStore.openDialog"> Добавить категорию </m-btn>
      <m-btn-outlined
        @click="$router.push('/settings/product-category/group-category')"
      >
        Группа категорий
      </m-btn-outlined>
    </div>
    <div class="flex-col justify-self-end">
      <transparent-btn
        @click="$router.push('/settings/product-category/subcategory')"
        class="justify-self-end"
      >
        Под категории
        <fa-icon hash="&#xf061"/>
      </transparent-btn>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Сортировка категорий'">
        <drag-and-drop></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="dialogStore.isDialogOpen">
      <d-modal @closeDialog="dialogStore.closeDialog" :name="dialogStore?.singleData?.id ? 'Сохранить категорию' : 'Добавить категорию'">
        <SettingsProductCategoryNewCategoryBody/>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// Store
const dialogStore = useDialogStore("product_category");

// State
const draggable = ref(false);

// Methods
function draggableDialog() {
  draggable.value = false;
}
</script>
