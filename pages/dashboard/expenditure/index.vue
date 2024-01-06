<template>
  <div>
    <div>
      <div class="flex justify-between mt-7">
        <page-title :title="'Статьи расходов'" />
        <div class="flex gap-5" v-if="count === 1">
          <m-btn @click="expandatureStore.newExpandatureDialog = true" class="w-53">Добавить</m-btn>
        </div>
        <div class="flex gap-5" v-if="count === 2">
          <m-btn @click="expandatureStore.newExpandatureCategoryDialog = true" class="w-53">Добавить</m-btn>
        </div>
      </div>
      <div class="mt-5">
        <DoubleTab first-tab-name="Статья расхода" second-tab-name="Категория расхода" @change="onChangeTab">
          <template #first>
            <DashboardExpenditureDataTable />
          </template>
          <template #second>
            <DashboardExpenditureCategoryTable />
          </template>
        </DoubleTab>
      </div>
    </div>
    <transition name="modal">
      <div v-if="expandatureStore.newExpandatureDialog">
        <d-modal @closeDialog="expandatureStore.newExpandatureDialog = false" :dataContainerWidth="'400px'"
          :name="'Статья расхода'">
          <DashboardExpenditureDialog @closeModal="expandatureStore.newExpandatureDialog = false" />
        </d-modal>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="expandatureStore.newExpandatureCategoryDialog">
        <d-modal @closeDialog="expandatureStore.newExpandatureCategoryDialog = false" :dataContainerWidth="'400px'"
          :name="'Категория расхода'">
          <DashboardExpenditureCategoryDialog @closeModal="expandatureStore.newExpandatureCategoryDialog = false" />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
// Store
const expandatureStore = useExpandature('');

const dialogStore2 = useDialogStore("expandCategory");

// State
const count = ref(1);
function onChangeTab(param) {
  count.value = param;
}
</script>
