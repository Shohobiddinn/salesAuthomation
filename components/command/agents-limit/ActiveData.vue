<template>
  <div class="flex mb-4 flex-row gap-4 items-center">
    <div @click="draggable = true">
      <i-btn>
        <IconColsSVG />
      </i-btn>
    </div>
    <SettingsRlpDiscountsTableCheckbox :headers="agentsLimitStore.headers" />
    <div>
      <search-input @change="agentsLimitStore.search" class="w-full h-38px" />
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
        :headers="agentsLimitStore.headers"
        @sort="agentsLimitStore.sortData"
        :sorted="agentsLimitStore.params.order_by"
        :withInformationAboveHeader="true"
        :check="isAllTableChecked"
        @getAllId="getAllAgentsId()"
      >
        <template #body>
          <c-tr v-for="data in agentsLimitStore.data?.items" :key="data.id">
            <c-td v-for="key in agentsLimitStore.headers" :key="key">
              <div v-if="key.key === 'checkbox'" class="mt-[-10px] mb-[-10px]">
                <label>
                  <input
                    type="checkbox"
                    :id="data.id"
                    :checked="isTableChecked(data.id)"
                    @change="onSelectAgent(data.id)"
                  />
                  <span></span>
                </label>
              </div>
              <div v-else-if="key.key === 'is_active'">
                {{ data[key.key] ? "Активный" : "Не активный" }}
              </div>
              <div
                v-else-if="key.key === 'products'"
                :class="data[key.key].length > 0 && 'font-semibold'"
              >
                {{
                  data[key.key].length > 0
                    ? `${data[key.key].length} шт.`
                    : "Без ограничений"
                }}
              </div>
              <div v-else-if="key.key === 'price_types'">
                <div v-for="price in data[key.key]" :key="price.price_type_id">
                  {{ price.price_type }}
                </div>
              </div>
              <div
                v-else-if="key.key === 'configuration'"
                class="mt-[-10px] flex mb-[-10px] cursor-pointer"
                @click="agentsLimitStore.configByIdDialog = data.id"
              >
                <IconSettingsAlt />
                <div class="text-[#299B9B] ml-2">Конфигурации</div>
              </div>
              <div v-else>
                <template v-if="key.isComputable">
                  <label :for="data.id">{{
                    tableComputable(key.key, data)
                  }}</label>
                </template>
                <template v-else>
                  <div v-if="data[key.key]?.length > 0">
                    {{ data[key.key] }}
                  </div>
                </template>
              </div>
              <c-td-no-edit
                v-if="key.key === 'createAgentLimit' && data.is_new"
              >
                <div class="flex justify-start">
                  <button
                    class="bg-[#299B9B] fs-12 w-[180px] py-[9px] text-white px-3 rounded-lg"
                    @click="agentsLimitStore.editDialog = data.id"
                  >
                    Создать ограничения
                  </button>
                </div>
              </c-td-no-edit>
            </c-td>
            <c-td v-if="!data.is_new" :key="data.id">
              <div
                :key="data.id"
                @click="openDropdown(data.id)"
                class="relative td-shadow drop p-1"
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
                  class="bg-white bottom-[-23px] down rounded-lg z-50 w-[170px] border h-[84px] right-[44px] absolute"
                >
                  <div class="m-3">
                    <div
                      @click="agentsLimitStore.editDialog = data.id"
                      class="flex border-b cursor-pointer pb-2"
                    >
                      <div><IconEdit /></div>
                      <div class="fs-12 text-[#299B9B] ml-2 mt-1">
                        Редактрировать
                      </div>
                    </div>
                    <div
                      @click="agentsLimitStore.deleteDialog = data.id"
                      class="flex mt-1 cursor-pointer"
                    >
                      <div class="mt-1"><IconTrash /></div>
                      <div class="fs-12 ml-3 mt-1 text-red">Удалить агента</div>
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
          :current-size="agentsLimitStore.params.page_size"
          @setPageSize="agentsLimitStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="agentsLimitStore.data?.total_pages"
          :current-page="agentsLimitStore.data?.page_number"
          @setPage="agentsLimitStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          :templates="agentsLimitStore.headers"
          @change="onChangeTableHeaders"
        />
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="agentsLimitStore.deleteDialog">
      <c-modal
        :dataContainerWidth="'360px'"
        @closeDialog="agentsLimitStore.closeDeleteDialog"
      >
        <CommandDeleteDialog
          @onAcceptDeleting="agentsLimitStore.acceptDeleting = $event"
          @closeDialog="agentsLimitStore.closeDeleteDialog"
          @onDelete="agentsLimitStore.deleteAgentLimit"
        />
      </c-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="agentsLimitStore.editDialog">
      <h-no-modal
        :dataContainerWidth="dataContainerWidth"
        :bgLotion="true"
        @closeDialog="agentsLimitStore.closeEditDialog"
      >
        <CommandAgentsLimitDialog
          @closeDialog="agentsLimitStore.closeEditDialog"
        />
      </h-no-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="agentsLimitStore.configByIdDialog">
      <d-modal
        :dataContainerWidth="dataContainerWidthConfig"
        @closeDialog="agentsLimitStore.closeConfigByIdDialog"
        :name="'Конфигурации: ТП андрей'"
      >
        <div class="relative">
          <CommandAgentsLimitConfigurationCompanyDialog
            @closeDialog="agentsLimitStore.closeConfigByIdDialog"
          />
        </div>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// store
const agentsLimitStore = useAgentsLimitStore("main");

// State
const dataContainerWidthConfig = ref("540px");
const draggable = ref(false);
const dataContainerWidth = ref("1140px");
const isAllTableChecked = ref(false);

const td = reactive({
  isActive: false,
  index: -1,
});

const CreateConfiguration = ref({
  isCreate: true,
  isNoCreate: false,
});

// Methods
onMounted(async () => {
  await agentsLimitStore.getData();
});

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

const onChangeTableHeaders = (value) => {
  agentsLimitStore.headers = value;
  draggableDialog();
};

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

const getAllAgentsId = () => {
  isAllTableChecked.value = !isAllTableChecked.value;
  if (isAllTableChecked.value) {
    agentsLimitStore.editMultipleDialog = agentsLimitStore.data?.items.map(
      (agent) => agent.id
    );
  } else {
    agentsLimitStore.setNullMultipleDialog();
  }
};

const isTableChecked = (agentId) => {
  return agentsLimitStore.editMultipleDialog.find((id) => agentId === id);
};

const onSelectAgent = (agentId) => {
  if (!isTableChecked(agentId)) {
    agentsLimitStore.editMultipleDialog.push(agentId);
  } else {
    agentsLimitStore.editMultipleDialog =
      agentsLimitStore.editMultipleDialog.filter((id) => id !== agentId);
  }
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
  bottom: 20px;
  top: 20px;
  border-left: 15px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
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
