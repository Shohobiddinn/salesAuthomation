<template>
  <rounded-white-container>
    <flex-row class="justify-between items-center">
      <span class="text-gray-3 fw-6 text-[20px]">
        Фильтр
      </span>
      <flex-row class="gap-4">
        <flex-row class="rounded-lg bg-[#F4F9F9] h-full gap-2 items-center px-5 py-1">
          <div class="flex gap-2">
            <input type="radio"
                   name="radio">
            <i-title>
              Дата заявки
            </i-title>
          </div>
          <div class="flex gap-2">
            <input type="radio"
                   name="radio">
            <i-title>
              Дата отгрузки
            </i-title>
          </div>
        </flex-row>
        <DatePicker />
      </flex-row>
    </flex-row>
    <flex-row class="gap-4 mt-4"
              v-for="s in expeditorStore.filterStates">
      <flex-col class="w-1/4"
                v-for="cols in s"
                :key="cols.key">
        <i-title v-if="cols.key !== 'btn'">
          {{ cols.name }}
        </i-title>
        <flex-row class="h-full items-end gap-2" v-if="cols.key === 'btn'">
          <m-btn class="w-full">
            Применить
          </m-btn>
          <sm-btn class="px-4 py-3">
            <IconReloadSVG/>
          </sm-btn>
        </flex-row>
        <menu-btn class="w-full"
                  v-if="cols.key !== 'btn' && cols.key !== 'range' && cols.key !== 'radio'">
          <template #btn>
            <m-btn-outlined
                class="border-grey flex items-center w-full gap-2">
              <fa-icon hash="&#xf078" />
              Выбрать
            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col class="gap-2">
              <search-input />
              <ReportCustomerFilterItems
                  :data="expeditorStore[cols.key]" />
            </flex-col>
          </template>
        </menu-btn>
      </flex-col>
    </flex-row>
  </rounded-white-container>
</template>

<script setup>

// Stores
const expeditorStore = useReportExpeditorStore("main")

</script>

<style scoped>
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
  background-color: #299B9B;
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

.form_radio_btn input[type=radio] {
  display: none;
}

.form_radio_btn label {
  display: inline-block;
  cursor: pointer;
  line-height: 100%;
  user-select: none;
}

/* Checked */
.form_radio_btn input[type=radio]:checked + label {
  background: #299B9B;
  color: white;
}

/* Hover */
.form_radio_btn label:hover {
  color: #666;
}

/* Disabled */
.form_radio_btn input[type=radio]:disabled + label {
  background: #efefef;
  color: #666;
}
</style>
