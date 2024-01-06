<template>
  <rounded-white-container :without-padding="true" class="py-4 border-grey">
    <flex-row class="justify-between px-4">
      <flex-row class="gap-4 whitespace-nowrap">
        <i-btn @click="draggable = true">
          <IconColsSVG />
        </i-btn>
        <SettingsRlpDiscountsTableCheckbox :headers="customerStore.templates" />
        <search-input @updated="customerStore.search" class="w-full h-38px" />
        <excel-btn :size="'340kb'"></excel-btn>
      </flex-row>
    </flex-row>
    <flex-row class="overflow-auto w-full my-4">
      <data-table
        class="w-full"
        @sort="customerStore.setFilters"
        :headers="customerStore.templates"
        :sorted="customerStore.params.filter"
      >
        <template #body>
          <c-tr v-for="data in customerStore.fakeData" :key="data">
            <template v-for="key in customerStore.templates">
              <c-td-no-edit :custom-padding="true" class="py-3">
                <template v-if="key.type && key.type === 'checkbox'">
                  <label class="pl-2">
                    <input type="checkbox" v-model="data[key.key]" />
                    <span></span>
                  </label>
                </template>
                <template v-else>
                  <div class="pl-3">
                    {{ data[key.key] }}
                  </div>
                </template>
              </c-td-no-edit>
            </template>
          </c-tr>
        </template>
      </data-table>
    </flex-row>
    <flex-row class="justify-between">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14"> Показать по </span>
        <page-size-btn
          :current-size="customerStore.params.page_size"
          @setPageSize="customerStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="
            customerStore.data?.total_pages
              ? customerStore.data?.total_pages
              : 1
          "
          :current-page="
            customerStore.data?.page_number
              ? customerStore.data?.page_number
              : 1
          "
          @setPage="customerStore.setPage"
        />
      </div>
    </flex-row>
  </rounded-white-container>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal
        @closeDialog="draggable = false"
        :name="'Управление меню таблицы'"
      >
        <drag-and-drop
          @change="(value) => (customerStore.templates = value)"
          :templates="customerStore.templates"
        />
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// Store
const customerStore = useReportCustomerStore("main");

// State
let draggable = ref(false);
</script>

<style scoped>
label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
[type="checkbox"]:checked + span:before {
  content: "\f106";
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all 0.4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299b9b;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
