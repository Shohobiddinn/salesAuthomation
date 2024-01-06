<template>
  <div class="grid grid-cols-2 justify-between w-full gap-2">
    <div class="grid grid-cols-2 tab-btn">
      <button
        class="px-3 py-3 fs-14 fw-4 rounded-l-lg"
        @click="activeTab = activeTab !== 1 ? 1 : 0"
        :class="
          activeTab === 1
            ? 'text-white button-bg hover:bg-teal-600 active:bg-teal-700'
            : 'border-1 border border-color-primary'
        "
      >
        Конфигурии для компании
      </button>
      <button
        class="px-3 py-3 fs-14 fw-4 rounded-r-lg"
        @click="activeTab = activeTab !== 2 ? 2 : 0"
        :class="
          activeTab === 2
            ? 'text-white button-bg hover:bg-teal-600 active:bg-teal-700'
            : 'border-1 border border-color-primary border-l-0'
        "
      >
        Другие настройки
      </button>
    </div>
    <div class="gap-2 grid grid-cols-2 tab-btn">
      <dm-btn @click="dialogStore.openDialog"> Изменить данные </dm-btn>
      <dm-btn @click="dialogStore.openDialog"> Изменить пароль </dm-btn>
    </div>
  </div>
  <div
    class="border-1 rounded-large p-5 my-4 w-10/12 gap-4"
    v-if="activeTab === 1"
  >
    <div class="flex flex-row">
      <span class="text-gray-3 fs-16 fw-6"> Конфигурии для компании </span>
    </div>
    <div class="flex flex-row my-2">
      <span class="text-gray-3 fs-12 fw-4"> Ставка НДС </span>
    </div>
    <div class="flex flex-row gap-4">
      <d-input
        :placeholder="'Введите'"
        class="w-full"
        type="text"
        :value="data.nds"
        @change="(e) => (data.nds = e)"
      />
      <m-btn @click="save"> Сохранить </m-btn>
    </div>
  </div>
  <div
    class="border-1 rounded-large p-5 my-4 w-10/12 gap-4"
    v-if="activeTab === 2"
  >
    <div class="fle flex-row">
      <span class="text-gray-3 fs-16 fw-6"> Другие настройки </span>
    </div>
    <div class="grid grid-cols-2 mt-2 gap-4">
      <div>
        <div class="flex flex-row my-2">
          <span class="text-gray-3 fs-12 fw-4"> Телеграм бот </span>
        </div>
        <div class="flex flex-row gap-4">
          <d-input
            :placeholder="'Введите'"
            class="w-full"
            type="text"
            :value="config.telegram_bot"
            @change="(e) => (config.telegram_bot = e)"
          />
        </div>
        <div class="flex flex-row my-2">
          <span class="text-gray-3 fs-12 fw-4"> Аудит 2 </span>
        </div>
        <div class="flex flex-row gap-4">
          <d-input
            :placeholder="'Введите'"
            class="w-full"
            type="text"
            :value="config.audit"
            @change="(e) => (config.audit = e)"
          />
        </div>
        <div class="flex flex-row mt-4">
          <m-btn @click="saveConfig"> Сохранить </m-btn>
        </div>
      </div>
      <div>
        <div class="flex flex-row my-2">
          <span class="text-gray-3 fs-12 fw-4"> Тип кнопок </span>
        </div>
        <div class="flex flex-row gap-4">
          <div class="flex justify-center w-full">
            <div class="mb-3 w-full">
              <select
                class="form-select appearance-none my-input w-full block p-2 border-primary-gray border-1 rounded-lg text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid transition ease-in-out focus:text-gray-700 focus:border-blue-600 focus:outline-none"
                aria-label="Default select example"
              >
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </div>
        <div class="flex flex-row gap-4 mt-5">
          <div class="flex items-center">
            <input
              id="checked-checkbox-1"
              type="checkbox"
              :value="config.enabled"
              class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-2"
            />
            <label
              for="checked-checkbox-1"
              class="ml-2 text-sm font-medium text-gray-900"
            >
              Показать в меню
            </label>
          </div>
          <div class="flex items-center">
            <input
              id="checked-checkbox"
              type="checkbox"
              :value="config.bonus_enabled"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2"
            />
            <label
              for="checked-checkbox"
              class="ml-2 text-sm font-medium text-gray-900"
            >
              Показать кнопку бонуса
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="dialogStore.isDialogOpen">
      <d-modal
        name="Изменить данные компании"
        @closeDialog="dialogStore.closeDialog"
      >
        <SettingsCompanyProfileChangePasswordBody />
      </d-modal>
    </div>
  </transition>
</template>

<script setup lang="ts">
// State
import {
  CompanyN,
  CompanyProfileChangeC,
} from "~/interfaces/api/company_profile";
import { Ref } from "vue";
let activeTab = ref(0);
const data: Ref<CompanyN> = ref({
  nds: "",
});
const config: Ref<CompanyProfileChangeC> = ref({});
// Methods
const companyProfile = useCompany_profileStore("true");
const dialogStore = useDialogStore("change_password");
const save = async () => {
  await companyProfile.addNds(data.value);
};
const saveConfig = async () => {
  await companyProfile.addChangeConfig(config.value);
};
</script>

<style scoped>
.my-input:active {
  border-color: var(--primary-color);
}
.my-input:focus {
  outline: none !important;
  border: 1px solid var(--primary-color);
}
</style>
