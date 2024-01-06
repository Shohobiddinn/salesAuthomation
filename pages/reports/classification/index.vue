<template>
  <div>
    <div>
      <div class="mt-3 flex justify-between">
        <page-title :title="'Отчет: Классификация торговых точек'" />
        <m-btn @click="configuration = true">Конфигурации</m-btn>
      </div>
      <div class="mt-4 h-full">
        <ReportsClassificationFilterCard />
      </div>
      <div class="mt-3 flex justify-between">
        <page-title :title="'Список Клиентов'" />
        <div class="flex gap-6 mt-2">
          <div class="w-[262px] h-[44px] grid grid-cols-2 bg-white rounded-lg">
            <div class="form_radio_btn h-full">
              <input
                @input="inputValue(1)"
                id="radio-1"
                type="radio"
                name="radio"
                :value="amount"
                checked
              />
              <label
                for="radio-1"
                class="h-[44px] rounded-l-lg w-full py-[14px] px-4"
                >Текущий</label
              >
            </div>
            <div class="form_radio_btn h-full w-full">
              <input
                @input="inputValue(2)"
                id="radio-3"
                type="radio"
                name="radio"
                :value="amount"
              />
              <label
                for="radio-3"
                class="h-[44px] w-full rounded-r-lg py-[14px] px-4"
                >По месяцам</label
              >
            </div>
          </div>
        </div>
      </div>
      <div v-if="amount === 1">
        <div class="mt-6">
          <ReportsClassificationCurrentTable />
        </div>
      </div>
      <div v-if="amount === 2">
        <div class="mt-6">
          <ReportsClassificationDataTable />
        </div>
      </div>
    </div>
    <transition name="modal">
      <div v-if="configuration">
        <d-modal
          @closeDialog="closeConfiguration"
          :dataContainerWidth="'697px'"
          :name="'Конфигурация'"
        >
          <ReportsClassificationDialog />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
const amount = ref(1);
const filter = ref({
  isSelectProductCategory: false,
  isSelectTerritory: false,
  isSelectAgent: false,
  isProduct: false,
  isTypeAmount: false,
  date: false,
});
function inputValue(p) {
  amount.value = p;
}
const configuration = ref(false);
function closeConfiguration() {
  configuration.value = false;
}
const clickOutside = () => {
  filter.value.isSelectCategory = false;
  filter.value.isSelectTerritory = false;
  filter.value.isSelectAgent = false;
  filter.value.isProduct = false;
  filter.value.isTypeAmount = false;
  filter.value.date = false;
};
const inventory = ref([
  {
    name: "Abdulla aka osh markazi",
    rack: "Стеллажи: ",
    num: "2",
    refrigeration: "Холодильники:",
  },
  {
    name: "Mini supermarket",
    rack: "Стеллажи: ",
    num: "6",
    refrigeration: "Холодильники:",
  },
  {
    name: "Lorem market",
    rack: "Стеллажи: ",
    num: "2",
    refrigeration: "Холодильники:",
  },
  {
    name: "Abdulla aka osh markazi",
    rack: "Стеллажи: ",
    num: "2",
    refrigeration: "Холодильники:",
  },
  {
    name: "Mini supermarket",
    rack: "Стеллажи: ",
    num: "2",
    refrigeration: "Холодильники:",
  },
  {
    name: "Lorem market",
    rack: "Стеллажи: ",
    num: "2",
    refrigeration: "Холодильники:",
  },
  {
    name: "Lorem market",
    rack: "Стеллажи: ",
    num: "2",
    refrigeration: "Холодильники:",
  },
]);
</script>

<style scoped>
.form_radio_btn {
  display: inline-block;
  margin-right: 10px;
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
