<template>
  <div class="py-7.5 px-5 flex flex-col gap-7.5">
    <div class="flex justify-between">
      <h3 class="text-2xl font-semibold text-gray-3">Общая диагностика</h3>
      <div class="fs-16 text-[#299B9B] font-semibold cursor-pointer">
        Обновить
      </div>
    </div>
    <div class="flex gap-5">
      <diagnosticsOutletReportBox
        :amount="465"
        :icon="'calendar'"
        :text="'Кол-во рабочий дней'"
        class="bg-[#E9F1F2] w-1/4"
      />
      <diagnosticsOutletReportBox
        :amount="465"
        :icon="'check'"
        :text="'Отработано'"
        class="bg-[#EAF2E9] w-1/4"
      />
      <diagnosticsOutletReportBox
        :amount="465"
        :icon="'hourGlass'"
        :text="'Остались дни'"
        class="bg-[#E9EBF2] w-1/4"
      />
      <diagnosticsOutletReportBox
        :amount="'19 окт, 15:45'"
        :icon="'reload'"
        :text="'Последнее обновления'"
        class="bg-[#EFE9F2] w-1/4"
      />
    </div>

    <div
      v-click-outside="clickOutside"
      class="flex flex-col bg-white rounded-lg py-8 px-6"
    >
      <div class="flex justify-between">
        <h3 class="font-semibold text-xl text-black text-gray-3">Фильтр</h3>
      </div>
      <div class="flex pt-8 gap-20px">
        <div class="flex flex-col w-1/3">
          <div class="fs-12 my-2 font-normal fs-12">Агент</div>
          <div
            @click="filter.isSelectAgent = !filter.isSelectAgent"
            class="flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
          >
            <div class="ml-4 mt-2 arrow-icon">
              <IconArrowBottom />
            </div>
            <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
          </div>
        </div>
        <div class="flex flex-col w-1/3">
          <div class="fs-12 my-2 font-normal fs-12">Территория</div>
          <div
            @click="filter.isSelectTerritory = !filter.isSelectTerritory"
            class="flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
          >
            <div class="ml-4 mt-2 arrow-icon">
              <IconArrowBottom />
            </div>
            <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
          </div>
        </div>
        <div class="flex flex-col w-1/3">
          <div class="fs-12 my-2 font-normal fs-12">Категория</div>
          <div
            @click="filter.isSelectCategory = !filter.isSelectCategory"
            class="flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
          >
            <div class="ml-4 mt-2 arrow-icon">
              <IconArrowBottom />
            </div>
            <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
          </div>
        </div>
        <div class="flex flex-col w-1/3">
          <div class="fs-12 my-2 font-normal fs-12">День</div>
          <div
            @click="filter.isSelectDay = !filter.isSelectDay"
            class="flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
          >
            <div class="ml-4 mt-2 arrow-icon">
              <IconArrowBottom />
            </div>
            <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
          </div>
          <div class="flex justify-end w-full h-40px mt-6">
            <button class="w-[52%] py-2 rounded-lg bg-[#299B9B] text-white">
              Применить
            </button>
            <button class="mt-3 ml-3 cursor-pointer"><IconRe /></button>
          </div>
        </div>
      </div>
    </div>

    <DoubleTab
      first-tab-name="Супервайзер 1"
      :borderless="true"
      second-tab-name="Супервайзер 2"
      :bgWhite="true"
    >
      <template #first>
        <div class="flex justify-between items-center px-6 py-3">
          <h3
            class="border-b-1 border-[#299B9B] text-[#013636] font-medium cursor-pointer"
          >
            Цифры
          </h3>
          <nuxt-link to="/diagnostics/forecast/details">
            <m-btn-outlined class="border-color-primary bg-white py-3 px-6">
              <div class="flex flex-row gap-3">
                <IconLightingAlt :color="'#8FA0A0'" /> Детальные результаты
              </div>
            </m-btn-outlined>
          </nuxt-link>
        </div>

        <div class="flex flex-col gap-7.5">
          <diagnosticsDataTableWithSlider
            :headers="routeAnalysisHeader"
            :loadedData="routeAnalysisLoadedData"
            :sorted="sortedData"
            @sortData="sortData"
            :tableTitle="'Анализ по маршрутам'"
            :sliderTitle="'Прогноз по маршрутам'"
            :roundedLine="true"
          />

          <diagnosticsDataTableWithSlider
            :headers="volumeAnalysisHeader"
            :loadedData="volumeAnalysisLoadedData"
            :sorted="sortedData"
            @sortData="sortData"
            :tableTitle="'Анализ по объёму'"
            :sliderTitle="'Прогноз по объёму'"
          />

          <diagnosticsDataTableWithSlider
            :headers="thirdTableHeader"
            :loadedData="thirdTableLoadedData"
            :sorted="sortedData"
            @sortData="sortData"
            :tableTitle="'Анализ по объёму'"
            :sliderTitle="'Прогноз по объёму'"
          />
        </div>
      </template>
      <template #second></template>
    </DoubleTab>
  </div>
</template>

<script setup lang="ts">
const filter = ref({
  isSelectAgent: false,
  isSelectTerritory: false,
  isSelectCategory: false,
  isSelectDay: false,
});

const sortedData = ref({ key: "", mode: "" });

const routeAnalysisHeader = ref([
  {
    name: "Агенты",
    checked: true,
    key: "agents",
    type: "agents",
    borderX: true,
    thWidthWithClass: "w-1/5",
  },
  {
    name: "Пн",
    checked: true,
    key: "mon",
    type: "mon",
    thWidth: "110px",
  },
  {
    name: "Вт",
    checked: true,
    key: "tue",
    type: "tue",
    thWidth: "110px",
  },
  {
    name: "Ср",
    checked: true,
    key: "wed",
    type: "wed",
    thWidth: "110px",
  },
  {
    name: "Чт",
    checked: true,
    key: "thu",
    type: "thu",
    thWidth: "110px",
  },
  {
    name: "Пт",
    checked: true,
    key: "fri",
    type: "fri",
    thWidth: "110px",
  },
  {
    name: "Сб",
    checked: true,
    key: "sat",
    type: "sat",
    thWidth: "110px",
  },
  {
    name: "Вс",
    checked: true,
    key: "sun",
    type: "sun",
    thWidth: "110px",
  },
  {
    name: "Общий",
    checked: true,
    key: "total",
    type: "total",
    thWidth: "140px",
  },
]);
const routeAnalysisLoadedData = ref([
  {
    agents: "ТП Андрей",
    mon: "132",
    tue: "132",
    wed: "132",
    thu: "132",
    fri: "132",
    sat: "132",
    sun: "132",
    total: "13268",
  },
  {
    agents: "ТП Андрей",
    mon: "132",
    tue: "132",
    wed: "132",
    thu: "132",
    fri: "132",
    sat: "132",
    sun: "132",
    total: "13268",
  },
  {
    agents: "ТП Андрей",
    mon: "132",
    tue: "132",
    wed: "132",
    thu: "132",
    fri: "132",
    sat: "132",
    sun: "132",
    total: "13268",
  },
  {
    agents: "ТП Андрей",
    mon: "132",
    tue: "132",
    wed: "132",
    thu: "132",
    fri: "132",
    sat: "132",
    sun: "132",
    total: "13268",
  },
  {
    agents: "ТП Андрей",
    mon: "132",
    tue: "132",
    wed: "132",
    thu: "132",
    fri: "132",
    sat: "132",
    sun: "132",
    total: "13268",
  },
  {
    agents: "ТП Андрей",
    mon: "132",
    tue: "132",
    wed: "132",
    thu: "132",
    fri: "132",
    sat: "132",
    sun: "132",
    total: "13268",
  },
  {
    agents: "Общий",
    mon: "132",
    tue: "132",
    wed: "132",
    thu: "132",
    fri: "132",
    sat: "132",
    sun: "132",
    total: "13268",
  },
]);

const volumeAnalysisHeader = ref([
  {
    name: "Агенты",
    checked: true,
    key: "agents",
    type: "agents",
    borderX: true,
    thWidthWithClass: "w-1/5",
  },
  {
    name: "1",
    checked: true,
    key: "one",
    type: "one",
    thWidth: "110px",
  },
  {
    name: "2",
    checked: true,
    key: "two",
    type: "two",
    thWidth: "110px",
  },
  {
    name: "3",
    checked: true,
    key: "three",
    type: "three",
    thWidth: "110px",
  },
  {
    name: "4",
    checked: true,
    key: "four",
    type: "four",
    thWidth: "110px",
  },
  {
    name: "5",
    checked: true,
    key: "five",
    type: "five",
    thWidth: "110px",
  },
  {
    name: "Общий",
    checked: true,
    key: "total",
    type: "total",
    thWidth: "140px",
  },
  
]);


const volumeAnalysisLoadedData = ref([
  {
    agents: "ТП Андрей",
    one: "132",
    two: "132",
    three: "132",
    four: "132",
    five: "132",
    total: "13268",
  },
  {
    agents: "ТП Андрей",
    one: "132",
    two: "132",
    three: "132",
    four: "132",
    five: "132",
    total: "13268",
  },
  {
    agents: "ТП Андрей",
    one: "132",
    two: "132",
    three: "132",
    four: "132",
    five: "132",
    total: "13268",
  },
  {
    agents: "ТП Андрей",
    one: "132",
    two: "132",
    three: "132",
    four: "132",
    five: "132",
    total: "13268",
  },
  {
    agents: "ТП Андрей",
    one: "132",
    two: "132",
    three: "132",
    four: "132",
    five: "132",
    total: "13268",
  },
  {
    agents: "ТП Андрей",
    one: "132",
    two: "132",
    three: "132",
    four: "132",
    five: "132",
    total: "13268",
  },
  {
    agents: "Общий",
    one: "132",
    two: "132",
    three: "132",
    four: "132",
    five: "132",
    total: "13268",
  },
]);

const thirdTableHeader = ref([
  {
    name: "Агенты",
    checked: true,
    key: "agents",
    type: "agents",
    borderX: true,
    thWidthWithClass: "w-1/5",
  },
  {
    name: "Розиница",
    checked: true,
    key: "roznitsa",
    type: "roznitsa",
    thWidth: "110px",
  },
  {
    name: "Оптовая торговля",
    checked: true,
    key: "wholesale",
    type: "wholesale",
    thWidth: "110px",
  },
  {
    name: "Общий",
    checked: true,
    key: "total",
    type: "total",
    thWidth: "110px",
  },
])

const thirdTableLoadedData = ref([
  {
    agents: "ТП Андрей",
    roznitsa: "13265",
    wholesale: "13265",
    total: "13268",
  },
  {
    agents: "ТП Андрей",
    roznitsa: "13265",
    wholesale: "13265",
    total: "13268",
  },
  {
    agents: "ТП Андрей",
    roznitsa: "13265",
    wholesale: "13265",
    total: "13268",
  },
  {
    agents: "ТП Андрей",
    roznitsa: "13265",
    wholesale: "13265",
    total: "13268",
  },
  {
    agents: "ТП Андрей",
    roznitsa: "13265",
    wholesale: "13265",
    total: "13268",
  },
  {
    agents: "ТП Андрей",
    roznitsa: "13265",
    wholesale: "13265",
    total: "13268",
  },
  {
    agents: "Общий",
    roznitsa: "13265",
    wholesale: "13265",
    total: "13265",
  },
  
])
// /methods
const clickOutside = () => {
  filter.value.isSelectAgent = false;
  filter.value.isSelectTerritory = false;
  filter.value.isSelectCategory = false;
  filter.value.isSelectDay = false;
};

const sortData = (data: any) => {
  sortedData.value = data;
};
</script>

<style>
</style>