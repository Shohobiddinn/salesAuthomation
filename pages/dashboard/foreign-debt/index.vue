<template>
  <div>
    <div>
      <div class="flex justify-between mt-7">
        <page-title :title="'Tashqi qarzdorlik'" />
        <div class="flex gap-5">
          <m-btn @click="foreignShow = true" class="w-53">Добавить</m-btn>
        </div>
      </div>
      <div class="mt-5">
        <DashboardForeignDebtDataTable />
      </div>
    </div>
    <transition name="modal">
      <div v-if="foreignShow">
        <d-modal
          @closeDialog="closeForeign"
          :dataContainerWidth="'400px'"
          :name="'Добавить новый долг'"
        >
          <div class="relative w-full">
            <DashboardForeignDebtDialog />
          </div>
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
const foreignShow = ref(false);
function closeForeign() {
  foreignShow.value = false;
}
</script>

<style scoped></style>
