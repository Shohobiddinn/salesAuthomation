<template>
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
      <table-filter :templates="equipmentStore.headers"></table-filter>
      <div>
        <search-input
          @change="equipmentStore.searchFromHistoryList"
          class="w-full h-38px"
        />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="w-full overflow-auto">
      <data-table
        :headers="equipmentStore.headers"
        @sort="equipmentStore.sortHistoryListData"
        :sorted="equipmentStore.historyListParams.order_by"
      >
        <template #body>
          <template
            v-for="data in equipmentStore.historyListData?.items"
            :key="data.id"
          >
            <c-tr class="border-b-none b-bottom cursor-pointer">
              <c-td v-for="key in equipmentStore.headers" :key="key">
                <div
                  v-if="key.type === 'location' && data[key.key]"
                  @click="locationData = data[key.key]"
                  class="pt-1 pb-1"
                >
                  <div
                    class="h-[34px] w-[34px] rounded-lg border border-[#299B9B] flex justify-center items-center"
                  >
                    <IconLocation />
                  </div>
                </div>
                <div v-else>
                  {{ data[key.key] }}
                </div>
              </c-td>
              <c-td>
                <div
                  :key="data.id"
                  @click="openDropdown(data.id)"
                  class="relative drop td-shadow py-1"
                >
                  <div
                    :key="data.id"
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
                    :key="data.id"
                    :class="{
                      'active-down': td.isActive && td.id === data.id,
                    }"
                    class="bg-white bottom-[-43px] down rounded-lg z-50 w-[230px] border right-[44px] absolute"
                  >
                    <div class="m-3">
                      <div
                        @click="edit(data.id)"
                        class="flex border-b cursor-pointer pb-2"
                      >
                        <div class="text-[18px]"><IconEdit /></div>
                        <div class="fs-12 ml-2 mt-1 text-[#299B9B]">
                          Редактрировать оборудования
                        </div>
                      </div>
                      <div class="flex border-b cursor-pointer pb-2 pt-2">
                        <div class="text-[18px]">+</div>
                        <nuxt-link
                          :to="`equipments/withdraw-inventory/${data.id}`"
                        >
                          <div class="fs-12 ml-4 mt-1 text-[#BD7F06]">
                            Изять оборудования
                          </div>
                        </nuxt-link>
                      </div>
                      <div
                        class="flex mt-1 cursor-pointer"
                        @click="equipmentStore.deleteDialog = data.id"
                      >
                        <div class="mt-1"><IconTrash /></div>
                        <div class="fs-12 ml-3 mt-1 text-red">
                          Удалить оборудования
                        </div>
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
          :current-size="equipmentStore.historyListParams.page_size"
          @setPageSize="equipmentStore.historyListParams.page_size = $event"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="equipmentStore.historyListData?.total_pages"
          :current-page="equipmentStore.historyListData?.page_number"
          @setPage="equipmentStore.historyListParams.page = $event"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          :templates="equipmentStore.headers"
          @change="onChangeTableHeaders"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="locationData">
      <d-modal
        @closeDialog="locationData = ''"
        :dataContainerWidth="'625px'"
        :name="'Местоположение на карте'"
      >
        <lazy-clients-equipment-location
          :location="locationData"
          @closeDialog="locationData = ''"
        />
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="equipmentStore.deleteDialog">
      <c-modal
        :dataContainerWidth="'360px'"
        @closeDialog="equipmentStore.closeDeleteDialog"
      >
        <CommandDeleteDialog
          @onAcceptDeleting="equipmentStore.acceptDeleting = $event"
          @closeDialog="equipmentStore.closeDeleteDialog"
          @onDelete="equipmentStore.onDeleteDevice"
        />
      </c-modal>
    </div>
  </transition>
</template>

<script setup>
// store
const equipmentStore = useClientsEquipmentStore("main");

// emits
const emit = defineEmits(["editInventory"]);

// States
const locationData = ref(false);
const draggable = ref(false);
const td = reactive({
  isActive: false,
  index: -1,
});

// Methods
onMounted(async () => {
  if (!equipmentStore.historyListData) {
    await equipmentStore.getHistoryListData();
  }
});

function draggableDialog() {
  draggable.value = false;
}
const clickOutside = () => {
  td.isActive = false;
};

const openDropdown = (id) => {
  td.isActive = !td.isActive;
  td.id = id;
};

const onChangeTableHeaders = (value) => {
  equipmentStore.headers = value;
  draggableDialog();
};

const edit = (id) => {
  emit("editInventory", id);
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
  bottom: 40px;
  top: 40px;
  border-left: 15px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
.check label input {
  display: none; /* Hide the default checkbox */
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
