<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div>
        <i-btn @click="draggable = true">
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter
        :templates="categoryGroupsActiveStore.templates"
      ></table-filter>
      <div>
        <search-input
          :value="searchText"
          @change="categoryGroupsActiveStore.search"
          class="w-full h-38px"
        />
      </div>
      <div>
        <excel-btn :size="'420kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3 w-full overflow-auto">
      <data-table
        :headers="categoryGroupsActiveStore.templates"
        @sort="categoryGroupsActiveStore.sortData"
        :sorted="categoryGroupsActiveStore.params.order_by"
      >
        <template #body>
          <c-tr
            v-for="data in categoryGroupsActiveStore.data?.items"
            :key="data"
          >
            <c-td v-for="key in categoryGroupsActiveStore.templates" :key="key">
              <div v-if="key.key === 'categories'">
                <div v-for="category in data[key.key]" :key="category.id">
                  {{ category?.name }}
                </div>
              </div>
              <div v-else>
                {{ data[key.key] }}
              </div>
            </c-td>
            <c-td>
              <div
                @click="() => dialogStore.edit({ ...data })"
                class="td-shadow p-2"
              >
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
          :current-size="categoryGroupsActiveStore.params.page_size"
          @setPageSize="categoryGroupsActiveStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="categoryGroupsActiveStore.data?.total_pages"
          :current-page="categoryGroupsActiveStore.data?.page_number"
          @setPage="categoryGroupsActiveStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal
        @closeDialog="draggable = false"
        :name="'Управление меню таблицы'"
      >
        <drag-and-drop
          @change="onChangeTableHeaders"
          :templates="categoryGroupsActiveStore.templates"
        />
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="dialogStore.isDialogOpen">
      <d-modal @closeDialog="dialogStore.closeDialog" name="Группа категория">
        <SettingsProductCategoryGroupNewGroupBody />
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// Store
const categoryGroupsActiveStore = useCategoryGroupsStore(true);
const dialogStore = useDialogStore("category_groups");

// State
const searchText = ref("");
const draggable = ref(false);

// Methods
const onChangeTableHeaders = (param) => {
  categoryGroupsActiveStore.templates = param;
  draggable.value = false;
};

onMounted(() => {
  categoryGroupsActiveStore.getData(true);
});
</script>
