<template>
  <div class="grid grid-cols-1 w-[380px] gap-2">
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4"> Задание </span>
    </div>
    <div class="flex-row">
      <textarea
        v-model="methodData.task_description"
        placeholder="Введите"
        class="w-full border rounded-lg h-[100px] p-2"
      ></textarea>
    </div>
    <flex-col class="gap4.5">
      <flex-col class="gap-3">
        <div class="flex-row">
          <div class="text-gray-3 fs-14 fw-4">Исполняющий</div>
        </div>
        <menu-btn class="w-full" @click="onOpenDropdown('performer')">
          <template #btn>
            <m-btn-outlined class="border-grey flex items-center w-full gap-2">
              <fa-icon hash="&#xf078" />
              {{
                methodData.performer_id
                  ? getUserName("performer", methodData.performer_id)
                  : "Выбрать"
              }}
            </m-btn-outlined>
          </template>
          <template #content>
            <div class="h-44 overflow-auto">
              <FilterItems
                :data="performers"
                :singleSelect="true"
                @onSingleItemSelect="methodData.performer_id = $event"
                @onLoadElse="onLoadElsePerformers"
              />
            </div>
          </template>
        </menu-btn>
      </flex-col>
      <flex-col class="gap-3">
        <div class="flex-row">
          <div class="text-gray-3 fs-14 fw-4">Клиент</div>
        </div>
        <menu-btn class="w-full" @click="onOpenDropdown('client')">
          <template #btn>
            <m-btn-outlined class="border-grey flex items-center w-full gap-2">
              <fa-icon hash="&#xf078" />
              {{
                methodData.client_id
                  ? getUserName("client", methodData.client_id)
                  : "Выбрать"
              }}
            </m-btn-outlined>
          </template>
          <template #content>
            <div class="h-44 overflow-auto">
              <FilterItems
                :data="clients"
                :singleSelect="true"
                @onSingleItemSelect="methodData.client_id = $event"
                @onLoadElse="onLoadElseClients"
              />
            </div>
          </template>
        </menu-btn>
      </flex-col>
    </flex-col>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4"> Дата выполнения </span>
    </div>

    <DInputDatePicker @change="newDate => methodData.due_date = newDate"/>
    <div
      class="flex flex-row items-center bg-white justify-between w-full mt-4"
    >
      <m-btn class="grow" @click="onAddTask"> Добавить </m-btn>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";

// store
const tasksStore = useTasksStore("main");

const emit = defineEmits(["closeDialog"]);

// state
const methodData = ref({
  task_description: "",
  performer_id: "",
  client_id: "",
  due_date: moment().format("YYYY-MM-DD"),
});

const clients = ref(null);
const performers = ref(null);

const performersParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

const clientsParams = ref({
  page: 1,
  page_size: 10,
  search: "",
  agent: [],
  territory: [],
  client_category: [],
  price_type: [],
  day: [],
  expeditor: [],
  device: []
});

// methods
const getPerformers = async () => {
  performers.value = await tasksStore.getUsers(performersParams.value);
};

const getClients = async () => {
  clients.value = await tasksStore.getClients(clientsParams.value);
};

const onLoadElsePerformers = async () => {
  performersParams.value.page_size += 10;
  await getPerformers();
};

const onLoadElseClients = async () => {
  clientsParams.value.page_size += 10;
  await getClients();
};

const onOpenDropdown = async (state) => {
  if (state === "performer" && !performers.value) {
    await getPerformers();
  }
  if (state === "client" && !clients.value) {
    await getClients();
  }
};

const getUserName = (userType, userId) => {
  if (userType === "performer") {
    const name = performers.value.items.find(
      (performer) => performer.id === userId
    )?.last_name;
    return name;
  }
  if (userType === "client") {
    const name = clients.value.items.find(
      (client) => client.id === userId
    )?.name;
    return name;
  }
  return "";
};

const onAddTask = async () => {
  if (
    !methodData.value.task_description ||
    !methodData.value.client_id ||
    !methodData.value.performer_id
  )
    return;
  else {
    await tasksStore.add(methodData.value);
    await tasksStore.refresh();
    emit("closeDialog");
  }
};

onMounted(async () => {
  if(tasksStore.editDialog){
    const [performersData, clientsData, initialTaskData ] = await Promise.all([getPerformers(), getClients(), tasksStore.getTaskDetail(tasksStore.editDialog)])
    methodData.value = initialTaskData
  }
  return
})
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #ffffff;
  z-index: 1;
}

.dropdown-content a {
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.show {
  display: block;
}
.input-color-container {
  position: relative;
  overflow: hidden;
  width: 28px;
  height: 28px;
  border-radius: 8px;
}

.input-color {
  position: absolute;
  right: -8px;
  top: -8px;
  width: 56px;
  height: 56px;
  border: none;
}
textarea:active {
  border-color: var(--primary-color);
}

textarea:focus {
  outline: none !important;
  border: 1px solid var(--primary-color);
}
.date-for {
  border: 1px solid #e1e4e4;
  border-radius: 8px;
}
.date-picker input {
  width: 100%;
  padding-left: 45px;
  position: relative;
}
.date-picker input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  color: rgba(0, 0, 0, 0);
  opacity: 1;
  display: block;
  background: url(~/assets/svg/date-pickerscg.svg) no-repeat;
  width: 20px;
  height: 20px;
  left: 10px;
  border-width: thin;
  top: 12px;
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
