<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter :templates="products.templates"></table-filter>
      <div>
        <search-input
          :value="searchText"
          @change="products.search"
          class="w-full h-38px"
        />
      </div>
      <div>
        <excel-btn :size="'350kb'"></excel-btn>
      </div>
    </div>
    <div v-click-outside="clickOutside" class="mt-3 w-full overflow-auto">
      <data-table
        :headers="products.templates"
        @sort="products.sortData"
        class="customize-table"
        :sorted="products.params.order_by"
        :loading="products.isLoading"
        :check="isAllTableChecked"
        @getAllId="getAllProductsId()"
      >
        <template #body>
          <c-tr v-for="(data, index) in products.data?.items" :key="data.id">
            <c-td v-for="key in products.templates" :key="key">
              <span class="check ml-[-8px]" v-if="key.key === 'checkbox'">
                <label class="inline-flex items-center">
                  <input
                    type="checkbox"
                    :id="data.id"
                    :checked="isTableChecked(data.id)"
                    @change="onSelectProduct(data.id)"
                  />
                  <span class="ml-2"></span>
                </label>
              </span>
              <span v-if="key.checked && key.key === 'category'">
                {{ data[key.key].name }}
              </span>
              <span v-if="key.checked && key.key === 'unit'">
                {{ data[key.key].name }}
              </span>
              <span v-if="key.checked && key.key === 'product_group'">
                {{ data[key.key].name }}
              </span>
              <span v-if="key.checked && key.key === 'sales_channel'">
                <span>{{ data[key.key]?.name }}</span>
              </span>
              <span v-if="key.checked && key.key === 'brand'">
                <span>{{ data[key.key]?.name }}</span>
              </span>
              <span v-if="key.checked && key.key === 'box_type'">
                <span>{{ data[key.key]?.name }}</span>
              </span>
              <span
                v-if="
                  key.checked &&
                  key.key !== 'unit' &&
                  key.key !== 'category' &&
                  key.key !== 'sales_channel' &&
                  key.key !== 'product_group' &&
                  key.key !== 'brand' &&
                  key.key !== 'box_type'
                "
              >
                {{ data[key.key] }}
              </span>
            </c-td>
            <c-td>
              <div :key="index" class="relative drop td-shadow py1">
                <div
                  @click="openDropdown(index)"
                  :key="index"
                  class="cursor-pointer flex justify-center w-[30px] pl-2 py-[6px]"
                >
                  <svg
                    width="3"
                    height="17"
                    viewBox="0 0 3 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 3C2.32842 3 2.99999 2.32843 2.99999 1.5C2.99999 0.671573 2.32842 0 1.5 0C0.671572 0 0 0.671573 0 1.5C0 2.32843 0.671572 3 1.5 3Z"
                      fill="#424F4F"
                    />
                    <path
                      d="M1.5 10C2.32843 10 3 9.32843 3 8.5C3 7.67157 2.32843 7 1.5 7C0.671573 7 0 7.67157 0 8.5C0 9.32843 0.671573 10 1.5 10Z"
                      fill="#424F4F"
                    />
                    <path
                      d="M1.49999 17C2.32841 17 2.99998 16.3284 2.99998 15.5C2.99998 14.6716 2.32841 14 1.49999 14C0.671568 14 0 14.6716 0 15.5C0 16.3284 0.671568 17 1.49999 17Z"
                      fill="#424F4F"
                    />
                  </svg>
                </div>
                <div
                  :key="index"
                  v-show="td.isActive && td.index === index"
                  class="bg-white bottom-[-23px] down rounded-lg z-50 w-[180px] border right-[44px] absolute"
                >
                  <div class="m-3">
                    <div
                      @click="() => dialogStore.edit({ ...data })"
                      class="flex border-b cursor-pointer pb-2"
                    >
                      <div class="text-[18px]"><IconEdit /></div>
                      <div class="fs-12 ml-2 mt-1 text-[#299B9B]">
                        Редактрировать
                      </div>
                    </div>
                    <div
                      @click="products.deleteDialog = data.id"
                      class="flex mt-1 cursor-pointer"
                    >
                      <div class="mt-[6px]"><IconTrash /></div>
                      <div class="fs-12 ml-3 mt-1 text-red">Удалить</div>
                    </div>
                  </div>
                </div>
              </div>
            </c-td>
          </c-tr>
        </template>
      </data-table>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14"> Показать по </span>
        <page-size-btn
          :current-size="products.params.page_size"
          @setPageSize="products.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="products.data?.total_pages"
          :current-page="products.data?.page_number"
          @setPage="products.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="change"
          :templates="products.templates"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="products.deleteDialog">
      <h-no-modal @closeDialog="products.closeDeleteDialog">
        <LazySettingsProductsDeleteDialog />
      </h-no-modal>
    </div>
  </transition>
</template>

<script setup>
// Store
const products = useProductsStore("");
const dialogStore = useDialogStore("products");

// State
const isAllTableChecked = ref(false);
const searchText = ref("");
const draggable = ref(false);
const td = reactive({
  isActive: false,
  index: -1,
});

// Methods
const getAllProductsId = () => {
  isAllTableChecked.value = !isAllTableChecked.value;
  if (isAllTableChecked.value) {
    products.productsIds = products.data?.items.map((product) => product.id);
  } else {
    products.setNullProductIds();
  }

  console.log(products.productsIds);
};

const onSelectProduct = (productId) => {
  if (!isTableChecked(productId)) {
    products.productsIds.push(productId);
  } else {
    products.productsIds = products.productsIds.filter(
      (id) => id !== productId
    );
  }

  console.log(products.productsIds);
};

const isTableChecked = (productId) => {
  return products.productsIds.find((id) => productId === id);
};

function draggableDialog() {
  draggable.value = false;
}

function change(param) {
  products.templates = param;
  draggable.value = false;
}

function openDropdown(index) {
  if (index === td.index) {
    td.isActive = !td.isActive;
    td.index = index;
  } else {
    td.isActive = true;
    td.index = index;
  }
}
function clickOutside() {
  td.isActive = false;
}
</script>

<style scoped>
.customize-table td:first-child {
  width: 10px;
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
</style>
