<template>
  <div class="w-full overflow-auto pb-3 bg-white mb-2 rounded-lg border-grey">
    <table class="w-full rounded-t-large overflow-hidden whitespace-nowrap">
      <thead>
        <tr class="bg-lotion">
          <template v-for="header in expandatureStore.templatesCategory" :key="header">
            <td class="fw-4 text-gray-3 px-2 py-2.5 tdc">
              <flex-row :style="{ width: header.thWidth }" class="justify-start fw-4 fs-14 items-center text-gray-400">
                <span>
                  {{ header.name }}
                </span>
              </flex-row>
            </td>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="(data, index) in expandatureStore.dataExpense" :key="data">
          <tr class="border-t-1">
            <td v-for="key in expandatureStore.templatesCategory" :key="key" class="pl-3 tdc">
              <flex-col v-if="key.key !== 'cashFlow'" class="py-2">
                <flex-row class="justify-start fw-4 fs-14 items-center text-gray-700">
                  <div v-if="key.key !== 'actions'" class="dv">
                    <div>{{ data[key.key] }}</div>
                  </div>
                  <button @click="isOpenEditDialog(data)" v-if="key.key === 'actions'" class="dv flex gap-1">
                    <IconEdit />
                    <div class="fs-14 text-blue-10">Редактрировать</div>
                  </button>
                </flex-row>
              </flex-col>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <transition name="modal">
      <div v-if="editOPenmodal">
        <d-modal @closeDialog="editOPenmodal = false" :dataContainerWidth="'400px'" name="Ред. категория расхода">
          <DashboardExpenditureCategoryDialog :value="selectedDate" @closeModal="editOPenmodal = false" />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
// Stores
const expandatureStore = useExpandature('')
const selectedDate = ref({});
const editOPenmodal = ref(false);

// Methods
const isOpenEditDialog = (data) => {
  selectedDate.value = { ...data }
  editOPenmodal.value = true
}
// Hooks
onMounted(async () => {
  await expandatureStore.getData()
})
</script>

<style scoped>
.tdc:last-child {
  display: flex;
  justify-content: end;
  padding-right: 18px;
}
</style>
