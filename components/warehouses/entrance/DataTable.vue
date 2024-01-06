<template>
  <div
    v-click-outside="clickOutside"
    class="rounded-lg bg-white border-grey px-[2px]"
  >
    <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <SettingsRlpDiscountsTableCheckbox
        :headers="incomeStrore.incomeTemplete"
      />
      <div>
        <search-input class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="overflow-auto table-containers">
      <data-table :headers="incomeStrore.incomeTemplete">
        <template #body>
          <template
            v-for="(data, index) in incomeStrore.data?.items"
            :key="index"
          >
            <c-tr class="border-b-none b-bottom cursor-pointer">
              <c-td-no-edit
                v-for="key in incomeStrore.incomeTemplete"
                :key="key"
              >
                <div class="pt-2 ml-[-2px] check" v-if="key.key === 'checkbox'">
                  <label>
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </div>
                <div
                  class=""
                  v-if="
                    key.checked &&
                    key.key !== 'client' &&
                    key.key !== 'agent' &&
                    key.key !== 'status' &&
                    key.key !== 'income_warehouse_model' &&
                    key.key !== 'created_date' &&
                    key.key !== 'shipped_date'
                  "
                >
                  {{ data[key.key] }}
                </div>
                <nuxt-link
                  to="/clients/about-clients/Description"
                  class=""
                  v-if="key.checked && key.key === 'client'"
                >
                  <span class="border-b border-blue-10 pb-1">{{
                    data[key.key]
                  }}</span>
                </nuxt-link>
                <div class="" v-if="key.checked && key.key === 'agent'">
                  <span class="border-b border-blue-10 pb-1">{{
                    data[key.key]
                  }}</span>
                </div>
                <div class="" v-if="key.checked && key.key === 'created_date'">
                  <span class="pb-1">
                    {{ moment(data[key.key]).format("YYYY-MM-DD") }}
                  </span>
                </div>
                <div class="" v-if="key.checked && key.key === 'shipped_date'">
                  <span>
                    {{ moment(data[key.key]).format("YYYY-MM-DD") }}
                  </span>
                </div>
                <div
                  class=""
                  v-if="key.checked && key.key === 'income_warehouse_model'"
                >
                  <span class="border-b border-blue-10 pb-1">{{
                    data[key.key]?.name
                  }}</span>
                </div>
                <button
                  class="bg-blue-100 rounded-[40px] p-1 px-2"
                  v-if="key.checked && key.key === 'status'"
                >
                  <span class="text-bluer my-4">{{ data[key.key] }}</span>
                </button>
              </c-td-no-edit>
              <c-td class="">
                <div
                  :key="index"
                  @click="openDropdown(index)"
                  class="relative drop td-shadow p-1"
                >
                  <div
                    :key="index"
                    class="cursor-pointer flex justify-center w-[30px] py-[6px]"
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
                    class="bg-white top-0 down rounded-lg z-50 w-[170px] border h-[42px] right-[44px] absolute"
                  >
                    <div class="m-1.5">
                      <div
                        @click="edit(data.id)"
                        class="flex border-b cursor-pointer pb-2"
                      >
                        <div>
                          <IconEdit />
                        </div>
                        <div class="fs-12 text-[#299B9B] ml-2 mt-1">
                          Редактрировать
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </c-td>
            </c-tr>
          </template>
        </template>
      </data-table>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14"> Показать по </span>
        <page-size-btn
          :current-size="filters.pageSize"
          @setPageSize="setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="incomeStrore.data?.total_pages"
          :current-page="incomeStrore.data?.page_number"
          @setPage="setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop></drag-and-drop>
      </d-modal>
    </div>
  </transition>
  <loading-modal v-if="incomeStrore.loading" name="Управление меню таблицы">
    <Loading />
  </loading-modal>
</template>

<script setup>
// State
import moment from "moment";

const props = defineProps({
  dateRange: Object,
});

// store
const incomeStrore = useIncomesStore("true");

// state
const draggable = ref(false);
const router = useRouter();
const changeStatus = ref(false);

const td = reactive({
  isActive: false,
  index: -1,
});

const filters = ref({
  page: 1,
  pageSize: 10,
  FromValue: moment().startOf("month").format("YYYY-MM-DD"),
  ToValue: moment().format("YYYY-MM-DD"),
});

// hooks
watch(filters.value, async () => {
  try {
    incomeStrore.loading = true;
    await incomeStrore.getData(filters.value);
  } catch (error) {
  } finally {
    incomeStrore.loading = false;
  }
});

onMounted(() => {
  incomeStrore.getData(filters.value);
});

watchEffect(() => {
  if (props.dateRange) {
    filters.value.FromValue = props.dateRange.fromDate;
    filters.value.ToValue = props.dateRange.toDate;
  }
});

// Methods
function setPage(index) {
  filters.value.page = index;
}

function setPageSize(size) {
  filters.value.pageSize = size;
}

function changeStatusDialog() {
  changeStatus.value = false;
}

function draggableDialog() {
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
    path: "/warehouses/entrance/create-parish",
    query: { id: id },
  });
}
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
  top: 0px;
  border-left: 15px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
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

.b-bottom:last-child {
  border-bottom: 1px solid #e1e4e4;
}

.td-shadow {
  cursor: pointer;
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.04);
}
</style>
