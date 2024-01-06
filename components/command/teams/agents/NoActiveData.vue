<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <SettingsRlpDiscountsTableCheckbox :headers="headers" />
      <div>
        <search-input @change="agentsStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="w-full overflow-auto">
      <div class="mt-3">
        <data-table
          :headers="headers"
          @sort="agentsStore.sortData"
          :sorted="agentsStore.params.order_by"
        >
          <template #body>
            <c-tr v-for="data in agentsStore.data?.items" :key="data">
              <c-td v-for="key in headers" :key="key">
                <div v-if="key.checked === true">
                  <template v-if="key.isComputable">
                    {{ tableComputable(key.key, data) }}
                  </template>
                  <template v-else>
                    {{ data[key.key] }}
                  </template>
                </div>
              </c-td>
              <c-td class="">
                <div class="td-shadow py-2 flex">
                  <div
                    @click="agentsStore.editDialog = data.id"
                    class="cursor-pointer ml-2"
                  >
                    <IconEdit></IconEdit>
                  </div>
                </div>
              </c-td>
            </c-tr>
          </template>
        </data-table>
      </div>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14"> Показать по </span>
        <page-size-btn
          :current-size="agentsStore.params.page_size"
          @setPageSize="agentsStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="agentsStore.data?.total_pages"
          :current-page="agentsStore.data?.page_number"
          @setPage="agentsStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="(value) => (headers = value)"
          :templates="headers"
          @closeDialog="draggableDialog"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="agentsStore.editDialog">
      <d-modal
        @closeDialog="agentsStore.closeEditDialog"
        :dataContainerWidth="'400px'"
        :name="'Ред. агента'"
      >
        <CommandTeamsAgentsDialogBody
          :id="agentsStore.editDialog"
          @closeDialog="agentsStore.closeEditDialog"
        ></CommandTeamsAgentsDialogBody>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// props
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});
const { isActive } = toRefs(props);

// store
const agentsStore = useAgentsStore(isActive.value.toString());

// State
const draggable = ref(false);
function draggableDialog() {
  draggable.value = false;
}

const headers = ref([
  {
    name: "ФИО",
    key: "fio",
    thWidth: "140px",
    checked: true,
    isComputable: true,
  },
  {
    name: "Login",
    key: "login",
    thWidth: "140px",
    checked: true,
  },
  {
    name: "Тип",
    key: "agent_type",
    thWidth: "140px",
    checked: true,
  },
]);

// Methods
onMounted(() => {
  agentsStore.getData(isActive.value);
});

const tableComputable = (type, data) => {
  switch (type) {
    case "fio": {
      return `${data.last_name ?? "-"} ${data.first_name ?? "-"} ${
        data.middle_name ?? "-"
      }`;
    }
    default: {
      return "Not found";
    }
  }
};
</script>

<style scoped>
.td-shadow {
  cursor: pointer;
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.04);
}
</style>
