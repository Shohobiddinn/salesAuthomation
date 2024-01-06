<template>
  <rounded-white-container class="gap-4">
    <flex-row class="items-center justify-between gap-4">
      <div>
        <span class="text-gray-3 text-[20px] fw-6">
          Фильтр
        </span>
      </div>
      <div>
        <DatePicker />
      </div>
    </flex-row>
    <flex-row class="gap-4 mt-4"
              v-for="s in filterStates">
      <flex-col class="w-full"
                v-for="cols in s"
                :key="cols.key">
        <i-title v-if="cols.key !== 'btn'">
          {{ cols.name }}
        </i-title>
        <menu-btn class="w-full"
                  v-if="cols.key !== 'btn' && cols.key !== 'range' && cols.key !== 'radio' && cols.key !== 'data'">
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
                  :data="customerStore[cols.key]" />
            </flex-col>
          </template>
        </menu-btn>
      </flex-col>
    </flex-row>
    <div class="flex justify-end mt-5">
      <flex-row class="h-full items-end gap-2">
        <m-btn class="w-50 h-9.5">
          Применить
        </m-btn>
        <sm-btn class="px-4 py-3">
          <IconReloadSVG/>
        </sm-btn>
      </flex-row>
    </div>
  </rounded-white-container>
</template>

<script setup>
import Slider from "@vueform/slider";
// Store
const customerStore = useReportCustomerStore("main");

// State
const filterStates = ref({
  firstRow: [
    {
      name: "Агент",
      key: "agents"
    } ,
    {
      name: "Статус",
      key: "status"
    },
    {
      name: "Тип оплаты",
      key: "paymentType"
    }
  ]
});
// Methods

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
.slider-base, .slider-connects {
  z-index: 0 !important;
}
</style>
<style src="@vueform/slider/themes/default.css"></style>
