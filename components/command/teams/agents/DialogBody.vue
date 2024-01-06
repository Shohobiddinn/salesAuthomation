<template>
  <form @submit.prevent="saveAll" class="grid grid-cols-1 w-full gap-2 overflow-auto h-[450px] pr-3">
    <div class="flex-row">
      <label for="first_name" class="text-gray-3 fs-14 fw-4"> Имя </label>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите Имя"
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
        placeholder="Введите Фамилия"
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
        placeholder="Введите Отчество"
        type="text"
        class="w-full"
        id="middle_name"
        :value="methodData.middle_name"
        @change="(value) => (methodData.middle_name = value)"
      />
    </flex-row>
    <div class="flex-row">
      <label for="phone" class="text-gray-3 fs-14 fw-4"> Номер телефона </label>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите"
        type="tel"
        class="w-full"
        id="phone"
        :value="methodData.phone"
        @change="(value) => (methodData.phone = value)"
        required
      />
    </div>
    <div class="flex-row">
      <label for="email" class="text-gray-3 fs-14 fw-4"> E-mail </label>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите e-mail"
        type="email"
        class="w-full"
        id="email"
        :value="methodData.email"
        @change="(value) => (methodData.email = value)"
        required
      />
    </div>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4"> Агент тип </span>
    </div>
    <div class="flex-row">
      <select
        v-model="methodData.agent_type"
        class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] pl-[15px] outline-none"
      >
        <option value="">Выбрать</option>
        <option v-for="ty in agentsStore.agentTypes" :value="ty.key" :key="ty">
          {{ ty.name }}
        </option>
      </select>
    </div>
    <div class="flex-row">
      <label for="code" class="text-gray-3 fs-14 fw-4"> Код </label>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите"
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
        placeholder="Введите"
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
    <div class="flex-row mb-11">
      <d-input
        placeholder="***********"
        type="text"
        class="w-full"
        id="password"
        :value="methodData.password"
        @change="(value) => (methodData.password = value)"
        required
      />
    </div>
    <div
      class="left-[-16px] custom-shadow w-[400px] flex pb-8 rounded-b-lg mt-2 px-10 pt-6 absolute bottom-[-38px] bg-white z-50 items-center"
    >
      <m-btn class="grow" type="submit">
        {{ props.id ? "Сохранять" : "Добавлять" }}
      </m-btn>
    </div>
  </form>
</template>

<script setup>
import { useNotification } from "@kyvg/vue3-notification";

const props = defineProps({
  id: String,
});

const emit = defineEmits(["closeDialog"]);

// store
const agentsStore = useAgentsStore("main");

// State
let methodData = ref({
  first_name: "",
  middle_name: "",
  last_name: "",
  phone: "",
  login: "",
  code: "",
  email: "",
  agent_type: "",
  password: "",
});

// Methods
onMounted(async () => {
  if (props.id) {
    methodData.value = await agentsStore.getAgentDetail(props.id);
  }
  if (!agentsStore.agentTypes) {
    await agentsStore.getAgentTypes();
  }
});

const saveAll = async () => {
  const { notify } = useNotification();
  try {
    await agentsStore.add(methodData.value);
    emit("closeDialog");
    notify({ title: `Агент успешно ${props.id ? "изменено" : "добавлено"}` });
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
      notify({ title: "Ошибка при добавлении агента!", type: "error" });
    }
  }
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
