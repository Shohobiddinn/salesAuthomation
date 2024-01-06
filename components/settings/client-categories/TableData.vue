<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter :templates="clientCategoriesStore.templates"></table-filter>
      <div>
        <search-input @change="clientCategoriesStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'380kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3">
      <data-table
        :headers="clientCategoriesStore.templates"
        @sort="clientCategoriesStore.sortData"
        :sorted="clientCategoriesStore.params.order_by"
      >
        <template #body>
          <c-tr v-for="data in clientCategoriesStore.data?.items" :key="data">
            <c-td v-for="key in clientCategoriesStore.templates" :key="key">
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
          :current-size="clientCategoriesStore.params.page_size"
          @setPageSize="clientCategoriesStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="clientCategoriesStore.data?.total_pages"
          :current-page="clientCategoriesStore.data?.page_number"
          @setPage="clientCategoriesStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggable = false" name="Управление меню таблицы">
        <drag-and-drop @change="change" :templates="clientCategoriesStore.templates">
        </drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup lang="ts">
// Store
const clientCategoriesStore = useClientCategoriesStore("");
const dialogStore = useDialogStore("client_categories");

// Methods
function change(value: any) {
  clientCategoriesStore.templates = value;
  draggable.value = false;
}

// State
const draggable = ref(false);
</script>
