<template>
  <div class="w-full">
    <div class="mt-[-20px]">
      <page-title
        :title="`${props.orderId ? 'Изменить' : 'Добавить'} возврат тары`"
      />
    </div>
    <div>
      <span class="text-gray-3 fs-12 fw-4">Имя клиента</span>
      <div v-if="clientsEmployees?.length">
        <page-title :title="clientsEmployees[0]?.client_name" />
      </div>
    </div>
    <flex-col class="mt-6 gap-6">
      <flex-col class="gap-2.5">
        <div>Агент <span class="text-red-3 fs-14">*</span></div>
        <menu-btn class="h-11 w-full">
          <template #btn>
            <m-btn-outlined
              class="border-grey flex items-center w-full justify-between"
            >
              <div class="flex items-center gap-2">
                <fa-icon hash="&#xf078" />
                {{
                  data.agent_id
                    ? getSelectedName("agent", data.agent_id)
                    : "Выбрать"
                }}
              </div>
            </m-btn-outlined>
          </template>
          <template #content>
            <div class="overflow-auto">
              <FilterItems
                singleSelect
                :data="getEmployedAgentsByClientId"
                :selectedItems="data.agent_id"
                @onSingleItemSelect="data.agent_id = $event"
              />
            </div>
          </template>
        </menu-btn>
      </flex-col>
      <flex-col class="gap-2.5">
        <div>Тип <span class="text-red-3 fs-14">*</span></div>
        <menu-btn class="h-11 w-full">
          <template #btn>
            <m-btn-outlined
              class="border-grey flex items-center w-full justify-between"
              @click="onOpenDropdown($event, 'types')"
            >
              <div class="flex items-center gap-2">
                <fa-icon hash="&#xf078" />
                {{
                  data.type ? getSelectedName("types", data.type) : "Выбрать"
                }}
              </div>
            </m-btn-outlined>
          </template>
          <template #content>
            <div class="overflow-auto">
              <FilterItems
                singleSelect
                :data="refundTaraTypes"
                :selectedItems="data.type"
                @onSingleItemSelect="data.type = $event"
              />
            </div>
          </template>
        </menu-btn>
      </flex-col>
      <flex-col class="gap-2 5">
        <div>Дата заказа <span class="text-red-3 fs-14">*</span></div>
        <DInputDatePicker
          :value="data.order_date"
          @change="(newVal) => (data.order_date = newVal)"
        />
      </flex-col>
      <div v-if="taras" class="border rounded-lg">
        <div class="flex justify-between p-3 border-b border-gray-40">
          <div class="flex gap-5 mt-1">
            <span class="fs-12 text-gray-2">№</span>
            <span class="fs-12 text-gray-2">Ассортимент</span>
          </div>
          <div><span class="fs-12 text-gray-2">Количество</span></div>
        </div>
        <div
          v-for="(tara, index) in taras?.items"
          :key="tara.id"
          class="flex justify-between p-3"
        >
          <div class="flex gap-5 mt-1">
            <span class="fs-12 fw-4 text-black">{{ ++index }}</span>
            <span class="fs-12 fw-4 text-black">{{ tara.name }}</span>
          </div>
          <div>
            <d-input
              type="number"
              class="w-20"
              :value="tara.amount"
              @change="onAddTara(tara.id, $event)"
            />
          </div>
        </div>
      </div>
      <div v-else class="flex items-center justify-center">
        <icon-loading :loading="true" :width="14" :height="14" />
      </div>
      <div class="grid grid-cols-2">
        <div></div>
        <m-btn :disabled="!isSaveAble" @click="save" class="w-full">{{
          props.orderId ? "Сохранить" : "Добавить"
        }}</m-btn>
      </div>
    </flex-col>
  </div>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification";
import moment from "moment";

// store
const orderRefundStore = useOrderReturnContainersStore("main");

// props
const props = defineProps({
  clientId: String,
  orderId: String,
});

// emits
const emit = defineEmits(["closeDialog"]);

// state
const router = useRouter();
const route = useRoute();
const clientsEmployees = ref(null);
const agents = ref(null);
const taras = ref(null);

const refundTaraTypes = ref({
  items: null,
});

const agentParams = ref({
  page: 1,
  page_size: 100,
  search: null,
  type: "",
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

const tarasParams = ref({
  page: 1,
  page_size: 100,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: "is_active",
      value: ["true"],
    },
  ],
});

const data = ref({
  agent_id: "",
  client_id: "",
  items: [],
  order_date: moment().format("YYYY-MM-DDTHH:MM"),
});

// hooks
onMounted(async () => {
  if (!props.clientId) {
    emit("closeDialog");
    notify({ title: "Сначала выберите клиента", type: "error" });
    return;
  } else {
    data.value.client_id = props.clientId;
    [agents.value, clientsEmployees.value] = await Promise.all([
      orderRefundStore.getAgents(agentParams.value),
      orderRefundStore.getAgentByClientId(data.value.client_id),
    ]);
    taras.value = await orderRefundStore.getTara(tarasParams.value);
  }
  if (props.orderId) {
    await getRefundTaraById();
  }
});

const getEmployedAgentsByClientId = computed(() => {
  if (agents.value && clientsEmployees.value) {
    return {
      items: clientsEmployees.value[0]?.employees.map((employee) =>
        agents.value.items?.find((agent) => agent?.id === employee.employee_id)
      ),
    };
  }
  return { items: [] };
});

const isSaveAble = computed(() => {
  return data.value.items.length && data.value.agent_id && data.value.type;
});

// methods
const onOpenDropdown = async (value, state) => {
  if (state === "types" && !refundTaraTypes.value.items) {
    await getRefundTaraTypes();
  }
};

const getRefundTaraTypes = async () => {
  const { TaraRefundType } = await orderRefundStore.getRefundTaraConstants();
  refundTaraTypes.value.items = TaraRefundType;
};

function onAddTara(taraId, amount) {
  const isExists = data.value.items.find((item) => item.tara_id === taraId);

  if (isExists) {
    isExists.amount = amount;
  } else {
    data.value.items.push({
      tara_id: taraId,
      amount,
    });
  }
}

const getSelectedName = (state, selectedId) => {
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
  if (state === "types" && refundTaraTypes.value.items) {
    return refundTaraTypes.value.items?.find(
      (item) => item.id === Number(selectedId)
    )?.name;
  }
  return "";
};

const getRefundTaraById = async () => {
  const _data = await orderRefundStore.getTaraRefundById(props.orderId);
  data.value.agent_id = _data.agent.id;
  // data.value.client_id = _data.client.id
  data.value.order_date = _data.created_date;
  data.value.type = _data?.type;
  data.value.items = getFilteredRefundItems(_data.refund_items);
};

const getFilteredRefundItems = (refundItems) => {
  return refundItems.map((item) => {
    changeTaraItemAmount(item.tara.id, item.amount);
    return { amount: item?.amount, tara_id: item?.tara?.id };
  });
};

const changeTaraItemAmount = (taraId, amount) => {
  const exactTara = taras.value?.items?.find((tara) => tara.id === taraId);
  if (exactTara) {
    exactTara.amount = amount;
  }
};

const save = async (e) => {
  e.preventDefault();
  notify({ title: "Пожалуйста подождите!" });
  if (props.orderId) {
    data.value.id = props.orderId;
  }
  await orderRefundStore.add(data.value);
  if (route.path !== "/orders/return-containers") {
    router.push("/orders/return-containers");
  } else {
    await orderRefundStore.refresh();
    emit("closeDialog");
  }
};
</script>
