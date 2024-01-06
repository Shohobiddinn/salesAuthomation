<template>
  <rounded-white-container>
    <flex-row class="justify-between items-center">
      <span class="text-gray-3 fw-6 text-[20px]"> Фильтр </span>
      <flex-row class="gap-4">
        <flex-row
          class="rounded-lg bg-[#F4F9F9] h-full gap-2 items-center px-5 py-1"
        >
          <div class="flex gap-2">
            <input
              type="radio"
              name="radio"
              value="created-date"
              v-model="selectedDateOption"
            />
            <i-title> Дата назначение </i-title>
          </div>
          <div class="flex gap-2">
            <input
              type="radio"
              name="radio"
              value="due-date"
              v-model="selectedDateOption"
            />
            <i-title> Дата выполнение </i-title>
          </div>
        </flex-row>
        <DatePicker @onApply="onApplyDate" />
      </flex-row>
    </flex-row>
    <flex-row
      class="gap-4 mt-4 justify-end"
      v-for="row in tasksStore.filterStates"
      :key="row"
    >
      <flex-col class="w-1/4" v-for="cols in row" :key="cols.key">
        <i-title v-if="cols.key !== 'btn'">
          {{ cols.name }}
        </i-title>
        <flex-row
          class="h-full w-full justify-end items-end gap-2"
          v-if="cols.key === 'btn'"
        >
          <m-btn class="w-2/3" @click="onApplyFilter"> Применить </m-btn>
          <sm-btn class="px-4 py-3">
            <IconReloadSVG />
          </sm-btn>
        </flex-row>
        <menu-btn
          class="w-full"
          v-if="
            cols.key !== 'btn' && cols.key !== 'range' && cols.key !== 'radio'
          "
          @click="onOpenDropdown($event, cols.key)"
        >
          <template #btn>
            <m-btn-outlined class="border-grey flex items-center w-full gap-2">
              <fa-icon hash="&#xf078" />
              Выбрать
            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'assigner'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                :data="assigners"
                :selectedItems="selectedAssignerUsers.value"
                @onSelectItems="selectedAssignerUsers.value = $event"
                @onLoadElse="onLoadElseUsers"
              />
            </flex-col>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'performer'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                :data="users"
                :selectedItems="selectedPerformers.value"
                @onSelectItems="selectedPerformers.value = $event"
                @onLoadElse="onLoadElseUsers"
              />
            </flex-col>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'status'"
            >
              <FilterItems
                :data="taskStatuses"
                :selectedItems="selectedTaskStatuses.value"
                @onSelectItems="selectedTaskStatuses.value = $event"
              />
            </flex-col>
            <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
              v-if="cols.key === 'task_type'"
            >
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                :data="taskTypes"
                :selectedItems="selectedTaskTypes.value"
                @onSelectItems="selectedTaskTypes.value = $event"
                @onLoadElse="onLoadElseTaskTypes"
              />
            </flex-col>
          </template>
        </menu-btn>
      </flex-col>
    </flex-row>
  </rounded-white-container>
</template>

<script setup>
// Stores
const tasksStore = useTasksStore("main");

// states

const dateData = ref({});

const users = ref(null);
const assigners = ref(null)
const taskTypes = ref(null);
const taskStatuses = ref({
  items: null,
});

const selectedAssignerUsers = ref({
  field: 'created_by_id',
  value: [],
});
const selectedPerformers = ref({
  field: 'performer_id',
  value: []
});
const selectedTaskStatuses = ref({
  field: 'status',
  value: []
});
const selectedTaskTypes = ref({
  field: 'task_entity_type_id',
  value: [],
});

const selectedDateOption = ref("due-date");

const usersParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

const taskTypesParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

// methods

const getUsers = async () => {
  const data = await tasksStore.getUsers(usersParams.value);
  users.value = data
  assigners.value = JSON.parse(JSON.stringify(data))
};

const getTaskStatuses = async () => {
  taskStatuses.value.items = await tasksStore.getTaskStatuses();
};

const getTaskTypes = async () => {
  taskTypes.value = await tasksStore.getTaskTypes(taskTypesParams.value);
};

const onOpenDropdown = async (value, state) => {
  if ((state === "assigner" || state === "performer") && !users.value) {
    await getUsers();
    return;
  }
  if (state === "task_type" && !taskTypes.value) {
    await getTaskTypes();
    return;
  }
  if (state === "status" && !taskStatuses.value.items) {
    await getTaskStatuses();
    return;
  }
  return;
};

const onLoadElseUsers = async () => {
  usersParams.value.page_size += 10;
  await getUsers();
};

const onLoadElseTaskTypes = async () => {
  taskTypesParams.value.page_size += 10;
  await getTaskTypes();
};

const search = async (value, state) => {
  if (state === "assigner") {
    usersParams.value.search = value;
    await getUsers();
    return;
  }
  if (state === "performer") {
    usersParams.value.search = value;
    await getUsers();
    return;
  }
  if (state === "task_type") {
    taskTypesParams.value.search = value;
    await getTaskTypes();
    return;
  }
  return;
};

const onApplyDate = (value) => {
  dateData.value = value
}

const onApplyFilter = () => {
  selectedAssignerUsers.value.value.length > 0 && tasksStore.params.filter.push(selectedAssignerUsers.value)
  selectedPerformers.value.value.length > 0 && tasksStore.params.filter.push(selectedPerformers.value)
  selectedTaskStatuses.value.value.length > 0 && tasksStore.params.filter.push(selectedTaskStatuses.value)
  selectedTaskTypes.value.value.length > 0 && tasksStore.params.filter.push(selectedTaskTypes.value)
}
</script>

<style scoped>
input[type="radio"] {
  /* ...existing styles */
  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  margin: -2px;
  content: "";
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #299b9b;
  border: 1px solid #cccccc;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
}

input[type="radio"]:checked::before {
  transform: scale(1);
}

.form_radio_btn {
  display: inline-block;
}

.form_radio_btn input[type="radio"] {
  display: none;
}

.form_radio_btn label {
  display: inline-block;
  cursor: pointer;
  line-height: 100%;
  user-select: none;
}

/* Checked */
.form_radio_btn input[type="radio"]:checked + label {
  background: #299b9b;
  color: white;
}

/* Hover */
.form_radio_btn label:hover {
  color: #666;
}

/* Disabled */
.form_radio_btn input[type="radio"]:disabled + label {
  background: #efefef;
  color: #666;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
</style>
