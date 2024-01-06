<template>
  <div>
    <div>
      <div class="flex justify-between mt-7">
        <page-title :title="'Кассы'" />
        <div class="flex gap-5">
          <m-btn @click="dialogStore.openDialog" class="w-53">Добавить</m-btn>
        </div>
      </div>

      <div class="mt-5">
        <section>
          <div>
            <div
              class="w-full overflow-auto pb-3 bg-white mb-2 rounded-lg border-grey"
            >
              <DashboardCheckoutDataTable :items="tableRows" />
            </div>
          </div>
        </section>
      </div>
    </div>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal
          @closeDialog="dialogStore.closeDialog"
          :name="
            dialogStore?.singleData?.id
              ? 'Изменить кассы'
              : 'Добавление кассы'
          "
          :dataContainerWidth="'400px'"
        >
          <DashboardCheckoutDialog />
        </d-modal>
      </div>
    </transition>
    <loading-modal v-if="cashboxesStore.isLoading" name="Управление меню таблицы">
      <Loading />
    </loading-modal>
  </div>
</template>

<script lang="ts" setup>
// Store
const cashboxesStore = useCashboxesStore();
const dialogStore = useDialogStore("cashboxes");


// Hooks
onMounted(async () => {
  await cashboxesStore.refresh();
});

</script>

<style scoped>
.tdc:last-child {
  display: flex;
  justify-content: end;
  padding-right: 18px;
}
</style>
