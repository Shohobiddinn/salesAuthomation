<template>
  <form @submit.prevent="save" class="grid grid-cols-1 w-full gap-2">
    <div class="flex-row">
      <label for="name" class="fs-14 fw-4 text-gray-3">
        Названия <span class="text-red-3 fs-14">*</span></label
      >
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите"
        class="w-full"
        type="text"
        :value="data.name"
        @change="(value) => (data.name = value)"
        id="name"
        required
      />
    </div>
    <div class="flex-row">
      <label for="code" class="fs-14 fw-4 text-gray-3"> Код </label>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите"
        class="w-full"
        type="text"
        :value="data.code"
        @change="(value) => (data.code = value)"
        id="code"
      />
    </div>

    <flex-col class="gap-2">
      <div class="flex-row">
        <div class="text-gray-3 fs-12 fw-4 mt-3">
          Единицы Измерение <span class="text-red-3 fs-14">*</span>
        </div>
      </div>
      <menu-btn class="h-11 w-full">
        <template #btn>
          <m-btn-outlined
            type="button"
            @click="onOpenDropdown($event, 'units')"
            class="border-grey flex items-center w-full gap-2"
          >
            <fa-icon hash="&#xf078" />
            {{
              data.unit_id ? getSelectedName(data.unit_id, "unit") : "Выбрать"
            }}
          </m-btn-outlined>
        </template>
        <template #content>
          <div class="overflow-auto">
            <FilterItems
              :data="unitsStore.data"
              :singleSelect="true"
              :selectedItems="data.unit_id"
              @onSingleItemSelect="data.unit_id = $event"
              @onLoadElse="onLoadElseUnits"
            />
          </div>
        </template>
      </menu-btn>
    </flex-col>
    <div class="flex flex-row items-center gap-4 h-[35px]">
      <span class="text-gray-3 fs-14 fw-4"> Aктивный  </span>
      <label class="switch mb-1">
        <input v-model="data.is_active" type="checkbox" />
        <span class="slider round"></span>
      </label>
    </div>
    <div class="flex flex-row mt-2 items-center justify-between w-full gap-2">
      <m-btn type="submit" class="grow"> Сохранять </m-btn>
    </div>
  </form>
</template>

<script setup lang="ts">
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});

import { Ref } from "vue";
import { ProductSubCategoryModel } from "~/interfaces/api/product-sub-category-model";
import { notify } from "@kyvg/vue3-notification";
// State

const data: Ref<ProductSubCategoryModel> = ref({
  id: undefined,
  name: "",
  code: "",
  unit_id: "",
  is_active: true,
});
const { isActive } = toRefs(props);
// Stores
const unitsStore = useUnitsStore(isActive.value.toString());
const dialogStore = useDialogStore("product_sub_category");
const productSubCategoryActiveStore = useProductSubCategoryStore("true");
const productSubCategoryInActiveStore = useProductSubCategoryStore("false");

// State

let toggleOpen = ref(false);

const save = async () => {
  if (!data.value.unit_id) {
    notify({ title: "Выберите измерение ", type: "error" });
    return;
  }
  notify({ title: "Пожалуйста подождите!" });
  await productSubCategoryActiveStore.add(data.value);
  await productSubCategoryActiveStore.refresh();
  await productSubCategoryInActiveStore.refresh();
  notify({ title: "Сохранено!" });
  dialogStore.closeDialog();
};

onBeforeMount(async () => {
  if (dialogStore.singleData !== null) {
    data.value = dialogStore.singleData;
    await unitsStore.getData(true);
  }
});

const onOpenDropdown = async (value: any, state: string) => {
  if (state === "units") {
    await unitsStore.getData(true);
  }
};

// Methods

function clicked() {
  toggleOpen.value = false;
  document.removeEventListener("click", function emp(e) {});
}

const getSelectedName = (selectedId: string, state: string) => {
  if (state === "unit" && unitsStore.data) {
    return unitsStore.data?.items?.find((unit: any) => unit.id === selectedId)
      ?.name;
  } else return "";
};

const onLoadElseUnits = async () => {
  unitsStore.params.page_size += 10;
};
</script>

