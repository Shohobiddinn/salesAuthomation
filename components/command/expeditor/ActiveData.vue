<template>
  <div class="flex mb-4 flex-row gap-4 items-center">
    <div @click="draggable = true">
      <i-btn>
        <IconColsSVG />
      </i-btn>
    </div>
    <SettingsRlpDiscountsTableCheckbox
      :headers="expeditorsStore.templates"
    ></SettingsRlpDiscountsTableCheckbox>
    <div>
      <search-input @change="expeditorsStore.search" class="w-full h-38px" />
    </div>
    <div>
      <excel-btn :size="'340kb'"></excel-btn>
    </div>
  </div>
  <div
    v-click-outside="clickOutside"
    class="rounded-lg bg-white border-grey px-[2px]"
  >
    <div class="w-full overflow-auto">
      <data-table
        :headers="expeditorsStore.templates"
        :CreateConfiguration="CreateConfiguration"
        :withInformationAboveHeader="true"
        :sorted="expeditorsStore.params.order_by"
        @sort="expeditorsStore.sortData"
      >
        <template #body>
          <c-tr v-for="data in expeditorsStore.data?.items" :key="data.id">
            <c-td v-for="key in expeditorsStore.templates" :key="key">
              <div v-if="key.key === 'is_active'" class="mt-[-10px] mb-[-10px]">
                <div v-if="data[key.key]">Активный</div>
                <div v-else>Не активный</div>
              </div>
              <div v-else-if="key.checked && key.key === 'application_access'">
                <div class="flex">
                  <div>
                    <label class="switch">
                      <input
                        type="checkbox"
                        :checked="data[key.key]"
                        v-model="data[key.key]"
                        @change="onChangeAppAccess(data)"
                      />
                      <span class="slider round"></span>
                    </label>
                  </div>
                  <div class="ml-2">Вкл / выкл</div>
                </div>
              </div>
              <div v-else>
                <template v-if="key.isComputable">
                  {{ tableComputable(key.key, data) }}
                </template>
                <template v-else>
                  {{ data[key.key] }}
                </template>
              </div>
            </c-td>
            <c-td-no-edit class="" v-if="CreateConfiguration.isNoCreate">
              <div class="flex justify-start">
                <button
                  class="bg-[#299B9B] fs-12 w-[180px] py-[9px] text-white px-3 rounded-lg"
                >
                  Создать ограничения
                </button>
              </div>
            </c-td-no-edit>
            <c-td :key="data.id" class="" v-if="CreateConfiguration.isCreate">
              <div
                :key="data.id"
                @click="openDropdown(data.id)"
                class="relative drop td-shadow pl-1 py-[6px]"
              >
                <div
                  :key="data.id"
                  class="cursor-pointer flex justify-center w-[30px] py-[6px]"
                >
                  <svg
                    width="3"
                    height="17"
                    viewBox="0 0 3 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 3C2.32842 3 2.99999 2.32843 2.99999 1.5C2.99999 0.671573 2.32842 0 1.5 0C0.671572 0 0 0.671573 0 1.5C0 2.32843 0.671572 3 1.5 3Z"
                      fill="#424F4F"
                    />
                    <path
                      d="M1.5 10C2.32843 10 3 9.32843 3 8.5C3 7.67157 2.32843 7 1.5 7C0.671573 7 0 7.67157 0 8.5C0 9.32843 0.671573 10 1.5 10Z"
                      fill="#424F4F"
                    />
                    <path
                      d="M1.49999 17C2.32841 17 2.99998 16.3284 2.99998 15.5C2.99998 14.6716 2.32841 14 1.49999 14C0.671568 14 0 14.6716 0 15.5C0 16.3284 0.671568 17 1.49999 17Z"
                      fill="#424F4F"
                    />
                  </svg>
                </div>
                <div
                  :key="data.id"
                  :class="{ 'active-down': td.isActive && td.id === data.id }"
                  class="bg-white bottom-[-33px] down rounded-lg z-50 w-[170px] border right-[44px] absolute"
                >
                  <div class="m-3">
                    <div
                      @click="expeditorsStore.editDialog = data.id"
                      class="flex border-b cursor-pointer pb-2"
                    >
                      <div><IconEdit /></div>
                      <div class="fs-12 text-[#299B9B] ml-2 mt-1">
                        Редактрировать
                      </div>
                    </div>
                    <div
                      @click="expeditorsStore.configByIdDialog = data.id"
                      class="flex border-b cursor-pointer pb-2"
                    >
                      <div class="mt-2"><IconSettingsAlt /></div>
                      <div class="fs-12 ml-2 mt-2">Конфигурации</div>
                    </div>
                    <div
                      @click="expeditorsStore.deleteDialog = data.id"
                      class="flex mt-1 cursor-pointer"
                    >
                      <div class="mt-1"><IconTrash /></div>
                      <div class="fs-12 ml-2 mt-1 text-red whitespace-nowrap">
                        Удалить экспедитора
                      </div>
                    </div>
                  </div>
                </div>
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
          :current-size="expeditorsStore.params.page_size"
          @setPageSize="expeditorsStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="expeditorsStore.data?.total_pages"
          :current-page="expeditorsStore.data?.page_number"
          @setPage="expeditorsStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          :templates="expeditorsStore.templates"
          @change="onChangeTableHeaders"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="expeditorsStore.deleteDialog">
      <c-modal
        :dataContainerWidth="'360px'"
        @closeDialog="expeditorsStore.closeDeleteDialog"
      >
        <CommandDeleteDialog
          @onAcceptDeleting="expeditorsStore.acceptDeleting = $event"
          @closeDialog="expeditorsStore.closeDeleteDialog"
          @onDelete="expeditorsStore.deleteExpeditor"
        />
      </c-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="expeditorsStore.editDialog">
      <d-modal
        :dataContainerWidth="'450px'"
        :name="'Изменение Экпедитора'"
        @closeDialog="expeditorsStore.closeEditDialog"
      >
        <CommandExpeditorDialog
          @closeDialog="expeditorsStore.closeEditDialog"
        />
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="expeditorsStore.configByIdDialog">
      <d-modal
        :dataContainerWidth="dataContainerWidthConfig"
        @closeDialog="expeditorsStore.closeConfigByIdDialog"
        :name="'Конфигурация компании'"
      >
        <div class="relative">
          <CommandExpeditorConfigurationDialog
            @closeDialog="expeditorsStore.closeConfigByIdDialog"
          />
        </div>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification";

// store
const expeditorsStore = useExpeditorsStore("main");

// State
const route = useRoute();
const dataContainerWidthConfig = ref("540px");
const draggable = ref(false);
const configurationCompanyModal = ref(false);
const dataContainerWidth = ref("1140px");

const td = reactive({
  isActive: false,
  index: -1,
});

const CreateConfiguration = ref({
  isCreate: true,
  isNoCreate: false,
});

const props = defineProps({
  isActive: Boolean,
});

onMounted(async () => {
  if (!route.query.tabNum && props.isActive) {
    await expeditorsStore.getData();
  }
});

const getData = () => {
  const isActive = route.query.tabNum === "1";
  if (
    expeditorsStore.data &&
    expeditorsStore.params?.filter[0]?.value[0] === isActive.toString()
  )
    return;
  else expeditorsStore.params.filter[0].value = [isActive.toString()];
};

watchEffect(() => {
  if (route.query.tabNum) {
    getData();
  }
});

const onChangeTableHeaders = (value) => {
  expeditorsStore.templates = value;
  draggableDialog();
};

function configurationCompanyDialog() {
  configurationCompanyModal.value = false;
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

function draggableDialog() {
  draggable.value = false;
}

const clickOutside = () => {
  td.isActive = false;
};

function openDropdown(id) {
  td.isActive = !td.isActive;
  td.id = id;
}

const onChangeAppAccess = async (epxeditorData) => {
  await expeditorsStore.add(epxeditorData);
  notify({ title: "Сохранено!" });
};
</script>

<style scoped>
.down {
  display: none;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
.active-down {
  display: block;
  background-color: white;
}
.down:after {
  position: absolute;
  content: "";
  right: -11px;
  bottom: 40px;
  top: 40px;
  border-left: 15px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
.td-shadow {
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.04);
}
</style>
