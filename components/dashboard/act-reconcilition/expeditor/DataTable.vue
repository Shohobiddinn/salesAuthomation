<template>
  <div class="rounded-lg bg-white border-grey px-[2px]">
    <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <SettingsRlpDiscountsTableCheckbox
        :headers="dashboardExpeditorsActRecStore.templates"
      ></SettingsRlpDiscountsTableCheckbox>
      <div>
        <search-input
          @change="dashboardExpeditorsActRecStore.search"
          class="w-full h-38px"
        />
      </div>
      <div>
        <excel-btn size="340kb"></excel-btn>
      </div>
    </div>
    <div class="overflow-auto table-containers">
      <data-table
        :headers="dashboardExpeditorsActRecStore.templates"
        @sort="dashboardExpeditorsActRecStore.sortData"
        :sorted="dashboardExpeditorsActRecStore.params.order_by"
        :loading="dashboardExpeditorsActRecStore.isLoading"
        :isEmpty="!dashboardExpeditorsActRecStore.data?.items?.length"
      >
        <template #body>
          <template
            v-for="(data, index) in dashboardExpeditorsActRecStore.data?.items"
            :key="index"
          >
            <c-tr class="b-bottom border-b-none cursor-pointer">
              <c-td-no-edit
                v-for="key in dashboardExpeditorsActRecStore.templates"
                :key="key"
              >
                <div class="py-2 underline pb-2" v-if="key.key === 'data' && key.checked">
                  {{ data[key.key] }}
                </div>
                <div class="py-2" v-if="key.key !== 'data' && key.checked">
                  {{ data[key.key] }}
                </div>
              </c-td-no-edit>
            </c-tr>
          </template>
          <tr class="border-b-1">
            <td>
              <div class="h-15 w-35 border rounded-lg py-2 px-4 ml-2 mb-2">
                <div class="fs-12">Обороты</div>
                <div class="fs-16 fw-6">100 000</div>
              </div>
            </td>
            <td>
              <div class="h-15 w-35 border rounded-lg py-2 px-4 ml-2 mb-2">
                <div class="fs-12">Итог</div>
                <div class="fs-16 fw-6">700 400</div>
              </div>
            </td>
          </tr>
        </template>
      </data-table>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14"> Показать по </span>
        <page-size-btn
          :current-size="dashboardExpeditorsActRecStore.params.page_size"
          @setPageSize="dashboardExpeditorsActRecStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="dashboardExpeditorsActRecStore.data?.total_pages"
          :current-page="dashboardExpeditorsActRecStore.data?.page_number"
          @setPage="dashboardExpeditorsActRecStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggable = false" name="Управление меню таблицы">
        <drag-and-drop
          @change="onChangeHeaders"
          :templates="dashboardExpeditorsActRecStore.templates"
        />
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// Store
const dashboardExpeditorsActRecStore = useDashboardExpeditorsActRecStore("");

// State
const draggable = ref(false);

// Methods
const onChangeHeaders = (param) => {
  dashboardExpeditorsActRecStore.templates = param;
  draggable.value = false;
};
</script>
