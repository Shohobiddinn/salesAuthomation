<template>
  <div  class="grid grid-cols-1 w-[380px] overflow-y-auto  h-[480px] gap-2">
    <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
           Название склада *
          </span>
    </div>
    <div class="flex-row">
      <d-input placeholder="Введите название"
               type="text"
               class="w-full"
               :value="data.name"
               @change="v => data.name = v"/>
    </div>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Тип *
      </span>
    </div>
    <div class="flex-row">
      <select v-model="data.type" class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
        <option v-for="item in warehousesActiveStore.warehouseType.data" :value="item.key">{{item.name}}</option>
      </select>
    </div>
    <div>
      <div class="mb-2 fs-12">Способ оплаты *</div>
      <menu-btn  class="w-full" @click="onOpenDropdown($event, 'agent')">
        <template #btn>
          <m-btn-outlined
              class="border-grey flex items-center w-full gap-2">
            <fa-icon hash="&#xf078" />
            Выбрать
          </m-btn-outlined>
        </template>
        <template #content>

          <flex-col class="gap-2 max-h-88 overflow-auto pr-2">
            <search-input @change="search($event, 'agent')" />
            <FilterItems
                :data="paymentMethod.data"
                :selectedItems="data.currencies_id"
                @onSelectItems="selectCurency"
                @onLoadElse="onLoadElseCurency"
            />
          </flex-col>
        </template>
      </menu-btn>
    </div>
    <div>
      <div class="mb-2 fs-12">Агенты *</div>
      <menu-btn  class="w-full" @click="onOpenDropdown($event, 'agent')">
        <template #btn>
          <m-btn-outlined
              class="border-grey flex items-center w-full gap-2">
            <fa-icon hash="&#xf078" />
            Выбрать
          </m-btn-outlined>
        </template>
        <template #content>

          <flex-col class="gap-2 max-h-88 overflow-auto pr-2">
            <search-input @change="search($event, 'agent')" />
            <FilterItems
                :data="agentsStore.data"
                :selectedItems="data.agents_id"
                @onSelectItems="selectAgents"
                @onLoadElse="onLoadElseAgents"
            />
          </flex-col>
        </template>
      </menu-btn>
    </div>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Складчик *
      </span>
    </div>
    <div class="flex-row">
      <select v-model="data.warehouse_man_id" class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
        <option v-for="item in warehousesActiveStore.warehouseMan?.items" :value="item.id">{{item.last_name}}</option>
      </select>
    </div>
    <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
           Код
          </span>
    </div>
    <div class="flex-row mb-[40px]">
      <d-input placeholder="Введите код"
               type="text"
               class="w-full"
               :value="data.code"
               @change="v => data.code = v"/>
    </div>
    <div class="flex flex-row mt-2 items-center absolute  bottom-[-15px] bg-white justify-between w-full gap-2">
<!--      <m-btn @click="save" class="grow">-->
<!--        Добавить-->
<!--      </m-btn>-->
      <m-btn v-if="!data.id" class="grow" @click="save" >
        Добавить
      </m-btn>
      <m-btn v-else class="grow" @click="save">
        Сохранить
      </m-btn>
      <div id="close-1"></div>
    </div>
  </div>
</template>
<script setup lang="ts">

import {ref, Ref, toRefs} from "vue";
import {notify} from "@kyvg/vue3-notification";
import {WarehousesModel} from "~/interfaces/api/warehouses-model";
import {useWarehousesStore} from "~/stores/warehouses/warehouses/warehouses.store";

// props
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
})
const filter = ref({
  isAgent: false,
  isPayment:false
})

// states
const {isActive} = toRefs(props);
const data: Ref<WarehousesModel> = ref({currencies_id:[],agents_id:[], warehouse_man_id:''});

// stores
const warehousesActiveStore = useWarehousesStore("true");
const dialogStore = useDialogStore("warehouses");
const agentsStore = useAgentsStore('true')
const paymentMethod = useCurrenciesStore('true')


// const onOpenDropdown = async (value, state) => {
//   if ((state === "agent") && !agents.value) {
//     await getAgents();
//     return;
//   }
//   return;
// };

function selectAgents(param:any){
  data.value.agents_id = param
}
const onLoadElseAgents = async () => {
  // usersParams.value.page_size += 10;
  await agentsStore.getData(true)
};
function selectCurency(param:any){
  data.value.currencies_id = param
}
const onLoadElseCurency = async () => {
  // usersParams.value.page_size += 10;
  await paymentMethod.getData(true)
};
const save = async () => {
  notify({title: "Пожалуйста подождите!"});

  await warehousesActiveStore.add(data.value);

  await warehousesActiveStore.refresh();
  notify({title: "Сохранено!"})

  dialogStore.closeDialog();
}

onBeforeMount(() => {
  if (dialogStore.singleData !== null) {
    data.value = dialogStore.singleData;
  }
});

onMounted(()=>{
  agentsStore.getData(true)
  paymentMethod.getData(true)
  warehousesActiveStore.getWarehousesType()
  warehousesActiveStore.getWarehouseMan()
})
</script>

<style scoped>
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

