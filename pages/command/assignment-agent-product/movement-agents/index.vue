<template>
  <div class="h-100vh">
    <button
      @click="$router.go(-1)"
      class="h-[44px] px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border"
    >
      <div class="flex">
        <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
        Назад
        <slot></slot>
      </div>
    </button>
    <div class="mt-2 text-[24px] font-[600] text-[#424F4F]">
      Движение распределения товара по агентам
    </div>
    <CommandAssignmentAgentProductsFilterCard />
    <div class="mt-4">
      <CommandAssignmentAgentProductsMovementAgents />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const filter = ref({
  isSelectWarehouse: false,
  isSelectAgent: false,
  isSelectProduct: false,
  isSelectType: false,
});
const clickOutside = () => {
  filter.value.isSelectWarehouse = false;
  filter.value.isSelectAgent = false;
  filter.value.isSelectProduct = false;
  filter.value.isSelectType = false;
};
</script>

<style scoped>
.h-100vh {
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
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
[type="checkbox"]:checked + span:before {
  content: "\f106";
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all 0.4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299b9b;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
