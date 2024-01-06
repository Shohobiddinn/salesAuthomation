<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter :templates="priceTypeStore.templates"></table-filter>
      <div>
        <search-input @change="priceTypeStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3 w-full overflow-auto">
      <data-table
        :headers="priceTypeStore.templates"
        @sort="priceTypeStore.sortData"
        :sorted="priceTypeStore.params.order_by"
      >
        <template #body>
          <c-tr v-for="data in priceTypeStore.data?.items" :key="data">
            <c-td v-for="key in priceTypeStore.templates" :key="key">
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
          :current-size="priceTypeStore.params.page_size"
          @setPageSize="priceTypeStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="priceTypeStore.data?.total_pages"
          :current-page="priceTypeStore.data?.page_number"
          @setPage="priceTypeStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="change"
          :templates="priceTypeStore.templates"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// Store
const priceTypeStore = usePriceTypesStore("");
const dialogStore = useDialogStore("priceTypes");

// State
const draggable = ref(false);

// Methods
function change(param) {
  priceTypeStore.templates = param;
  draggable.value = false;
}

function draggableDialog() {
  draggable.value = false;
}
</script>
