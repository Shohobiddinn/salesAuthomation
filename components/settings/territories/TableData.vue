<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter :templates="territoriesStore.templates"></table-filter>
      <div>
        <search-input @change="territoriesStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'360kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3 w-full overflow-auto">
      <data-table
        :headers="territoriesStore.templates"
        @sort="territoriesStore.sortData"
        :sorted="territoriesStore.params.order_by"
      >
        <template #body>
          <c-tr v-for="data in territoriesStore.data?.items" :key="data">
            <c-td v-for="key in territoriesStore.templates" :key="key">
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
          :current-size="territoriesStore.params.PageSize"
          @setPageSize="territoriesStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="territoriesStore.data?.total_pages"
          :current-page="territoriesStore.data?.page_number"
          @setPage="territoriesStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" name="Управление меню таблицы">
        <drag-and-drop
          @change="(value) => (territoriesStore.templates = value)"
          :templates="territoriesStore.templates"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup lang="ts">
// Stores
const dialogStore = useDialogStore("territories");
const territoriesStore = useTerritoriesStore("");

// State
const draggable = ref(false);

// Methods
function draggableDialog() {
  draggable.value = false;
}
</script>
