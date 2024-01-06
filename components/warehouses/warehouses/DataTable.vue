<template>
  <div>
    <div class="flex mb-4 flex-row gap-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <SettingsRlpDiscountsTableCheckbox
        :headers="warehousesStore.templates"
      ></SettingsRlpDiscountsTableCheckbox>
      <div>
        <search-input @change="warehousesStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="rounded-lg bg-white border-grey px-[2px]">
      <div class="w-full overflow-auto">
        <data-table
          :headers="warehousesStore.templates"
          @sort="warehousesStore.sortData"
          :sorted="warehousesStore.params.order_by"
          withInformationAboveHeader
        >
          <template #body>
            <c-tr
              v-for="(data, index) in warehousesStore.data?.items"
              :key="data"
            >
              <c-td v-for="key in warehousesStore.templates" :key="key">
                <div v-if="key.key === 'warehouse_man'">
                  <div>
                    {{ data[key.key]?.name }}
                  </div>
                </div>
                <div v-else-if="key.key === 'warehouse_employee_models'">
                  <div v-for="employee in data[key.key]" :key="employee?.id">
                    {{ employee?.full_name }}
                  </div>
                </div>
                <div v-else-if="key.key === 'warehouse_currency_models'">
                  <div v-for="currency in data[key.key]" :key="currency?.id">
                    {{ currency?.name }}
                  </div>
                </div>
                <div v-else>
                  {{ data[key.key] }}
                </div>
              </c-td>
              <c-td>
                <div
                  :key="index"
                  @click="openDropdown(index)"
                  class="relative drop td-shadow p-1"
                >
                  <div
                    :key="index"
                    class="cursor-pointer flex justify-center w-[30px] py-[6px]"
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
                    :class="{
                      'active-down': td.isActive && td.index === index,
                    }"
                    class="bg-white bottom-[-43px] down rounded-lg z-50 w-[190px] border right-[44px] absolute"
                  >
                    <div class="m-3">
                      <div
                        @click="() => dialogStore.edit({ ...data })"
                        class="flex border-b cursor-pointer pb-2"
                      >
                        <div>
                          <IconEdit />
                        </div>
                        <div class="fs-12 text-blue-20 ml-2 mt-1">
                          Редактрировать
                        </div>
                      </div>
                      <div
                        @click="deActivate(data.id)"
                        class="flex border-b mt-1 cursor-pointer pb-2"
                      >
                        <div class="mt-0.5">
                          <IconCheck />
                        </div>
                        <div class="fs-12 text-black ml-2 mt-1">
                          Деактивировать склад
                        </div>
                      </div>
                      <div
                        @click="deleteWarehouses(data.id)"
                        class="flex mt-1 cursor-pointer"
                      >
                        <div class="mt-1">
                          <IconTrash />
                        </div>
                        <div class="fs-12 ml-3 mt-1 text-red">
                          Удалить cклада
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
            :current-size="warehousesStore.params.page_size"
            @setPageSize="warehousesStore.setPageSize"
          />
        </div>
        <div class="p-3">
          <page-index
            :available-pages="warehousesStore.data?.total_pages"
            :current-page="warehousesStore.data?.page_number"
            @setPage="warehousesStore.setPage"
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
      <div v-if="warehouseDeleteModal">
        <c-modal
          :dataContainerWidth="'360px'"
          @closeDialog="warehousesDeleteDialogs"
        >
          <WarehousesDeleteDialog
            :id="warehouses_id"
            @closeDeleteDialog="warehousesDeleteDialogs"
            :is-active="isActive"
          />
        </c-modal>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="supervisorsModal">
        <d-modal
          @closeDialog="supervisorsDialog"
          :name="'Редактрироват Супер...'"
        >
          <div class="relative">
            <CommandSupervisorsDialogBody />
          </div>
        </d-modal>
      </div>
    </transition>
    <loading-modal
      v-if="warehousesStore.loading"
      name="Управление меню таблицы"
    >
      <Loading />
    </loading-modal>
  </div>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification";

// Props
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});
const { isActive } = toRefs(props);

// stores
const dialogStore = useDialogStore("warehouses");
const warehousesStore = useWarehousesStore(isActive.value.toString());

// state
const draggable = ref(false);
const warehouseDeleteModal = ref(false);
const td = ref({
  isActive: false,
  index: 0,
});
const warehouses_id = ref(null);

// methods
function warehousesDeleteDialogs() {
  warehouseDeleteModal.value = false;
}

const deleteWarehouses = async (id) => {
  const data = await warehousesStore.allowDelete(id);
  if (data.length) {
    const isExistproductsInWarehouse = data
      ?.map((product) => Number(Object.values(product).join("")))
      .find((amount) => amount > 0);
    if (!isExistproductsInWarehouse) {
      warehouseDeleteModal.value = true;
      warehouses_id.value = id;
    } else {
      notify({ title: "Склад не может быть удален!", type: "error" });
      return;
    }
  } else {
    warehouseDeleteModal.value = true;
    warehouses_id.value = id;
  }
};

function openDropdown(index) {
  td.value.isActive = !td.value.isActive;
  td.value.index = index;
}

async function deActivate(id) {
  await warehousesStore.deActivate(id);
  await warehousesStore.refresh();
}

async function activate(id) {
  await warehousesStore.activate(id);
  await warehousesStore.refresh();
}

function draggableDialog() {
  draggable.value = false;
}

// Hooks
watchEffect(async () => {
  if (isActive.value || !isActive.value) {
    await warehousesStore.getData(isActive.value);
  }
});
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
</style>
