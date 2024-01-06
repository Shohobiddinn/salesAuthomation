<template>
  <div class="py-9 px-5">
    <h3 class="font-semibold text-2xl text-black text-gray-3 pb-9">Retail</h3>

    <div class="flex flex-col bg-white rounded-lg py-8 px-6">
      <div class="flex justify-between">
        <h3 class="font-semibold text-xl text-black text-gray-3">Фильтр</h3>
        <DatePicker />
      </div>
      <div class="grid pt-8 gap-5 grid-cols-4">
        <div class="flex flex-col">
          <div class="fs-12 my-2 font-normal fs-14">Позиция</div>
          <div
            @click="filter.isSelectPosition = !filter.isSelectPosition"
            class="flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
          >
            <div class="ml-4 mt-2 arrow-icon">
              <IconArrowBottom />
            </div>
            <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="fs-12 my-2 font-normal fs-14">Территория</div>
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
        <div class="flex flex-col">
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
        <div class="flex flex-col">
          <div class="fs-12 my-2 font-normal fs-14">Категория продукта</div>
          <div
            @click="
              filter.isSelectCategoryProduct = !filter.isSelectCategoryProduct
            "
            class="flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
          >
            <div class="ml-4 mt-2 arrow-icon">
              <IconArrowBottom />
            </div>
            <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="fs-12 my-2 font-normal fs-14">Разделение продуктов</div>
          <div
            @click="
              filter.isSelectProductSeparation =
                !filter.isSelectProductSeparation
            "
            class="flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
          >
            <div class="ml-4 mt-2 arrow-icon">
              <IconArrowBottom />
            </div>
            <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="fs-12 my-2 font-normal fs-14">Тип ТТ</div>
          <div
            @click="filter.isSelectTypeTT = !filter.isSelectTypeTT"
            class="flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
          >
            <div class="ml-4 mt-2 arrow-icon">
              <IconArrowBottom />
            </div>
            <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="fs-12 my-2 font-normal fs-14">Категория ТТ</div>
          <div
            @click="filter.isSelectCategoryTT = !filter.isSelectCategoryTT"
            class="flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD] border-[#E1E4E4] w-full"
          >
            <div class="ml-4 mt-2 arrow-icon">
              <IconArrowBottom />
            </div>
            <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
          </div>
        </div>

        <div class="flex h-10 mt-9 justify-between">
          <button class="w-3/4 rounded-lg bg-[#299B9B] text-white">
            Применить
          </button>
          <button class="mt-3 ml-3 cursor-pointer"><IconRe /></button>
        </div>
      </div>
    </div>

    <div class="pt-6">
      <auditRetailDataTable />
    </div>
  </div>
</template>

<script setup lang="ts">
const filter = ref({
  isSelectPosition: false,
  isSelectTerritory: false,
  isSelectAudit: false,
  isSelectCategoryProduct: false,
  isSelectProductSeparation: false,
  isSelectTypeTT: false,
  isSelectCategoryTT: false,
});
</script>