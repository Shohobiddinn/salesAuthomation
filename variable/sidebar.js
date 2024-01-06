import { AppRoutes } from "~/variable/routes";
import images from "~/components/sidebar/images";

export function Sidebars() {
  const arr = ref([
    {
      Name: "SVR Dashboard",
      isOpen: false,
      getImageUrl: images["svrdashboard"],
      childs: [],
    },
    {
      Name: "Sales dashboard",
      isOpen: false,
      getImageUrl: images["salesdashboard"],
      childs: [],
    },
    {
      Name: "Заявки",
      isOpen: false,
      getImageUrl: images["aplication"],
      url: "/orders",
      childs: [
        {
          Name: "Заявки",
          url: "/orders",
        },
        {
          Name: "Создать заказ",
          url: "/create-orders",
        },
        {
          Name: "Создать возврат с полки",
          url: "/create-return",
        },
        {
          Name: "Создать обмен",
          url: "/create-exchange",
        },
        {
          Name: "Отказы",
          url: "/refusals",
        },
        {
          Name: "Возврат тары",
          url: "/return-containers",
        },
        {
          Name: "Заявки (Van Selling)",
          url: "/create-exchange",
        },
        {
          Name: "Возврат (Van Selling)",
          url: "/return-van-selling",
        },
      ],
    },
    {
      Name: "Диагностика",
      isOpen: false,
      getImageUrl: images["diagnostica"],
      childs: [],
    },
    {
      Name: "Планы",
      isOpen: false,
      getImageUrl: images["plan"],
      childs: [],
    },
    {
      Name: "Склад",
      isOpen: false,
      getImageUrl: images["warehouse"],
      childs: [],
    },
    {
      Name: "Клиенты",
      isOpen: false,
      getImageUrl: images["clients"],
      url: "/clients",
      childs: [
        { Name: "Балансы клиентов", url: "/customer-balances" },
        { Name: "Оплата клиентов", url: "/payment-customers" },
        { Name: "Остатки в торговых точках", url: "/bonuses-retail-outlets" },
        { Name: "Объединение клиентов", url: "/combining-clients" },
        { Name: "Контакты", url: "/contacts" },
        { Name: "Отчет по таре", url: "/container-reports" },
        { Name: "Клиенты", url: "/clients" },
        { Name: "Клиенты на карте", url: "/customer-maps" },
        { Name: "Оборудования", url: "/equipments" },
        { Name: "Оплата клиентов", url: "/payment-customers" },
        { Name: "Рассылка смс", url: "/sending-sms" },
      ],
    },
    {
      Name: "Агенты",
      isOpen: false,
      getImageUrl: images["agent"],
      childs: [],
    },
    {
      Name: "Отчёт",
      isOpen: false,
      getImageUrl: images["report"],
      url: "/report",
      childs: [
        {
          Name: "Табел",
          url: "/table",
        },
        {
          Name: "Продажи по клиентам",
          url: "/customer",
        },
        {
          Name: "Отгрузки по экпедиторам",
          url: "/expeditor",
        },
      ],
    },
    {
      Name: "Команда",
      isOpen: false,
      getImageUrl: images["command"],
      url: "/command",
      childs: [
        {
          Name: "Агенты",
          url: "/agents",
        },
        {
          Name: "Создание ограничений",
          url: "/agents-limit",
        },
        {
          Name: "Супервайзеры",
          url: "/supervisors",
        },
        {
          Name: "Распределения товара по агентам",
          url: "/assignment-agent-product",
        },
        {
          Name: "KPI Установка",
          url: "/kpi-install",
        },
        {
          Name: "KPI Установка 2",
          url: "/kpi-install-2",
        },
        {
          Name: "KPI результаты",
          url: "/kpi-results",
        },
        {
          Name: "Эскпедитор",
          url: "/expeditor",
        },
        {
          Name: "Торговая команда",
          url: "/teams",
        },
        {
          Name: "Задачи",
          url: "/tasks",
        },
      ],
    },
    {
      Name: "Аудит",
      isOpen: false,
      getImageUrl: images["audit"],
      url: "/audit",
      childs: [{
        Name: "Аудит",
        url: '/settings'
      }],
    },
    {
      Name: "Настройки",
      isOpen: false,
      getImageUrl: images["settings"],
      url: "/settings",
      childs: [
        {
          Name: "Настройки",
          url: "/",
        },
      ],
    },
  ]);
  const auditMenu = [
    {
      id: 1,
      name: "1. Бренды",
      nameEng: "brand",
      url: "/brand",
    },
    {
      id: 2,
      name: "2. Тип упаковки",
      nameEng: "packing",
      url: "/packing",
    },
    {
      id: 3,
      name: "3. Сегмент",
      nameEng: "segment",
      url: "/segment",
    },
    {
      id: 4,
      name: "4. Производитель",
      nameEng: "manufacturer",
      url: "/manufacturer",
    },
    {
      id: 5,
      name: "5. Разделение продуктов",
      nameEng: "separation-products",
      url: "/separation-products",
    },
    {
      id: 6,
      name: "6. Продукт",
      nameEng: "product",
      url: "/product",
    },
    {
      id: 7,
      name: "7. Продукт конкурентов",
      nameEng: "competitors-product",
      url: "/competitors-product",
    },
    {
      id: 8,
      name: "8. Дополнительные параметры",
      nameEng: "additional-options",
      url: "/additional-options",
    },
    {
      id: 9,
      name: "9. Опросы",
      nameEng: "polls",
      url: "/polls",
    },
    {
      id: 10,
      name: "10. Аудит",
      nameEng: "audit",
      url: "/audit",
    },
    {
      id: 11,
      name: "11. Комменты",
      nameEng: "comments",
      url: "/comments",
    },
  ];

  const settingsMenu = [
    {
      id: 1,
      name: "1. Профиль компании",
      nameEng: "company-profile",
      url: "/company-profile",
    },
    {
      id: 2,
      name: "2. Способ оплаты",
      nameEng: "currencies",
      url: AppRoutes.paymentMethods,
    },
    {
      id: 3,
      name: "3. Единицы измерения",
      nameEng: "units",
      url: AppRoutes.units,
    },
    {
      id: 4,
      name: "  4. Территория",
      nameEng: "territories",
      url: AppRoutes.territories,
    },
    {
      id: 5,
      name: "5. Категория клиента",
      nameEng: "client-categories",
      url: AppRoutes.clientCategories,
    },
    {
      id: 6,
      name: "6. Тип клиента",
      nameEng: "client-types",
      url: AppRoutes.clientTypes,
    },
    {
      id: 7,
      name: "7. Категория товара",
      nameEng: "product-category",
      url: "/product-category",
    },
    {
      id: 8,
      name: " 8. Товар",
      nameEng: "products",
      url: "/products",
    },
    {
      id: 9,
      name: "9. Тип цены",
      nameEng: "price-types",
      url: "/price-types",
    },
    {
      id: 10,
      name: "10. Цена",
      nameEng: "prices",
      url: "/prices",
    },
    {
      id: 11,
      name: "11. Причины отказа",
      nameEng: "rejects",
      url: AppRoutes.rejects,
    },
    {
      id: 12,
      name: "12. Причины Обмена и возврата",
      nameEng: "reject-defects",
      url: AppRoutes.rejectDefects,
    },
    {
      id: 13,
      name: "13. Категория фотоотчёта",
      nameEng: "photo-report-categories",
      url: AppRoutes.photoReportCategories,
    },
    {
      id: 14,
      name: " 14. Тип инвентаря",
      nameEng: "inventory-types",
      url: AppRoutes.inventoryTypes,
    },
    {
      id: 15,
      name: "15. Бонусы и скидки",
      url: "/bonuses-discounts",
      nameEng: "bonuses-discounts",
    },
    {
      id: 16,
      name: "16. RLP бонусы",
      nameEng: "rlp-discounts",
      url: "/rlp-discounts",
    },
    {
      id: 17,
      name: "17. Пользователи",
      nameEng: "users",
      url: AppRoutes.users,
    },
    {
      id: 18,
      name: "18. Партнеры",
      nameEng: "partner",
      url: "/partner",
    },
    {
      id: 19,
      name: "19. Примечание к заказу",
      nameEng: "order-comments",
      url: AppRoutes.orderComments,
    },
    {
      id: 20,
      name: "20. Закрытия",
      nameEng: "closures",
      url: "/closures",
    },
    {
      id: 21,
      name: "21. Типы задач",
      nameEng: "task-types",
      url: AppRoutes.taskTypes,
    },
    {
      id: 22,
      name: " 22. Направление торговли",
      nameEng: "direction-trade",
      url: "/direction-trade",
    },
    {
      id: 23,
      name: "23. Канал сбыта",
      nameEng: "sales-channel",
      url: "/sales-channel",
    },
    {
      id: 24,
      name: "24. Тип коробки",
      nameEng: "box-types",
      url: AppRoutes.boxTypes,
    },
    {
      id: 25,
      name: "25. Тип базы знания",
      nameEng: "knowledge-categories",
      url: AppRoutes.knowledgeCategories,
    },
    {
      id: 26,
      name: "26. База знания",
      nameEng: "knowledge-base",
      url: "/knowledge-base",
    },
    // {
    //   id: 27,
    //   name: "27. Интеграция",
    //   // url: "../Settings/Knowledgebase.html",
    // },
    {
      id: 28,
      name: "28. Принтеры",
      nameEng: "printers",
      url: "/printers",
    },
    {
      id: 29,
      name: "29. Тара",
      nameEng: "taras",
      url: "/taras",
    },
    {
      id: 30,
      name: "30. Время работы сотрудников",
      url: "/settings-fovorite-page",
      nameEng: "settings-fovorite-page",
    }
  ];
  const fullWindowLocations = [
    "settings-product-category-group-category",
    "settings-bonuses-discounts-create-bonus",
    "settings-bonuses-discounts-create-auto-discount",
    "settings-bonuses-discounts-create-auto-bonus",
    "settings-prices-list",
    "clients-group-process-unpin-agents",
    "clients-group-process-mark-audit",
    "clients-group-process-sales-channel",
    "clients-group-process-unpin-expeditors",
    "clients-group-process-attaching-auditor-client",
    "clients-group-process-change-territory-category",
    "clients-group-process-change-rlp-bonus",
    "clients-group-process-order-case-debt",
    "clients-group-process-attach-price-type",
    "clients-payment-customers-AddPayment",
    "clients-equipments-history-equipment",
    "clients-combining-clients-unifactions",
    "clients-contacts-clients-bonus",
    "clients-contacts-products-packages",
    "clients-sending-sms",
    "clients-sending-sms-send-sms",
    "clients-sending-sms-sms-group",
    "clients-sending-sms-send-sms-archive",
    "orders-create-orders-creating-order",
    "orders-create-orders-creating-orders",
    "orders-create-return-create-return",
    "orders-create-exchange-create-exchange-product",
    "orders-order-van-selling-order-history",
    "report-customer-auditor",
    "warehouses-entrance-create-parish",
    "warehouses-adjustments-inventory-warehouses",
    "warehouses-suplier-refund-suplier-refund",
    "warehouses-suplier-refund-make-refund-edit",
    "warehouses-suplier-refund-make-refund-add",
    "warehouses-suplier-refund-make-refund",
    "warehouses-remaining-goods-movement-goods-warehouses",
  ];
  return {
    arr,
    auditMenu,
    settingsMenu,
    fullWindowLocations,
  };
}
