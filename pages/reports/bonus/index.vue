<template>
  <div>
    <div class="mt-3">
      <page-title :title="'По инвентарю'"/>
    </div>
    <div>
      <div class="mt-2 h-full">
        <ReportsBonusFilterCard/>
      </div>
    </div>
    <div class="mt-3 flex justify-between">
      <page-title :title="'Список Клиентов'"/>
      <div class="flex gap-6 mt-2">
        <div class="w-[362px] h-[44px] grid grid-cols-3 bg-white rounded-lg ">
          <div class="form_radio_btn h-full">
            <input id="radio-1" type="radio" name="radio" value="1" checked>
            <label for="radio-1" class="h-[44px] rounded-l-lg w-full py-[14px] px-4">По АКБ</label>
          </div>
          <div class="form_radio_btn h-full">
            <input id="radio-2" type="radio" name="radio" value="2">
            <label for="radio-2" class="h-[44px] w-full py-[14px] px-4">По сумме</label>
          </div>
          <div class="form_radio_btn h-full w-full ">
            <input id="radio-3" type="radio" name="radio" value="3">
            <label for="radio-3" class="h-[44px] w-full rounded-r-lg py-[14px] px-4">По объему</label>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="mt-6">
        <ReportsBonusDataTable/>
      </div>
    </div>
    <div class="mt-3 flex justify-between">
      <page-title :title="'Список Клиентов'"/>
      <div class="flex gap-6 mt-2">
        <div class="w-[362px] h-[44px] grid grid-cols-3 bg-white rounded-lg ">
          <div class="form_radio_btn h-full">
            <input id="radio-1" type="radio" name="radio" value="1" checked>
            <label for="radio-1" class="h-[44px] rounded-l-lg w-full py-[14px] px-4">По АКБ</label>
          </div>
          <div class="form_radio_btn h-full">
            <input id="radio-2" type="radio" name="radio" value="2">
            <label for="radio-2" class="h-[44px] w-full py-[14px] px-4">По сумме</label>
          </div>
          <div class="form_radio_btn h-full w-full ">
            <input id="radio-3" type="radio" name="radio" value="3">
            <label for="radio-3" class="h-[44px] w-full rounded-r-lg py-[14px] px-4">По объему</label>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="mt-6">
        <ReportsBonusDataTable/>
      </div>
    </div>
    <div class="mt-3 flex justify-between">
      <page-title :title="'SKU'"/>
    </div>
    <div>
      <div class="mt-6">
        <ReportsBonusDataTable/>
      </div>
    </div>
    <div class="mt-3 flex justify-between">
      <page-title :title="'Список Клиентов'"/>
      <div class="flex gap-6 mt-2">
        <div class="w-[262px] h-[44px] grid grid-cols-2 bg-white rounded-lg ">
          <div class="form_radio_btn h-full">
            <input id="radio-1" type="radio" name="radio" value="1" checked>
            <label for="radio-1" class="h-[44px] rounded-l-lg w-full py-[14px] px-4">По объему</label>
          </div>
          <div class="form_radio_btn h-full w-full ">
            <input id="radio-3" type="radio" name="radio" value="3">
            <label for="radio-3" class="h-[44px] w-full rounded-r-lg py-[14px] px-4">По кол-во</label>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="mt-6">
        <ReportsBonusClientsTable/>
      </div>
    </div>
    <div class="flex justify-end">
      <nuxt-link to="/reports/bonus/attaching-auditor-to-client" class="p-2 bg-white rounded-lg border border-blue-20 px-6 my-4">Отчет по заказам</nuxt-link>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
const amount = ref(1)
const filter = ref({
  isSelectProductCategory: false,
  isSelectTerritory: false,
  isSelectAgent: false,
  isProduct:false,
  isTypeAmount: false,
  date:false
})
const clickOutside = () => {
  filter.value.isSelectCategory = false;
  filter.value.isSelectTerritory = false;
  filter.value.isSelectAgent = false;
  filter.value.isProduct = false;
  filter.value.isTypeAmount = false;
  filter.value.date = false;
}
const inventory = ref([
  {
    name:"Abdulla aka osh markazi",
    rack:"Стеллажи: ",
    num:"2",
    refrigeration:"Холодильники:"
  },
  {
    name:"Mini supermarket",
    rack:"Стеллажи: ",
    num:"6",
    refrigeration:"Холодильники:"
  },
  {
    name:"Lorem market",
    rack:"Стеллажи: ",
    num:"2",
    refrigeration:"Холодильники:"
  },
  {
    name:"Abdulla aka osh markazi",
    rack:"Стеллажи: ",
    num:"2",
    refrigeration:"Холодильники:"
  },
  {
    name:"Mini supermarket",
    rack:"Стеллажи: ",
    num:"2",
    refrigeration:"Холодильники:"
  },
  {
    name:"Lorem market",
    rack:"Стеллажи: ",
    num:"2",
    refrigeration:"Холодильники:"
  },
  {
    name:"Lorem market",
    rack:"Стеллажи: ",
    num:"2",
    refrigeration:"Холодильники:"
  }
])
</script>

<style scoped>

.form_radio_btn {
  display: inline-block;
  margin-right: 10px;
}
.form_radio_btn input[type=radio] {
  display: none;
}
.form_radio_btn label {
  display: inline-block;
  cursor: pointer;
  line-height: 100%;
  user-select: none;
}

/* Checked */
.form_radio_btn input[type=radio]:checked + label {
  background: #299B9B;
  color: white;
}

/* Hover */
.form_radio_btn label:hover {
  color: #666;
}

/* Disabled */
.form_radio_btn input[type=radio]:disabled + label {
  background: #efefef;
  color: #666;
}
</style>
