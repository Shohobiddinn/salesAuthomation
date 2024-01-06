<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter :templates="tarasStore.templates"></table-filter>
      <div>
        <search-input @change="tarasStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3 w-full overflow-auto">
      <data-table
        :headers="tarasStore.templates"
        @sort="tarasStore.sortData"
        :sorted="tarasStore.params.order_by"
      >
        <template #body>
          <c-tr v-for="(data, index) in tarasStore.data?.items" :key="data">
            <c-td v-for="key in tarasStore.templates" :key="key">
              <div v-if="key.checked && key.key !== 'products'">
                {{ data[key.key] }}
              </div>
              <div v-if="key.checked && key.key === 'products'">
                {{ data.products[index]?.product_name }}
              </div>
            </c-td>
            <c-td>
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
          :current-size="tarasStore.params.page_size"
          @setPageSize="tarasStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="tarasStore.data?.total_pages"
          :current-page="tarasStore.data?.page_number"
          @setPage="tarasStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="change"
          :templates="tarasStore.templates"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup lang="ts">
// Props

const props = defineProps({
  tarasStore: Object,
});
function change(param: any) {
  props.tarasStore.templates = param;
  draggable.value = false;
}

// State
const draggable = ref(false);

// Stores
const dialogStore = useDialogStore("taras");

function draggableDialog() {
  draggable.value = false;
}
</script>

<style scoped></style>
