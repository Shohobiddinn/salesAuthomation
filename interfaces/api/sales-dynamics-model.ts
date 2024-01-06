export interface SalesDynamicsByDayAndMonthModel {
  date: string,
  total_sold: number
}

export interface SalesDynamicsByCategoryModel {
  year: number,
  month: {
    id: number,
    name: string
  },
  total_sold: number
}