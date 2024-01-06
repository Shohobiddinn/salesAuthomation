<template>
  <div class="header flex justify-between">
    <div class="flex">
      <div v-click-outside="outside">
        <div @click="cash" class="flex mt-4 ml-[30px] cursor-pointer relative">
          <div class="mt-0.5">
            <IconFiCalculator />
          </div>
          <div class="text-[#424F4F] ml-2">Касса</div>
          <div class="ml-4 mt-2">
            <IconArrowBottom />
          </div>
          <div
            v-if="openCash"
            class="absolute sh grid grid-cols-3 gap-4 bg-white top-8 z-50 w-220 rounded-lg p-4"
          >
            <div v-for="item in data">
              <div class="fw-6 py-3">{{ item.name }}</div>
              <div
                v-for="child in item.items"
                @click="clients(child.url)"
                class="flex gap-2 py-1"
              >
                <div class="mt-1">
                  <IconArrowRighti />
                </div>
                <span class="fs-14 fw-4">{{ child.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex mt-4 ml-[30px]">
        <div class="mt-[2px]">
          <IconLocation />
        </div>
        <div class="text-[#424F4F] ml-2">GPS</div>
      </div>
      <div v-if="count.filtersList === 1" class="relative">
        <div @click="feature = !feature" class="flex mt-4 ml-[30px] cursor-pointer">
          <div class="mt-[2px]">
            <IconFeature />
          </div>
          <div class="text-[#424F4F] ml-2">Избранные страницы</div>
          <div class="ml-4 mt-2">
            <IconArrowBottom />
          </div>
        </div>
        <div
          v-if="feature"
          class="h-[136px] p-4 shadow-[0px 4px 18px rgba(0, 0, 0, 0.08)] border left-[30px] top-[60px] z-[9999999] w-[155px] bg-white rounded-lg absolute"
        >
          <div class="flex pb-3 border-b cursor-pointer">
            <IconFiCalculator />
            <div class="rounded-[50%] h-[11px] w-[11px] bg-[#299B9B] mt-1 ml-2"></div>
            <div class="fs-12 ml-2">Lorem ipsum</div>
          </div>
          <div class="flex pt-3 pb-3 border-b cursor-pointer">
            <IconUserAdd />
            <div class="rounded-[50%] h-[11px] w-[11px] bg-[#057CD1] mt-1 ml-3"></div>
            <div class="fs-12 ml-2">Lorem ipsum</div>
          </div>
          <div class="mt-1">
            <button class="fs-12 text-[#299B9B] h-[32px] rounded-lg bg-[#F2F5F5] w-full">
              + Добавить еще
            </button>
          </div>
        </div>
      </div>
      <div v-if="count.filtersList === 2" class="flex mt-4 ml-[30px]">
        <div class="mt-[6px]">
          <IconArrowLefti />
        </div>
        <div class="text-[#424F4F] ml-4">
          <HeaderFilter />
        </div>
        <div class="text-[#424F4F] ml-4">
          <IconPechat />
        </div>
        <div class="text-[#424F4F] ml-4">
          <IconFish />
        </div>
        <div class="text-[#424F4F] ml-4">
          <IconIconsd />
        </div>
        <div class="text-[#424F4F] ml-4">
          <IconPlusD />
        </div>
        <div class="mt-[6px] ml-4">
          <IconArrowRighti />
        </div>
      </div>
    </div>

    <div class="flex gap-4 relative">
      <div v-click-outside="outside1" class="mt-4">
        <button @click="notification">
          <IconBellRing />
        </button>
        <div
          v-if="openNotification"
          class="absolute bg-white rounded-lg w-110 h-120 p-6 top-16 z-50 right-17"
        >
          <div class="text-[18px] text-black">Уведомления</div>
          <div class="h-90 overflow-y-auto">
            <div
              v-if="notifications"
              v-for="item in notifications"
              class="border rounded-lg mr-2 p-2 mt-3"
            >
              <div class="fw-6 text-black py-2">{{ item.title }}</div>
              <div class="fs-12 text-gray-400">{{ item.description }}</div>
              <div class="flex justify-between top-4">
                <div>{{ item.date }}</div>
                <button @click="notificationDialog = true" class="fs-12 text-blue-10">
                  Новости
                </button>
              </div>
            </div>
          </div>
          <div class="flex gap-4 mt-4">
            <div class="text-blue-20">Все оповещении</div>
            <div class="mt-2">
              <IconArrowRighti />
            </div>
          </div>
        </div>
      </div>
      <div :key="compKey" v-click-outside="outside2" class="mt-2">
        <button @click="personal" class="">
          <img src="~assets/ellipse.png" alt="" class="h-10 w-10 mr-3" />
        </button>
        <div
          v-if="openPersonal"
          class="absolute bg-white rounded-lg w-50 h-40 p-5 top-16 z-50 right-3"
        >
          <button class="flex gap-3">
            <IconUser />
            <div class="text-black">Личные данные</div>
          </button>
          <button @click="editLogin = true" class="flex gap-3.5 py-5">
            <IconCard />
            <div class="text-black">Биллинг</div>
          </button>
          <button @click="logOut" class="flex gap-3">
            <IconLogOut />
            <div class="text-red">Выйти</div>
          </button>
        </div>
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="notificationDialog">
      <h-no-modal @closeDialog="closeNotification" :dataContainerWidth="'600px'">
        <DashboardHeaderDialog />
      </h-no-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="editLogin">
      <d-modal
        @closeDialog="closeDialog"
        :dataContainerWidth="'400px'"
        :name="'Изменить логин и пароль'"
      >
        <DashboardHeaderEditLoginDialog />
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
import { useCountStore } from "~/stores/settings";
import { ref } from "vue";
import HeaderFilter from "~/components/icon/HeaderFilter.vue";

const countStore = useCountStore();
const count = countStore;
const feature = ref(false);
const openCash = ref(false);
const openPersonal = ref(false);
const openNotification = ref(false);
const editLogin = ref(false);
const notificationDialog = ref(false);
const router = useRouter();
const useAuzStore = useAuthStore();
function closeNotification() {
  notificationDialog.value = false;
}
const compKey = ref(0);
function logOut() {
  useCookie("token").value = undefined;
  window.location.pathname = "/login";
}
function clients(url) {
  router.push(url);
}
function notification() {
  openNotification.value = !openNotification.value;
}
function personal() {
  openPersonal.value = !openPersonal.value;
}
function cash() {
  openCash.value = !openCash.value;
}
function closeDialog() {
  editLogin.value = false;
}
function outside() {
  openCash.value = false;
}
function outside1() {
  openNotification.value = false;
}
function outside2() {
  openPersonal.value = false;
}
const data = ref([
  {
    name: "Расчеты с клиентами",
    items: [
      {
        name: "Оплаты клиентов",
        url: "/clients/payment-customers",
      },
      {
        name: "Акт сверки с клиентом",
        url: "/dashboard/client-act-reconcilition",
      },
      {
        name: "Обороты по всем клиентам",
        url: "/dashboard/turnovers-clients",
      },
      {
        name: "Начальные балансы клиентов",
        url: "/dashboard/initial-balance-clients",
      },
      {
        name: "Отчёт по поступлениям",
        url: "/warehouses/income-reports",
      },
      {
        name: "Балансы клиентов",
        url: "/clients/customer-balances",
      },
      {
        name: "Долги по заказам",
        url: "/dashboard/debts-orders",
      },
    ],
  },
  {
    name: "Расчеты с клиентами",
    items: [
      {
        name: "Поставщики",
        url: "/dashboard/suppliers",
      },
      {
        name: "Оплаты поставщикам",
        url: "/dashboard/payment-suppliers",
      },
      {
        name: "Обороты по всем поставщикам",
        url: "/dashboard/turnovers-suppliers",
      },
      {
        name: "Акт сверки с поставщиком",
        url: "/dashboard/expeditor-act-reconcilition",
      },
      {
        name: "Начальные балансы с поставщиком",
        url: "/dashboard/initial-balance-suppliers",
      },
    ],
  },
  {
    name: "Расчеты с клиентами",
    items: [
      {
        name: "Расходы",
        url: "/dashboard/expenses",
      },
      {
        name: "Остатки денежных средств",
        url: "/dashboard/cash-balance",
      },
      {
        name: "Движения денежных средств",
        url: "/dashboard/cash-flows",
      },
      {
        name: "Кассы",
        url: "/dashboard/checkout",
      },
      {
        name: "Статья расходов",
        url: "/dashboard/expenditure",
      },
      {
        name: "Прочие приходы в кассу",
        url: "/dashboard/other-income",
      },
      {
        name: "Подтверждение оплаты",
      },
      {
        name: "Подтверждение оплаты агента",
      },
      {
        name: "Финансы",
        url: "/dashboard/finans",
      },
    ],
  },
]);
const notifications = ref([
  {
    title: "Assalomu alaykum...",
    description:
      "Assalomu alaykum, hurmatli foydalanuvchi. Iltimos, xizmat ko'rsatishni 10 balik o'lcho'v bilan baholang! Quyidagi ilovaga",
    date: "18 oktyabr, 12:00",
  },
  {
    title: "Assalomu alaykum...",
    description:
      "Assalomu alaykum, hurmatli foydalanuvchi. Iltimos, xizmat ko'rsatishni 10 balik o'lcho'v bilan baholang! Quyidagi ilovaga",
    date: "18 oktyabr, 12:00",
  },
  {
    title: "Assalomu alaykum...",
    description:
      "Assalomu alaykum, hurmatli foydalanuvchi. Iltimos, xizmat ko'rsatishni 10 balik o'lcho'v bilan baholang! Quyidagi ilovaga",
    date: "18 oktyabr, 12:00",
  },
  {
    title: "Assalomu alaykum...",
    description:
      "Assalomu alaykum, hurmatli foydalanuvchi. Iltimos, xizmat ko'rsatishni 10 balik o'lcho'v bilan baholang! Quyidagi ilovaga",
    date: "18 oktyabr, 12:00",
  },
  {
    title: "Assalomu alaykum...",
    description:
      "Assalomu alaykum, hurmatli foydalanuvchi. Iltimos, xizmat ko'rsatishni 10 balik o'lcho'v bilan baholang! Quyidagi ilovaga",
    date: "18 oktyabr, 12:00",
  },
  {
    title: "Assalomu alaykum...",
    description:
      "Assalomu alaykum, hurmatli foydalanuvchi. Iltimos, xizmat ko'rsatishni 10 balik o'lcho'v bilan baholang! Quyidagi ilovaga",
    date: "18 oktyabr, 12:00",
  },
]);
</script>

<style scoped>
.header {
  height: 61px;
}

.sh {
  box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.08);
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
