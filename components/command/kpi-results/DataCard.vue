<template>
  <div>
    <div class="grid grid-cols-4 gap-4">
      <div v-for="(i, index) in 8" class="bg-white rounded-lg relative">
        <div
          class="fs-14 font-[600] br-t bg-[#299B9B] text-[#000] opacity-[0.2] w-full py-1 px-2"
        >
          Агент
        </div>
        <div class="p-2">
          <div class="fs-12">Фикс. зарплата</div>
          <div class="fs-14 font-[600] mt-1">100 000 000сум</div>
          <div class="fs-12 mt-1">Общие</div>
          <div class="fs-14 font-[600] mt-1">100 000 000сум</div>
          <div class="fs-12 mt-1">Вознаграждение</div>
          <div class="fs-14 font-[600] mt-1">100 000 000сум</div>
          <div class="mt-1 w-full rounded-lg bg-[#E1E4E4] h-[8px]">
            <div class="w-[80%] bg-[#057CD1] h-[8px] rounded-lg"></div>
          </div>
          <button @click="openCard(index)" class="mt-2 flex">
            <div class="fs-14 font-[500]">Подробнее</div>
            <div class="pl-2 mt-2"><IconArrowBottom /></div>
          </button>
          <div
            class="absolute br-b right-0 card-shadow z-50 bg-white w-full p-2"
            v-if="card.isActive && card.index === index"
          >
            <div class="flex justify-between mt-4">
              <div class="flex">
                <div
                  class="h-[19px] w-[19px] rounded-[50px] bg-[#D9D9D9] mt-[2px]"
                ></div>
                <div
                  @click="supervisorsModal = true"
                  class="font-[500] text-[16px] cursor-pointer ml-2"
                >
                  Задача 2
                </div>
              </div>
              <div class="font-[500] text-[16px] text-red">%</div>
            </div>
            <div class="flex justify-between mt-2">
              <div class="fs-12">План задача 1</div>
              <div class="fs-14 font-[600] mt-1">100 000 000сум</div>
            </div>
            <div class="flex justify-between mt-2">
              <div class="fs-12">Выполнено</div>
              <div class="fs-14 font-[600] mt-1">0</div>
            </div>
            <div class="mt-1 w-full rounded-lg bg-[#E1E4E4] h-[8px]"></div>
            <div class="flex justify-between mt-2">
              <div class="fs-12">Вознаграждение</div>
              <div class="fs-14 font-[600] mt-1">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="supervisorsModal">
      <d-modal
        :dataContainerWidth="'710px'"
        @closeDialog="supervisorsDialog"
        :name="'Задача 1'"
      >
        <div class="relative">
          <CommandKpiResultsDialog />
        </div>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
const card = ref({
  isActive: false,
  index: -1,
});
const supervisorsModal = ref(false);
function supervisorsDialog() {
  supervisorsModal.value = false;
}
function openCard(index) {
  card.value.isActive = !card.value.isActive;
  card.value.index = index;
}
</script>

<style scoped>
.br-t {
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}
.br-b {
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
}
.card-shadow {
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.18);
}
</style>
