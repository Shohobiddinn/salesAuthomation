<template>
  <div class="py-9 px-5" v-click-outside="clickOutside">
    <h3 class="font-semibold text-2xl text-black text-gray-3 pb-9">
      Контроль мерчен
    </h3>

    <div class="flex flex-col bg-white rounded-lg py-8 px-6">
      <div class="flex justify-between">
        <h3 class="font-semibold text-xl text-black text-gray-3">Фильтр</h3>
        <DatePicker />
      </div>
      <div class="flex pt-8 gap-20px items-center">
        <div class="flex flex-col w-2/5">
          <div class="fs-12 my-2 font-normal fs-14">Аудит</div>
          <div
            @click="filter.isSelectAudit = !filter.isSelectAudit"
            class="flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
          >
            <div class="ml-4 mt-2 arrow-icon">
              <IconArrowBottom />
            </div>
            <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
          </div>
        </div>
        <div class="flex flex-col w-2/5">
          <div class="fs-12 my-2 font-normal fs-14">Мерчент</div>
          <div
            @click="filter.isSelectMerchand = !filter.isSelectMerchand"
            class="flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
          >
            <div class="ml-4 mt-2 arrow-icon">
              <IconArrowBottom />
            </div>
            <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
          </div>
        </div>
        <div class="flex w-1/5 mt-9">
          <button class="w-4/5 py-2 rounded-lg bg-[#299B9B] text-white">
            Применить
          </button>
          <button class="w-1/5 mt-3 ml-3 cursor-pointer"><IconRe /></button>
        </div>
      </div>
    </div>

    <div class="pt-6">
      <auditMixReportDataTable @onOpenDetailsPopUp="onOpenDetailsPopUp" />
    </div>
    <div>
      <transition name="modal">
        <div v-if="detailsPopUpIsOpen">
          <d-modal
            :dataContainerWidth="'90%'"
            :dataContainerHeight="'90%'"
            :name="'Детали'"
            @closeDialog="onCloseDetailsPopUp"
          >
            <auditMixReportPopUp @onCloseDetailsPopUp="onCloseDetailsPopUp" />
          </d-modal>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const filter = ref({
  isSelectAudit: false,
  isSelectMerchand: false,
});

const detailsPopUpIsOpen = ref(false);

const onOpenDetailsPopUp = (/*id: any */) => {
  detailsPopUpIsOpen.value = true;
};

const onCloseDetailsPopUp = () => {
  detailsPopUpIsOpen.value = false;
};

const clickOutside = () => {
  detailsPopUpIsOpen.value = false;
  filter.value.isSelectAudit = false;
  filter.value.isSelectMerchand = false;
};
</script>
