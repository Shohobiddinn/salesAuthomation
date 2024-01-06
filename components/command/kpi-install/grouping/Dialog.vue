<template>
    <div class="grid grid-cols-1 w-full gap-2">
      <div class="flex-row">
        <d-input placeholder="Введите"
                 class="w-full"
                 type="text"
                 title="Название"
                 :required="true"
                 :value="data.name"
                 @change="(value) => data.name = value"/>
      </div>
      <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Код
      </span>
      </div>
      <menu-btn class="w-full" @click="onOpenDropdown($event, 'template')">
        <template #btn>
          <m-btn-outlined
              class="border-grey flex items-center w-full gap-2">
            <fa-icon hash="&#xf078" />
            <span>Выбрать</span>

          </m-btn-outlined>
        </template>
        <template #content>
          <flex-col
              class="gap-2 max-h-88 overflow-auto pr-2"
          >
            <search-input @change="search($event, 'template')" />
            <FilterItems
                v-if="activeTask"
                :data="activeTask"
                :selectedItems="data.template"
                @onSelectItems="selectTask"
                @onLoadElse="onLoadElseTask"
            />
          </flex-col>
        </template>
      </menu-btn>
      <div class="flex flex-row mt-2 items-center justify-between w-full gap-2">
        <m-btn class="grow" @click="save">
          Добавить
        </m-btn>
      </div>
    </div>

</template>

<script setup lang="ts">

import {Ref} from "vue";
import {notify} from "@kyvg/vue3-notification";
import {KpiGroupTemplates} from "~/interfaces/api/kpi-group-templates";
const emit = defineEmits(['errorDefine'])
// Store
const kpiStore = useKpiTemplateStore('')
const kpiGroupStore = useKpiGroupStore('')

// State
const data: Ref<KpiGroupTemplates> = ref({
  id: undefined,
  name: "",
  template: []
});
const usersParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "id",
    is_asc: true,
  },
});
const activeTask = ref(null) as any;
const dialogStore = useDialogStore("kpi-group");
const errorData = ref(null);
const dataId = ref(null) as any;

// Methods
const onOpenDropdown = async (value:any, state:any) => {
  if (state === "template" && !activeTask.value) {
    await getActiveTask();
    return;
  }
  return;
};
function selectTask(param:any,names:any){
  data.value.template = param
};

const getActiveTask = async () => {
  await kpiStore.getTemplateActive()
  activeTask.value = kpiStore.kpiActiveData
};

const onLoadElseTask = async () => {
  usersParams.value.page_size += 10;
  await getActiveTask();
};

const save = async (e:any) => {
  e.preventDefault()
  try {
    notify({title: "Пожалуйста подождите!"});
    if (data.value.name !== ''){
      await kpiGroupStore.add(data.value);
      await kpiGroupStore.getData();
    }
  }catch (error){
    emit('errorDefine',error.response.status, error)
  }finally {
    if (errorData.value === 500){
      await dialogStore.closeDialog();
    }else {
      await dialogStore.closeDialog();
      notify({title: "Сохранено!"})
    }
  }
}

// Hooks
onBeforeMount(async () => {
  if (dialogStore.singleData !== null) {
    // data.value = dialogStore.singleData;
    dataId.value = await kpiGroupStore.getGroupKpiId(dialogStore.singleData.id)
    data.value = dataId.value
    console.log('data.value',data.value)
  }
});

</script>
