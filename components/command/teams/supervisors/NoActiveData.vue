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
        <search-input @change="supervisorsStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="w-full overflow-auto">
      <div class="mt-3">
        <data-table
          :headers="headers"
          @sort="supervisorsStore.sortData"
          :sorted="supervisorsStore.params.order_by"
        >
          <template #body>
            <c-tr v-for="data in supervisorsStore.data?.items" :key="data">
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
                    @click="supervisorsStore.editDialog = data.id"
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
          :current-size="supervisorsStore.params.page_size"
          @setPageSize="supervisorsStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="supervisorsStore.data?.total_pages"
          :current-page="supervisorsStore.data?.page_number"
          @setPage="supervisorsStore.setPage"
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
    <div v-if="supervisorsStore.editDialog">
      <d-modal
        @closeDialog="supervisorsStore.closeEditDialog"
        :dataContainerWidth="'450px'"
        :name="'Ред. супервайзера'"
      >
        <CommandTeamsSupervisorsDialogBody
          :supervisorId="supervisorsStore.editDialog"
          @closeDialog="supervisorsStore.closeEditDialog"
        />
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  isActive: Boolean,
  required: true,
});
const { isActive } = toRefs(props);

//store
const supervisorsStore = useSupervisorsStore(isActive.value.toString());

// State
const draggable = ref(false);
const supervisorsModal = ref(false);

const headers = ref([
  {
    name: "Ф.И.О",
    checked: true,
    key: "fio",
    thWidth: "240px",
    isComputable: true,
  },
  {
    name: "Логин",
    checked: true,
    key: "login",
    thWidth: "240px",
  },
  {
    name: "Версия APK",
    checked: true,
    key: "version",
    thWidth: "240px",
  },
]);

// Methods
onMounted(async () => {
  supervisorsStore.getData(isActive.value.toString());
});

function draggableDialog() {
  draggable.value = false;
}

function supervisorsDialog() {
  supervisorsModal.value = false;
}

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
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.04);
}
</style>
