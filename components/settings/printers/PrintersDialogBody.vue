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
        Адрес (url)
      </span>
      </div>
      <div class="flex-row">
        <d-input placeholder="Введите"
                 type="text"
                 class="w-full"
                 :value="data.url"
                 @change="(value) => data.url = value"/>
      </div>
      <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
             Агенты
          </span>
      </div>
      <div class="flex-row">
        <select v-model="data.agents[0].agent_id" class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
          <option v-for="(item, index) in agentsStore.data?.items" :value="item.id">{{item.first_name}}</option>
        </select>
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
import {usePrintersStore} from "~/stores/settings/printers/printers.store";

const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
})
import {Ref} from "vue"
import {notify} from "@kyvg/vue3-notification"
import {PrintersModel} from "~/interfaces/api/printers-model";

const {isActive} = toRefs(props);
const data: Ref<PrintersModel> = ref({
  id: undefined,
  name: "",
  url: "",
  agents:[
    {
      agent_id:""
    }
  ] ,
  is_active: true
})
const agentsStore = useAgentsStore(isActive.value.toString())
const printersActiveStore = usePrintersStore("true");
const printersInActiveStore = usePrintersStore("false");
const dialogStore = useDialogStore("printers");

const save = async (e:any) => {
  e.preventDefault()
  notify({title: "Пожалуйста подождите!"});
  if (data.value.name !== ''){
    await printersActiveStore.add(data.value);

    await printersActiveStore.refresh();
    await printersInActiveStore.refresh();

    notify({title: "Сохранено!"})

    await dialogStore.closeDialog();
  }

}

onBeforeMount(() => {
  if (dialogStore.singleData !== null) {
    data.value = dialogStore.singleData;
  }
});
onMounted(()=>{
  agentsStore.getData(isActive.value)
})
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
