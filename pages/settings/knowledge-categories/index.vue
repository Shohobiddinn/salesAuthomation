<template>
  <div>
    <RoundedWhiteContainer>
      <div
        class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
      >
        <div>
          <span class="text-lg font-semibold"> 25. Тип базы знания </span>
        </div>
        <div class="justify-self-end">
          <m-btn @click="dialogStore.openDialog" class="justify-self-auto">
            Добавить тип базы знаний
          </m-btn>
        </div>
      </div>
      <DoubleTab first-tab-name="Активный" second-tab-name="Не активный">
        <template #first>
          <SettingsKnowledgeCategoriesTableData :is-active="true" />
        </template>
        <template #second>
          <SettingsKnowledgeCategoriesTableData :is-active="false" />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal
          @closeDialog="dialogStore.closeDialog"
          :name="dialogStore?.singleData?.id ? 'Сохранить тип базы знаний' : 'Добавить тип базы знаний'"
        >
          <SettingsKnowledgeCategoriesDataDialog />
        </d-modal>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
// region Stores

const dialogStore = useDialogStore("knowledge_categories");
const rolesStore = useRolesStore();

// endregion

// region Hooks

onMounted(() => {
  rolesStore.getData();
});

// endregion
</script>

<style scoped></style>
