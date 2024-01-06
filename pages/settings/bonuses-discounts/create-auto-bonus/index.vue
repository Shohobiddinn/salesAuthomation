<template>
  <div>
    <div>
      <transparent-btn @click="$router.push('/settings/bonuses-discounts')">
        <fa-icon hash="&#xf060"/> Назад
      </transparent-btn>
    </div>
    <div class="mt-4 text-[24px] font-[600]">Создание автобонуса</div>
    <form id="app" class="w-full" @submit="save">
      <div class="mt-3" v-click-outside="clickOutside">
        <rounded-white-container>
          <div class="grid grid-cols-4 gap-4">
            <div>
              <div class="flex-row">
                <d-input
                  placeholder="Введите"
                  class="w-full"
                  title="Название"
                  :required="true"
                  :value="data.name"
                  @change="(v) => (data.name = v)"
                  type="text"
                />
              </div>
            </div>
            <flex-col class="gap-2">
              <div class="flex-row">
                <div class="text-gray-3 fs-14">
                  Тип бонуса <span class="text-red-3 fs-14">*</span>
                </div>
              </div>
              <menu-btn class="h-11 w-full mt-0.75">
                <template #btn>
                  <m-btn-outlined
                    @click="onOpenDropDown('bonusTypes')"
                    class="border-grey h-11 flex items-center w-full gap-2"
                  >
                    <fa-icon hash="&#xf078" />
                    {{
                      data?.bonus_type?.id
                        ? getSelectedName("bonusTypes", data.bonus_type.id)
                        : "Выбрать"
                    }}
                  </m-btn-outlined>
                </template>
                <template #content>
                  <div class="overflow-auto max-h-66 pr-4">
                    <FilterItems
                      :data="bonusTypes"
                      singleSelect
                      :selectedItems="data?.bonus_type?.id"
                      @onSingleItemSelect="onAddBonusType"
                    />
                  </div>
                </template>
              </menu-btn>
            </flex-col>
            <div>
              <div class="flex-row">
                <span class="text-gray-3 fs-14 fw-4"> Действителен с </span>
              </div>
              <div class="flex-row mt-2">
                <d-input-date-picker
                  :value="data.valid_from"
                  @change="(v) => (data.valid_from = v)"
                  placeholder="Введите"
                  class="w-full"
                  type="text"
                />
              </div>
            </div>
            <div>
              <div class="flex-row">
                <span class="text-gray-3 fs-14 fw-4"> Действителен по </span>
              </div>
              <div class="flex-row mt-2">
                <d-input-date-picker
                  :value="data.valid_to"
                  @change="(v) => (data.valid_to = v)"
                  placeholder="Введите"
                  class="w-full"
                  type="text"
                />
              </div>
            </div>
            <div>
              <div class="mb-2 fs-12">Категория клиента</div>
              <MultiSelect
                @clear="data.bonus_client_categories = []"
                :data="clientCategory.data?.items"
                field_name="client_category_id"
                :selected_id="data.bonus_client_categories"
                class="w-full"
              ></MultiSelect>
            </div>
            <div>
              <div class="mb-2 fs-12">Тип оплаты</div>
              <MultiSelect
                @clear="data.currencies = []"
                :data="paymentType.data?.items"
                field_name="currency_id"
                :selected_id="data.currencies"
                class="w-full"
              ></MultiSelect>
            </div>
            <div>
              <div class="mb-2 fs-12">Агент</div>
              <MultiSelect
                @clear="data.agents = []"
                :agent="true"
                :data="agentsStore.data?.items"
                field_name="agent_id"
                :selected_id="data.agents"
                class="w-full"
              ></MultiSelect>
            </div>
            <div>
              <div class="mb-2 fs-12">Город</div>
              <MultiSelect
                @clear="data.territories = []"
                :data="territory.data?.items"
                field_name="territory_id"
                :selected_id="data.territories"
                class="w-full"
              ></MultiSelect>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div class="mb-2 fs-12">Тип цены</div>
              <MultiSelect
                @clear="data.price_types = []"
                :data="priceType.data?.items"
                field_name="price_type_id"
                :selected_id="data.price_types"
                class="w-full"
              ></MultiSelect>
            </div>
            <div>
              <div class="flex mt-8">
                <div class="check flex-row mt-2">
                  <label>
                    <input v-model="data.in_block" type="checkbox" />
                    <span></span>
                  </label>
                </div>
                <div class="flex-row mt-2 ml-3">В Блоках</div>
              </div>
            </div>
          </div>
        </rounded-white-container>
      </div>
      <div class="mt-6">
        <rounded-white-container>
          <div class="text-[20px] font-[600]">Условии</div>
          <div v-if="data.terms !== undefined">
            <div
              v-for="(i, index) in data.terms"
              :key="i"
              class="grid grid-cols-4 gap-4 mt-4"
            >
              <div>
                <div class="flex-row">
                  <span class="text-gray-3 fs-14 fw-4">
                    Минимальное количество
                  </span>
                </div>
                <div class="flex-row mt-2">
                  <d-input
                    placeholder="Введите"
                    class="w-full"
                    :required="true"
                    :value="i.min"
                    @change="(v) => (i.min = v)"
                    type="number"
                  />
                </div>
              </div>
              <div>
                <div class="flex-row">
                  <span class="text-gray-3 fs-14 fw-4">
                    На какое количество*?
                  </span>
                </div>
                <div class="flex-row mt-2">
                  <d-input
                    placeholder="Введите"
                    class="w-full"
                    :required="true"
                    :value="i.value"
                    @change="(v) => (i.value = v)"
                    type="number"
                  />
                </div>
              </div>
              <div>
                <div class="flex-row">
                  <span class="text-gray-3 fs-14 fw-4">
                    Количество бонуса*
                  </span>
                </div>
                <div class="flex-row mt-2">
                  <d-input
                    placeholder="Введите"
                    class="w-full"
                    :required="true"
                    :value="i.count"
                    @change="(v) => (i.count = v)"
                    type="number"
                  />
                </div>
              </div>
              <div>
                <div class="flex-row">
                  <span class="text-gray-3 fs-14 fw-4">
                    Максимальное количество
                  </span>
                </div>
                <div class="flex mt-2">
                  <d-input
                    placeholder="Введите"
                    class="w-full"
                    :required="true"
                    :value="i.max"
                    @change="(v) => (i.max = v)"
                    type="number"
                  />
                  <div
                    @click="deleteF(index)"
                    class="mt-3 ml-2 w-[30px] cursor-pointer"
                  >
                    <IconTrash />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4 flex justify-end">
            <button
              @click="addMore"
              class="fs-14 border border-[#299B9B] rounded-lg px-6 p-2"
            >
              Добавить еще
            </button>
          </div>
        </rounded-white-container>
        <div>
          <div class="mt-4 w-[400px] rounded-lg bg-white flex justify-around">
            <div v-for="i in tabs" :key="i" class="flex">
              <div class="mt-2 mb-3">
                <input
                  class="mt-1"
                  @input="inputValue(i.number)"
                  type="radio"
                  name="product"
                  :value="amount"
                  :checked="amount === i.number"
                />
              </div>
              <label class="mt-2 fs-14">{{ i.name }}</label>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-4">
          <div>
            <div class="font-bold mt-2">Продукты</div>
            <div
              class="border rounded-lg bg-white w-full h-[344px] mr-3 mt-2 relative"
            >
              <div class="absolute z-50 h-[55px] bg-[#fff] w-[93%] tara-search">
                <div class="mt-2 ml-[12px]">
                  <search-input-border-none @updated="onSearchProductCategory('productCategories', $event)"/>
                </div>
              </div>
              <div class="w-[98%] h-full tara-content">
                <div class="mr-3 pt-[55px] h-full tara-content-item">
                  <div
                    v-for="productCategory in productCategories"
                    :key="productCategory.id"
                    class="p-[10px] tara-child"
                  >
                    <div
                      @click="openProducts(productCategory?.id)"
                      class="flex mt-1 check"
                    >
                      <label>
                        <input
                          @input="allProductFromSelect(productCategory.id)"
                          type="checkbox"
                        />
                        <span></span>
                      </label>
                      <div class="ml-[10px]">{{ productCategory.name }}</div>
                      <div class="flex justify-end ml-[20px] mt-2">
                        <IconTopArrow v-if="tara.isActive && tara.id === productCategory.id" />
                        <IconBottomArrow v-else/>
                      </div>
                    </div>
                    <div
                      v-if="tara.isActive && tara.id === productCategory.id"
                      class="check"
                    >
                      <div v-if="productsBySelectedCategoryId?.length">
                        <div
                          v-for="(itemChild, itemIndex) in productsBySelectedCategoryId"
                          :key="itemIndex"
                          class="flex"
                        >
                          <label :for="itemChild.id" class="flex">
                            <label>
                              <input
                                :checked="
                                  data.from_products.find(
                                    (i) => i.product_id === itemChild.id
                                  )
                                "
                                type="checkbox"
                                @change="selectProduct(itemChild.id, itemIndex)"
                                :id="itemChild.id"
                              />
                              <span></span>
                            </label>
                            <div class="ml-[10px]">{{ itemChild.name }}</div>
                          </label>
                        </div>
                      </div>
                      <div v-else>
                        Нет продуктов
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="font-bold mt-2">Бонусные продукты*</div>
            <div
              class="border rounded-lg bg-white w-full h-[344px] mr-3 mt-2 relative"
            >
              <div class="absolute z-50 h-[55px] bg-[#fff] w-[93%] tara-search">
                <div class="mt-2 ml-[12px]">
                  <search-input-border-none @updated="onSearchProductCategory('bonusCategories', $event)"></search-input-border-none>
                </div>
              </div>
              <div class="w-[98%] h-full tara-content">
                <div class="mr-3 pt-[55px] h-full tara-content-item">
                  <div
                    v-for="productCategory in bonusProductCategories"
                    :key="productCategory.id"
                    class="p-[10px] tara-child"
                  >
                    <div
                      @click="openProductsTo(productCategory?.id)"
                      class="flex mt-1 check"
                    >
                      <label>
                        <input
                          @input="allProductToSelect(productCategory?.id)"
                          type="checkbox"
                        />
                        <span></span>
                      </label>
                      <div class="ml-[10px]">{{ productCategory?.name }}</div>
                      <div class="flex justify-end ml-[20px] mt-2">
                        <IconTopArrow v-if="tara.isActiveTo && tara.id === productCategory.id" />
                        <IconBottomArrow v-else />
                      </div>
                    </div>
                    <div
                      v-if="tara.isActiveTo && tara.id === productCategory.id"
                      class="check"
                    >
                      <div v-if="productsBySelectedCategoryId?.length">
                        <div
                        v-for="(itemChild, itemIndex) in productsBySelectedCategoryId"
                        :key="itemIndex"
                        class="flex"
                      >
                        <label :for="itemIndex" class="flex">
                          <label>
                            <input
                              :checked="
                                data.to_products.find(
                                  (i) => i.product_id === itemChild.id
                                )
                              "
                              :id="itemIndex"
                              type="checkbox"
                              @change="selectProductTo(itemChild.id, itemIndex)"
                            />
                            <span></span>
                          </label>
                          <div class="ml-[10px]">{{ itemChild.name }}</div>
                        </label>
                      </div>
                      </div>
                      <div v-else>
                        Нет продуктов
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-2 mb-3 flex justify-end">
          <i-btn type="submit">Сохранить</i-btn>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import {
  Agents,
  BonusesClientCategories,
  BonusesModel,
  CurrencyId,
  DiscountModel,
  FromProduct,
  PriceType,
  Terms,
  Territory,
  ToProduct,
} from "~/interfaces/api/bonuses-discounts-models";
import { notify } from "@kyvg/vue3-notification";
import moment from "moment";
import { ProductsModel } from "~~/interfaces/api/products-model";
import { ProductCategoryModel } from "~~/interfaces/api/product-category-model";

// Stores
const productStore = useProductsStore("true");
const productCategoryStore = useProductCategoryStore("false");
const bonusesStore = useBonusesStore("true");
const paymentType = useCurrenciesStore("tue");
const priceType = usePriceTypesStore("tue");
const territory = useTerritoriesStore("true");
const agentsStore = useAgentsStore("true");
const clientCategory = useClientCategoriesStore("true");

// States
const productsBySelectedCategoryId: Ref<ProductsModel[] | undefined> = ref()
const selectedProductcategoryId: Ref<string> = ref('')
const productCategories: Ref<ProductCategoryModel[] | undefined> = ref()
const bonusProductCategories: Ref<ProductCategoryModel[] | undefined> = ref()
const bonusTypes: Ref<any> = ref({
  items: null
})

const data: Ref<BonusesModel> = ref({
  from_products: [],
  to_products: [],
  currencies: [],
  price_types: [],
  territories: [],
  agents: [],
  name: "",
  bonus_client_categories: [],
  terms: [
    {
      min: null,
      value: null,
      count: null,
      max: null,
    },
  ],
  is_public: true,
  valid_from: moment().format("YYYY-MM-DDT00:00"),
  valid_to: moment().format("YYYY-MM-DDT23:59"),
});

const route = useRoute();
const router = useRouter();
const tabs = ref([
  {
    name: "Для всех клиентов",
    number: 1,
    tab: "tab1",
  },
  {
    name: "Для избранных клиентов",
    number: 2,
    tab: "tab2",
  },
]);

const filters = ref({
  isAgent: false,
  categoryClient: false,
  paymentType: false,
  territory: false,
  priceType: false,
});

const productCategoriesParams = ref({
  page: 1,
  page_size: 100,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: "is_active",
      value: ['true'],
    },
  ],
})

const tara = ref({
  isActive: false,
  isActiveTo: false,
  id: '',
});

const date = ref({
  toDate: "",
  fromDate: "",
});

const amount = ref(1);
const checkProduct = ref(false);

// hooks
onMounted(async () => {
  if(productStore.params.page_size === 100) {
    await productStore.getData(true, '')
  } else productStore.params.page_size = 100
  productCategories.value = await productCategoryStore.getCategoriesByManualParams(productCategoriesParams.value)
  await paymentType.getData(true);
  await priceType.getData(true);
  await territory.getData(true);
  await agentsStore.getData(true);
  await clientCategory.getData(true);
  if (!!route.query.id) {
    await bonusesStore.getWithId(route.query.id);
    data.value = bonusesStore.clientId;
  }


  try {
    bonusProductCategories.value = JSON.parse(JSON.stringify(productCategories.value))
  } catch (error) {
    console.log(error);
  }
});

watchEffect(() => {
  if(selectedProductcategoryId.value) {
    productsBySelectedCategoryId.value = productStore.data?.items.filter((product: ProductsModel) => product.category_id === selectedProductcategoryId.value)
  }
})

// methods
const onOpenDropDown = async (state: string, value: any) => {
  if(state === 'bonusTypes' && !bonusTypes.value.items) {
    await getBonusesTypes();
  }
  return
}

const getSelectedName = (state: string, selectedId: number) => {
  console.log(selectedId, 'selectedID');
  
  if(state === 'bonusTypes' && bonusTypes.value) {
    return bonusTypes.value.items?.find((bonus: any) => bonus.id === Number(selectedId))?.name
  }
  return ''
}

const getBonusesTypes = async () => {
  await bonusesStore.getBonusesTypes()
  bonusTypes.value.items = bonusesStore.bonusesType;
}

const onAddBonusType = (newValue: number) => {
  console.log(newValue, 'newValue');
  const name = getSelectedName("bonusTypes", newValue)
  data.value.bonus_type = {
    id: newValue,
    name,
  }
}

function clickOutside() {
  filters.value.isAgent = false;
  filters.value.categoryClient = false;
  filters.value.paymentType = false;
  filters.value.territory = false;
  filters.value.priceType = false;
}

function inputValue(param: any) {
  amount.value = param;
  if (amount.value === 1) {
    data.value.is_public = true;
    data.value.is_special = false;
  } else if (amount.value === 2) {
    data.value.is_special = true;
    data.value.is_public = false;
  }
}

function addMore() {
  data.value.terms.push({
    min: 0,
    value: 0,
    count: 0,
    max: 0,
  });
}

function deleteF(index: any) {
  data.value.terms.splice(index, 1);
}

const selectProduct = (id: any, index: any) => {
  const isExist = data.value.from_products.find((i) => i.product_id === id);
  if (isExist) {
    data.value.from_products.filter((product: any) => product.id !== id);
  } else {
    data.value.from_products.push({ product_id: id });
  }
};

const selectProductTo = (id: any, index: any) => {
  const isExist = data.value.to_products.find((i) => i.product_id === id);
  if (isExist) {
    data.value.to_products.filter((product: any) => product.id !== id);
  } else {
    data.value.to_products.push({ product_id: id });
  }
};

const openProducts = async (id: string) => {
  if (tara.value.id === id) {
    tara.value.isActive = false;
    tara.value.isActiveTo = false;
    tara.value.id = '';
  } else {
    tara.value.isActive = true;
    tara.value.isActiveTo = false;
    tara.value.id = id;
  }
  
  selectedProductcategoryId.value = id
};

async function allProductFromSelect(id: any) {
  checkProduct.value = true;
  await productStore.getData(true, id);
  if (data.value.from_products.length > 0) {
    data.value.from_products = [];
  } else {
    data.value.from_products = productStore.data?.items.map((item) => ({
      product_id: item.id,
    }));
  }
}

async function allProductToSelect(id: any) {
  checkProduct.value = true;
  await productStore.getData(true, id);
  if (data.value.to_products.length > 0) {
    data.value.to_products = [];
  } else {
    data.value.to_products = productStore.data?.items.map((item) => ({
      product_id: item.id,
    }));
  }
}

const openProductsTo = async (id: string) => {
  if (tara.value.id === id) {
    tara.value.isActiveTo = false;
    tara.value.isActive = false;
    tara.value.id = ''
  } else {
    tara.value.isActiveTo = true;
    tara.value.isActive = false;
    tara.value.id = id;
  }
  
  selectedProductcategoryId.value = id
};

const save = async (e: any) => {
  e.preventDefault();
  notify({ title: "Пожалуйста подождите!" });
  if (data.value.name !== "") {
    await bonusesStore.add(data.value);
    await bonusesStore.refresh();
    router.push("/settings/bonuses-discounts");
    data.value.id = "";
    data.value.is_active = false;
    data.value.bonus_type = "";
    data.value.name = "";
    data.value.valid_from = "";
    data.value.valid_to = "";
    data.value.in_block = false;
    data.value.is_public = false;
    data.value.is_special = false;
    data.value.bonus_client_categories = [];
    data.value.currencies = [];
    data.value.agents = [];
    data.value.territories = [];
    data.value.price_types = [];
    data.value.terms = [];
    data.value.from_products = [];
    data.value.to_products = [];
    notify({ title: "Сохранено!" });
  }
};

const onSearchProductCategory = async (state: string, newVal: string) => {
  if(state === 'productCategories') {
    productCategories.value = productCategories.value?.filter((item: ProductCategoryModel) => item.name.toLocaleLowerCase().includes(newVal.toLocaleLowerCase()))
    if(!newVal) {
      productCategories.value = await productCategoryStore.getCategoriesByManualParams(productCategoriesParams.value)
    }
    return
  }
  else if(state === 'bonusCategories') {
    bonusProductCategories.value = bonusProductCategories.value?.filter((item: ProductCategoryModel) => item.name.toLocaleLowerCase().includes(newVal.toLocaleLowerCase()))
    if(!newVal) {
      const data = await productCategoryStore.getCategoriesByManualParams(productCategoriesParams.value)
      try {
        bonusProductCategories.value = JSON.parse(JSON.stringify(data))
      } catch (error) {
        console.log(error);
      }
    }
    return
  }
}
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
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #ffffff;
  z-index: 1;
}

.dropdown-content a {
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.show {
  display: block;
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
.tara-content {
  overflow-y: scroll;
  cursor: pointer;
}
.tara-search {
  border-bottom: 1px solid #e1e4e4;
  border-top-left-radius: 8px;
}
.tara-content-item {
  border-right: 1px solid #e1e4e4;
}
.tara-child {
  border-bottom: 1px solid #e1e4e4;
}
</style>
