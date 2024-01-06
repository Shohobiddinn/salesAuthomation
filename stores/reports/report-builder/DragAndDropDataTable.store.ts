import { defineStore } from "pinia";
import { ref } from 'vue'


export const useDragAndDropDataTableStore = (tableId: string) => defineStore(`dragAndDropDataTable_${tableId}`, () => {
  interface headerObject {
    name: string,
    checked: boolean,
    key: string,
    type: string,
    thWidth?: string,
    borderX?: boolean,
    thHeight?: boolean,
    list?: string,
    id?: number
  }

  const headers: headerObject[] = ref([
    {
      name: "Агент",
      checked: true,
      key: "agent",
      type: "come",
      thWidth: "120px",
      borderX: true,
      thHeight: "62px",
    },
    {
      name: "Товар",
      checked: true,
      key: "product",
      type: "come",
      thWidth: "120px",
      borderX: true,
      thHeight: "62px",
    },
    {
      name: "Способ оплаты",
      checked: true,
      key: "paymentMethod",
      type: "come",
      thWidth: "120px",
      borderX: true,
      thHeight: "62px",
    },
    {
      name: "Код товара",
      checked: true,
      key: "productCode",
      type: "come",
      thWidth: "120px",
      borderX: true,
      thHeight: "62px",
    },
    {
      name: "Территория",
      checked: true,
      key: "territory",
      type: "come",
      thWidth: "120px",
      borderX: true,
      thHeight: "62px",
    },
    {
      name: "Экспедитор",
      checked: true,
      key: "expeditor",
      type: "come",
      thWidth: "120px",
      borderX: true,
      thHeight: "62px",
    },
    {
      name: "Тип цены",
      checked: true,
      key: "priceType",
      type: "come",
      thWidth: "120px",
      borderX: true,
      thHeight: "62px",
    },
  ]);

  const loadedData = ref([
    {
      expeditor: "Рустам ака",
      priceType: "108",
      paymentMethod: "Наличный",
      agent: "Максим (Продовец)",
      product: "Coca cola",
      productCode: "108",
      territory: "Юнусобод",
    },
    {
      expeditor: "Рустам ака",
      priceType: "108",
      paymentMethod: "Наличный",
      agent: "",
      product: "Coca cola",
      productCode: "108",
      territory: "Юнусобод",
    },
    {
      expeditor: "Рустам ака",
      priceType: "108",
      paymentMethod: "Наличный",
      agent: "",
      product: "Coca cola",
      productCode: "108",
      territory: "Юнусобод",
    },
    {
      expeditor: "Рустам ака",
      priceType: "108",
      paymentMethod: "Наличный",
      agent: "",
      product: "Coca cola",
      productCode: "108",
      territory: "Юнусобод",
    },
    {
      expeditor: "Рустам ака",
      priceType: "108",
      paymentMethod: "Наличный",
      agent: "",
      product: "Coca cola",
      productCode: "108",
      territory: "Юнусобод",
    },
    {
      expeditor: "Рустам ака",
      priceType: "108",
      paymentMethod: "Наличный",
      agent: "",
      product: "Coca cola",
      productCode: "108",
      territory: "Юнусобод",
    },
  ]);

  const addIdAndListToHeaders = () => {
    let id = 0;
    for (const field of headers.value) {
      field.list = "available-field";
      field.id = id;
      id++;
    }
  }

  const getList = (list: string) => {
    return headers.value.filter((item: headerObject) => item.list === list);
  };

  const onChangeList = (newList: string, itemId: string) => {
    const item = headers.value.find(
      (header: headerObject) => header.id == itemId
    );
    item.list = newList;
  }

  return {
    headers,
    loadedData,
    addIdAndListToHeaders,
    getList,
    onChangeList
  }

})()