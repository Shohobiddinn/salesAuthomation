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
        <span class="text-gray-3 fs-14 fw-4"> Описание </span>
      </div>
      <div class="flex-row">
        <d-input
          placeholder="Введите"
          type="text"
          class="w-full"
          :value="data.description"
          @change="(value) => (data.description = value)"
        />
      </div>
      <div class="flex-row">
        <span class="text-gray-3 fs-14 fw-4"> Код </span>
      </div>
      <div class="flex-row">
        <d-input
          placeholder="Введите"
          type="text"
          class="w-full"
          :value="data.code"
          @change="(value) => (data.code = value)"
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
import { notify } from "@kyvg/vue3-notification";
import { ClientCategoryModel } from "~/interfaces/api/client-category-model";

// Store
const clientCategoriesStore = useClientCategoriesStore("");

// State
const data: Ref<ClientCategoryModel> = ref({
  id: undefined,
  name: "",
  description: "",
  code: "",
  is_active: true,
});

const dialogStore = useDialogStore("client_categories");

// Methods
const save = async (e: any) => {
  e.preventDefault();
  notify({ title: "Пожалуйста подождите!" });
  if (data.value.name !== "") {
    await clientCategoriesStore.add(data.value);
    await clientCategoriesStore.refresh();
    notify({ title: "Сохранено!" });
    dialogStore.closeDialog();
  }
};

// Hooks
onBeforeMount(() => {
  if (dialogStore.singleData !== null) {
    data.value = dialogStore.singleData;
  }
});
</script>
