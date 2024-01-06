<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter :templates="rlpBonusStore.templates"></table-filter>
      <div>
        <search-input @change="rlpBonusStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3 w-full overflow-auto">
      <data-table
        :headers="rlpBonusStore.templates"
        @sort="rlpBonusStore.sortData"
        :sorted="rlpBonusStore.params.order_by"
      >
        <template #body>
          <c-tr v-for="data in rlpBonusStore.data?.items" :key="data">
            <c-td v-for="key in rlpBonusStore.templates" :key="key">
              <div v-if="key.checked === true">
                {{ data[key.key] }}
              </div>
            </c-td>
            <c-td class="">
              <div
                @click="() => dialogStore.edit({ ...data })"
                class="py-2 pl-2 td-shadow"
              >
                <IconEdit></IconEdit>
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
          :current-size="rlpBonusStore.params.page_size"
          @setPageSize="rlpBonusStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="rlpBonusStore.data?.total_pages"
          :current-page="rlpBonusStore.data?.page_number"
          @setPage="rlpBonusStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="change"
          :templates="rlpBonusStore.templates"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// Store
const rlpBonusStore = useRlpBonustore("");
const dialogStore = useDialogStore("rlp-discount");

// State
const draggable = ref(false);

// Methods
function draggableDialog() {
  draggable.value = false;
}
function change(param) {
  rlpBonusStore.templates = param;
  draggable.value = false;
}
</script>
