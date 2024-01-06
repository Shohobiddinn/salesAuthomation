<template>
  <div>
    <div>
      <div class="flex justify-between mt-7">
        <page-title :title="'Фотоотчёт по кассе'" />
        <div class="flex gap-4">
          <div
            class="h-40px w-[132px] rounded-[12px] bg-white grid grid-cols-2"
          >
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
          <m-btn @click="photo = true" class="w-50">Добавить</m-btn>
        </div>
      </div>
      <div class="mt-4">
        <DashboardPhotoReportFIlterCard />
      </div>
      <div v-if="result.resultTable" class="mt-6">
        <DashboardPhotoReportActiveData />
      </div>
      <div v-if="result.resultCard" class="mt-6">
        <DashboardPhotoReportCard />
      </div>
    </div>
    <transition name="modal">
      <div v-if="photo">
        <d-modal
          :dataContainerWidth="'724px'"
          @closeDialog="closePhoto"
          :name="'Добавить фотоотчёт по кассе'"
        >
          <div class="relative w-full">
            <DashboardPhotoReportDialog />
          </div>
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const result = ref({
  resultTable: false,
  resultCard: true,
});

function openTable() {
  result.value.resultTable = true;
  result.value.resultCard = false;
}
function openCard() {
  result.value.resultTable = false;
  result.value.resultCard = true;
}
const photo = ref(false);
function closePhoto() {
  photo.value = false;
}
</script>

<style scoped>
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
