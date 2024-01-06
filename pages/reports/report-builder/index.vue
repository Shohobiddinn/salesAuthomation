<template>
  <div class="flex flex-col gap-7.5 py-9 px-5">
    <div class="flex justify-between items-center">
      <p-title>Конструктор отчётов</p-title>
      <div class="flex gap-4.5">
        <m-btn-outlined
          class="bg-white"
          :class="isPreview ? 'border-color-red-3' : 'border-color-primary'"
          @click="previewDataTableToggle"
        >
          <div v-if="isPreview">Удалить</div>
          <div v-else>Предварительный просмотр</div>
        </m-btn-outlined>
        <m-btn @click="isOnSave = true">Сохранить</m-btn>
      </div>
    </div>
    <div class="flex gap-7.5 items-center">
      <div class="text-black text-base">Ваши отчёты</div>
      <multiply-selections
        :filter="filter.isSelectReports"
        @toggle="(toggle) => (filter.isSelectReports = toggle)"
        class="w-1/4"
        v-click-outside="() => (filter.isSelectReports = false)"
      />
    </div>
    <flex-col class="w-full">
      <flex-col class="gap-4.5 rounded-t-lg bg-white p-6">
        <flex-row class="flex justify-between w-full">
          <flex-row
            class="rounded-lg bg-[#F4F9F9] w-[25%] gap-5 items-center px-6.5 py-2.5"
          >
            <div class="flex gap-3">
              <input type="radio" name="radio" />
              <label class="text-sm"> Дата заявки </label>
            </div>
            <div class="flex gap-3">
              <input type="radio" name="radio" />
              <label class="text-sm"> Дата отгрузки </label>
            </div>
          </flex-row>
          <flex-row class="gap-4.5 w-[75%] justify-end">
            <flex-row
              class="gap-2.5 w-1/5 border-1 justify-center items-center bg-lotion rounded-lg"
            >
              <checkbox />
              <label>Сумма</label>
            </flex-row>
            <flex-row
              class="gap-2.5 w-1/5 border-1 justify-center items-center bg-lotion rounded-lg"
            >
              <checkbox />
              <label>Количество</label>
            </flex-row>
            <flex-row
              class="gap-2.5 w-1/5 border-1 justify-center items-center bg-lotion rounded-lg"
            >
              <checkbox />
              <label>Объем</label>
            </flex-row>
            <flex-row
              class="gap-2.5 w-1/5 border-1 justify-center items-center bg-lotion rounded-lg"
            >
              <checkbox />
              <label>АКБ</label>
            </flex-row>
          </flex-row>
        </flex-row>
        <flex-row class="w-full gap-5">
          <flex-col class="gap-2.5 w-1/3">
            <div class="fs-12">Дата</div>
            <div
              class="flex w-full items-center border rounded-lg h-11 grid grid-cols-2"
            >
              <label class="w-1/5 text-base text-[#8FA0A0] h-full py-2.5 px-4"
                >С</label
              >
              <input
                class="w-4/5 my-input h-full fa-solid p-[6px] rounded-lg"
                type="date-time-local"
                v-model="dateFrom"
              />
              <label
                class="w-1/5 text-base text-[#8FA0A0] h-full py-2.5 px-4 border-l-1"
                >До</label
              >
              <input
                class="w-4/5 my-input h-full fa-solid p-[6px] rounded-lg"
                type="date-time-local"
                v-model="dateTill"
              />
            </div>
          </flex-col>
          <flex-col class="justify-between w-1/3">
            <div class="text-black text-xs">Статус</div>
            <multiply-selections
              :filter="filter.isSelectStatus"
              :h="true"
              @toggle="(toggle) => (filter.isSelectStatus = toggle)"
              class="w-full"
              v-click-outside="() => (filter.isSelectStatus = false)"
            />
          </flex-col>
          <flex-col class="justify-between w-1/3">
            <div class="text-black text-xs">Тип</div>
            <multiply-selections
              :filter="filter.isSelectType"
              :h="true"
              @toggle="(toggle) => (filter.isSelectType = toggle)"
              v-click-outside="() => (filter.isSelectType = false)"
              class="w-full"
            />
          </flex-col>
        </flex-row>
      </flex-col>
      <ReportsReportBuilderDragAndDropDataTable
        :isPreviewDataTable="isPreview"
        :isOnSave="isOnSave"
        @changeIsPreview="isPreview = $event"
        @changeIsOnSave="isOnSave = $event"
      />
    </flex-col>
    <DModal v-if="isOnSave" @closeDialog="isOnSave = false" name="Сохранение">
      <ReportsReportBuilderSaveModal />
    </DModal>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";

const dateFrom = ref(moment("04-11-2022", "DD-MM-YYYY").format("DD-MM-YYYY"));
const dateTill = ref(moment().format("DD-MM-YYYY"));
const isPreview = ref(false);
const isOnSave = ref(false);

const filter = ref({
  isSelectReports: false,
  isSelectStatus: false,
  isSelectType: false,
});

const previewDataTableToggle = () => {
  isPreview.value = !isPreview.value;
};
</script>

<style scoped>
.date-picker input {
  width: 100%;
  padding-left: 45px;
  position: relative;
}
.date-picker input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  color: rgba(0, 0, 0, 0);
  opacity: 1;
  display: block;
  background: url(~/assets/svg/date-pickerscg.svg) no-repeat;
  width: 20px;
  height: 20px;
  left: 10px;
  border-width: thin;
  top: 12px;
}

input[type="radio"] {
  /* ...existing styles */
  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #299b9b;
  border: 1px solid #cccccc;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
}
input[type="radio"]:checked::before {
  transform: scale(1);
}
.form_radio_btn {
  display: inline-block;
}
.form_radio_btn input[type="radio"] {
  display: none;
}
.form_radio_btn label {
  display: inline-block;
  cursor: pointer;
  line-height: 100%;
  user-select: none;
}

/* Checked */
.form_radio_btn input[type="radio"]:checked + label {
  background: #299b9b;
  color: white;
}

/* Hover */
.form_radio_btn label:hover {
  color: #666;
}

/* Disabled */
.form_radio_btn input[type="radio"]:disabled + label {
  background: #efefef;
  color: #666;
}
</style>