<template>
  <div>
    <button
      @click="$router.push('/clients/combining-clients')"
      class="h-[44px] px-[46px] mt-8 bg-[#FFFFFF] text-black rounded-lg border"
    >
      <div class="flex">
        <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
        Назад
        <slot></slot>
      </div>
    </button>
    <div class="mt-6">
      <rounded-white-container>
        <div><page-title :title="'Рассылка смс'" /></div>
        <div class="flex w-full mt-4">
          <div class="w-[45%]">
            <div class="text-[20px] fw-5 mt-3">Заполните форму</div>
          </div>
          <div class="w-[55%] mt-1 flex flex-col gap-6">
            <div>
              <div class="fs-14 pb-2">Территория</div>
              <menu-btn class="w-full" @click="onOpenDropdown('territory')">
                <template #btn>
                  <m-btn-outlined
                    class="border-grey flex items-center w-full gap-2"
                  >
                    <fa-icon hash="&#xf078" />
                    Выбрать
                  </m-btn-outlined>
                </template>
                <template #content>
                  <flex-col class="gap-2 max-h-88 overflow-auto pr-2">
                    <search-input @change="search($event, 'territory')" />
                    <FilterItems
                      :data="territories"
                      :selectedItems="selectedTerritories"
                      @onSelectItems="selectedTerritories = $event"
                      @onLoadElse="onLoadElseTerritories"
                    />
                  </flex-col>
                </template>
              </menu-btn>
            </div>
            <div>
              <div class="fs-14 pb-2 pt-2">Категогия клиента</div>
              <menu-btn
                class="w-full"
                @click="onOpenDropdown('client-category')"
              >
                <template #btn>
                  <m-btn-outlined
                    class="border-grey flex items-center w-full gap-2"
                  >
                    <fa-icon hash="&#xf078" />
                    Выбрать
                  </m-btn-outlined>
                </template>
                <template #content>
                  <flex-col class="gap-2 max-h-88 overflow-auto pr-2">
                    <search-input @change="search($event, 'client-category')" />
                    <FilterItems
                      :data="clientCategories"
                      :selectedItems="slectedClientCategories"
                      @onSelectItems="slectedClientCategories = $event"
                      @onLoadElse="onLoadElseClientCategories"
                    />
                  </flex-col>
                </template>
              </menu-btn>
            </div>
            <div>
              <div class="fs-14 pb-2 pt-2">
                Клиенты <span class="text-red-3">*</span>
              </div>
              <menu-btn class="w-full" @click="onOpenDropdown('clients')">
                <template #btn>
                  <m-btn-outlined
                    class="border-grey flex items-center w-full gap-2"
                  >
                    <fa-icon hash="&#xf078" />
                    Выбрать
                  </m-btn-outlined>
                </template>
                <template #content>
                  <flex-col class="gap-2 max-h-88 overflow-auto pr-2">
                    <search-input @change="search($event, 'clients')" />
                    <FilterItems
                      :data="clients"
                      :selectedItems="selectedClients"
                      @onSelectItems="selectedClients = $event"
                      @onLoadElse="onLoadElseClients"
                    />
                  </flex-col>
                </template>
              </menu-btn>
              <div class="fs-14 pb-2 pt-2">
                Выбрано: {{ selectedClients?.length }}
              </div>
            </div>
            <div class="mt-2">
              <div class="fs-14">Ваш смс <span class="text-red-3">*</span></div>
              <div class="mt-1">
                <textarea
                  v-model="smsContent"
                  class="p-3 w-full h-[150px] border rounded-lg"
                  placeholder="Введите ваш смс"
                ></textarea>
              </div>
            </div>
            <div class="mt-4 flex justify-end">
              <nuxt-link to="/clients/sending-sms/send-sms">
                <m-btn :disabled="!selectedClients.length > 0 || !smsContent" class="bg-[#299B9B] rounded-lg py-2 px-12 text-white"
                >Подготовить</m-btn
              >
              </nuxt-link>
            </div>
          </div>
        </div>
      </rounded-white-container>
    </div>
  </div>
</template>

<script setup>
// store
const sendSmsStore = useSendSmsStore("main");

// states
const territories = ref(null);
const clientCategories = ref(null);
const clients = ref(null);
const selectedTerritories = ref([]);
const slectedClientCategories = ref([]);
const selectedClients = ref([]);
const smsContent = ref('')

const clientsParams = ref({
  page: 1,
  page_size: 10,
  search: "",
  agent: [],
  territory: [],
  client_category: [],
  price_type: [],
  day: [],
  expeditor: [],
  device: [],
});

const clientCategoryParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

const territoryParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

// methods
watchEffect(async () => {
  if (slectedClientCategories.value.length) {
    clientsParams.value.client_category = slectedClientCategories.value;
    await getClients();
  }
});
const getTerritories = async () => {
  territories.value = await sendSmsStore.getTerritories(territoryParams.value);
};

const onLoadElseTerritories = async () => {
  territoryParams.value.page_size += 10;
  await getTerritories();
};

const getClientCategories = async () => {
  clientCategories.value = await sendSmsStore.getClientCategories(
    clientCategoryParams.value
  );
};

const onLoadElseClientCategories = async () => {
  clientCategoryParams.value.page_size += 10;
  await getClientCategories();
};

const getClients = async () => {
  clients.value = await sendSmsStore.getClients(clientsParams.value);
};

const onLoadElseClients = async () => {
  clientsParams.value.page_size += 10;
  await getClients();
};

const onOpenDropdown = async (state) => {
  if (state === "territory" && !territories.value) {
    await getTerritories();
  }
  if (state === "client-category" && !clientCategories.value) {
    await getClientCategories();
  }
  if (state === "clients" && !clients.value) {
    await getClients();
  }
};

const search = async (value, state) => {
  if (state === "clients") {
    clientsParams.value.search = value;
    await getClients();
    return;
  }
  if (state === "territory") {
    territoryParams.value.search = value;
    await getTerritories();
    return;
  }
  if (state === "client-category") {
    clientCategoryParams.value.search = value;
    await getClientCategories();
    return;
  }
  return;
};
</script>

<style scoped></style>
