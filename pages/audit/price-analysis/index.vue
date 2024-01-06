<template>
  <div class="py-9 px-5">
    <h3 class="font-semibold text-2xl text-black text-gray-3 pb-9">
      Цены по продуктам
    </h3>

    <div class="flex flex-col bg-white rounded-lg py-8 px-6">
      <div class="flex justify-between">
        <h3 class="font-semibold text-xl text-black text-gray-3">Фильтр</h3>
        <DatePicker />
      </div>
      <div class="flex pt-8 gap-20px">
        <div class="flex flex-col w-1/3">
          <div class="fs-12 my-2 font-normal fs-14">Аудит</div>
          <div
            @click="filter.isSelectAudit = !filter.isSelectAudit"
            class="flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
          >
            <div class="ml-4 mt-2 arrow-icon">
              <IconArrowBottom />
            </div>
            <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
          </div>
        </div>
        <div class="flex flex-col w-1/3">
          <div class="fs-12 my-2 font-normal fs-14">Мерчендайзер</div>
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
          <div class="fs-12 my-2 font-normal fs-14">Продукты</div>
          <div
            @click="filter.isSelectProduct = !filter.isSelectProduct"
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

    <div class="pt-6">
      <auditPriceAnalysisDataTable />
    </div>
  </div>
</template>


<script setup lang="ts">
const filter = ref({
  isSelectAudit: false,
  isSelectMerchandiser: false,
  isSelectProduct: false,
});
</script>