<template>
  <rounded-white-container class="border-1">
    <div class="-mx-4 -mt-4">
      <div class="w-full overflow-auto rounded-t-large">
        <data-table
          :headers="headers"
          @sort="sortData"
          :sorted="sortedData"
          :reportsTable="true"
          :withInformationAboveHeader="true"
        >
          <template #body>
            <c-tr v-for="data in loadedData" :key="data">
              <c-td-no-edit class="td" v-for="key in headers" :key="key">
                <div class="py-4.5 px-5.5">
                  <div v-if="dataWithIcons && key.key === 'activity'">
                    <div
                      v-if="data[key.key]"
                      class="rounded-large h-7 min-w-min bg-[#23c00a1a] flex justify-center px-1.5"
                    >
                      <span
                        class="text-light-green fs-12 flex justify-center items-center"
                        >Актывный</span
                      >
                    </div>
                    <div
                      v-else
                      class="rounded-large h-7 min-w-min bg-[#BD7F061A] flex justify-center px-1.5"
                    >
                      <span
                        class="text-orange fs-12 flex justify-center items-center"
                        >Нкактывный</span
                      >
                    </div>
                  </div>
                  <div v-else-if="dataWithIcons && key.key === 'required'">
                    <div
                      v-if="data[key.key]"
                      class="rounded-large h-7 w-1/3 bg-[#23c00a1a] flex justify-center px-1.5"
                    >
                      <span
                        class="text-light-green fs-12 flex justify-center items-center"
                        >Да</span
                      >
                    </div>
                    <div
                      v-else
                      class="rounded-large h-7 w-1/3 bg-[#BD7F061A] flex justify-center px-1.5"
                    >
                      <span
                        class="text-orange fs-12 flex justify-center items-center"
                        >Нет</span
                      >
                    </div>
                  </div>
                  <div v-else-if="dataWithIcons && key.key === 'icons'">
                    <div
                      v-if="data[key.key] === 'addAndDelete'"
                      class="w-full flex justify-end gap-4.5"
                    >
                      <IconUserAdd
                        class="cursor-pointer"
                        @click="$emit('onOpenPopUp')"
                      />
                      <IconTrash class="cursor-pointer" />
                    </div>
                  </div>
                  <div v-else-if="key.outlinedData">
                    <d-input
                      class="rounded-lg border-1 py-3 text-gray bg-lotion"
                      :type="'text'"
                      :value="data[key.key]"
                      @change="(value) => (data[key.key] = value)"
                    >
                    </d-input>
                  </div>
                  <div v-else>
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
const props = defineProps({
  headers: Array,
  loadedData: Array,
  dataWithIcons: Boolean,
});

const emits = defineEmits(["onOpenPopUp"]);

let sortedData = ref({ key: "", mode: "" });

function sortData(data: any) {
  sortedData.value = data;
}
</script>