<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter :templates="inventoryTypesStore.templates"></table-filter>
      <div>
        <search-input
          @change="inventoryTypesStore.search"
          class="w-full h-38px"
        />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3 w-full overflow-auto">
      <data-table
        :headers="inventoryTypesStore.templates"
        @sort="inventoryTypesStore.sortData"
        :sorted="inventoryTypesStore.params.order_by"
      >
        <template #body>
          <c-tr v-for="data in inventoryTypesStore.data?.items" :key="data">
            <c-td v-for="key in inventoryTypesStore.templates" :key="key">
              <div v-if="key.checked">
                {{ data[key.key] }}
              </div>
            </c-td>
            <c-td class="">
              <div class="td-shadow p-2">
                <IconEdit
                  @click="() => dialogStore.edit({ ...data })"
                ></IconEdit>
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
          :current-size="inventoryTypesStore.params.page_size"
          @setPageSize="inventoryTypesStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="inventoryTypesStore.data?.total_pages"
          :current-page="inventoryTypesStore.data?.page_number"
          @setPage="inventoryTypesStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" name="Управление меню таблицы">
        <drag-and-drop
          @change="change"
          :templates="inventoryTypesStore.templates"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
  inventoryTypesStore: Object,
});

// State
const draggable = ref(false);
function change(param: any) {
  props.inventoryTypesStore.templates = param;
  draggable.value = false;
}
// Stores
const dialogStore = useDialogStore("inventory_types");

function draggableDialog() {
  draggable.value = false;
}
</script>

<style scoped></style>
