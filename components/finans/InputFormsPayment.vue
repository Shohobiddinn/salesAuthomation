<template>
  <div class="flex flex-col my-6.5 bg-white rounded-lg">
    <div class="flex flex-col p-12.5 gap-10">
      <p-title> {{ pageTitle }} </p-title>
      <div class="flex justify-between">
        <PageTitle20 :title="secondaryTitle" />
        <div class="flex flex-col gap-6 w-[60%]">
          <div class="flex flex-col w-full gap-2.5">
            <label for="client-inp" class="fs-12"
              >Клиент <span class="text-red-3 fs-16">*</span></label
            >
            <DInput
              :form="true"
              :id="'client-inp'"
              :placeholder="'Введите название клиента'"
              :type="'text'"
              :value="clientName"
              @change="setClientName"
              class="h-11"
            />
          </div>
          <div class="flex flex-col w-full gap-2.5">
            <label class="fs-12"
              >Агент <span class="text-red-3 fs-16">*</span></label
            >
            <multiply-selections
              :h="true"
              :filter="filter.agent"
              @toggle="(toggle) => (filter.agent = toggle)"
            />
          </div>
          <div class="flex flex-col w-full gap-2.5">
            <label class="fs-12"
              >Экспедитор <span class="text-red-3 fs-16">*</span></label
            >
            <multiply-selections
              :h="true"
              :filter="filter.forwarder"
              @toggle="(toggle) => (filter.forwarder = toggle)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-for="(form, index) in forms" :key="form">
      <div class="h-[1px] bg-[#E1E4E4]"></div>
      <div class="flex flex-col p-12.5 gap-10">
        <div class="flex justify-between">
          <div class="flex gap-6">
            <PageTitle20 :title="'Оплата'" />
            <div
              v-if="index > 0"
              class="font-medium text-red-3 mt-3 cursor-pointer"
              @click="deleteForm"
            >
              Убрать
            </div>
          </div>
          <div class="flex flex-col gap-6 w-[60%]">
            <div class="flex flex-col w-full gap-2.5">
              <label for="client-inp" class="fs-12"
                >Даты оплаты <span class="text-red-3 fs-16">*</span></label
              >
              <DInputDatePicker class="h-11" :values="''" />
            </div>
            <div class="flex flex-col w-full gap-2.5">
              <label class="fs-12"
                >Тип оплаты <span class="text-red-3 fs-16">*</span></label
              >
              <multiply-selections :h="true" />
            </div>
            <div class="flex flex-col w-full gap-2.5">
              <label class="fs-12"
                >Касса <span class="text-red-3 fs-16">*</span></label
              >
              <multiply-selections :h="true" />
            </div>
            <div class="flex flex-col w-full gap-2.5">
              <label class="fs-12"
                >Сумма <span class="text-red-3 fs-16">*</span></label
              >
              <DInput
                :form="true"
                :placeholder="'Введите сумму'"
                :type="'text'"
                class="h-11"
              />
            </div>
            <div class="flex flex-col w-full gap-2.5">
              <label class="fs-12">Комментарии</label>
              <textarea
                placeholder="Добавить комментарии"
                :type="'text'"
                class="rounded-lg border h-[100px] p-2 w-full outline-none h-40"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end pb-12.5 px-12.5">
      <m-btn-outlined
        class="border-color-primary whitespace-nowrap"
        @click="addForm"
      >
        <div class="flex">
          <div><IconPlus /></div>
          <div>Добавить еще</div>
        </div>
      </m-btn-outlined>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  pageTitle: String,
  secondaryTitle: String,
});

const clientName = ref("");

const forms = ref(1);

const filter = ref({
  agent: false,
  forwarder: false,
});

const setClientName = (val: string) => {
  clientName.value = val;
};

const addForm = () => {
  forms.value++;
};

const deleteForm = () => {
  forms.value--;
};
</script>

<style>
</style>