<template>
  <form id="app" class="w-full" @submit="save">
    <div class="grid grid-cols-1 w-full gap-2">
      <div class="flex-row">
        <d-input
          placeholder="Введите"
          class="w-full"
          type="text"
          title="Названия"
          required
          :value="data.name"
          @change="(setName) => (data.name = setName)"
        />
      </div>
      <d-select
        required
        title="Тип"
        :value="data.type"
        @change="(value) => (data.type = value)"
      >
        <option v-for="key in priceTypeStore.types" :value="key">
          {{ key }}
        </option>
      </d-select>
      <d-select
        required
        title="Валюта"
        :value="data.currency_id"
        @change="(value) => (data.currency_id = value)"
      >
        <option v-for="key in currencyData.items" :value="key.id">
          {{ key.name }}
        </option>
      </d-select>

      <div class="flex-row">
        <span class="fs-14 fw-4 text-gray-3"> Описание </span>
      </div>
      <div class="flex-row">
        <d-input
          placeholder="Введите"
          class="w-full"
          type="text"
          :value="data.description"
          @change="(value) => (data.description = value)"
        />
      </div>
      <div class="flex-row">
        <span class="fs-14 fw-4 text-gray-3"> Код </span>
      </div>
      <div class="flex-row">
        <d-input
          placeholder="Введите"
          class="w-full"
          type="text"
          :value="data.code"
          @change="(value) => (data.code = value)"
        />
      </div>
      <div class="grid grid-cols-2 items-center">
        <div class="flex items-center gap-2 mt-1">
          <span class="text-gray-3 fs-14 fw-4"> Aктивный  </span>
          <label class="switch">
            <input v-model="data.is_active" type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
        <div class="flex items-center justify-self-end gap-2 mt-1">
          <span class="text-gray-3 fs-14 fw-4"> Ручной </span>
          <label class="switch">
            <input v-model="data.hand_edit" type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <div class="flex flex-row items-center gap-2 mt-1 justify-between">
          <span class="text-gray-3 fs-14 fw-4">
            Доступно только для прикрепленных клиентов
          </span>
          <label class="switch">
            <input v-model="data.for_client" type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
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
import { PriceTypesModels } from "~/interfaces/api/price-types-models";

// Store
const priceTypeStore = usePriceTypesStore("");
const dialogStore = useDialogStore("priceTypes");

// State
const data: Ref<PriceTypesModels> = ref({
  id: undefined,
  name: "",
  code: "",
  type: "",
  currency_id: "",
  description: "",
  hand_edit: true,
  for_client: true,
  is_active: true,
});

const CurrencyParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

const currencyData = ref({});

// Methods
const save = async (e: any) => {
  e.preventDefault();
  notify({ title: "Пожалуйста подождите!" });
  if (data.value.name !== "") {
    await priceTypeStore.add(data.value);
    await priceTypeStore.refresh();
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

onMounted(async () => {
  currencyData.value = await priceTypeStore.getCurrency(CurrencyParams.value);
  await priceTypeStore.getType();
});
</script>
