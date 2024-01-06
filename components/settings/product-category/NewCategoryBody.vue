<template>
  <form id="app" class="w-full" @submit="save">
    <div class="grid grid-cols-1 w-full gap-2">
      <div class="flex-row">
        <d-input placeholder="Введите"
                 class="w-full"
                 type="text"
                 title="Названия"
                 :required="true"
                 :value="data.name"
                 @change="(value) => data.name = value"/>
      </div>
      <div class="flex flex-row items-center gap-2 mt-1">
      <span class="text-gray-3 fs-14 fw-4">
        Aктивный 
      </span>
        <label class="switch">
          <input v-model="data.is_active" type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
      <div>
        <span class="fs-14">Единица измерения</span>
      </div>
      <menu-btn class="w-full" @click="onOpenDropdown($event)">
        <template #btn>
          <m-btn-outlined
              class="border-grey flex items-center w-full gap-2">
            <fa-icon hash="&#xf078" />
            <span v-if="unitName">{{unitName}}</span>
            <span v-else>Выбрать</span>
          </m-btn-outlined>
        </template>
        <template #content>
          <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
          >
            <search-input @change="search($event)" />
            <FilterItems
                :data="units"
                :singleSelect="true"
                @onSingleItemSelect="onSingleItemSelect"
                @onLoadElse="onLoadElseUnits"
            />
          </flex-col>
        </template>
      </menu-btn>
      <div class="flex-row">
      <span class="fs-14 fw-4 text-gray-3">
        Код
      </span>
      </div>
      <div class="flex-row">
        <d-input placeholder="Введите"
                 class="w-full"
                 type="text"
                 :value="data.code"
                 @change="(value) => data.code = value"/>
      </div>
      <div class="flex flex-row mt-2 items-center justify-between w-full gap-2">
        <m-btn v-if="!data.id" class="grow" type="submit">
          Добавить
        </m-btn>
        <m-btn v-else class="grow" type="submit">
          Сохранить
        </m-btn>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import {notify} from "@kyvg/vue3-notification";
import { ProductCategoryModel } from "~/interfaces/api/product-category-model";
// Stores
const productActiveStore = useProductCategoryStore("");
const filterStore = useFilterListStore('')
const unitsStore = useUnitsStore('true');
const dialogStore = useDialogStore("product_category");

// State
const data: Ref<ProductCategoryModel> = ref({
  id:undefined,
  name:"",
  code:"",
  unit_id:"",
  is_active:true
})
let unitName = ref(dialogStore.singleData?.unit?.name)
const units = ref(null)
const usersParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "id",
    is_asc: true,
  },
  filter: [
    {
      field: 'is_active',
      value: ['true']
    }
  ]
});

// Methods
function onSingleItemSelect(unitId:any, name:any){
  data.value.unit_id = unitId
  console.log('name', name)
  unitName.value = name
}

const getUnits = async () => {
  const data = await filterStore.getUnits(usersParams.value);
  units.value = data
  units.value = JSON.parse(JSON.stringify(data))
};

const onOpenDropdown = async (value:any, state:any) => {
  if (!units.value) {
    await getUnits();
    return;
  }
  return;
};

const search = async (value:any) => {
    usersParams.value.search = value;
    await getUnits();
    return;
};

const onLoadElseUnits = async () => {
  usersParams.value.page_size += 10;
  await getUnits();
};

const save = async (e:any) => {
  e.preventDefault()
  notify({title: "Пожалуйста подождите!"});
  if (data.value.name !== ''){
    await productActiveStore.add(data.value);
    await productActiveStore.refresh();
    notify({title: "Сохранено!"})
   dialogStore.closeDialog();
  }
}

onBeforeMount(() => {
  if (dialogStore.singleData !== null) {
    data.value = dialogStore.singleData;
  }
});

onMounted(() => {
  unitsStore.getData(true);
});
</script>
