<template>
  <div>
    <div class="font-[600] text-[24px] my-4">Продукты</div>
    <div class="w-full">
      <div class="rounded-lg">
        <input
          type="button"
          v-for="(item, index) in productCategory?.items"
          :value="item.name"
          :key="item.id"
          @click="selectCategory(index, item.id)"
          :class="[
            groupCategory.isActive && groupCategory.index === index
              ? 'order bgc'
              : '',
          ]"
          class="px-4 py-2 order border-r bg-white text-[#8FA0A0]"
        />
      </div>
    </div>

    <div v-if="products">
      <div
        class="rounded-lg bg-white border-grey mt-3 px-[2px] relative w-full"
      >
        <div class="flex w-full absolute z-49 bottom-0 bg-white">
          <span class="fs-14 ml-22 w-[35%]">Итого</span>
          <div class="ml-2 w-[15%]">{{ allPrice.count }} шт</div>
          <div class="ml-2 w-[15%]">{{ allPrice.volume }} kg</div>
          <div class="fs-16 text-[#299B9B] font-[600] py-2 w-[15%]">
            {{ allPrice.price }}
          </div>
        </div>
        <div class="h-[400px] overflow-auto relative">
          <data-table
            withInformationAboveHeader
            :loading="loading"
            :headers="incomeStore.productsTemplates"
            @sort="incomeStore.sortData"
            :sorted="incomeStore.params.order_by"
            :isEmpty="!products?.length"
          >
            <template #body>
              <c-tr
                v-for="(item, index) in products"
                :trBg="false"
                :key="index"
                :class="item.amount === 0 && 'bg-[#F4F4F4] w-full'"
              >
                <c-td-no-edit>
                  <div class="py-2">
                    <div>
                      {{ item.product_name }}
                    </div>
                  </div>
                </c-td-no-edit>
                <c-td-no-edit>
                  <div class="py-2">
                    <div>
                      {{ item.price }}
                    </div>
                  </div>
                </c-td-no-edit>

                <c-td-no-edit>
                  <div class="py-2">
                    <div>
                      <input
                        v-model="currentProducts[index].blog"
                        :disabled="item.amount === 0"
                        @input="
                          inputCalculate(
                            $event,
                            item.amount,
                            item.quantity_in_package,
                            item.price,
                            index,
                            item.volume,
                            item.product_id
                          )
                        "
                        class="border rounded-lg h-8 w-20 p-2 focus:border-blue-10 active:border-blue-10"
                        type="number"
                      />
                    </div>
                  </div>
                </c-td-no-edit>
                <c-td-no-edit>
                  <div class="py-2">
                    <div>
                      <input
                        :disabled="item.amount === 0"
                        v-model="currentProducts[index].count"
                        @input="
                          inputCalculateBlock(
                            $event.target.value,
                            item.quantity_in_package,
                            item.price,
                            index,
                            item.volume,
                            item.product_id
                          )
                        "
                        class="border rounded-lg h-8 w-20 p-2 relative focus:border-blue-10 active:border-blue-10"
                        type="number"
                      />
                    </div>
                  </div>
                </c-td-no-edit>
                <c-td-no-edit>
                  <div class="py-2">
                    <div>
                      {{ currentProducts[index].volume }}
                    </div>
                  </div>
                </c-td-no-edit>
                <c-td-no-edit>
                  <div class="py-2">
                    <div>
                      {{ item.amount }}
                    </div>
                  </div>
                </c-td-no-edit>
              </c-tr>
            </template>
          </data-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import {data} from "autoprefixer";
const createOrdersStore = useCreateOrdersStore("main");
const products = ref(null);
const props = defineProps({
  data: Object,
  products: Array,
  queryId: String,
  productCategory: Object,
});
const incomeProductsParam = ref({
  priceTypeId: props.data?.price_type_id,
  warehouseId: props.data?.warehouse_id,
  categoryId: "",
});
const loading = ref(false);
const emit = defineEmits(["incomeAmount", "productsGet", "newProductPrice"]);

const groupCategory = ref({
  isActive: true,
  index: 0,
});

async function selectCategory(index, category_id) {
  loading.value = true;
  groupCategory.value.isActive = true;
  groupCategory.value.index = index;
  incomeProductsParam.value.categoryId = category_id;
  products.value = await createOrdersStore.getProducts(
    incomeProductsParam.value
  );
  loading.value = false;
}

const amount = ref(0);
const route = useRoute();
const product = {
  product_id: null,
  count: 0,
  blog: 0,
  price: 0,
  volume: 0,
};

function inputCalculate(
  event,
  amountInWareHouse,
  quantity,
  price,
  index,
  volume,
  id
) {
  if (!props.data.products) {
    props.data.products = [];
  }
  const item = currentProducts.value.find((it) => it.product_id === id);
  const datIndex = props.data.products.findIndex((it) => it.product_id === id);
  if (event.target.value >= 0) {
    if (event.target.value > amountInWareHouse) {
      event.target.value = amountInWareHouse;
    }
    const calculated = {
      blog: event.target.value,
      count: event.target.value * quantity,
      price: event.target.value * price,
      volume: event.target.value * quantity * volume,
    };
    if (datIndex > -1) {
      props.data.products[datIndex] = { ...item, ...calculated };
    } else {
      props.data.products.push({ ...item, ...calculated });
    }
  } else {
    event.target.value = 0;
  }
}

function inputCalculateBlock(count, quantity, price, index, volume, id) {
  if (!props.data.products) {
    props.data.products = [];
  }
  const item = currentProducts.value.find((it) => it.product_id === id);
  const datIndex = props.data.products.findIndex((it) => it.product_id === id);
  const calculated = {
    blog: Math.ceil(count / quantity),
    count: count,
    price: count * price,
    volume: count * quantity * volume,
  };
  if (datIndex > -1) {
    props.data.products[datIndex] = { ...item, ...calculated };
  } else {
    props.data.products.push({ ...item, ...calculated });
  }
}

const currentProducts = computed({
  get: () => {
    const inProducts = [];
    if (products.value && products.value.length > 0) {
      products.value.forEach((it) => {
        const savedProduct = props.data?.products?.find(
          (sIt) => sIt.product_id === it.product_id
        );
        if (savedProduct) {
          inProducts.push({
            ...product,
            ...savedProduct,
            product_id: it.product_id,
            product_name: it.product_name,
            blog: Math.ceil(savedProduct.count / it.quantity_in_package),
          });
        } else {
          inProducts.push({
            ...product,
            product_id: it.product_id,
            product_name: it.product_name,
          });
        }
      });
    }
    return inProducts;
  }
});

const allPrice = computed(() => {
  let allAmount = {
    product_id: null,
    count: 0,
    price: 0,
    volume: 0,
  };
  for (let i = 0; i < currentProducts.value.length; i++) {
    allAmount.price += currentProducts.value[i].price;
    allAmount.count += currentProducts.value[i].count;
    allAmount.volume += currentProducts.value[i].volume;
  }
  return allAmount;
});
async function inputValue(param, category_id) {
  amount.value = param;
  incomeProductsParam.value.categoryId = category_id;
  products.value = await createOrdersStore.getProducts(
    incomeProductsParam.value
  );
}

watch(
  () => props.data.price_type_id,
  async (newValue) => {
    incomeProductsParam.value.priceTypeId = newValue;
    products.value = await createOrdersStore.getProducts(
      incomeProductsParam.value
    );
  }
);

watch(
  () => props.data.warehouse_id,
  async (newValue) => {
    incomeProductsParam.value.warehouseId = newValue;
    products.value = await createOrdersStore.getProducts(
      incomeProductsParam.value
    );
  }
);

const incomeStore = useIncomesStore("true");

onMounted(async () => {
  incomeProductsParam.value.categoryId = props.productCategory?.items[0]?.id;
  products.value = await createOrdersStore.getProducts(
    incomeProductsParam.value
  );
  if (!!route.query.id) {
    products.value = await createOrdersStore.getProducts(
      incomeProductsParam.value
    );
  }
});
</script>


<style scoped>
.bl-r {
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
}
/* Checked */
.form_radio_btn input[type="radio"]:checked + label {
  background: #299b9b;
  color: white;
  text-align: center;
  height: 44px;
}
.form_radio_btn input[type="radio"]:checked > .ch:last-child {
  background: #299b9b;
  color: white;
  text-align: center;
  height: 44px;
}
.order:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.order:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.bgc {
  background: #299b9b;
  color: white;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
</style>
