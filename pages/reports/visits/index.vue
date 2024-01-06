<template>
  <div>
    <div class="mt-3">
      <page-title :title="'По визитам 2.0'"/>
    </div>
    <div>
      <div class="mt-2 h-full">
        <ReportsVisitsFilterCard/>
      </div>
    </div>
    <div class="mt-3 flex justify-between">
      <page-title :title="'Список Клиентов'"/>
    </div>
    <div>
      <div class="mt-6">
        <ReportsVisitsDataTable/>
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
