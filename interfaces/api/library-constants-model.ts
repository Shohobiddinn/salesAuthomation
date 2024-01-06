export interface ConstantModel {
  key: string;
  id: number;
  name: string;
  hex_color: string;
}

export interface LibraryConstantsModel {
  AgentType: ConstantModel[];
  OrderBonusType: ConstantModel[];
  OrderDiscountType: ConstantModel[];
  OrderPaymentStatus: ConstantModel[];
  OrderStatus: ConstantModel[];
  OrderType: ConstantModel[];
  TaraRefundStatus: ConstantModel[];
  TaskEntityStatus: ConstantModel[];
  TradeType: ConstantModel[];
  WarehouseType: ConstantModel[];
  IncomeProductStatus: ConstantModel[];
  PaymentStatus: ConstantModel[];
  IncomePaymentType: ConstantModel[];
  WarehouseProductMoveFilterType: ConstantModel[];
  MidpointRounding: ConstantModel[];
  SetPriceMethod: ConstantModel[];
  InitialBalancePaymentType: ConstantModel[];
  VanSellingOrderStatus: ConstantModel[],
  VanSellingOrderType: ConstantModel[],
  StateFilterType: ConstantModel[],
  TaraRefundType: ConstantModel[],
  TaraRefundDateFilterType: ConstantModel[]
}
