<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter :templates="printersStore.templates"></table-filter>
      <div>
        <search-input @change="printersStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3 w-full overflow-auto">
      <data-table
        :headers="printersStore.templates"
        @sort="printersStore.sortData"
        :sorted="printersStore.params.order_by"
      >
        <template #body>
          <c-tr v-for="data in printersStore.data?.items" :key="data">
            <c-td v-for="key in printersStore.templates" :key="key">
              <div v-if="key.checked && key.key === 'agents'">
                {{ data[key.key][0].agent_name }}
              </div>
              <div v-if="key.checked && key.key !== 'agents'">
                {{ data[key.key] }}
              </div>
            </c-td>
            <c-td>
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
          :current-size="printersStore.params.page_size"
          @setPageSize="printersStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="printersStore.data?.total_pages"
          :current-page="printersStore.data?.page_number"
          @setPage="printersStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="change"
          :templates="printersStore.templates"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <loading-modal v-if="printersStore.loading"
                 name="Управление меню таблицы">
    <Loading/>
  </loading-modal>
</template>

<script setup>
// Props
import { usePrintersStore } from "~/stores/settings/printers/printers.store";
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});
// State
const draggable = ref(false);
const { isActive } = toRefs(props);
function change(param) {
  printersStore.templates = param;
  draggable.value = false;
}
// Stores
const printersStore = usePrintersStore(isActive.value.toString());
const dialogStore = useDialogStore("printers");

// Hooks
onMounted(() => {
  printersStore.getData(isActive.value);
});

function draggableDialog() {
  draggable.value = false;
}
</script>

<style scoped></style>
