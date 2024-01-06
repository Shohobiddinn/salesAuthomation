<template>
  <div class="flex mb-4 flex-row gap-4 items-center">
    <div @click="draggable = true">
      <i-btn>
        <IconColsSVG />
      </i-btn>
    </div>
    <SettingsRlpDiscountsTableCheckbox
      :headers="assignmentReportsStore.headers"
    />
    <div>
      <!-- @change="assignmentReportsStore.search" -->
      <search-input class="w-full h-38px" />
    </div>
    <div>
      <excel-btn :size="'340kb'"></excel-btn>
    </div>
  </div>
  <div class="rounded-lg bg-white border-grey px-[2px]">
    <div class="w-full overflow-auto">
      <data-table
        :headers="assignmentReportsStore.headers"
        :loading="!assignmentReportsStore.data"
        :withInformationAboveHeader="true"
        @sort="sortData"
        :sorted="sortedData"
      >
        <template #body>
          <template
            v-for="(data, index) in assignmentReportsStore.data?.items"
            :key="index"
          >
            <c-tr class="b-bottom cursor-pointer">
              <c-td-no-edit
                v-for="key in assignmentReportsStore.headers"
                :key="key"
              >
                <div class="py-2" v-if="key.checked">
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
          :current-size="assignmentReportsStore.params.pageSize"
          @setPageSize="assignmentReportsStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="assignmentReportsStore.data?.total_pages"
          :current-page="assignmentReportsStore.data?.page_number"
          @setPage="assignmentReportsStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          :templates="assignmentReportsStore.headers"
          @change="onChangeTableHeaders"
        />
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// store
const assignmentReportsStore = useAssignmentReportsStore("main");

// State
const draggable = ref(false);

// Methods
function draggableDialog() {
  draggable.value = false;
}

let sortedData = ref({ key: "", mode: "" });

// Methods
function sortData(data) {
  sortedData.value = data;
}

const onChangeTableHeaders = (value) => {
  assignmentReportsStore.headers = value;
  draggableDialog();
};

onMounted(async () => {
  await assignmentReportsStore.getData();
});
</script>
