<template>
  <div class="flex flex-col gap-6 my-8.5">
    <div class="flex justify-between items-center">
      <p-title>Изять инвентарь</p-title>
      <m-btn @click="onSave">Сохранить</m-btn>
    </div>
    <div class="flex gap-5">
      <rounded-white-container class="p-6">
        <flex-col class="gap-4.5">
          <page-title-20 :title="'Инвентарь'" />
        <div class="border-b-1 flex flex-col gap-3">
          <div class="fs-14 text-gray-2">Тип инвентаря</div>
          <div>{{data?.inventory_name}}</div>
        </div>
        <div class="border-b-1 flex flex-col gap-3">
          <div class="fs-14 text-gray-2">Название</div>
          <div>{{data?.name}}</div>
        </div>
        <div class="border-b-1 flex flex-col gap-3">
          <div class="fs-14 text-gray-2">Серийный номер:</div>
          <div>{{data?.serial_number}}</div>
        </div>
        <div class="border-b-1 flex flex-col gap-3">
          <div class="fs-14 text-gray-2">Инвентарный номер:</div>
          <div>{{data?.inventory_number}}</div>
        </div>
        <div class="border-b-1 flex flex-col gap-3">
          <div class="fs-14 text-gray-2">Дата производства</div>
          <div>{{data?.manufacture_date}}</div>
        </div>
        <div class="border-b-1 flex flex-col gap-3">
          <div class="fs-14 text-gray-2">Комментарий</div>
          <div>{{data?.commentary ? data?.commentary : '-'}}</div>
        </div>
        <div class="border-b-1 flex flex-col gap-3">
          <div class="fs-14 text-gray-2">Ориентир</div>
          <div>{{data?.territory}}</div>
        </div>
        <div class="border-b-1 flex flex-col gap-3">
          <div class="fs-14 text-gray-2">Контактное лицо</div>
          <div>{{data?.client_name}}</div>
        </div>
        </flex-col>
      </rounded-white-container>
      <rounded-white-container class="p-6">
        <flex-col class="gap-6">
          <page-title-20 :title="'Изятие и передача'" />
          <div class="text-gray-3 text-lg font-semibold">Изъятие</div>
          <div class="flex justify-between items-center">
            <div class="fs-14 text-gray-2">Изъять от клиента:</div>
            <div class="fs-16 font-medium text-gray-3">{{data?.client_name}}</div>
          </div>
          <flex-col class="gap-3">
            <div class="fs-14 text-gray-3">Дата изъятия:</div>
            <div class="date-picker">
              <input
                disabled
                :value="data?.manufacture_date"
                class="border-1 p-2 rounded-lg my-input"
                type="date"
              />
            </div>
          </flex-col>
          <flex-col class="gap-3">
            <div class="text-gray-3 text-lg font-semibold">Передача</div>
            <div class="fs-14 text-gray-3">Клиент <span class="text-red-3">*</span></div>
            <menu-btn class="h-11 w-full">
              <template #btn>
                <m-btn-outlined
                  @click="onOpenDropdown('clients')"
                  class="border-grey flex items-center w-full gap-2"
                >
                  <fa-icon hash="&#xf078" />
                  {{
                    selectedClient
                      ? getSelectedName(selectedClient, "clients")
                      : "Выбрать"
                  }}
                </m-btn-outlined>
              </template>
              <template #content>
                <div class="overflow-auto">
                  <FilterItems
                    :data="clients"
                    :singleSelect="true"
                    @onSingleItemSelect="selectedClient = $event"
                    @onLoadElse="onLoadElseClients"
                  />
                </div>
              </template>
            </menu-btn>
          </flex-col>
          <flex-col class="gap-3">
            <label for="condition" class="fs-14 text-gray-3">Состояние</label>
            <d-input
              placeholder="Введите состояние"
              :id="'condition'"
              type="text"
              class="w-full"
              :value="condition"
              @change="(value) => (condition = value)"
            />
          </flex-col>
          <flex-col class="gap-3">
            <div class="fs-14 text-gray-3">Дата прикрепления</div>
            <div class="date-picker">
              <input
                v-model="attachment_date"
                class="border-1 p-2 rounded-lg my-input"
                type="date"
              />
            </div>
          </flex-col>
          <flex-col class="gap-3">
            <label for="comment" class="fs-14 text-gray-3">Комментарии</label>
            <textarea
              placeholder="Пишите..."
              id="comment"
              class="my-input fa-solid p-2 border-1 rounded-lg h-24"
              v-model="comment"
            />
          </flex-col>
        </flex-col>
      </rounded-white-container>
    </div>
  </div>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification";
import moment from "moment";
// Store
const equipmentStore = useClientsEquipmentStore("main");

// states
const route = useRoute()
const router = useRouter()
const data = ref(null)
const attachment_date = ref(moment().format("YYYY-MM-DD"));
const manufacture_date = ref(moment().format("YYYY-MM-DD"));
const condition = ref("");
const comment = ref("");
const clients = ref(null);
const selectedClient = ref("");
const inventoryTypes = ref(null)

const clientsParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  agent: [],
  territory: [],
  client_category: [],
  price_type: [],
  day: [],
  expeditor: [],
  device: [],
});

const inventoryTypesParams = ref({
  page: 1,
  page_size: 100,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

// methods
onMounted(async () => {
  data.value = await equipmentStore.getClientDeviceById(route.params.id)
})

const onOpenDropdown = async (state) => {
  if (state === "clients" && !clients.value) {
    await getClients();
    return;
  }
  return;
};

const search = async (value, state) => {
  if (state === "clients") {
    clientsParams.value.search = value;
    await getClients();
    return;
  }
  return;
};

const getClients = async () => {
  clients.value = await equipmentStore.getClients(clientsParams.value);
};

const onLoadElseClients = async () => {
  clientsParams.value.page_size += 10;
  await getClients();
};

const getSelectedName = (selectedId, state) => {
  if (state === "clients" && clients.value) {
    return clients.value.items?.find((client) => client.id === selectedId)
      ?.name;
  } else return;
};

const onSave = async () => {
  if(!selectedClient.value){
    notify({ title: "Сначала выберите клиента!", type: "error", });
    return
  }
  const postData = {
    device_id: data.value?.id,
    client_id: selectedClient.value,
    condition: condition.value,
    attachment_date: attachment_date.value,
    commentary: comment.value
  }

 await equipmentStore.onCancelDevice(postData)
 router.push('/clients/equipments')
}
</script>

<style scoped>
.date-picker input {
  width: 100%;
  padding-left: 45px;
  position: relative;
}
.date-picker input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  color: rgba(0, 0, 0, 0);
  opacity: 1;
  display: block;
  background: url(~/assets/svg/date-pickerscg.svg) no-repeat;
  width: 20px;
  height: 20px;
  left: 10px;
  border-width: thin;
  top: 12px;
}
.date-picker {
  position: relative;
}

.date-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background: url(~/assets/svg/date-pickerscg.svg) no-repeat;
  background-size: cover;
  cursor: pointer;
}
</style>
