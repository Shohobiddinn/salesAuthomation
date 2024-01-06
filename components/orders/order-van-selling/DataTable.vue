<template>
  <div class="rounded-lg bg-white border-grey px-[2px]">
    <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <SettingsRlpDiscountsTableCheckbox
        :headers="vanSellingOrdersStore.headers"
      />
      <div>
        <search-input class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="overflow-auto min-h-[200px]">
      <data-table
        :headers="vanSellingOrdersStore.headers"
        :loading="vanSellingOrdersStore.isLoading"
        :isEmpty="!vanSellingOrdersStore.data?.items.length"
        :check="isAllTableChecked"
        @getAllId="getAllOrdersId()"
      >
        <template #body>
          <template
            v-for="data in vanSellingOrdersStore.data?.items"
            :key="data.id"
          >
            <c-tr class="border-b-none b-bottom cursor-pointer">
              <c-td-no-edit
                v-for="key in vanSellingOrdersStore.headers"
                :key="key"
              >
                <div class="pt-2 ml-[-2px] check" v-if="key.key === 'checkbox'">
                  <label>
                    <input
                      type="checkbox"
                      :id="data.id"
                      :checked="isTableChecked(data.id)"
                      @change="onSelectOrder(data.id)"
                    />
                    <span></span>
                  </label>
                </div>
                <div
                  v-if="
                    key.checked &&
                    (key.key === 'status' ||
                      key.key === 'agent' ||
                      key.key === 'price_type' ||
                      key.key === 'agent_warehouse' ||
                      key.key === 'warehouse' ||
                      key.key === 'created_by')
                  "
                  :class="
                    key.key === 'status' &&
                    'w-fit text-pink-500 bg-pink-100 rounded-large py-1 px-3'
                  "
                >
                  {{ data[key.key]?.name }}
                </div>
                <div v-else-if="key.checked">
                  {{
                    key.key === "order_date" || key.key === "shipped_date"
                      ? getFormattedDate(data[key.key])
                      : data[key.key]
                  }}
                </div>
                <!-- <button
                  v-if="key.checked && data.status === 'Новый заказ'"
                  class="text-blue-700 bg-blue-100 rounded-large py-1 px-2"
                >
                  {{ data[key.key] }}
                </button> -->
              </c-td-no-edit>
            </c-tr>
          </template>
        </template>
      </data-table>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14"> Показать по </span>
        <page-size-btn
          :current-size="vanSellingOrdersStore.params.page_size"
          @setPageSize="vanSellingOrdersStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="vanSellingOrdersStore.data?.total_pages"
          :current-page="vanSellingOrdersStore.data?.page_number"
          @setPage="vanSellingOrdersStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="onChangeTableHeaders"
          :templates="vanSellingOrdersStore.headers"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
import moment from "moment";

// store
const vanSellingOrdersStore = useVanSellingOrdersStore("main");

// State
const draggable = ref(false);
const isAllTableChecked = ref(false);

// methods
function draggableDialog() {
  draggable.value = false;
}

const onChangeTableHeaders = (param) => {
  clientStore.templates = param;
  draggable.value = false;
};

const getFormattedDate = (date) => {
  return date && moment.utc(date).format("YYYY-MM-DD HH:MM");
};

const getAllOrdersId = () => {
  isAllTableChecked.value = !isAllTableChecked.value;
  if (isAllTableChecked.value) {
    vanSellingOrdersStore.ordersIds = vanSellingOrdersStore.data?.items.map(
      (order) => order.id
    );
  } else {
    vanSellingOrdersStore.setNullOrdersIds();
  }
};

const isTableChecked = (orderId) => {
  return vanSellingOrdersStore.ordersIds.find((id) => orderId === id);
};

const onSelectOrder = (orderId) => {
  if (!isTableChecked(orderId)) {
    vanSellingOrdersStore.ordersIds.push(orderId);
  } else {
    vanSellingOrdersStore.ordersIds = vanSellingOrdersStore.ordersIds.filter(
      (id) => id !== orderId
    );
  }
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
.b-bottom:last-child {
  border-bottom: 1px solid #e1e4e4;
}
</style>
