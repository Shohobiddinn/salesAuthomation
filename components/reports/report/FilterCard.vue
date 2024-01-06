<template>
  <rounded-white-container class="gap-4">
    <flex-row class="items-center justify-between gap-4">
      <div>
        <span class="text-gray-3 text-[20px] fw-6"> Фильтр </span>
      </div>
      <div class="flex gap-4">
        <flex-row class="gap-4">
          <flex-row
            class="rounded-lg bg-[#F4F9F9] h-full gap-2 items-center px-4"
          >
            <div class="flex gap-2">
              <input type="radio" name="radio" />
              <i-title> Дата заявки </i-title>
            </div>
            <div class="flex gap-2">
              <input type="radio" name="radio" />
              <i-title> Дата отгрузки </i-title>
            </div>
          </flex-row>
        </flex-row>
        <DatePicker />
      </div>
    </flex-row>
    <flex-row
      class="gap-4 mt-4 items-center"
      v-for="row in filterStates"
      :key="row"
    >
      <flex-col class="w-1/3" v-for="cols in row" :key="cols.key">
        <i-title v-if="cols.key !== 'btn'">
          {{ cols.name }}
        </i-title>

        <flex-row v-if="cols.key === 'btn'" class="h-full flex gap-2 mt-8.5">
          <m-btn class="w-full"> Применить </m-btn>
          <sm-btn class="px-4 py-3">
            <IconReloadSVG />
          </sm-btn>
        </flex-row>

        <flex-row
          class="rounded-lg bg-[#F4F9F9] h-full gap-2 items-center"
          v-if="cols.key === 'radio'"
        >
          <div class="flex gap-2">
            <input type="radio" name="radio" />
            <i-title> Активный </i-title>
          </div>
          <div class="flex gap-2">
            <input type="radio" name="radio" />
            <i-title> Не активный </i-title>
          </div>
        </flex-row>

        <menu-btn
          class="w-full"
          v-if="cols.key !== 'btn' && cols.key !== 'radio'"
        >
          <template #btn>
            <m-btn-outlined
              class="border-grey flex h-11 items-center w-full gap-2"
            >
              <fa-icon hash="&#xf078" />
              Выбрать
            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col class="gap-2">
              <search-input />
              <ReportCustomerFilterItems :data="filterStateItems[cols.key]" />
            </flex-col>
          </template>
        </menu-btn>
      </flex-col>
    </flex-row>
  </rounded-white-container>
</template>

<script setup>
// Filter States
const filterStates = ref({
  firstRow: [
    {
      name: "Супервайзер",
      key: "supervisor",
    },
    {
      name: "Категория продуктов",
      key: "productsCategory",
    },
    {
      name: "Продукт",
      key: "product",
    },
    {
      name: "Статус заказа",
      key: "orderStatus",
    },
  ],
  secondRow: [
    {
      name: "Визиты",
      key: "visits",
    },
    {
      name: "Агент",
      key: "agents",
    },
    {
      name: "Территория",
      key: "territory",
    },
    {
      name: "Сегменты клиентов",
      key: "clientSegments",
    },
  ],
  thirdRow: [
    {
      name: "Тип оплаты",
      key: "paymentType",
    },
    {
      name: "Все клиенты",
      key: "allClients",
    },
    {
      key: "btn",
    },
  ],
});

//Filter State Items
const filterStateItems = ref({
  supervisor: [
    {
      name: "Супервайзер 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Супервайзер 2",
      id: "id2",
      selected: false,
    },
    {
      name: "Супервайзер 3",
      id: "id3",
      selected: false,
    },
    {
      name: "Супервайзер 4",
      id: "id4",
      selected: false,
    },
  ],
  productsCategory: [
    {
      name: "Категория продуктов 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Категория продуктов 2",
      id: "id2",
      selected: false,
    },
    {
      name: "Категория продуктов 3",
      id: "id3",
      selected: false,
    },
    {
      name: "Категория продуктов 4",
      id: "id4",
      selected: false,
    },
  ],
  product: [
    {
      name: "Продукт 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Продукт 2",
      id: "id2",
      selected: false,
    },
    {
      name: "Продукт 3",
      id: "id3",
      selected: false,
    },
    {
      name: "Продукт 4",
      id: "id4",
      selected: false,
    },
  ],
  orderStatus: [
    {
      name: "Статус заказа 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Статус заказа 2",
      id: "id2",
      selected: false,
    },
    {
      name: "Тип клиента 3",
      id: "id3",
      selected: false,
    },
    {
      name: "Статус заказа 4",
      id: "id4",
      selected: false,
    },
  ],
  visits: [
    {
      name: "Визиты 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Визиты 2",
      id: "id2",
      selected: true,
    },
    {
      name: "Визиты 3",
      id: "id3",
      selected: true,
    },
    {
      name: "Визиты 4",
      id: "id4",
      selected: true,
    },
  ],
  agents: [
    {
      name: "Агент 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Агент 2",
      id: "id2",
      selected: true,
    },
    {
      name: "Агент 3",
      id: "id3",
      selected: true,
    },
    {
      name: "Агент 4",
      id: "id4",
      selected: true,
    },
  ],
  territory: [
    {
      name: "Территория 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Территория 2",
      id: "id2",
      selected: false,
    },
    {
      name: "Территория 3",
      id: "id3",
      selected: false,
    },
    {
      name: "Территория 4",
      id: "id4",
      selected: false,
    },
  ],
  clientSegments: [
    {
      name: "Сегменты клиентов 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Сегменты клиентов 2",
      id: "id2",
      selected: false,
    },
    {
      name: "Сегменты клиентов 3",
      id: "id3",
      selected: false,
    },
    {
      name: "Сегменты клиентов 4",
      id: "id4",
      selected: false,
    },
  ],
  paymentType: [
    {
      name: "Тип оплаты 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Тип оплаты 2",
      id: "id2",
      selected: false,
    },
    {
      name: "Тип оплаты 3",
      id: "id3",
      selected: false,
    },
    {
      name: "Тип оплаты 4",
      id: "id4",
      selected: false,
    },
  ],
  allClients: [
    {
      name: "Все клиенты 1",
      id: "id1",
      selected: true,
    },
    {
      name: "Все клиенты 2",
      id: "id2",
      selected: false,
    },
    {
      name: "Все клиенты 3",
      id: "id3",
      selected: false,
    },
    {
      name: "Все клиенты 4",
      id: "id4",
      selected: false,
    },
  ],
});
// Methods
</script>

<style scoped>
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
.form_radio_btn {
  display: inline-block;
}
.form_radio_btn input[type="radio"] {
  display: none;
}
.form_radio_btn label {
  display: inline-block;
  cursor: pointer;
  line-height: 100%;
  user-select: none;
}

/* Checked */
.form_radio_btn input[type="radio"]:checked + label {
  background: #299b9b;
  color: white;
}

/* Hover */
.form_radio_btn label:hover {
  color: #666;
}

/* Disabled */
.form_radio_btn input[type="radio"]:disabled + label {
  background: #efefef;
  color: #666;
}
</style>
