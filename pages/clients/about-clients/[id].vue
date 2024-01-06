<template>
  <div>
    <div>
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
      <div class="mt-4.5 text-2xl font-semibold text-gray-3">
        {{ clientDetail?.name }}
      </div>
      <div class="mt-6 text-2xl font-semibold text-gray-3">Баланс</div>
      <div
        class="gap-4 mt-2"
        :class="`grid grid-cols-${clientBalance?.length}`"
      >
        <div
          v-for="balanceKey in clientBalance"
          :key="balanceKey"
          class="rounded-lg bg-white h-[116px] flex justify-center items-center"
        >
          <div
            class="flex justify-center items-center rounded-[50%] bg-[#e0fdfd] h-10.75 w-10.75"
          >
            <IconFolderM />
          </div>
          <div class="ml-4">
            <div class="text-[#D10505] text-2xl font-semibold">
              {{ clientDetail?.balance[balanceKey] }}
            </div>
            <div class="text-gray-3">{{ balanceKey }}</div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-4 mt-5">
        <div class="p-6 rounded-lg bg-white">
          <div class="border-b border-[#E1E4E4] flex cursor-pointer py-5.75">
            <div><IconEditb /></div>
            <div class="fs-16 text-[#299B9B] ml-2">Редактрировать</div>
          </div>
          <div class="border-b border-[#E1E4E4] flex cursor-pointer py-5.75">
            <div class="mt-1"><IconLocation /></div>
            <div class="fs-16 text-[#299B9B] ml-2">Фотографии</div>
          </div>
          <nuxt-link
            :to="{
              path: '/orders/create-orders/creating-orders/',
              query: { clientId: route.params.id },
            }"
            class="border-b border-[#E1E4E4] flex items-center cursor-pointer py-5.75"
          >
            <div class="text-lg text-[#8FA0A0]"><IconPlus /></div>
            <div class="text-base text-[#299B9B] ml-2">Добавить продукт</div>
          </nuxt-link>
          <div
            @click="locationModal = true"
            class="border-b border-[#E1E4E4] flex cursor-pointer py-5.75"
          >
            <div class="mt-1"><IconLocation /></div>
            <div class="fs-16 text-[#299B9B] ml-2">Местополажение на карте</div>
          </div>
          <div class="flex items-center cursor-pointer py-5.75">
            <div class="text-lg text-[#8FA0A0]"><IconAttach /></div>
            <div class="text-base text-[#299B9B] ml-2">Прикрепить файл</div>
          </div>
        </div>
        <div class="rounded-lg bg-white">
          <div
            class="border-b border-[#E1E4E4] flex justify-between py-4.5 px-6"
          >
            <div class="fs-14 text-gray-2">Название фирмы</div>
            <div class="fs-16 font-semibold text-gray-3">
              {{ clientDetail?.company_name }}
            </div>
          </div>
          <div
            class="border-b border-[#E1E4E4] flex justify-between py-4.5 px-6"
          >
            <div class="fs-14 text-gray-2">Aктивный </div>
            <div class="fs-16 font-semibold text-gray-3">
              {{ clientDetail?.is_active ? "Активный" : "Не активный" }}
            </div>
          </div>
          <div
            class="border-b border-[#E1E4E4] flex justify-between py-4.5 px-6"
          >
            <div class="fs-14 text-gray-2">Телефон</div>
            <div class="fs-16 font-semibold text-gray-3">
              {{ clientDetail?.phone }}
            </div>
          </div>
          <div
            class="border-b border-[#E1E4E4] flex justify-between py-4.5 px-6"
          >
            <div class="fs-14 text-gray-2">Территория</div>
            <div class="fs-16 font-semibold text-gray-3">
              {{ clientDetail?.territory }}
            </div>
          </div>
          <div
            class="border-b border-[#E1E4E4] flex justify-between py-4.5 px-6"
          >
            <div class="fs-14 text-gray-2">Категория</div>
            <div class="fs-16 font-semibold text-gray-3">
              {{ clientDetail?.category }}
            </div>
          </div>
          <div
            class="border-b border-[#E1E4E4] p-3 flex justify-between py-4.5 px-6"
          >
            <div class="fs-14 text-gray-2">Адрес</div>
            <div class="fs-16 font-semibold text-gray-3">
              {{ clientDetail?.address }}
            </div>
          </div>
          <div
            class="border-b border-[#E1E4E4] flex justify-between py-4.5 px-6"
          >
            <div class="fs-14 text-gray-2">Ориентир</div>
            <div class="fs-16 font-semibold text-gray-3">
              {{ clientDetail?.navigate }}
            </div>
          </div>
          <div
            class="border-b border-[#E1E4E4] flex justify-between py-4.5 px-6"
          >
            <div class="fs-14 text-gray-2">Контактное лицо</div>
            <div class="fs-16 font-semibold text-gray-3">
              {{ clientDetail?.contact }}
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-white">
          <div
            class="border-b border-[#E1E4E4] flex justify-between py-4.5 px-6"
          >
            <div class="fs-14 text-gray-2">Дни посещений</div>
            <div class="flex gap-3.25">
              <div
                class="fs-16 font-semibold"
                v-for="(day, index) in visitDays"
                :key="day"
                :class="
                  clientDetail?.visit_days.includes(index)
                    ? 'text-[#299B9B]'
                    : 'text-gray-3'
                "
              >
                {{ day }}
              </div>
            </div>
          </div>
          <div
            class="border-b border-[#E1E4E4] flex justify-between py-4.5 px-6"
          >
            <div class="fs-14 text-gray-2">Агент</div>
            <div class="flex gap-2">
              <div
                v-for="(agent, index) in clientDetail?.agents"
                :key="agent"
                class="fs-16 font-semibold text-gray-3 w-fit"
              >
                {{ getShorttedAgentName(agent) }}
                <span v-if="index < clientDetail?.agents?.length - 1">,</span>
              </div>
            </div>
          </div>
          <div
            class="border-b border-[#E1E4E4] flex justify-between py-4.5 px-6"
          >
            <div class="fs-14 text-gray-2">Форма собственности</div>
            <div class="fs-16 font-semibold text-gray-3"></div>
          </div>
          <div
            class="border-b border-[#E1E4E4] flex justify-between py-4.5 px-6"
          >
            <div class="fs-14 text-gray-2">Зарегистрирован</div>
            <div class="fs-16 font-semibold text-gray-3">
              {{ getFormattedDate(clientDetail?.created_date) }}
            </div>
          </div>
          <div
            class="border-b border-[#E1E4E4] flex justify-between py-4.5 px-6"
          >
            <div class="fs-14 text-gray-2">Добавил</div>
            <div class="fs-16 font-semibold text-gray-3">
              {{ clientDetail?.created_by }}
            </div>
          </div>
          <div class="border-[#E1E4E4] flex justify-between py-4.5 px-6">
            <div class="fs-14 text-gray-2">Изменён</div>
            <div class="fs-16 font-semibold text-gray-3">
              {{ getFormattedDate(clientDetail?.last_modified_date) }}
            </div>
          </div>
        </div>
      </div>
      <ClientsAboutClientsFilterCard class="mt-7.5" />
      <div class="mt-5">
        <DoubleTab
          tab-name="Заказы"
          range-tab-name="Ассортимент"
          sales-tab-name="Динамика продаж"
          debt-tab-name="Долги"
          equipment-tab-name="Оборудование"
          photo-tab-name="Фотоотчёт"
          coordinate-tab-name="Координаты"
          @change="activeTabNumber = $event"
          :initialTabNumber="activeTabNumber"
          class="mb-6"
        >
          <template #order>
            <ClientsAboutClientsOrder
              :is-active="activeTabNumber === 5"
              :clientOrderCount="clientOrderCount"
              :clientSalesAmount="clientSalesAmount"
            />
          </template>
          <template #range>
            <ClientsAboutClientsRange
              :is-active="activeTabNumber === 6"
              :clientOrderCount="clientOrderCount"
              :clientSalesAmount="clientSalesAmount"
            />
          </template>
          <template #sales>
            <ClientsAboutClientsSalesDynamics
              :is-active="activeTabNumber === 7"
            />
          </template>
          <template #debt>
            <ClientsAboutClientsDebts :is-active="activeTabNumber == 8" />
          </template>
          <template #equipment>
            <ClientsAboutClientsEquipment :is-active="activeTabNumber === 9" />
          </template>
          <template #photo>
            <ClientsAboutClientsPhotoReport
              :is-active="activeTabNumber === 10"
            />
          </template>
          <template #coordinate>
            <ClientsAboutClientsCoordinte :is-active="activeTabNumber === 11" />
          </template>
        </DoubleTab>
      </div>
    </div>
    <transition name="modal">
      <div v-if="locationModal">
        <d-modal
          @closeDialog="locationModal = false"
          :dataContainerWidth="'625px'"
          :name="'Местоположение на карте'"
        >
          <lazy-clients-equipment-location
            :location="clientDetail?.lat_lng"
            @closeDialog="locationModal = false"
          />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
import moment from "moment";
// store
const clientsStore = useClientsStore("main");

// states
const route = useRoute();
const clientDetail = ref(null);
const newUnitModal = ref(false);
const clientOrderCount = ref(null);
const clientSalesAmount = ref(null);
const locationModal = ref(false);

const visitDays = ref({
  Monday: "Пн",
  Tuesday: "Вт",
  Wednesday: "Ср",
  Thursday: "Чт",
  Friday: "Пт",
  Saturday: "Сб",
  Sunday: "Вс",
});
const activeTabNumber = ref(5);

// methods
onMounted(async () => {
  const clientId = route.params.id;
  clientDetail.value = await clientsStore.getClientDetailById(clientId);
  clientOrderCount.value = await clientsStore.getClientOrdersCount(clientId);
  clientSalesAmount.value = await clientsStore.getClientSalesAmount(clientId);
});

function openNewUnit() {
  newUnitModal.value = false;
}

const clientBalance = computed(() => {
  if (clientDetail.value?.balance) {
    const keys = Object.keys(clientDetail.value.balance);
    return keys;
  }
  return [];
});

const getShorttedAgentName = (agentName) => {
  return agentName.slice(0, Math.round(agentName.length / 2)) + "...";
};

const getFormattedDate = (date) => {
  return date && moment.utc(date).format("YYYY-MM-DD HH:mm:ss");
};
</script>

<style scoped>
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
</style>
