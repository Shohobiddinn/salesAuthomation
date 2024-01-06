<template>
  <div>
    <div class="flex">
      <div
        class="w-[313px] h-[130px] rounded-lg bg-rg flex justify-center item-center"
      >
        <div class="mt-8">
          <div class="text-2xl font-semibold">
            {{ props.clientOrderCount }} шт
          </div>
          <div class="text-[#A8AEA6]">Доставлено</div>
        </div>
      </div>
      <div
        class="w-[313px] ml-4 h-[130px] rounded-lg bg-rg1 flex justify-center item-center"
      >
        <div class="mt-8">
          <div class="text-2xl font-semibold">
            {{ props.clientSalesAmount }} сум
          </div>
          <div class="text-[#A8AEA6] ml-4">Сумма продаж</div>
        </div>
      </div>
    </div>
    <div class="text-lg font-semibold text-[#424F4F] mt-6">Ассортимент</div>
    <div v-if="clientProducts" class="grid grid-cols-2 items-center gap-x-5">
      <div v-for="product in formattedData" :key="product">
        <div class="mt-12.5">
          <div class="flex items-center justify-between">
            <div class="flex gap-3 items-center">
              <div class="fs-14 font-semibold">
                {{ product?.product_name }}
              </div>
              <div>{{ product.amount }}шт</div>
            </div>
            <div>{{ product.percentage }}</div>
          </div>
          <div class="w-full mt-2 h-[12px] bg-[#E1E4E4] rounded-lg">
            <div
              :class="`bg-[${product.background}] w-[${product.percentage}] rounded-lg h-[12px]`"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center">
      <IconLoading :loading="true" :width="9" :height="9" />
    </div>
  </div>
</template>

<script setup>
// store
const clientsStore = useClientsStore("main");

// props
const props = defineProps({
  isActive: Boolean,
  clientOrderCount: Number,
  clientSalesAmount: Number,
});

// state
const route = useRoute();
const clientProducts = ref(null);
const colorsArr = ref(["#D10505", "#BD7F06", "#057CD1"]);

// methods
watchEffect(async () => {
  if (props.isActive) {
    clientProducts.value = await clientsStore.getProductsByClientId(
      route.params.id
    );
  }
});

const formattedData = computed(() => {
  if (clientProducts.value && props.clientOrderCount) {
    const arr = clientProducts.value.map((product) => ({
      ...product,
      percentage: (product.amount / props.clientOrderCount) * 100 + "%",
      background: colorsArr.value[Math.round(Math.random() * 2)],
    }));
    return arr;
  } else {
    return [];
  }
});
</script>

<style scoped>
.bg-rg {
  background: rgba(22, 117, 6, 0.04);
}
.bg-rg1 {
  background: rgba(59, 7, 99, 0.04);
}
</style>
