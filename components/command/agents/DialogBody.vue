<template>
  <form
    class="grid grid-cols-1 w-full overflow-auto h-[450px] gap-2 pr-3"
    v-if="dataLoading"
    @submit.prevent="saveAll"
  >
    <div class="flex-row w-full">
      <label for="first_name" class="text-gray-3 fs-14 fw-4">
        Имя <span class="text-red-3 fs-14">*</span></label
      >
    </div>
    <div class="flex-row w-full">
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
    <div class="flex-row w-full">
      <label for="last_name" class="text-gray-3 fs-14 fw-4">
        Фамилия <span class="text-red-3 fs-14">*</span></label
      >
    </div>
    <flex-row class="w-full">
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
    <div class="flex-row w-full">
      <label for="middle_name" class="text-gray-3 fs-14 fw-4"> Отчество </label>
    </div>
    <flex-row class="w-full">
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
      <label for="phone" class="text-gray-3 fs-14 fw-4">
        Номер телефона <span class="text-red-3 fs-14">*</span></label
      >
    </div>
    <div class="flex-row w-full">
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
    <div class="flex-row w-full">
      <label for="email" class="text-gray-3 fs-14 fw-4">
        E-mail <span class="text-red-3 fs-14">*</span></label
      >
    </div>
    <div class="flex-row w-full">
      <d-input
        placeholder="Введите e-mail"
        type="email"
        class="w-full"
        id="email"
        :value="methodData.email"
        @change="(value) => (methodData.email = value)"
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
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4"> Агент </span>
    </div>
    <div class="flex-row">
      <select
        v-model="methodData.agent_type"
        class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] pl-[15px] outline-none"
      >
        <option value="">Выбрать</option>
        <option v-for="ty in agentStore.agentTypes" :value="ty.key" :key="ty">
          {{ ty.name }}
        </option>
      </select>
    </div>
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
      <label for="apk_version" class="text-gray-3 fs-14 fw-4"> Aпк версия </label>
    </div>
    <flex-row>
      <d-input
        placeholder="Введите апк версия"
        type="text"
        id="apk_version"
        class="w-full"
        :value="methodData.apk_version"
        @change="(value) => (methodData.apk_version = value)"
      />
    </flex-row>
    <div class="flex-row">
      <label for="login" class="text-gray-3 fs-14 fw-4">
        Логин <span class="text-red-3 fs-14">*</span></label
      >
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
      <label for="password" class="text-gray-3 fs-14 fw-4">
        Пароль <span v-if="!id" class="text-red-3 fs-14">*</span></label
      >
    </div>
    <div class="flex-row mb-16">
      <d-input
        placeholder="**********"
        type="password"
        id="password"
        class="w-full"
        :value="methodData.password"
        @change="(value) => (methodData.password = value)"
        :required="!id"
      />
    </div>
    <div
      class="left-[-16px] custom-shadow w-[450px] flex pb-8 rounded-b-lg mt-2 px-10 pt-6 absolute bottom-[-42px] bg-white z-50 items-center"
    >
      <m-btn class="w-[92%]" type="submit">
        {{ props.id ? "Сохранять" : "Добавлять" }}
      </m-btn>
    </div>
  </form>
</template>

<script setup>
import { useNotification } from "@kyvg/vue3-notification";

// Props
const props = defineProps({
  id: {
    default: "",
    type: String,
  },
});

// Store
const agentStore = useAgentsStore("true");

// State
let methodData = ref({
  first_name: "",
  middle_name: "",
  last_name: "",
  phone: "",
  login: "",
  code: "",
  color: "#d41c1c",
  email: "",
  apk_version: "",
  agent_type: "",
  password: "",
  is_active: true,
});
let dataLoading = ref(false);

// Emits
const emit = defineEmits(["closeDialog"]);

// Methods
async function saveAll() {
  const { notify } = useNotification();
  console.log(methodData.value);

  try {
    await agentStore.add(methodData.value);
    notify({ title: `Агент успешно ${props.id ? "изменено" : "добавлено"}` });
    emit("closeDialog");
  } catch (e) {
    const errorMessage = e.response.data.Messages[0];
    if (errorMessage === `Login: ${methodData.value.login} is already exists.`) {
      notify({
        title: `Логин ${methodData.value.login} уже существует!`,
        type: "error",
      });
    } else {
      notify({ title: "Ошибка при добавлении агента!", type: "error" });
    }
  }
}

// Hooks
onMounted(async () => {
  if (props.id) {
    methodData.value = await agentStore.getAgentDetail(props.id.toString());
  }

  dataLoading.value = true;
  if (!agentStore.agentTypes) {
    await agentStore.getAgentTypes();
  }
});
</script>

<style scoped>
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
