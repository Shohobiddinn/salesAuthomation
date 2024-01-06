<template>
  <div>
    <div>
      <div class="flex justify-between mt-7">
        <page-title :title="'Расходы'" />
        <div class="flex gap-5">
          <button class="rounded-lg h-11 px-11 fs-14 text-white bg-[#057CD1]">
            Добавить категорию
          </button>
          <m-btn @click="expensesShow = true" class="w-53">Добавить</m-btn>
        </div>
      </div>
      <div class="mt-5">
        <DashboardExpensesFilterCard />
      </div>
      <div class="mt-6">
        <DashboardExpensesDataTable />
      </div>
      <div v-click-outside="outside" class="mt-5 relative">
        <button
          @click="totalShow = !totalShow"
          class="rounded-lg bg-white border border-blue-20 py-2 px-11"
        >
          Итого
        </button>
        <div
          v-if="totalShow"
          class="absolute w-180 h-40 rounded-lg bg-white top-12 px-4"
        >
          <div class="pt-4"><page-title :title="'Итого'" /></div>
          <div class="flex justify-between">
            <div class="py-2">
              <div class="text-[18px] py-2">Доллар сша</div>
              <div class="text-[18px]">Доллар сша</div>
            </div>
            <div>
              <div class="text-[18px] py-2">100 000 000</div>
              <div class="text-[18px]">100 000 000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="modal">
      <div v-if="expensesShow">
        <d-modal
          @closeDialog="closeExpenses"
          :dataContainerWidth="'400px'"
          :name="'Добавление расходов'"
        >
          <div class="relative w-full">
            <DashboardExpensesDialog />
          </div>
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
const totalShow = ref(false);
function outside() {
  totalShow.value = false;
}
const expensesShow = ref(false);
function closeExpenses() {
  expensesShow.value = false;
}
</script>

<style scoped></style>
