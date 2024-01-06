<template>
  <div>
    <div class="rounded-lg bg-white border-grey py-3">
      <div class="flex flex-row gap-4 px-4 items-center">
        <div @click="draggable = true">
          <i-btn>
            <IconColsSVG />
          </i-btn>
        </div>
        <table-filter :templates="currenciesStore.templates"></table-filter>
        <div>
          <search-input @change="currenciesStore.search" class="w-full h-38px" />
        </div>
        <div>
          <excel-btn :size="'330kb'"></excel-btn>
        </div>
      </div>
      <div class="mt-3 w-full overflow-auto">
        <data-table
          :loading="loading"
          :headers="currenciesStore.templates"
          @sort="currenciesStore.sortData"
          :sorted="currenciesStore.params.order_by"
        >
          <template #body>
            <c-tr v-for="data in currenciesStore.data?.items" :key="data">
              <c-td v-for="key in currenciesStore.templates" :key="key">
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
            :current-size="currenciesStore.params.page_size"
            @setPageSize="currenciesStore.setPageSize"
          />
        </div>
        <div class="p-3">
          <page-index
            :available-pages="currenciesStore.data?.total_pages"
            :current-page="currenciesStore.data?.page_number"
            @setPage="currenciesStore.setPage"
          />
        </div>
      </div>
    </div>
    <transition name="modal">
      <div v-if="draggable">
        <d-modal @closeDialog="draggable = false" :name="'Управление меню таблицы'">
          <drag-and-drop
            @change="onChangeTableHeaders"
            :templates="currenciesStore.templates"
          ></drag-and-drop>
        </d-modal>
      </div>
    </transition>
    <loading-modal v-if="loading" name="Управление меню таблицы">
      <Loading />
    </loading-modal>
  </div>
</template>

<script setup lang="ts">
// Store
const dialogStore = useDialogStore("currencies");
const currenciesStore = useCurrenciesStore("");

// State
const draggable = ref(false);
const loading = ref(false);

// Methods
const onChangeTableHeaders = (param) => {
  currenciesStore.templates = param;
  draggable.value = false;
};

watch(currenciesStore.data?.items, () => {
  if (currenciesStore.data?.items.length > 0) {
    loading.value = true;
  } else {
    loading.value = false;
  }
});
</script>
