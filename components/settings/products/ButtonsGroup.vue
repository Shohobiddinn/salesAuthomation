<template>
  <div class="flex flex-row justify-items-start gap-4 mt-5">
    <m-btn @click="dialogStore.openDialog"> Добавить новый товар </m-btn>
    <m-btn @click="$router.push('/settings/products/add')">
      Добавить новый товар (2)
    </m-btn>
  </div>
  <div class="flex flex-row my-5">
    <button
      @click="$router.push('/settings/products/groups')"
      class="px-8 h-[42px] fs-14 fw-4 border-1 rounded-l-lg border-color-primary text-gray-3 hover:bg-gray-50 active:bg-gray-200"
    >
      Группа продуктов
    </button>
    <button
      @click="$router.push('/settings/products/brands')"
      class="px-8 h-[42px] fs-14 fw-4 border-1 -ml-1px border-color-primary text-gray-3 hover:bg-gray-50 active:bg-gray-200"
    >
      Бренд
    </button>
    <button
      @click="$router.push('/settings/products/producers')"
      class="px-8 h-[42px] fs-14 fw-4 border-1 -ml-1px border-color-primary text-gray-3 hover:bg-gray-50 active:bg-gray-200"
    >
      Производитель
    </button>
    <button
      @click="$router.push('/settings/products/segments')"
      class="px-8 h-[42px] fs-14 fw-4 border-1 -ml-1px rounded-r-lg border-color-primary text-gray-3 hover:bg-gray-50 active:bg-gray-200"
    >
      Сегменты
    </button>
  </div>
  <div class="border-b-1 -mx-4"></div>
  <div class="grid grid-cols-3 my-5 gap-4 pr-1 items-center">
    <div>
      <div class="secondary-gray-text fs-14 fw-4">Группа</div>
      <menu-btn
        class="w-full mt-2"
        @click="onOpenDropdown('product-group', $event)"
      >
        <template #btn>
          <m-btn-outlined
            class="border-primary-gray flex items-center w-full gap-2"
          >
            <fa-icon hash="&#xf078" />
            Выбрать
          </m-btn-outlined>
        </template>
        <template #content>
          <flex-col class="gap-2 max-h-88 overflow-auto">
            <search-input @change="search('product-group', $event)" />
            <FilterItems
              :data="productGroups"
              :selectedItems="selectedProductGroups"
              @onSelectItems="selectedProductGroups = $event"
              @onLoadElse="onLoadElseProductGroups"
            />
          </flex-col>
        </template>
      </menu-btn>
    </div>
    <div>
      <div class="secondary-gray-text fs-14 fw-4">Категория</div>
      <menu-btn
        class="w-full mt-2"
        @click="onOpenDropdown('product-category', $event)"
      >
        <template #btn>
          <m-btn-outlined
            class="border-primary-gray flex items-center w-full gap-2"
          >
            <fa-icon hash="&#xf078" />
            Выбрать
          </m-btn-outlined>
        </template>
        <template #content>
          <flex-col class="gap-2 max-h-88 overflow-auto">
            <search-input @change="search('product-category', $event)" />
            <FilterItems
              :data="productCategories"
              :selectedItems="selectedProductCategories"
              @onSelectItems="selectedProductCategories = $event"
              @onLoadElse="onLoadElseProductCategories"
            />
          </flex-col>
        </template>
      </menu-btn>
    </div>
    <div class="self-end">
      <div class="flex flex-row gap-4">
        <m-btn @click="onSetFilters"> Применить </m-btn>
        <sm-btn class="p-3">
          <IconReloadSVG />
        </sm-btn>
      </div>
    </div>
  </div>

  <transition name="modal">
    <div v-if="dialogStore.isDialogOpen">
      <u-modal @closeDialog="dialogStore.closeDialog">
        <SettingsProductsNewProductModalBody
          :atTrue="true"
          @closeDialog="closeNewProductModal"
        />
      </u-modal>
    </div>
  </transition>
</template>

<script setup>
// stores
const dialogStore = useDialogStore("products");
const productsStore = useProductsStore("");

// State
let newProductModal = ref(false);
const productGroups = ref(null);
const selectedProductGroups = ref([]);
const productGroupsParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: 'is_active',
      value: ['true']
    }
  ]
});
const productCategories = ref(null);
const selectedProductCategories = ref([]);
const productCategoriesParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: 'is_active',
      value: ['true']
    }
  ]
});

// Methods
function closeNewProductModal() {
  newProductModal.value = false;
}

const onOpenDropdown = async (state, value) => {
  if (state === "product-group" && !productGroups.value) {
    await getProductGroups();
    return;
  }
  if (state === "product-category" && !productCategories.value) {
    await getProductCategories();
    return;
  } else return;
};

const search = async (state, value) => {
  if (state === "product-group") {
    productGroupsParams.value.search = value;
    await getProductGroups();
    return;
  }
  if (state === "product-category") {
    productCategoriesParams.value.search = value;
    await getProductCategories();
    return;
  } else return;
};

const getProductGroups = async () => {
  productGroups.value = await productsStore.getProductGroups(
    productGroupsParams.value
  );
};

const onLoadElseProductGroups = async () => {
  productGroupsParams.value.page_size += 10;
  await getProductGroups();
};

const getProductCategories = async () => {
  productCategories.value = await productsStore.getProductCategories(
    productCategoriesParams.value
  );
};

const onLoadElseProductCategories = async () => {
  productCategoriesParams.value.page_size += 10;
  await getProductCategories();
};

const onSetFilters = () => {
  const isGroupFieldExists = productsStore.params.filter.find(
    (field) => field.field === "product_group_id"
  );
  if (isGroupFieldExists) {
    isGroupFieldExists.value = selectedProductGroups.value;
  } else {
    productsStore.params.filter.push({
      field: "product_group_id",
      value: selectedProductGroups.value,
    });
  }
  const isCategoryFieldExists = productsStore.params.filter.find(
    (field) => field.field === "category_id"
  );
  if (isCategoryFieldExists) {
    isCategoryFieldExists.value = selectedProductCategories.value;
  } else {
    productsStore.params.filter.push({
      field: "category_id",
      value: selectedProductCategories.value,
    });
  }
};
</script>

<style scoped></style>
