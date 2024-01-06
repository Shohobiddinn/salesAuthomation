<template>
  <rounded-white-container class="gap-4">
    <flex-row class="items-center justify-between gap-4">
      <div>
        <span class="text-gray-3 text-[20px] fw-6"> Фильтр </span>
      </div>
      <div class="flex gap-4">
        <flex-row class="gap-4">
          <flex-row class="rounded-lg bg-[#F4F9F9] h-full gap-2 items-center px-4">
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
      class="justify-end items-center gap-4 mt-4"
      v-for="row in filterStates"
      :key="row"
    >
      <flex-col class="w-1/3" v-for="cols in row" :key="cols.key">
        <i-title v-if="cols.key !== 'btn' && cols.key !== 'checkbox'">
          {{ cols.name }}
        </i-title>

        <menu-btn
          class="w-full"
          v-if="cols.key !== 'btn' && cols.key !== 'checkbox'"
        >
          <template #btn>
            <m-btn-outlined class="border-grey flex items-center w-full gap-2">
              <fa-icon hash="&#xf078" />
              Выбрать
            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col class="gap-2">
              <search-input />
              <FinansFilterItems :data="filterStateItems[cols.key]" />
            </flex-col>
          </template>
        </menu-btn>
        <flex-row v-if="cols.key === 'checkbox'" class="gap-2.5 justify-end">
          <checkbox />
          <label>{{ cols.name }}</label>
        </flex-row>
        <flex-row v-if="cols.key === 'btn'" class="h-full">
          <m-btn class="w-full"> Применить </m-btn>
          <sm-btn class="px-4 py-3">
            <IconReloadSVG />
          </sm-btn>
        </flex-row>
      </flex-col>
    </flex-row>
  </rounded-white-container>
</template>

<script setup>
// States
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
  ],
  secondRow: [
    {
      name: "Рабочие время",
      key: "checkbox",
    },
    {
      key: "btn",
    },
  ],
});

// Filter State Items
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