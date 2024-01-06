<template>
  <div class="relative">
    <button @click="$emit('toggle', !imports)" class="flex px-2 mt-2 mr-4">
      <div class="pr-2"><icon-imports /></div>
      <div>Импортировать</div>
    </button>
    <div
      v-if="imports"
      class="rounded-lg w-[161px] h-[117px] top-[40px] border bg-white absolute z-50"
    >
      <div
        @click="groupProcessModal = true"
        class="fs-12 border-b border-[#E1E4E4] m-3 pb-2 cursor-pointer"
      >
        Импорт по ИД
      </div>
      <div class="fs-12 border-b border-[#E1E4E4] m-3 pb-2 cursor-pointer">
        Импорт по Коду
      </div>
      <div class="fs-12 m-2 pb-2 cursor-pointer">Импорт по ИНН</div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="groupProcessModal">
      <d-modal
        @closeDialog="groupProcessDialog"
        :dataContainerWidth="'1325px'"
        :name="'Групповая обработка'"
      >
        <lazy-clients-payment-customers-group-process-dialog />
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  imports: Boolean,
});
const groupProcessModal = ref(false);
function groupProcessDialog() {
  groupProcessModal.value;
}
</script>

<style scoped></style>
