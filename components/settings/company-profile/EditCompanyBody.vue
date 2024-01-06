<template>
  <div class="w-full">
    <flex-col class="gap-2">
      <div class="flex-row">
        <div class="text-gray-3 fs-12 fw-4 mt-3">
          Регион
        </div>
      </div>
      <menu-btn class="h-11 w-full">
        <template #btn>
          <m-btn-outlined class="border-grey flex items-center w-full gap-2">
            <fa-icon hash="&#xf078" />
            {{
              data.territory_id
              ? getSelectedName(data.territory_id, "regions")
              : "Выбрать"
            }}
          </m-btn-outlined>
        </template>
        <template #content>
          <div class="overflow-auto h-44 w-56">
            <FilterItems :data="regions" :singleSelect="true" :selectedItems="data.territory_id"
              @onSingleItemSelect="data.territory_id = $event" @onLoadElse="onLoadElseRegions" />
          </div>
        </template>
      </menu-btn>
      <small v-show="isRegionUnSelected" class="text-red-3 fs-12">Это обязательно поле *</small>
    </flex-col>
    <div class="flex flex-row my-2">
      <span class="text-gray-3 fs-12 fw-4"> Названия </span>
    </div>
    <div class="flex flex-row gap-4">
      <d-input :placeholder="'Введите'" class="w-full" type="text" :value="data.name"
        @change="(value) => (data.name = value)" />
    </div>
    <div class="flex flex-row my-2">
      <span class="text-gray-3 fs-12 fw-4"> Название компании </span>
    </div>
    <div class="flex flex-row gap-4">
      <d-input :placeholder="'Введите'" class="w-full" type="text" :value="data.company_name"
        @change="(value) => (data.company_name = value)" />
    </div>
    <div class="flex flex-row my-2">
      <span class="text-gray-3 fs-12 fw-4"> Телефон </span>
    </div>
    <div class="flex flex-row gap-4">
      <d-input :placeholder="'Введите'" class="w-full" type="text" :value="data.phone"
        @change="(value) => (data.phone = value)" />
    </div>
    <div class="flex flex-row my-2">
      <span class="text-gray-3 fs-12 fw-4"> Адрес </span>
    </div>
    <div class="flex flex-row gap-4">
      <d-input :placeholder="'Введите'" class="w-full" type="text" :value="data.address"
        @change="(value) => (data.address = value)" />
    </div>
    <div class="flex flex-row my-2">
      <span class="text-gray-3 fs-12 fw-4"> Эл. почта </span>
    </div>
    <div class="flex flex-row gap-4">
      <d-input :placeholder="'Введите'" class="w-full" type="email" :value="data.email"
        @change="(value) => (data.email = value)" />
    </div>
    <div class="flex flex-row mt-4 items-center">
      <m-btn @click="save" class="w-11/12"> Сохранять </m-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { notify } from "@kyvg/vue3-notification";
import { Company_profile } from "~/interfaces/api/company_profile";
import { RegionModel } from "~~/interfaces/api/region-model";
import { AppResponse } from "~~/interfaces/api/app-response";
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});
const { isActive } = toRefs(props);
const data: Ref<Company_profile> = ref({
  id: undefined,
  name: "",
  company_name: "",
  phone: "",
  territory_id: "",
  address: "",
  email: "",
  territory_id: null,
});

// Stores
const territoriesStore = useTerritoriesStore(isActive.value.toString());
const company_profileActiveStore = useCompany_profileStore("true");
const dialogStore = useDialogStore("company_profile");
const regions: Ref<AppResponse<RegionModel> | undefined> = ref();
const isRegionUnSelected = ref(false);

const regionsParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "id",
    is_asc: true,
  },
  filter: [
    {
      field: "is_active",
      value: ["true"],
    },
  ],
});

const getSelectedName = (selectedId: any, state: string) => {
  if (state === "regions" && regions.value) {
    isRegionUnSelected.value = false;
    return (
      regions.value.items?.find((region) => region.id === selectedId)?.name ||
      "---"
    );
  } else return;
};
const onLoadElseRegions = async () => {
  regionsParams.value.page_size += 10;
  regions.value = await territoriesStore.getRegions(regionsParams.value);
};
const save = async () => {
    if (!data.value.territory_id) {
    isRegionUnSelected.value = true;
    return;
  }
  notify({ title: "Пожалуйста подождите!" });
  await company_profileActiveStore.add(data.value);
  await company_profileActiveStore.refresh();
  notify({ title: "Сохранено!" });
  dialogStore.closeDialog();
};
 onMounted( async() => {
  data.value = {
    ...company_profileActiveStore.data
  };
  regions.value = await territoriesStore.getRegions(
      regionsParams.value
    );
});
onBeforeMount(() => {
  if (dialogStore.singleData !== null) {
    data.value = dialogStore.singleData;
  }
});
</script>
