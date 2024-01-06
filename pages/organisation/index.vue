<template>
  <div>
    <div
      v-click-outside="clickOutside"
      class="rounded-lg bg-white border-grey py-3"
    >
      <div class="flex flex-row gap-4 px-4 items-center">
        <div>
          <i-btn>
            <IconColsSVG />
          </i-btn>
        </div>
        <div>
          <i-btn>
            <IconRowSVG />
          </i-btn>
        </div>
        <div>
          <search-input
            :value="searchText"
            @updated="searchUpdated"
            class="w-full h-38px"
          />
        </div>
        <div>
          <excel-btn :size="'460kb'"></excel-btn>
        </div>
      </div>
      <div class="mt-3 w-full overflow-auto">
        {{}}
        <data-table
          :headers="priceStore.templates"
          @sort="priceStore.sortData"
          :sorted="priceStore.params.order_by"
        >
          <template #body>
            <c-tr v-for="(data, index) in priceStore.sale" :key="data">
              <c-td v-for="key in priceStore.templates" :key="key">
                {{ data[key.key] }}
              </c-td>
              <c-td :key="index" class="">
                <div
                  :key="index"
                  @click="openDropdown(index)"
                  class="shadow-td relative drop"
                >
                  <div
                    :key="index"
                    class="cursor-pointer flex justify-center w-[40px] py-[15px]"
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
                    :class="{
                      'active-down': td.isActive && td.index === index,
                    }"
                    class="bg-white bottom-[-40px] down rounded-lg z-50 w-[200px] border right-[44px] absolute"
                  >
                    <div class="m-3">
                      <div
                        @click="newUnitModal = true"
                        class="flex border-b cursor-pointer pb-2"
                      >
                        <div class="mt-[6px]"><IconFolder /></div>
                        <div class="fs-12 ml-2 mt-1">Текущие цены</div>
                      </div>
                      <div
                        @click="addPrice(data.price_type_id)"
                        class="flex border-b cursor-pointer pt-1 pb-2"
                      >
                        <div class="mt-1"><IconSettingsAlt /></div>
                        <div class="fs-12 ml-2 mt-1">Установить новые цены</div>
                      </div>
                      <div class="flex mt-1 cursor-pointer">
                        <div class="text-[18px]">+</div>
                        <div class="fs-12 ml-3 mt-1">Установить наценку</div>
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
          <page-size-btn :current-size="pageSize" @setPageSize="setPageSize" />
        </div>
        <div class="p-3">
          <page-index
            :available-pages="availablePages"
            :current-page="currentPage"
            @setPage="setPage"
          />
        </div>
      </div>
    </div>
    <DModal
      v-if="newUnitModal"
      @closeDialog="openNewUnit"
      name="Создать наценку на 'Наличный'"
    >
      <SettingsPricesNewPrice />
    </DModal>
  </div>
</template>

<script setup>
// State
import { usePriceStore } from "~/stores/settings/prices/price.store";

const newUnitModal = ref(false);
const router = useRouter();
// Methods
function openNewUnit() {
  newUnitModal.value = false;
}
const priceStore = usePriceStore("true");
// State
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
function openDropdown(index) {
  td.isActive = !td.isActive;
  td.index = index;
}
const clickOutside = () => {
  td.isActive = false;
  console.log(td.isActive);
};
const td = reactive({
  isActive: false,
  index: -1,
});
function addPrice(id) {
  priceStore.data.price_type_id = id;
  console.log(priceStore.data.price_type_id, "priceStore.data.price_type_id");
  router.push("/settings/prices/setting-new");
}
let headers = ref([
  {
    name: "Название",
    key: "name",
    thWidth: "200px",
    checked: true,
  },
  {
    name: "Title",
    key: "title",
    thWidth: "140px",
    checked: true,
  },
]);
const loadedData = ref([
  {
    name: "Оптовая торговля",
    title: "Ipsum",
  },
  {
    name: "Оптовая торговля",
    title: "Ipsum",
  },
  {
    name: "Оптовая торговля",
    title: "Ipsum",
  },
]);
let sortedData = ref({ key: "", mode: "" });

// Methods
function searchUpdated(text) {
  console.log(text);
}

function sortData(data) {
  sortedData.value = data;
}

function setPage(index) {
  currentPage.value = index;
}

function setPageSize(size) {
  pageSize.value = size;
}
onMounted(() => {
  priceStore.getPriceSale();
});
</script>

<style scoped>
.down {
  display: none;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
.active-down {
  display: block;
  background-color: white;
}
.down:after {
  position: absolute;
  content: "";
  right: -11px;
  bottom: 40px;
  top: 40px;
  border-left: 15px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
.shadow-td {
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.04);
}
</style>
