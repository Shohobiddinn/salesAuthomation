<template>
  <div v-if="paymentInfo" class="ml-[-30px] mr-[-30px] w-[504px]">
    <div class="border-b p-4 mt-[-20px] flex justify-between border-[#E1E4E4]">
      <div class="fs-14 text-[#8FA0A0]">Факт</div>
      <div class="fs-16 fs-[500]">
        {{ paymentInfo?.payment_amount }} {{ paymentInfo?.currency_name }}
      </div>
    </div>
    <div
      class="border-b p-4 mt-[1px] mt-[-20px] flex justify-between border-[#E1E4E4]"
    >
      <div class="fs-14 text-[#8FA0A0]">Клиент</div>
      <div class="fs-16 fs-[500]">{{ paymentInfo?.client_name }}</div>
    </div>
    <div
      class="border-b p-4 mt-[1px] mt-[-20px] flex justify-between border-[#E1E4E4]"
    >
      <div class="fs-14 text-[#8FA0A0]">Телефон</div>
      <div class="fs-16 fs-[500]">{{ paymentInfo?.phone }}</div>
    </div>
    <div
      class="border-b p-4 mt-[1px] mt-[-20px] flex justify-between border-[#E1E4E4]"
    >
      <div class="fs-14 text-[#8FA0A0]">Агент</div>
      <div class="fs-16 fs-[500]">{{ paymentInfo.agent_name }}</div>
    </div>
    <div
      class="border-b p-4 mt-[1px] mt-[-20px] flex justify-between border-[#E1E4E4]"
    >
      <div class="fs-14 text-[#8FA0A0]">Дата оплаты</div>
      <div class="fs-16 fs-[500]">
        {{ getFormattedDate(paymentInfo.payment_received_date) }}
      </div>
    </div>
    <div
      class="border-b p-4 mt-[1px] mt-[-20px] flex justify-between border-[#E1E4E4]"
    >
      <div class="fs-14 text-[#8FA0A0]">Создал</div>
      <div class="fs-16 fs-[500]">{{ paymentInfo?.created_by?.name }}</div>
    </div>
    <div
      class="border-b p-4 mt-[1px] mt-[-20px] flex justify-between border-[#E1E4E4]"
    >
      <div class="fs-14 text-[#8FA0A0]">Изменил</div>
      <div class="fs-16 fs-[500]">{{ paymentInfo?.modified_by?.name }}</div>
    </div>
    <div
      class="border-b p-4 mt-[1px] mt-[-20px] flex justify-between border-[#E1E4E4]"
    >
      <div class="fs-14 text-[#8FA0A0]">Комментарий</div>
      <div class="fs-16 fs-[500]">{{ paymentInfo?.description }}</div>
    </div>
    <div
      class="border-b p-4 mt-[1px] mt-[-20px] flex justify-between border-[#E1E4E4]"
    >
      <div class="fs-14 text-[#8FA0A0]">Дата создания</div>
      <div class="fs-16 fs-[500]">
        {{ getFormattedDate(paymentInfo.payment_approved_date) }}
      </div>
    </div>
    <div class="p-4 mt-[1px] mt-[-20px] flex justify-between">
      <div class="fs-14 text-[#8FA0A0]">Направление торговли</div>
      <div class="fs-16 fs-[500]">{{ paymentInfo?.sales_channel?.name }}</div>
    </div>
    <div class="border border-[#299B9B] flex h-[44px] w-[92%] rounded-lg m-4">
      <button
        @click="onConversionDialog"
        class="w-[40%] border-r border-[#299B9B] font-[500]"
      >
        Конвертировать
      </button>
      <button class="w-[30%] border-r border-[#299B9B] font-[500]">
        История
      </button>
      <button class="w-[30%] font-[500]" @click="onChangePaymentDialog">
        Изменить
      </button>
    </div>
  </div>
  <div v-else class="w-full flex justify-center items-center">
    <IconLoading :loading="true" :width="11" :height="11" />
  </div>
</template>

<script setup>
import moment from "moment";

// store
const clientDebtsStore = useClientsDebtsStore("main");

// props
const props = defineProps({
  debtId: String,
});

// emits
const emit = defineEmits("onOpenConversionDialog", "onOpenPaymentDialog");

// state
const paymentInfo = ref(null);

// methods
onMounted(async () => {
  await getPaymentInfo();
});

const getPaymentInfo = async () => {
  if (props.debtId) {
    paymentInfo.value = await clientDebtsStore.getClientPaymentInfo(
      props.debtId
    );
  }
};

const getFormattedDate = (date) => {
  return date && moment(date).format("YYYY-MM-DD");
};

function onConversionDialog() {
  emit("onOpenConversionDialog");
}

function onChangePaymentDialog() {
  emit("onOpenChangePaymentDialog");
}
</script>

<style scoped></style>
