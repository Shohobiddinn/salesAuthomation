<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter :templates="productActiveStore.templates"></table-filter>
      <div>
        <search-input
          :value="searchText"
          @change="productActiveStore.search"
          class="w-full h-38px"
        />
      </div>
      <div>
        <search-input @change="productActiveStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'460kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3 w-full overflow-auto">
      <data-table
        :headers="productActiveStore.templates"
        @sort="productActiveStore.sortData"
        :sorted="productActiveStore.params.order_by"
      >
        <template #body>
          <c-tr v-for="data in productActiveStore.data?.items" :key="data">
            <c-td v-for="key in productActiveStore.templates" :key="key">
              <div v-if="key.key === 'name' && key.checked">
                {{ data[key.key] }}
              </div>
              <div v-if="key.key === 'code' && key.checked">
                {{ data[key.key] }}
              </div>
              <div v-if="key.key === 'unit' && key.checked">
                {{ data[key.key].name }}
              </div>
            </c-td>
            <c-td>
              <div class="p-2 td-shadow">
                <sm-btn>
                  <IconEdit @click="() => dialogStore.edit({ ...data })"></IconEdit>
                </sm-btn>
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
          :current-size="productActiveStore.params.page_size"
          @setPageSize="productActiveStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="productActiveStore.data?.total_pages"
          :current-page="productActiveStore.data?.page_number"
          @setPage="productActiveStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="change"
          :templates="productActiveStore.templates"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// State
const productActiveStore = useProductCategoryStore("");
const dialogStore = useDialogStore("product_category");

// Store
const searchText = ref("");
const draggable = ref(false);

// Methods
function draggableDialog() {
  draggable.value = false;
}
function change(param) {
  productActiveStore.templates = param;
  draggable.value = false;
}
</script>
