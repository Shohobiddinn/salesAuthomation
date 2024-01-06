<template>
  <div class="h-100vh">
    <button @click="$router.push('/command/assignment-agent-product')" class="h-[44px] px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border">
      <div class="flex">
        <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
        Назад
        <slot></slot>
      </div>
    </button>
    <div class="mt-2 text-[24px] font-[600] text-[#424F4F]">
      Создание ограничении Агента: ТП Андрей
    </div>
    <div v-click-outside="clickOutside" class="grid grid-cols-2 gap-4 mt-4">
      <div class="flex">
        <div class="fs-12 my-2">Склад:</div>
        <div class="relative ml-3">
          <div>
            <div @click="filter.isSelectWarehouse = !filter.isSelectWarehouse" class="w-[280px] relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]">
              <div class="ml-4 mt-2">
                <IconArrowBottom/>
              </div>
              <div class="fs-14 text-gray ml-2">Выбрать</div>
            </div>
            <div v-if="filter.isSelectWarehouse" class="absolute w-full pt-2 border top-[50px] z-50 rounded-lg bg-[#FAFDFD]">
              <div class="flex pl-3 border-b border-[#E1E4E4]">
                <div>
                  <label>
                    <input type='checkbox'>
                    <span></span>
                  </label>
                </div>
                <div class="fs-14 ml-2">Select all</div>
              </div>
              <div class="h-[200px] overflow-auto mr-3">
                <div v-for="i in 15" class="flex pl-3 pt-2">
                  <div>
                    <label>
                      <input type='checkbox'>
                      <span></span>
                    </label>
                  </div>
                  <div class="fs-14 ml-2">Checkbox</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex">
        <div class="fs-12 my-2 ">Тип:</div>
        <div class="relative ml-3">

          <div @click="btns.isSelectAgent = !btns.isSelectAgent" class="w-[280px] relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]">
            <div class="ml-4 mt-2">
              <IconArrowBottom/>
            </div>
            <div class="fs-14 text-gray ml-2">Выбрать</div>
          </div>
          <div v-if="filter.isSelectAgent" class="absolute w-full pt-2 border top-[50px] z-50 rounded-lg bg-[#FAFDFD]">
            <div class="flex pl-3 border-b border-[#E1E4E4]">
              <div>
                <label>
                  <input type='checkbox'>
                  <span></span>
                </label>
              </div>
              <div class="fs-14 ml-2">Select all</div>
            </div>
            <div class="h-[200px] overflow-auto mr-3">
              <div v-for="i in 15" class="flex pl-3 pt-2">
                <div>
                  <label>
                    <input type='checkbox'>
                    <span></span>
                  </label>
                </div>
                <div class="fs-14 ml-2">Checkbox</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="mt-4">
      <div class="w-[50%] bg-white border rounded-lg grid grid-cols-5">
        <button @click="limitationTabs()" :class="[limitationTab.isTab ? 'active' : '']" class="py-2 border-l-r border-r">Tab</button>
        <button @click="limitationCola()" :class="[limitationTab.isCola ? 'active' : '']" class="border-r">Coca cola</button>
        <button @click="limitationPepsi()" :class="[limitationTab.isPepsi ? 'active' : '']" class="border-r">Pepsi</button>
        <button @click="limitationDena()" :class="[limitationTab.isDena ? 'active' : '']" class="border-r">Dinay</button>
        <button @click="limitationSnickers()" :class="[limitationTab.isSnikers ? 'active' : '']" class="border-r-r">Snickers</button>
      </div>
    </div>
    <div class="mt-4">
      <CommandAssignmentAgentBalanceLimitations/>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const filter = ref({
  isSelectWarehouse: false,
  isSelectAgent: false,
})
const limitationTab = ref({
  data(param){
    return  param
  },
  isTab: false,
  isCola: false,
  isPepsi: false,
  isDena: false,
  isSnikers: false
})
function limitationTabs(){
    limitationTab.value.isTab = true;
    limitationTab.value.isCola = false;
    limitationTab.value.isPepsi = false;
    limitationTab.value.isDena = false;
    limitationTab.value.isSnikers = false
}
function limitationCola(){
  limitationTab.value.isTab = false;
  limitationTab.value.isCola = true;
  limitationTab.value.isPepsi = false;
  limitationTab.value.isDena = false;
  limitationTab.value.isSnikers = false
}
function limitationPepsi(){
  limitationTab.value.isTab = false;
  limitationTab.value.isCola = false;
  limitationTab.value.isPepsi = true;
  limitationTab.value.isDena = false;
  limitationTab.value.isSnikers = false
}
function limitationDena(){
  limitationTab.value.isTab = false;
  limitationTab.value.isCola = false;
  limitationTab.value.isPepsi = false;
  limitationTab.value.isDena = true;
  limitationTab.value.isSnikers = false
}
function limitationSnickers(){
  limitationTab.value.isTab = false;
  limitationTab.value.isCola = false;
  limitationTab.value.isPepsi = false;
  limitationTab.value.isDena = false;
  limitationTab.value.isSnikers = true
}
const clickOutside = () => {
  filter.value.isSelectWarehouse = false;
  filter.value.isSelectAgent = false;
}
</script>

<style scoped>
.h-100vh{
  height: calc(100vh - 70px);
}
label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #D2D7D7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
[type=checkbox]:checked + span:before {
  content: '\f106';
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all .4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299B9B;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.border-l-r{
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.border-r-r{
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.active{
  background-color: #299B9B;
  color: white;
  cursor: pointer;
}
</style>

