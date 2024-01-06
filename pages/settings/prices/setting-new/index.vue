<template>
  <div>
    <rounded-white-container>
      <div class="flex flex-row">
        <button @click="$router.push('/settings/prices')"
          class="px-6 border-1 py-2 fs-16 fw-4 flex items-center gap-3 rounded-lg hover:bg-gray-50 active:bg-gray-100">
          <IconBackArrowSVG /> Назад
        </button>
      </div>
      <div class="grid grid-cols-3 mt-6">
        <div>
          <span class="fs-18 fw-6"> Установка новый цен </span>
        </div>
        <div class="flex justify-self-start gap-6 items-center w-[100%]">
          <div v-for="(i, index) in priceType.data?.items" :key="i.id" class="flex gap-2 pb-2">
            <input type="radio" :value="index" name="price" :checked="selectedPriceTypeId === i?.id"
              @change="selectedPriceTypeId = i?.id" />
            <span class="text-gray-3 fs-14 fw-4">
              {{ i.name }}
            </span>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-7 gap-6 mt-4">
        <div class="col-span-2">
          <div class="w-full border-1 border-primary-gray rounded-lg">
            <div class="settings-content-item rounded-lg">
              <div v-for="menu in productCategory.data?.items" :key="menu"
                class="settings-sidebar last:rounded-b-lg last:border-0 first:rounded-t-lg"
                :class="{ activeColor: menu.id === selectedCategoryId }">
                <div @click="selectedCategoryId = menu.id">
                  {{ menu.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-5">
          <SettingsPricesSettingNewDataTable :data="data" :products="products[selectedPriceTypeId]"
            :isLoading="isProductsLoading" @onChangePrice="onChangeProductPrice" />
          <div class="flex items-center gap-3 justify-end p-4">
            <m-btn-outlined :class="{ 'cursor-not-allowed': !data.length }" @click="onSavePricesWithoutHistory">Сохранить
              (без
              истории)</m-btn-outlined>
            <m-btn :disabled="!data.length" @click="onSavePrices">Сохранить</m-btn>
          </div>
        </div>
      </div>
    </rounded-white-container>
    <loading-modal v-if="productCategory.loading" name="Управление меню таблицы">
      <Loading />
    </loading-modal>
  </div>
</template>

<script setup lang="ts">
import { notify } from "@kyvg/vue3-notification";
import { Ref } from "vue";

// Stores
const productCategory = useProductCategoryStore("true");
const priceType = usePriceTypesStore("true");
const priceStore = usePriceStore("true");

// States
const router = useRouter();
const route = useRoute();
const selectedPriceTypeId: Ref<string> = ref(route.query.priceTypeId);
const selectedCategoryId: Ref<string | undefined> = ref();
const products = ref([]);
const isProductsLoading: Ref<boolean> = ref(false);
const data = ref([]) as any;

// Methods
async function getProducts(_categoryId: string) {
  isProductsLoading.value = true;
  products.value = {}
  products.value[selectedPriceTypeId.value] = await priceStore.getProducts(
    _categoryId,
    selectedPriceTypeId.value
  );
  isProductsLoading.value = false;
}

const getProductsByPriceTypeId = async (_priceTypeId: string) => {
  isProductsLoading.value = true;
  if (Object.keys(products.value).includes(_priceTypeId)) {
    isProductsLoading.value = false;
    return;
  } else {
    const _data = await priceStore.getProducts(
      selectedCategoryId.value,
      _priceTypeId
    );
    if (_data?.length) {
      products.value[selectedPriceTypeId.value] = _data;
    }
  }
  isProductsLoading.value = false;
};

const onChangeProductPrice = (productData: any) => {
  const isPriceTypeIdExist = data.value.find(
    (item: any) => item.price_type_id === selectedPriceTypeId.value
  );
  if (isPriceTypeIdExist) {
    const isProductExist = isPriceTypeIdExist.products.find(
      (product: any) => product.product_id === productData.product_id
    );
    if (isProductExist) {
      isProductExist.cost = productData.cost;
    } else {
      isPriceTypeIdExist.products.push(productData);
    }
  } else {
    data.value.push({
      price_type_id: selectedPriceTypeId.value,
      products: [productData],
    });
  }
};

const onSavePrices = async () => {
  if (data.value.length) {
    notify({ title: "Пожалуйста подождите!" });
    await priceStore.onSavePrice(data.value);
    router.push("/settings/prices");
    notify({ title: "Сохранено!" });
  } else return
};

const onSavePricesWithoutHistory = async () => {
  if (data.value.length) {
    notify({ title: "Пожалуйста подождите!" });
    await priceStore.onSavePriceWithoutHistory(data.value);
    router.push("/settings/prices");
    notify({ title: "Сохранено!" });
  } else return
};

// hooks
onMounted(async () => {
  await Promise.all([productCategory.getData(true), priceType.getData(true)]);
  selectedCategoryId.value = productCategory.data?.items[0]?.id;
});

watch(
  () => selectedCategoryId.value,
  async (newValue) => {
    await getProducts(newValue);
  }
);

watch(
  () => selectedPriceTypeId.value,
  async (newValue) => {
    await getProductsByPriceTypeId(newValue);
  }
);
</script>

<style scoped>
input[type="radio"] {
  /* ...existing styles */
  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #299b9b;
  border: 1px solid #cccccc;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
}

input[type="radio"]:checked::before {
  transform: scale(1);
}
</style>
