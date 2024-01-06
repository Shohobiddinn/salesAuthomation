<template>
  <div class="grid grid-cols-1 w-full gap-2">
    <div class="flex-row">
      <span class="fs-14 fw-4 text-gray-3"> Названия </span>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите"
        class="w-full"
        type="text"
        :value="data.name"
        @change="(value) => (data.name = value)"
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
      <m-btn @click="save" class="grow"> Сохранять </m-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});
import { Ref } from "vue";
import { ProductGroupsModel } from "~/interfaces/api/product-groups-model";
import { notify } from "@kyvg/vue3-notification";

// State
const data: Ref<ProductGroupsModel> = ref({
  id: undefined,
  name: "",
  code: "",
  is_active: true,
});

// Stores
const dialogStore = useDialogStore("product_groups");
const productActiveStore = useProductGroupsStore("main");

// Methods
const save = async () => {
  notify({ title: "Пожалуйста подождите!" });

  await productActiveStore.add(data.value);
  notify({ title: "Сохранено!" });

  dialogStore.closeDialog();
};

onBeforeMount(() => {
  if (dialogStore.singleData !== null) {
    data.value = dialogStore.singleData;
  }
});
</script>
