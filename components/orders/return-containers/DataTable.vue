<template>
  <div class="rounded-lg bg-white border-grey px-[2px]">
    <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter :templates="refundTarasStore.templates"></table-filter>
      <div>
        <search-input class="w-full h-38px" @change="refundTarasStore.search" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="table-containers min-h-[200px] overflow-y-auto">
      <data-table
        :headers="refundTarasStore.templates"
        :check="isAllTableChecked"
        @getAllId="getAllOrdersId()"
        :loading="refundTarasStore.isLoading"
        :isEmpty="!refundTarasStore.data?.items.length"
        class="h-full"
        v-click-outside="clickOutside"
      >
        <template #body>
          <c-tr v-for="data in refundTarasStore.data?.items" :key="data.id">
            <c-td
              :custom-padding="true"
              v-for="key in refundTarasStore.templates"
              :key="key"
              class="px-2"
            >
              <div v-if="key.key === 'checkbox'" class="pt-2 check">
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
                v-else-if="
                  key.key === 'created_date' ||
                  key.key === 'received_date' ||
                  key.key === 'last_modified_date'
                "
              >
                {{ getFormattedDate(data[key.key]) }}
              </div>
              <div
                v-else
                :class="
                  key.key === 'status_name' &&
                  'bg-[#057CD133] rounded-2xl text-bluer px-2.5 py-1.5 cursor-pointer flex justify-center items-center'
                "
                @click="
                  key.key === 'status_name' && onOpenStatusDropDown(data.id)
                "
              >
                {{ data[key.key] }}
              </div>
              <div class="relative">
                <div
                  v-if="
                    isStatusDropDownOpen === data.id &&
                    key.key === 'status_name'
                  "
                  class="bg-white w-23 rounded-lg absolute flex flex-col gap-3 items-center p-3 shadow-xl"
                >
                  <div
                    v-if="data[key.key] !== 'Отменен'"
                    class="cursor-pointer"
                    @click="onSetCanceledStatus(data.id)"
                  >
                    Отменен
                  </div>
                  <div
                    v-if="
                      data[key.key] !== 'Получен' && data[key.key] !== 'Отменен'
                    "
                    class="cursor-pointer"
                    @click="onSetReceivedStatus(data.id)"
                  >
                    Получен
                  </div>
                  <div
                    v-if="data[key.key] === 'Отменен'"
                    class="cursor-pointer"
                    @click="onSetRestoreOrder(data.id)"
                  >
                    Восстановить
                  </div>
                </div>
              </div>
            </c-td>
            <c-td>
              <button
                class="td-shadow p-2"
                @click="onOpenTaraDialog(data?.client_id, data?.id)"
              >
                <IconEdit />
              </button>
            </c-td>
          </c-tr>
        </template>
      </data-table>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14"> Показать по </span>
        <page-size-btn
          :current-size="refundTarasStore.params.page_size"
          @setPageSize="refundTarasStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="refundTarasStore.data?.total_pages"
          :current-page="refundTarasStore.data?.page_number"
          @setPage="refundTarasStore.setPage"
        />
      </div>
    </div>
  </div>

  <dm-btn class="mt-6" @click="onChangeMultipleStatuses"
    >Изменить статус</dm-btn
  >
  <flex-col v-show="isMultipleStatusBoxOpen" class="bg-white w-42 rounded-lg">
    <div class="flex items-center gap-2 p-2">
      <IconCheck class="w-10" color="green" />
      <div class="cursor-pointer" @click="onSetReceivedMultiStatus">Получен</div>
    </div>
    <div class="flex items-center gap-2 p-2">
      <IconX class="w-10" />
      <div class="cursor-pointer" @click="onSetCanceledMultiStatus">Отменен</div>
    </div>
    <div class="flex items-center gap-2 p-2">
      <IconRe class="w-10" />
      <div class="cursor-pointer" @click="onSetRestoreMultiStatus">Восстановить</div>
    </div>
  </flex-col>

  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          :templates="refundTarasStore.templates"
          @change="onChangeHeaders"
        />
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="refundTaraDialogClientId">
      <h-no-modal @closeDialog="onCloseTaraDialog">
        <OrdersReturnContainersDialog
          :clientId="refundTaraDialogClientId"
          @closeDialog="onCloseTaraDialog"
          :orderId="orderId"
        />
      </h-no-modal>
    </div>
  </transition>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification";
import moment from "moment";

// store
const refundTarasStore = useOrderReturnContainersStore("main");

// State
const draggable = ref(false);
const refundTaraDialogClientId = ref("");
const orderId = ref("");
const isAllTableChecked = ref(false);
const isStatusDropDownOpen = ref("");
const isMultipleStatusBoxOpen = ref(false);

// Methods
onMounted(async () => {
  await refundTarasStore.getData();
});

const onSetCanceledStatus = async (_orderId) => {
  await refundTarasStore.setCanceledStatus(_orderId);
  await refundTarasStore.refresh();
  isStatusDropDownOpen.value = "";
};

const onSetCanceledMultiStatus = async (_orderId) => {
  await Promise.all(
    refundTarasStore.ordersIds.map(
      async (orderId) => await refundTarasStore.setCanceledStatus(orderId)
    )
  );
  await refundTarasStore.refresh();
  isMultipleStatusBoxOpen.value = false;
};

const onSetReceivedStatus = async (_orderId) => {
  await refundTarasStore.setRecievedStatus(_orderId);
  await refundTarasStore.refresh();
  isStatusDropDownOpen.value = "";
};

const onSetReceivedMultiStatus = async (_orderId) => {
  await Promise.all(
    refundTarasStore.ordersIds.map(
      async (orderId) => await refundTarasStore.setRecievedStatus(orderId)
    )
  );
  await refundTarasStore.refresh();
  isMultipleStatusBoxOpen.value = false;
};

const onSetRestoreOrder = async (_orderId) => {
  await refundTarasStore.onRestoreOrder(_orderId);
  await refundTarasStore.refresh();
  isStatusDropDownOpen.value = "";
};

const onSetRestoreMultiStatus = async (_orderId) => {
  await Promise.all(
    refundTarasStore.ordersIds.map(
      async (orderId) => await refundTarasStore.onRestoreOrder(orderId)
    )
  );
  await refundTarasStore.refresh();
  isMultipleStatusBoxOpen.value = false;
};

const onChangeMultipleStatuses = async () => {
  if (!refundTarasStore.ordersIds.length) {
    notify({ title: "Сначала выберите заказов!", type: "error" });
    isMultipleStatusBoxOpen.value = false;
    return;
  } else {
    isMultipleStatusBoxOpen.value = !isMultipleStatusBoxOpen.value;
  }
};

const getAllOrdersId = () => {
  isAllTableChecked.value = !isAllTableChecked.value;
  if (isAllTableChecked.value) {
    refundTarasStore.ordersIds = refundTarasStore.data?.items.map(
      (order) => order.id
    );
  } else {
    refundTarasStore.setNullOrdersIds();
  }
};

const isTableChecked = (orderId) => {
  return refundTarasStore.ordersIds.find((id) => orderId === id);
};

const onSelectOrder = (orderId) => {
  if (!isTableChecked(orderId)) {
    refundTarasStore.ordersIds.push(orderId);
  } else {
    refundTarasStore.ordersIds = refundTarasStore.ordersIds.filter(
      (id) => id !== orderId
    );
  }
};

function draggableDialog() {
  draggable.value = false;
}

const onChangeHeaders = (newVal) => {
  refundTarasStore.templates = newVal;
  draggable.value = false;
};

const getFormattedDate = (date) => {
  return date && moment(date).format("YYYY-MM-DD");
};

const onOpenTaraDialog = (clientId, _orderId) => {
  refundTaraDialogClientId.value = clientId;
  orderId.value = _orderId;
};

const onCloseTaraDialog = () => {
  refundTaraDialogClientId.value = "";
  orderId.value = "";
};

const onOpenStatusDropDown = (orderId) => {
  isStatusDropDownOpen.value === orderId
    ? (isStatusDropDownOpen.value = "")
    : (isStatusDropDownOpen.value = orderId);
};

const clickOutside = () => {
  isStatusDropDownOpen.value = "";
};
</script>

<style scoped>
.check label input {
  display: none;
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

.td-shadow {
  cursor: pointer;
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.04);
}
</style>
