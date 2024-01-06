<template>
  <rounded-white-container class="gap-4">

    <flex-row class="gap-4"
              v-for="(s,index) in filterStates" :key="index">
      <flex-col class="w-1/4"
                v-for="cols in s"
                :key="cols.key">
        <i-title v-if="cols.key !== 'btn'">
          {{ cols.name }}
        </i-title>

        <flex-row class="h-full items-end gap-2" v-if="cols.key === 'btn'">
          <m-btn class="w-full">
            Применить
          </m-btn>
          <sm-btn class="px-4 py-3">
            <IconReloadSVG/>
          </sm-btn>
        </flex-row>
        <flex-row >
        <div v-if="cols.key === 'date'" >
          <DatePicker />
        </div>
        </flex-row>
       
        <menu-btn class="w-full"
                  v-if="cols.key !== 'btn' && cols.key !== 'range' && cols.key !== 'radio' && cols.key !== 'key'&& cols.key !== 'date'">
          <template #btn>
            <m-btn-outlined
              class="border-grey flex items-center w-full gap-2">
              <fa-icon hash="&#xf078" />
              Выбрать
            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col class="gap-2">
              <search-input />
              <ReportCustomerFilterItems
                :data="customerStore[cols.key]" />
            </flex-col>
          </template>
        </menu-btn>
      </flex-col>
    </flex-row>
  </rounded-white-container>
</template>

<script setup>
// Store
const customerStore = useReportCustomerStore("main");

// State
const filterStates = ref({
  firstRow: [
    {
      name: "Супервайзер",
      key: "agents"
    },
    {
      name: "Агент",
      key: "territories"
    },
    {
      name:"Дата",
      key: "date"
    },
    {
      key: "btn"
    },

  ],
});
// Methods

</script>

<style scoped>

</style>
