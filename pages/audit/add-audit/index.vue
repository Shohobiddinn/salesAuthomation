<template>
  <div class="py-9 px-5">
    <back-btn @click="$router.go(-1)"></back-btn>

    <div class="flex flex-col bg-white rounded-lg p-12.5 mt-6.5">
      <h3 class="font-semibold text-2xl text-black text-gray-3 pb-8">
        Добавить Аудит
      </h3>
      <div class="flex justify-between">
        <p class="font-semibold text-xl text-black text-gray-3 pb-9 w-2/5">
          Основные
        </p>
        <div class="w-3/5 flex flex-col gap-6">
          <div class="w-full">
            <label for="name" class="fs-12">Название *</label>
            <div class="py-2">
              <d-input
                placeholder="Введите название клиента"
                type="text"
                class="w-full"
                :id="'name'"
              />
            </div>
          </div>
          <div class="flex flex-col w-full relative">
            <div class="font-normal fs-12">Опрос *</div>
            <div
              @click="filter.isSelectType = !filter.isSelectType"
              class="flex p-2 my-2.76 h-11 border rounded-lg bg-[#fff] border-[#D2D7D7] w-full"
            >
              <div class="ml-4 mt-2 arrow-icon">
                <IconArrowBottom />
              </div>
              <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
            </div>
            <div
              v-if="filter.isSelectType"
              class="absolute w-full pt-2 border top-[85px] z-50 rounded-lg bg-[#FAFDFD]"
            >
              <div class="flex pl-3 border-b border-[#E1E4E4]">
                <div>
                  <label>
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </div>
                <div class="fs-14 ml-2">Select all</div>
              </div>
              <div class="h-[200px] overflow-auto mr-3">
                <div v-for="i in 15" :key="i" class="flex pl-3 pt-2">
                  <div>
                    <label>
                      <input type="checkbox" />
                      <span></span>
                    </label>
                  </div>
                  <div class="fs-14 ml-2">Checkbox</div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full flex">
            <div class="flex flex-col w-1/2 gap-6">
              <div class="flex items-center gap-2.5">
                <div class="pt-2 check">
                  <checkbox type="checkbox" :id="'activity'" />
                </div>
                <label for="activity" class="whitespace-nowrap fs-16"
                  >Активный</label
                >
              </div>
              <div class="flex items-center gap-2.5">
                <div class="pt-2 check">
                  <checkbox type="checkbox" :id="'activity'" />
                </div>
                <label for="activity" class="whitespace-nowrap fs-16"
                  >Face check</label
                >
              </div>
              <div class="flex items-center gap-2.5">
                <div class="pt-2 check">
                  <checkbox type="checkbox" :id="'activity'" />
                </div>
                <label for="activity" class="whitespace-nowrap fs-16"
                  >Sold check</label
                >
              </div>
              <div class="flex items-center gap-2.5">
                <div class="pt-2 check">
                  <checkbox type="checkbox" :id="'activity'" />
                </div>
                <label for="activity" class="whitespace-nowrap fs-16"
                  >Store check</label
                >
              </div>
              <div class="flex items-center gap-2.5">
                <div class="pt-2 check">
                  <checkbox type="checkbox" :id="'activity'" />
                </div>
                <label for="activity" class="whitespace-nowrap fs-16"
                  >Show on store check</label
                >
              </div>
              <div class="flex items-center gap-2.5">
                <div class="pt-2 check">
                  <checkbox type="checkbox" :id="'activity'" />
                </div>
                <label for="activity" class="whitespace-nowrap fs-16"
                  >Price check</label
                >
              </div>
            </div>
            <div class="flex flex-col w-1/2 gap-6">
              <div class="flex items-center gap-2.5">
                <div class="pt-2 check">
                  <checkbox type="checkbox" :id="'activity'" />
                </div>
                <label for="activity" class="whitespace-nowrap fs-16"
                  >Обязательно для заполнение</label
                >
              </div>
              <div class="flex items-center gap-2.5">
                <div class="pt-2 check">
                  <checkbox type="checkbox" :id="'activity'" />
                </div>
                <label for="activity" class="whitespace-nowrap fs-16"
                  >Face Required</label
                >
              </div>
              <div class="flex items-center gap-2.5">
                <div class="pt-2 check">
                  <checkbox type="checkbox" :id="'activity'" />
                </div>
                <label for="activity" class="whitespace-nowrap fs-16"
                  >Price required</label
                >
              </div>
              <div class="flex items-center gap-2.5">
                <div class="pt-2 check">
                  <checkbox type="checkbox" :id="'activity'" />
                </div>
                <label for="activity" class="whitespace-nowrap fs-16"
                  >Sold required</label
                >
              </div>
              <div class="flex items-center gap-2.5">
                <div class="pt-2 check">
                  <checkbox type="checkbox" :id="'activity'" />
                </div>
                <label for="activity" class="whitespace-nowrap fs-16"
                  >Store required</label
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 class="font-semibold text-2xl text-black text-gray-3 pb-8">
        Продукты
      </h3>
      <div
        v-click-outside="clickOutside"
        class="rounded-lg bg-white border-grey px-[2px] w-full h-auto"
      >
        <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
          <div class="w-1/3">
            <search-input
              :value="searchText"
              @updated="searchUpdated"
              class="w-full h-38px"
            />
          </div>
        </div>
        <flex-row class="overflow-auto w-full my-4">
          <data-table
            class="w-full"
            @sort="sortData"
            :headers="headers"
            :sorted="sortedData"
          >
            <template #body>
              <c-tr v-for="data in loadedData" :key="data">
                <template v-for="key in headers">
                  <c-td-no-edit :custom-padding="true" class="py-3">
                    <template v-if="key.type && key.type === 'checkbox'">
                      <label class="pl-1">
                        <input
                          type="checkbox"
                          class="checkbox"
                          v-model="data[key.key]"
                        />
                        <span></span>
                      </label>
                    </template>
                    <template v-else>
                      {{ data[key.key] }}
                    </template>
                  </c-td-no-edit>
                </template>
              </c-tr>
            </template>
          </data-table>
        </flex-row>
        <div class="flex justify-between w-full">
          <div class="flex p-3 gap-2 items-center">
            <span class="secondary-gray-text fs-14"> Показать по </span>
            <page-size-btn
              :current-size="pageSize"
              @setPageSize="setPageSize"
            />
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
      <transition name="modal">
        <div v-if="draggable">
          <d-modal
            @closeDialog="draggableDialog"
            :name="'Управление меню таблицы'"
          >
            <drag-and-drop></drag-and-drop>
          </d-modal>
        </div>
      </transition>
    </div>
    <div class="flex justify-end w-full pt-6">
      <m-btn class="w-1/5"> Добавить</m-btn>
    </div>
  </div>
</template>

<script setup>
// State
const filter = ref({
  isSelectType: false,
});
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);
// Methods

function draggableDialog() {
  draggable.value = false;
}
const clickOutside = () => {
  td.isActive = false;
  console.log(td.isActive);
};

const td = reactive({
  isActive: false,
  index: -1,
});

let headers = ref([
  {
    name: "Select all",
    key: "selected",
    checked: true,
    type: "checkbox",
    value: false,
  },
  {
    name: "Id",
    checked: true,
    key: "id",
    type: "come",
    thWidth: "140px",
  },
  {
    name: "Название",
    checked: true,
    key: "name",
    type: "come",
    thWidth: "140px",
  },
  {
    name: "Категория",
    checked: true,
    key: "category",
    type: "come",
    thWidth: "140px",
  },
]);
const loadedData = ref([
  {
    id: "ID 13268",
    name: '"Coca-cola" 0.5, пэт',
    category: "Coca cola",
  },
  {
    id: "ID 13268",
    name: '"Coca-cola" 0.5, пэт',
    category: "Coca cola",
  },
  {
    id: "ID 13268",
    name: '"Coca-cola" 0.5, пэт',
    category: "Coca cola",
  },
  {
    id: "ID 13268",
    name: '"Coca-cola" 0.5, пэт',
    category: "Coca cola",
  },
  {
    id: "ID 13268",
    name: '"Coca-cola" 0.5, пэт',
    category: "Coca cola",
  },
  {
    id: "ID 13268",
    name: '"Coca-cola" 0.5, пэт',
    category: "Coca cola",
  },
  {
    id: "ID 13268",
    name: '"Coca-cola" 0.5, пэт',
    category: "Coca cola",
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
</script>
