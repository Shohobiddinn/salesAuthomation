<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <div>
        <i-btn>
          <IconRowSVG />
        </i-btn>
      </div>
      <div>
        <search-input
          :value="searchText"
          @updated="searchUpdated"
          class="w-full h-38px"
        />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3 w-full overflow-auto">
      <data-table
        :headers="productGroupsActiveStore.templates"
        @sort="productGroupsActiveStore.sortData"
        :sorted="productGroupsActiveStore.params.order_by"
      >
        <template #body>
          <c-tr v-for="data in productGroupsActiveStore.data?.items" :key="data">
            <c-td v-for="key in productGroupsActiveStore.templates" :key="key">
              <span v-if="key.key === 'color'">
                <sm-btn :style="{ background: data[key.key] }" class="p-3"></sm-btn>
              </span>
              <span>
                {{ data[key.key] }}
              </span>
            </c-td>
            <c-td>
              <div @click="() => dialogStore.edit({ ...data })" class="td-shadow p-2">
                <sm-btn>
                  <IconEdit></IconEdit>
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
          :current-size="productGroupsActiveStore.params.page_size"
          @setPageSize="productGroupsActiveStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="productGroupsActiveStore.data?.total_pages"
          :current-page="productGroupsActiveStore.data?.page_number"
          @setPage="productGroupsActiveStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="change"
          :templates="productGroupsActiveStore.templates"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// Store
const productGroupsActiveStore = useProductGroupsStore("main");
const dialogStore = useDialogStore("product_groups");

// State
function change(param) {
  productGroupsActiveStore.templates = param;
  draggable.value = false;
}

// State
const searchText = ref("");

const draggable = ref(false);

// Methods

function draggableDialog() {
  draggable.value = false;
}
</script>
