<template>
  <div>
    <div class="rounded-lg bg-white border-grey px-[2px]">
      <div class="flex items-center justify-between px-5">
        <div class="flex mb-4 flex-row gap-4 mt-4 items-center">
          <div @click="draggable = true">
            <i-btn>
              <IconColsSVG />
            </i-btn>
          </div>
          <SettingsRlpDiscountsTableCheckbox :headers="workdaysStore.headers" />
          <div>
            <!-- @change="workdaysStore.search" -->
            <search-input class="w-full h-38px" />
          </div>
          <div>
            <excel-btn :size="'340kb'"></excel-btn>
          </div>
        </div>
        <div class="flex gap-2">
          <cancel-btn
            :disabled="!workdaysStore.editMultipleDialog.length > 0"
            @click="onOpenDatepickerModal"
          >
            Изменить
          </cancel-btn>
          <m-btn
            :disabled="!workdaysStore.editMultipleDialog.length > 0"
            @click="onOpenDatepickerModal"
            >Установить</m-btn
          >
        </div>
      </div>
      <div class="w-full overflow-x-clip">
        <!-- @sort="workdaysStore.sortData"
        :sorted="workdaysStore.params.order_by" -->
        <data-table
          :headers="workdaysStore.headers"
          :check="isAllTableChecked"
          @getAllId="getAllAgentsId()"
        >
          <template #body>
            <c-tr
              v-for="data in workdaysStore.data?.items"
              :key="data.employee_id"
            >
              <c-td v-for="key in workdaysStore.headers" :key="key">
                <div
                  v-if="key.key === 'checkbox'"
                  class="mt-[-10px] mb-[-10px]"
                >
                  <label>
                    <input
                      type="checkbox"
                      :id="data.id"
                      :checked="isTableChecked(data.employee_id)"
                      @change="onSelectAgent(data.employee_id)"
                    />
                    <span></span>
                  </label>
                </div>
                <div v-else-if="key.key === 'is_install'">
                  <div
                    :class="data[key.key] ? 'bg-[#23C00A1A]' : 'bg-[#BD7F061A]'"
                    class="rounded-large p-2.5 flex items-center justify-center"
                  >
                    <span
                      :class="
                        data[key.key] ? 'text-light-green' : 'text-orange'
                      "
                    >
                      {{ data[key.key] ? "Установлен" : "Не установлен" }}
                    </span>
                  </div>
                </div>
                <div v-else class="py-3.5">
                  {{ data[key.key] }}
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
            :current-size="workdaysStore.params.page_size"
            @setPageSize="workdaysStore.setPageSize"
          />
        </div>
        <div class="p-3">
          <page-index
            :available-pages="workdaysStore.data?.total_pages"
            :current-page="workdaysStore.data?.page_number"
            @setPage="workdaysStore.setPage"
          />
        </div>
      </div>
    </div>
    <transition name="modal">
      <div v-if="draggable">
        <d-modal
          @closeDialog="draggableDialog"
          :name="'Управление меню таблицы'"
        >
          <drag-and-drop
            :templates="workdaysStore.headers"
            @change="onChangeTableHeaders"
          />
        </d-modal>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="datePickerModal">
        <d-modal
          @closeDialog="datePickerModal = false"
          :name="'Кол-во рабочий дней'"
          :dataContainerWidth="'770px'"
        >
          <DateCalendarPicker
            :singleSelect="true"
            @onSave="onInstall($event)"
            @closeDialog="datePickerModal = false"
          />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
// store
const workdaysStore = useWorkdaysStore("main");

// State
const isAllTableChecked = ref(false);
const draggable = ref(false);
const datePickerModal = ref(false);
const employeeWorkingDays = ref([]);

function draggableDialog() {
  draggable.value = false;
}

const getAllAgentsId = () => {
  isAllTableChecked.value = !isAllTableChecked.value;
  if (isAllTableChecked.value) {
    workdaysStore.editMultipleDialog = workdaysStore.data?.items.map(
      (agent) => agent.employee_id
    );
  } else {
    workdaysStore.setNullMultipleDialog();
  }
};

const onChangeTableHeaders = (value) => {
  workdaysStore.headers = value;
  draggableDialog();
};

const onOpenDatepickerModal = () => {
  if (workdaysStore.editMultipleDialog.length > 0) {
    datePickerModal.value = true;
    return;
  }
  return;
};

onMounted(async () => {
  await workdaysStore.getData();
});

const isTableChecked = (agentId) => {
  return workdaysStore.editMultipleDialog.find((id) => agentId === id);
};

const onSelectAgent = (agentId) => {
  if (!isTableChecked(agentId)) {
    workdaysStore.editMultipleDialog.push(agentId);
  } else {
    workdaysStore.editMultipleDialog = workdaysStore.editMultipleDialog.filter(
      (id) => id !== agentId
    );
  }
};

const onInstall = async (value) => {
  const days = value.map((date) => ({ date: date, is_working: true }));
  const data = {
    employee: [...workdaysStore.editMultipleDialog],
    days,
  };

  await workdaysStore.onInstallWorkingDays(data);
};
</script>

<style scoped>
/* Style the artificial checkbox */
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
