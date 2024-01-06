<template>
  <div>
    <div>
      <div class="flex justify-between mt-7">
        <page-title :title="'Qarzdorlik'" />
        <div class="flex gap-5">
          <m-btn @click="backlogShow = true" class="w-53">Добавить</m-btn>
        </div>
      </div>
      <div class="mt-5">
        <DashboardBacklogFilterCard />
      </div>
      <div class="mt-5">
        <DashboardBacklogDataTable />
      </div>
    </div>
    <transition name="modal">
      <div>
        <d-modal
          v-if="backlogShow"
          @closeDialog="closeBacklog"
          :dataContainerWidth="'400px'"
          :name="'Добавить долг'"
        >
          <div class="relative w-full">
            <DashboardBacklogDialog />
          </div>
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
const backlogShow = ref(false);
function closeBacklog() {
  backlogShow.value = false;
}
</script>

<style scoped></style>
