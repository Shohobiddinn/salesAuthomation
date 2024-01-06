<template>
  <div>
    <div v-if="clientsPriceTypes && priceTypes">
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
      <div class="mt-7.5 text-2xl font-semibold text-gray-3">
        Прикрепить тип цены
      </div>
      <div class="w-full bg-white rounded-[12px] border mt-4">
        <table class="w-full border border-[#E1E4E4] rounded-[12px] bg-white">
          <tr class="border-b border-[#E1E4E4]">
            <th v-for="key in headers" :key="key">
              <div
                v-if="key.key === 'client_name'"
                class="fs-12 p-2 text-gray-3"
              >
                {{ key.name }}
              </div>
              <div class="p-2" v-else>
                <div class="w-full flex items-center justify-center">
                  <div class="w-full fs-12 text-gray-3 flex justify-center">
                    {{ key.name }}
                  </div>
                </div>
              </div>
            </th>
          </tr>
          <tr
            class="border-b border-[#E1E4E4]"
            v-for="data in clientsPriceTypes"
            :key="data"
          >
            <td class="p-2" v-for="key in headers" :key="key">
              <div
                v-if="key.key !== 'client_name'"
                class="flex items-center justify-center gap-2"
                :style="{ width: key.thWidth }"
              >
                <div class="check">
                  <label>
                    <input
                      @input="onSelectPriceType(data, key.id)"
                      :checked="isAttached(data, key.id)"
                      type="checkbox"
                    />
                    <span></span>
                  </label>
                </div>
                Прикрепить
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
const priceTypes = ref(null);
const clientsPriceTypes = ref(null);

const headers = computed(() => {
  if (priceTypes.value) {
    return [
      {
        name: "Название клиента",
        checked: true,
        key: "client_name",
        bRadius: "8px",
      },
      ...priceTypes.value?.items,
    ];
  } else return [];
});

const priceTypesParams = ref({
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
  await clientsStore.saveAttachPriceTypes(clientsPriceTypes.value);
  router.push("/clients/clients");
}

onMounted(async () => {
  if (!clientsStore.clientsIds.length > 0) {
    router.push("/clients/clients");
    notify({ title: "Сначала выберите клиента!", type: "error" });
    return;
  }
  [clientsPriceTypes.value, priceTypes.value] = await Promise.all([
    clientsStore.getClientsPriceTypes(clientsStore.clientsIds),
    clientsStore.getPriceTypes(priceTypesParams.value),
  ]);
});

const getSelectedName = (priceTypeId) => {
  if (priceTypes.value) {
    const selectedPricType = priceTypes.value.items?.find(
      (priceType) => priceType.id === priceTypeId
    );
    return selectedPricType?.name;
  }
};

const isAttached = (client, priceTypeId) => {
  const isExist = client.price_types.find(
    (priceType) => priceType === priceTypeId
  );
  return !!isExist;
};

const onSelectPriceType = (client, priceTypeId) => {
  if (isAttached(client, priceTypeId)) {
    client.price_types = client.price_types.filter(
      (priceType) => priceType !== priceTypeId
    );
    return;
  }
  client.price_types.push(priceTypeId);
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
