<template>
  <div>
    <div class="flex flex-col gap-7.5 py-12 px-5">
      <div class="flex justify-between">
        <p-title> Оплаты клиентов </p-title>
        <div class="flex gap-4 items-center" v-click-outside="clickOutside">
          <button
            @click="imports = !imports"
            class="flex rounded-lg bg-[#EFF3F3] px-7 py-2.5"
          >
            <div class="pr-2"><icon-imports /></div>
            <div>Импортировать</div>
          </button>
          <div
            v-if="imports"
            class="rounded-lg w-[161px] h-[117px] top-22.5 border bg-white absolute z-50"
          >
            <div
              @click="importPaymentModal = true"
              class="fs-12 border-b border-[#E1E4E4] m-3 pb-2 cursor-pointer"
            >
              Импорт по ИД
            </div>
            <div
              @click="importCodeModal = true"
              class="fs-12 border-b border-[#E1E4E4] m-3 pb-2 cursor-pointer"
            >
              Импорт по Коду
            </div>
            <div
              @click="importInnModal = true"
              class="fs-12 m-2 pb-2 cursor-pointer"
            >
              Импорт по ИНН
            </div>
          </div>
          <nuxt-link to="/clients/finans/create">
            <m-btn> Добавить оплату </m-btn>
          </nuxt-link>
        </div>
      </div>
      <div>
        <finansFilterCard />
      </div>
      <div class="flex justify-between pt-3">
        <div class="text-[24px] font-[600]">Таблица</div>
        <div class="flex relative">
          <button
            @click="groupProcessModal = true"
            class="flex justify-center fs-14 py-2 px-4 border border-[#299B9B] rounded-lg bg-white ml-3"
          >
            <div><IconFrame :result="result" /></div>
            <div class="fs-14 ml-1 mt-[2px]">Групповая обработка</div>
          </button>
        </div>
      </div>
      <div>
        <FinansDataTable />
      </div>
    </div>
    <transition name="modal">
      <div v-if="groupProcessModal">
        <d-modal
          @closeDialog="groupProcessModal = false"
          :dataContainerWidth="'1325px'"
          :name="'Групповая обработка'"
        >
          <lazy-clients-payment-customers-group-process-dialog />
        </d-modal>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="importPaymentModal">
        <d-modal-import
          @closeDialog="importPaymentModal = false"
          :dataContainerWidth="'812px'"
          :name="'Импорт оплаты по ID'"
        >
          <clients-payment-import-dialog />
        </d-modal-import>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="importCodeModal">
        <d-modal-import
          @closeDialog="importCodeModal = false"
          :dataContainerWidth="'812px'"
          :name="'Импорт по Коду'"
        >
          <clients-payment-customers-import-code-dialog />
        </d-modal-import>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="importInnModal">
        <d-modal-import
          @closeDialog="importInnModal = false"
          :dataContainerWidth="'812px'"
          :name="'Импорт по ИНН'"
        >
          <clients-payment-customers-import-inn-dialog />
        </d-modal-import>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const imports = ref(false);
const importPaymentModal = ref(false);
const importCodeModal = ref(false);
const importInnModal = ref(false);
const groupProcessModal = ref(false);
const result = ref({
  resultTable: true,
});
const clickOutside = () => {
  imports.value = false;
};
</script>

<style></style>
