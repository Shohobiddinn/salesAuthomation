<template>
  <rounded-white-container class="border-1">
    <div class="-mx-4 -mt-4">
      <div class="w-full overflow-auto rounded-large">
        <div class="w-full flex items-center bg-lotion">
          <div class="w-1/5 border-r-1">
            <div class="flex py-4.5 px-8 gap-5.5">
              <div class="font-medium fs-16">{{ tableTitle }}</div>
              <div
                v-if="withCurrentDate"
                class="font-semibold fs-16 text-gray-3"
              >
                {{ currentDate }}
              </div>
            </div>
          </div>
          <div
            class="flex items-center gap-4.5 py-4.5 px-8"
            :class="roundedLine && 'rounded-t-large'"
          >
            <IconArrowLefti class="cursor-pointer" />
            <h3 class="text-lg text-black font-medium mb-0">
              {{ sliderTitle }}
            </h3>
            <IconArrowRighti class="cursor-pointer" />
          </div>
        </div>
        <data-table
          :headers="headers"
          @sort="sortData"
          :sorted="sortedData"
          :reportsTable="true"
        >
          <template #body>
            <c-tr v-for="data in loadedData" :key="data">
              <c-td-no-edit
                class="td"
                v-for="key in headers"
                :key="key"
                :class="key.borderX && 'border-r-1'"
              >
                <div class="px-5.5 py-4.5">
                  <div>
                    {{ data[key.key] }}
                  </div>
                </div>
              </c-td-no-edit>
            </c-tr>
          </template>
        </data-table>
      </div>
    </div>
  </rounded-white-container>
</template>

<script setup lang="ts">
import moment from "moment";

const currentDate = moment().locale("ru").format("MMMM, YYYY");

const props = defineProps({
  headers: Array,
  loadedData: Array,
  tableTitle: String,
  roundedLine: Boolean,
  withCurrentDate: Boolean,
  sliderTitle: String,
});

const sortedData = ref({ key: "", mode: "" });

const sortData = (data: any) => {
  sortedData.value = data;
}
</script>
