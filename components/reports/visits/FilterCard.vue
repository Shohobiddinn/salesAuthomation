<template>
  <rounded-white-container class="gap-4">
    <flex-row class="items-center justify-between gap-4">
      <div>
        <span class="text-gray-3 text-[20px] fw-6">
          Фильтр
        </span>
      </div>
      <div class="flex gap-4">
        <DatePicker />
      </div>
    </flex-row>
    <flex-row class="gap-4 mt-4"
              v-for="s in filterStates">
      <flex-col class="w-1/4"
                v-for="cols in s"
                :key="cols.key">
        <i-title v-if="cols.key !== 'btn'">
          {{ cols.name }}
        </i-title>

        <flex-row class="rounded-lg bg-lotion h-full gap-2 items-center"
                  v-if="cols.key === 'radio'">
          <div class="flex gap-2">
            <input type="radio"
                   name="radio">
            <i-title>
              Активный
            </i-title>
          </div>
          <div class="flex gap-2">
            <input type="radio"
                   name="radio">
            <i-title>
              Не активный
            </i-title>
          </div>
        </flex-row>
        <flex-row class="h-full items-end gap-2" v-if="cols.key === 'key'">

        </flex-row>
        <flex-row class="h-full items-end gap-2" v-if="cols.key === 'btn'">
          <m-btn class="w-full">
            Применить
          </m-btn>
          <sm-btn class="px-4 py-3">
            <IconReloadSVG/>
          </sm-btn>
        </flex-row>
        <flex-row class="gap-4 mb-2 items-center"
                  v-if="cols.key === 'range'">
          <div class="flex gap-2 border-b-1 items-center">
            <span class="fs-14 text-gray-400">
              От
            </span>
            <input type="text"
                   class="w-11/12"
                   v-model="customerStore.priceRange[0]">
          </div>
          <div class="flex gap-2 border-b-1 items-center">
            <span class="text-gray-400">
              до
            </span>
            <input type="number"
                   class="w-11/12"
                   v-model="customerStore.priceRange[1]">
          </div>
        </flex-row>
        <div class="w-full h-full"
             v-if="cols.key === 'range'">
          <Slider v-model="customerStore.priceRange"
                  :step="customerStore.priceStep"
                  :min="customerStore.price.min"
                  :max="customerStore.price.max"
                  class="slider-blue z-0"
                  :tooltips="false" />
        </div>
        <menu-btn class="w-full"
                  v-if="cols.key !== 'btn' && cols.key !== 'range' && cols.key !== 'radio' && cols.key !== 'key'">
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
    },
    {
      name: "Территория",
      key: "territories"
    },
    {
      name: "Категория клиентов",
      key: "categoryClient"
    },

    {
      name: "День",
      key: "day"
    },
  ],
  secondRow: [
    {
      name: "Категория продуктов",
      key: "productCategory"
    },
    {
      name: "Нерезультативный визит",
      key: "visit"
    },
    {
      name: "",
      key: "key"
    },
    {
      name: "",
      key: "btn"
    },
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
