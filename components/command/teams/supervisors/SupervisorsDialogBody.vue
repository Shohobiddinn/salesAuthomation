<template>
  <form  @submit.prevent="saveAll" class="grid grid-cols-1 w-[380px] overflow-y-auto h-[450px] gap-2 pr-3">
    <div class="flex-row">
      <label for="first_name" class="text-gray-3 fs-14 fw-4"> Имя </label>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите имя"
        type="text"
        class="w-full"
        id="first_name"
        :value="methodData.first_name"
        @change="(value) => (methodData.first_name = value)"
        required
      />
    </div>
    <div class="flex-row">
      <label for="last_name" class="text-gray-3 fs-14 fw-4"> Фамилия </label>
    </div>
    <flex-row>
      <d-input
        placeholder="Введите фамилия"
        type="text"
        class="w-full"
        id="last_name"
        :value="methodData.last_name"
        @change="(value) => (methodData.last_name = value)"
        required
      />
    </flex-row>
    <div class="flex-row">
      <label for="middle_name" class="text-gray-3 fs-14 fw-4"> Отчество </label>
    </div>
    <flex-row>
      <d-input
        placeholder="Введите отчество"
        type="text"
        class="w-full"
        id="middle_name"
        :value="methodData.middle_name"
        @change="(value) => (methodData.middle_name = value)"
      />
    </flex-row>
    <flex-row class="w-full">
      <flex-col class="w-full gap-1">
        <div class="text-gray-3 fs-14 fw-4">Прикрепить агентов</div>
        <menu-btn class="w-full">
          <template #btn>
            <m-btn-outlined
              class="border-grey flex items-center w-full gap-2 h-11 outline-none"
            >
              <fa-icon hash="&#xf078" />
              Выбрать
            </m-btn-outlined>
          </template>
          <template #content>
            <div class="h-44 overflow-auto w-full">
              <FilterItems
                v-if="agents"
                :data="agents"
                :selectedItems="methodData.agent_ids"
                @onSelectItems="methodData.agent_ids = $event"
                @onLoadElse="onLoadElseAgentsData"
              />
            </div>
          </template>
        </menu-btn>
      </flex-col>
    </flex-row>
    <div class="flex-row">
      <label for="code" class="text-gray-3 fs-14 fw-4"> Код </label>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите код"
        type="text"
        class="w-full"
        id="code"
        :value="methodData.code"
        @change="(value) => (methodData.code = value)"
      />
    </div>
    <div class="flex-row">
      <label for="login" class="text-gray-3 fs-14 fw-4"> Логин </label>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите логин"
        type="text"
        class="w-full"
        id="login"
        :value="methodData.login"
        @change="(value) => (methodData.login = value)"
        required
      />
    </div>
    <div class="flex-row">
      <label for="password" class="text-gray-3 fs-14 fw-4"> Пароль </label>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="***********"
        type="password"
        class="w-full"
        id="password"
        :value="methodData.password"
        @change="(value) => (methodData.password = value)"
        required
      />
    </div>
    <div class="flex justify-between items-center gap-2 mt-5 mb-16">
      <div class="text-gray-3 fs-14 fw-4">Aктивный </div>
      <label class="switch">
        <input v-model="methodData.is_active" type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
    <div
      class="left-[-16px] custom-shadow w-[450px] flex pb-8 rounded-b-lg mt-2 px-10 pt-6 absolute bottom-[-18px] bg-white z-50 items-center"
    >
      <m-btn class="grow" type="submit">
        {{ supervisorId ? "Сохранять" : "Добавлять" }}
      </m-btn>
    </div>
  </form>
</template>

<script setup>
import { useNotification } from "@kyvg/vue3-notification";

// props
const props = defineProps({
  supervisorId: String,
});

const emit = defineEmits(["closeDialog"]);

// store
const supervisorsStore = useSupervisorsStore("main");

// State
const agents = ref();

const agentParams = ref({
  page: 1,
  page_size: 10,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: 'is_active',
      value: ['true']
    }
  ]
});

let methodData = ref({
  first_name: "",
  middle_name: "",
  last_name: "",
  phone: "",
  login: "",
  code: "",
  agent_ids: [],
  password: "",
  is_active: false,
});

// Methods
onMounted(async () => {
  if (props.supervisorId) {
    methodData.value = await supervisorsStore.getAgentDetail(
      props.supervisorId
    ); // editDialog = tableId
  }

  agents.value = await supervisorsStore.getAgents(agentParams.value);
});

const saveAll = async (e) => {
  const { notify } = useNotification();
  try {
    await supervisorsStore.add(methodData.value);
    emit("closeDialog");
    notify({
      title: `Супервайзер успешно ${
        props.supervisorId ? "изменено" : "добавлено"
      }`,
    });
  } catch (e) {
    const errorMessage = e.response?.data?.Exception;
    console.log(errorMessage);
    if (
      errorMessage === `Login: ${methodData.value.login} is already exists.`
    ) {
      notify({
        title: `Логин ${methodData.value.login} уже существует!`,
        type: "error",
      });
    } else {
      notify({ title: "Ошибка при добавлении супервайзера!", type: "error" });
    }
  }
};

const onLoadElseAgentsData = async () => {
  agentParams.value.page_size += 10;
  const data = await supervisorsStore.getAgents(agentParams.value);
  agents.value = data;
};
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

.custom-shadow {
  box-shadow: 0px -4px 18px rgba(0, 0, 0, 0.04);
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
