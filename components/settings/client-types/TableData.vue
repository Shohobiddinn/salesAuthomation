<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div>
        <i-btn @click="draggable = true">
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter :templates="clientTypesStore.templates"></table-filter>
      <div>
        <search-input @change="clientTypesStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'420kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3 w-full overflow-auto">
      <data-table
        :headers="clientTypesStore.templates"
        @sort="clientTypesStore.sortData"
        :sorted="clientTypesStore.params.order_by"
      >
        <template #body>
          <c-tr v-for="data in clientTypesStore.data?.items" :key="data">
            <c-td v-for="key in clientTypesStore.templates" :key="key">
              <div v-if="key.checked">
                <span v-if="key.type === 'color'">
                  <sm-btn
                    :style="{ background: data[key.key] }"
                    class="p-3"
                  ></sm-btn>
                </span>
                <span v-else>
                  {{ data[key.key] }}
                </span>
              </div>
            </c-td>
            <c-td>
              <sm-btn>
                <div class="td-shadow p-2 mb-[-5px]">
                  <IconEdit
                    @click="() => dialogStore.edit({ ...data })"
                  ></IconEdit>
                </div>
              </sm-btn>
            </c-td>
          </c-tr>
        </template>
      </data-table>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14"> Показать по </span>
        <page-size-btn
          :current-size="clientTypesStore.params.page_size"
          @setPageSize="clientTypesStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="clientTypesStore.data?.total_pages"
          :current-page="clientTypesStore.data?.page_number"
          @setPage="clientTypesStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="(value) => (clientTypesStore.templates = value)"
          :templates="clientTypesStore.templates"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
  clientTypesStore: Object,
});

// State
const draggable = ref(false);

// Stores
const dialogStore = useDialogStore("client_types");

function draggableDialog() {
  draggable.value = false;
}
</script>

<style scoped></style>
