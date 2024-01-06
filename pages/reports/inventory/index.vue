<template>
  <div>
    <div class="mt-3">
      <page-title :title="'По инвентарю'"/>
    </div>
    <div>
      <div class="mt-2 h-full">
        <ReportsInventoryFilterCard/>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-4 mt-6">
      <div class="h-[116px] bg-yellow-100 rounded-lg bg-white p-4">
         <div class="font-bold">Общая</div>
        <div class="text-gray-3 mt-2">Стеллажи: <span class="font-bold">6</span></div>
        <div class="text-gray-3 mt-2">Холодильники: <span class="font-bold">6</span></div>
      </div>
      <div v-for="i in inventory" class="h-[116px] bg-gray-100 rounded-lg bg-white p-4">
        <div class="font-bold">{{i.name}}</div>
        <div class="text-gray-3 mt-2">{{i.rack}} <span class="font-bold">{{i.num}}</span></div>
        <div class="text-gray-3 mt-2">{{i.refrigeration}} <span class="font-bold">{{i.num}}</span></div>
      </div>
    </div>
    <div class="mt-3">
      <page-title :title="'Список Клиентов'"/>
    </div>
    <div>
      <div class="mt-6">
        <ReportsInventoryDataTable/>
      </div>
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
