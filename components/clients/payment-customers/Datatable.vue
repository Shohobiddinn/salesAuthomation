<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter :templates="clientsPaymentStore.templates"></table-filter>
      <div>
        <search-input @change="clientsPaymentStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'330kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3 w-full overflow-auto">
      <data-table
        :headers="clientsPaymentStore.templates"
        @sort="clientsPaymentStore.sortData"
        @getAllId="getAllId"
        :check="clientsPaymentStore.data?.items?.length === clientsId.length"
      >
        <template #body>
          <c-tr v-for="(data, index) in clientsPaymentStore.data?.items" :key="data.id">
            <c-td v-for="col in clientsPaymentStore.templates" :key="col">
              <div class="pt-2 ml-[-2px] check" v-if="col.key === 'checkbox'">
                <label>
                  <input
                    :checked="clientsId.includes(data.id)"
                    @input="getId(data.id, index, data.client_id)"
                    type="checkbox"
                  />
                  <span></span>
                </label>
              </div>
              <div v-if="col.key === 'payment_received_date'">
                {{ convertDate(col.payment_received_date) }}
              </div>
              <div v-if="col.key === 'payment_approved_date'">
                {{ convertDate(col.payment_approved_date) }}
              </div>
              <div v-if="col.checked && col.key !== 'payment_received_date' && col.key !== 'payment_approved_date'">
                {{ data[col.key] }}
              </div>
            </c-td>
            <c-td>
              <div
                :key="index"
                @click="openDropdown(index)"
                class="relative drop td-shadow py1"
              >
                <div
                  :key="index"
                  class="cursor-pointer flex justify-center w-[30px] pl-2 py-[6px]"
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
                  :key="index"
                  :class="{ 'active-down': td.isActive && td.index === index }"
                  class="bg-white bottom-[-23px] down rounded-lg z-50 w-[170px] border right-[44px] absolute"
                >
                  <div class="m-3">
                    <div class="flex cursor-pointer border-b pb-2" @click="deleteDialog=true">
                      <div class="mt-1"><IconTrash /></div>
                      <div class="fs-12 ml-3 mt-1 text-red">Удалить оплату</div>
                    </div>
                    <div class="flex cursor-pointer mt-1">
                      <div><IconEvenlope /></div>
                      <div class="fs-12 text-[#299B9B] ml-3 mt-1">
                        Отправить SMS
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </c-td>
          </c-tr>
        </template>
      </data-table>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14"> Показать по </span>
        <page-size-btn
          :current-size="clientsPaymentStore.params.page_size"
          @setPageSize="clientsPaymentStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="clientsPaymentStore.data?.total_pages"
          :current-page="clientsPaymentStore.data?.page_number"
          @setPage="clientsPaymentStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="(value) => (clientsPaymentStore.templates = value)"
          :templates="clientsPaymentStore.templates"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
      <div v-if="deleteDialog">
        <d-modal
          @closeDialog="deleteDialog=false"
          :name="'Удалить оплату'"
        >
          <ClientsPaymentCustomersDeleteDialog />
        </d-modal>
      </div>
    </transition>
</template>

<script setup>
// Props
const emit = defineEmits(["clear"]);
const props = defineProps({
  isActive: {
    type: Boolean,
  },
});
let { clientId } = clientsPayment;
const clientsPaymentStore = useClientsPaymentStore("main");

// State
const draggable = ref(false);
const deleteDialog = ref(false);
const td = reactive({
  isActive: false,
  index: -1,
});
const clientsId = ref([]);

function openDropdown(index) {
  if (td.index === index) {
    td.isActive = !td.isActive;
  } else {
    td.isActive = true;
    td.index = index;
  }
}

const convertDate = (date) => {
    const newDate = date ? new Date(date) : new Date
    const day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()
    const month = newDate.getMonth()+1 < 10 ? `0${newDate.getMonth()+1}` : newDate.getMonth()+1
    return `${day}.${month}.${newDate.getFullYear()}`
}

function getAllId() {
  if (props.clientsPaymentStore.data?.items.length !== clientsId.value.length) {
    for (let i = 0; i < props.clientsPaymentStore.data?.items.length; i++) {
      if (!clientsId.value.includes(props.clientsPaymentStore.data?.items[i].id)) {
        clientsId.value.push(props.clientsPaymentStore.data?.items[i].id);
      }
    }
  } else {
    clientsId.value = [];
  }
  clientsPaymentStore.clientsPaymentId = [...clientsId.value];
}

function getId(id, index, clientIds) {
  clientId.value = clientIds;
  if (!clientsId.value.includes(id)) {
    clientsId.value.push(id);
  } else {
    const currentIndex = clientsId.value.findIndex((it) => it === id);
    clientsId.value.splice(currentIndex, 1);
  }
  clientsPaymentStore.clientsPaymentId = [...clientsId.value];
}

function draggableDialog() {
  draggable.value = false;
}


onMounted(async () => {
  await clientsPaymentStore.getData();
});

</script>

<style scoped>
.table-container {
  width: 100%;
  overflow: auto;
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
</style>
