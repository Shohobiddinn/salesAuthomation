<template>
  <div>
    <div class="mt-2 text-[24px] font-[600] text-[#424F4F]">
      Отчет о поступлении товара на склад
    </div>
    <div class="mt-4">
      <div class="bg-white p-4 w-full rounded-[12px]">
        <div v-click-outside="clickOutside" class="flex justify-between">
          <div class="mt-2 text-[24px] font-[600] text-[#424F4F]">Фильтр</div>
          <div class="flex mt-2">
            <DatePicker />
          </div>
        </div>
        <div class="grid grid-cols-5 gap-4 mt-4">
          <multiply-selection
            :name="'Склад'"
            :filter.sync="filter.isCash"
            @toggle="(toggle) => (filter.isCash = toggle)"
          />
          <multiply-selection
            :name="'Категория'"
            :filter.sync="filter.isCash"
            @toggle="(toggle) => (filter.isCash = toggle)"
          />
          <multiply-selection
            :name="'Продукт'"
            :filter.sync="filter.isCash"
            @toggle="(toggle) => (filter.isCash = toggle)"
          />
          <multiply-selection
            :name="'Кол-во'"
            :filter.sync="filter.isCash"
            @toggle="(toggle) => (filter.isCash = toggle)"
          />
          <multiply-selection
            :name="'История продаж'"
            :filter.sync="filter.isCash"
            @toggle="(toggle) => (filter.isCash = toggle)"
          />
        </div>
        <div class="flex justify-end w-full h-40px mt-6">
          <button class="w-[17%] py-2 rounded-lg bg-[#299B9B] text-white">
            Применить
          </button>
          <boutton class="mt-3 ml-3"><IconRe /></boutton>
        </div>
      </div>
    </div>
    <div class="flex justify-between mt-2">
      <page-title :title="'Таблица'" />
      <div class="flex gap-4 mt-4">
        <excel-btn :size="'340kb'"></excel-btn>
        <button class="bg-white border border-blue-10 rounded-lg p-2 px-5">
          Детальный отчет по дням
        </button>
      </div>
    </div>
    <div class="mt-4">
      <WarehousesIncomeReportsDataTable />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const date = ref(false);
const filter = ref({
  isSelectWarehouse: false,
  isSelectAgent: false,
  isSelectProduct: false,
  isSelectType: false,
});
const clickOutside = () => {
  filter.value.isSelectWarehouse = false;
  filter.value.isSelectAgent = false;
  filter.value.isSelectProduct = false;
  filter.value.isSelectType = false;
  date.value = false;
};
</script>

<style scoped></style>
