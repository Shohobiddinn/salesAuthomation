<template>
  <form class="grid grid-cols-1 w-[380px] overflow-y-auto h-[450px] gap-2 pr-3"  @submit.prevent="saveAll">
    <div class="flex-row">
      <label for="first_name" class="text-gray-3 fs-14 fw-4"> Имя <span class="text-red-3 fs-14">*</span></label>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите имя"
        type="text"
        id="first_name"
        class="w-full"
        :value="methodData.first_name"
        @change="(value) => (methodData.first_name = value)"
        required
      />
    </div>
    <div class="flex-row">
      <label for="last_name" class="text-gray-3 fs-14 fw-4"> Фамилия <span class="text-red-3 fs-14">*</span></label>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите фамилия"
        type="text"
        id="last_name"
        class="w-full"
        :value="methodData.last_name"
        @change="(value) => (methodData.last_name = value)"
        required
      />
    </div>
    <div class="flex-row">
      <label for="middle_name" class="text-gray-3 fs-14 fw-4"> Отчество </label>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите отчество"
        type="text"
        id="middle_name"
        class="w-full"
        :value="methodData.middle_name"
        @change="(value) => (methodData.middle_name = value)"
      />
    </div>
    <div class="flex-row">
      <label for="phone" class="text-gray-3 fs-14 fw-4"> Номер телефона <span class="text-red-3 fs-14">*</span></label>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите"
        type="tel"
        id="phone"
        class="w-full"
        :value="methodData.phone"
        @change="(value) => (methodData.phone = value)"
        required
      />
    </div>
    <div class="flex border-t border-[#E1E4E4] mt-4 justify-between">
      <div class="fs-14 mt-4">Выбрать цвет для KPI</div>
      <div class="flex mt-4 ml-4">
        <div class="input-color-container cursor-pointer">
          <input v-model="methodData.color" class="input-color" type="color" />
        </div>
      </div>
    </div>
    <flex-row class="w-full">
      <flex-col class="w-full gap-1">
        <div>Агент</div>
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
      <label for="login" class="text-gray-3 fs-14 fw-4"> Логин <span class="text-red-3 fs-14">*</span></label>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите логин"
        type="text"
        id="login"
        class="w-full"
        :value="methodData.login"
        @change="(value) => (methodData.login = value)"
        required
      />
    </div>
    <div class="flex-row">
      <label for="password" class="text-gray-3 fs-14 fw-4"> Пароль <span v-if="!supervisorStore.editDialog" class="text-red-3 fs-14">*</span></label>
    </div>
    <div class="flex-row mb-16">
      <d-input
        placeholder="**********"
        type="password"
        id="password"
        class="w-full"
        :value="methodData.password"
        @change="(value) => (methodData.password = value)"
        :required="!supervisorStore.editDialog"
      />
    </div>  
    <div
      class="left-[-32px] custom-shadow w-[450px] flex pb-8 rounded-b-lg mt-2 px-10 pt-6 absolute bottom-[-42px] bg-white z-50 items-center"
    >
      <m-btn class="grow" type="submit">
        {{ supervisorStore.editDialog ? "Сохранять" : "Добавлять" }}
      </m-btn>
    </div>
  </form>
</template>

<script setup>
// State
import { useNotification } from "@kyvg/vue3-notification";

const emit = defineEmits(["closeDialog"]);

// store
const supervisorStore = useSupervisorsStore("main");

// states
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
  color: "#A16543",
  apk_version: "",
  agent_ids: [],
  password: "",
  is_active: true,
});

onMounted(async () => {
  if (supervisorStore.editDialog) {
    methodData.value = await supervisorStore.getAgentDetail(
      supervisorStore.editDialog
    ); // editDialog = tableId
  }

  agents.value = await supervisorStore.getAgents(agentParams.value);
});

const saveAll = async (e) => {
  const { notify } = useNotification();
  try {
    await supervisorStore.add(methodData.value);
    emit("closeDialog");
    notify({
      title: `Супервайзер успешно ${
        supervisorStore.editDialog ? "изменено" : "добавлено"
      }`,
    });
  } catch (e) {
    const errorMessage = e.response?.data?.Messages[0];
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
  const data = await supervisorStore.getAgents(agentParams.value);
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
