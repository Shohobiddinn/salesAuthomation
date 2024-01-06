<template>
  <div>
    <div class="mt-4">
      <ClientsCustomerBalancesSlideCarousels
        @next="next"
        @prev="prev"
        class="gap-2"
        :class="`grid grid-cols-${visibleSlide.length}`"
      >
        <ClientsCustomerBalancesSlideCarouselSlide
          v-for="(slide, index) in totalBalancesSlides"
          :key="slide"
          :index="index"
          :visibleSlide="visibleSlide"
        >
          <div class="rounded-lg border bg-white h-[126px]">
            <div
              :style="{ background: slide.color }"
              class="h-[10px] w-full br-t"
            ></div>
            <div class="flex justify-center items-center h-full mt-[-10px]">
              <div>
                <div class="fs-14 text-[#94A791]">
                  {{ slide?.currency_name }}
                </div>
                <div :style="{ color: slide.color }" class="fs-14 fw-6 mt-1">
                  {{ slide?.amount }}
                </div>
              </div>
            </div>
          </div>
        </ClientsCustomerBalancesSlideCarouselSlide>
      </ClientsCustomerBalancesSlideCarousels>
    </div>
    <div class="mt-4">
      <ClientsCustomerBalancesFilter />
    </div>
    <div class="flex justify-between mt-4">
      <page-title :title="'Таблица'"></page-title>
      <div @click="onOpenArrivalModal" class="flex relative">
        <m-btn>Оплатить</m-btn>
      </div>
    </div>
    <div class="mt-4">
      <ClientsCustomerBalancesDatatable />
    </div>
    <transition name="modal">
      <div v-if="arrivalCheckoutModal">
        <d-modal
          withOverflow
          :dataContainerWidth="'1425px'"
          :name="'Приход в кассу'"
          @closeDialog="arrivalCheckoutDialog"
        >
          <lazy-clients-customer-balances-arrival-checkout-dialog @closeDialog="arrivalCheckoutDialog"/>
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification";

// store
const clientsBalancesStore = useClientsBalancesStore("main");

// state
const totalBalances = ref(null);
const arrivalCheckoutModal = ref(false);
const colorsArr = ref([
  "#D10505",
  "green",
  "blue",
  "red",
  "light-green",
  "dark-green",
]);
const visibleSlide = ref([]);

// methods
onMounted(async () => {
  totalBalances.value = await clientsBalancesStore.getClientsTotalBalances();
  visibleSlide.value = Object.keys(totalBalances?.value)
    .filter((idx) => idx < totalBalances.value.length / 2)
    .map((num) => Number(num));
});

function arrivalCheckoutDialog() {
  arrivalCheckoutModal.value = false;
}

const totalBalancesSlides = computed(() => {
  if (totalBalances.value) {
    return totalBalances.value.map((balance) => ({
      ...balance,
      color: getRandomColor() || "green",
    }));
  } else return [];
});

function next() {
  if (
    visibleSlide.value[visibleSlide.value.length - 1] <
    totalBalancesSlides.value.length - 1
  ) {
    visibleSlide.value.push(
      visibleSlide.value[visibleSlide.value.length - 1] + 1
    );
    visibleSlide.value.splice(0, 1);
  } else {
    visibleSlide.value = [0, 1];
  }
}

function prev() {
  if (visibleSlide.value[0] > 0) {
    visibleSlide.value.unshift(visibleSlide.value[0] - 1);
    visibleSlide.value.splice(visibleSlide.value.length - 1, 1);
  } else {
    const slLen = totalBalancesSlides.value.length - 1;
    visibleSlide.value = [slLen - 1, slLen];
  }
}

const onOpenArrivalModal = () => {
  if (clientsBalancesStore.clientsIds.length) {
    arrivalCheckoutModal.value = true;
  } else {
    notify({ title: "Сначала выберите клиента!", type: "error" });
    return;
  }
};

const getRandomColor = () => {
  const idx = Math.floor(Math.random() * colorsArr.value.length);
  return colorsArr.value[idx];
};
</script>

<style scoped>
.br-t {
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}
</style>
