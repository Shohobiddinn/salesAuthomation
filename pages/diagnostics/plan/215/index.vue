<template>
  <div class="py-7.5 px-5 flex flex-col gap-7.5">
    <h3 class="text-2xl font-semibold text-gray-3">
      Установка плана: Outlet Targeting
    </h3>

    <div v-click-outside="clickOutside" class="pb-32">
      <div class="bg-white p-4 w-full rounded-lg flex flex-col gap-9">
        <div class="grid grid-cols-4 gap-4 mt-4">
          <div class="relative">
            <div class="fs-12 my-2">Период истории</div>
            <div>
              <div
                @click="
                  filter.isSelectPeriodHistory = !filter.isSelectPeriodHistory
                "
                class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
              >
                <div class="ml-4 mt-2">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 text-gray ml-2">Выбрать</div>
              </div>
              <div
                v-if="filter.isSelectPeriodHistory"
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
            <div class="fs-12 my-2">Тип плана</div>
            <div
              @click="filter.isSelectTypePlan = !filter.isSelectTypePlan"
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
        </div>
        <div class="flex justify-between items-center">
          <h4 class="font-semibold text-lg text-gray-3 mb-0 mt-5">
            Индекс роста
          </h4>
          <div class="w-[40%] flex justify-end bg-white rounded-lg mt-4">
            <div
              v-for="item in growthIndexTabs"
              :key="item.id"
              class="inline-block h-full w-[30%]"
            >
              <input
                :id="item.id"
                @click="onChangeGrowthTab(item.id)"
                type="radio"
                :value="growIndexTabsAmount"
                class="hidden"
              />
              <label
                :class="[
                  item.number === 1
                    ? 'rounded-l-large'
                    : '' || item.number === 2
                    ? 'rounded-r-large'
                    : '',
                  growIndexTabsAmount === item.id && 'selected_tab',
                ]"
                :for="item.id"
                class="text-center bg-[#E1E4E4] inline-block cursor-pointer leading-[100%] hover:text-gray-500 w-full py-[14px] px-4 fs-14"
                >{{ item.name }}</label
              >
            </div>
          </div>
        </div>
        <auditSmallDataTable
          :headers="growthIndexHeader"
          :loadedData="growthIndexLoadedData"
          :headerCenter="false"
          :noXPadding="true"
        />
        <div class="flex justify-between items-center">
          <h4 class="font-semibold text-lg text-gray-3 mb-0 mt-5">
            Минимальный план
          </h4>
          <div class="w-[40%] flex justify-end bg-white rounded-lg mt-4">
            <div
              v-for="item in minimalPlanTabs"
              :key="item.id"
              class="inline-block h-full w-[30%]"
            >
              <input
                :id="item.id"
                @click="onChangeMinimalTab(item.id)"
                type="radio"
                :value="minimalPlanTabsAmount"
                class="hidden"
              />
              <label
                :class="[
                  item.number === 1
                    ? 'rounded-l-large'
                    : '' || item.number === 2
                    ? 'rounded-r-large'
                    : '',
                  minimalPlanTabsAmount === item.id && 'selected_tab',
                ]"
                :for="item.id"
                class="text-center bg-[#E1E4E4] inline-block cursor-pointer leading-[100%] hover:text-gray-500 w-full py-[14px] px-4 fs-14"
                >{{ item.name }}</label
              >
            </div>
          </div>
        </div>
        <auditSmallDataTable
          :headers="growthIndexHeader"
          :loadedData="growthIndexLoadedData"
          :headerCenter="false"
          :noXPadding="true"
        />
        <div class="w-full flex justify-start">
          <m-btn class="w-1/5">Рассчитать заного</m-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const filter = ref({
  isSelectPeriodHistory: false,
  isSelectTypePlan: false,
  isSelectMonth: false,
  isSelectYear: false,
});

const growIndexTabsAmount = ref("grow-tab-1");
const growthIndexTabs = ref([
  {
    id: "grow-tab-1",
    name: "Tab",
    tab: "tab1",
    number: 1,
  },
  {
    id: "grow-tab-2",
    name: "Tab",
    tab: "tab2",
    number: 2,
  },
]);
const minimalPlanTabsAmount = ref("min-plan-tab-1");
const minimalPlanTabs = ref([
  {
    id: "min-plan-tab-1",
    name: "Tab",
    tab: "tab1",
    number: 1,
  },
  {
    id: "min-plan-tab-2",
    name: "Tab",
    tab: "tab2",
    number: 2,
  },
]);

const growthIndexHeader = ref([
  {
    name: "Категория",
    checked: true,
    key: "category",
    thHeight: "56px",
    type: "come",
  },
  {
    name: "Cola",
    checked: true,
    key: "cola",
    thHeight: "56px",
    type: "come",
    outlinedData: true,
  },
  {
    name: "Fanta",
    checked: true,
    key: "fanta",
    thHeight: "56px",
    type: "come",
    outlinedData: true,
  },
  {
    name: "Pepsi",
    checked: true,
    key: "pepsi",
    thHeight: "56px",
    type: "come",
    outlinedData: true,
  },
  {
    name: "Dinay",
    checked: true,
    key: "dinay",
    thHeight: "56px",
    type: "come",
    outlinedData: true,
  },
  {
    name: "Bliss",
    checked: true,
    key: "bliss",
    thHeight: "56px",
    type: "come",
    outlinedData: true,
  },
]);

const growthIndexLoadedData = ref([
  {
    category: "Значения",
    cola: "12357",
    fanta: "12357",
    pepsi: "12357",
    dinay: "12357",
    bliss: "12357",
  },
]);

const clickOutside = () => {
  filter.value.isSelectPeriodHistory = false;
  filter.value.isSelectTypePlan = false;
  filter.value.isSelectMonth = false;
  filter.value.isSelectYear = false;
};

const onChangeGrowthTab = (id: string) => {
  growIndexTabsAmount.value = id;
  console.log(growIndexTabsAmount.value);
};

const onChangeMinimalTab = (id: string) => {
  minimalPlanTabsAmount.value = id;
  console.log(minimalPlanTabsAmount.value);
};
</script>

<style scoped>
/* Checked */
.selected_tab {
  background: #299b9b;
  color: white;
}
</style>