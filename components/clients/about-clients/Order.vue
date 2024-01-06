<template>
  <div class="flex">
    <div class="w-[313px] h-[130px] bg-rg flex justify-center item-center">
      <div class="mt-8">
        <div class="text-[24px] font-[600]">
          {{ props.clientOrderCount }} шт
        </div>
        <div class="text-[#A8AEA6]">Доставлено</div>
      </div>
    </div>
    <div
      class="w-[313px] ml-4 h-[130px] rounded-lg bg-rg1 flex justify-center item-center"
    >
      <div class="mt-8">
        <div class="text-[24px] font-[600]">
          {{ props.clientSalesAmount }} сум
        </div>
        <div class="text-[#A8AEA6] ml-4">Сумма продаж</div>
      </div>
    </div>
  </div>
  <div class="rounded-lg bg-white border-grey mt-3 px-[2px]">
    <div class="flex mb-4 flex-row gap-4 ml-4 mt-3 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <SettingsRlpDiscountsTableCheckbox
        :headers="clientsOrdersStore.templates"
      ></SettingsRlpDiscountsTableCheckbox>
      <div>
        <search-input
          @change="clientsOrdersStore.search"
          class="w-full h-38px"
        />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="w-full overflow-auto">
      <data-table
        :headers="clientsOrdersStore.templates"
        :loading="clientsOrdersStore.loading"
      >
        <template #body>
          <c-tr
            v-for="(data, index) in clientsOrdersStore.data?.items"
            :key="data.order_id"
          >
            <c-td-no-edit
              v-for="key in clientsOrdersStore.templates"
              :key="key"
            >
              <div class="py-2">
                <div v-if="key.key === 'order_number'">
                  {{ index + 1 }}
                </div>
                <nuxt-link
                  v-else-if="key.key === 'order_date'"
                  :to="{
                    path: '/orders/orders/details/',
                    query: { id: data.order_id },
                  }"
                  class="underline"
                >
                  {{ getFormattedDate(data[key.key]) }}
                </nuxt-link>
                <div v-else-if="key.key === 'cost'">
                  {{ data[key.key] }} {{ data?.currency_title }}
                </div>
                <div v-else>
                  {{ data[key.key] }}
                </div>
              </div>
            </c-td-no-edit>
          </c-tr>
        </template>
      </data-table>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14"> Показать по </span>
        <page-size-btn
          :current-size="clientsOrdersStore.params.page_size"
          @setPageSize="clientsOrdersStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="clientsOrdersStore.data?.total_pages"
          :current-page="clientsOrdersStore.data?.page_number"
          @setPage="clientsOrdersStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal
        @closeDialog="draggable = false"
        :name="'Управление меню таблицы'"
      >
        <drag-and-drop
          @change="onChangeTableHeaders"
          :templates="clientsOrdersStore.templates"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
import moment from "moment";

// props
const props = defineProps({
  isActive: Boolean,
  clientOrderCount: Number,
  clientSalesAmount: Number,
});
// store
const clientsOrdersStore = useClientsOrdersStore("main");

// State
const route = useRoute();
const dataContainerWidth = ref("346px");
const draggable = ref(false);

// Methods
onMounted(async () => {
  if (props.isActive) {
    await clientsOrdersStore.getData(route.params.id);
  }
});

const getFormattedDate = (date) => {
  return date && moment.utc(date).format("YYYY-MM-DD HH:mm:ss");
};

const onChangeTableHeaders = (param) => {
  clientsOrdersStore.templates = param;
  draggable.value = false;
};
</script>

<style scoped>
.bg-rg {
  background: rgba(22, 117, 6, 0.04);
}
.bg-rg1 {
  background: rgba(59, 7, 99, 0.04);
}
</style>
