<template>
  <form  @submit.prevent="saveAll" class="grid grid-cols-1 w-full gap-2 relative w-[450px]">
    <div class="flex-row">
      <label for="last_name" class="fs-14 fw-4 text-gray-3"> Фамилия </label>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите фамилия"
        class="w-full"
        type="text"
        id="last_name"
        :value="methodData.last_name"
        @change="(value) => (methodData.last_name = value)"
        required
      />
    </div>
    <div class="flex-row">
      <label for="first_name" class="fs-14 fw-4 text-gray-3"> Имя </label>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите имя"
        class="w-full"
        type="text"
        id="first_name"
        :value="methodData.first_name"
        @change="(value) => (methodData.first_name = value)"
        required
      />
    </div>
    <div class="flex-row">
      <label for="middle_name" class="fs-14 fw-4 text-gray-3"> Отчество </label>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите отчество"
        class="w-full"
        type="text"
        id="middle_name"
        :value="methodData.middle_name"
        @change="(value) => (methodData.middle_name = value)"
      />
    </div>
    <div class="flex-row">
      <label for="code" class="text-gray-3 fs-14 fw-4"> Код </label>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите"
        type="text"
        class="w-full"
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
        id="login"
        class="w-full"
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
        id="password"
        class="w-full"
        :value="methodData.password"
        @change="(value) => (methodData.password = value)"
        :required="!auditorId"
      />
    </div>
    <div class="flex justify-between items-center gap-2 mt-5 mb-18">
      <span class="text-gray-3 fs-14 fw-4"> Aктивный  </span>
      <label class="switch">
        <input v-model="methodData.is_active" type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
    <div
      class="left-[-32px] custom-shadow w-[450px] flex pb-8 rounded-b-lg mt-2 px-10 pt-6 absolute bottom-[-38px] bg-white z-50 items-center"
    >
      <m-btn class="grow" type="submit">
        {{ auditorId ? "Сохронять" : "Добавить" }}
      </m-btn>
    </div>
  </form>
</template>

<script setup>
import { useNotification } from "@kyvg/vue3-notification";

const props = defineProps({
  auditorId: String,
});

const emit = defineEmits(["closeDialog"]);

// store
const auditorsStore = useAuditorsStore("main");

// State
let methodData = ref({
  first_name: "",
  middle_name: "",
  last_name: "",
  code: "",
  login: "",
  password: "",
  is_active: false,
});

// Methods

onMounted(async () => {
  if (props.auditorId) {
    methodData.value = await auditorsStore.getAuditorDetail(props.auditorId);
  }
});

const saveAll = async (e) => {
  const { notify } = useNotification();
  try {
    await auditorsStore.add(methodData.value);
    await auditorsStore.refresh()
    emit("closeDialog");
    notify({
      title: `Мерчандайзер успешно ${
        props.auditorId ? "изменено" : "добавлено"
      }`,
    });
  } catch (e) {
    const errorMessage = e.response?.data?.Exception;
    if (
      errorMessage === `Login: ${methodData.value.login} is already exists.`
    ) {
      notify({
        title: `Логин ${methodData.value.login} уже существует!`,
        type: "error",
      });
    } else {
      notify({ title: "Ошибка при добавлении мерчандайзера!", type: "error" });
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
</style>
