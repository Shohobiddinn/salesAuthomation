<template>
  <form class="w-full" @submit="save">
    <div class="grid grid-cols-1 w-full gap-2">
      <div class="flex-row">
        <d-input
          placeholder="Введите"
          class="w-full"
          type="text"
          title="Название кассы"
          :required="true"
          :value="data.name"
          @change="(value) => (data.name = value)"
        />
      </div>
      <div class="flex flex-row mt-2 items-center justify-between w-full gap-2">
        <m-btn v-if="!data.id" class="grow" type="submit"> Добавить </m-btn>
        <m-btn v-else class="grow" type="submit"> Сохранить </m-btn>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { CashboxesModel } from "~/interfaces/api/cashboxes-model";
import {Ref} from "vue";
import { notify } from "@kyvg/vue3-notification";

// Store
const cashboxesStore = useCashboxesStore();
const dialogStore = useDialogStore("cashboxes");

// State
const data: Ref<CashboxesModel> = ref({
  id: undefined,
  name: "",
});

// Methods
const save = async (e: any) => {
  e.preventDefault();
  dialogStore.closeDialog();
  await cashboxesStore.add(data.value);
  await cashboxesStore.refresh();
  notify({ title: "Сохранено!" });
};

// Hooks
onBeforeMount(() => {
  if (dialogStore.singleData?.id !== undefined) {
    data.value = dialogStore.singleData;
  }
});
</script>
