<template>
  <div class="w-full" v-click-outside="clickOutside">
    <div class="rounded-lg bg-white border-grey px-[2px]">
      <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
        <div @click="draggable = true">
          <i-btn>
            <IconColsSVG />
          </i-btn>
        </div>
        <SettingsRlpDiscountsTableCheckbox :headers="clientsInitialBalanceStore.templates">
        </SettingsRlpDiscountsTableCheckbox>
        <div>
          <search-input @change="clientsInitialBalanceStore.search" />
        </div>
        <div>
          <excel-btn :size="'340kb'"></excel-btn>
        </div>
      </div>

      <div class="overflow-auto table-containers min-h-[200px]">
        <data-table :headers="clientsInitialBalanceStore.templates" @sort="clientsInitialBalanceStore.sortData"
          :sorted="clientsInitialBalanceStore.params.order_by" @getAllId="getAllId"
          :loading="clientsInitialBalanceStore.isLoading" :isEmpty="!clientsInitialBalanceStore.data?.items?.length">
          <template #body>
            <template v-for="(data, index) in clientsInitialBalanceStore.data?.items" :key="index">
              <c-tr class="b-bottom">
                <c-td-no-edit v-for="key in clientsInitialBalanceStore.templates" :key="key">
                  <div v-if="key.key === 'checkbox'" class="check">
                    <label>
                      <input :checked="selectedId.includes(data.id)" @input="getId(data.id, index)" type="checkbox" />
                      <span></span>
                    </label>
                  </div>
                  <div @click="openPaymentModal(data.id)" class="underline pb-2 cursor-pointer"
                    v-if="key.key === 'client_name'">
                    {{ data[key.key] }}
                  </div>
                  <div class="" v-if="key.key !== 'client_name'">
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
          <page-size-btn :current-size="clientsInitialBalanceStore.params.page_size"
            @setPageSize="clientsInitialBalanceStore.setPageSize" />
        </div>
        <div class="p-3">
          <page-index :available-pages="clientsInitialBalanceStore.data?.total_pages"
            :current-page="clientsInitialBalanceStore.data?.page_number" @setPage="clientsInitialBalanceStore.setPage" />
        </div>
      </div>
    </div>
  </div>

  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop @change="onChangeHeaders" :templates="clientsInitialBalanceStore.templates"></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="payment">
      <d-modal @closeDialog="payment = false" :dataContainerWidth="'940px'"
        :name="'Оплата № ' + clientsInitialBalanceStore.detail?.visual_id">
        <DashboardInitialBalanceClientsDialogBodyReviuw @closeModal="payment = false" @editItem="editPaymentModal" />
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="paymentEdit">
      <d-modal @closeDialog="paymentEdit = false" :dataContainerWidth="'625px'" name="Изменить">
        <DashboardInitialBalanceClientsDialogBodyEdit :id="paymentEditId" @closeModal="paymentEdit = false" />
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// Store
const clientsInitialBalanceStore = useClientsInitialBalanceStore("");

// State
const draggable = ref(false);
const selectedId = ref([]);
const payment = ref(false);
const paymentEdit = ref(false);
const paymentEditId = ref(null);
const td = reactive({
  isActive: false,
  index: -1,
});

// Methods
function draggableDialog() {
  draggable.value = false;
}

const onChangeHeaders = (param) => {
  clientsInitialBalanceStore.templates = param;
  draggable.value = false;
};

function getAllId() {
  if (clientsInitialBalanceStore.data?.items.length !== selectedId.value.length) {
    for (let i = 0; i < clientsInitialBalanceStore.data?.items.length; i++) {
      if (!selectedId.value.includes(clientsInitialBalanceStore.data?.items[i].id)) {
        selectedId.value.push(clientsInitialBalanceStore.data?.items[i].id);
      }
    }
  } else {
    selectedId.value = [];
  }
}

function getId(id, index) {
  if (!selectedId.value.includes(id)) {
    selectedId.value.push(id);
  } else {
    const currentIndex = selectedId.value.findIndex((it) => it === id);
    selectedId.value.splice(currentIndex, 1);
  }
}

const clickOutside = () => {
  td.isActive = false;
};


const openPaymentModal = async (id) => {
  await clientsInitialBalanceStore.getDetail(id);
  payment.value = true;
};

const editPaymentModal = () => {
  payment.value = false;
  paymentEdit.value = true;
};

// Hooks
onMounted(async () => {
  await clientsInitialBalanceStore.getData(true);
});
</script>
<style scoped>
.check label input {
  display: none;
  /* Hide the default checkbox */
}

.check label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
.check [type="checkbox"]:checked+span:before {
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
