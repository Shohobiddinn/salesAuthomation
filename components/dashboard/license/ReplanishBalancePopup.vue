<template>
  <flex-col class="gap-3 w-full">
    <div class="text-gray-3">Выберите платежную систему</div>
    <flex-row class="gap-3 w-full">
      <div
        v-for="type in paymentTypes"
        :key="type.id"
        class="w-1/3 flex justify-center items-center cursor-pointer rounded-lg shadow-lg px-6"
        :class="[
          selectedPaymentType === type.id && 'border-color-[#299B9B] border-1',
          type.id === 'visaAndMasterCard' ? 'py-4.5' : 'py-10.5',
        ]"
        @click="onSelectPaymentType(type.id)"
      >
        <input
          :id="type.id"
          type="radio"
          name="product"
          :value="selectedPaymentType"
          class="hidden"
        />
        <label :for="type.id" class="w-full cursor-pointer">
          <IconClick class="w-full" v-if="type.name === 'Click'" />
          <IconPayme class="w-full" v-if="type.name === 'Payme'" />
          <flex-col
            v-if="type.name === 'Visa and MasterCard'"
            class="w-full gap-3 justify-center items-center"
          >
            <IconVisa class="w-full" />
            <span class="w-full bg-[#E5E5EA] h-[1px]"></span>
            <IconMasterCard class="w-full" />
          </flex-col>
        </label>
      </div>
    </flex-row>
    <flex-col class="gap-2.5 pt-4.5">
      <label for="sumInp" class="text-gray-3">Введите сумма</label>
      <DInput
        :form="true"
        :id="'sumInp'"
        :placeholder="'100 000 UZS'"
        :type="'text'"
        :value="replanishSum"
        @change="onChangeReplanishSum"
        class="h-11 w-full"
      />
    </flex-col>
    <m-btn class="mt-4.5">Перейти в платежную систему</m-btn>
  </flex-col>
</template>

<script setup lang="ts">
const paymentTypes = ref([
  {
    name: "Click",
    id: "click",
  },
  {
    name: "Payme",
    id: "payme",
  },
  {
    name: "Visa and MasterCard",
    id: "visaAndMasterCard",
  },
]);

const selectedPaymentType = ref("payme");

const replanishSum = ref("");

const onChangeReplanishSum = (newValue: any) => {
  replanishSum.value = newValue;
};

const onSelectPaymentType = (newType: string) => {
  selectedPaymentType.value = newType;
};
</script>
