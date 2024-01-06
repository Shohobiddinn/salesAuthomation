<template>
  <div class="w-full">
    <div class="grid grid-cols-2 gap-4 w-full items-center">
      <flex-col class="gap-2">
        <div class="flex-row">
          <div class="text-gray-3 fs-12 fw-4 mt-3">
            Тип инвентаря <span class="text-red-3">*</span>
          </div>
        </div>
        <menu-btn class="h-11 w-full">
          <template #btn>
            <m-btn-outlined
              @click="onOpenDropdown('inventoryTypes')"
              class="border-grey flex items-center w-full gap-2"
            >
              <fa-icon hash="&#xf078" />
              {{
                methodData.inventory_type_id
                  ? getSelectedName(
                      methodData.inventory_type_id,
                      "inventoryTypes"
                    )
                  : "Выбрать"
              }}
            </m-btn-outlined>
          </template>
          <template #content>
            <div class="overflow-auto">
              <FilterItems
                :data="inventoryTypes"
                :singleSelect="true"
                @onSingleItemSelect="methodData.inventory_type_id = $event"
                @onLoadElse="onLoadElseInventoryTypes"
              />
            </div>
          </template>
        </menu-btn>
      </flex-col>
      <div class="mt-2">
        <label for="name" class="fs-12">Название</label>
        <div class="py-2">
          <d-input
            placeholder="Введите название"
            :id="'name'"
            type="text"
            class="w-full"
            :value="methodData.name"
            @change="(value) => (methodData.name = value)"
          />
        </div>
      </div>
      <div>
        <label for="serial-number" class="fs-12">Серийный номер</label>
        <div class="py-2">
          <d-input
            placeholder="Введите серийный номер"
            :id="'serial-number'"
            type="text"
            class="w-full"
            :value="methodData.serial_number"
            @change="(value) => (methodData.serial_number = value)"
          />
        </div>
      </div>
      <div>
        <label for="inventory-number" class="fs-12">Инвентарный номер</label>
        <div class="py-2">
          <d-input
            placeholder="Введите инвентарный номер"
            :id="'inventory-number'"
            type="text"
            class="w-full"
            :value="methodData.inventory_number"
            @change="(value) => (methodData.inventory_number = value)"
          />
        </div>
      </div>
      <div>
        <div class="fs-12">Дата производства</div>
        <div class="date-picker pt-2">
          <input
            v-model="methodData.manufacture_date"
            class="border-1 p-2 rounded-lg my-input"
            type="date"
          />
        </div>
      </div>
      <div>
        <label for="comment" class="fs-12">Комментарии</label>
        <div class="py-2">
          <d-input
            placeholder="Введите комментарии"
            :id="'comment'"
            type="text"
            class="w-full"
            :value="methodData.commentary"
            @change="(value) => (methodData.commentary = value)"
          />
        </div>
      </div>
    </div>
    <div class="w-full border mt-2"></div>
    <div class="grid grid-cols-2 gap-4 w-full items-center">
      <flex-col class="gap-2">
        <div class="flex-row">
          <div class="text-gray-3 fs-12 fw-4 mt-3">
            Клиент <span class="text-red-3">*</span>
          </div>
        </div>
        <menu-btn class="h-11 w-full">
          <template #btn>
            <div class="flex justify-between">
              <m-btn-outlined
              @click="onOpenDropdown('clients')"
              class="border-grey flex items-center w-full gap-2"
            >
              <fa-icon hash="&#xf078" />
              {{
                methodData.client_id
                  ? getSelectedName(methodData.client_id, "clients")
                  : "Выбрать"
              }}
            </m-btn-outlined>
            <nuxt-link
              v-if="equipmentStore.inventoryId"
              :to="`equipments/withdraw-inventory/${equipmentStore.inventoryId}`"
            >
              <button class="rounded-lg border-1 px-8 py-2 bg-[#FFF7E8] text-orange">
                Изять
              </button>
            </nuxt-link>
            </div>
          </template>
          <template #content>
            <div class="overflow-auto">
              <FilterItems
                :data="clients"
                :singleSelect="true"
                @onSingleItemSelect="methodData.client_id = $event"
                @onLoadElse="onLoadElseClients"
              />
            </div>
          </template>
        </menu-btn>
      </flex-col>
      <div class="mt-2">
        <label for="condition" class="fs-12">Состояние</label>
        <div class="py-2">
          <d-input
            placeholder="Введите состояние"
            :id="'condition'"
            type="text"
            class="w-full"
            :value="methodData.condition"
            @change="(value) => (methodData.condition = value)"
          />
        </div>
      </div>
      <div>
        <div class="fs-12">Дата прикрепление</div>
        <div class="date-picker pt-2">
          <input
            v-model="methodData.attachment_date"
            class="border-1 p-2 rounded-lg my-input"
            type="date"
          />
        </div>
      </div>
    </div>
    <div class="flex gap-3 w-full mt-6">
      <cancel-btn class="w-1/2" @click="onCancel">Отменить</cancel-btn>
      <m-btn
        @click="onSave"
        class="bg-[#299B9B] w-1/2 h-[44px] rounded-lg text-white"
        >Добавить</m-btn
      >
    </div>
  </div>
</template>

<script setup>
import moment from "moment";

// Store
const equipmentStore = useClientsEquipmentStore("main");

// emits
const emit = defineEmits(["closeDialog"]);

// states
const inventoryTypes = ref(null);
const clients = ref(null);

const methodData = ref({
  inventory_type_id: "",
  client_id: "",
  name: "",
  serial_number: "",
  inventory_number: "",
  manufacture_date: moment().format("YYYY-MM-DD"),
  commentary: "",
  condition: "",
  attachment_date: moment().format("YYYY-MM-DD"),
});

const inventoryTypesParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

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

// methods
onMounted(async () => {
  if (equipmentStore.inventoryId) {
    const [inventoryData, _, __] = await Promise.all([
      equipmentStore.getClientDeviceById(equipmentStore.inventoryId),
      getInventoryTypes(),
      getClients()
    ]);
    methodData.value = inventoryData;
  }
});

const onSave = async () => {
  await equipmentStore.add(methodData.value);
  emit("closeDialog");
};

const onCancel = () => {
  emit("closeDialog");
};

const onOpenDropdown = async (state) => {
  if (state === "clients" && !clients.value) {
    await getClients();
    return;
  }
  if (state === "inventoryTypes" && !inventoryTypes.value) {
    await getInventoryTypes();
    return;
  }
  return;
};

const search = async (value, state) => {
  if (state === "inventoryTypes") {
    inventoryTypesParams.value.search = value;
    await getInventoryTypes();
    return;
  }
  if (state === "clients") {
    clientsParams.value.search = value;
    await getClients();
    return;
  }
  return
};

const getInventoryTypes = async () => {
  inventoryTypes.value = await equipmentStore.getInventoryTypes(
    inventoryTypesParams.value
  );
};

const onLoadElseInventoryTypes = async () => {
  inventoryTypesParams.value.page_size += 10;
  await getInventoryTypes();
};

const getClients = async () => {
  clients.value = await equipmentStore.getClients(clientsParams.value);
};

const onLoadElseClients = async () => {
  clientsParams.value.page_size += 10;
  await getClients();
};

const getSelectedName = (selectedId, state) => {
  if (state === "inventoryTypes" && inventoryTypes.value) {
    return inventoryTypes.value.items?.find(
      (inventoryType) => inventoryType.id === selectedId
    )?.name;
  }
  if (state === "clients" && clients.value) {
    return clients.value.items?.find((client) => client.id === selectedId)
      ?.name;
  } else return;
};
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
