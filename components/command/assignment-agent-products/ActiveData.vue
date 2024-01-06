<template>
  <div class="flex mb-4 flex-row gap-4 items-center">
    <div @click="draggable = true">
      <i-btn>
        <IconColsSVG />
      </i-btn>
    </div>
    <SettingsRlpDiscountsTableCheckbox
      :headers="assignmentProductsStore.headers"
    />
    <div>
      <!-- @change="assignmentProductsStore.search" -->
      <search-input class="w-full h-38px" />
    </div>
    <div>
      <excel-btn :size="'340kb'"></excel-btn>
    </div>
  </div>
  <div
    v-click-outside="clickOutside"
    class="rounded-lg bg-white border-grey px-[2px]"
  >
    <div class="w-full overflow-auto">
      <data-table
        :headers="assignmentProductsStore.headers"
        :loading="!assignmentProductsStore.data"
        :withInformationAboveHeader="true"
        @sort="sortData"
        :sorted="sortedData"
      >
        <template #body>
          <template
            v-for="data in assignmentProductsStore.data?.items"
            :key="data.agent_id"
          >
            <c-tr class="border-b-none b-bottom cursor-pointer">
              <c-td v-for="key in assignmentProductsStore.headers" :key="key">
                <div v-if="key.key === 'limit'">
                  <div
                    v-if="
                      !sortWarehouses(data[key.key], data.agent_id).length > 0
                    "
                  >
                    Нет ограничений
                  </div>
                  <div v-else>
                    <div
                      v-for="(warehouse, index) in sortWarehouses(
                        data[key.key],
                        data.agent_id
                      )"
                      :key="index"
                    >
                      <div
                        class="flex gap-2.5 items-center"
                        @click="
                          onOpenLimitDropdown(
                            warehouse.warehouse_id,
                            data.agent_id
                          )
                        "
                      >
                        <IconPlus
                          v-if="
                            openLimitDropdown.warehouse_id !==
                            warehouse.warehouse_id
                          "
                        /><IconMinus v-else />
                        <div class="flex gap-3 items-center">
                          {{ warehouse.name }} ({{
                            warehouse.warehouse_amount
                          }}) шт.
                          <div
                            @click="
                              assignmentProductsStore.deleteDialog =
                                warehouse.id
                            "
                          >
                            <IconTrash />
                          </div>
                        </div>
                      </div>
                      <div
                        v-if="
                          openLimitDropdown.row_id === data.agent_id &&
                          openLimitDropdown.warehouse_id ===
                            warehouse.warehouse_id
                        "
                      >
                        <div
                          v-for="product in warehouse.products"
                          :key="product.amount"
                        >
                          <div class="text-[#8FA0A0]">
                            {{ product.product_name }} ({{
                              product.product_amount
                            }}) шт.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else-if="key.key === 'quantity'">
                  {{ quantities[data.agent_id] }}
                </div>
                <div v-else>
                  {{ data[key.key] }}
                </div>
              </c-td>
              <c-td :key="data.agent_id">
                <c-td-no-edit v-if="!data.limit.length > 0">
                  <div class="flex justify-start">
                    <nuxt-link
                      :to="`/command/assignment-agent-product/${data.agent_id}`"
                    >
                      <button
                        class="bg-[#299B9B] fs-12 w-[180px] py-[9px] text-white px-3 rounded-lg"
                      >
                        Создать ограничения
                      </button>
                    </nuxt-link>
                  </div>
                </c-td-no-edit>
                <div v-else class="flex justify-end">
                  <div
                    :key="data.agent_id"
                    @click="openDropdown(data.agent_id)"
                    class="relative drop td-shadow w-fit p-1 m-0"
                  >
                    <div
                      :key="data.agent_id"
                      class="cursor-pointer flex justify-center w-7.5 py-1.5 m-0"
                    >
                      <svg
                        width="3"
                        height="17"
                        viewBox="0 0 3 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.5 3C2.32842 3 2.99999 2.32843 2.99999 1.5C2.99999 0.671573 2.32842 0 1.5 0C0.671572 0 0 0.671573 0 1.5C0 2.32843 0.671572 3 1.5 3Z"
                          fill="#424F4F"
                        />
                        <path
                          d="M1.5 10C2.32843 10 3 9.32843 3 8.5C3 7.67157 2.32843 7 1.5 7C0.671573 7 0 7.67157 0 8.5C0 9.32843 0.671573 10 1.5 10Z"
                          fill="#424F4F"
                        />
                        <path
                          d="M1.49999 17C2.32841 17 2.99998 16.3284 2.99998 15.5C2.99998 14.6716 2.32841 14 1.49999 14C0.671568 14 0 14.6716 0 15.5C0 16.3284 0.671568 17 1.49999 17Z"
                          fill="#424F4F"
                        />
                      </svg>
                    </div>
                    <div
                      :key="data.agent_id"
                      :class="{
                        'active-down':
                          td.isActive && td.index === data.agent_id,
                      }"
                      class="bg-white bottom-[-23px] down rounded-lg w-[190px] border right-[44px] absolute z-50"
                    >
                      <div class="m-3">
                        <nuxt-link
                          :to="`/command/assignment-agent-product/${data.agent_id}`"
                        >
                          <div class="flex border-b cursor-pointer pb-2">
                            <IconEdit :color="'#000000'" />
                            <div class="fs-12 ml-2 mt-1">Редактировать</div>
                          </div>
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
                </div>
              </c-td>
            </c-tr>
          </template>
        </template>
      </data-table>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14"> Показать по </span>
        <page-size-btn
          :current-size="assignmentProductsStore.params.page_size"
          @setPageSize="assignmentProductsStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="assignmentProductsStore.data?.total_pages"
          :current-page="assignmentProductsStore.data?.page_number"
          @setPage="assignmentProductsStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          :templates="assignmentProductsStore.headers"
          @change="onChangeTableHeaders"
        />
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="assignmentProductsStore.deleteDialog">
      <c-modal
        :dataContainerWidth="'360px'"
        @closeDialog="assignmentProductsStore.closeDeleteDialog"
      >
        <CommandDeleteDialog
          :noDescription="true"
          @onAcceptDeleting="assignmentProductsStore.acceptDeleting = $event"
          @closeDialog="assignmentProductsStore.closeDeleteDialog"
          @onDelete="assignmentProductsStore.deleteAgentLimit"
        />
      </c-modal>
    </div>
  </transition>
</template>

<script setup>
// store
const assignmentProductsStore = useAssignmentProductsStore("main");
// State
const draggable = ref(false);
const quantities = ref({});
const openLimitDropdown = ref({
  row_id: "",
  warehouse_id: "",
});
// Methods
function draggableDialog() {
  draggable.value = false;
}
const clickOutside = () => {
  td.isActive = false;
};
function openDropdown(index) {
  td.isActive = !td.isActive;
  td.index = index;
}
const td = reactive({
  isActive: false,
  index: -1,
});
let sortedData = ref({ key: "", mode: "" });

function sortData(data) {
  sortedData.value = data;
}

// Methods
onMounted(async () => {
  await assignmentProductsStore.getData();
});

const onChangeTableHeaders = (value) => {
  assignmentProductsStore.headers = value;
  draggableDialog();
};

const onOpenLimitDropdown = (warehouseId, agentId) => {
  if (
    openLimitDropdown.value.row_id === agentId &&
    openLimitDropdown.value.warehouse_id === warehouseId
  ) {
    openLimitDropdown.value.row_id = "";
    openLimitDropdown.value.warehouse_id = "";
  } else {
    openLimitDropdown.value.row_id = agentId;
    openLimitDropdown.value.warehouse_id = warehouseId;
  }
};

const sortWarehouses = (array, agentId) => {
  const warehouses = [];

  array.forEach((item) => {
    const warehouseIndex = warehouses.findIndex(
      (warehouse) => warehouse && warehouse.warehouse_id === item.warehouse_id
    );

    if (warehouseIndex !== -1) {
      warehouses[warehouseIndex].warehouse_amount += parseInt(item.amount);
      warehouses[warehouseIndex].products.push({
        product_amount: item.amount,
        product_name: item.product_name,
      });
    } else {
      warehouses.push({
        id: item.id,
        warehouse_id: item.warehouse_id,
        warehouse_amount: item.amount,
        name: item.warehouse_name,
        products: [
          {
            product_amount: item.amount,
            product_name: item.product_name,
          },
        ],
      });
    }
  });
  if (agentId) {
    let warehouseTotalAmount = 0;
    for (let warehouse of warehouses) {
      warehouseTotalAmount += warehouse.warehouse_amount;
    }
    quantities.value[agentId] = warehouseTotalAmount;
  }
  return warehouses;
};
</script>

<style scoped>
.down {
  display: none;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
.active-down {
  display: block;
  background-color: white;
}
.down:after {
  position: absolute;
  content: "";
  right: -11px;
  bottom: 20px;
  top: 20px;
  border-left: 15px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
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
.b-bottom:last-child {
  border-bottom: 1px solid #e1e4e4;
}
.b-top-none {
  border-top: none;
}
</style>
