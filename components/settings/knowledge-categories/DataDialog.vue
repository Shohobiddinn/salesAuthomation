<template>
  <form id="app" class="w-full" @submit="save">
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
      <multi-check-box :values="rolesStore.data.map((value) => {
      return {
        name: value.name,
        value: value.key,
        isSelected: data.roles.includes(value.key),
      }
    })" name="Роль" @change="rolesSelected"/>
      <div class="flex flex-row items-center gap-2 mt-1">
      <span class="text-gray-3 fs-14 fw-4">
        Aктивный 
      </span>
        <label class="switch">
          <input v-model="data.is_active" type="checkbox">
          <span class="slider round"></span>
        </label>
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

import {Ref} from "vue";
import {notify} from "@kyvg/vue3-notification";
import {KnowledgeCategoryModel} from "~/interfaces/api/knowledge-category-model";
import {MultiCheckboxModel} from "~/interfaces/ui/multi-checkbox-model";

const data: Ref<KnowledgeCategoryModel> = ref({
  name: "",
  is_active: true,
  roles: [],
});

const knowledgeCategoriesActiveStore = useKnowledgeCategoriesStore("true");
const knowledgeCategoriesInActiveStore = useKnowledgeCategoriesStore("false");
const dialogStore = useDialogStore("knowledge_categories");
const rolesStore = useRolesStore();

const save = async (e:any) => {
  e.preventDefault()
  notify({title: "Пожалуйста подождите!"});
  if (data.value.name !== ''){
    await knowledgeCategoriesActiveStore.add(data.value);

    await knowledgeCategoriesActiveStore.refresh();
    await knowledgeCategoriesInActiveStore.refresh();

    notify({title: "Сохранено!"})

    await dialogStore.closeDialog();
  }

}

const rolesSelected = (value: Array<MultiCheckboxModel>) => {
  console.log(value);
  const v = value.map((v) => v.value);
  data.value.roles = v;
}

onBeforeMount(() => {
  if (dialogStore.singleData !== null) {
    data.value = dialogStore.singleData;
  }
});

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
