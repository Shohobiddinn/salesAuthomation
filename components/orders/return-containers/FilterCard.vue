<template>
  <rounded-white-container class="gap-4">
    <flex-row class="items-center justify-between gap-4">
      <div>
        <span class="text-gray-3 text-[20px] fw-6"> Фильтр </span>
      </div>
      <menu-btn>
        <template #btn>
          <m-btn-outlined
            class="border-primary-gray"
            @click="onOpenDropdown($event, 'dateTypes')"
          >
            <fa-icon hash="&#xf078" />
            {{
              selectedDateType
                ? getSelectedItemName("dateTypes", selectedDateType)
                : "Выбрать"
            }}
          </m-btn-outlined>
        </template>
        <template #content>
          <FilterItems
            singleSelect
            :data="dateTypes"
            :selectedItems="selectedDateType"
            @onSingleItemSelect="selectedDateType = $event"
          />
        </template>
      </menu-btn>
    </flex-row>
    <div class="grid grid-cols-4 gap-3" v-for="s in filterStates" :key="s">
      <div v-for="cols in s" :key="cols.key">
        <i-title>{{ cols.name }}</i-title>
        <menu-btn
          v-if="cols.key !== 'btn'"
          class="w-full"
          @click="onOpenDropdown($event, cols.key)"
        >
          <template #btn>
            <m-btn-outlined
              class="border-grey flex items-center bg-lotion w-full gap-2 h-11"
            >
              <div class="w-full flex items-center justify-between">
                <div class="flex gap-2">
                  <fa-icon hash="&#xf078;" />
                  Выбрать
                </div>
                <div
                  v-if="cols.data?.total_count || cols.data?.items?.length"
                  class="ml-1"
                >
                  {{ cols.getSelectedData?.length }} из
                  {{ cols.data.total_count || cols.data?.items.length }}
                </div>
              </div>
            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col class="gap-2 max-h-88 min-w-56 overflow-auto pr-2">
              <search-input
                v-if="cols.key === 'agents'"
                @change="search($event, cols.key)"
              />
              <FilterItems
                :data="cols?.data"
                :selectedItems="cols.getSelectedData"
                @onSelectItems="cols.setSelectedData = $event"
                @onLoadElse="cols?.onLoadElse"
              />
            </flex-col>
          </template>
        </menu-btn>
        <flex-row v-if="cols.key === 'btn'" class="items-end gap-2">
          <m-btn @click="onApplyfilters" class="w-full h-11 mt-4">
            Применить
          </m-btn>
          <sm-btn class="px-4 py-3">
            <IconReloadSVG />
          </sm-btn>
        </flex-row>
      </div>
    </div>
  </rounded-white-container>
</template>

<script setup>
const orderRefundStore = useOrderReturnContainersStore("main");

// states
const refundTaraConstants = ref(null);
const agents = ref(null);
const selectedAgents = ref([]);
const selectedDateType = ref(1);
const selectedStatuses = ref([]);
const selectedRefundTaraTypes = ref([]);

const agentsParams = ref({
  page: 1,
  page_size: 10,
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

const filterStates = ref({
  firstRow: [
    {
      name: "Агент",
      key: "agents",
      get data() {
        return agents.value || [];
      },
      get getSelectedData() {
        return selectedAgents.value;
      },
      set setSelectedData(value) {
        selectedAgents.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseAgents();
      },
    },
    {
      name: "Типы",
      key: "refundTaraTypes",
      get data() {
        return refundTaraTypes.value || [];
      },
      get getSelectedData() {
        return selectedRefundTaraTypes.value;
      },
      set setSelectedData(value) {
        selectedRefundTaraTypes.value = value;
      },
    },
    {
      name: "Статус",
      key: "statuses",
      get data() {
        return statuses.value || [];
      },
      get getSelectedData() {
        return selectedStatuses.value;
      },
      set setSelectedData(value) {
        selectedStatuses.value = value;
      },
    },
    {
      key: "btn",
    },
  ],
});

// hooks
onMounted(async () => await getRefundTaraConstants()) // Called to show first item of refundTaraTypes

const statuses = computed(() => {
  if (refundTaraConstants.value) {
    return { items: refundTaraConstants.value?.TaraRefundStatus };
  }
  return {};
});

const refundTaraTypes = computed(() => {
  if (refundTaraConstants.value) {
    return { items: refundTaraConstants.value?.TaraRefundType };
  }
  return {};
});

const dateTypes = computed(() => {
  if (refundTaraConstants.value) {
    return { items: refundTaraConstants.value?.TaraRefundDateFilterType };
  }
  return {};
});

// methods
const onOpenDropdown = async (value, state) => {
  if (state === "agents" && !agents.value) {
    await getAgents();
    return;
  }
  if (state === "refundTaraTypes" && !refundTaraConstants.value) {
    await getRefundTaraConstants();
    return;
  }
  if (state === "statuses" && !refundTaraConstants.value) {
    await getRefundTaraConstants();
    return;
  }
  if (state === "dateTypes" && !refundTaraConstants.value) {
    await getRefundTaraConstants();
  }
  return;
};

const search = async (value, state) => {
  if (state === "agents") {
    agentsParams.value.search = value;
    await getAgents();
    return;
  }
};

const getSelectedItemName = (state, selectedItemId) => {
  if (state === "dateTypes" && dateTypes.value.items) {
    return dateTypes.value.items.find(
      (type) => type.id === Number(selectedItemId)
    ).name;
  }
};

const getAgents = async () => {
  agents.value = await orderRefundStore.getAgents(agentsParams.value);
};

const onLoadElseAgents = async () => {
  agentsParams.value.page_size += 10;
  await getAgents();
};

const getRefundTaraConstants = async () => {
  refundTaraConstants.value = await orderRefundStore.getRefundTaraConstants();
};

const onApplyfilters = () => {
  orderRefundStore.params.agent_id_arr = selectedAgents.value;
  orderRefundStore.params.status_arr = selectedStatuses.value;
  orderRefundStore.params.date_filter_type = parseInt(selectedDateType.value);
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
