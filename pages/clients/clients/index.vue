<template>
  <div>
    <div class="h-100vh">
      <div class="flex justify-between mt-4">
        <div class="mt-2 text-[24px] font-[600] text-[#424F4F]">Клиент</div>
        <m-btn @click="$router.push('/clients/clients/create-clients')"
          >Добавить клиента</m-btn
        >
      </div>
      <div class="mt-6">
        <ClientsClientsFilterCard />
      </div>
      <div class="flex justify-between mt-4">
        <div class="text-[24px] font-[600]">Таблица</div>
        <div v-click-outside="clickOutside1" class="flex relative">
          <button
            class="flex justify-center hover:bg-blue-50 fs-14 py-2 px-10 border border-[#299B9B] rounded-lg bg-white"
          >
            <div><IconUpload /></div>
            <div class="fs-14 ml-1 mt-[2px]">Экспорт</div>
          </button>
          <button
            class="flex justify-center hover:bg-blue-50 fs-14 py-2 px-10 border border-[#299B9B] rounded-lg bg-white ml-3"
          >
            <div><IconDownload /></div>
            <div class="fs-14 ml-1 mt-[2px]">Импорт</div>
          </button>
          <button
            @click="openProcessDropDown"
            class="flex hover:bg-blue-50 justify-center fs-14 py-2 px-4 border border-[#299B9B] rounded-lg bg-white ml-3"
          >
            <div><IconFrame :result="result" /></div>
            <div class="fs-14 ml-1 mt-[2px]">Групповая обработка</div>
          </button>
          <div
            v-if="processDropDown"
            class="absolute card-shadow rounded-lg px-4 py-2 bg-white right-0 top-[50px] z-50 card"
          >
            <div
              v-for="i in groupProcess"
              :key="i"
              @click="onClickGropuProccess(i.url)"
              class="fs-14 hover:bg-blue-50 border-b border-[#E1E4E4] py-1 cursor-pointer"
            >
              {{ i.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <ClientsClientsDataTable />
      </div>
    </div>
  </div>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification";

// store
const clientsStore = useClientsStore("main");

const processDropDown = ref(false);
const result = ref({
  resultTable: true,
});
function openProcessDropDown() {
  processDropDown.value = !processDropDown.value;
}

const groupProcess = ref([
  {
    name: "Прикрепить / открепить агентов",
    url: "/clients/group-process/unpin-agents",
  },
  {
    name: "Прикрепить / открепить Экспедитор",
    url: "/clients/group-process/unpin-expeditor",
  },
  {
    name: "Отметить для аудита",
    url: "/clients/group-process/mark-audit",
  },
  {
    name: "Прикперление и открепление аудиторов к клиентам",
    url: "/clients/group-process/attaching-auditor-client",
  },
  {
    name: "Канал сбыта",
    url: "/clients/group-process/sales-channel",
  },
  {
    name: "Распределение клиентов по категориям и территориям.",
    url: "/clients/group-process/change-territory-category",
  },
  {
    name: "RLP Bonus.",
    url: "/clients/group-process/rlp-bonus",
  },
  {
    name: "Заказ при наличии долга",
    url: "/clients/group-process/order-case-debt",
  },
  {
    name: "Прикрепить тип цены",
    url: "/clients/group-process/attach-price-type",
  },
]);

const clickOutside = () => {
  date.value = false;
};

const clickOutside1 = () => {
  processDropDown.value = false;
};

const onClickGropuProccess = (url) => {
  if (!clientsStore.clientsIds.length) {
    notify({ title: "Сначала выберите клиента!", type: "error" });
    return;
  } else {
    useRouter().push(url);
  }
};
</script>

<style scoped></style>
