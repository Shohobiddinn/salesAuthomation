<template>
  <div class="grid grid-cols-1 w-full gap-2">
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Процент скидки
      </span>
    </div>
    <div class="flex-row">
      <d-input placeholder="Введите"
               class="w-full"
               type="text"
               :value="data.rebate"
               @change="(v) => data.rebate = v"/>
    </div>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Название
      </span>
    </div>
    <div class="flex-row">
      <d-input placeholder="Введите"
               class="w-full"
               type="text"
               :value="data.name"
               @change="(v) => data.name = v"/>
    </div>
    <div>
    <div>
      <div class="mb-2 fs-12">Agents</div>
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
                :data="agents"
                :selectedItems="data.agent_ids"
                @onSelectItems="selectAgents"
                @onLoadElse="onLoadElseAgents"
            />
          </flex-col>
        </template>
      </menu-btn>
    </div>
  </div>

    <div class="flex justify-between items-center gap-2 mt-1">
      <div class="fs-14">Прикрепить всех</div>
      <div class="fs-14">Открепить всех</div>
    </div>
    <div class="flex flex-row mt-2 items-center justify-between w-full gap-2">
      <m-btn @click="save" class="grow">
        Добавить
      </m-btn>
    </div>
  </div>
</template>

<script setup>

// State
import {notify} from "@kyvg/vue3-notification";

// Store
const dialogStore = useDialogStore('manual-discount')
const discountStore = useDiscountsStore('')

// State
const agents = ref(null)
const data = ref({
  agent_ids:[],
  rebate:0,
  name:'',
})

const agentsParams = ref({
  page: 1,
  page_size: 10,
  order_by: {
    field: "created_date",
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
const onOpenDropdown = async (value, state) => {
 if ((state === "agent") && !agents.value) {
    await getAgents();
    return;
  }
  return;
};

const getAgents = async () => {
  agents.value = await discountStore.getAgents(agentsParams.value)
};

function selectAgents(param){
  data.value.agent_ids = param
};

const onLoadElseAgents = async () => {
  agentsParams.value.page_size += 10;
  await getAgents();
};

const search = async (value, state) => {
 if (state === "agent") {
    agentsParams.value.search = value;
    await getAgents();
    return;
  }
};

const save = async (e) => {
  e.preventDefault()
  notify({title: "Пожалуйста подождите!"});
  await discountStore.addManual(data.value)
  await discountStore.refresh()
  dialogStore.closeDialog();
}

onBeforeMount(async() => {
  await discountStore.getAgents(agentsParams.value)
  if (dialogStore.singleData !== null) {
    data.value = dialogStore.singleData;
  }
});
</script>
