<template>
  <div class="sidebar" :class="isOpened ? 'open' : ''" :style="cssVars">
    <div class="content-square">
      <nuxt-link to="/dashboard/supervayzer" class="square"></nuxt-link>
    </div>
    <div class="logo-details">
      <img
        v-if="menuLogo"
        :src="menuLogo"
        alt="menu-logo"
        class="menu-logo icon"
      />
      <div @click="openDrawer" class="drower cursor-pointer">
        <IconDrower></IconDrower>
      </div>
    </div>
    <div class="sidbar-content">
      <div id="my-scroll">
        <ul class="nav-list h-full relative">
          <div
            v-for="(menuItem, index) in arr"
            @click="preventLinkClick"
            class="sidebar-data"
            :key="index"
          >
            <li
              class="py-1 mt-2 hover:bg-[#033030]"
              :class="[
                (menu.isOpen && menu.index === index) ||
                (menuItem.childs.find((i) => i.url === $route.path) &&
                  !menu.isOpen)
                  ? 'bg-[#033030]'
                  : '',
                isOpened ? 'pl-6 ' : 'pl-4',
              ]"
            >
              <a
                @click="openItem(index)"
                :href="menuItem.link"
                class="gap-2 cursor-pointer relative"
                :class="
                  (menu.isOpen && menu.index === index) ||
                  (menuItem.childs.find((i) => i.url === $route.path) &&
                    !menu.isOpen)
                    ? 'bg-[#033030]'
                    : ''
                "
              >
                <div
                  v-if="!isOpened"
                  class="w-full flex flex-col gap-1.5 justify-center"
                >
                  <img
                    :src="menuItem.getImageUrl"
                    alt="menu-icon"
                    class="transform-scale ml-2"
                  />
                  <div class="whitespace-nowrap text-white fs-12">
                    {{ menuItem.miniMenuName }}
                  </div>
                </div>
                <img v-else :src="menuItem.getImageUrl" alt="menu-icon" />
                <nuxt-link
                  to="/settings/company-profile"
                  v-if="menuItem.Name === 'Настройки'"
                  class="links_name"
                  >{{ menuItem.Name }}</nuxt-link
                >
                <span v-else class="links_name">{{ menuItem.Name }}</span>
                <div
                  v-if="menu.isOpen && menu.index === index"
                  class="absolute right-6"
                >
                  <IconCreateDownt v-if="isOpened" class="transform-scale" />
                </div>
                <div
                  v-if="menu.index !== index && isOpened"
                  class="absolute right-6"
                >
                  <IconCreateDownb class="transform-scale" />
                </div>
                <div
                  v-if="menu.index === index && !menu.isOpen && isOpened"
                  class="absolute right-6"
                >
                  <IconCreateDownb class="transform-scale" />
                </div>
              </a>
              <span class="tooltip">{{
                menuItem.tooltip || menuItem.name
              }}</span>
            </li>
            <transition name="slide">
              <div
                v-if="isOpened"
                class="collapsed hover:text-white list max-h-40 overflow-y-auto bg-[#033030] pt-2"
                v-show="menu.isOpen && menu.index === index"
              >
                <nuxt-link
                  :class="[
                    $route?.fullPath === item.url ? 'active' : '',
                    item?.query &&
                      $route.fullPath ===
                        `${item.url}?${item.query}=${item?.queryValue || ''}` &&
                      'active',
                  ]"
                  class="block child-item1 hover:bg-teal-900"
                  v-for="(item, itemIndex) in menuItem.childs"
                  :key="itemIndex"
                  target="blank"
                  :href="item.url"
                  @click="onChangeUrl(item)"
                >
                  <div v-if="item.childs?.length > 0">
                    <div
                      @click="item.isOpen = !item.isOpen"
                      class="flex items-center justify-between"
                    >
                      <span class="ml-16 text-xs leading-4 act">{{
                        item.Name
                      }}</span>
                      <IconCreateDownt
                        v-if="item.isOpen"
                        class="mr-6 transform-scale"
                      />
                      <IconCreateDownb v-else class="mr-6 transform-scale" />
                    </div>
                    <div class="flex flex-col" v-if="item.isOpen">
                      <div
                        class="child-item1 hover:bg-teal-900"
                        v-for="grandItem in item?.childs"
                        :key="grandItem.url"
                      >
                        <div
                          @click="$router.push(grandItem.url)"
                          class="ml-16 text-xs leading-4 act"
                        >
                          {{ grandItem.Name }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="ml-16 text-xs leading-4 act">
                    {{ item.Name }}
                  </div>
                </nuxt-link>
              </div>
            </transition>
            <div class="hover-data" v-if="isOpened === false">
              <div
                :class="{ grid: menuItem.childs.length > 6 }"
                class="gap-2 px-2"
              >
                <button
                  class="child-item whitespace-nowrap rounded-lg text-left"
                  v-for="item in menuItem.childs"
                  :key="item"
                  @click="$router.push(item.url ? item.url : '')"
                >
                  {{ item.Name }}
                </button>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import images from "~/components/sidebar/images";

const isOpened = ref(true);
const props = defineProps({
  //! Menu settings
  isMenuOpen: {
    type: Boolean,
    default: true,
  },
  menuTitle: {
    type: String,
    default: "Akahon",
  },
  menuLogo: {
    type: String,
    default: "",
  },
  menuIcon: {
    type: String,
    default: "bxl-c-plus-plus",
  },
  isPaddingLeft: {
    type: Boolean,
    default: true,
  },
  menuOpenedPaddingLeftBody: {
    type: String,
    default: "250px",
  },
  menuClosedPaddingLeftBody: {
    type: String,
    default: "78px",
  },
  //! Search
  isSearch: {
    type: Boolean,
    default: true,
  },
  searchPlaceholder: {
    type: String,
    default: "Search...",
  },
  searchTooltip: {
    type: String,
    default: "Search",
  },

  //! Profile detailes
  profileImg: {
    type: String,
  },
  profileName: {
    type: String,
    default: "Fayzullo Saidakbarov",
  },
  profileRole: {
    type: String,
    default: "Frontend vue developer",
  },
  isExitButton: {
    type: Boolean,
    default: true,
  },
  isLoggedIn: {
    type: Boolean,
    default: true,
  },

  //! Styles
  bgColor: {
    type: String,
    default: "#043F3F",
  },
  secondaryColor: {
    type: String,
    default: "#1d1b31",
  },
  homeSectionColor: {
    type: String,
    default: "#e4e9f7",
  },
  logoTitleColor: {
    type: String,
    default: "#fff",
  },
  iconsColor: {
    type: String,
    default: "#fff",
  },
  itemsTooltipColor: {
    type: String,
    default: "#e4e9f7",
  },
  searchInputTextColor: {
    type: String,
    default: "#fff",
  },
  menuItemsHoverColor: {
    type: String,
    default: "#fff",
  },
  menuItemsTextColor: {
    type: String,
    default: "#fff",
  },
  menuFooterTextColor: {
    type: String,
    default: "#fff",
  },
});
function preventLinkClick(event) {
  event.preventDefault();
}
const arr = ref([
  {
    Name: "SVR Dashboard",
    miniMenuName: "Dashboard",
    isOpen: false,
    getImageUrl: images["svrdashboard"],
    childs: [
      {
        Name: "Supervizor",
        url: "/dashboard/supervayzer",
      },
      {
        Name: "Sales",
        url: "/dashboard/sales",
      },
      {
        Name: "Фотоотчёт по кассе",
        url: "/dashboard/photoReport",
      },
      {
        Name: "Акт сверки",
        url: "/dashboard/act-reconcilition",
      },
      {
        Name: "Поставщики",
        url: "/dashboard/suppliers",
      },
      {
        Name: "Акт сверки 2",
        url: "/dashboard/act-reconcilition2",
      },
      {
        Name: "Долги по заказам",
        url: "/dashboard/debts-orders",
      },
      {
        Name: "Оплаты поставщикам",
        url: "/dashboard/payment-suppliers",
      },
      {
        Name: "Обороты по поставщикам",
        url: "/dashboard/turnovers-suppliers",
      },
      {
        Name: "Обороты по клиентам",
        url: "/dashboard/turnovers-clients",
      },
      {
        Name: "Начальные балансы (остатки) клиентов",
        url: "/dashboard/initial-balance-clients",
      },
      {
        Name: "Начальные балансы (остатки) поставщиков",
        url: "/dashboard/initial-balance-suppliers",
      },
      {
        Name: "Расходы",
        url: "/dashboard/expenses",
      },
      {
        Name: "Остатки денежный средств",
        url: "/dashboard/cash-balance",
      },
      {
        Name: "Движения денежных средств",
        url: "/dashboard/cash-flows",
      },
      {
        Name: "Кассы",
        url: "/dashboard/checkout",
      },
      {
        Name: "Статьи расходов",
        url: "/dashboard/expenditure",
      },
      {
        Name: "Прочие приходы",
        url: "/dashboard/other-income",
      },
      {
        Name: "Заявки на оплату",
        url: "/dashboard/applications-payment",
      },
      {
        Name: "Финансы",
        url: "/dashboard/finans",
      },
      {
        Name: "Зарплаты сотрудников",
        url: "/dashboard/employee-salaries",
      },
      {
        Name: "Табел",
        url: "/dashboard/tabel",
      },
      {
        Name: "Qarzdorlik",
        url: "/dashboard/backlog",
      },
      {
        Name: "Tashqi qarzdorlik",
        url: "/dashboard/foreign-debt",
      },
      {
        Name: "Касса",
        url: "/dashboard/cash-register",
      },
    ],
  },
  // {
  //   Name: "Sales dashboard",
  //   isOpen: false,
  //   getImageUrl: images["salesdashboard"],
  //   childs: [
  //     {
  //       Name: "Sales",
  //     },
  //   ],
  // },
  {
    Name: "Заявки",
    miniMenuName: "Заявки",
    isOpen: false,
    getImageUrl: images["aplication"],
    childs: [
      {
        Name: "Заявки",
        url: "/orders/orders",
      },
      // {
      //   Name: "Создать заказ",
      //   url: "/orders/create-orders ",
      // },
      {
        Name: "Создать возврат с полки",
        url: "/orders/create-orders",
        query: "refund",
      },
      {
        Name: "Создать обмен",
        url: "/orders/create-orders",
        query: "exchange",
      },
      {
        Name: "Отказы",
        url: "/orders/refusals",
      },
      {
        Name: "Возврат тары",
        url: "/orders/return-containers",
      },
      {
        Name: "Заявки (Van Selling)",
        url: "/orders/order-van-selling",
        query: "order_type",
        queryValue: 1,
      },
      {
        Name: "Возврат (Van Selling)",
        url: "/orders/order-van-selling",
        query: "order_type",
        queryValue: 2,
      },
    ],
  },
  {
    Name: "Диагностика",
    miniMenuName: "Диагностика",
    isOpen: false,
    getImageUrl: images["diagnostica"],
    childs: [
      {
        Name: " Outlet",
        url: "/diagnostics/forecast",
      },
      // {
      //   Name: " Общее",
      //   url: "doctor/doctor2",
      // },
      {
        Name: " Strike rate",
        url: "/diagnostics/strike-rate",
      },
      {
        Name: " SKU",
        url: "/diagnostics/sku",
      },
      {
        Name: " AKB",
        url: "/diagnostics/akb",
      },
      {
        Name: " Personal",
        url: "/diagnostics/personal",
      },
      {
        Name: "Plan",
        isOpen: false,
        childs: [
          {
            Name: "Outlet",
            url: "/diagnostics/plan/outlet",
          },
          {
            Name: "TargetVolume",
            url: "/diagnostics/plan/volume",
          },
          {
            Name: "Akb",
            url: "/diagnostics/plan/akb",
          },
          {
            Name: "Sku",
            url: "/diagnostics/plan/sku",
          },
          {
            Name: "Strike rate",
            url: "/diagnostics/plan/strike-rate",
          },
        ],
      },
    ],
  },
  {
    Name: "Планы",
    miniMenuName: "Планы",
    isOpen: false,
    getImageUrl: images["plan"],
    childs: [
      {
        Name: " Результаты",
        url: "/planning/monthly2",
      },
      {
        Name: " Outlet targeting",
        url: "/planning/outlet",
      },
      {
        Name: " Установка планов",
        url: "/planning/install-plan",
      },
      {
        Name: " Установка план по товарам",
        url: "/planning/plan-product/create",
      },
      {
        Name: " План по товарам",
        url: "/planning/plan-product",
      },
    ],
  },
  {
    Name: "Склад",
    miniMenuName: "Склад",
    isOpen: false,
    getImageUrl: images["warehouse"],
    childs: [
      {
        Name: "Warehouses",
        url: "/warehouses/warehouses",
      },
      {
        Name: "Поступление",
        url: "/warehouses/entrance",
      },
      {
        Name: "Отчет по поступлениям",
        url: "/warehouses/income-reports",
      },
      {
        Name: "Корректировка склада",
        url: "/warehouses/adjustments",
      },
      {
        Name: "Материальный отчет",
        url: "/warehouses/material-report",
      },
      {
        Name: "Возврат поставщика",
        url: "/warehouses/suplier-refund",
      },
      {
        Name: "Остатки товаров",
        url: "/warehouses/remaining-goods",
      },
      {
        Name: "Остатки на определенную дату",
        url: "/warehouses/balance-certin-date",
      },
      {
        Name: "Поступление товаров",
        url: "/warehouses/receipt-goods",
      },
      {
        Name: "Перемещение товара",
        url: "/warehouses/moving-goods",
      },
      {
        Name: "Склад финального отчета",
        url: "/warehouses/final-report",
      },
      {
        Name: "Cписание",
        url: "/warehouses/write-downs",
      },
    ],
  },
  {
    Name: "Клиенты",
    miniMenuName: "Клиенты",
    isOpen: false,
    getImageUrl: images["clients"],
    childs: [
      {
        Name: "Клиенты",
        url: "/clients/clients",
      },
      // {
      //   Name: "Групповая обработка",
      //   url: "/clients/group-process",
      // },
      {
        Name: "Оплата клиентов",
        url: "/clients/payment-customers",
      },
      {
        Name: "Балансы клиентов",
        url: "/clients/customer-balances",
      },
      {
        Name: "Клиенты на карте",
        url: "/clients/customer-maps",
      },
      {
        Name: "Оборудования",
        url: "/clients/equipments",
      },
      {
        Name: "Остатки в торговых точках",
        url: "/clients/bonuses-retail-outlets",
      },
      {
        Name: "Объединение клиентов",
        url: "/clients/combining-clients",
      },
      {
        Name: "Контакты",
        url: "/clients/contacts",
      },
      {
        Name: "Отчет по таре",
        url: "/clients/container-reports",
      },
      {
        Name: "Рассылка смс",
        url: "/clients/sending-sms",
      },
    ],
  },
  // {
  //   Name: "Агенты",
  //   isOpen: false,
  //   getImageUrl: images["agent"],
  //   childs: [
  //     {
  //       Name: "Агенты",
  //       url: "/agents",
  //     },
  //   ],
  // },
  {
    Name: "Отчёт",
    miniMenuName: "Отчёт",
    isOpen: false,
    getImageUrl: images["report"],
    childs: [
      {
        Name: "Табел",
        url: "/reports/table",
      },
      {
        Name: "Продажи по клиентам",
        url: "/reports/customer",
      },
      {
        Name: "Заказы по агентам",
        url: "/reports/order-by-agents",
      },
      {
        Name: "Отчёт по дням",
        url: "/reports/by-day",
      },
      {
        Name: "История изменения цен",
        url: "/reports/price",
      },
      {
        Name: "Отчёт по кол-во заказов",
        url: "/reports/number-of-orders",
      },
      {
        Name: " Продажи по клиентам 2",
        url: "/reports/customer/minimum",
      },
      {
        Name: " Продажи по клиентам 3",
        url: "/reports/customer/client",
      },
      {
        Name: " Продажи по товарам",
        url: "/reports/volume-report",
      },
      {
        Name: " По Sku 2.0",
        url: "/reports/volume-report/version2",
      },
      {
        Name: " Отгрузки по экспедиторам",
        url: "/reports/expeditor",
      },
      {
        Name: " Возврат Экспедитора",
        url: "/reports/expeditor-report",
      },
      {
        Name: " Excel экспорт",
        url: "/reports/excel-export",
      },
      {
        Name: " По инвентарю",
        url: "/reports/inventory",
      },
      {
        Name: " Фото отчёты",
        url: "/reports/photo-report",
      },
      {
        Name: "  Rlp отчёты",
        url: "/reports/rlp-report",
      },
      {
        Name: " По бонусам",
        url: "/reports/bonus",
      },
      {
        Name: " Накопительный бонус",
        url: "/reports/bonus-accumulation",
      },
      {
        Name: " По визитам",
        url: "/reports/agent-check",
      },
      {
        Name: " По визитам 2.0",
        url: "/reports/visits",
      },
      {
        Name: " Отчет по дневному посещению",
        url: "/reports/report-visit",
      },
      {
        Name: " Итоги визитов",
        url: "/reports/working-time",
      },
      {
        Name: " По ценам",
        url: "/reports/price",
      },
      {
        Name: " По тарам",
        url: "/reports/tara",
      },
      {
        Name: " Конструктор отчетов",
        url: "/reports/report-builder",
      },
      {
        Name: " Классификация торговых точек",
        url: "/reports/classification",
      },
      {
        Name: " Визит экспедиторов",
        url: "/reports/plan-expeditor/index",
      },
      {
        Name: " Универсальный отчет по скидкам",
        url: "/report/sale",
      },
      // {
      //   Name: " Универсальный отчёт по продажам",
      //   url: "/report/sale-detail",
      // },
      // {
      //   Name: " Детальный отчёт по скидкам",
      //   url: "/reports/discount-detail",
      // },
      // {
      //   Name: " RFM",
      //   url: "/reports/discount-detail",
      // },
    ],
  },
  {
    Name: "Команда",
    miniMenuName: "Команда",
    isOpen: false,
    getImageUrl: images["command"],
    childs: [
      {
        Name: "Агенты",
        url: "/command/agents",
      },
      {
        Name: "Создание ограничений",
        url: "/command/agents-limit",
      },
      {
        Name: "Супервайзеры",
        url: "/command/supervisors",
      },
      {
        Name: "Распределения товара по агентам",
        url: "/command/assignment-agent-product",
      },
      {
        Name: "KPI Установка",
        url: "/command/kpi-install",
      },
      {
        Name: "KPI Установка 2",
        url: "/command/kpi-install-2",
      },
      {
        Name: "KPI результаты",
        url: "/command/kpi-results",
      },
      {
        Name: "Эскпедитор",
        url: "/command/expeditor",
      },
      {
        Name: "Торговая команда",
        url: "/command/teams/auditors",
      },
      {
        Name: "Задачи",
        url: "/command/tasks",
      },
      {
        Name: "Рабочие дни",
        url: "/command/workdays",
      },
    ],
  },
  {
    Name: "Аудит",
    miniMenuName: "Аудит",
    isOpen: false,
    getImageUrl: images["audit"],
    childs: [
      {
        Name: " Дневной отчёт",
        url: "/audit/daily-report",
      },
      {
        Name: " Отчет по дневному посещению (Аудит) ",
        url: "/audit/report-visit",
      },
      {
        Name: "  Клиенты",
        url: "/audit/clients",
      },
      {
        Name: "Настройки",
        url: "/audit/settings/brand",
      },
      {
        Name: " Отчёты",
        url: "/audit/reports",
      },
      {
        Name: " Рейтинг фото-отчётов",
        url: "/audit/photo-report",
      },
      {
        Name: "Контроль мерчен",
        url: "/audit/mix-report",
      },
      {
        Name: " Ритейл аудит",
        url: "/audit/retail",
      },
      {
        Name: " Сторчек",
        url: "/audit/store-check",
      },
      // {
      //   Name: " Базовая представленность",
      //   url: "/audit/base",
      // },
      {
        Name: " Отчёт по опросам",
        url: "/audit/monthly-report",
      },
      {
        Name: " Анализ цен",
        url: "/audit/price-analysis",
      },
      {
        Name: " Присутствие по ДП",
        url: "/audit/available",
      },
    ],
  },
  {
    Name: "Настройки",
    miniMenuName: "Настройки",
    isOpen: false,
    getImageUrl: images["settings"],
    childs: [
      {
        Name: "Настройки",
        url: "/settings/company-profile",
      },
    ],
  },
]);
const route = useRoute();
const router = useRouter();

const menu = ref([
  {
    isOpen: false,
    index: 0,
  },
]);

// Methods
const onChangeUrl = (menuItem) => {
  if (!menuItem?.url) return;
  if (menuItem.url && menuItem?.query) {
    router.push({
      path: menuItem.url,
      query: { [menuItem?.query]: menuItem?.queryValue || "" },
    });
  } else {
    router.push({
      path: menuItem.url,
    });
  }
};
function openDrawer() {
  menu.value.isOpen = false;
  isOpened.value = !isOpened.value;
  localStorage.setItem("sidebar", isOpened.value ? "true" : "false");
}

function openItem(index) {
  if (menu.value.index === index) {
    menu.value.isOpen = !menu.value.isOpen;
  } else {
    menu.value.isOpen = true;
    menu.value.index = index;
  }
}

function checkOpened() {
  if (localStorage.getItem("sidebar")) {
    isOpened.value = localStorage.getItem("sidebar") === "true";
  }
  window.document.body.style.paddingLeft =
    isOpened.value && props.isPaddingLeft
      ? props.menuOpenedPaddingLeftBody
      : props.menuClosedPaddingLeftBody;
}

onMounted(() => {
  checkOpened();
  if (arr.value.find((i) => i.url === route.path)) {
    menu.value.isOpen = true;
  }
});
const cssVars = computed(() => {
  return {
    // '--padding-left-body': this.isOpened ? this.menuOpenedPaddingLeftBody : this.menuClosedPaddingLeftBody,
    "--bg-color": props.bgColor,
    "--secondary-color": props.secondaryColor,
    "--home-section-color": props.homeSectionColor,
    "--logo-title-color": props.logoTitleColor,
    "--icons-color": props.iconsColor,
    "--items-tooltip-color": props.itemsTooltipColor,
    "--serach-input-text-color": props.searchInputTextColor,
    "--menu-items-hover-color": props.menuItemsHoverColor,
    "--menu-items-text-color": props.menuItemsTextColor,
    "--menu-footer-text-color": props.menuFooterTextColor,
  };
});
watch(
  () => isOpened.value,
  () => {
    checkOpened();
  }
);
</script>

<style scoped>
.drower {
  position: absolute;
  right: -22px;
  z-index: 99999999999;
  top: -32px;
}

.open {
  display: block;
}

/* Google Font Link */
/*@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');*/
/*@import url('https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css');*/

.sidbar-content {
  display: flex;
  flex-direction: column;
  margin-top: -40px;
  justify-content: space-between;
  flex-grow: 1;
  max-height: calc(100% - 60px);
}

.collapsed {
  color: #cecdcd;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
}

.collapsed:hover {
  cursor: pointer;
}

.hover-data {
  display: none;
}

.sidebar-data {
  position: relative;
}

.sidebar-data:hover .hover-data {
  display: block;
  position: absolute;
  background: white;
  z-index: 99999;
  border-radius: 8px;
  left: 60px;
  top: -10px;
  padding-top: 15px;
  padding-bottom: 15px;
  cursor: pointer;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.child-item {
  padding-left: 15px;
  padding-right: 15px;
}

.child-item:hover {
  background: #d9dada;
}

.child-item:active {
  background-color: #b6b6b6;
}

.child-item1 {
  padding-top: 7px;
  padding-bottom: 7px;
  color: rgba(255, 255, 255, 0.5);
  transition: all 3s ease-out;
}

.content-square {
  display: flex;
  justify-content: center;
}

.active {
  width: 100%;
  position: relative;
  display: inline-block;
  background: #073b3b;
}
</style>
<style lang="scss">
.list .child-item1:hover {
  background: #043f3f;
}

.list .active {
  width: 100%;
  position: relative;
  display: inline-block;
  background: #073b3b;
}

.list .active:after {
  position: absolute;
  content: "";
  right: 0;
  bottom: 0;
  top: 0;
  border-right: 10px solid white;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
}

.list {
  transform-origin: top;
  transition: transform 0.3s ease-in-out;

  .child-item1 {
    background: #033030;
  }
}

.slide-leave-to,
.slide-enter-from {
  transform: scaleY(0);
}

.icon-wrapper {
  display: inline-block;
}

.transform-scale {
  transform: scale(1.2);
}
</style>
