<template>
  <form @submit.prevent="saveAll" class="grid grid-cols-1 w-[380px] overflow-y-auto h-[600px] gap-2 pr-3">
    <flex-row class="w-full">
      <flex-col class="w-full gap-1">
        <div class="text-gray-3 fs-14 fw-4">Категории продукта</div>
        <menu-btn class="w-full">
          <template #btn>
            <m-btn-outlined class="border-grey flex items-center w-full gap-2 h-11 outline-none">
              <fa-icon hash="&#xf078" />
              Выбрать
            </m-btn-outlined>
          </template>
          <template #content>
            <div class="h-44 overflow-auto w-full">
              <FilterItems v-if="productCategoryData" :data="productCategoryData" :selectedItems="methodData.categories"
                @onSelectItems="methodData.categories = $event" @onLoadElse="onLoadElsePartnersData" />
            </div>
          </template>
        </menu-btn>
      </flex-col>
    </flex-row>

    <div class="flex-row">
      <label for="first_name" class="text-gray-3 fs-14 fw-4"> Имя <span class="text-red-3 fs-14">*</span></label>
    </div>
    <div class="flex-row">
      <d-input placeholder="Введите имя" type="text" class="w-full" id="first_name" :value="methodData.first_name"
        @change="(value) => (methodData.first_name = value)" required />
    </div>
    <div class="flex-row">
      <label for="last_name" class="text-gray-3 fs-14 fw-4"> Фамилия <span class="text-red-3 fs-14">*</span></label>
    </div>
    <flex-row>
      <d-input placeholder="Введите фамилия" type="text" class="w-full" id="last_name" :value="methodData.last_name"
        @change="(value) => (methodData.last_name = value)" required />
    </flex-row>
    <div class="flex-row">
      <label for="middle_name" class="text-gray-3 fs-14 fw-4"> Отчество </label>
    </div>
    <flex-row>
      <d-input placeholder="Введите отчество" type="text" class="w-full" id="middle_name" :value="methodData.middle_name"
        @change="(value) => (methodData.middle_name = value)" />
    </flex-row>
    <div class="flex-row">
      <label for="phone" class="text-gray-3 fs-14 fw-4"> Телефон <span class="text-red-3 fs-14">*</span></label>
    </div>
    <div class="flex-row">
      <d-input placeholder="Введите телефон" type="tel" class="w-full" id="phone" :value="methodData.phone"
        @change="(value) => (methodData.phone = value)" required />
    </div>
    <div class="flex-row">
      <div class="flex-row">
        <label for="email" class="text-gray-3 fs-14 fw-4"> E-mail <span class="text-red-3 fs-14">*</span></label>
      </div>
      <div class="flex-row">
        <d-input placeholder="Введите имя" type="email" class="w-full" id="email" :value="methodData.email"
          @change="(value) => (methodData.email = value)" required />
      </div>
      <label for="code" class="text-gray-3 fs-14 fw-4"> Код </label>
    </div>
    <div class="flex-row">
      <d-input placeholder="Введите код" type="text" class="w-full" id="code" :value="methodData.code"
        @change="(value) => (methodData.code = value)" />
    </div>
    <div class="flex-row">
      <label for="login" class="text-gray-3 fs-14 fw-4"> Логин <span class="text-red-3 fs-14">*</span></label>
    </div>
    <div class="flex-row">
      <d-input placeholder="Введите логин" type="text" class="w-full" id="login" :value="methodData.login"
        @change="(value) => (methodData.login = value)" required />
    </div>
    <div class="flex-row">
      <label for="password" class="text-gray-3 fs-14 fw-4"> Пароль <span class="text-red-3 fs-14">*</span></label>
    </div>
    <div class="flex-row">
      <d-input placeholder="***********" type="password" class="w-full" id="password" :value="methodData.password"
        @change="(value) => (methodData.password = value)" required />
    </div>
    <div class="flex justify-between items-center gap-2 mt-4 mb-5">
      <div class="text-gray-3 fs-14 fw-4">Активность</div>
      <label class="switch">
        <input v-model="methodData.is_active" type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
    <div>
      <m-btn class="grow w-100 mb-5" type="submit">
        {{ partnerId ? "Сохранять" : "Добавлять" }}
      </m-btn>
    </div>
  </form>
</template>

<script setup>
import { useNotification } from "@kyvg/vue3-notification";

// Props and Emit
const emit = defineEmits(["closeDialog"]);
const props = defineProps({
  partnerId: String,
});

// store
const partnersStore = usePartnersStore("true");

// State
const productCategoryData = ref();
const productCategoryParams = ref({
  page: 1,
  page_size: 10,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

let methodData = ref({
  first_name: "",
  middle_name: "",
  last_name: "",
  email: "",
  phone: "",
  login: "",
  code: "",
  password: "",
  categories: [],
  is_active: true,
});

// Methods
onMounted(async () => {
  if (props.partnerId) {
    methodData.value = await partnersStore.getParnerDetail(
      props.partnerId
    );
  }

  productCategoryData.value = await partnersStore.getProductCategory(productCategoryParams.value);
});

const saveAll = async (e) => {
  const { notify } = useNotification();
  try {
    await partnersStore.add(methodData.value);
    emit("closeDialog");
    notify({
      title: `Партнеры успешно ${props.partnerId ? "изменено" : "добавлено"
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
      notify({ title: "Ошибка при добавлении партнера!", type: "error" });
    }
  }
};

const onLoadElsePartnersData = async () => {
  productCategoryParams.value.page_size += 10;
  const data = await partnersStore.getProductCategory(productCategoryParams.value);
  productCategoryData.value = data;
};
</script>

<style scoped>
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
