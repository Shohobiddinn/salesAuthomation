<template>
  <div>
    <div>
      <div class="h-100vh">
        <div class="flex justify-between mt-4">
          <page-title :title="'Оплата клиентов'"></page-title>
          <div class="flex">
            <div class="relative">
              <button
                @click="imports.isImports = !imports.isImports"
                class="flex px-2 mt-2 mr-4"
              >
                <div class="pr-2"><icon-imports /></div>
                <div>Импортировать</div>
              </button>
              <div
                v-if="imports.isImports"
                class="rounded-lg w-[161px] h-[117px] top-[40px] border bg-white absolute z-50"
              >
                <div
                  @click="importPaymentModal = true"
                  class="fs-12 border-b border-[#E1E4E4] m-3 pb-2 cursor-pointer"
                >
                  Импорт по ИД
                </div>
                <div
                  @click="importCodeModal = true"
                  class="fs-12 border-b border-[#E1E4E4] m-3 pb-2 cursor-pointer"
                >
                  Импорт по Коду
                </div>
                <div
                  @click="importInnModal = true"
                  class="fs-12 m-2 pb-2 cursor-pointer"
                >
                  Импорт по ИНН
                </div>
              </div>
            </div>
            <m-btn
              @click="$router.push('/clients/payment-customers/AddPayment')"
              class="h-[44]"
              >Добавить оплату
            </m-btn>
          </div>
        </div>
        <div class="mt-4">
          <ClientsPaymentCustomersFilterCard />
        </div>
        <div class="flex justify-between mt-4">
          <page-title :title="'Таблица'"></page-title>
          <div @click="openDialog" class="flex relative">
            <grouprocess-btn />
          </div>
        </div>
        <div class="mt-4">
          <ClientsPaymentCustomersDatatable />
        </div>
      </div>
    </div>
    <!-- <transition name="modal">
      <div v-if="groupProcessModal.isActive">
        <d-modal
          @closeDialog="groupProcessDialog"
          :dataContainerWidth="'1325px'"
          :name="'Групповая обработка'"
        >
          <lazy-clients-payment-customers-group-process-dialog
            :groupProcessModal="groupProcessModal"
          />
        </d-modal>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="importPaymentModal">
        <d-modal-import
          @closeDialog="importPaymentDialog"
          :dataContainerWidth="'812px'"
          :name="'Импорт оплаты по ID'"
        >
          <clients-payment-import-dialog />
        </d-modal-import>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="importCodeModal">
        <d-modal-import
          @closeDialog="importCodeDialog"
          :dataContainerWidth="'812px'"
          :name="'Импорт по Коду'"
        >
          <clients-payment-customers-import-code-dialog />
        </d-modal-import>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="importInnModal">
        <d-modal-import
          @closeDialog="importInnDialog"
          :dataContainerWidth="'812px'"
          :name="'Импорт по ИНН'"
        >
          <clients-payment-customers-import-inn-dialog />
        </d-modal-import>
      </div>
    </transition> -->
    <loading-modal v-if="clientsPaymentStore.isLoading">
      <Loading />
    </loading-modal>
  </div>
</template>
<script setup>
const clientsPaymentStore = useClientsPaymentStore("main");
// const dialogStore = useDialogStore("clientsPayment");


const groupProcessModal = ref({
  isActive: false,
});
const importPaymentModal = ref(false);
const importCodeModal = ref(false);
const importInnModal = ref(false);
const clientPaymentStore = useClientsPaymentStore("");



function importInnDialog() {
  importInnModal.value = false;
}
function importCodeDialog() {
  importCodeModal.value = false;
}
function importPaymentDialog() {
  importPaymentModal.value = false;
}
function groupProcessDialog() {
  groupProcessModal.value.isActive = false;
}
function openDialog() {
  groupProcessModal.value.isActive = !groupProcessModal.value.isActive;
  data.value = [];
  console.log(
    "clientPaymentStore.clientsPaymentId.length",
    clientPaymentStore.clientsPaymentId.length
  );
  for (let i = 0; i < clientPaymentStore.clientsPaymentId.length; i++) {
    data.value.push({
      client_id: clientId.value,
      cash_box_id: "60b789b2-4f16-4b53-9e2b-89c60925b870",
      payment_courier_id: "7dfe227b-5c0c-4fe6-8bef-218c752e8b08",
      agent_id: "",
      payment_amount: "",
      description: "",
      payment_received_date: "",
      currency_id: "",
    });
  }
  console.log(
    "clientPaymentStore.paymentList",
    clientPaymentStore.clientsPaymentId
  );
}

const imports = ref({
  isImports: false,
});
function outside(param) {
  filter.value.isSelectWarehouse = param;
}
const clickOutside2 = () => {
  imports.value.isImports = false;
};


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
.card-shadow {
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.08);
}
.card:before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  right: 14px;
  top: -10px;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  border-bottom: 10px solid white;
}
</style>
