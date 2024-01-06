<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div>
        <search-input
          @change="orderCommentsStore.search"
          class="w-full h-38px"
        />
      </div>
    </div>
    <div class="mt-3 w-full overflow-auto">
      <data-table
        :headers="orderCommentsStore.templates"
        @sort="orderCommentsStore.sortData"
        :sorted="orderCommentsStore.params.order_by"
      >
        <template #body>
          <c-tr v-for="data in orderCommentsStore.data?.items" :key="data">
            <c-td v-for="key in orderCommentsStore.templates" :key="key">
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
          :current-size="orderCommentsStore.params.page_size"
          @setPageSize="orderCommentsStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="orderCommentsStore.data?.total_pages"
          :current-page="orderCommentsStore.data?.page_number"
          @setPage="orderCommentsStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" name="Управление меню таблицы">
        <drag-and-drop
          @change="(value) => (orderCommentsStore.templates = value)"
          :templates="orderCommentsStore.templates"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup lang="ts">
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
const orderCommentsStore = useOrderCommentsStore(isActive.value.toString());
const dialogStore = useDialogStore("order_comments");

// Hooks
onMounted(() => {
  orderCommentsStore.getData(isActive.value);
});

function draggableDialog() {
  draggable.value = false;
}
</script>

<style scoped></style>
