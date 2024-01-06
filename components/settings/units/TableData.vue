<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter :templates="unitsStore.templates"></table-filter>
      <div>
        <search-input @change="unitsStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3 w-full overflow-auto">
      <data-table
        :headers="unitsStore.templates"
        @sort="unitsStore.sortData"
        :sorted="unitsStore.params.order_by"
      >
        <template #body>
          <c-tr v-for="data in unitsStore.data?.items" :key="data">
            <c-td v-for="key in unitsStore.templates" :key="key">
              <div v-if="key.checked">
                {{ data[key.key] }}
              </div>
            </c-td>
            <c-td>
              <div class="td-shadow p-2">
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
          :current-size="unitsStore.params.page_size"
          @setPageSize="unitsStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="unitsStore.data?.total_pages"
          :current-page="unitsStore.data?.page_number"
          @setPage="unitsStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggable = false" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="onChangeTableHeaders"
          :templates="unitsStore.templates"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup lang="ts">
// Store
const unitsStore = useUnitsStore("");

// State
const draggable = ref(false);
const dialogStore = useDialogStore("units");

// Methods
const onChangeTableHeaders = (param) => {
  unitsStore.templates = param;
  draggable.value = false;
};
</script>

<style scoped></style>
