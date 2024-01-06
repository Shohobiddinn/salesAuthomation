<template>
  <div>
    <div>
      <button
        @click="$router.go(-1)"
        class="h-11 px-11 mt-4 bg-white text-black rounded-lg border"
      >
        <span class="flex">
          <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
          Назад
          <slot></slot>
        </span>
      </button>
      <div class="flex justify-between">
        <page-title :title="'Движения товаров на складе'" />
        <m-btn class="w-50">Сохранить</m-btn>
      </div>
      <rounded-white-container class="mt-6">
        <div class="grid grid-cols-3 gap-4 w-full">
          <multiply-selection
            :name="'Склад'"
            :filter.sync="filter.isSelectWarehouse"
            @toggle="(toggle) => (filter.isSelectWarehouse = toggle)"
          />
          <multiply-selection
            :name="'Поставщик'"
            :filter.sync="filter.isSelectWarehouse"
            @toggle="(toggle) => (filter.isSelectWarehouse = toggle)"
          />
          <multiply-selection
            :name="'Тип цены'"
            :filter.sync="filter.isSelectProduct"
            @toggle="(toggle) => (filter.isSelectProduct = toggle)"
          />
        </div>
      </rounded-white-container>
      <div class="mt-6">
        <div class="my-3 w-full overflow-auto bg-white border rounded-lg">
          <data-table
            :headers="headers"
            class=""
            @sort="sortData"
            :sorted="sortedData"
          >
            <template class="px-4" #body>
              <tr v-for="(key, index) in enteredData" :key="key">
                <td class="px-4 py-2.5">
                  <div class="flex justify-center w-full">
                    <div class="w-full fs-14">1</div>
                  </div>
                </td>
                <td class="px-4 py-2.5">
                  <div class="flex w-full fs-14">2316</div>
                </td>
                <td class="px-4 py-2.5">
                  <div class="flex justify-center w-full fs-14">
                    <div class="w-full mr-1">Lorem ipsum lorem ipsum</div>
                    <button @click="productModal = true"><IconEdit /></button>
                  </div>
                </td>
                <td class="px-4 py-2.5">
                  <d-input
                    placeholder="Введите"
                    type="number"
                    class="w-full"
                    :value="key.quantity_in_package"
                    @change="(value) => (key.quantity_in_package = value)"
                  />
                </td>
                <td class="px-4 py-2.5">
                  <d-input
                    placeholder="Введите"
                    type="text"
                    class="w-full"
                    :value="yourState"
                    @updated="setInput"
                  />
                </td>
                <td class="px-4 py-2.5">
                  <div class="flex justify-center w-full">
                    <div class="w-full">
                      <d-input
                        placeholder="Введите"
                        type="text"
                        class="w-full"
                        :value="yourState"
                        @updated="setInput"
                      />
                    </div>
                  </div>
                </td>
                <td class="px-4 py-2.5">
                  <div class="flex justify-center w-full">
                    <div class="w-full fs-14">10 000 000</div>
                  </div>
                </td>
                <td class="px-4 py-2.5 fs-14">10 000 000</td>
                <td>
                  <sm-btn @click="deleteF(index)" class="text-red-500 p-2">
                    <fa-icon hash="&#xf00d"/>
                  </sm-btn>
                </td>
              </tr>
              <tr class="border-t-1 bg-input">
                <td class="fs-14 text-gray-3 pl-3 py-2">Total</td>
                <td class="fs-14 fw-6 text-black pl-3 py-2"></td>
                <td class="fs-14 fw-6 text-black pl-3 py-2"></td>
                <td class="fs-14 fw-6 text-black pl-3 py-2">13126</td>
                <td class="fs-14 fw-6 text-black pl-3 py-2">13126</td>
                <td class="fs-14 fw-6 text-black pl-3 py-2">13126</td>
                <td class="fs-14 fw-6 text-black pl-3 py-2">13126</td>
                <td class="fs-14 fw-6 text-black pl-3 py-2">13126</td>
              </tr>
            </template>
          </data-table>
        </div>
        <div class="flex flex-row gap-5">
          <m-btn-outlined class="border-color-primary" @click="addMore">
            <fa-icon hash="&#x2b" /> Добавить еще
          </m-btn-outlined>
          <excel-btn :size="'340kb'"></excel-btn>
        </div>
        <div class="pt-3 mt-3 w-[60%]">
          <div class="mb-2">
            <span class="fs-12">Комментарии *</span>
          </div>
          <div class="date-picker">
            <textarea
              class="my-input relative h-25 w-full bg-input focus:border-blue-10 active:border-blue-10 fa-solid mainLoginInput p-2 border-primary-gray border-1 rounded-lg"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
    <transition name="modal">
      <div v-if="productModal">
        <d-modal
          @closeDialog="productDialog"
          :dataContainerWidth="'437px'"
          :name="'Список товаров'"
        >
          <LazyWarehousesReceiptGoodsDialog />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const filter = ref({
  isSelectWarehouse: false,
  isSelectProduct: false,
});
const clickOutside = () => {
  filter.value.isSelectWarehouse = false;
  filter.value.isSelectProduct = false;
};
import { notify } from "@kyvg/vue3-notification";
const props = defineProps({
  name: String,
  isActive: {
    type: Boolean,
    required: true,
  },
});
const { isActive } = toRefs(props);
import { ProductsModel } from "~/interfaces/api/products-model";
import { useProductCategoryStore } from "~/stores/settings/product-categories/product-categories.store";
import { useProductsStore } from "~/stores/settings/products/products.store";
const boxType = useBoxTypesStore(isActive.value.toString());
const productGroup = useProductGroupsStore(isActive.value.toString());
const unitsStore = useUnitsStore(isActive.value.toString());
const dialogStore = useDialogStore("products");
const productCategoryStore = useProductCategoryStore(isActive.value.toString());
const products = useProductsStore("true");
const productModal = ref(false);
function productDialog() {
  productModal.value = false;
}
let headers = ref([
  {
    name: "№",
    key: "no",
    checked: true,
    thWidth: "40px",
  },
  {
    name: "Код",
    key: "code",
    checked: true,
    thWidth: "60px",
  },
  {
    name: "Товар",
    key: "product",
    checked: true,
    thWidth: "210px",
  },
  {
    name: "В блоках",
    key: "block",
    checked: true,
    thWidth: "80px",
  },
  {
    name: "В количестве",
    key: "quantity",
    checked: true,
    thWidth: "120px",
  },
  {
    name: "Цена",
    key: "price",
    checked: true,
    thWidth: "80px",
  },
  {
    name: "Общее кол-во",
    key: "total-number",
    checked: true,
    thWidth: "120px",
  },
  {
    name: "Сумма продажи",
    key: "saleAmount",
    checked: true,
    thWidth: "140px",
  },
  {
    name: "Aктивный ",
    key: "isActive",
  },
]);
let sortedData = ref({ key: "", mode: "" });
let enteredData = ref<ProductsModel[]>([
  {
    id: undefined,
    category_id: "",
    name: "",
    unit_id: "",
    product_group_id: "",
    quantity_in_package: null,
    code: "",
  },
]);
let yourState = ref("");
function addMore() {
  enteredData.value.push({
    id: undefined,
    category_id: "",
    name: "",
    unit_id: "",
    product_group_id: "",
    quantity_in_package: null,
    code: "",
  });
}
function deleteF(index: any) {
  enteredData.value.splice(index, 1);
}
// State
let methodData = ref({
  name: "",
  code: "",
  title: "",
  active: true,
});
let toggleOpen = ref(false);
let toggleOpen2 = ref(false);
function setName(name: any) {
  methodData.value.name = name;
}
function setCode(code: any) {
  methodData.value.code = code;
}
function setTitle(title: any) {
  methodData.value.title = title;
}
const save = async () => {
  notify({ title: "Пожалуйста подождите!" });
  for (let valueElement of enteredData.value) {
    await products.add(valueElement);
    await products.refresh();
    await products.refresh();
  }
  enteredData.value = [
    {
      id: undefined,
      category_id: "",
      name: "",
      unit_id: "",
      product_group_id: "",
      quantity_in_package: null,
      code: "",
    },
  ];
  notify({ title: "Сохранено!" });

  await dialogStore.closeDialog();
};
onMounted(() => {
  productGroup.getData(isActive.value);
  boxType.getData(isActive.value);
  unitsStore.getData(isActive.value);
  productCategoryStore.getData(isActive.value);
});
</script>

<style scoped></style>
