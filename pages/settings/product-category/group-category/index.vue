<template>
  <div>
    <div>
      <div class="flex flex-row w-full">
        <white-btn @click="$router.go(-1)">
          <fa-icon hash="&#xf060"/> Назад
        </white-btn>
      </div>
      <div class="grid grid-cols-2 mt-4 items-center w-full">
        <div>
          <span class="text-[24px] fw-6 text-gray-3"> Группа категория </span>
        </div>
        <div class="justify-self-end">
          <m-btn @click="isDialogOpen = true"> Добавить </m-btn>
        </div>
      </div>
      <div class="mt-4">
        <SettingsProductCategoryGroupData />
      </div>
    </div>
    <transition name="modal">
      <div v-if="isDialogOpen">
        <d-modal @closeDialog="isDialogOpen = false" name="Группа категория">
          <SettingsProductCategoryGroupNewGroupBody @closeDialog="isDialogOpen = false" />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
// State
const isDialogOpen = ref(false);
</script>
