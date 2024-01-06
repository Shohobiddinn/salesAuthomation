<template>
  <div>
    <div class="flex justify-between mt-4">
      <button
        @click="$router.push('/clients/contacts')"
        class="h-[44px] px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border"
      >
        <div class="flex">
          <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
          Назад
          <slot></slot>
        </div>
      </button>
      <div class="mt-5">
        <button
          @click="productModal = true"
          class="bg-[#299B9B] text-white rounded-lg py-2 px-20"
        >
          Добавить
        </button>
      </div>
    </div>
    <div>
      <page-title class="mt-2" :title="'Пакеты продуктов'" />
    </div>
    <div class="mt-4">
      <ClientsContactsPackageDataTable />
    </div>
    <transition name="modal">
      <div v-if="productModal">
        <d-modal
          @closeDialog="productDialog"
          :dataContainerWidth="'590px'"
          :name="'Добавить'"
        >
          <ClientsContactsProductPackageDialog />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
const productModal = ref(false);
function productDialog() {
  productModal.value = false;
}
</script>

<style scoped></style>
