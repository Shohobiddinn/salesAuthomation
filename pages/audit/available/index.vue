<template>
  <div class="py-9 px-5" v-click-outside="clickOutside">
    <h3 class="font-semibold text-2xl text-black text-gray-3 pb-9">
      Месячный отчет
    </h3>

    <div class="flex flex-col bg-white rounded-lg py-8 px-6">
      <div class="flex justify-between">
        <h3 class="font-semibold text-xl text-black text-gray-3">Фильтр</h3>
        <DatePicker />
      </div>
      <div class="flex pt-8 gap-20px items-center">
        <div class="flex flex-col w-1/4">
          <div class="fs-12 my-2 font-normal fs-14">Опрос</div>
          <div
            @click="filter.isSelectAudit = !filter.isSelectSurvey"
            class="flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
          >
            <div class="ml-4 mt-2 arrow-icon">
              <IconArrowBottom />
            </div>
            <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
          </div>
        </div>
        <div class="flex flex-col w-1/4">
          <div class="fs-12 my-2 font-normal fs-14">Вопрос</div>
          <div
            @click="filter.isSelectMerchand = !filter.isSelectQuestion"
            class="flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
          >
            <div class="ml-4 mt-2 arrow-icon">
              <IconArrowBottom />
            </div>
            <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
          </div>
        </div>
        <div class="flex flex-col w-1/4">
          <div class="fs-12 my-2 font-normal fs-14">ОКБ</div>
          <div
            @click="filter.isSelectMerchand = !filter.isSelectOKB"
            class="flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
          >
            <div class="ml-4 mt-2 arrow-icon">
              <IconArrowBottom />
            </div>
            <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
          </div>
        </div>
        <div class="flex flex-col w-1/4">
          <div class="fs-12 my-2 font-normal fs-14">АКБ</div>
          <div
            @click="filter.isSelectMerchand = !filter.isSelectAKB"
            class="flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
          >
            <div class="ml-4 mt-2 arrow-icon">
              <IconArrowBottom />
            </div>
            <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-6">
        <button class="w-1/6 py-2 rounded-lg bg-[#299B9B] text-white">
          Применить
        </button>
        <button class="mt-3 ml-3 cursor-pointer"><IconRe /></button>
      </div>
    </div>

    <div class="w-full h-full pt-7.5">
      <auditAvailableDiagramma />
    </div>

    <div class="flex flex-col">
      <div class="flex justify-between py-5.5">
        <h3 class="font-semibold text-2xl text-black text-gray-3">По агенту</h3>
        <div class="w-[30%] h-auto flex">
          <div
            v-for="item in tabs"
            :key="item"
            class="form_radio_btn inline-block h-auto w-1/2"
          >
            <input
              :checked="amount === item.number"
              :id="item.tab"
              @input="inputValue(item.number)"
              type="radio"
              name="product"
              :value="amount"
              class="hidden"
            />
            <label
              :for="item.tab"
              :class="
                item.tab === 'tab1' ? 'rounded-l-large' : 'rounded-r-large'
              "
              class="w-full bg-white text-center inline-block cursor-pointer leading-[100%] hover:text-gray-500 py-3.5 px-4 fs-14"
              >{{ item.name }}</label
            >
          </div>
        </div>
      </div>
    </div>
    <auditSmallDataTable
      :headers="agentTableHeader"
      :loadedData="agentTableLoadedData"
    />

    <div class="flex flex-col">
      <div class="flex justify-between py-5.5">
        <h3 class="font-semibold text-2xl text-black text-gray-3">
          По позиции
        </h3>
      </div>
    </div>
    <auditSmallDataTable
      :headers="positionTableHeader"
      :loadedData="positionTableLoadedData"
    />

    <div class="flex flex-col">
      <div class="flex justify-between py-5.5">
        <h3 class="font-semibold text-2xl text-black text-gray-3">
          По территории
        </h3>
      </div>
    </div>
    <auditSmallDataTable
      :headers="territoryTableHeader"
      :loadedData="territoryTableLoadedData"
    />
  </div>
</template>


<script setup lang="ts">
const filter = ref({
  isSelectSurvey: false,
  isSelectQuestion: false,
  isSelectOKB: false,
  isSelectAKB: false,
});
const clickOutside = () => {
  filter.value.isSelectSurvey = false;
  filter.value.isSelectQuestion = false;
  filter.value.isSelectOKB = false;
  filter.value.isSelectAKB = false;
};

const amount = ref(1);
const inputValue = (param: any) => {
  amount.value = param;
};

const tabs = ref([
  {
    name: "Процент",
    number: 1,
    tab: "tab1",
  },
  {
    name: "Кол - во",
    number: 2,
    tab: "tab2",
  },
]);

const agentTableHeader = ref([
  {
    name: "ТП",
    checked: true,
    key: "TP",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "1",
    checked: true,
    key: "1",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "2",
    checked: true,
    key: "2",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "3",
    checked: true,
    key: "3",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "4",
    checked: true,
    key: "4",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "5",
    checked: true,
    key: "5",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "6",
    checked: true,
    key: "6",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "7",
    checked: true,
    key: "7",
    thWidth: "120px",
    type: "checked",
  },
]);

const agentTableLoadedData = ref([
  {
    TP: "Шерзод ака",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    TP: "Шерзод ака",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    TP: "Шерзод ака",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    TP: "Шерзод ака",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    TP: "Шерзод ака",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    TP: "Шерзод ака",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    TP: "Шерзод ака",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    TP: "Шерзод ака",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
]);

const positionTableHeader = ref([
  {
    name: "Позиция",
    checked: true,
    key: "position",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "1",
    checked: true,
    key: "1",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "2",
    checked: true,
    key: "2",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "3",
    checked: true,
    key: "3",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "4",
    checked: true,
    key: "4",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "5",
    checked: true,
    key: "5",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "6",
    checked: true,
    key: "6",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "7",
    checked: true,
    key: "7",
    thWidth: "120px",
    type: "checked",
  },
]);

const positionTableLoadedData = ref([
  {
    position: "Lorem ipsum",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    position: "Lorem ipsum",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    position: "Lorem ipsum",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    position: "Lorem ipsum",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    position: "Lorem ipsum",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    position: "Lorem ipsum",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    position: "Lorem ipsum",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    position: "Lorem ipsum",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
]);

const territoryTableHeader = ref([
  {
    name: "Территория",
    checked: true,
    key: "territory",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "1",
    checked: true,
    key: "1",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "2",
    checked: true,
    key: "2",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "3",
    checked: true,
    key: "3",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "4",
    checked: true,
    key: "4",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "5",
    checked: true,
    key: "5",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "6",
    checked: true,
    key: "6",
    thWidth: "120px",
    type: "checked",
  },
  {
    name: "7",
    checked: true,
    key: "7",
    thWidth: "120px",
    type: "checked",
  },
]);

const territoryTableLoadedData = ref([
  {
    territory: "Алмазар",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    territory: "Алмазар",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    territory: "Алмазар",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    territory: "Алмазар",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    territory: "Алмазар",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    territory: "Алмазар",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    territory: "Алмазар",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
  {
    territory: "Алмазар",
    1: "156",
    2: "156",
    3: "156",
    4: "156",
    5: "156",
    6: "156",
    7: "156",
  },
]);
</script>


<style scoped>
/* Checked */
.form_radio_btn input[type="radio"]:checked + label {
  background: #299b9b;
  color: white;
  text-align: center;
}
</style>