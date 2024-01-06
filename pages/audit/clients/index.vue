<template>
  <div>
    <div class="h-100vh">
      <div class="flex justify-between mt-4">
        <div class="mt-2 text-[24px] font-[600] text-[#424F4F]">Клиенты</div>
        <div class="flex gap-4.5">
          <m-btn class="filter-bg">
            <span class="flex gap-2.5">
              <IconTransparentLocation />
              Местоположение
            </span>
          </m-btn>
          <m-btn>
            <NuxtLink to="/clients/clients/create-clients"
              >Добавить клиента</NuxtLink
            ></m-btn
          >
        </div>
      </div>

      <div v-click-outside="clickOutside" class="mt-4">
        <div class="bg-white p-4 w-full rounded-lg">
          <div class="flex justify-between">
            <div class="mt-2 text-[24px] font-[600] text-[#424F4F]">Фильтр</div>
          </div>
          <div class="grid grid-cols-4 gap-4 mt-4">
            <div class="relative">
              <div class="fs-12 my-2">Мерчандайзер</div>
              <div>
                <div
                  @click="
                    filter.isSelectMerchandiser = !filter.isSelectMerchandiser
                  "
                  class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
                >
                  <div class="ml-4 mt-2">
                    <IconArrowBottom />
                  </div>
                  <div class="fs-14 text-gray ml-2">Выбрать</div>
                </div>
                <div
                  v-if="filter.isSelectMerchandiser"
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
            </div>
            <div class="relative">
              <div class="fs-12 my-2">Город</div>
              <div
                @click="filter.isSelectCity = !filter.isSelectCity"
                class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
              >
                <div class="ml-4 mt-2">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 text-gray ml-2">Выбрать</div>
              </div>
              <div
                v-if="filter.isSelectCity"
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
            <div class="relative">
              <div class="fs-12 my-2">Категория клиентов</div>
              <div
                @click="filter.isSelectProduct = !filter.isSelectProduct"
                class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
              >
                <div class="ml-4 mt-2">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 text-gray ml-2">Выбрать</div>
              </div>
              <div
                v-if="filter.isSelectProduct"
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
                  <div
                    style="
                      border-bottom-right-radius: 8px;
                      border-bottom-left-radius: 8px;
                    "
                    class="absolute flex justify-center bottom-0 h-40px w-100 bg-white z-[9999]"
                  >
                    <button
                      class="w-[80%] bg-[#299B9B] fs-12 h-[30px] text-white rounded-lg mt-1"
                    >
                      load
                    </button>
                  </div>
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
            <div class="relative">
              <div class="fs-12 my-2">Тип цены</div>
              <div
                @click="filter.isSelectTypePrice = !filter.isSelectTypePrice"
                class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
              >
                <div class="ml-4 mt-2">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 text-gray ml-2">Выбрать</div>
              </div>
              <div
                v-if="filter.isSelectTypePrice"
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
            <div class="relative">
              <div class="fs-12 my-2">День</div>
              <div>
                <div
                  @click="filter.isSelectDay = !filter.isSelectDay"
                  class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
                >
                  <div class="ml-4 mt-2">
                    <IconArrowBottom />
                  </div>
                  <div class="fs-14 text-gray ml-2">Выбрать</div>
                </div>
                <div
                  v-if="filter.isSelectDay"
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
            </div>
            <div class="relative">
              <div class="fs-12 my-2">Статус</div>
              <div
                @click="filter.isSelectStatus = !filter.isSelectStatus"
                class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
              >
                <div class="ml-4 mt-2">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 text-gray ml-2">Выбрать</div>
              </div>
              <div
                v-if="filter.isSelectStatus"
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
                  <div
                    style="
                      border-bottom-right-radius: 8px;
                      border-bottom-left-radius: 8px;
                    "
                    class="absolute flex justify-center bottom-0 h-40px w-100 bg-white z-[9999]"
                  >
                    <button
                      class="w-[80%] bg-[#299B9B] fs-12 h-[30px] text-white rounded-lg mt-1"
                    >
                      load
                    </button>
                  </div>
                  <div v-for="i in 15" class="flex pl-3 pt-2" :key="i">
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
            <div class="relative">
              <div class="fs-12 my-2">QR Код</div>
              <div
                @click="filter.isSelectQRCode = !filter.isSelectQRCode"
                class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
              >
                <div class="ml-4 mt-2">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 text-gray ml-2">Выбрать</div>
              </div>
              <div
                v-if="filter.isSelectQRCode"
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
            <div class="relative">
              <div class="fs-12 my-2">Локация</div>
              <div
                @click="filter.isSelectLocation = !filter.isSelectLocation"
                class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
              >
                <div class="ml-4 mt-2">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 text-gray ml-2">Выбрать</div>
              </div>
              <div
                v-if="filter.isSelectLocation"
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
            <div class="relative">
              <div class="fs-12 my-2">Тип ТТ</div>
              <div
                @click="filter.isSelectTypeTT = !filter.isSelectTypeTT"
                class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
              >
                <div class="ml-4 mt-2">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 text-gray ml-2">Выбрать</div>
              </div>
              <div
                v-if="filter.isSelectTypeTT"
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
                  <div
                    style="
                      border-bottom-right-radius: 8px;
                      border-bottom-left-radius: 8px;
                    "
                    class="absolute flex justify-center bottom-0 h-40px w-100 bg-white z-[9999]"
                  >
                    <button
                      class="w-[80%] bg-[#299B9B] fs-12 h-[30px] text-white rounded-lg mt-1"
                    >
                      load
                    </button>
                  </div>
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
            <div class="relative">
              <div class="fs-12 my-2">Канал сбыта</div>
              <div
                @click="
                  filter.isSelectSalesChannel = !filter.isSelectSalesChannel
                "
                class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]"
              >
                <div class="ml-4 mt-2">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 text-gray ml-2">Выбрать</div>
              </div>
              <div
                v-if="filter.isSelectSalesChannel"
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
            <div></div>
            <div class="flex justify-end w-full h-40px mt-6">
              <button class="w-[92%] py-2 rounded-lg bg-[#299B9B] text-white">
                Применить
              </button>
              <button class="mt-3 ml-3"><IconRe /></button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between mt-7.5">
        <div class="text-[24px] font-[600]">Таблица</div>
        <div v-click-outside="clickOutside1" class="flex relative">
          <button
            @click="openProcess"
            class="flex justify-center fs-14 py-2 px-4 border border-[#299B9B] rounded-lg bg-white ml-3"
          >
            <div><IconFrame :result="result" /></div>
            <div class="fs-14 ml-1 mt-[2px]">Групповая обработка</div>
          </button>
          <div
            v-if="process"
            class="absolute card-shadow rounded-lg px-4 py-2 bg-white right-0 top-[50px] z-50 card"
          >
            <div
              v-for="i in groupProcess"
              :key="i"
              @click="$router.push(i.url)"
              class="fs-14 border-b border-[#E1E4E4] py-1 cursor-pointer"
            >
              {{ i.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <auditClientsDataTable />
      </div>
      <div class="flex py-6 gap-4.5">
        <button
          class="flex justify-center fs-14 py-2 px-10 border border-[#299B9B] rounded-lg bg-white"
        >
          <div><IconUpload /></div>
          <div class="fs-14 ml-1 mt-[2px]">Экспорт</div>
        </button>
        <button
          class="flex justify-center fs-14 py-2 px-10 border border-[#299B9B] rounded-lg bg-white ml-3"
        >
          <div><IconDownload /></div>
          <div class="fs-14 ml-1 mt-[2px]">Импорт</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const date = ref(false);
const filter = ref({
  isSelectMerchandiser: false,
  isSelectCity: false,
  isSelectProduct: false,
  isSelectTypePrice: false,
  isSelectDay: false,
  isSelectStatus: false,
  isSelectQRCode: false,
  isSelectLocation: false,
  isSelectTypeTT: false,
  isSelectSalesChannel: false,
});
const result = ref({
  resultTable: true,
});
const process = ref(false);
function openProcess() {
  process.value = !process.value;
}
const groupProcess = ref([
  {
    name: "Прикрепить / открепить агентов",
    url: "/clients/group-process/unpin-agents",
  },
  {
    name: "Прикрепить / открепить Экспедитор",
    url: "/clients/group-process/unpin-expeditor",
  },
  {
    name: "Отметить для аудита",
    url: "/clients/group-process/mark-audit",
  },
  {
    name: "Прикперление и открепление аудиторов к клиентам",
    url: "/clients/group-process/attaching-auditor-client",
  },
  {
    name: "Канал сбыта",
    url: "/clients/group-process/sales-channel",
  },
  {
    name: "Распределение клиентов по категориям и территориям.",
    url: "/clients/group-process/change-territory-category",
  },
  {
    name: "RLP Bonus.",
    url: "/clients/group-process/rlp-bonus",
  },
  {
    name: "Заказ при наличии долга",
    url: "/clients/group-process/order-case-debt",
  },
  {
    name: "Прикрепить тип цены",
    url: "/clients/group-process/attach-price-type",
  },
]);
const clickOutside = () => {
  filter.value.isSelectMerchandiser = false;
  filter.value.isSelectCity = false;
  filter.value.isSelectProduct = false;
  filter.value.isSelectTypePrice = false;
  filter.value.isSelectDay = false;
  filter.value.isSelectStatus = false;
  filter.value.isSelectQRCode = false;
  filter.value.isSelectLocation = false;
  filter.value.isSelectTypeTT = false;
  filter.value.isSelectSalesChannel = false;
  date.value = false;
};
const clickOutside1 = () => {
  process.value = false;
};
const dateData = ref({
  toDate: "",
  fromDate: "",
});
const toDate = ref("");
const fromDate = ref("");
function addDate() {
  dateData.value.fromDate = fromDate.value;
  dateData.value.toDate = toDate.value;
}
</script>

<style scoped>
.h-100vh {
  height: calc(100vh - 70px);
}
label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
[type="checkbox"]:checked + span:before {
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
.date-for {
  border: 1px solid #e1e4e4;
  border-radius: 8px;
}
.date-picker input {
  width: 114px;
  padding-left: 35px;
  position: relative;
  font-size: 12px;
}
.date-picker input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  color: rgba(0, 0, 0, 0);
  opacity: 1;
  display: block;
  background: url(~/assets/svg/date-pickerscg.svg) no-repeat;
  width: 20px;
  height: 20px;
  left: 10px;
  border-width: thin;
  top: 8px;
}
.shadow {
  box-shadow: 0px 0px 28px rgba(0, 0, 0, 0.08);
}
.date:before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  right: 14px;
  top: -10px;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  border-bottom: 10px solid white;
}
.card-shadow {
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.08);
}
.card:before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  right: 14px;
  top: -10px;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  border-bottom: 10px solid white;
}
</style>

