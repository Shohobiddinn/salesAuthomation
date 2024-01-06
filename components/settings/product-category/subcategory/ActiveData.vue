<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter :templates="productCategoryStore.templates"></table-filter>
      <div>
        <search-input
          @change="productCategoryStore.search"
          class="w-full h-38px"
        />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3 w-full overflow-auto">
      <data-table
        :headers="productCategoryStore.templates"
        @sort="productCategoryStore.sortData"
        :sorted="productCategoryStore.params.order_by"
      >
        <template #body>
          <c-tr v-for="data in productCategoryStore.data?.items" :key="data">
            <c-td v-for="key in productCategoryStore.templates" :key="key">
              <div v-if="key.checked && key.key !== 'unit'">
                {{ data[key.key] }}
              </div>
              <div v-if="key.checked && key.key === 'unit'">
                {{ data[key.key].name }}
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
          :current-size="productCategoryStore.params.page_size"
          @setPageSize="productCategoryStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="productCategoryStore.data?.total_pages"
          :current-page="productCategoryStore.data?.page_number"
          @setPage="productCategoryStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="(value) => (productCategoryStore.templates = value)"
          :templates="productCategoryStore.templates"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// Props
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});

// State
const draggable = ref(false);
const { isActive } = toRefs(props);

// Stores
const productCategoryStore = useProductSubCategoryStore(
  isActive.value.toString()
);
const dialogStore = useDialogStore("product_sub_category");

// Hooks
watchEffect(() => {
  if(props.isActive.toString()){
    productCategoryStore.params.filter[0].value = [isActive.value.toString()]
  }
})

function draggableDialog() {
  draggable.value = false;
}
</script>

<style scoped></style>
