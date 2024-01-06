<template>
  <div class="flex flex-col gap-7.5 py-9 px-5">
    <div class="flex justify-between items-center">
      <back-btn @click="$router.go(-1)"></back-btn>
      <div class="flex gap-4.5">
        <m-btn-outlined class="bg-white border-color-red-3">
          <div>Удалить</div>
        </m-btn-outlined>
        <nuxt-link to="/reports/report-builder">
          <m-btn>
            <span class="flex">
              <span><IconEditb :color="true" /></span>
              <span class="ml-2">Изменить</span>
            </span>
          </m-btn>
        </nuxt-link>
      </div>
    </div>
    <p-title>Отчёт: {{ route.params.id }}</p-title>
    <ReportsReportBuilderFilterCard />
    <flex-row class="justify-between">
      <p-title>Результат</p-title>
      <excel-btn :size="'300kb'"></excel-btn>
    </flex-row>
    <div
      v-if="useDragAndDropTableStore.getList('column').length > 0"
      class="flex flex-col gap-3"
    >
      <div class="text-gray-3 font-semibold">По столбу</div>
      <div class="overflow-auto rounded-lg bg-lotion">
        <data-table
          :headers="useDragAndDropTableStore.getList('column')"
          :withInformationAboveHeader="true"
        >
          <template #body>
            <template
              v-for="data in useDragAndDropTableStore.loadedData"
              :key="data"
            >
              <c-tr>
                <c-td-no-edit
                  v-for="key in useDragAndDropTableStore.getList('column')"
                  :key="key"
                  :class="key.borderX && 'border-r-1'"
                >
                  <div
                    class="py-4"
                    :class="key.key === 'agent' && 'font-semibold'"
                  >
                    {{ data[key.key] }}
                  </div>
                </c-td-no-edit>
              </c-tr>
            </template>
          </template>
        </data-table>
      </div>
    </div>
    <div
      v-if="useDragAndDropTableStore.getList('row').length > 0"
      class="flex flex-col gap-3"
    >
      <div class="text-gray-3 font-semibold">По ряду</div>
      <flex-col class="bg-white rounded-lg overflow-auto">
        <flex-row
          v-for="row in useDragAndDropTableStore.getList('row')"
          :key="row.id"
          class="gap-4 border-b-1 px-4"
        >
          <div class="py-4 px-2" :class="row.borderX && 'border-r-1'">
            <div :style="{ width: row.thWidth }">
              {{ row.name }}
            </div>
          </div>
          <div
            v-for="data in useDragAndDropTableStore.loadedData"
            :key="data"
            :style="{ width: row.thWidth }"
            class="py-4 px-2"
          >
            {{ data[row.key] }}
          </div>
        </flex-row>
      </flex-col>
    </div>
  </div>
</template>

<script setup lang="ts">
// store
import { useDragAndDropDataTableStore } from "~/stores/reports/report-builder/DragAndDropDataTable.store";
const useDragAndDropTableStore = useDragAndDropDataTableStore("main");

const route = useRoute();
</script>

<style>
</style>