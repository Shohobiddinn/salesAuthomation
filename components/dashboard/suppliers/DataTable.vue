<template>
  <div class="rounded-lg bg-white border-grey px-[2px]">
    <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <SettingsRlpDiscountsTableCheckbox :headers="suppliersStore.headers" />
      <div>
        <search-input @change="suppliersStore.onSearch" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="overflow-auto table-containers">
      <data-table
        :headers="suppliersStore.headers"
        :loading="suppliersStore.isLoading"
        @sort="suppliersStore.sortData"
        :sorted="suppliersStore.params.order_by"
      >
        <template #body>
          <template
            v-for="(data, index) in suppliersStore.data?.items"
            :key="data?.id"
          >
            <c-tr class="b-bottom cursor-pointer">
              <c-td-no-edit v-for="key in suppliersStore.headers" :key="key">
                <div v-if="key.key === 'name'" class="py-2 pb-2 flex">
                  <div class="rounded-[50%] w-3 h-3 bg-blue-10 m-1"></div>
                  {{ data[key.key] }}
                </div>
                <div v-else-if="key.key === 'no'">
                  {{ index + 1 }}
                </div>
                <div
                  v-else-if="key.key === 'action'"
                  class="py-2 text-blue-10 pb-2 flex"
                >
                  <div class="flex gap-6 items-center">
                    <div
                      class="flex gap-3 items-center"
                      @click="editingSupplierId = data.id"
                    >
                      <IconEdit /> Редактировать
                    </div>
                    <div
                      v-if="index !== 0"
                      class="flex gap-3 items-center"
                      @click="suppliersStore.deleteDialog = data.id"
                    >
                      <IconTrash /> Удалить
                    </div>
                  </div>
                </div>
                <div v-else-if="key.key === 'is_active'">
                  {{ data[key.key] ? "Активный" : "Не активный" }}
                </div>
                <div v-else class="py-2">
                  {{ data[key.key] }}
                </div>
              </c-td-no-edit>
            </c-tr>
          </template>
        </template>
      </data-table>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14"> Показать по </span>
        <page-size-btn
          :current-size="suppliersStore.params.page_size"
          @setPageSize="suppliersStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="suppliersStore.data?.total_pages"
          :current-page="suppliersStore.data?.page_number"
          @setPage="suppliersStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="onChangeHeaders"
          :templates="suppliersStore.headers"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="editingSupplierId">
      <d-modal @closeDialog="editingSupplierId = ''" :name="'Ред. поставщика'">
        <DashboardSuppliersDataDialog
          :supplierId="editingSupplierId"
          @closeDialog="editingSupplierId = ''"
        />
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="suppliersStore.deleteDialog">
      <d-modal @closeDialog="suppliersStore.deleteDialog = ''" :name="'Удалить поставщика'">
        <DashboardSuppliersDeleteDialog />
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// store
const suppliersStore = useSuppliersStore("main");

// State
const draggable = ref(false);
const editingSupplierId = ref("");

// Methods
onMounted(async () => {
  await suppliersStore.getData();
});

function draggableDialog() {
  draggable.value = false;
}

const onChangeHeaders = (param) => {
  suppliersStore.headers = param;
  draggable.value = false;
};
</script>
