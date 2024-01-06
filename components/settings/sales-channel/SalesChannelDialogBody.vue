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
                 @change="(value)=> data.name = value"/>
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
        <div id="close-1"></div>
      </div>
    </div>
  </form>

</template>

<script setup lang="ts">
import {useSalesChannelsStore} from "~/stores/settings/sales-channels/sales-channels.store";
const props = defineProps({
  salesChannelsStore:Object,
  isActive: {
    type: Boolean,
    required: true,
  },
})
import {Ref} from "vue"
import {notify} from "@kyvg/vue3-notification"
import {SallesChannelsModel} from "~/interfaces/api/salles-channels-model";
const {isActive} = toRefs(props);
const data: Ref<SallesChannelsModel> = ref({
  id: undefined,
  name: "",
  code: "",
  is_active: true
})
const dialogStore = useDialogStore("sales-channels");

const save = async (e:any) => {
  e.preventDefault()
  notify({title: "Пожалуйста подождите!"});
  if (data.value.name !== ''){
    await props.salesChannelsStore.add(data.value);

    await props.salesChannelsStore.refresh();

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
