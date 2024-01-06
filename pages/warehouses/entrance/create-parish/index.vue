<template>
  <div>
    <div>
      <div class="flex justify-between">
        <button
          @click="$router.go(-1)"
          class="h-[44px] px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border"
        >
          <div class="flex">
            <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
            Назад
            <slot></slot>
          </div>
        </button>
      </div>
      <div class="mt-4">
        <rounded-white-container>
          <div class="grid grid-cols-2">
            <div class="">
              <page-title
                :title="route.query.id ? 'Рекдактрировать' : 'Добавить приход'"
              />
              <div class="mt-3">
                <div>
                  <div class="flex-row">
                    <span class="text-gray-3 fs-14 fw-4"> Дата прихода * </span>
                  </div>
                  <div class="flex-row mt-2">
                    <d-input-date-picker
                      withoutTime
                      :value="data.income_date"
                      @change="(v) => (data.income_date = v)"
                      class="w-full"
                    />
                  </div>
                </div>
              </div>

              <div class="w-full">
                <div class="secondary-gray-text fs-14 fw-4 mt-3">
                  Поставщик <span class="text-red-3 fs-14">*</span>
                </div>
                <menu-btn
                  class="w-full mt-2"
                  @click="onOpenDropdown($event, 'suppliers')"
                >
                  <template #btn>
                    <m-btn-outlined
                      class="border-primary-gray flex items-center w-full gap-2"
                    >
                      <fa-icon hash="&#xf078" />
                      {{
                        data.supplier_id
                          ? getSelectedName("suppliers", data.supplier_id)
                          : "Выбрать"
                      }}
                    </m-btn-outlined>
                  </template>
                  <template #content>
                    <flex-col class="gap-2 max-h-88 overflow-auto">
                      <FilterItems
                        :data="suppliers"
                        :selectedItems="data.supplier_id"
                        singleSelect
                        @onSingleItemSelect="data.supplier_id = $event"
                        @onLoadElse="onLoadElseSuppliers"
                      />
                    </flex-col>
                  </template>
                </menu-btn>
              </div>

              <div class="w-full">
                <div class="secondary-gray-text fs-14 fw-4 mt-3">
                  Склад <span class="text-red-3 fs-14">*</span>
                </div>
                <menu-btn
                  class="w-full mt-2"
                  @click="onOpenDropdown($event, 'warehouses')"
                >
                  <template #btn>
                    <m-btn-outlined
                      class="border-primary-gray flex items-center w-full gap-2"
                    >
                      <fa-icon hash="&#xf078" />
                      {{
                        incomeProductsParam.warehouseId
                          ? getSelectedName(
                              "warehouses",
                              incomeProductsParam.warehouseId
                            )
                          : "Выбрать"
                      }}
                    </m-btn-outlined>
                  </template>
                  <template #content>
                    <flex-col class="gap-2 max-h-88 overflow-auto">
                      <FilterItems
                        singleSelect
                        :data="warehouses.data"
                        :selectedItems="incomeProductsParam.warehouseId"
                        @onSingleItemSelect="
                          incomeProductsParam.warehouseId = $event
                        "
                        @onLoadElse="onLoadElseWarehouses"
                      />
                    </flex-col>
                  </template>
                </menu-btn>
              </div>

              <div class="w-full">
                <div class="secondary-gray-text fs-14 fw-4 mt-3">Категория</div>
                <menu-btn
                  class="w-full mt-2"
                  @click="onOpenDropdown($event, 'productCategories')"
                >
                  <template #btn>
                    <m-btn-outlined
                      class="border-primary-gray flex justify-between items-center w-full gap-2"
                    >
                      <div class="flex gap-3 items-center">
                        <fa-icon hash="&#xf078" />
                        <div v-if="selectedProductCategories.length">
                          {{getSelectedCategoriesNames}}
                        </div>
                        <span v-else>Выбрать</span>
                      </div>
                    </m-btn-outlined>
                  </template>
                  <template #content>
                    <flex-col class="gap-2 min-w-56 max-h-66 overflow-auto">
                      <search-input @change="onSearchDropDown($event, 'productCategories')" />
                      <FilterItems
                        :data="productsCategory.data"
                        :selectedItems="selectedProductCategoriesIds"
                        @onSelectItems="selectedProductCategoriesIds = $event"
                        @onLoadElse="onLoadElseProductCategories"
                      />
                    </flex-col>
                  </template>
                </menu-btn>
              </div>

              <div class="w-full">
                <div class="secondary-gray-text fs-14 fw-4 mt-3">
                  Тип цена <span class="text-red-3 fs-14">*</span>
                </div>
                <menu-btn
                  class="w-full mt-2"
                  @click="onOpenDropdown($event, 'priceTypes')"
                >
                  <template #btn>
                    <m-btn-outlined
                      class="border-primary-gray flex items-center w-full gap-2"
                    >
                      <fa-icon hash="&#xf078" />
                      {{
                        priceTypeId.id
                          ? getSelectedName("priceTypes", priceTypeId.id)
                          : "Выбрать"
                      }}
                    </m-btn-outlined>
                  </template>
                  <template #content>
                    <flex-col class="gap-2 max-h-88 overflow-auto">
                      <FilterItems
                        singleSelect
                        :data="priceType.data"
                        :selectedItems="priceTypeId.id"
                        @onSingleItemSelect="priceTypeId.id = $event"
                        @onLoadElse="onLoadelsePriceTypes"
                      />
                    </flex-col>
                  </template>
                </menu-btn>
              </div>

              <div class="w-full mt-3">
                <span class="fs-12">Комментарии </span>{{ data.value }}
                <d-input
                  placeholder="Введите ..."
                  class="w-full bg-input"
                  :value="data.comment"
                  @change="(v) => (data.comment = v)"
                ></d-input>
              </div>
            </div>
            <div v-if="data.products.length" class="p-3 mx-3 mt-4">
              <div class="text-[24px] font-[400]">
                Список добавленних товаров
              </div>
              <div
                class="rounded-lg bg-white border-grey mt-5 px-[2px] relative w-full overflow-y-auto"
              >
                <div
                  class="absolute p-2 flex justify-between bg-[#FAFDFD] bb-r bottom-0 w-full ml-[-2px] z-20 h-40px border-t border-[#E1E4E4]"
                >
                  <div class="fs-14">Итого</div>
                  <div class="fs-14">{{ allAmount.count }} шт</div>
                  <div class="fs-14 font-[600]">{{ allAmount.price }} сум</div>
                </div>
                <div class="-mt-5 table-containers h-[420px]">
                  <data-table
                    class="-pt-3"
                    :headers="productsTemplates"
                    @sort="sortData"
                    withInformationAboveHeader
                  >
                    <template #body v-if="data.products">
                      <c-tr>
                        <c-td-no-edit><span>Товар</span></c-td-no-edit>
                        <c-td-no-edit><span>Кол-во / объем</span></c-td-no-edit>
                        <c-td-no-edit><span>Сумма</span></c-td-no-edit>
                      </c-tr>
                      <c-tr
                        v-for="(item, index) in data.products.filter(
                          (it) => it.count && it.count > 0
                        )"
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
                            <div>{{ item["count"] }}шт</div>
                          </div>
                        </c-td-no-edit>
                        <c-td-no-edit>
                          <div class="py-2">
                            <div>
                              {{ item["price"] }}
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
        </rounded-white-container>
      </div>
      <div class="grid grid-cols-3 gap-4 mt-4">
        <div
          class="flex justify-center items-center h-[100px] rounded-lg bg-white"
        >
          <div class="flex">
            <div><IconFRRBox /></div>
            <div class="ml-4">
              <div class="fs-14 font-[600] ml-6">
                <span class="text-[#299B9B]">{{ allAmount.volume }}</span>
              </div>
              <div class="fs-14 text-[#8FA0A]">Общий объем</div>
            </div>
          </div>
        </div>
        <div
          class="flex justify-center items-center h-[100px] rounded-lg bg-white"
        >
          <div class="flex">
            <div><IconFRRCheck /></div>
            <div class="ml-4">
              <div class="fs-14 font-[600] ml-6">
                <span class="text-[#199305]">{{ allAmount.count }}</span> ШТ
              </div>
              <div class="fs-14 text-[#8FA0A]">Количество заказов</div>
            </div>
          </div>
        </div>
        <div
          class="flex justify-center items-center h-[100px] rounded-lg bg-white"
        >
          <div class="flex">
            <div><IconCash1 /></div>
            <div class="ml-4">
              <div class="fs-14 font-[600]">
                <span class="text-[#3B0763]">{{ allAmount.price }} </span> UZS
              </div>
              <div class="fs-14 text-[#8FA0A]">Общая сумма</div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="incomeProductsParam.warehouseId && incomeProductsParam.categoryId"
      >
        <WarehousesEntranceCreateParishTable
          @products="productsF"
          :data="data"
          :categoryGroup="selectedProductCategories"
          :groupCategory="groupCategory"
          :param="incomeProductsParam"
        />
      </div>
      <div class="flex justify-end m-4">
        <m-btn @click="save">{{
          !route.query.id ? "Создать" : "Сохранить"
        }}</m-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from "vue";
import { IncomeModel } from "~/interfaces/api/income-model";
import { notify } from "@kyvg/vue3-notification";
import { Template } from "~/interfaces/ui/template";
import moment from "moment";

// stores
const priceType = usePriceTypesStore("true");
const productsCategory = useProductCategoryStore("true");
// const categoryGroup = useCategoryGroupsStore("true");
const warehouses = useWarehousesStore("true");
const incomeStore = useIncomesStore("true");

// states
const router = useRouter();
const route = useRoute();
const products = ref("");
const newProducts = ref("");
const suppliers = ref(null);
const productsTemplates: Ref<Template[]> = ref([]);
const selectedProductCategoriesIds: Ref<string[]> = ref([]);
const selectedProductCategories = ref([])
const priceTypeId = ref({
  id: null,
}) as any;

const data: Ref<IncomeModel> = ref({
  products: [],
  supplier_id: "",
  price_type_id: "",
  warehouse_id: "",
  income_date: moment().format('YYYY-MM-DD'),
  comment: "",
});

const incomeProductsParam = ref({
  priceTypeId: null,
  warehouseId: null,
  categoryId: null,
});

const groupCategory = ref({
  isActive: true,
  index: -1,
});

const allAmount = ref({
  price: 0,
  volume: 0,
  count: 0,
});


const suppliersParams = ref({
  page: 1,
  page_size: 10,
  search: "",
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: "is_active",
      value: ["true"],
    },
  ],
});

// hooks
onMounted(async () => {
  await productsCategory.getData()
  
  if (!!route.query.id) {
    await getSuppliers()
    await getPriceTypes()
    await getWarehouses()
    groupCategory.value.index = 0;
    incomeStore.getWithId(route.query.id).then(() => {
      data.value = incomeStore.income;
      priceTypeId.value.id = incomeStore.income.price_type_id;
      incomeProductsParam.value.priceTypeId = incomeStore.income.price_type_id;
      selectedProductCategoriesIds.value = incomeStore.income.products.map((product: any) => product.category_id)
      incomeProductsParam.value.warehouseId = incomeStore.income.warehouse_id;
      data.value.comment = incomeStore.income.comment;
      data.value.income_date = moment(incomeStore.income.created_date).format(
        "YYYY-MM-DD"
      );
      productsF(incomeStore.income.products)
    });
  } else {
    groupCategory.value.index = 0;
  }
});

watch(
  () => incomeProductsParam.value.warehouseId,
  async (newValue) => {
    incomeProductsParam.value.priceTypeId = newValue;
    incomeProductsParam.value.categoryId =
      selectedProductCategoriesIds.value[0]
    groupCategory.value.index = 0;
    await incomeStore.getProducts(incomeProductsParam.value);
  }
);

watch(
  () => priceTypeId.value.id,
  async (newValue) => {
    incomeProductsParam.value.priceTypeId = newValue;
    incomeProductsParam.value.categoryId =
      selectedProductCategoriesIds.value[0]
    groupCategory.value.index = 0;
    await incomeStore.getProducts(incomeProductsParam.value);    
  }
);

watch(
  () => selectedProductCategoriesIds.value,
  async (newValue) => {
    // await categoryGroup.groupCategories(newValue);
    incomeProductsParam.value.categoryId = selectedProductCategoriesIds.value[0]
    groupCategory.value.index = 0;
    await incomeStore.getProducts(incomeProductsParam.value);
    selectedProductCategories.value = productsCategory.data?.items?.filter(category => selectedProductCategoriesIds.value.includes(category.id))

  }
);

const getSelectedCategoriesNames = computed(() => {
  const namesArr = selectedProductCategories.value.map((category: any) => category.name)
  if(namesArr.length > 4) {
    return namesArr.slice(0, 4).join(', ') + ` и eщё ${namesArr.length - 4}`
  }
  return namesArr?.join(', ')
})

// methods
const onOpenDropdown = async (value: any, state: string) => {
  if (state === "suppliers" && !suppliers.value) {
    await getSuppliers();
    return;
  }
  if (state === "warehouses" && !warehouses.data?.items) {
    await getWarehouses();
    return;
  }
  if (state === "priceTypes" && !priceType.data?.items) {
    await getPriceTypes();
    return;
  }
  if (state === "productCategories" && !productsCategory.data?.items) {
    await productsCategory.getData(true);
    return;
  } else return;
};

const onSearchDropDown = async (value: string, state: string) => {
  if(state === 'productCategories') {
    productsCategory.params.search = value.toLowerCase()
  }
}

const getSelectedName = (state: string, selectedId: string) => {
  if (state === "suppliers" && suppliers.value) {
    return suppliers.value?.items?.find((item: any) => item.id === selectedId)
      ?.name || 'Выбрать';
  }
  if (state === "warehouses" && warehouses.data?.items) {
    return warehouses.data?.items?.find((item: any) => item.id === selectedId)
      ?.name;
  }
  if (state === "priceTypes" && priceType.data?.items) {
    return priceType.data?.items?.find((item: any) => item.id === selectedId)
      ?.name;
  }
  return "";
};

function incomeAmount(param: any) {
  allAmount.value = param;
}

function productsGet(param: any) {
  products.value = param;
}

function newProductPrice(param: any) {
  newProducts.value = param;
}

function productsF(products: any) {
  data.value.products = products;
  allAmount.value.price = data.value.products.reduce(
    (result, item) => result + item.price,
    0
  );
  allAmount.value.volume = data.value.products.reduce(
    (result, item) => Number(result) + Number(item.volume),
    0
  ) || 0;

  allAmount.value.count = Number(
    data.value.products.reduce((result, item) => Number(result) + Number(item.count), 0)
  );
}

const save = async (e: any) => {
  e.preventDefault();
  if (!data.value.products.length) {
    notify({ title: "Сначала добавьте товар!", type: "error" });
  } else {
    data.value.products = data.value.products.filter(
      (i) => !!i.count && i.count > 0
    );
    data.value.warehouse_id = incomeProductsParam.value.warehouseId;
    data.value.price_type_id = incomeProductsParam.value.priceTypeId;
    notify({ title: "Пожалуйста подождите!" });
    await incomeStore.add(data.value);
    await incomeStore.refresh();
    selectedProductCategoriesIds.value = []
    notify({ title: "Сохранено!" });
    router.push("/warehouses/entrance");
  }
};

const getSuppliers = async () => {
  suppliers.value = await warehouses.getSuppliers(suppliersParams.value);
};

const onLoadElseSuppliers = async () => {
  suppliersParams.value.page_size += 10;
  await getSuppliers();
};

const getWarehouses = async () => {
  await warehouses.getData(true);
};

const onLoadElseWarehouses = async () => {
  warehouses.params.page_size += 10;
};

const getPriceTypes = async () => {
  await priceType.getData(true);
};

const onLoadelsePriceTypes = async () => {
  priceType.params.page_size += 10;
};

const onLoadElseProductCategories = () => {
  productsCategory.params.page_size += 10;
};
</script>

<style scoped>
.bb-r {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}
::-webkit-scrollbar {
  width: 8px;
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
