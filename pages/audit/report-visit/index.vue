<template>
  <div class="py-9 px-5">
    <h3 class="font-semibold text-2xl text-black text-gray-3 pb-9">
      Дневной отчёт
    </h3>

    <div class="flex-col flex gap-6">
      <div class="flex flex-col bg-white rounded-lg py-8 px-6">
        <div class="flex justify-start">
          <h3 class="font-semibold text-xl text-black text-gray-3">Фильтр</h3>
        </div>
        <div class="flex w-full flex-col pt-8 gap-6">
          <div class="flex w-full gap-5">
            <div class="flex flex-col w-1/3">
              <div class="fs-12 my-2 font-normal fs-14">Визиты</div>
              <div
                @click="filter.isSelectVisits = !filter.isSelectVisits"
                class="flex pt-2 h-11 border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
              >
                <div class="ml-4 mt-2 arrow-icon">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
              </div>
            </div>
            <div class="flex flex-col w-1/3">
              <div class="fs-12 my-2 font-normal fs-14">Тип</div>
              <div
                @click="filter.isSelectType = !filter.isSelectType"
                class="flex pt-2 h-11 border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
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
                class="flex pt-2 h-11 border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
              >
                <div class="ml-4 mt-2 arrow-icon">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
              </div>
            </div>
          </div>
          <div class="flex w-full gap-5 items-center">
            <div class="flex flex-col w-1/4">
              <div class="fs-12 my-2 font-normal fs-14">Месяц</div>
              <div
                @click="filter.isSelectMonth = !filter.isSelectMonth"
                class="flex pt-2 h-11 border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
              >
                <div class="ml-4 mt-2 arrow-icon">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
              </div>
            </div>
            <div class="flex flex-col w-1/4">
              <div class="fs-12 my-2 font-normal fs-14">Год</div>
              <div
                @click="filter.isSelectYear = !filter.isSelectYear"
                class="flex pt-2 h-11 border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
              >
                <div class="ml-4 mt-2 arrow-icon">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
              </div>
            </div>
            <div class="flex gap-2.5 w-1/4 items-center mt-9">
              <input type="checkbox" class="checkbox" id="amountVisits" />
              <label for="amountVisits" class="fs-16 text-gray-3"
                >Кол-во визиты</label
              >
            </div>
            <div class="flex gap-2.5 w-2/6 mt-9">
              <button class="w-3/4 h-11 rounded-lg bg-[#299B9B] text-white">
                Применить
              </button>
              <button class="mt-3 ml-3 cursor-pointer"><IconRe /></button>
            </div>
          </div>
        </div>
      </div>

      <flex-row class="w-full overflow-auto mb-3 bg-white rounded-lg">
        <div>
          <div class="h-45px">
            <div
              class="bg-lotion fs -18 w-full h-full border-t-1 border-r-1 flex justify-center items-center font-semibold text-black"
            >
              Мерчандайзер
            </div>
          </div>
          <data-table
            :headers="headers.merchandiser"
            @sort="sortData"
            :sorted="sortedData"
            class="border-r-1"
          >
            <template #body>
              <c-tr
                v-for="data in loadedData.merchandiser"
                :key="data"
                class="border-b-none b-bottom cursor-pointer"
              >
                <c-td-no-edit v-for="key in headers.merchandiser" :key="key">
                  <div class="py-14px">
                    {{ data[key.key] }}
                  </div>
                </c-td-no-edit>
              </c-tr>
            </template>
          </data-table>
        </div>
        <div>
          <div class="h-45px">
            <div
              class="bg-lotion h-full border-t-1 border-r-1 flex items-center"
            >
              <span
                class="w-1/30 text-black flex items-center justify-center font-semibold text-black fs-18"
                >Ноябрь</span
              >
            </div>
          </div>
          <data-table
            :headers="headers.month"
            @sort="sortData"
            :sorted="sortedData"
            class="border-r-1"
          >
            <template #body>
              <c-tr
                v-for="data in loadedData.month"
                :key="data"
                class="border-b-none b-bottom cursor-pointer"
              >
                <c-td-no-edit v-for="key in headers.month" :key="key">
                  <div class="py-14px">
                    {{ data[key.key] }}
                  </div>
                </c-td-no-edit>
              </c-tr>
            </template>
          </data-table>
        </div>
      </flex-row>
    </div>
  </div>
</template>

<script setup lang="ts">
const filter = ref({
  isSelectVisits: false,
  isSelectType: false,
  isSelectStatus: false,
  isSelectMonth: false,
  isSelectYear: false,
});

let headers = ref({
  merchandiser: [
    {
      name: "",
      checked: true,
      key: "name",
      type: "come",
      thWidth: "140px",
      thHeight: "28px",
    },
  ],
  month: [
    {
      name: "1",
      checked: true,
      key: "1",
      type: "come",
      thWidth: "140px",
    },
    {
      name: "2",
      checked: true,
      key: "2",
      type: "come",
      thWidth: "140px",
    },
    {
      name: "3",
      checked: true,
      key: "3",
      type: "come",
      thWidth: "140px",
    },
    {
      name: "4",
      checked: true,
      key: "4",
      type: "come",
      thWidth: "140px",
    },
    {
      name: "5",
      checked: true,
      key: "5",
      type: "come",
      thWidth: "140px",
    },
    {
      name: "6",
      checked: true,
      key: "6",
      type: "come",
      thWidth: "140px",
    },
    {
      name: "7",
      checked: true,
      key: "7",
      type: "come",
      thWidth: "140px",
    },
    {
      name: "8",
      checked: true,
      key: "8",
      type: "come",
      thWidth: "140px",
    },
    {
      name: "9",
      checked: true,
      key: "9",
      type: "come",
      thWidth: "140px",
    },
    {
      name: "10",
      checked: true,
      key: "10",
      type: "come",
      thWidth: "140px",
    },
    {
      name: "11",
      checked: true,
      key: "11",
      type: "come",
      thWidth: "140px",
    },
    {
      name: "12",
      checked: true,
      key: "12",
      type: "come",
      thWidth: "140px",
    },
    {
      name: "13",
      checked: true,
      key: "13",
      type: "come",
      thWidth: "140px",
    },
    {
      name: "14",
      checked: true,
      key: "14",
      type: "come",
      thWidth: "140px",
    },
    {
      name: "15",
      checked: true,
      key: "15",
      type: "come",
      thWidth: "140px",
    },
    {
      name: "16",
      checked: true,
      key: "16",
      type: "come",
      thWidth: "140px",
    },
    {
      name: "17",
      checked: true,
      key: "17",
      type: "come",
      thWidth: "140px",
    },
  ],
});
const loadedData = ref({
  merchandiser: [
    {
      name: "ТП Андрей",
    },
    {
      name: "ТП Андрей",
    },
    {
      name: "ТП Андрей",
    },
    {
      name: "ТП Андрей",
    },
    {
      name: "ТП Андрей",
    },
    {
      name: "ТП Андрей",
    },
  ],
  month: [
    {
      1: "132",
      2: "132",
      3: "132",
      4: "132",
      5: "132",
      6: "132",
      7: "132",
      8: "132",
      9: "132",
      10: "132",
      11: "132",
      12: "132",
      13: "132",
      14: "132",
      15: "132",
      16: "132",
      17: "132",
    },
    {
      1: "132",
      2: "132",
      3: "132",
      4: "132",
      5: "132",
      6: "132",
      7: "132",
      8: "132",
      9: "132",
      10: "132",
      11: "132",
      12: "132",
      13: "132",
      14: "132",
      15: "132",
      16: "132",
      17: "132",
    },
    {
      1: "132",
      2: "132",
      3: "132",
      4: "132",
      5: "132",
      6: "132",
      7: "132",
      8: "132",
      9: "132",
      10: "132",
      11: "132",
      12: "132",
      13: "132",
      14: "132",
      15: "132",
      16: "132",
      17: "132",
    },
    {
      1: "132",
      2: "132",
      3: "132",
      4: "132",
      5: "132",
      6: "132",
      7: "132",
      8: "132",
      9: "132",
      10: "132",
      11: "132",
      12: "132",
      13: "132",
      14: "132",
      15: "132",
      16: "132",
      17: "132",
    },
    {
      1: "132",
      2: "132",
      3: "132",
      4: "132",
      5: "132",
      6: "132",
      7: "132",
      8: "132",
      9: "132",
      10: "132",
      11: "132",
      12: "132",
      13: "132",
      14: "132",
      15: "132",
      16: "132",
      17: "132",
    },
    {
      1: "132",
      2: "132",
      3: "132",
      4: "132",
      5: "132",
      6: "132",
      7: "132",
      8: "132",
      9: "132",
      10: "132",
      11: "132",
      12: "132",
      13: "132",
      14: "132",
      15: "132",
      16: "132",
      17: "132",
    },
  ],
});
let sortedData = ref({ key: "", mode: "" });

function sortData(data: any) {
  sortedData.value = data;
}
</script>