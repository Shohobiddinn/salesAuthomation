<template>
  <div class="grid grid-cols-1 w-full gap-2">
    <div class="flex-row">
      <span class="fs-14 fw-4 text-gray-3">
        Название
      </span>
    </div>
    <div class="flex-row">
      <d-input placeholder="Введите"
               class="w-full"
               type="text"
               :value="data.name"
               @change="(value) => data.name = value"/>
    </div>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        XML код
      </span>
    </div>
    <div class="flex-row">
      <d-input placeholder="Введите"
               type="text"
               class="w-full"
               :value="data.code"
               @change="(value) => data.code = value"/>
    </div>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Сортировка
      </span>
    </div>
    <div class="flex-row">
      <d-input placeholder="Введите"
               type="text"
               class="w-full"
               :value="data.sort"
               @change="(value) => data.sort = value"/>
    </div>
    <div class="flex flex-row items-center gap-2 mt-1">
      <span class="text-gray-3 fs-14 fw-4">
        Aктивный 
      </span>
      <label class="switch">
        <input v-model="data.isActive" type="checkbox">
        <span class="slider round"></span>
      </label>
    </div>
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
import {OrderCommentModel} from "~/interfaces/api/order-comment-model";


const data: Ref<OrderCommentModel> = ref({
  id: undefined,
  name: "",
  code: "",
  sort: 0,
  isActive: true
});

const orderCommentsActiveStore = useOrderCommentsStore("true");
const orderCommentsInActiveStore = useOrderCommentsStore("false");
const dialogStore = useDialogStore("order_comments");

const save = async () => {
  notify({title: "Пожалуйста подождите!"});

  await orderCommentsActiveStore.add(data.value);

  await orderCommentsActiveStore.refresh();
  await orderCommentsInActiveStore.refresh();

  notify({title: "Сохранено!"})

  await dialogStore.closeDialog();
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
