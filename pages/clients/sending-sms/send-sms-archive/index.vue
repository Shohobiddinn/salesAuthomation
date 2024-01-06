<template>
  <div>
    <button
      @click="$router.push('/clients/combining-clients')"
      class="h-[44px] px-[46px] mt-8 bg-[#FFFFFF] text-black rounded-lg border"
    >
      <div class="flex">
        <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
        Назад
        <slot></slot>
      </div>
    </button>
    <div>
      <div><page-title :title="'Отправить смс (Архив)'" /></div>
      <div>
        <div v-click-outside="clickOutside" class="mt-6 h-full">
          <div class="bg-white p-4 w-full rounded-lg">
            <div class="grid grid-cols-3 gap-4 mt-4">
              <multiply-selection
                :filter.sync="filter.isSelectAgent"
                @toggle="(toggle) => (filter.isSelectAgent = toggle)"
                :name="'Состояние'"
              />
              <multiply-selection
                :filter.sync="filter.isSelectTerritory"
                @toggle="(toggle) => (filter.isSelectTerritory = toggle)"
                :name="'Тип шаблона'"
              />
              <div class="flex justify-end">
                <div class="flex justify-end w-full h-40px mt-[34px]">
                  <div class="mr-4">
                    <DatePicker />
                  </div>
                  <button
                    class="w-[55%] py-2 rounded-lg bg-[#299B9B] text-white"
                  >
                    Применить
                  </button>
                  <boutton class="mt-3 ml-3"><IconRe /></boutton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 mb-2"><page-title :title="'Клиент'" /></div>
      <div>
        <LazyClientsSendingSmsArchiveDataTable />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const filter = ref({
  isSelectTerritory: false,
  isSelectAgent: false,
});
const clickOutside = () => {
  filter.value.isSelectTerritory = false;
  filter.value.isSelectAgent = false;
};
</script>

<style scoped></style>
