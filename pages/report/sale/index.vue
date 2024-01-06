<template>
  <div>
    <div class="mt-7">
      <span class="text-[#424F4F] fs-24 fw-6"> Отчёт по кол-во заказов </span>
    </div>
    <div class="mt-6">
      <ReportSaleFilterCard />
    </div>

    <div class="rounded-lg bg-white pb-5 mb-8">
      <div class="mt-7 flex justify-between px-[18px] pt-[18px] pb-3">
        <div class="grid grid-cols-6 items-center gap-[18px]">
          <ReportSaleBaseIcon
            :icon="'saveReport'"
            :text="'Сох. отчёты'"
            @click="changeDialogValue()"
          />

          <ReportSaleBaseIcon
            :icon="'save'"
            :text="'Сох. как'"
            @click="changeDialogValue2()"
          />

          <ReportSaleBaseIcon :icon="'expand'" :text="'Развернуть'" />

          <ReportSaleBaseIcon :icon="'save2'" :text="'Сох. себе'" />

          <ReportSaleBaseIcon
            :icon="'setting'"
            :text="'Настройки'"
            @click="changeDialogValue3()"
          />

          <div class="group">
            <div>
              <ReportSaleBaseIcon
                :icon="'upload'"
                :text="'экспорт'"
                class="relative"
              />
            </div>
            <div
              class="p-5 bg-white rounded-[8px] w-[150px] shadow absolute hidden group-hover:block"
            >
              <div class="flex gap-3 cursor-pointer">
                <div>
                  <IconPrinterUpload />
                </div>
                <div class="fw-5 fs-14 text-[#000000]">Печатать</div>
              </div>

              <div class="flex gap-3 cursor-pointer mt-5">
                <div>
                  <IconExcel />
                </div>
                <div class="fw-5 fs-14 text-[#000000]">На Excel</div>
              </div>

              <div class="flex gap-3 cursor-pointer mt-5">
                <div>
                  <IconHtml />
                </div>
                <div class="fw-5 fs-14 text-[#000000]">На HTML</div>
              </div>

              <div class="flex gap-3 cursor-pointer mt-5">
                <div>
                  <IconPdf />
                </div>
                <div class="fw-5 fs-14 text-[#000000]">На PDF</div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-4 items-center gap-[18px]">
          <div class="group">
            <div>
              <ReportSaleBaseIcon
                :icon="'sliders'"
                :text="'Формат'"
                class="relative"
              />
            </div>
            <div
              class="bg-white rounded-[8px] shadow w-[224] p-[18px] absolute hidden group-hover:block"
            >
              <div class="fw-5 fs-14 text-[#424F4F] cursor-pointer">
                Условное форматирование
              </div>
              <div class="fw-5 fs-14 text-[#424F4F] cursor-pointer mt-5">
                Формат ячеек
              </div>
            </div>
          </div>

          <ReportSaleBaseIcon :icon="'menu'" :text="'Поля'" />

          <ReportSaleBaseIcon
            :icon="'setting'"
            :text="'Настройки'"
            @click="changeDialogValue3()"
          />

          <ReportSaleBaseIcon :icon="'expandDisplay'" :text="'На весь экран'" />
        </div>
      </div>

      <div class="my-5 mx-[18px]">
        <ReportSaleDataTable />
      </div>
    </div>
    <transition name="modal">
      <div v-if="popUpIsOpen">
        <d-modal
          @closeDialog="onClosePopUp"
          :name="'Сохраненные отчеты'"
          :dataContainerWidth="'400px'"
        >
          <ReportSaleSaveReportDialog />
        </d-modal>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="popUpIsOpen2">
        <d-modal
          @closeDialog="onClosePopUp"
          :name="'Сохранить как'"
          :dataContainerWidth="'400px'"
        >
          <ReportSaleSaveDialog />
        </d-modal>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="popUpIsOpen3">
        <d-modal
          @closeDialog="onClosePopUp"
          :name="'Настройки'"
          :dataContainerWidth="'642px'"
        >
          <ReportSaleSettingDialog />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
//state
const popUpIsOpen = ref(false);
const popUpIsOpen2 = ref(false);
const popUpIsOpen3 = ref(false);

//methods
const onClosePopUp = () => {
  popUpIsOpen.value = false;
  popUpIsOpen2.value = false;
  popUpIsOpen3.value = false;
};

const changeDialogValue = () => {
  popUpIsOpen.value = !popUpIsOpen.value;
};

const changeDialogValue2 = () => {
  popUpIsOpen2.value = !popUpIsOpen2.value;
};
const changeDialogValue3 = () => {
  popUpIsOpen3.value = !popUpIsOpen3.value;
};
</script>

<style scoped>
.shadow {
  box-shadow: 0px 9px 18px rgba(0, 0, 0, 0.08);
}
</style>
