<template>
  <div>
    <page-title :title="'Материальный отчет'" />
    <div class="mt-4">
      <div class="bg-white p-4 w-full rounded-[12px]">
        <div v-click-outside="clickOutside" class="flex justify-between">
          <div class="mt-2 text-[24px] font-[600] text-[#424F4F]">Фильтр</div>
          <div class="flex mt-2">
            <DatePicker />
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4 mt-4">
          <multiply-selection
            :name="'Категории продукта'"
            :filter.sync="filter.isCash"
            @toggle="(toggle) => (filter.isCash = toggle)"
          />
          <multiply-selection
            :name="'Склад'"
            :filter.sync="filter.isCash"
            @toggle="(toggle) => (filter.isCash = toggle)"
          />
          <multiply-selection
            :name="'Дата с'"
            :filter.sync="filter.isCash"
            @toggle="(toggle) => (filter.isCash = toggle)"
          />
          <multiply-selection
            :name="'Дата до'"
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
    <div class="mt-4">
      <WarehousesMaterialReportDataTable />
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
