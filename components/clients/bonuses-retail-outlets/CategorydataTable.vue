<template>
  <div class="rounded-lg bg-white border-grey px-[2px]">
    <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <SettingsRlpDiscountsTableCheckbox
        :headers="headers"
      ></SettingsRlpDiscountsTableCheckbox>
      <div>
        <search-input
          @change="clientsRemainsStore.searchFromByCategory"
          class="w-full h-38px"
        />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="w-full overflow-auto">
      <data-table
        :headers="headers"
        :loading="clientsRemainsStore.isLoadingByCategory"
        @sort="clientsRemainsStore.sortDataByCategory"
        :sorted="clientsRemainsStore.byCategoryParams.OrderBy"
      >
        <template #body>
          <template v-for="data in clientsRemainsStore.byCategoryData?.items" :key="data?.client_id">
            <c-tr class="border-b-none b-bottom cursor-pointer">
              <c-td-no-edit v-for="key in headers" :key="key">
                <div class="py-2">
                  {{ data[key.key] }}
                </div>
              </c-td-no-edit>
            </c-tr>
          </template>
        </template>
      </data-table>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14"> Показать по </span>
        <page-size-btn
          :current-size="clientsRemainsStore.byCategoryParams.PageSize"
          @setPageSize="clientsRemainsStore.setPageSizeByCategory"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="clientsRemainsStore.byCategoryData?.total_pages"
          :current-page="clientsRemainsStore.byCategoryData?.page_number"
          @setPage="clientsRemainsStore.setPageByCategory"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop @change="onChangeTableHeaders" :templates="headers"></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// Stores
const clientsRemainsStore = useClientsRemainsStore("main");

const props = defineProps({
  isActive: Boolean
})

// State
const headers = ref([...clientsRemainsStore.headers])
const draggable = ref(false);

// Methods
const getData = async () => {
  if(!clientsRemainsStore.byCategoryData){
    await clientsRemainsStore.getDataByCategory()
  }
}

watchEffect(async () => {
  if(props.isActive) {
    await getData()
  }
})

function draggableDialog() {
  draggable.value = false;
}

const onChangeTableHeaders = (param) => {
  headers.value = param;
  draggable.value = false;
};

</script>

<style scoped>
.b-bottom:last-child {
  border-bottom: 1px solid #e1e4e4;
}
</style>
