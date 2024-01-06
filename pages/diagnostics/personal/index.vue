<template>
  <div class="py-7.5 px-5 flex flex-col gap-6">
    <h3 class="text-2xl font-semibold text-gray-3 mb-0">Personal</h3>

    <div v-click-outside="clickOutside">
      <div class="bg-white p-4 w-full rounded-lg">
        <div class="grid grid-cols-4 gap-4 mt-4">
          <div class="relative">
            <div class="fs-12 my-2">Выберите супервайзера</div>
            <div>
              <div
                @click="filter.isSelectSuperviser = !filter.isSelectSuperviser"
                class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
              >
                <div class="ml-4 mt-2">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 text-gray ml-2">Выбрать</div>
              </div>
              <div
                v-if="filter.isSelectSuperviser"
                class="absolute w-full pt-2 border top-[85px] z-50 rounded-lg bg-[#FAFDFD]"
              >
                <div class="flex pl-3 border-b border-[#E1E4E4]">
                  <div>
                    <label>
                      <input type="checkbox" />
                      <span></span>
                    </label>
                  </div>
                  <div class="fs-14 ml-2">Select all</div>
                </div>
                <div class="h-[200px] overflow-auto mr-3">
                  <div v-for="i in 15" :key="i" class="flex pl-3 pt-2">
                    <div>
                      <label>
                        <input type="checkbox" />
                        <span></span>
                      </label>
                    </div>
                    <div class="fs-14 ml-2">Checkbox</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="fs-12 my-2">Агент</div>
            <div
              @click="filter.isSelectAgent = !filter.isSelectAgent"
              class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
            >
              <div class="ml-4 mt-2">
                <IconArrowBottom />
              </div>
              <div class="fs-14 text-gray ml-2">Выбрать</div>
            </div>
            <div
              v-if="filter.isSelectAgent"
              class="absolute w-full pt-2 border top-[85px] z-50 rounded-lg bg-[#FAFDFD]"
            >
              <div class="flex pl-3 border-b border-[#E1E4E4]">
                <div>
                  <label>
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </div>
                <div class="fs-14 ml-2">Select all</div>
              </div>
              <div class="h-[200px] overflow-auto mr-3">
                <div v-for="i in 15" :key="i" class="flex pl-3 pt-2">
                  <div>
                    <label>
                      <input type="checkbox" />
                      <span></span>
                    </label>
                  </div>
                  <div class="fs-14 ml-2">Checkbox</div>
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="fs-12 my-2">Месяц</div>
            <div>
              <div
                @click="filter.isSelectMonth = !filter.isSelectMonth"
                class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
              >
                <div class="ml-4 mt-2">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 text-gray ml-2">Выбрать</div>
              </div>
              <div
                v-if="filter.isSelectMonth"
                class="absolute w-full pt-2 border top-[85px] z-50 rounded-lg bg-[#FAFDFD]"
              >
                <div class="flex pl-3 border-b border-[#E1E4E4]">
                  <div>
                    <label>
                      <input type="checkbox" />
                      <span></span>
                    </label>
                  </div>
                  <div class="fs-14 ml-2">Select all</div>
                </div>
                <div class="h-[200px] overflow-auto mr-3">
                  <div v-for="i in 15" :key="i" class="flex pl-3 pt-2">
                    <div>
                      <label>
                        <input type="checkbox" />
                        <span></span>
                      </label>
                    </div>
                    <div class="fs-14 ml-2">Checkbox</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="fs-12 my-2">Год</div>
            <div
              @click="filter.isSelectYear = !filter.isSelectYear"
              class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
            >
              <div class="ml-4 mt-2">
                <IconArrowBottom />
              </div>
              <div class="fs-14 text-gray ml-2">Выбрать</div>
            </div>
            <div
              v-if="filter.isSelectYear"
              class="absolute w-full pt-2 border top-[85px] z-50 rounded-lg bg-[#FAFDFD]"
            >
              <div class="flex pl-3 border-b border-[#E1E4E4]">
                <div>
                  <label>
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </div>
                <div class="fs-14 ml-2">Select all</div>
              </div>
              <div class="h-[200px] overflow-auto mr-3">
                <div v-for="i in 15" :key="i" class="flex pl-3 pt-2">
                  <div>
                    <label>
                      <input type="checkbox" />
                      <span></span>
                    </label>
                  </div>
                  <div class="fs-14 ml-2">Checkbox</div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div class="flex justify-end h-40px mt-9">
            <button class="w-[92%] py-2 rounded-lg bg-[#299B9B] text-white">
              Применить
            </button>
            <button class="mt-3 ml-3"><IconRe /></button>
          </div>
        </div>
      </div>
    </div>

    <h3 class="text-2xl font-semibold text-gray-3 pt-4 mb-0">Результаты</h3>

    <diagnosticsDataTableWithSlider
      :headers="headers"
      :loadedData="loadedData"
      :sliderTitle="'Объем продаж'"
      :tableTitle="'ТП николай'"
      :withCurrentDate="true"
    /><!-- Backend dan ma'lumot qanday kelishi hali aniq bo'lmaganligi uchun slider ishlaydigan qlinmadi -->
  </div>
</template>

<script setup lang="ts">

const filter = ref({
  isSelectSuperviser: false,
  isSelectAgent: false,
  isSelectMonth: false,
  isSelectYear: false,
});

const headers = ref([
  {
    name: "Продукты",
    checked: true,
    key: "products",
    type: "products",
    borderX: true,
    thWidthWithClass: "w-1/5",
  },
  {
    name: "План",
    checked: true,
    key: "plan",
    type: "plan",
    thWidth: "110px",
  },
  {
    name: "Факт",
    checked: true,
    key: "fact",
    type: "fact",
    thWidth: "110px",
  },
  {
    name: "Прогноз",
    checked: true,
    key: "predict",
    type: "predict",
    thWidth: "110px",
  },
  {
    name: "Днев. П на 125%",
    checked: true,
    key: "dailyPredict125",
    type: "dailyPredict125",
    thWidth: "110px",
  },
  {
    name: "Факт по объему",
    checked: true,
    key: "factByVolume",
    type: "factByVolume",
    thWidth: "110px",
  },
  {
    name: "Остаток",
    checked: true,
    key: "rest",
    type: "rest",
    thWidth: "110px",
  },
  {
    name: "Дневной П на 100%",
    checked: true,
    key: "dailyPredict100",
    type: "dailyPredict100",
    thWidth: "110px",
  },
  {
    name: "Кол-во Критических Кат-и",
    checked: true,
    key: "amountOfCritical",
    type: "amountOfCritical",
    thWidth: "140px",
  },
]);
const loadedData = ref([
  {
    products: "Dena",
    plan: "132",
    fact: "132",
    predict: "132",
    dailyPredict125: "132",
    factByVolume: "132",
    rest: "132",
    dailyPredict100: "132",
    amountOfCritical: "13268",
  },
  {
    products: "Dena",
    plan: "132",
    fact: "132",
    predict: "132",
    dailyPredict125: "132",
    factByVolume: "132",
    rest: "132",
    dailyPredict100: "132",
    amountOfCritical: "13268",
  },
  {
    products: "Dena",
    plan: "132",
    fact: "132",
    predict: "132",
    dailyPredict125: "132",
    factByVolume: "132",
    rest: "132",
    dailyPredict100: "132",
    amountOfCritical: "13268",
  },
  {
    products: "Dena",
    plan: "132",
    fact: "132",
    predict: "132",
    dailyPredict125: "132",
    factByVolume: "132",
    rest: "132",
    dailyPredict100: "132",
    amountOfCritical: "13268",
  },
  {
    products: "Dena",
    plan: "132",
    fact: "132",
    predict: "132",
    dailyPredict125: "132",
    factByVolume: "132",
    rest: "132",
    dailyPredict100: "132",
    amountOfCritical: "13268",
  },
  {
    products: "Dena",
    plan: "132",
    fact: "132",
    predict: "132",
    dailyPredict125: "132",
    factByVolume: "132",
    rest: "132",
    dailyPredict100: "132",
    amountOfCritical: "13268",
  },
  {
    products: "Dena",
    plan: "132",
    fact: "132",
    predict: "132",
    dailyPredict125: "132",
    factByVolume: "132",
    rest: "132",
    dailyPredict100: "132",
    amountOfCritical: "13268",
  },
  {
    products: "Dena",
    plan: "132",
    fact: "132",
    predict: "132",
    dailyPredict125: "132",
    factByVolume: "132",
    rest: "132",
    dailyPredict100: "132",
    amountOfCritical: "13268",
  },
]);

// /methods
const clickOutside = () => {
  filter.value.isSelectSuperviser = false;
  filter.value.isSelectAgent = false;
  filter.value.isSelectMonth = false;
  filter.value.isSelectYear = false;
};

</script>
