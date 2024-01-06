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
      <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Сортировка
      </span>
      </div>
      <div class="flex-row">
        <d-input placeholder="Введите"
                 type="number"
                 class="w-full"
                 :value="data.sort"
                 @change="(value) => data.sort = value"/>
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
        <div id="close-1"></div>
      </div>
    </div>
  </form>

</template>

<script setup lang="ts">
import {useTradeDirectionsStore} from "~/stores/settings/trade-directions/trade-directions.store";

const props = defineProps({
  tradeDirectionsStore:Object,
  isActive: {
    type: Boolean,
    required: true,
  },
})
import {Ref} from "vue"
import {notify} from "@kyvg/vue3-notification"
import {TradeDirectionsModel} from "~/interfaces/api/trade-directions-model";
const {isActive} = toRefs(props);
const data: Ref<TradeDirectionsModel> = ref({
  id: undefined,
  name: "",
  sort: 0,
  is_active: true
})
const dialogStore = useDialogStore("trade-directions");

const save = async (e:any) => {
  e.preventDefault()
  notify({title: "Пожалуйста подождите!"});
  if (data.value.name !== ''){
    await props.tradeDirectionsStore.add(data.value);

    await props.tradeDirectionsStore.refresh();

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
