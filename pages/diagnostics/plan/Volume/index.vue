<template>
  <div class="py-7.5 px-5 flex flex-col gap-7.5">
    <div class="flex justify-between">
      <h3 class="text-2xl font-semibold text-gray-3">
        Расспределение плана продаж по агентам
      </h3>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex w-1/2 gap-6">
        <div class="relative w-1/2 flex gap-4.5">
          <div class="my-2 fs-16">Месяць</div>
          <div
            class="w-2/3"
            v-click-outside="() => (filter.isSelectMonth = false)"
          >
            <div
              @click="filter.isSelectMonth = !filter.isSelectMonth"
              class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
            >
              <div class="ml-4 mt-2">
                <IconArrowBottom />
              </div>
              <div class="fs-14 text-gray ml-2">Октябрь</div>
            </div>
            <div
              v-if="filter.isSelectMonth"
              class="w-2/3 absolute pt-2 border top-10 z-50 rounded-lg bg-[#FAFDFD]"
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
        <div class="relative w-1/2 flex gap-4.5">
          <div class="my-2 fs-16">Год</div>
          <div
            class="w-2/3"
            v-click-outside="() => (filter.isSelectYear = false)"
          >
            <div
              @click="filter.isSelectYear = !filter.isSelectYear"
              class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
            >
              <div class="ml-4 mt-2">
                <IconArrowBottom />
              </div>
              <div class="fs-14 text-gray ml-2">2023</div>
            </div>
            <div
              v-if="filter.isSelectYear"
              class="w-2/3 absolute pt-2 border top-10 z-50 rounded-lg bg-[#FAFDFD]"
            >
              <div class="flex pl-3 w-full border-b border-[#E1E4E4]">
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
      </div>
      <div class="flex items-end justify-end gap-6">
        <div class="text-gray-3 text-base w-1/5">
          План текущего месяца (Ташкент)
        </div>
        <div class="flex items-center w-4/5 gap-4.5">
          <d-input class="w-1/2"></d-input>
          <d-input class="w-1/2"></d-input>
        </div>
      </div>
    </div>
    <h3 class="text-xl font-semibold text-gray-3">
      Общий план по категории продуктов
    </h3>
    <auditSmallDataTable
      :headers="generalHeader"
      :loadedData="generalLoadedData"
      :headerCenter="false"
      :noXPadding="true"
    />
    <h3 class="text-xl font-semibold text-gray-3">Агенты</h3>
    <auditSmallDataTable
      :headers="agentsHeader"
      :loadedData="agentsLoadedData"
      :headerCenter="false"
      :noXPadding="true"
    />
    <h3 class="text-xl font-semibold text-gray-3">Супервайзеры</h3>
    <auditSmallDataTable
      :headers="agentsHeader"
      :loadedData="agentsLoadedData"
      :headerCenter="false"
      :noXPadding="true"
    />
  </div>
</template>

<script setup lang="ts">
const filter = ref({
  isSelectMonth: false,
  isSelectYear: false,
});

const generalHeader = ref([
  {
    name: "Названия",
    checked: true,
    key: "name",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "Cola",
    checked: true,
    key: "cola",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
    outlinedData: true,
  },
  {
    name: "Fanta",
    checked: true,
    key: "fanta",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
    outlinedData: true,
  },
  {
    name: "Pepsi",
    checked: true,
    key: "pepsi",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
    outlinedData: true,
  },
  {
    name: "Dinay",
    checked: true,
    key: "dinay",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
    outlinedData: true,
  },
  {
    name: "Bliss",
    checked: true,
    key: "bliss",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
    outlinedData: true,
  },
]);

const generalLoadedData = ref([
  {
    name: "Процентное соотнощение %",
    cola: "12357",
    fanta: "12357",
    pepsi: "12357",
    dinay: "12357",
    bliss: "12357",
  },
  {
    name: "Рекомендованный объем",
    cola: "12357",
    fanta: "12357",
    pepsi: "12357",
    dinay: "12357",
    bliss: "12357",
  },
  {
    name: "Ручная поправка объема",
    cola: "12357",
    fanta: "12357",
    pepsi: "12357",
    dinay: "12357",
    bliss: "12357",
  },
]);

const agentsHeader = ref([
  {
    name: "Названия",
    checked: true,
    key: "name",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "Общее",
    checked: true,
    key: "general",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
    outlinedData: true,
  },
  {
    name: "Срендний процентпрошлого периода %",
    checked: true,
    key: "average",
    thHeight: "56px",
    type: "come",
    thWidth: "200px",
    outlinedData: true,
  },
  {
    name: "Текущий процент от общего плана%",
    checked: true,
    key: "current",
    thHeight: "56px",
    type: "come",
    thWidth: "200px",
    outlinedData: true,
  },
  {
    name: "Cola",
    checked: true,
    key: "cola",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
    outlinedData: true,
  },
  {
    name: "Fanta",
    checked: true,
    key: "fanta",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
    outlinedData: true,
  },
]);

const agentsLoadedData = ref([
  {
    name: "ТП Николай",
    general: "12357",
    average: "12357",
    current: "12357",
    cola: "12357",
    fanta: "12357",
  },
  {
    name: "ТП Николай",
    general: "12357",
    average: "12357",
    current: "12357",
    cola: "12357",
    fanta: "12357",
  },
  {
    name: "ТП Николай",
    general: "12357",
    average: "12357",
    current: "12357",
    cola: "12357",
    fanta: "12357",
  },
]);

const supervisorsHeader = ref([
  {
    name: "Названия",
    checked: true,
    key: "name",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "Общее",
    checked: true,
    key: "general",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
    outlinedData: true,
  },
  {
    name: "Срендний процентпрошлого периода %",
    checked: true,
    key: "average",
    thHeight: "56px",
    type: "come",
    thWidth: "200px",
    outlinedData: true,
  },
  {
    name: "Текущий процент от общего плана%",
    checked: true,
    key: "current",
    thHeight: "56px",
    type: "come",
    thWidth: "200px",
    outlinedData: true,
  },
  {
    name: "Cola",
    checked: true,
    key: "cola",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
    outlinedData: true,
  },
  {
    name: "Fanta",
    checked: true,
    key: "fanta",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
    outlinedData: true,
  },
]);

const supervisorsLoadedData = ref([
  {
    name: "ТП Николай",
    general: "12357",
    average: "12357",
    current: "12357",
    cola: "12357",
    fanta: "12357",
  },
  {
    name: "ТП Николай",
    general: "12357",
    average: "12357",
    current: "12357",
    cola: "12357",
    fanta: "12357",
  },
  {
    name: "ТП Николай",
    general: "12357",
    average: "12357",
    current: "12357",
    cola: "12357",
    fanta: "12357",
  },
]);
</script>

<style>
</style>