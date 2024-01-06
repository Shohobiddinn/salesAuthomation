<template>
  <div v-click-outside="clickOutside" class="py-9 px-5">
    <h3 class="font-semibold text-2xl text-black text-gray-3 pb-9">
      Месячный отчет
    </h3>

    <div class="flex flex-col bg-white rounded-lg py-8 px-6">
      <div class="flex justify-between">
        <h3 class="font-semibold text-xl text-black text-gray-3">Фильтр</h3>
        <DatePicker />
      </div>
      <div class="flex pt-8 gap-20px">
        <div class="flex flex-col w-1/3">
          <div class="fs-12 my-2 font-normal fs-14">Мерчен</div>
          <div
            @click="filter.isSelectMerchandiser = !filter.isSelectMerchandiser"
            class="flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
          >
            <div class="ml-4 mt-2 arrow-icon">
              <IconArrowBottom />
            </div>
            <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
          </div>
        </div>
        <div class="flex flex-col w-1/3">
          <div class="fs-12 my-2 font-normal fs-14">Опрос</div>
          <div
            @click="filter.isSelectSurvey = !filter.isSelectSurvey"
            class="flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
          >
            <div class="ml-4 mt-2 arrow-icon">
              <IconArrowBottom />
            </div>
            <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
          </div>
        </div>
        <div class="flex flex-col w-1/3">
          <div class="fs-12 my-2 font-normal fs-14">Статус</div>
          <div
            @click="filter.isSelectStatus = !filter.isSelectStatus"
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

    <div class="flex gap-5 w-full pt-7.5">
      <div class="flex flex-col w-1/2">
        <h3 class="font-semibold text-2xl text-black text-gray-3 pb-9">
          По клиентам
        </h3>
        <div class="flex-col flex rounded-lg bg-white p-6 w-full">
          <div class="flex gap-6">
            <p class="fs-12 text-secondary-gray">
              Кол-во клиентов:
              <span class="text-gray-3 font-semibold">132</span>
            </p>
            <p class="fs-12 text-secondary-gray">
              Кол-во клиентов:
              <span class="text-gray-3 font-semibold">132</span>
            </p>
          </div>
          <auditSmallDataTable
            :headers="headers.client"
            :loadedData="loadedData.client"
          />
          <div class="flex gap-7.5 py-2.5">
            <div class="flex-col flex gap-3.75">
              <div class="flex gap-6">
                <div class="flex gap-2.5 items-center">
                  <div class="w-[26px] h-[13px] rounded-lg filter-bg"></div>
                  <span class="text-gray-3 fs-12">Coca cola</span>
                </div>
                <div class="flex gap-2.5 items-center">
                  <div class="w-[26px] h-[13px] rounded-lg bg-red"></div>
                  <span class="text-gray-3 fs-12">Coca cola</span>
                </div>
              </div>
              <div class="flex gap-6">
                <div class="flex gap-2.5 items-center">
                  <div class="w-[26px] h-[13px] rounded-lg bg-light-blue"></div>
                  <span class="text-gray-3 fs-12">Продукты конкурентов</span>
                </div>
                <div class="flex gap-2.5 items-center">
                  <div
                    class="w-[26px] h-[13px] rounded-lg bg-light-green"
                  ></div>
                  <span class="text-gray-3 fs-12">Наши продукты</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-1/2">
        <h3 class="font-semibold text-2xl text-black text-gray-3 pb-9">
          Планаграмма
        </h3>
        <div class="flex-col flex rounded-lg bg-white p-6 w-full">
          <div class="flex gap-6">
            <p class="fs-12 text-secondary-gray">
              Кол-во клиентов:
              <span class="text-gray-3 font-semibold">132</span>
            </p>
            <p class="fs-12 text-secondary-gray">
              Кол-во клиентов:
              <span class="text-gray-3 font-semibold">132</span>
            </p>
          </div>
          <auditSmallDataTable
            :headers="headers.planagram"
            :loadedData="loadedData.planagram"
          />
          <div class="flex gap-7.5 py-6.5">
            <div class="flex gap-2.5 items-center">
              <div class="w-[26px] h-[13px] rounded-lg filter-bg"></div>
              <span class="text-gray-3 fs-12">Нет</span>
            </div>
            <div class="flex gap-2.5 items-center">
              <div class="w-[26px] h-[13px] rounded-lg bg-red"></div>
              <span class="text-gray-3 fs-12">Полная</span>
            </div>
            <div class="flex gap-2.5 items-center">
              <div class="w-[26px] h-[13px] rounded-lg bg-red"></div>
              <span class="text-gray-3 fs-12">Частичная</span>
            </div>
          </div>
        </div>
        <div class="flex justify-end w-full mt-7.5">
          <button class="py-2 w-1/3 rounded-lg bg-[#299B9B] text-white">
            Скачать бану
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const filter = ref({
  isSelectMerchandiser: false,
  isSelectSurvey: false,
  isSelectStatus: false,
});

const clickOutside = () => {
  filter.value.isSelectMerchandiser = false;
  filter.value.isSelectSurvey = false;
  filter.value.isSelectStatus = false;
};

const headers = ref({
  client: [
    {
      name: "Вариант",
      checked: true,
      key: "option",
      thWidth: "120px",
      type: "checked",
    },
    {
      name: "Общий",
      checked: true,
      key: "general",
      thWidth: "120px",
      type: "checked",
    },
    {
      name: "Мин.",
      checked: true,
      key: "min",
      thWidth: "120px",
      type: "checked",
    },
    {
      name: "Средний",
      checked: true,
      key: "average",
      thWidth: "120px",
      type: "checked",
    },
    {
      name: "Макс.",
      checked: true,
      key: "max",
      thWidth: "120px",
      type: "checked",
    },
  ],
  planagram: [
    {
      name: "Вариант",
      checked: true,
      key: "option",
      thWidth: "120px",
      type: "checked",
    },
    {
      name: "Выбрано",
      checked: true,
      key: "choosen",
      thWidth: "120px",
      type: "checked",
    },
  ],
});

const loadedData = ref({
  client: [
    {
      option: "RC cola",
      general: "0",
      min: "0",
      average: "0",
      max: "0",
    },
    {
      option: "RC cola",
      general: "0",
      min: "0",
      average: "0",
      max: "0",
    },
    {
      option: "RC cola",
      general: "0",
      min: "0",
      average: "0",
      max: "0",
    },
    {
      option: "RC cola",
      general: "0",
      min: "0",
      average: "0",
      max: "0",
    },
  ],
  planagram: [
    {
      option: "RC cola",
      choosen: "0",
    },
    {
      option: "RC cola",
      choosen: "0",
    },
    {
      option: "RC cola",
      choosen: "0",
    },
    {
      option: "RC cola",
      choosen: "0",
    },
  ],
});
</script>
