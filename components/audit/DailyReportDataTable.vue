<template>
  <div class="w-full overflow-auto mt-4 bg-white rounded-xl">
    <flex-row class="mb-3 w-full">
      <div class="w-full">
        <div class="h-54px border-r-1">
          <span
            class="font-semibold fs-12 uppercase ml-6 text-green-7 h-2/3"
          ></span>
          <div class="bg-lotion w-full h-full border-t-1 border-l-1"></div>
        </div>
        <data-table
          :headers="tableHeaders.nameAndNumber"
          @sort="sortData"
          :sorted="sortedData"
          :withInformationAboveHeader="true"
          class="border-x-1"
        >
          <template #body>
            <c-tr v-for="data in tableData.nameAndNumber" :key="data">
              <c-td-no-edit
                :custom-padding="true"
                v-for="key in tableHeaders.nameAndNumber"
                :key="key"
                class="px-2 py-3 whitespace-nowrap"
              >
                {{ data[key.key] }}
              </c-td-no-edit>
            </c-tr>
          </template>
        </data-table>
      </div>
      <div>
        <div class="h-54px">
          <span class="font-semibold fs-12 uppercase ml-6 text-green-7 h-2/3"
            >по плану</span
          >
          <div class="bg-lotion w-full h-full border-t-1 border-r-1"></div>
        </div>
        <data-table
          :headers="tableHeaders.inPlan.report"
          @sort="sortData"
          :sorted="sortedData"
          :withInformationAboveHeader="true"
          class="border-r-1"
        >
          <template #body>
            <c-tr v-for="data in tableData.inPlan.report" :key="data">
              <c-td-no-edit
                :custom-padding="true"
                v-for="key in tableHeaders.inPlan.report"
                :key="key"
                class="px-2 py-3 whitespace-nowrap"
              >
                {{ data[key.key] }}
              </c-td-no-edit>
            </c-tr>
          </template>
        </data-table>
      </div>
      <div>
        <div class="h-54px border-r-1">
          <span
            class="font-semibold fs-12 uppercase ml-6 text-green-7 h-2/3"
          ></span>
          <div
            class="fs-12 uppercase font-normal text-primary pt-3 px-7 w-full bg-lotion border-t-1"
          >
            Посещение
          </div>
        </div>
        <data-table
          :headers="tableHeaders.inPlan.visited"
          @sort="sortData"
          :sorted="sortedData"
          :withInformationAboveHeader="true"
          class="border-r-1"
        >
          <template #body>
            <c-tr v-for="data in tableData.inPlan.visited" :key="data">
              <c-td-no-edit
                :custom-padding="true"
                v-for="key in tableHeaders.inPlan.visited"
                :key="key"
                class="px-2 py-3 whitespace-nowrap"
              >
                {{ data[key.key] }}
              </c-td-no-edit>
            </c-tr>
          </template>
        </data-table>
      </div>
      <div>
        <div class="h-54px">
          <span class="font-semibold fs-12 uppercase ml-6 text-green-7 h-2/3"
            >вне плана</span
          >
          <div class="bg-lotion w-full h-full border-t-1 border-r-1"></div>
        </div>
        <data-table
          :headers="tableHeaders.outOfPlan.inCome"
          @sort="sortData"
          :sorted="sortedData"
          :withInformationAboveHeader="true"
          class="border-r-1"
        >
          <template #body>
            <c-tr v-for="data in tableData.outOfPlan.inCome" :key="data">
              <c-td-no-edit
                :custom-padding="true"
                v-for="key in tableHeaders.outOfPlan.inCome"
                :key="key"
                class="px-2 py-3 whitespace-nowrap"
              >
                {{ data[key.key] }}
              </c-td-no-edit>
            </c-tr>
          </template>
        </data-table>
      </div>
      <div>
        <div class="h-54px">
          <span class="font-semibold fs-12 uppercase ml-6 text-green-7"></span>
          <div
            class="fs-12 uppercase font-normal border-r-1 text-primary pt-3 px-7 w-full bg-lotion border-t-1"
          >
            Посещение
          </div>
        </div>
        <data-table
          :headers="tableHeaders.outOfPlan.visited"
          @sort="sortData"
          :sorted="sortedData"
          :withInformationAboveHeader="true"
          class="border-r-1"
        >
          <template #body>
            <c-tr v-for="data in tableData.outOfPlan.visited" :key="data">
              <c-td-no-edit
                :custom-padding="true"
                v-for="key in tableHeaders.outOfPlan.visited"
                :key="key"
                class="px-2 py-3 whitespace-nowrap"
              >
                {{ data[key.key] }}
              </c-td-no-edit>
            </c-tr>
          </template>
        </data-table>
      </div>
    </flex-row>
    <flex-row class="justify-between">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14"> Показать по </span>
        <page-size-btn
          :current-size="customerStore.params.page_size"
          @setPageSize="customerStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="
            customerStore.data?.total_pages
              ? customerStore.data?.total_pages
              : 1
          "
          :current-page="
            customerStore.data?.page_number
              ? customerStore.data?.page_number
              : 1
          "
          @setPage="customerStore.setPage"
        />
      </div>
    </flex-row>
  </div>
</template>

<script setup>
const customerStore = useReportCustomerStore("main");
const filter = ref({
  isSelectType: false,
});

const tableHeaders = ref({
  nameAndNumber: [
    {
      name: "№",
      key: "orderNumber",
      thWidth: "auto",
      checked: true,
      withoutHeader: false,
    },
    {
      name: "Имя",
      key: "name",
      thWidth: "auto",
      checked: true,
      withoutHeader: false,
    },
  ],
  inPlan: {
    report: [
      {
        name: "План",
        key: "plan",
        thWidth: "auto",
        checked: true,
      },
      {
        name: "Посещено",
        key: "visited",
        thWidth: "auto",
        checked: true,
      },
      {
        name: "Непосещено",
        key: "notVisited",
        thWidth: "auto",
        checked: true,
      },
    ],
    visited: [
      {
        name: "Опрос",
        key: "survey",
        thWidth: "auto",
        checked: true,
      },
      {
        name: "Аудит",
        key: "audit",
        thWidth: "auto",
        checked: true,
      },
      {
        name: "Фото",
        key: "photo",
        thWidth: "auto",
        checked: true,
      },
      {
        name: "Коммент",
        key: "comment",
        thWidth: "auto",
        checked: true,
      },
    ],
  },
  outOfPlan: {
    inCome: [
      {
        name: "Посещено",
        key: "visited",
        thWidth: "auto",
        checked: true,
      },
    ],
    visited: [
      {
        name: "Опрос",
        key: "survey",
        thWidth: "auto",
        checked: true,
      },
      {
        name: "Аудит",
        key: "audit",
        thWidth: "auto",
        checked: true,
      },
    ],
  },
});

const tableData = ref({
  nameAndNumber: [
    {
      orderNumber: 1,
      name: "merch",
    },
    {
      orderNumber: 1,
      name: "merch",
    },
    {
      orderNumber: 1,
      name: "merch",
    },
    {
      orderNumber: 1,
      name: "merch",
    },
    {
      orderNumber: 1,
      name: "merch",
    },
    {
      orderNumber: 1,
      name: "merch",
    },
    {
      orderNumber: 1,
      name: "merch",
    },
    {
      orderNumber: 1,
      name: "merch",
    },
    {
      orderNumber: 1,
      name: "merch",
    },
    {
      orderNumber: 1,
      name: "merch",
    },
    {
      orderNumber: 1,
      name: "merch",
    },
    {
      orderNumber: 1,
      name: "merch",
    },
    {
      orderNumber: "",
      name: "Итоги",
    },
  ],
  inPlan: {
    report: [
      {
        plan: "12368",
        visited: "12368",
        notVisited: "12368",
      },
      {
        plan: "12368",
        visited: "12368",
        notVisited: "12368",
      },
      {
        plan: "12368",
        visited: "12368",
        notVisited: "12368",
      },
      {
        plan: "12368",
        visited: "12368",
        notVisited: "12368",
      },
      {
        plan: "12368",
        visited: "12368",
        notVisited: "12368",
      },
      {
        plan: "12368",
        visited: "12368",
        notVisited: "12368",
      },
      {
        plan: "12368",
        visited: "12368",
        notVisited: "12368",
      },
      {
        plan: "12368",
        visited: "12368",
        notVisited: "12368",
      },
      {
        plan: "12368",
        visited: "12368",
        notVisited: "12368",
      },
      {
        plan: "12368",
        visited: "12368",
        notVisited: "12368",
      },
      {
        plan: "12368",
        visited: "12368",
        notVisited: "12368",
      },
      {
        plan: "12368",
        visited: "12368",
        notVisited: "12368",
      },
      {
        plan: "10 000 000",
        visited: "10 000 000",
        notVisited: "10 000 000",
      },
    ],
    visited: [
      {
        survey: "12368",
        audit: "12368",
        photo: "12368",
        comment: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
        photo: "12368",
        comment: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
        photo: "12368",
        comment: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
        photo: "12368",
        comment: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
        photo: "12368",
        comment: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
        photo: "12368",
        comment: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
        photo: "12368",
        comment: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
        photo: "12368",
        comment: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
        photo: "12368",
        comment: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
        photo: "12368",
        comment: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
        photo: "12368",
        comment: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
        photo: "12368",
        comment: "12368",
      },
      {
        survey: "10 000 000",
        audit: "10 000 000",
        photo: "10 000 000",
        comment: "10 000 000",
      },
    ],
  },
  outOfPlan: {
    inCome: [
      {
        visited: "12368",
      },
      {
        visited: "12368",
      },
      {
        visited: "12368",
      },
      {
        visited: "12368",
      },
      {
        visited: "12368",
      },
      {
        visited: "12368",
      },
      {
        visited: "12368",
      },
      {
        visited: "12368",
      },
      {
        visited: "12368",
      },
      {
        visited: "12368",
      },
      {
        visited: "12368",
      },
      {
        visited: "12368",
      },
      {
        visited: "10 000 000",
      },
    ],
    visited: [
      {
        survey: "12368",
        audit: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
      },
      {
        survey: "12368",
        audit: "12368",
      },
      {
        survey: "10 000 000",
        audit: "10 000 000",
      },
    ],
  },
});

let sortedData = ref({ key: "", mode: "" });

function sortData(data) {
  sortedData.value = data;
}
</script>
