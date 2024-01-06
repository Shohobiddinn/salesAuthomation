<template>
  <form id="app" class="w-full" @submit="save">
    <div class="grid grid-cols-1 w-full gap-2">
      <div class="flex-row">
        <d-input
          placeholder="Введите"
          class="w-full"
          type="text"
          title="Названия"
          :required="true"
          :value="data.name"
          @change="(value) => (data.name = value)"
        />
      </div>
      <div class="flex-row">
        <d-input
          placeholder="Введите"
          type="text"
          class="w-full"
          title="Код"
          :value="data.code"
          @change="(value) => (data.code = value)"
          required
        />
      </div>
      <div class="flex-row">
        <d-input
          placeholder="Введите"
          type="text"
          class="w-full"
          title="Заголовок"
          :value="data.title"
          @change="(value) => (data.title = value)"
          required
        />
      </div>
      <div class="flex-row">
        <d-input
          placeholder="Введите"
          type="text"
          class="w-full"
          title="Кодовое название"
          :value="data.code_name"
          @change="(value) => (data.code_name = value)"
        />
      </div>
      <div class="flex flex-row items-center gap-2 mt-1">
        <span class="text-gray-3 fs-14 fw-4"> Aктивный  </span>
        <label class="switch">
          <input v-model="data.is_active" type="checkbox" />
          <span class="slider round"></span>
        </label>
      </div>
      <div class="flex flex-row mt-2 items-center justify-between w-full gap-2">
        <m-btn v-if="!data.id" class="grow" type="submit"> Добавить </m-btn>
        <m-btn v-else class="grow" type="submit"> Сохранить </m-btn>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { CurrencyModel } from "~/interfaces/api/currency-model";
import { notify } from "@kyvg/vue3-notification";
// Store
const currenciesStore = useCurrenciesStore("");
const dialogStore = useDialogStore("currencies");

// State
const data: Ref<CurrencyModel> = ref({
  id: undefined,
  name: "",
  code_name: "",
  code: "",
  title: "",
  is_active: true,
});

// Methods
const save = async (e: any) => {
  e.preventDefault();
  notify({ title: "Пожалуйста подождите!" });
  await currenciesStore.add(data.value);
  await currenciesStore.refresh();
  notify({ title: "Сохранено!" });
  dialogStore.closeDialog();
};

// Hooks
onBeforeMount(() => {
  if (dialogStore.singleData !== null) {
    data.value = dialogStore.singleData;
  }
});
</script>
