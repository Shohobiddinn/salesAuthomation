<template>
  <div>
    <div class="mt-4">
      <page-title :title="'Продажи по клиентам'" class="mb-4" />
      <div class="bg-white p-4 w-full rounded-lg">
        <div v-click-outside="clickOutside" class="flex justify-between">
          <page-title :title="'Фильтр'"></page-title>
          <flex-row class="gap-4">
            <flex-row
              class="rounded-lg bg-[#F4F9F9] green-50 h-full gap-2 items-center px-10"
            >
              <radio-btn>Дата заявки</radio-btn>
              <radio-btn>Дата отгрузки</radio-btn>
            </flex-row>
            <DatePicker class="w-fit"/>
          </flex-row>
        </div>
        <div class="grid grid-cols-3 gap-4 mt-4">
          <multiply-selection
            :filter.sync="filter.isProductCategory"
            @toggle="(toggle) => (filter.isProductCategory = toggle)"
            :name="'Статус'"
          />
          <multiply-selection
            :filter.sync="filter.isStatus"
            @toggle="(toggle) => (filter.isStatus = toggle)"
            :name="'Инвентарь'"
          />
          <multiply-selection
            :filter.sync="filter.isPriceType"
            @toggle="(toggle) => (filter.isPriceType = toggle)"
            :name="'Кленты'"
          />
        </div>
        <div class="grid grid-cols-4 gap-4 mt-4">
          <multiply-selection
            :filter.sync="filter.isSupervizor"
            @toggle="(toggle) => (filter.isSupervizor = toggle)"
            :name="'Категории продуктов'"
          />
          <multiply-selection
            :filter.sync="filter.isSelectAgent"
            @toggle="(toggle) => (filter.isSelectAgent = toggle)"
            :name="'Продукт'"
          />
          <multiply-selection
            :filter.sync="filter.isTerritory"
            @toggle="(toggle) => (filter.isTerritory = toggle)"
            :name="'Агент'"
          />
          <multiply-selection
            :filter.sync="filter.isSegmentClientov"
            @toggle="(toggle) => (filter.isSegmentClientov = toggle)"
            :name="'Группа товаров'"
          />
        </div>
        <div class="grid grid-cols-4 gap-4 mt-4">
          <multiply-selection
            :filter.sync="filter.isPaymentType"
            @toggle="(toggle) => (filter.isPaymentType = toggle)"
            :name="'День визита'"
          />
          <multiply-selection
            :filter.sync="filter.isProductGroup"
            @toggle="(toggle) => (filter.isProductGroup = toggle)"
            :name="'Категория клиентов'"
          />
          <multiply-selection
            :filter.sync="filter.isWarehouse"
            @toggle="(toggle) => (filter.isWarehouse = toggle)"
            :name="'Город'"
          />
          <multiply-selection
            :filter.sync="filter.isAllProduct"
            @toggle="(toggle) => (filter.isAllProduct = toggle)"
            :name="'Тип оплаты'"
          />
        </div>
        <flex-row class="h-full flex justify-end gap-2 mt-4">
          <m-btn class="w-[20%]"> Применить </m-btn>
          <sm-btn class="px-4 py-3">
            <IconReloadSVG />
          </sm-btn>
        </flex-row>
      </div>
    </div>
    <div class="mt-4">
      <ReportsCustomerMinimumDataTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const filter = ref({
  isSelectWarehouse: false,
  isSelectAgent: false,
  isSelectProduct: false,
  isSelectType: false,
  isProductCategory: false,
  isPriceType: false,
  isSupervizor: false,
  isSegmentClientov: false,
  isTerritory: false,
  isPaymentType: false,
  isProductGroup: false,
  isWarehouse: false,
  isAllProduct: false,
  date: false,
})
function clickOutside() {
  filter.value.isWarehouse = false
  filter.value.isSelectAgent = false
  filter.value.isSelectProduct = false
  filter.value.isProductCategory = false
  filter.value.isPriceType = false
  filter.value.isSupervizor = false
  filter.value.isSegmentClientov = false
  filter.value.isTerritory = false
  filter.value.isPaymentType = false
  filter.value.isProductGroup = false
  filter.value.isWarehouse = false
  filter.value.isAllProduct = false
}
</script>

<style scoped></style>
