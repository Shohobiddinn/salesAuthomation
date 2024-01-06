<template>
  <div class="rounded-lg bg-white border-grey">
    <!-- <pre>{{ priceStore.data }}</pre> -->
    <div class="w-full overflow-auto">
      <data-table
        :headers="headers"
        withInformationAboveHeader
        :configuration="{ isNoCreate: false }"
      >
        <template #body>
          <c-tr v-for="data in priceStore.priceList" :key="data">
            <c-td-no-edit v-for="key in headers" :key="key">
              <div class="py-2" v-if="key.key === 'prices' && data[key.key][0]">
                {{ data[key.key][0].price }}
              </div>
              <div class="py-2" v-if="key.key !== 'prices'">
                {{ data[key.key] }}
              </div>
              <div v-for="price in data.prices" :key="price?.id">
                <div v-if="key.key === price?.price_type_id">
                  {{ price.price }}
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
          :current-size="priceStore.priceListParams.page_size"
          @setPageSize="onChangePageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="priceStore.priceList?.total_pages"
          :current-page="priceStore.priceList?.page_number"
          @setPage="onChangeSetPage"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
// Store
const priceStore = usePriceStore("main");

// Methods
const headers = computed(() => {
  if (priceStore.data?.items?.length) {
    let priceTypeListHeader = priceStore.data?.items?.map((prices) => ({
      key: prices?.id,
      id: prices?.id,
      name: prices?.name,
      bgHeader: "#e1e1e1",
      thWidth: "180px",
      checked: true,
    }));
    return [...priceStore.templatesPriceList, ...priceTypeListHeader];
  } else return priceStore.templatesPriceList;
});

const onChangePageSize = (val) => {
  priceStore.setPageSize(val, "priceList");
};
const onChangeSetPage = (val) => {
  priceStore.setPage(val, "priceList");
};
</script>
