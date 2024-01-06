<template>
  <div class="grid grid-cols-1 w-full overflow-auto h-[450px] gap-2 pr-4">
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4"> Клиент </span>
    </div>
    <div class="flex-row relative">
      <m-btn-outlined class="border-grey h-11 flex items-center gap-2 w-full">
        <fa-icon hash="&#xf078" />
        {{ clientsAgents ? clientsAgents[0]?.client_name : "Выбрать" }}
      </m-btn-outlined>
    </div>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4"> Агент </span>
    </div>
    <menu-btn class="h-11">
      <template #btn>
        <m-btn-outlined class="h-11 border-grey flex items-center gap-2 w-full">
          <fa-icon hash="&#xf078" />
          {{
            methodData.agent_id
              ? getSelectedName("agent", methodData.agent_id)
              : "Выбрать"
          }}
        </m-btn-outlined>
      </template>
      <template #content>
        <div class="overflow-auto">
          <FilterItems
            v-if="filteredAgents"
            :data="filteredAgents"
            :singleSelect="true"
            :selectedItems="methodData.agent_id"
            @onSingleItemSelect="methodData.agent_id = $event"
          />
        </div>
      </template>
    </menu-btn>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4"> Дата </span>
    </div>
    <div class="flex-row">
      <DInputDatePicker
        @change="(newDate) => (methodData.payment_received_date = newDate)"
      />
    </div>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4"> {{ props.priceType?.name }} </span>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите"
        type="number"
        class="w-full"
        :value="methodData.payment_amount"
        @change="(newVal) => (methodData.payment_amount = newVal)"
        required
      />
    </div>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4"> Касса </span>
    </div>
    <menu-btn class="h-11">
      <template #btn>
        <m-btn-outlined
          class="border-grey flex items-center gap-2 w-full"
          @click="getCashboxes"
        >
          <fa-icon hash="&#xf078" />
          {{
            methodData.cash_box_id
              ? getSelectedName("cashbox", methodData.cash_box_id)
              : "Выбрать"
          }}
        </m-btn-outlined>
      </template>
      <template #content>
        <div class="overflow-auto h-32">
          <FilterItems
            :data="cashBoxes"
            :singleSelect="true"
            :selectedItems="methodData.cash_box_id"
            @onSingleItemSelect="methodData.cash_box_id = $event"
          />
        </div>
      </template>
    </menu-btn>
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4"> Комментарии </span>
    </div>
    <div class="flex-row mb-10">
      <textarea
        class="rounded-lg border h-[100px] p-2 w-full"
        placeholder="Введите"
        :value="methodData.description"
        @input="($event) => (methodData.description = $event.target.value)"
      ></textarea>
    </div>
    <div
      class="flex flex-row mt-2 items-center absolute bottom-[10px] bg-white justify-between w-full gap-2"
    >
      <m-btn @click="onSave" class="w-9/10 mt-2"> Добавить </m-btn>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";

// store
const clientDebtsStore = useClientsDebtsStore("main");

// props
const props = defineProps({
  clientId: String,
  priceType: Object,
});

// emits
const emit = defineEmits(['closeDialog'])

// state
const clientsAgents = ref(null);
const agents = ref(null);
const cashBoxes = ref({
  items: [],
});
const methodData = ref({
  client_id: props.clientId,
  agent_id: null,
  payment_courier_id: null,
  payment_received_date: moment().format("YYYY-MM-DDTHH:MM"),
  currency_id: props.priceType.id,
  cash_box_id: null,
  payment_amount: "",
  description: "",
});

// Methods
onMounted(async () => {
  await getAllAgents();
  await getAgentsOfClient();
});

const getAgentsOfClient = async () => {
  clientsAgents.value = await clientDebtsStore.getEmployedAgents([
    props.clientId,
  ]);
};

const getAllAgents = async () => {
  agents.value = await clientDebtsStore.getAgents({
    page: 1,
    page_size: 1000,
    order_by: {},
  });
};

const getCashboxes = async () => {
  if (!cashBoxes.value.items.length) {
    cashBoxes.value.items = await clientDebtsStore.getCashboxes();
  }
};

const filteredAgents = computed(() => {
  if (agents.value && clientsAgents.value) {
    const clientAgentsIds = [];
    for (let clientAgent of clientsAgents.value[0]?.employees) {
      clientAgentsIds.push(clientAgent.employee_id);
    }
    const arr = {
      ...agents.value,
      items: agents.value.items?.filter((agent) =>
        clientAgentsIds.includes(agent.id)
      ),
    };
    methodData.value.agent_id = arr.items[0].id;

    return arr;
  }
  return null;
});

const getSelectedName = (state, selectedId) => {
  if (state === "cashbox" && cashBoxes.value) {
    return cashBoxes.value.items?.find((cashBox) => cashBox.id === selectedId)
      ?.name;
  }
  if (state === "agent" && agents.value) {
    const selectedAgent = agents.value.items?.find(
      (agent) => agent.id === selectedId
    );
    return (
      selectedAgent?.first_name ||
      selectedAgent?.last_name ||
      selectedAgent?.middle_name
    );
  }
  return "";
};

const onSave = async () => {
  await clientDebtsStore.createPayment(methodData.value);
  emit('closeDialog')
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
</style>
