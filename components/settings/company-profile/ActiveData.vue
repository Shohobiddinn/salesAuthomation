<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter :templates="company_profileStore.templates"></table-filter>
      <div>
        <search-input @change="company_profileStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3 w-full overflow-auto">
      <data-table
        :headers="company_profileStore.templates"
        @sort="company_profileStore.sortData"
        :sorted="company_profileStore.params.order_by"
      >
        <template #body>
          <c-tr>
            <c-td>
              <div>
                {{ company_profileStore.data?.name }}
              </div>
            </c-td>
            <c-td>
              <div>
                {{ company_profileStore.data?.company_name }}
              </div>
            </c-td>
            <c-td>
              <div>
                {{ company_profileStore.data?.phone }}
              </div>
            </c-td>
            <c-td>
              <div>
                {{ company_profileStore.data?.email }}
              </div>
            </c-td>
            <c-td>
              <div>
                {{ company_profileStore.data?.address }}
              </div>
            </c-td>
            <c-td>
              <div class="td-shadow p-2">
                <IconEdit @click="dialogStore.openDialog"></IconEdit>
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
          :current-size="company_profileStore.params.page_size"
          @setPageSize="company_profileStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="company_profileStore.data?.total_pages"
          :current-page="company_profileStore.data?.page_number"
          @setPage="company_profileStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggable = false" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="onChangeTableHeaders"
          :templates="company_profileStore.templates"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="dialogStore.isDialogOpen">
      <d-modal name="Изменить данные компании" @closeDialog="dialogStore.closeDialog">
        <SettingsCompanyProfileEditCompanyBody />
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// Stores
const company_profileStore = useCompany_profileStore(true);
const dialogStore = useDialogStore("company_profile");

// State
const draggable = ref(false);

// Methods
const onChangeTableHeaders = (param) => {
  company_profileStore.templates = param;
  draggable.value = false;
};
// Hooks
onMounted(async () => {
  await company_profileStore.getData();
});
</script>
