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
      <div class="flex border-t border-[#E1E4E4] mt-4 justify-between">
        <div class="fs-14  mt-4">Цвет</div>
        <div class="flex mt-4 ml-4">
          <div class="mr-[10px]" >{{data.color}}</div>
          <div class="input-color-container  cursor-pointer">
            <input v-model="data.color" class="input-color" type="color">
          </div>
        </div>
      </div>
      <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Код
      </span>
      </div>
      <div class="flex-row">
        <d-input placeholder="Введите"
                 type="text"
                 class="w-full"
                 :value="data.code"
                 @change="(value) => data.code = value"/>
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
import {ClientTypeModel} from "~/interfaces/api/client-type-model";
import {def} from "@vue/shared";
const props = defineProps({
  clientTypesStore:Object
})

const data: Ref<ClientTypeModel> = ref({
  id: undefined,
  name: "",
  color: "",
  code: "",
  is_active: true
});
const dialogStore = useDialogStore("client_types");

const save = async (e:any) => {
  e.preventDefault()
  notify({title: "Пожалуйста подождите!"});
  if (data.value.name !== ''){
    await props.clientTypesStore.add(data.value);

    await props.clientTypesStore.refresh();

    notify({title: "Сохранено!"})

    await dialogStore.closeDialog();
  }

}

onBeforeMount(() => {
  if (dialogStore.singleData !== null) {
    data.value = dialogStore.singleData;
  }
});

</script>

<style scoped>
.dropdown {
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  width: 170px;
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

.input-color-container {
  position: relative;
  overflow: hidden;
  width: 28px;
  height: 28px;
  border-radius: 8px;
}

.input-color {
  position: absolute;
  right: -8px;
  top: -8px;
  width: 56px;
  height: 56px;
  border: none;
}
</style>
