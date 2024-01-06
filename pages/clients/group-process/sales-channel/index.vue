<template>
  <div>
    <div v-if="salesChannels && clientsSalesChannels">
      <button
        @click="$router.go(-1)"
        class="h-[44px] px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border"
      >
        <div class="flex">
          <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
          Назад
          <slot></slot>
        </div>
      </button>
      <div class="mt-2 text-[24px] font-[600] text-[#424F4F]">Канал сбыта</div>
      <div class="w-full bg-white rounded-[12px] border mt-4">
        <table
          class="w-full border border-[#E1E4E4] rounded-[12px] bg-white"
        >
          <tr class="border-b border-[#E1E4E4]">
            <th v-for="key in headers" :key="key">
              <div
                v-if="key.key === 'client_name'"
                class="fs-12 p-2 text-[#424F4F]"
              >
                {{ key.name }}
              </div>
              <div class="p-2" v-else-if="key.key === 'is_active'">
                <div class="flex gap-6">
                  <div class="fs-12 text-[#424F4F]">{{ key.name }}</div>
                  <div class="flex gap-2">
                    <div class="check">
                      <label>
                        <input
                          @input="onChangeAllActivity"
                          :checked="isAllActive"
                          type="checkbox"
                        />
                        <span></span>
                      </label>
                    </div>
                    <div class="fs-12 text-[#424F4F] w-[200px]">
                      Отметить для всех
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-2" v-else>
                <div class="flex justify-end items-center gap-2">
                  <div class="fs-12 text-[#424F4F]">{{ key.name }}</div>
                  <div class="flex">
                    <menu-btn class="h-11 w-full">
                      <template #btn>
                        <m-btn-outlined
                          class="border-none flex items-center w-full justify-between"
                        >
                          <div
                            class="flex items-center gap-2 whitespace-nowrap mt-1"
                          >
                            <fa-icon hash="&#xf078" />
                            {{
                              selectedSalesChannelToAllClients
                                ? getSelectedName(
                                    selectedSalesChannelToAllClients
                                  )
                                : "Выбрать для всех одного"
                            }}
                          </div>
                        </m-btn-outlined>
                      </template>
                      <template #content>
                        <div class="overflow-auto font-normal">
                          <FilterItems
                            v-if="salesChannels"
                            :data="salesChannels"
                            :singleSelect="true"
                            :selectedItems="selectedSalesChannelToAllClients"
                            @onSingleItemSelect="
                              onSelectSalesChannelToAllClients($event)
                            "
                          />
                        </div>
                      </template>
                    </menu-btn>
                  </div>
                </div>
              </div>
            </th>
          </tr>
          <tr
            class="border-b border-[#E1E4E4]"
            v-for="data in clientsSalesChannels"
            :key="data"
          >
            <td class="p-2" v-for="key in headers" :key="key">
              <div
                v-if="key.key === 'is_active'"
                class="w-5/9 flex items-center justify-center gap-2"
              >
                <div class="check">
                  <label>
                    <input
                      @input="data[key.key]"
                      :checked="data[key.key]"
                      type="checkbox"
                    />
                    <span></span>
                  </label>
                </div>
                Aктивный 
              </div>
              <div v-else-if="key.key === 'salesChannel'" class="w-full">
                <div
                  v-if="data.sales_channel_id"
                  class="w-full flex justify-end"
                >
                  <menu-btn class="h-11 w-1/2 bg-lotion">
                    <template #btn>
                      <m-btn-outlined
                        class="border-grey flex items-center w-full gap-2"
                      >
                        <fa-icon hash="&#xf078" />

                        {{
                          data.sales_channel_id
                            ? getSelectedName(data.sales_channel_id)
                            : "Выбрать"
                        }}
                      </m-btn-outlined>
                    </template>
                    <template #content>
                      <div class="overflow-auto absoulte z-50">
                        <FilterItems
                          :data="salesChannels"
                          :singleSelect="true"
                          :selectedItems="data.sales_channel_id"
                          @onSingleItemSelect="
                            onSelectSalesChannel(data, $event)
                          "
                        />
                      </div>
                    </template>
                  </menu-btn>
                </div>
                <div v-else class="w-full flex justify-end">
                  <menu-btn class="h-11 w-1/2 bg-lotion">
                    <template #btn>
                      <m-btn-outlined
                        class="border-grey flex items-center w-full gap-2"
                      >
                        <fa-icon hash="&#xf078" />
                        Выбрать

                      </m-btn-outlined>
                    </template>
                    <template #content>
                      <div class="overflow-auto absoulte z-50">
                        <FilterItems
                          :data="salesChannels"
                          :singleSelect="true"
                          @onSingleItemSelect="
                            onSelectSalesChannel(data, $event)
                          "
                        />
                      </div>
                    </template>
                  </menu-btn>
                </div>
              </div>
              <div
                v-else
                class="fs-14 text-[#013636]"
                :style="{ width: key.thWidth }"
              >
                {{ data[key.key] }}
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div @click="save" class="flex justify-end mt-2">
        <m-btn>Сохранить</m-btn>
      </div>
    </div>
    <div v-else>
      <Loading />
    </div>
  </div>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification";

// store
const clientsStore = useClientsStore("main");

// states
const router = useRouter();
const salesChannels = ref(null);
const clientsSalesChannels = ref(null);
const selectedSalesChannelToAllClients = ref(null);
const isAllActive = ref(false);

const headers = ref([
  {
    name: "Название клиента",
    checked: true,
    key: "client_name",
    thWidth: "250px",
    bRadius: "8px",
  },
  {
    name: "Aктивный ",
    checked: true,
    key: "is_active",
    thWidth: "300px",
  },
  {
    name: "Канал сбыта",
    checked: true,
    key: "salesChannel",
    thWidth: "300px",
  },
]);

const salesChannelsParams = ref({
  page: 1,
  page_size: 100,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

// methods
async function save() {
  await clientsStore.saveAttachSalesChannel(clientsSalesChannels.value);
  router.push("/clients/clients");
}

onMounted(async () => {
  if (!clientsStore.clientsIds.length > 0) {
    router.push("/clients/clients");
    notify({ title: "Сначала выберите клиента!", type: "error" });
    return;
  }
  [clientsSalesChannels.value, salesChannels.value] = await Promise.all([
    clientsStore.getClientsSalesChannel(clientsStore.clientsIds),
    clientsStore.getSalesChannels(salesChannelsParams.value),
  ]);
});

const getSelectedName = (salesChannelId) => {
  if (salesChannels.value) {
    const selectedSalesChannel = salesChannels.value.items?.find(
      (salesChannel) => salesChannel.id === salesChannelId
    );
    return selectedSalesChannel?.name;
  }
};

const onSelectSalesChannel = (client, salesChannelId) => {
  client.sales_channel_id = salesChannelId;
};

const onSelectSalesChannelToAllClients = (salesChannelId) => {
  selectedSalesChannelToAllClients.value = salesChannelId;

  clientsSalesChannels.value.forEach((salesChannel) => {
    salesChannel.sales_channel_id = salesChannelId;
  });
};

const onChangeAllActivity = () => {
  isAllActive.value = !isAllActive.value;
  for (const salesChannel of clientsSalesChannels.value)
    salesChannel.is_active = isAllActive.value;
};
</script>

<style scoped>
.check label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
.check label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
.check [type="checkbox"]:checked + span:before {
  content: "\f106";
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all 0.4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299b9b;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
