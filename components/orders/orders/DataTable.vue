<template>
  <div>
    <div
      v-click-outside="clickOutside"
      class="rounded-lg bg-white border-grey px-[2px]"
    >
      <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
        <div @click="draggable = true">
          <i-btn>
            <IconColsSVG />
          </i-btn>
        </div>
        <SettingsRlpDiscountsTableCheckbox
          :headers="ordersStore.templates"
        ></SettingsRlpDiscountsTableCheckbox>
        <div>
          <search-input
            :value="searchText"
            @updated="searchUpdated"
            class="w-full h-38px"
          />
        </div>
        <div>
          <excel-btn :size="'340kb'"></excel-btn>
        </div>
      </div>
      <div v-click-outside="outside" class="table-containers overflow-y-auto">
        <data-table
          :headers="ordersStore.templates"
          @sort="sortData"
          @getAllId="getAllId"
          :check="orders?.length === ordersId?.length"
          :sorted="sortedData"
        >
          <template #body>
            <template v-for="(data, index) in orders" :key="index">
              <c-tr class="border-b-none b-bottom cursor-pointer">
                <c-td-no-edit v-for="key in ordersStore.templates" :key="key">
                  <div
                    v-if="key.key === 'checkbox'"
                    class="pt-2 ml-[-2px] check"
                  >
                    <label>
                      <input
                        :checked="ordersId.includes(data.id)"
                        @input="getId(data.id, index)"
                        type="checkbox"
                      />
                      <span></span>
                    </label>
                  </div>

                  <div v-else-if="key.key === 'order_date'">
                    <span>
                      {{ moment(data[key.key]).format("YYYY-MM-DD") }}
                    </span>
                  </div>
                  <div v-else-if="key.key === 'shipped_date'">
                    <span>
                      {{
                        data[key.key]
                          ? moment(data[key.key]).format("YYYY-MM-DD")
                          : ""
                      }}
                    </span>
                  </div>
                  <div
                    v-else-if="key.key === 'client'"
                    @click="detail(data.id)"
                  >
                    <span class="border-b border-blue-10 pb-1">{{
                      data[key.key]?.name
                    }}</span>
                  </div>
                  <div v-else-if="key.key === 'expeditor'">
                    {{ data[key.key]?.name }}
                  </div>
                  <div v-else-if="key.key === 'type'">
                    {{ data[key.key]?.name }}
                  </div>
                  <button
                    v-else-if="key.key === 'visual_id'"
                    @click="detail(data.id, data?.type?.id)"
                  >
                    <span class="border-b border-blue-10 pb-1">{{
                      data[key.key]
                    }}</span>
                  </button>
                  <div v-else-if="key.key === 'agent_name'">
                    <span class="border-b border-blue-10 pb-1">{{
                      data[key.key]
                    }}</span>
                  </div>
                  <div v-else-if="key.key === 'status'" class="relative">
                    <menu-btn-for-table
                      v-if="data.status?.id === 1 && data?.type?.id === 1"
                    >
                      <template #btn>
                        <button
                          class="border-color-primary text-bluer rounded-[50px] bg-blue-100"
                        >
                          <div
                            class="flex flex-row items-center gap-2 fs-14 fw-4 px-4 py-1"
                          >
                            {{ data[key.key]?.name }}
                          </div>
                        </button>
                      </template>
                      <template #content>
                        <div class="flex flex-col gap-4">
                          <div class="gap-2">
                            <button
                              v-if="
                                isCancelable(data?.type?.id, data.status?.id)
                              "
                              @click="canceled(data.id)"
                            >
                              Отменен
                            </button>
                            <button
                              v-if="
                                isShippable(data?.type?.id, data.status?.id) &&
                                data.status.name !== 'Новый'
                              "
                              @click="() => dialogStore.edit({ ...data })"
                            >
                              Отгружен
                            </button>
                            <button
                              v-if="
                                isAcceptable(data?.type?.id, data.status?.id) ||
                                data.status.name === 'Новый'
                              "
                            >
                              Принято к отправке
                            </button>
                          </div>
                        </div>
                      </template>
                    </menu-btn-for-table>
                    <menu-btn-for-table
                      v-if="data.status?.id === 1 && data?.type?.id !== 1"
                    >
                      <template #btn>
                        <button
                          class="border-color-primary text-bluer rounded-[50px] bg-blue-100"
                        >
                          <div
                            class="flex flex-row items-center gap-2 fs-14 fw-4 px-4 py-1"
                          >
                            {{ data[key.key]?.name }}
                          </div>
                        </button>
                      </template>
                      <template #content>
                        <div class="flex flex-col gap-4">
                          <div class="gap-2 flex flex-col justify-start">
                            <button
                              v-if="
                                isCancelable(data?.type?.id, data.status?.id)
                              "
                              @click="canceled(data.id)"
                              class="flex justify-start"
                            >
                              Отменен
                            </button>
                            <button
                              v-if="
                                isAcceptable(data?.type?.id, data.status?.id)
                              "
                              @click="() => dialogStoreAc.edit({ ...data })"
                              class="flex justify-start whitespace-nowrap"
                            >
                              Принято к отправке
                            </button>
                          </div>
                        </div>
                      </template>
                    </menu-btn-for-table>
                    <menu-btn-for-table v-if="data.status?.id === 2" class="">
                      <template #btn>
                        <button
                          class="border-color-primary text-bluer rounded-[50px] bg-blue-100"
                        >
                          <div
                            class="flex flex-row items-center gap-2 fs-14 fw-4 px-4 py-1"
                          >
                            {{ data[key.key]?.name }}
                          </div>
                        </button>
                      </template>
                      <template #content>
                        <div class="flex flex-col gap-4">
                          <div class="gap-2">
                            <button
                              v-if="data.status?.id === 2"
                              @click="restore(data.id)"
                              class=""
                            >
                              Восстановить
                            </button>
                          </div>
                        </div>
                      </template>
                    </menu-btn-for-table>
                    <menu-btn-for-table v-if="data.status?.id === 3" class="">
                      <template #btn>
                        <button
                          class="border-color-primary text-bluer rounded-[50px] bg-blue-100"
                        >
                          <div
                            class="flex flex-row items-center gap-2 fs-14 fw-4 px-4 py-1"
                          >
                            {{ data[key.key]?.name }}
                          </div>
                        </button>
                      </template>
                      <template #content>
                        <div class="flex flex-col gap-4">
                          <div class="gap-2">
                            <button
                              v-if="
                                isCancelable(data?.type?.id, data.status?.id)
                              "
                              @click="canceled(data.id)"
                            >
                              Отменен
                            </button>
                            <button
                              v-if="
                                isShippable(data?.type?.id, data.status?.id) &&
                                data.status.name !== 'Новый'
                              "
                              @click="() => dialogStore.edit({ ...data })"
                            >
                              Отгружен
                            </button>
                            <button
                              v-if="
                                isAcceptable(data?.type?.id, data.status?.id) ||
                                data.status.name === 'Новый'
                              "
                            >
                              Принято к отправке
                            </button>
                          </div>
                        </div>
                      </template>
                    </menu-btn-for-table>
                    <menu-btn-for-table v-if="data.status?.id === 4">
                      <template #btn>
                        <button
                          class="border-color-primary text-bluer rounded-[50px] bg-blue-100"
                        >
                          <div
                            class="flex flex-row items-center gap-2 fs-14 fw-4 px-4 py-1"
                          >
                            {{ data[key.key]?.name }}
                          </div>
                        </button>
                      </template>
                      <template #content>
                        <div class="flex flex-col gap-4">
                          <div class="gap-2">
                            <button
                              v-if="
                                isCancelable(data?.type?.id, data.status?.id)
                              "
                              @click="canceled(data.id)"
                            >
                              Отменен
                            </button>
                            <button
                              v-if="data.status?.id === 4"
                              @click="() => dialogStoreDe.edit({ ...data })"
                            >
                              Доставлен
                            </button>
                          </div>
                        </div>
                      </template>
                    </menu-btn-for-table>
                    <div v-if="data.status?.id === 5">
                      <button class="bg-blue-100 rounded-[40px] p-1 px-2">
                        <span class="text-bluer my-4">{{
                          data[key.key]?.name
                        }}</span>
                      </button>
                    </div>
                  </div>
                  <div v-else>
                    {{ data[key.key] }}
                  </div>
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
            :current-size="filters.pageSize"
            @setPageSize="setPageSizes"
          />
        </div>
        <div class="p-3">
          <page-index
            :available-pages="ordersStore.data?.total_pages"
            :current-page="ordersStore.data?.page_number"
            @setPage="setPage"
          />
        </div>
      </div>
    </div>
    <transition name="modal">
      <div v-if="draggable">
        <d-modal
          @closeDialog="draggableDialog"
          :name="'Управление меню таблицы'"
        >
          <drag-and-drop></drag-and-drop>
        </d-modal>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal @closeDialog="dialogStore.closeDialog" :name="'Отгружен'">
          <OrdersOrdersShippedDialog></OrdersOrdersShippedDialog>
        </d-modal>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="dialogStoreDe.isDialogOpen">
        <d-modal @closeDialog="dialogStoreDe.closeDialog" :name="'Доставлен'">
          <OrdersOrdersDeliveredDialog></OrdersOrdersDeliveredDialog>
        </d-modal>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="dialogStoreAc.isDialogOpen">
        <d-modal
          @closeDialog="dialogStoreAc.closeDialog"
          :name="'Принято к отправке'"
        >
          <OrdersOrdersAcceptedDialog></OrdersOrdersAcceptedDialog>
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
// State
import moment from "moment";

const props = defineProps({
  orders: Array,
  ordersStore: Object,
  ordersId: Array,
  filters: Object,
});

const dialogStore = useDialogStore("order-shipped");
const dialogStoreDe = useDialogStore("order-delivered");
const dialogStoreAc = useDialogStore("order-accept");
const emit = defineEmits([
  "canceled",
  "newOrder",
  "restore",
  "setPageSize",
  "setPage",
  "search",
  "getAllId",
]);

const draggable = ref(false);
// Methods
const router = useRouter();
function draggableDialog() {
  draggable.value = false;
}
function detail(id, type_id) {
  if (type_id === 3) {
    router.push({ path: "/orders/orders/exchange", query: { id: id } });
  } else {
    router.push({
      path: "/orders/orders/details",
      query: { id: id, type_id: type_id },
    });
  }
}
function setPageSizes(value) {
  emit("setPageSize", value);
}
function canceled(id) {
  emit("canceled", id);
}
function restore(id) {
  emit("restore", id);
}
function newOrder(id) {
  emit("newOrder", id);
}
function outside() {
  act.value.isActive = false;
}
const act = ref({
  isActive: true,
  index: -1,
});
function clickOutside() {
  act.value.isActive = false;
}
function statusOrders(index) {
  act.value.isActive = !act.value.isActive;
  act.value.index = index;
}
function getAllId() {
  emit("getAllId");
}
function getId(id, index) {
  emit("getId", id, index);
}
function edit(id) {
  router.push({
    path: "/orders/create-orders/creating-orders",
    query: { id: id },
  });
}
let sortedData = ref({ key: "", mode: "" });

// Methods
function searchUpdated(text) {
  emit("search", text);
  console.log(text);
}

function sortData(data) {
  sortedData.value = data;
}

function setPage(index) {
  emit("setPage", index);
}

const isCancelable = (typeId, statusId) => {
  if (statusId === 2) return false;
  else if (typeId === 1 && (statusId === 1 || statusId === 4)) return true;
  else if (typeId === 2 && (statusId === 1 || statusId === 3 || statusId === 4))
    return true;
  else if (typeId === 3 && (statusId === 1 || statusId === 3 || statusId === 4))
    return true;
  return false;
};

const isShippable = (typeId, statusId) => {
  if (statusId === 1 || statusId === 3) {
    if (typeId === 1 && statusId === 1) return true;
    else if (statusId === 3 && (typeId === 1 || typeId === 2)) return true;
    else return false;
  }
  return false;
};

const isAcceptable = (typeId, statusId) => {
  if (typeId === 1) return false;
  else if ((typeId === 2 || typeId === 3) && (statusId === 1 || statusId === 3))
    return true;
  else return false;
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
.bgy {
  background: rgba(189, 127, 6, 0.1);
}
.bg-accepted {
  background: rgba(35, 192, 10, 0.1);
}
.bg-new {
  background: rgba(41, 155, 155, 0.1);
}
.td-shadow {
  cursor: pointer;
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.04);
}
</style>
