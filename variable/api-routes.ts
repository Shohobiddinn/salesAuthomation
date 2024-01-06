const runtimeConfig = useRuntimeConfig()
export class APIRoutes {
    // static _Base: string = "https://localhost:7177/api/web/";
    static _Base: string = process.env.NODE_ENV === 'development' ? "https://lider.hdd.uz/api/web/" : "/api/web/"
    static Login: string = this._Base + "Tokens";
    static CompanyProfilesList: string = this._Base + "CompanyProfiles/get-company";
    static CompanyProfiles: string = this._Base + "CompanyProfiles/change-company";
    static CompanyProfilesNds: string = this._Base + "CompanyProfiles/change-nds";
    static CompanyProfilesConfig: string = this._Base + "CompanyProfiles/change-config";
    static CompanyProfilesLogin: string = this._Base + "CompanyProfiles/change-login";
    static CompanyProfilesWithId = (value: string) => this._Base + `CompanyProfiles/${value}`;
    static CurrencyList: string = this._Base + "Currency/list";
    static Currency: string = this._Base + "Currency";
    static CategoryGroupsWithId = (value: string) => this._Base + `CategoryGroups/${value}`;
    static ClientsList: string = this._Base + "Clients/list";
    static ClientsSharedList: string = this._Base + "shared-api/clients";
    static ClientOrdersById: string = this._Base + 'Clients/orders';
    static ClientOrdersCountById = (clientId: string) => this._Base + `Clients/orders-count/${clientId}`;
    static ClientSalesAmountById = (clientId: string) => this._Base + `Clients/get-sales-amount/${clientId}`;
    static ClientProductsById = (clientId: string) => this._Base + `Clients/products/${clientId}`;
    static ClientPhotoReportById = (clientId: string) => this._Base + `Clients/photos/${clientId}`;
    static ClientDebtsById: string = this._Base + 'Clients/debts';
    static Clients: string = this._Base + "Clients/create";
    static ClientDeviceCurrentList: string = this._Base + "clients/device/current-list";
    static ClientDeviceWithdrawnList: string = this._Base + "clients/device/withdrawn-list";
    static ClientSalesDynamicsByDay: string = this._Base + "clients/sales-dynamic/by-day";
    static ClientSalesDynamicsByMonth: string = this._Base + "clients/sales-dynamic/by-month";
    static ClientSalesDynamicsByCategrory: string = this._Base + "clients/sales-dynamic/by-category";
    static ClientLocationHistory: string = this._Base + "clients/location-history";
    static ClientsRemainsByProduct: string = this._Base + "clients/remain/by-product";
    static ClientsRemainsByCategory: string = this._Base + "clients/remain/by-category";
    static ClientsPaymentList: string = this._Base + `client-finance/get-payments`;
    static ClientsPaymentCreate: string = this._Base + "client-finance/payment-create-list";
    static ClientsPaymentCreateGroup: string = this._Base + "client-finance/payment-create";
    static ClientPaymentInfoById = (debtId: string) => this._Base + `client-finance/payment/${debtId}`;
    static ClientBalance: string = this._Base + "client-finance/balance";
    static ClientsTotalBalances: string = this._Base + "client-finance/get-total-balance";
    static ClientCahngeTerm: string = this._Base + "client-finance/change-term";

    // region File upload
    static FileUpload: string = this._Base + "file";
    // endregion

    static ClientsGroupsWithId = (value: string) => this._Base + `Clients/update/${value}`;
    static ClientDetailWithId = (value: string) => this._Base + `Clients/detail/${value}`;
    static ClientsIdAgents = this._Base + 'Clients/get-agents';
    static ClientsIds = (value: string) => this._Base + `Clients/${value}`;
    static ClientsIdExpeditors = this._Base + 'Clients/get-expeditors';
    static ClientsIdAuditors = this._Base + 'Clients/get-auditors';
    static ClientsIdCategoryTerritories = this._Base + 'Clients/get-category-and-territories';
    static ClientsIdSalesChannel = this._Base + 'Clients/get-sales-channel';
    static ClientsIdPriceTypes = this._Base + 'Clients/get-price-types';
    static ClientsIdDebtBalance = this._Base + 'clients/debt-balance';
    static ClientsIdDebtFinanceReport = this._Base + 'clients/debt-finance-report';
    static ClientsAttachAgentsPut: string = this._Base + "Clients/attach-agents";
    static ClientsAttachAuditorsPut: string = this._Base + "Clients/attach-auditors";
    static ClientsAttachExpeditorsPut: string = this._Base + "Clients/attach-expeditors";
    static ClientsAttachCategoryTerritories: string = this._Base + "Clients/category-and-territory";
    static ClientsAttachSalesChannel: string = this._Base + "Clients/update-sales-channel";
    static ClientsAttachPriceType: string = this._Base + "Clients/update-price-types";
    static ClientsWithId = (value: string) => this._Base + `Clients/${value}`;
    static CategoryGroupsList: string = this._Base + "CategoryGroups/list";
    static CategoryGroups: string = this._Base + "CategoryGroups";
    static CategoryGroupsCategory = (value: string) => this._Base + `CategoryGroups/${value}/categories`;
    static CurrencyWithId = (value: string) => this._Base + `Currency/${value}`;
    static ClientsTara: string = this._Base + "Clients/tara-debts";
    static ClientsTaraTotal: string = this._Base + "Clients/total-tara";
    static KpiType: string = this._Base + "SystemConstants/kpi-template-type";
    static KpiRewardType: string = this._Base + "SystemConstants/kpi-template-reward-type";
    static KpiAdd: string = this._Base + "KPI/templates/create";
    static KpiWithIdUpdate = (value: string) => this._Base + `KPI/templates/update?templateId=${value}`;
    static KpiActivate = (value: string) => this._Base + `KPI/templates/activate?templateId=${value}`;
    static KpiDeActivate = (value: string) => this._Base + `KPI/templates/deactivate?templateId=${value}`;
    static KpiWithId = (value: string) => this._Base + `KPI/templates/get-by-id?id=${value}`;
    static KpiGetActive: string = this._Base + "KPI/templates/get-active";
    static KpiGetInActive: string = this._Base + "KPI/templates/get-deactive";
    static KpiGroupCreate: string = this._Base + "KPI/template-groups/create";
    static KpiGroupList: string = this._Base + "KPI/template-groups/list";
    static KpiGroupGetWithId = (value: string) => this._Base + `KPI/template-groups/get-by-id?id=${value}`;
    static KpiGroupDeleteWithId = (value: string) => this._Base + `KPI/template-groups/delete?id=${value}`;
    static KpiGroupWithId = (value: string) => this._Base + `KPI/template-groups/update?id=${value}`;
    static KpiGroupSettingsList: string = this._Base + "KPI/settings/get-groups";
    static KpiGroupSettingsGet: string = this._Base + "KPI/settings/get";
    static KpiGroupSettingsGetList: string = this._Base + "KPI/settings/get-list";
    static KpiUpsertCreate: string = this._Base + "KPI/settings/upsert";
    static KpiAgentsDetailList = (date: any, supervisorId: any) => this._Base + `/KPI/agent-detail?date=${date}&supervisorId=${supervisorId}`;
    // static KpiAgentsDetailList = (date: any, supervisorId:any) => this._Base + `/KPI/agent-detail?date=2023-05-19T06%3A19%3A59.811Z&supervisorId=e9f6c776-f0b9-4a58-bde6-02907bfeb5f8`;
    static KpiSupervisorDetailList: string = this._Base + "/KPI/supervisor-detail?date=2023-05-19T06%3A19%3A59.811Z&managerId=e9f6c776-f0b9-4a58-bde6-02907bfeb5f8";
    static KpiAgentsUpsertCreate: string = this._Base + "KPI/detail/upsert";
    static ExpeditorList: string = this._Base + "Expeditors/list";
    static EmployeeRejects: string = this._Base + "employee-rejects";
    static IncomesList: string = this._Base + "Incomes/list";
    static IncomesListV2: string = this._Base + "Incomes/list/v2";
    static Incomes: string = this._Base + "Incomes";
    // static IncomesProducts: string = this._Base + "Incomes/products";
    static IncomesProducts = this._Base + `Incomes/products`;
    static IncomesWithId = (value: string) => this._Base + `Incomes/${value}`;
    static UnitsList: string = this._Base + "Units/list";
    static Units: string = this._Base + "Units";
    static UnitsWithId = (value: string) => this._Base + `Units/${value}`;
    static ExpenseTypeCategory: string = this._Base + "expense-category";
    static ExpenseCategoryWithId = (value: string) => this._Base + `expense-category/${value}`;
    static ExpenseType: string = this._Base + "expense-type";
    static ExpenseWithId = (value: string) => this._Base + `expense-type/${value}`;
    static OtherIncome: string = this._Base + "OtherIncome";
    static ManufacturersList: string = this._Base + "Manufacturers/list";
    static Manufacturers: string = this._Base + "Manufacturers";
    static ManufacturersWithId = (value: string) => this._Base + `Manufacturers/${value}`;
    static SegmentsList: string = this._Base + "Segments/list";
    static Segments: string = this._Base + "Segments";
    static SegmentsWithId = (value: string) => this._Base + `Segments/${value}`;
    static BrandsList: string = this._Base + "Brands/list";
    static Brands: string = this._Base + "Brands";
    static BrandsWithId = (value: string) => this._Base + `Brands/${value}`;
    static Cashboxes: string = this._Base + "cashboxes";
    static CashboxesWithId = (value: string) => this._Base + `Cashboxes/${value}`;
    static BonusesAutoList: string = this._Base + "Bonuses/auto-list";
    static BonusesManualList: string = this._Base + "Bonuses/manual-list";
    static BonusesAuto: string = this._Base + "Bonuses/auto";
    static BonusesManual: string = this._Base + "Bonuses/manual";
    static BonusesWithId = (value: string) => this._Base + `Bonuses/${value}`;
    static DiscountsAutoList: string = this._Base + "discounts/get-auto-list";
    static DiscountsManualList: string = this._Base + "discounts/get-manual-list";
    static DiscountsAuto: string = this._Base + "discounts/create-auto";
    static DiscountsManual: string = this._Base + "discounts/create-manual";
    static DiscountsWithId = (value: string) => this._Base + `discounts/get-auto/${value}`;
    static DiscountsPutWithId = (value: string) => this._Base + `discounts/auto/${value}`;
    static DiscountsManualWithId = (value: string) => this._Base + `discounts/manual/${value}`;
    static DashboardTotalOrders: string = this._Base + "dashboard-supervisor/total-order-amount";
    static DashboardSupervisorCategories: string = this._Base + "dashboard-supervisor/categories";
    static DashboardSupervisorTotalVisitPhoto: string = this._Base + "dashboard-supervisor/total-visit-photo";
    static DashboardSupervisorTotalVisitOrder: string = this._Base + "dashboard-supervisor/total-visit-order";
    static DashboardSupervisorCategoryDetail: string = this._Base + "dashboard-supervisor/categories/detail";
    static DashboardSupervisorAgentDetail: string = this._Base + "dashboard-supervisor/agents-report/detail";
    static DashboardSupervisorAgentOrder: string = this._Base + "dashboard-supervisor/agents-report/order-detail";
    static DashboardSupervisorAgentOrderCanceled: string = this._Base + "dashboard-supervisor/agents-report/canceled-order-detail";
    static DashboardSupervisorAgentOrderReject: string = this._Base + "dashboard-supervisor/agents-report/reject-detail";
    static DashboardSupervisorDialyReport: string = this._Base + "dashboard-supervisor/daily-report";
    static DashboardSupervisorSalesAgent: string = this._Base + "dashboard-supervisor/agents-report";
    static DashboardSupervisorS: string = this._Base + "dashboard-supervisor/supervisors-report";
    static DashboardSupervisorAgentCategoryReport: string = this._Base + "dashboard-supervisor/agent-category-report";
    static DashboardSupervisorCategoryReport: string = this._Base + "dashboard-supervisor/supervisor-category-report";
    static DashboardSupervisorTotalVisit: string = this._Base + "dashboard-supervisor/total-visit";
    static DashboardInitialBalanceList: string = this._Base + "client-finance/initial-balance-payment/list";
    static DashboardInitialBalanceId = (id: any) => this._Base + `client-finance/initial-balance-payment/${id}`;
    static DashboardInitialBalance: string = this._Base + "client-finance/initial-balance-payment";
    static BonusesType: string = this._Base + "SystemConstants/bonus_types";
    static DiscountType: string = this._Base + "SystemConstants/discount-type";
    static ProductsCategoryList: string = this._Base + "ProductCategories/list"
    static ProductCategory: string = this._Base + "ProductCategories"
    static ProductCategoryWithId = (value: string) => this._Base + `ProductCategories/${value}`
    static ProductsList: string = this._Base + "Products/list"
    static Products: string = this._Base + "Products"
    static ProductsWithId = (value: string) => this._Base + `Products/${value}`
    static ProductsDeleteWithId = (value: string) => this._Base + `Products/${value}`
    static ProductGroups: string = this._Base + "ProductGroups"
    static ProductGroupsList: string = this._Base + "ProductGroups/list"
    static ProductGroupsWithId = (value: string) => this._Base + `ProductGroups/${value}`
    static ProductSubCategories: string = this._Base + "ProductSubCategories"
    static ProductSubCategoriesList: string = this._Base + "ProductSubCategories/list"
    static ProductSubCategoriesWithId = (value: string) => this._Base + `ProductSubCategories/${value}`
    static PriceTypes: string = this._Base + "PriceTypes"
    static PriceTypesList: string = this._Base + "PriceTypes/list"
    static PriceTypesType: string = this._Base + "PriceTypes/type"
    static PriceTypesWithId = (value: string) => this._Base + `PriceTypes/${value}`
    static PriceSaleList: string = this._Base + "Prices/get-sale"
    static PricePurchaseList: string = this._Base + "Prices/get-purchase"
    static PriceList: string = this._Base + "Prices/price-list"
    static SavePrice: string = this._Base + "Prices/save-price"
    static SavePriceWithoutHistory: string = this._Base + "Prices/save-price-without-history"
    static SetMarginPrice: string = this._Base + "Prices/set-margin-price"
    static PriceProductWithId = (value: string, priceTypeId: string) => this._Base + `Prices/products?categoryId=${value}&priceTypeId=${priceTypeId}`
    static TerritoriesList: string = this._Base + "settings/territory/list";
    static Territories: string = this._Base + "settings/territory";
    static TerritoriesWithId = (value: string) => this._Base + `settings/territory/${value}`;


    // region Regions
    static RegionsList: string = this._Base + "region/list";
    static RegionById = (value: string) => this._Base + `region/${value}`;
    // endregion

    static TarasList: string = this._Base + "Taras/list";
    static Taras: string = this._Base + "Taras";
    static TarasWithId = (value: string) => this._Base + `Taras/${value}`;
    static ClientCategoriesList: string = this._Base + "ClientCategories/list";
    static ClientCategories: string = this._Base + "ClientCategories";
    static ClientCategoriesWithId = (value: string) => this._Base + `ClientCategories/${value}`;
    static ClientTypesList: string = this._Base + "ClientTypes/list";
    static ClientTypes: string = this._Base + "ClientTypes";
    static ClientTypesWithId = (value: string) => this._Base + `ClientTypes/${value}`;
    static RejectsList: string = this._Base + "Rejects/list";
    static Rejects: string = this._Base + "Rejects";
    static RejectsWithId = (value: string) => this._Base + `Rejects/${value}`;
    static RejectDefectsList: string = this._Base + "RejectDefects/list";
    static RejectDefects: string = this._Base + "RejectDefects";
    static RejectDefectsWithId = (value: string) => this._Base + `RejectDefects/${value}`;
    static RlpBonusList: string = this._Base + "rlp-bonuses/list";
    static RlpBonus: string = this._Base + "rlp-bonuses";
    static ReportWarehouse: string = this._Base + "report-warehouse";
    static RlpBonusWithId = (value: string) => this._Base + `rlp-bonuses/${value}`;
    static RlpBonusWithIdPut = (value: string) => this._Base + `rlp-bonuses?id=${value}`;
    static PhotoReportCategoriesList: string = this._Base + "PhotoReportCategories/list";
    static PhotoReportCategories: string = this._Base + "PhotoReportCategories";
    static PhotoReportCategoriesWithId = (value: string) => this._Base + `PhotoReportCategories/${value}`;
    static PrintersList: string = this._Base + "Printers/list";
    static Printers: string = this._Base + "Printers";
    static PrintersWithId = (value: string) => this._Base + `Printers/${value}`;
    static InventoryTypesList: string = this._Base + "InventoryTypes/list";
    static InventoryTypes: string = this._Base + "InventoryTypes";
    static InventoryTypesWithId = (value: string) => this._Base + `InventoryTypes/${value}`;
    static UsersList: string = this._Base + "Users/list";
    static Users: string = this._Base + "Users";
    static UsersWithId = (value: string) => this._Base + `Users/${value}`;
    static UsersMe: string = this._Base + "Users/Me";


    // Warehouses
    static WarehousesList: string = this._Base + "warehouse/list";
    static Warehouses: string = this._Base + "warehouse";
    static WarehousesAllowDelete = (value: string) => this._Base + `warehouse/check-delete-status/${value}`;
    static WarehousesWithId = (value: string) => this._Base + `warehouse/${value}`;
    static WarehousesDeaActivate = (value: string) => this._Base + `warehouse/deactivate/${value}`;
    static WarehousesActivate = (value: string) => this._Base + `warehouse/activate/${value}`;
    static SalesChannelsList: string = this._Base + "SalesChannels/list";
    static SalesChannels: string = this._Base + "SalesChannels";
    static SalesChannelsWithId = (value: string) => this._Base + `SalesChannels/${value}`;
    static SystemConstantsAgentTypes: string = this._Base + "SystemConstants/agent_types";
    static SystemConstantsBonusTypes: string = this._Base + "SystemConstants/bonus_types";
    static SystemConstantsOrderStatuses: string = this._Base + "SystemConstants/order_statuses";
    static SystemConstantsRoles: string = this._Base + "SystemConstants/roles";
    static SystemConstantsTaskStatuses: string = this._Base + "SystemConstants/task-statuses";
    static SystemConstantsWarehouseTypes: string = this._Base + "SystemConstants/warehouse_types";
    static SystemConstantsOrdersStatus: string = this._Base + "SystemConstants/order_statuses";
    static SystemConstantsOrdersTypes: string = this._Base + "SystemConstants/order-type";
    static OrderCommentsList: string = this._Base + "OrderComments/list";
    static OrderComments: string = this._Base + "OrderComments";
    static OrderCommentsWithId = (value: string) => this._Base + `OrderComments/${value}`;
    static OrderWithId = (value: string) => this._Base + `order/${value}`;
    static OrderDetailId = (value: string) => this._Base + `order/detail/${value}`;
    static OrdersList: string = this._Base + 'order/list';
    static OrderRequest: string = this._Base + "order/request";
    static OrderExchange: string = this._Base + "order/exchange";
    static OrderRefund: string = this._Base + "order/refund";
    static OrdersBonus = (value: any) => this._Base + `order/bonus-discount/get-bonuses?warehouseId=${value}`;
    static OrdersDiscounts: string = this._Base + `order/bonus-discount/get-discounts`;
    static OrdersManualBonus = (value: string) => this._Base + `order/bonus-discount/get-manual-bonuses?${value}`;
    static OrdersCancel = (page: any) => this._Base + `order/cancel?orderId=${page}`;
    static OrdersRestore = (page: any) => this._Base + `order/restore?orderId=${page}`;
    static SetExpeditor = (param: any) => this._Base + `order/set-expeditor?${param}`;
    static OrdersShipped = (id: any, ware: any, ship: any) => this._Base + `order/set-shipped?id=${id}&expeditorId=${ware}&shippedDate=${ship}`
    static OrdersDeliver = (id: any, ship: any) => this._Base + `order/set-delivered?id=${id}&deliveredDate=${ship}`
    static OrdersAccepted = (id: any, ship: any) => this._Base + `order/accept-to-ship?id=${id}&expectedShippingdate=${ship}`
    static OrdersWithId = (value: string) => this._Base + `order/${value}`;
    static Exchange: string = this._Base + "exchanges/create";
    static ExchangeById = (id: any) => this._Base + `exchanges/${id}`;
    static ExchangeByDetailId = (id: any) => this._Base + `exchanges/detail/${id}`;

    // region Van-Selling-Orders
    static VanSellingById = (id: any) => this._Base + `van-selling-order/${id}`;
    static VanSellingList: string = this._Base + "van-selling-order/list";
    static VanSellingRefundCancelById = (id: any) => this._Base + `van-selling-order/refund/cancel/${id}`;
    static VanSellingRefundConfirmReception: string = this._Base + "van-selling-order/refund/confirm-reception";
    static VanSellingRefundRestoreById = (id: any) => this._Base + `van-selling-order/refund/restore/${id}`;
    static VanSellingRefund: string = this._Base + "van-selling-order/refund";
    static VanSellingRequestCancelById = (id: any) => this._Base + `van-selling-order/request/cancel/${id}`;
    static VanSellingRequestToShip: string = this._Base + "van-selling-order/request/accept-to-ship";
    static VanSellingRequestSetShipped: string = this._Base + "van-selling-order/request/set-shipped";
    static VanSellingRequestSetDelivered: string = this._Base + "van-selling-order/request/set-delivered";
    static VanSellingRequestRestoreById = (id: any) => this._Base + `van-selling-order/request/restore/${id}`;
    static VanSellingRequest: string = this._Base + "van-selling-order/request";
    // endregion Van-Selling-Orders


    static RefundOrder: string = this._Base + "refund-order";
    static RefundOrderById = (id: any) => this._Base + `refund-order/${id}`;
    static TaskTypesList: string = this._Base + "TaskTypes/list";
    static TaskTypes: string = this._Base + "TaskTypes";
    static TaskTypesWithId = (value: string) => this._Base + `TaskTypes/${value}`;
    static TradeDirectionsList: string = this._Base + "TradeDirections/list";
    static TradeDirections: string = this._Base + "TradeDirections";
    static TradeDirectionsWithId = (value: string) => this._Base + `TradeDirections/${value}`;
    static BoxTypesList: string = this._Base + "BoxTypes/list";
    static BoxTypes: string = this._Base + "BoxTypes";
    static BoxTypesWithId = (value: string) => this._Base + `BoxTypes/${value}`;
    static OrderRefundTaraList: string = this._Base + "tara-refund/list";
    static OrderRefundTaraById = (id: string) => this._Base + `tara-refund/${id}`;
    static OrderRefundTara: string = this._Base + "tara-refund";
    static OrderRefundSetReceived = (value: string) => this._Base + `tara-refund/set-received/${value}`;
    static OrderRefundSetCanceled = (value: string) => this._Base + `tara-refund/cancel/${value}`;
    static OrderRefundSetRestored = (value: string) => this._Base + `tara-refund/restore/${value}`;
    static OrderPayment = this._Base + 'orders/payment-order'
    static TaraRefundStatus: string = this._Base + "SystemConstants/tara-refund-status";
    static OrderDiscountType: string = this._Base + "SystemConstants/order-discount-type";
    static OrderBonusType: string = this._Base + "SystemConstants/order-bonus-type";
    static KnowledgeCategoriesList: string = this._Base + "KnowledgeCategories/list";
    static KnowledgeCategories: string = this._Base + "KnowledgeCategories";
    static KnowledgeCategoriesWithId = (value: string) => this._Base + `KnowledgeCategories/${value}`;

    // region Suppliers
    static Suppliers = this._Base + 'Suppliers'
    static SuppliersById = (value: string) => this._Base + `Suppliers/${value}`
    static SuppliersList = this._Base + 'Suppliers/list'
    // endregion

    //  region   Command Agents
    static CommandAgentsList = this._Base + 'Agents/list'
    static CommandAgentDelete = (value: string) => this._Base + `Agents/${value}`
    static CommandAgent = this._Base + 'Agents/'
    //     endregion

    //  region   Command Supervisors
    static CommandSupervisorsList = this._Base + 'Supervisors/list'
    static CommandSupervisorDelete = (value: string) => this._Base + `Supervisors/${value}`
    static CommandSupervisor = this._Base + 'Supervisors/'
    //     endregion

    //  region   Command Expeditors
    static CommandExpeditorsList = this._Base + 'Expeditors/list'
    static CommandExpeditorDelete = (value: string) => this._Base + `Expeditors/${value}`
    static CommandExpeditor = this._Base + 'Expeditors/'
    static CommandExpeditorGetConfigsAll = this._Base + 'Expeditors/configs/all'
    static CommandExpeditorPostConfigsAll = this._Base + 'Expeditors/config-post-all'
    static CommandExpeditorConfigs = this._Base + 'Expeditors/configs'
    //     endregion

    //  region   Command Auditors
    static CommandAuditors = this._Base + 'Auditors/'
    static CommandAuditorsDelete = (value: string) => this._Base + `Auditors/${value}`
    static CommandAuditorsList = this._Base + 'Auditors/list'
    static CommandAuditorsConfigs = this._Base + 'Auditors/configs'
    static CommandAuditorsConfigsAll = this._Base + 'Auditors/configs/all'
    static CommandAuditorPostConfigsAll = this._Base + 'Auditors/config-post-all'
    //     endregion

    //  region   Command Agents limit
    static CommandAgentsPaket = this._Base + 'Agents/paket'
    static CommandAgentsPaketDelete = (value: string) => this._Base + `Agents/packet/${value}`
    static CommandAgentsPaketList = this._Base + 'Agents/paket/list'
    static CommandAgentsConfigs = this._Base + 'Agents/configs'
    static CommandGetAgentsConfigsAll = this._Base + 'Agents/configs/all'
    static CommandPostAgentsConfigsAll = this._Base + 'Agents/config-post-all'
    static CommandGetProductsByGroupId = this._Base + 'Agents/paket/products'
    //     endregion

    //  region   Command Tasks
    static CommandTasks = this._Base + 'Tasks/'
    static CommandTasksById = (value: string) => this._Base + `Tasks/${value}`
    static CommandTasksConfirm = this._Base + 'Tasks/confirm'
    static CommandTasksDelete = this._Base + 'Tasks/delete'
    static CommandTasksReject = this._Base + 'Tasks/reject'
    static CommandTasksSetComplete = this._Base + 'Tasks/set-complete'
    static CommandTasksClose = this._Base + 'Tasks/close'
    static CommandTasksAccept = this._Base + 'Tasks/accept'
    static CommandTasksList = this._Base + 'Tasks/list'
    //     endregion

    // region    Shared-api
    static SharedApiClients = this._Base + 'shared-api/clients'
    static ClientsMap = this._Base + 'Clients/get-by-filter-maps'
    static SharedApiProducts = this._Base + 'shared-api/products'
    //      end region

    //  region command assignment product
    static CommandAgentsLimit = this._Base + 'Agents/limits'
    static CommandAgentsLimitProducts = this._Base + 'Agents/limits/products'
    static CommandAgentLimitTypes = this._Base + 'SystemConstants/agent-limit-type'
    static CommandAgentsLimitReports = this._Base + 'Agents/limits/report'
    static CommandAgentsPostLimit = this._Base + 'Agents/limits/upsert'
    static CommandAgentsLimitsDelete = this._Base + 'Agents/limits/delete'
    //     endregion

    //  region command workdays
    static CommandWorkingDaysList = this._Base + 'employee-working-days/list'
    static CommandWorkingDaysUpdate = this._Base + 'employee-working-days/update'
    static CommandWorkingDaysCreate = this._Base + 'employee-working-days/create'
    //     endregion

    //  region command workdays
    static ClientDeviceList = this._Base + 'client-device/list'
    static ClientDeviceDelete = this._Base + 'client-device/delete'
    static ClientDeviceCancel = this._Base + 'client-device/cancel-device'
    static ClientDeviceGetById = (value: string) => this._Base + `client-device/get/${value}`
    static ClientDeviceCreate = this._Base + 'client-device/create'
    static ClientDeviceUpdate = this._Base + 'client-device/update'
    static ClientDeviceHistoryList = this._Base + 'client-device/history-list'

    //     endregion

    //     region System constants
    static SystemConstants = (value: string) => this._Base + `SystemConstants/${value}`
    //     end region

    //     region library constants
    static LibraryConstants = this._Base + '/library/constants'
    //     end region
    // Parners
    static SettingsParnersList = this._Base + 'partners/list'
    static SettingsPartners = this._Base + 'partners'
    static SettingsPartnersById = (id: any) => this._Base + `partners/${id}`
}
