<template>
  <div class="mt-4">
    <div class="font-[600] text-[24px] mb-3">Продукты</div>
    <div class="w-full">
      <div class="rounded-lg">
        <button
          v-for="(item, index) in categoryGroup"
          :key="item.id"
          @click="selectCategory(index, item.id)"
          :class="[
            groupCategory.isActive && param.categoryId === item.id
              ? 'order bgc'
              : '',
          ]"
          class="px-3 py-2 order bg-white"
        >
          {{ item?.name }}
        </button>
      </div>
    </div>
    <div>
      <div
        class="rounded-lg bg-white border-grey mt-3 px-[2px] relative w-full"
      >
        <div class="flex w-full absolute z-50 bottom-0 bg-white">
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
            :headers="incomeStore.productsTemplates"
            @sort="incomeStore.sortData"
            :sorted="incomeStore.params.order_by"
            :isEmpty="!incomeStore.products?.length"
          >
            <template #body>
              <c-tr
                v-for="(item, index) in incomeStore.products"
                :trBg="false"
                :key="index"
              >
                <c-td-no-edit>
                  <div class="py-2">
                    <div>
                      {{ item["product_name"] }}
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
                      <DInput
                        :type="'number'"
                        :value="currentProducts[index].blog"
                        @change="
                          (newVal) => (currentProducts[index].blog = newVal)
                        "
                        @input="
                          inputCalculate(
                            $event,
                            item.quantity_in_package,
                            item.price,
                            index,
                            item.volume,
                            item.product_id
                          )
                        "
                        class="w-1/3"
                      />
                    </div>
                  </div>
                </c-td-no-edit>
                <c-td-no-edit>
                  <div class="py-2">
                    <div>
                      <DInput
                        :value="currentProducts[index].count"
                        @change="
                          (newVal) => (currentProducts[index].count = newVal)
                        "
                        :type="'number'"
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
                        class="w-1/3"
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
import { data } from "autoprefixer";

// stores
const productCategory = useProductCategoryStore("true");
const incomeStore = useIncomesStore("true");

// props
const props = defineProps({
  param: Object,
  data: Object,
  categoryGroup: Array,
  queryId: String,
  groupCategory: Object,
});

// emits
const emit = defineEmits(["products"]);

// states
const amount = ref(0);

const product = {
  product_id: null,
  count: 0,
  blog: 0,
  price: 0,
  volume: 0,
};

// hooks
const allPrice = computed(() => {
  let allAmount = {
    product_id: null,
    count: 0,
    price: 0,
    volume: 0,
  };
  for (let i = 0; i < currentProducts.value.length; i++) {
    allAmount.price += currentProducts.value[i].price;
    allAmount.count += Number(currentProducts.value[i].count);
    allAmount.volume += parseFloat(currentProducts.value[i].volume);
  }
  return allAmount;
});

onMounted(async () => {
  await productCategory.getData(true);
  await incomeStore.getData(true);
  await incomeStore.getProducts(props.param);
});

// methods
function inputCalculate(event, quantity, price, index, volume, id) {
  if (!props.data.products) {
    props.data.products = [];
  }
  const item = currentProducts.value.find((it) => it.product_id === id);
  const datIndex = props.data.products.findIndex((it) => it.product_id === id);
  if (event.target.value >= 0) {
    const calculated = {
      blog: event.target.value,
      count: event.target.value * quantity,
      price: event.target.value * quantity * price,
      volume: event.target.value * quantity * volume,
    };
    if (datIndex > -1) {
      props.data.products[datIndex] = { ...item, ...calculated };
    } else {
      props.data.products.push({ ...item, ...calculated });
    }
  }
  emit("products", props.data.products);
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
  emit("products", props.data.products);
}

const currentProducts = computed({
  get: () => {
    const inProducts = [];
    if (incomeStore.products && incomeStore.products.length > 0) {
      incomeStore.products.forEach((it) => {
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
  },
});

async function selectCategory(index, category_id) {
  props.groupCategory.isActive = true;
  props.groupCategory.index = index;
  props.param.categoryId = category_id;
  await incomeStore.getProducts(props.param);
}
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
</style>
