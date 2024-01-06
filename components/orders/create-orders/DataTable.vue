<template>
  <div class="rounded-lg bg-white border-grey px-[2px]">
    <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <SettingsRlpDiscountsTableCheckbox :headers="createOrdersStore.headers" />
      <div>
        <search-input class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="table-containers overflow-y-auto">
      <data-table :headers="createOrdersStore.headers" :loading="createOrdersStore.isLoading" :isEmpty="!createOrdersStore.data?.items?.length">
        <template #body>
          <template
            v-for="data in createOrdersStore.data?.items"
            :key="data.client_id"
          >
            <c-tr
              @click="orderF(data.client_id)"
              class="border-b-none b-bottom cursor-pointer"
            >
              <c-td-no-edit v-for="key in createOrdersStore.headers" :key="key">
                <div v-if="typeof data[key.key] === 'object'">
                  <div v-for="item in data[key.key]" :key="item.id">
                    {{ item }}
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
          :current-size="createOrdersStore.params.pageSize"
          @setPageSize="createOrdersStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="createOrdersStore.data?.total_pages"
          :current-page="createOrdersStore.data?.page_number"
          @setPage="createOrdersStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          :templates="createOrdersStore.headers"
          @change="onChangeTableHeaders"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="refundTaraDialogClientId">
      <h-no-modal @closeDialog="refundTaraDialogClientId = ''">
        <OrdersReturnContainersDialog
          :clientId="refundTaraDialogClientId"
          @closeDialog="refundTaraDialogClientId = ''"
        />
      </h-no-modal>
    </div>
  </transition>
</template>

<script setup>
// store
const createOrdersStore = useCreateOrdersStore("main");

// State
const router = useRouter();
const route = useRoute();
const draggable = ref(false);
const refundTaraDialogClientId = ref('');

// Methods
onMounted(async () => {
  await createOrdersStore.getData();
});

function draggableDialog() {
  draggable.value = false;
}

function orderF(clientId) {
  const queryKey = Object.keys(route.query)?.join("");

  if (route.query[queryKey]) {
    refundTaraDialogClientId.value = clientId;
    return;
  } else {
    router.push({
      path: "/orders/create-orders/creating-orders",
      query: { [queryKey]: clientId },
    });
  }
}

const onChangeTableHeaders = (value) => {
  createOrdersStore.headers = value;
  draggableDialog();
};
</script>
