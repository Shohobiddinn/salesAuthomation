<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter :templates="segmentsStore.templates"></table-filter>
      <div>
        <search-input @change="segmentsStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3 w-full overflow-auto">
      <data-table
        :headers="segmentsStore.templates"
        @sort="segmentsStore.sortData"
        :sorted="segmentsStore.params.order_by"
      >
        <template #body>
          <c-tr v-for="data in segmentsStore.data?.items" :key="data">
            <c-td v-for="key in segmentsStore.templates" :key="key">
              <div v-if="key.checked">
                {{ data[key.key] }}
              </div>
            </c-td>
            <c-td>
              <div class="p-2 td-shadow">
                <IconEdit @click="() => dialogStore.edit({ ...data })"></IconEdit>
              </div>
            </c-td>
          </c-tr>
        </template>
      </data-table>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14"> Показать по </span>
        <page-size-btn
          :current-size="segmentsStore.params.page_size"
          @setPageSize="segmentsStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="segmentsStore.data?.total_pages"
          :current-page="segmentsStore.data?.page_number"
          @setPage="segmentsStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="change"
          :templates="segmentsStore.templates"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// Stores
const dialogStore = useDialogStore("segments");
const segmentsStore = useSegmentsStore("segments");

// State
const draggable = ref(false);

// Methods
function change(param) {
  segmentsStore.templates = param;
  draggable.value = false;
}

function draggableDialog() {
  draggable.value = false;
}
</script>
