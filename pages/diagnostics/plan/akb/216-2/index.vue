<template>
  <div class="py-7.5 px-5 flex flex-col gap-7.5">
    <div class="flex justify-between">
      <h3 class="text-2xl font-semibold text-gray-3">Установка плана AKB</h3>
      <nuxt-link to="akb/plan" class="w-1/5">
        <m-btn class="w-full">Установить план</m-btn>
      </nuxt-link>
    </div>

    <div class="flex w-full gap-6">
      <div class="relative w-1/4 flex gap-4.5">
        <div class="my-2 fs-16">Месяць</div>
        <div class="w-2/3">
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
      <div class="relative w-1/4 flex gap-4.5">
        <div class="my-2 fs-16">Год</div>
        <div class="w-2/3">
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

    <auditSmallDataTable
      :headers="generalHeader"
      :loadedData="generalLoadedData"
      :headerCenter="false"
      :noXPadding="true"
    />

    <div class="pb-64">
      <h4 class="text-xl font-semibold text-gray-3 pb-2.5">
        Итого по супервайзерам
      </h4>
      <auditSmallDataTable
        :headers="superviserHeader"
        :loadedData="superviserLoadedData"
        :headerCenter="false"
        :noXPadding="true"
      />
    </div>
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
    name: "Общее",
    checked: true,
    key: "general",
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
  },
  {
    name: "Fanta",
    checked: true,
    key: "fanta",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "Pepsi",
    checked: true,
    key: "pepsi",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "Dinay",
    checked: true,
    key: "dinay",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "Bliss",
    checked: true,
    key: "bliss",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
  },
]);

const superviserHeader = ref([
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
  },
  {
    name: "Cola",
    checked: true,
    key: "cola",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "Fanta",
    checked: true,
    key: "fanta",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "Pepsi",
    checked: true,
    key: "pepsi",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "Dinay",
    checked: true,
    key: "dinay",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
  },
  {
    name: "Bliss",
    checked: true,
    key: "bliss",
    thHeight: "56px",
    type: "come",
    thWidth: "120px",
  },
]);

const generalLoadedData = ref([
  {
    name: "Тп андрей",
    general: "13568",
    cola: "13568",
    fanta: "13568",
    pepsi: "13568",
    dinay: "13568",
    bliss: "13568",
  },
  {
    name: "Тп андрей",
    general: "13568",
    cola: "13568",
    fanta: "13568",
    pepsi: "13568",
    dinay: "13568",
    bliss: "13568",
  },
  {
    name: "Тп андрей",
    general: "13568",
    cola: "13568",
    fanta: "13568",
    pepsi: "13568",
    dinay: "13568",
    bliss: "13568",
  },
  {
    name: "Тп андрей",
    general: "13568",
    cola: "13568",
    fanta: "13568",
    pepsi: "13568",
    dinay: "13568",
    bliss: "13568",
  },
]);

const superviserLoadedData = ref([
  {
    name: "Супервайзер",
    general: "13568",
    cola: "13568",
    fanta: "13568",
    pepsi: "13568",
    dinay: "13568",
    bliss: "13568",
  },
]);
</script>
