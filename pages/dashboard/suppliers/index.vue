<template>
  <div>
    <div>
      <div class="flex justify-between mt-7">
        <page-title :title="'Поставщики'" />
        <m-btn @click="openSuppliers = true" class="w-53 mt-2">Добавить</m-btn>
      </div>
      <div class="mt-4">
        <DashboardSuppliersDataTable />
      </div>
    </div>
    <transition name="modal">
      <div v-if="openSuppliers">
        <d-modal @closeDialog="closeModal" :name="'Добавить поставщика'">
          <DashboardSuppliersDataDialog @closeDialog="closeModal" />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
const openSuppliers = ref(false);
function closeModal() {
  openSuppliers.value = false;
}
</script>

<style scoped></style>
