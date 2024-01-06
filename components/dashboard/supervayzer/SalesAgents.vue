<template>
  <div>
    <div class="flex justify-between mt-4">
      <div class="flex gap-4">
        <button
          class="rounded-lg border w-6 h-6 p-1.5 bg-white hover:bg-gray-200 mt-2"
        >
          <ArrowBottom />
        </button>
        <div class="-mt-1.5"><page-title :title="'Торговые агенты'" /></div>
      </div>
    </div>
    <div class="rounded-lg bg-white border-grey px-[2px] mt-2">
      <div class="flex justify-between">
        <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
          <div @click="draggable = true">
            <i-btn>
              <IconColsSVG />
            </i-btn>
          </div>
          <SettingsRlpDiscountsTableCheckbox
            :headers="headers"
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
        <div class="flex gap-4 m-4">
          <div class="pt-2 check">
            <label>
              <input type="checkbox" />
              <span></span>
            </label>
          </div>
          <div class="mt-1.5">Скрыть нулевые цифры</div>
        </div>
      </div>
      <div class="overflow-auto table-containers">
        <data-table :headers="headers" @sort="sortData" :sorted="sortedData">
          <template #body>
            <template v-for="(data, index) in salesAgents?.items" :key="index">
              <c-tr class="b-bottom cursor-pointer">
                <c-td-no-edit v-for="key in headers" :key="key">
                  <button @click="agentDetail(data.employee_id)"
                          class="py-2 underline pb-2"
                          v-if="key.key === 'employee_name' && key.checked"
                  >
                    {{ data[key.key] }}
                  </button>
                  <button @click="agentOrder(data.employee_id)"
                          class="py-2 underline pb-2"
                          v-if="key.key === 'order_count' && key.checked"
                  >
                    {{ data[key.key] }}
                  </button>
                  <button @click="agentOrderCanceled(data.employee_id)"
                          class="py-2 underline pb-2"
                          v-if="key.key === 'canceled_order_count' && key.checked"
                  >
                    {{ data[key.key] }}
                  </button>
                  <button @click="agentOrderReject(data.employee_id)"
                          class="py-2 underline pb-2"
                          v-if="key.key === 'reject' && key.checked"
                  >
                    {{ data[key.key] }}
                  </button>
                  <div class="py-2" v-if="key.key !== 'employee_name' && key.key !== 'reject' && key.key !== 'canceled_order_count' && key.key !== 'order_count' && key.checked">
                    {{ data[key.key] }}
                  </div>
                </c-td-no-edit>
              </c-tr>
            </template>
            <tr class="border-t-1 border-b bg-input">
              <td
                v-for="(item, index) in result"
                class="fs-14 fw-6 text-gray-3 pl-3 py-2"
              >
                <div v-if="headers[index] && headers[index].checked">
                  {{ item.name }}
                </div>
              </td>
            </tr>
          </template>
        </data-table>
      </div>
      <div class="flex justify-between w-full">
        <div class="flex p-3 gap-2 items-center">
          <span class="secondary-gray-text fs-14"> Показать по </span>
          <page-size-btn :current-size="filters.pageSize" @setPageSize="setPageSize" />
        </div>
        <div class="p-3">
          <page-index
            :available-pages="salesAgents?.total_pages"
            :current-page="salesAgents?.page_number"
            @setPage="setPage"
          />
        </div>
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="agent.isActive">
      <d-modal
          :dataContainerWidth="'921px'"
          @closeDialog="closeOperation"
          :name="'Cola cola'"
      >
        <div class="relative w-full">
          <DashboardSupervayzerAgentsDialogTable :filters="filters" :details="details"/>
        </div>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="agentOrders.isActive">
      <d-modal
          :dataContainerWidth="'921px'"
          @closeDialog="closeOperationOrder"
          :name="'Cola cola'"
      >
        <div class="relative w-full">
          <DashboardSupervayzerAgentsDialogTable :filters="filters" :details="agentsOrders"/>
        </div>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="agentOrdersCanceled.isActive">
      <d-modal
          :dataContainerWidth="'921px'"
          @closeDialog="closeOperationOrderCanceled"
          :name="'Cola cola'"
      >
        <div class="relative w-full">
          <DashboardSupervayzerAgentsDialogOrderCanceled :filters="filters" :details="agentsOrdersCanceled"/>
        </div>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="agentOrdersReject.isActive">
      <d-modal
          :dataContainerWidth="'921px'"
          @closeDialog="closeOperationOrderReject"
          :name="'Cola cola'"
      >
        <div class="relative w-full">
          <DashboardSupervayzerAgentsDialogReject :filters="filters" :details="agentsOrdersReject"/>
        </div>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// State
import { ref } from "vue";
import ArrowBottom from "~/components/icon/ArrowBottom.vue";
import {useSupervisorStore} from "~/stores/dashboard/supervisor/supervisor.store";
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);
const details = ref(null)
const agentsOrders = ref(null)
const agentsOrdersCanceled = ref(null)
const agentsOrdersReject = ref(null)
const props = defineProps({
  salesAgents:Object,
  filters:Object
})
const supervisorStore = useSupervisorStore('')
// props.filters.date
const filter = ref({
  page:1,
  pageSize:10,
  date:null,
  agentId:null
})
const agent = ref({
  isActive:false
})
const agentOrders = ref({
  isActive:false
})
const agentOrdersCanceled = ref({
  isActive:false
})
const agentOrdersReject = ref({
  isActive:false
})
function closeOperation(){
  agent.value.isActive = false
}
function closeOperationOrder(){
  agentOrders.value.isActive = false
}
function closeOperationOrderReject(){
  agentOrdersReject.value.isActive = false
}
async function agentDetail(id){
  filter.value.agentId = id
  agent.value.isActive = true
  details.value = await supervisorStore.getAgentDetail(filter.value)
}
async function agentOrder(id){
  filter.value.agentId = id
  agentOrders.value.isActive = true
  agentsOrders.value = await supervisorStore.getAgentOrder(filter.value)
}
async function agentOrderCanceled(id){
  filter.value.agentId = id
  agentOrdersCanceled.value.isActive = true
  agentsOrdersCanceled.value = await supervisorStore.getAgentOrderCanceled(filter.value)
}
async function agentOrderReject(id){
  filter.value.agentId = id
  agentOrdersReject.value.isActive = true
  agentsOrdersReject.value = await supervisorStore.getAgentOrderReject(filter.value)
}
// Methods
function draggableDialog() {
  draggable.value = false;
}
const result = ref([
  {
    name: "Итоги",
  },
  {
    name: "13126",
  },
  {
    name: "13126",
  },
  {
    name: "13126",
  },
  {
    name: "13126",
  },
  {
    name: "13126",
  },
  {
    name: "13126",
  },
  {
    name: "13126",
  },
]);
let headers = ref([
  {
    name: "Агент",
    checked: true,
    key: "employee_name",
    type: "employee_name",
    thWidth: "180px",
    bRadius: "8px",
  },
  {
    name: "Сумма",
    checked: true,
    key: "order_amount",
    type: "order_amount",
    thWidth: "100px",
  },
  {
    name: "Заказ",
    checked: true,
    key: "order_count",
    type: "order_count",
    thWidth: "100px",
  },
  {
    name: "Отмененные",
    checked: true,
    key: "reject",
    type: "reject",
    thWidth: "120px",
  },
  {
    name: "Все визиты",
    checked: true,
    key: "visit_count",
    type: "visit_count",
    thWidth: "140px",
  },
  {
    name: "Отказы",
    checked: true,
    key: "canceled_order_count",
    type: "canceled_order_count",
    thWidth: "70px",
  },
  {
    name: "Непосещенные Т.Т",
    checked: true,
    key: "no_visit",
    type: "no_visit",
    thWidth: "160px",
  },
  {
    name: "Фотоотчёты",
    checked: true,
    key: "photo",
    type: "photo",
    thWidth: "70px",
  },
]);

let sortedData = ref({ key: "", mode: "" });
// Methods
function searchUpdated(text) {
  console.log(text);
}
function sortData(data) {
  sortedData.value = data;
}
function setPage(index) {
  props.filters.page = index;
}
function setPageSize(size) {
  props.filters.pageSize = size;
}
</script>

<style scoped></style>
