<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter :templates="bonusStore.autoTemplate"></table-filter>
      <div>
        <search-input @change="bonusStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3 w-full overflow-auto">
      <data-table
        v-click-outside="clickOutside"
        :headers="bonusStore.autoTemplate"
        @sort="bonusStore.sortData"
        :sorted="bonusStore.params.order_by"
      >
        <template #body>
          <c-tr v-for="(data, index) in bonusStore.data?.items" :key="data">
            <c-td v-for="key in bonusStore.autoTemplate" :key="key">
              <div class="mt-[-10px] mb-[-10px]" v-if="key.key === 'active'">
                <button class="h-[33px] w-[80px] fs-12 bg-[#E3FCF0] rounded-[41px]">
                  Активный
                </button>
              </div>
              <div
                v-if="
                  key.checked === true &&
                  key.key !== 'terms' &&
                  key.key !== 'bonus_type' &&
                  key.key !== 'valid_from' &&
                  key.key !== 'valid_to'
                "
              >
                {{ data[key.key] }}
              </div>
              <div v-if="key.checked === true && key.key === 'terms'">
                {{ data[key.key][0]?.count }}
              </div>
              <div v-if="key.checked === true && key.key === 'bonus_type'">
                {{ data.bonus_type.name }}
              </div>
              <div v-if="key.checked === true && key.key === 'valid_from'">
                {{ moment(data[key.key]).format("DD-MM-YYYY") }}
              </div>
              <div v-if="key.checked === true && key.key === 'valid_to'">
                {{ moment(data[key.key]).format("DD-MM-YYYY") }}
              </div>
            </c-td>
            <c-td :key="index" class="">
              <div
                :key="index"
                @click="openDropdown(index)"
                class="relative drop td-shadow"
              >
                <div :key="index" class="cursor-pointer w-[30px] p-[10px]">
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
                  class="bg-white bottom-[-23px] down rounded-lg z-50 w-[170px] border h-[84px] right-[44px] absolute"
                >
                  <div class="m-3">
                    <div @click="edit(data.id)" class="flex border-b cursor-pointer pb-2">
                      <div><IconEdit /></div>
                      <div class="fs-12 text-[#299B9B] ml-2 mt-1">Редактрировать</div>
                    </div>
                    <div
                      @click="bonusDiscountModal = true"
                      class="flex mt-1 cursor-pointer"
                    >
                      <div class="mt-1"><IconUserAdd /></div>
                      <div class="fs-12 ml-3 mt-1">Прикрепить агентов</div>
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
          :current-size="bonusStore.params.page_size"
          @setPageSize="bonusStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="bonusStore.data?.total_pages"
          :current-page="bonusStore.data?.page_number"
          @setPage="bonusStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="change"
          :templates="bonusStore.autoTemplate"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="bonusDiscountModal">
      <d-modal @closeDialog="discountBonusesDialog" :name="'Прикрепление агентов'">
        <SettingsBonusesDiscountsDialogBody />
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
import moment from "moment";
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});
const { isActive } = toRefs(props);
// Stores
const bonusStore = useBonusesStore(isActive.value.toString());

// State
const router = useRouter();
const draggable = ref(false);
const bonusDiscountModal = ref(false);
const td = reactive({
  isActive: false,
  index: -1,
});

// Methos
function discountBonusesDialog() {
  bonusDiscountModal.value = false;
}

function draggableDialog() {
  draggable.value = false;
}

function change(param) {
  bonusStore.autoTemplate = param;
  draggable.value = false;
}

const clickOutside = () => {
  td.isActive = false;
};

function openDropdown(index) {
  td.isActive = !td.isActive;
  td.index = index;
}

function edit(id) {
  router.push({
    path: "/settings/bonuses-discounts/create-auto-bonus",
    query: { id: id },
  });
}

// Hooks
onMounted(() => {
  bonusStore.getDataAuto(isActive.value);
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
  bottom: 20px;
  top: 20px;
  border-left: 15px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
</style>
