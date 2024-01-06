<template>
  <div class="h-100vh">
    <button
      @click="$router.go(-1)"
      class="h-[44px] px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border"
    >
      <div class="flex">
        <IconArrowLeft class="mt-[5px] mr-[10px]" />
        Назад
      </div>
    </button>
    <div class="mt-2 text-[24px] font-[600] text-[#424F4F]">
      {{agent?.limit.length > 0 ? 'Изменении' : 'Создание'}} ограничении Агента: {{agent?.agent}}
    </div>
    <div class="grid grid-cols-2 gap-4 mt-4">
      <flex-row class="gap-3 w-1/2 items-center">
        <div class="text-gray-3 fs-14 fw-4 whitespace-nowrap">Склад</div>
        <menu-btn
          class="w-3/4 relative z-47"
          @click="onOpenDropdown('warehouse')"
        >
          <template #btn>
            <m-btn-outlined
              class="border-grey bg-white flex items-center w-full gap-2"
            >
              <fa-icon hash="&#xf078" />
              {{
                selectedWarehousesId
                  ? getSelectedName(selectedWarehousesId, 'warehouse')
                  : "Выбрать"
              }}
            </m-btn-outlined>
          </template>
          <template #content>
            <div class="h-auto overflow-auto">
              <FilterItems
                :data="warehouses"
                :singleSelect="true"
                @onSingleItemSelect="selectedWarehousesId = $event"
                @onLoadElse="onLoadElseWarehouses"
              />
            </div>
          </template>
        </menu-btn>
      </flex-row>

      <flex-row class="gap-3 w-1/2 items-center">
        <div class="text-gray-3 fs-14 fw-4 whitespace-nowrap">Тип</div>
        <menu-btn :disabled="!!agent?.type" class="w-3/4 relative z-47" @click="onOpenDropdown('type')">
          <template #btn>
            <m-btn-outlined
              class="border-grey bg-white flex items-center w-full gap-2"
            >
              <fa-icon hash="&#xf078" />
              {{
                agent?.type ? agent.type
                :
                selectedTypesId
                  ? getSelectedName(selectedTypesId, 'type')
                  : "Выбрать"
              }}
            </m-btn-outlined>
          </template>
          <template #content>
            <div class="h-auto overflow-auto">
              <FilterItems
                :data="types"
                :singleSelect="true"
                @onSingleItemSelect="selectedTypesId = $event"
              />
            </div>
          </template>
        </menu-btn>
      </flex-row>
    </div>
    <div v-if="categories?.items.length" class="mt-4">
      <div
        class="w-3/5 bg-white border rounded-lg grid"
        :class="`grid-cols-${categories?.items.length}`"
      >
        <button
          v-for="(category, index) in categories?.items"
          :key="category.id"
          @click="activeTab = category.id"
          class="py-2 border-r-1"
          :class="[
            category.id === activeTab && 'active',
            index === 0 && 'border-l-r',
            index === categories?.items.length - 1 && 'border-r-r',
          ]"
        >
          {{ category.name }}
        </button>
      </div>
    </div>
    <div class="mt-4">
      <CommandAssignmentAgentProductsChangeAgentLimitations :selectedWarehouseId="selectedWarehousesId" :selectedCategoryId="activeTab" :selectedType="agent?.type ? agent.type : selectedTypesId" :isNew="!agent?.limit.length > 0"/>
    </div>
  </div>
</template>

<script setup>
import { data } from "autoprefixer";
import moment from "moment";

// store
const assignmentProductsStore = useAssignmentProductsStore("main");
const route = useRoute()
// state
const categories = ref();
const warehouses = ref();
const selectedWarehousesId = ref();
const types = ref({
  items: []
});
const selectedTypesId = ref();
const activeTab = ref("");

const categoriesParams = ref({
  page: 1,
  page_size: 10,
  search: "",
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

const warehousesParams = ref({
  page: 1,
  page_size: 10,
  search: "",
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

const getCategories = async () => {
  categories.value = await assignmentProductsStore.getProductCategories(
    categoriesParams.value
  );
};

const getWarehouses = async () => {
  warehouses.value = await assignmentProductsStore.getWarehouses(
    warehousesParams.value
  );
};

const getLimitTypes = async () => {
  types.value.items = await assignmentProductsStore.getLimitTypes()
}

const getSelectedName = (selectedId, state) => {
  if (state === 'warehouse' && warehouses.value) {
    return warehouses.value.items?.find((warehouse) => warehouse.id === selectedId)
      ?.name;
  }
  if (state === 'type' && types.value){
    return types.value.items?.find((type) => type.id === selectedId)
      ?.name;
  } else return;
};

const onOpenDropdown = async (state) => {
  if (state === "warehouse" && !warehouses.value) {
    await getWarehouses();
  }
  if(state === 'type' && !types.value.items.length > 0) {
    await getLimitTypes()
  }
};

const onLoadElseWarehouses = async () => {
  warehousesParams.value.page_size =+ 10
  await getWarehouses()
}

onMounted(async () => {
  await Promise.all([getWarehouses(), getCategories()])
  selectedWarehousesId.value = warehouses.value?.items[0]?.id
  activeTab.value = categories.value?.items[0]?.id;
  if(!assignmentProductsStore.data){
    await assignmentProductsStore.getData()
  }
});

const agent = computed(() => {
  const agentId = route.params.edit
  return assignmentProductsStore.data?.items?.find(agent => agent.agent_id === agentId)
})
</script>

<style scoped>
.h-100vh {
  height: calc(100vh - 70px);
}
label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
[type="checkbox"]:checked + span:before {
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
.border-l-r {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.border-r-r {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.active {
  background-color: #299b9b;
  color: white;
  cursor: pointer;
}
</style>
