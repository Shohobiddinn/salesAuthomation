<template>
  <div>
    <RoundedWhiteContainer>
      <div
        class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
      >
        <div>
          <span class="text-lg font-semibold"> 13. Категория фотоотчёта </span>
        </div>
        <div class="flex justify-self-end">
          <!--        <div>-->
          <!--          <button @click="" class="bg-[#057CD1] p-[13px] rounded-lg mr-2">-->
          <!--            <IconHamburgerMenuSVG/>-->
          <!--          </button>-->
          <!--        </div>-->
          <m-btn @click="dialogStore.openDialog" class="justify-self-auto">
            Добавить причину
          </m-btn>
        </div>
      </div>
      <DoubleTab
        first-tab-name="Активный"
        second-tab-name="Не активный"
        @change="dataGet"
      >
        <template #first>
          <SettingsPhotoReportCategoriesTableData
            :photoReportCategoriesStore="photoReportCategoriesStore"
          />
        </template>
        <template #second>
          <SettingsPhotoReportCategoriesTableData
            :photoReportCategoriesStore="photoReportCategoriesStore"
          />
        </template>
      </DoubleTab>

    </RoundedWhiteContainer>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal
          @closeDialog="dialogStore.closeDialog"
          name="Категория фотоотчёта"
        >
          <SettingsPhotoReportCategoriesDataDialog :photoReportCategoriesStore="photoReportCategoriesStore"/>
        </d-modal>
      </div>
    </transition>
    <loading-modal v-if="photoReportCategoriesStore.loading"
                   name="Управление меню таблицы">
      <Loading/>
    </loading-modal>
  </div>
</template>

<script setup lang="ts">
const dialogStore = useDialogStore("photo_report_categories");
const photoReportCategoriesStore = usePhotoReportCategoriesStore("");
function dataGet(param: any) {
  if (param === 1) {
    photoReportCategoriesStore.getData(true);
  } else if (param === 2) {
    photoReportCategoriesStore.getData(false);
  }
}
// Hooks
onMounted(() => {
  photoReportCategoriesStore.getData(true);
});
</script>

<style scoped></style>
