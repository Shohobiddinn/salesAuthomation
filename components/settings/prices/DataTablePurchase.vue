<template>
  <div
    v-click-outside="clickOutside"
    class="rounded-lg bg-white border-grey py-3"
  >
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
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
      <data-table
        :headers="priceStore.templates"
        @sort="priceStore.sortData"
        :sorted="priceStore.params.order_by"
        withInformationAboveHeader
      >
        <template #body>
          <c-tr v-for="(data, index) in priceStore.purchase" :key="data">
            <c-td v-for="key in priceStore.templates" :key="key">
              <div v-if="key.key === 'date'">
                {{ dateFormat(data.date) }}
              </div>
              <div v-else>
                {{ data[key.key] }}
              </div>
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
                  :class="{ 'active-down': td.isActive && td.index === index }"
                  class="bg-white bottom-[-40px] down rounded-lg z-50 w-[200px] border right-[44px] absolute"
                >
                  <div class="m-3">
                    <div
                      @click="addPrice(data.price_type_id)"
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
                    <div
                      @click="newUnitModal = true"
                      class="flex mt-1 cursor-pointer"
                    >
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
  </div>
  <transition name="modal">
    <div v-if="newUnitModal">
      <d-modal @closeDialog="closeNewUnit" name="Создать наценку на 'Наличный'">
        <SettingsPricesNewPrice @closeDialog="closeNewUnit" />
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggable = false" name="Управление меню таблицы">
        <drag-and-drop
          @change="change"
          :templates="priceStore.templates"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
const router = useRouter();

// Store
const priceStore = usePriceStore("true");

// State
const newUnitModal = ref(false);
const draggable = ref(false);
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);

// Methods
function closeNewUnit() {
  newUnitModal.value = false;
}

function change(param) {
  priceStore.templates = param;
  draggable.value = false;
}

function openDropdown(index) {
  td.isActive = !td.isActive;
  td.index = index;
}

function addPrice(id) {
  router.push({
    path: "/settings/prices/setting-new",
    query: { priceTypeId: id },
  });
}

const clickOutside = () => {
  td.isActive = false;
};

const td = reactive({
  isActive: false,
  index: -1,
});

function setPage(index) {
  currentPage.value = index;
}

function setPageSize(size) {
  pageSize.value = size;
}

function dateFormat(date) {
  return date ? moment(date).format("YYYY-MM-DD") : "";
}

// Hooks
onMounted(() => {
  priceStore.getPricePurchuse();
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
