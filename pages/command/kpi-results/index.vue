<template>
  <div class="h10vhc">
    <div class="mt-2 text-[24px] font-[600] text-[#424F4F]">KPI результаты</div>
    <div class="mt-4">
      <div class="bg-white p-4 w-full rounded-lg">
        <div class="flex justify-between">
          <div class="mt-2 text-[24px] font-[600] text-[#424F4F]">Фильтр</div>
          <div class="flex">
            <button class="rounded-lg border-[#299B9B] border">
              <div class="flex justify-center py-1 px-12">
                <div class="pt-2 pr-4"><IconArrowBottom /></div>
                <div>Ноябрь</div>
              </div>
            </button>
            <button class="rounded-lg border-[#299B9B] border ml-4">
              <div class="flex justify-center py-1 px-12">
                <div class="pt-2 pr-4"><IconArrowBottom /></div>
                <div>2022</div>
              </div>
            </button>
          </div>
        </div>

        <div v-click-outside="clickOutside" class="grid grid-cols-4 gap-4">
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
                <div v-for="i in 15" class="flex pl-3 pt-2">
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
            <div class="fs-12 my-2">Супервайзер</div>
            <div
              @click="filter.isSelectProduct = !filter.isSelectProduct"
              class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
            >
              <div class="ml-4 mt-2">
                <IconArrowBottom />
              </div>
              <div class="fs-14 text-gray ml-2">Выбрать</div>
            </div>
            <div
              v-if="filter.isSelectProduct"
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
                <div
                  style="
                    border-bottom-right-radius: 8px;
                    border-bottom-left-radius: 8px;
                  "
                  class="absolute flex justify-center bottom-0 h-40px w-100 bg-white z-[9999]"
                >
                  <button
                    class="w-[80%] bg-[#299B9B] fs-12 h-[30px] text-white rounded-lg mt-1"
                  >
                    load
                  </button>
                </div>
                <div v-for="i in 15" class="flex pl-3 pt-2">
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
            <div class="fs-12 my-2">Тип</div>
            <div
              @click="filter.isSelectType = !filter.isSelectType"
              class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
            >
              <div class="ml-4 mt-2">
                <IconArrowBottom />
              </div>
              <div class="fs-14 text-gray ml-2">Выбрать</div>
            </div>
            <div
              v-if="filter.isSelectType"
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
                <div v-for="i in 15" class="flex pl-3 pt-2">
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
          <div class="flex w-full h-40px mt-9">
            <button class="w-[80%] py-2 rounded-lg bg-[#299B9B] text-white">
              Применить
            </button>
            <boutton class="mt-3 ml-3"><IconRe /></boutton>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between mt-8">
      <div class="text-[20px] font-[600]">Результаты</div>
      <div class="h-40px w-[132px] rounded-[12px] bg-white grid grid-cols-2">
        <button
          @click="openTable"
          :class="result.resultTable ? 'activeBg' : ''"
          class="br-l pl-5"
        >
          <IconLayout :result="result" />
        </button>
        <button
          @click="openCard"
          :class="result.resultCard ? 'activeBg' : ''"
          class="br-r pl-5"
        >
          <IconFrame :result="result" />
        </button>
      </div>
    </div>
    <div v-if="result.resultTable" class="w-full h-40px mt-6">
      <CommandKpiResultsDataTable />
    </div>
    <div v-if="result.resultCard" class="w-full h-40px mt-6">
      <CommandKpiResultsDataCard />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const filter = ref({
  isSelectWarehouse: false,
  isSelectAgent: false,
  isSelectProduct: false,
  isSelectType: false,
});
const result = ref({
  resultTable: false,
  resultCard: true,
});
const clickOutside = () => {
  filter.value.isSelectWarehouse = false;
  filter.value.isSelectAgent = false;
  filter.value.isSelectProduct = false;
  filter.value.isSelectType = false;
};
function openTable() {
  result.value.resultTable = true;
  result.value.resultCard = false;
}
function openCard() {
  result.value.resultTable = false;
  result.value.resultCard = true;
}
</script>

<style scoped>
.h10vhc {
  height: calc(100vh - 80px);
}
.activeBg {
  background-color: #299b9b;
  color: white;
}
.br-l {
  border-bottom-left-radius: 12px;
  border-top-left-radius: 12px;
}
.br-r {
  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
}
</style>
