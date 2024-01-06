<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter :templates="taskTypesStore.templates"></table-filter>
      <div>
        <search-input @change="taskTypesStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3 w-full overflow-auto">
      <data-table
        :headers="taskTypesStore.templates"
        @sort="taskTypesStore.sortData"
        :sorted="taskTypesStore.params.order_by"
      >
        <template #body>
          <c-tr v-for="data in taskTypesStore.data?.items" :key="data">
            <c-td v-for="key in taskTypesStore.templates" :key="key">
              <div v-if="key.checked">
                {{ data[key.key] }}
              </div>
            </c-td>
            <c-td class="">
              <div class="p-2 td-shadow">
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
          :current-size="taskTypesStore.params.page_size"
          @setPageSize="taskTypesStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="taskTypesStore.data?.total_pages"
          :current-page="taskTypesStore.data?.page_number"
          @setPage="taskTypesStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" name="Управление меню таблицы">
        <drag-and-drop
          @change="change"
          :templates="taskTypesStore.templates"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
  taskTypesStore: Object,
});
function change(param: any) {
  props.taskTypesStore.templates = param;
  draggable.value = false;
}
// State
const draggable = ref(false);

// Stores
const dialogStore = useDialogStore("task_types");

function draggableDialog() {
  draggable.value = false;
}
</script>

<style scoped></style>
