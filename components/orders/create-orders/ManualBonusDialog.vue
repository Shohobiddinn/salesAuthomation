<template>
  <div class="grid grid-cols-1 w-full gap-2">
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Код
      </span>
    </div>
    <menu-btn class="w-full" @click="onOpenDropdown($event, 'templates')">
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
          <search-input @change="search($event, 'templates')" />
          <FilterItems
              v-if="activeTask"
              :data="activeTask"
              :selectedItems="form.bonusIds"
              @onSelectItems="selectTask"
              @onLoadElse="onLoadElseTask"
          />
        </flex-col>
      </template>
    </menu-btn>
  </div>

</template>

<script setup lang="ts">

import {Ref} from "vue";
import {notify} from "@kyvg/vue3-notification";
import {KpiGroupTemplates} from "~/interfaces/api/kpi-group-templates";
import {useKpiGroupStore} from "~/stores/command/kpi-group-templates/kpi-group-templates.store";
import {useBonusesStore} from "~/stores/settings/bonuses/bonuses.store";
const props = defineProps({
  dataManual:Object,
  form:Array as any
})
const bonusStore = useBonusesStore(true);

// Hooks

const emit = defineEmits(['errorDefine'])
const kpiStore = useKpiTemplateStore('')
const kpiGroupStore = useKpiGroupStore('')
const data: Ref<KpiGroupTemplates> = ref({
  id: undefined,
  name: "",
  templates: []
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
const activeTask = ref(null) as any
const onOpenDropdown = async (value:any, state:any) => {
  if (state === "templates" && !activeTask.value) {
    await getActiveTask();
    return;
  }
  return;
};
function selectTask(param:any,names:any){
  props.form.bonusIds = param
}
const getActiveTask = async () => {
  await bonusStore.getDataManual(true);
  activeTask.value = bonusStore.dataManual
};
const onLoadElseTask = async () => {
  usersParams.value.page_size += 10;
  await getActiveTask();
};

</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #ffffff;
  z-index: 1;
}

.dropdown-content a {
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.show {
  display: block;
}
</style>
