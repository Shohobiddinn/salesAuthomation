<template>
  <div class="flex mb-4 flex-row gap-4 items-center">
    <div @click="draggable = true">
      <i-btn>
        <IconColsSVG />
      </i-btn>
    </div>
    <SettingsRlpDiscountsTableCheckbox
      :headers="agentStore.templates"
    ></SettingsRlpDiscountsTableCheckbox>
    <div>
      <search-input @change="agentStore.search" class="w-full h-38px" />
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
        :headers="agentStore.templates"
        @sort="agentStore.sortData"
        :sorted="agentStore.params.order_by"
        :withInformationAboveHeader="true"
      >
        <template #body>
          <c-tr v-for="(data, index) in agentStore.data?.items" :key="data">
            <c-td
              v-for="key in agentStore.templates"
              class="whitespace-nowrap"
              :key="key"
            >
              <div v-if="key.checked">
                <template v-if="key.isComputable">
                  {{ tableComputable(key.key, data) }}
                </template>
                <template v-else>
                  {{ data[key.key] }}
                </template>
              </div>
            </c-td>
            <c-td :key="index" class="">
              <div
                :key="index"
                @click="openDropdown(index)"
                class="relative td-shadow p-2 drop"
              >
                <div :key="index" class="cursor-pointer w-[30px] p-[10px]">
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
                  :key="index"
                  :class="{ 'active-down': td.isActive && td.index === index }"
                  class="bg-white bottom-[-23px] down rounded-lg z-50 w-[170px] border h-[84px] right-[44px] absolute"
                >
                  <div class="m-3">
                    <div
                      @click="agentStore.editDialog = data.id"
                      class="flex border-b cursor-pointer pb-2"
                    >
                      <div>
                        <IconEdit />
                      </div>
                      <div class="fs-12 text-[#299B9B] ml-2 mt-1">
                        Редактрировать
                      </div>
                    </div>
                    <div
                      @click="agentStore.deleteDialog = data.id"
                      class="flex mt-1 cursor-pointer"
                    >
                      <div class="mt-1">
                        <IconTrash />
                      </div>
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
          :current-size="agentStore.params.page_size"
          @setPageSize="agentStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="agentStore.data?.total_pages"
          :current-page="agentStore.data?.page_number"
          @setPage="agentStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="(value) => (agentStore.templates = value)"
          :templates="agentStore.templates"
          @closeDialog="draggableDialog"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="agentStore.editDialog">
      <d-modal
        @closeDialog="agentStore.closeEditDialog"
        :name="'Изменить данные агента'"
      >
        <CommandAgentsDialogBody
          :id="agentStore.editDialog"
          @closeDialog="agentStore.closeEditDialog"
        />
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="agentStore.deleteDialog">
      <c-modal
        :dataContainerWidth="dataContainerWidth"
        @closeDialog="agentStore.closeDeleteDialog"
      >
        <CommandAgentsDeleteDialog :is-active="isActive" />
      </c-modal>
    </div>
  </transition>
</template>

<script setup lang="ts">
// Props

import { UserModel } from "~/interfaces/api/user-model";

const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});

// State
const dataContainerWidth = ref("346px");
let bordered = ref("1px solid black");
const draggable = ref(false);
const { isActive } = toRefs(props);

// Store
const agentStore = useAgentsStore(isActive.value.toString());

// Hooks
onMounted(() => {
  agentStore.getData(isActive.value);
});

// Methods

function draggableDialog() {
  draggable.value = false;
}

const clickOutside = () => {
  td.isActive = false;
};

function openDropdown(index: number) {
  td.isActive = !td.isActive;
  td.index = index;
}

const td = reactive({
  isActive: false,
  index: -1,
});

// Methods
const tableComputable = (type: string, data: UserModel) => {
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
</style>
