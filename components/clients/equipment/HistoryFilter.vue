<template>
  <div class="rounded-large border p-4 bg-white">
    <div
      class="grid gap-5 grid-cols-5"
      v-for="(s, index) in filterStates"
      :key="index"
    >
      <div
        v-for="cols in s"
        :key="cols.key"
        :class="cols.key === 'btn' && 'flex justify-end items-center'"
      >
        <i-title>
          {{ cols.name }}
        </i-title>

        <menu-btn
          class="w-full"
          v-if="
            cols.key !== 'btn' &&
            cols.key !== 'empty' &&
            cols.key !== 'date-picker'
          "
          @click="onOpenDropdown($event, cols.key)"
        >
          <template #btn>
            <m-btn-outlined class="border-grey flex items-center w-full gap-2">
              <div class="w-full flex items-center justify-between">
                <div class="flex gap-2">
                  <fa-icon hash="&#xf078" />
                  <div>Выбрать</div>
                </div>
                <div v-if="cols.data?.total_count" class="ml-1">
                  {{ cols.getSelectedData?.length }} из
                  {{ cols.data?.total_count }}
                </div>
              </div>
            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col class="gap-2">
              <search-input @change="search($event, cols.key)" />
              <FilterItems
                :data="cols?.data"
                :selectedItems="cols.getSelectedData"
                @onSelectItems="cols.setSelectedData = $event"
                @onLoadElse="cols?.onLoadElse"
              />
            </flex-col>
          </template>
        </menu-btn>
        <div
          v-if="cols.key === 'date-picker'"
          class="w-full"
        >
          <DatePicker
            v-if="cols?.type === 'attachment'"
            :disabled="true"
            @onApply="selectedAttachmentDate = $event"
            class="w-full"
          />
          <DatePicker
            v-if="cols?.type === 'detachment'"
            :disabled="true"
            @onApply="selectedDetachmentDate = $event"
            class="w-full"
          />
        </div>
        <flex-row
          v-if="cols.key === 'btn'"
          class="w-full mt-3 flex items-end gap-2 mt-8"
        >
          <m-btn class="w-9/10" @click="onSetFilters"> Применить </m-btn>
          <sm-btn class="px-2 py-2">
            <IconReloadSVG />
          </sm-btn>
        </flex-row>
      </div>
    </div>
  </div>
</template>

<script setup>
// Store
const equipmentStore = useClientsEquipmentStore("main");

// States
const territories = ref(null);
const selectedTerritories = ref([]);
const inventoryTypes = ref(null);
const selectedInventoryTypes = ref([]);
const selectedAttachmentDate = ref("");
const selectedDetachmentDate = ref("");

const inventoryTypesParams = ref({
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

const filterStates = ref({
  firstRow: [
    {
      name: "Территории",
      key: "territories",
      get data() {
        return territories.value || [];
      },
      get getSelectedData() {
        return selectedTerritories.value;
      },
      set setSelectedData(value) {
        selectedTerritories.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseTerritories();
      },
    },
    {
      name: "Тип оборудования",
      key: "inventoryTypes",
      get data() {
        return inventoryTypes.value || [];
      },
      get getSelectedData() {
        return selectedInventoryTypes.value;
      },
      set setSelectedData(value) {
        selectedInventoryTypes.value = value;
      },
      onLoadElse: async () => {
        await onLoadElseInventoryTypes();
      },
    },
    {
      name: "Дата прикрепления:",
      key: "date-picker",
      type: "attachment",
    },
    {
      name: "Дата открепления:",
      key: "date-picker",
      type: "detachment",
    },
    {
      name: "",
      key: "btn",
    },
  ],
});

// methods
const onOpenDropdown = async (value, state) => {
  if (state === "territories" && !territories.value) {
    await getTerritories();
    return;
  }
  if (state === "inventoryTypes" && !inventoryTypes.value) {
    await getInventoryTypes();
    return;
  }
  return;
};

const search = async (value, state) => {
  if (state === "territories") {
    territories.value.search = value;
    await getTerritories();
    return;
  }
  if (state === "inventoryTypes") {
    inventoryTypesParams.value.search = value;
    await getInventoryTypes();
    return;
  }
};

const getTerritories = async () => {
  territories.value = await equipmentStore.getTerritories(
    territoryParams.value
  );
};

const onLoadElseTerritories = async () => {
  territoryParams.value.page_size += 10;
  await getTerritories();
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

const onSetFilters = () => {
  equipmentStore.historyListParams.territory = [...selectedTerritories.value];
  equipmentStore.historyListParams.type = [...selectedInventoryTypes.value];
  // equipmentStore.historyListParams.date = selectedDate.value;
};
</script>

<style scoped></style>
