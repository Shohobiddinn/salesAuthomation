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
        <search-input @change="auditorsStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="w-full overflow-auto">
      <div class="mt-3">
        <data-table
          :headers="headers"
          @sort="auditorsStore.sortData"
          :sorted="auditorsStore.params.order_by"
        >
          <template #body>
            <c-tr v-for="data in auditorsStore.data?.items" :key="data">
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
                    @click="auditorsStore.configByIdDialog = data.id"
                    class="pl-2 pr-1 cursor-pointer"
                  >
                    <IconSettingsAltC />
                  </div>
                  <div
                    @click="auditorsStore.editDialog = data.id"
                    class="cursor-pointer"
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
          :current-size="auditorsStore.params.page_size"
          @setPageSize="auditorsStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="auditorsStore.data?.total_pages"
          :current-page="auditorsStore.data?.page_number"
          @setPage="auditorsStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          :templates="auditorsStore.templates"
          @change="(value) => (headers = value)"
          @closeDialog="draggableDialog"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="auditorsStore.editDialog">
      <d-modal
        :dataContainerWidth="'450px'"
        @closeDialog="auditorsStore.closeEditDialog"
        :name="'Ред. Мерчандайзера'"
      >
        <CommandTeamsAuditorsDialogBody
          :auditorId="auditorsStore.editDialog"
          @closeDialog="auditorsStore.closeEditDialog"
        />
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="auditorsStore.configByIdDialog">
      <d-modal
        :dataContainerWidth="'541px'"
        @closeDialog="auditorsStore.closeConfigByIdDialog"
        :name="'Конфигурации для Merch'"
      >
        <div class="relative">
          <CommandTeamsAuditorsConfigurationCompanyDialog
            :auditorId="auditorsStore.configByIdDialog"
            @closeDialog="auditorsStore.closeConfigByIdDialog"
          />
        </div>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});
const { isActive } = toRefs(props);
// store
const auditorsStore = useAuditorsStore(isActive.value.toString());

// State

const draggable = ref(false);

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
    key: "apk_version",
    thWidth: "240px",
  },
]);

// Methods
onMounted(async () => {
  await auditorsStore.getData(isActive.value.toString());
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

function draggableDialog() {
  draggable.value = false;
}
</script>

<style scoped>
.td-shadow {
  cursor: pointer;
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.04);
}
</style>
