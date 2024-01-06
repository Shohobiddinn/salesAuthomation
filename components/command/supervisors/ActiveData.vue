<template>
  <div class="flex mb-4 flex-row gap-4 items-center">
    <div @click="draggable = true">
      <i-btn>
        <IconColsSVG />
      </i-btn>
    </div>
    <SettingsRlpDiscountsTableCheckbox
      :headers="supervisorStore.templates"
    ></SettingsRlpDiscountsTableCheckbox>
    <div>
      <search-input @change="supervisorStore.search" class="w-full h-38px" />
    </div>
    <div>
      <excel-btn :size="'340kb'"></excel-btn>
    </div>
  </div>
  <div
    v-click-outside="clickOutside"
    class="rounded-lg bg-white border-grey px-[2px] w-full"
  >
    <div class="w-full">
      <data-table
        :headers="supervisorStore.templates"
        :withInformationAboveHeader="true"
        :sorted="supervisorStore.params.order_by"
        @sort="supervisorStore.sortData"
        v-click-outside="() => (showAgentList = false)"
        class="w-full"
      >
        <template #body>
          <c-tr v-for="data in supervisorStore.data?.items" :key="data.id">
            <c-td v-for="key in supervisorStore.templates" :key="key">
              <div
                class="mt-[-10px] mb-[-10px] check"
                v-if="key.key === 'checkbox'"
              >
                <label>
                  <input type="checkbox" />
                  <span></span>
                </label>
              </div>
              <template v-if="key.isComputable">
                {{ tableComputable(key.key, data) }}
              </template>
              <div
                v-if="key.key === 'application_access'"
                class="mt-[-10px] mb-[-10px]"
              >
                <div class="flex flex-row items-center gap-2">
                  <label class="switch">
                    <input
                      type="checkbox"
                      :checked="data[key.key]"
                      v-model="data[key.key]"
                      @change="onChangeAppAccess(data)"
                    />
                    <span class="slider round"></span>
                  </label>
                  <span class="text-gray-3 fs-14 fw-4"> Вкл / выкл </span>
                </div>
              </div>
              <div v-else-if="key.key === 'is_active'">
                <div v-if="data[key.key]">Активный</div>
                <div v-else>Не активный</div>
              </div>
              <div v-else-if="key.key === 'agents'">
                <div
                  v-if="data[key.key].length > 0"
                  class="flex gap-1 items-center"
                >
                  <div
                    v-for="agent in data[key.key].slice(
                      0,
                      showAbleAgentsAmount
                    )"
                    :key="agent.id"
                  >
                    {{ agent.last_name }},
                  </div>
                  <div
                    v-if="data[key.key].length - showAbleAgentsAmount > 0"
                    class="cursor-pointer text-[#299B9B]"
                    @click="showAgentList = data.id"
                  >
                    ещё {{ data[key.key].length - showAbleAgentsAmount }}
                    <index-btn
                      v-if="showAgentList === data.id"
                      class="rounded-lg w-[161px] border bg-white absolute z-50"
                    >
                      <div
                        v-for="agentList in data[key.key]"
                        :key="agentList.id"
                        class="fs-12 border-b border-[#E1E4E4] m-3 pb-2 cursor-pointer"
                      >
                        {{ agentList.last_name }}
                      </div>
                    </index-btn>
                  </div>
                </div>
              </div>
              <div v-else>
                {{ data[key.key] }}
              </div>
            </c-td>
            <c-td-no-edit v-if="CreateConfiguration.isNoCreate">
              <div class="flex justify-start">
                <button
                  class="bg-[#299B9B] fs-12 w-[180px] py-[9px] text-white px-3 rounded-lg"
                >
                  Создать ограничения
                </button>
              </div>
            </c-td-no-edit>
            <c-td :key="data.id" v-if="CreateConfiguration.isCreate">
              <div
                :key="data.id"
                @click="openDropdown(data.id)"
                class="relative drop td-shadow p-1"
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
                      @click="supervisorStore.editDialog = data.id"
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
                      @click="supervisorStore.deleteDialog = data.id"
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
          :current-size="supervisorStore.params.page_size"
          @setPageSize="supervisorStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="supervisorStore.data?.total_pages"
          :current-page="supervisorStore.data?.page_number"
          @setPage="supervisorStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          :templates="supervisorStore.templates"
          @change="onChangeTableHeaders"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="supervisorStore.deleteDialog">
      <c-modal
        :dataContainerWidth="'360px'"
        @closeDialog="supervisorStore.closeDeleteDialog"
      >
        <CommandDeleteDialog
          @onAcceptDeleting="supervisorStore.acceptDeleting = $event"
          @closeDialog="supervisorStore.closeDeleteDialog"
          @onDelete="supervisorStore.deleteAgent"
        />
      </c-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="supervisorStore.editDialog">
      <d-modal
        @closeDialog="supervisorStore.closeEditDialog"
        :name="'Редактрироват Супер...'"
      >
        <div class="relative">
          <CommandSupervisorsDialogBody
            @closeDialog="supervisorStore.closeEditDialog"
          />
        </div>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification";

// store
const supervisorStore = useSupervisorsStore("main");

// State
let bordered = ref("1px solid black");
const draggable = ref(false);
const td = reactive({
  isActive: false,
  id: -1,
});

const CreateConfiguration = ref({
  isCreate: true,
  isNoCreate: false,
});

const dataContainerWidth = ref("1140px");
const showAbleAgentsAmount = ref(2);
const showAgentList = ref(false);

// Methods

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

onMounted(async () => {
  await supervisorStore.getData();
});

const onChangeTableHeaders = (value) => {
  supervisorStore.templates = value;
  draggableDialog();
};

const onChangeAppAccess = async (epxeditorData) => {
  await supervisorStore.add(epxeditorData);
  notify({title: 'Сохранено!'})
}
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

.check label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
.check label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
.check [type="checkbox"]:checked + span:before {
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
