<template>
  <div>
    <div>
      <button
        @click="$router.go(-1)"
        class="h-11 px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border"
      >
        <div class="flex">
          <IconArrowLeft class="mt-[5px] mr-2.5"></IconArrowLeft>
          Назад
          <slot></slot>
        </div>
      </button>
      <div class="mt-5">
        <rounded-white-container>
          <div class="grid grid-cols-2">
            <div class="py-3">
              <div class="text-gray-400">Имя клиента</div>
              <div class="text-[24px]">Мавлюда ва Абдуламинхон</div>
              <div class="text-gray-400">+998 97 628 28 82</div>
            </div>
            <div class="p-3">
              <div
                v-for="item in data"
                class="flex justify-between border-b-1 py-3"
              >
                <div class="text-gray-400">{{ item.name }}</div>
                <div>{{ item.lastName }}</div>
              </div>
            </div>
          </div>
        </rounded-white-container>
      </div>
      <div class="mt-4">
        <div class="grid grid-cols-4 gap-5">
          <div
            v-for="(item, index) in 4"
            class="flex justify-center items-center rounded-lg bg-green-50 h-23"
            :class="index === 0 ? 'bg-yellow-50' : ''"
          >
            <div class="flex gap-5">
              <div
                :class="index === 0 ? '#CBE7CD' : ''"
                class="flex justify-center items-center rounded-[50%] h-13 w-13 bg-[#C2E0E0]"
              >
                <IconDollar v-if="index === 0" />
                <IconCard v-else />
              </div>
              <div>
                <div class="text-[18px] font-[500]">-500 000 000</div>
                <div class="text-gray-400 fs-14">Наличные</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-5 flex gap-5">
        <button
          @click="dolg = true"
          class="rounded-lg py-2 bg-red px-9 flex gap-3"
        >
          <div class="py-2"><IconArrowBottom :color="true" /></div>
          <span class="fs-14 text-white">Долг</span>
        </button>
        <m-btn @click="payment = true">
          <div class="flex gap-4">
            <div class="py-2"><IconArrowBottom :color="true" /></div>
            <span class="fs-14 text-white">Оплата</span>
          </div>
        </m-btn>
        <button class="fs-14 bg-blue-600 rounded-lg py-2 px-6 text-white">
          История удалений
        </button>
      </div>
      <div class="mt-5">
        <DashboardFinansAboutsDataTable />
      </div>
      <div>
        <page-title
          :title="'Отчет по дебиторской и кредиторской задолженности\n'"
        />
      </div>
      <div class="mt-5">
        <DashboardFinansAboutsTable />
      </div>
    </div>
    <transition name="modal">
      <div v-if="dolg">
        <d-modal
          @closeDialog="closeDolg"
          :dataContainerWidth="'400px'"
          :name="'Дать в долг'"
        >
          <div class="relative w-full">
            <DashboardFinansAboutsDialog />
          </div>
        </d-modal>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="payment">
        <d-modal
          @closeDialog="closePayment"
          :dataContainerWidth="'400px'"
          :name="'Оплата'"
        >
          <div class="relative w-full">
            <DashboardFinansAboutsDialog />
          </div>
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
const dolg = ref(false);
function closeDolg() {
  dolg.value = false;
}
const payment = ref(false);
function closePayment() {
  payment.value = false;
}
const data = ref([
  {
    name: "Агент",
    lastName: "Азамжон",
  },
  {
    name: "Территория",
    lastName: "Ташкент",
  },
  {
    name: "Категория",
    lastName: "Розница",
  },
]);
</script>

<style scoped></style>
