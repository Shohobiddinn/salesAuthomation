<template>
  <RoundedWhiteContainer>
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="i in 12"
        :key="i"
        @click="cardOpen = true"
        class="border rounded-lg p-2 h-92"
      >
        <img class="w-full h-50" src="~assets/rectangle.png" alt="" />
        <div v-for="item in card" :key="item" class="flex justify-between py-1">
          <div class="fs-12">{{ item.name }}</div>
          <div class="fs-12 fw-6">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </RoundedWhiteContainer>
  <transition name="modal">
    <div v-if="cardOpen">
      <h-no-modal :dataContainerWidth="'724px'" @closeDialog="closeCard">
        <div class="relative w-full -mt-10 -ml-6">
          <img src="~assets/rectangle.png" alt="" />
        </div>
      </h-no-modal>
    </div>
  </transition>
</template>

<script setup>
const card = ref([
  {
    name: "Дата",
    title: "05.11.2022",
  },
  {
    name: "Получатель",
    title: "Lorem ipsum",
  },
  {
    name: "Отправил",
    title: "Fakhriyor",
  },
  {
    name: "Комментарии",
    title: "Lorem ipsum doin",
  },
  {
    name: "Тип суммы",
    title: "120 000 000",
  },
  {
    name: "Сумма",
    title: "120 000 000",
  },
]);

const cardOpen = ref(false);
function closeCard() {
  cardOpen.value = false;
}
</script>

<style scoped></style>
