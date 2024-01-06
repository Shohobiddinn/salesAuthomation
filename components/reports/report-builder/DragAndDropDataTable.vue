<template>
  <div>
    <flex-col class="gap-5 bg-white px-6 pb-6 rounded-b-lg">
      <flex-col class="rounded-lg bg-lotion p-4.5 border border-color-primary">
        <flex-col class="gap-3">
          <h3 class="text-xl text-black font-semibold">Доступные поле</h3>
          <div
            class="flex flex-wrap gap-3 w-full min-h-[100px]"
            @drop="onDrop($event, 'available-field')"
            @dragenter.prevent
            @dragover.prevent
          >
            <m-btn-outlined
              v-for="item in useDragAndDropTableStore.getList(
                'available-field'
              )"
              :key="item.id"
              class="border-color-primary bg-white w-4/21 h-11 z-49 cursor-grab"
              draggable="true"
              @dragstart="startDrag($event, item.id)"
            >
              {{ item.name }}
            </m-btn-outlined>
          </div>
        </flex-col>
      </flex-col>
      <flex-row class="justify-center items-center w-full gap-5">
        <div class="flex gap-7.5">
          <IconBackArrowSVG :color="'#8FA0A0'" class="rotate-270" />
          <IconBackArrowSVG :color="'#8FA0A0'" class="rotate-270" />
          <IconBackArrowSVG :color="'#8FA0A0'" class="rotate-270" />
        </div>
        <div class="text-[#8FA0A0]">Перетащите значение</div>
      </flex-row>
      <flex-row class="w-full gap-4.5">
        <flex-col
          class="rounded-lg bg-lotion p-4.5 border w-1/2 gap-3 border-color-primary"
        >
          <h3 class="text-xl text-black font-semibold">Столбец</h3>

          <div
            class="flex flex-wrap w-full gap-3 min-h-[100px]"
            @drop="onDrop($event, 'column')"
            @dragenter.prevent
            @dragover.prevent
          >
            <m-btn-outlined
              v-for="item in useDragAndDropTableStore.getList('column')"
              :key="item.id"
              class="border-color-primary bg-white w-7/22 h-11 z-49 cursor-grab"
              draggable="true"
              @dragstart="startDrag($event, item.id)"
            >
              {{ item.name }}
            </m-btn-outlined>
          </div>
        </flex-col>
        <flex-col
          class="rounded-lg bg-lotion p-4.5 border w-1/2 gap-3 border-color-primary"
        >
          <h3 class="text-xl text-black font-semibold">Ряд</h3>
          <div
            class="flex flex-wrap w-full gap-3 min-h-[100px]"
            @drop="onDrop($event, 'row')"
            @dragenter.prevent
            @dragover.prevent
          >
            <m-btn-outlined
              v-for="item in useDragAndDropTableStore.getList('row')"
              :key="item.id"
              class="border-color-primary bg-white w-1/3 h-11 z-49 cursor-grab"
              draggable="true"
              @dragstart="startDrag($event, item.id)"
            >
              {{ item.name }}
            </m-btn-outlined>
          </div>
        </flex-col>
      </flex-row>
    </flex-col>

    <flex-col v-if="isDataTableShowable" class="mt-6 gap-8">
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
    </flex-col>
  </div>
</template>

<script setup>
import { watchEffect } from "vue";
import { notify } from "@kyvg/vue3-notification";

// store
import { useDragAndDropDataTableStore } from "~/stores/reports/report-builder/DragAndDropDataTable.store";
const useDragAndDropTableStore = useDragAndDropDataTableStore("main");

const props = defineProps({
  isPreviewDataTable: Boolean,
  isOnSave: Boolean,
});
const emit = defineEmits(["changeIsPreview", "changeIsOnSave"]);

onMounted(() => {
  useDragAndDropTableStore.addIdAndListToHeaders();
});

const startDrag = (e, id) => {
  e.dataTransfer.dropEffect = "move";
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("itemId", id);
};

const onDrop = (e, list) => {
  const itemId = e.dataTransfer.getData("itemId");
  useDragAndDropTableStore.onChangeList(list, itemId);
};

const isDataTableShowable = ref(false);

watchEffect(() => {
  if (props.isPreviewDataTable) {
    if (
      useDragAndDropTableStore.getList("column").length > 0 ||
      useDragAndDropTableStore.getList("row").length > 0
    ) {
      isDataTableShowable.value = true;
      return;
    } else {
      notify({ title: "Выберите некоторые поля!", type: "warn" });
      isDataTableShowable.value = false;
      emit("changeIsPreview", false);
      return;
    }
  }
});

watchEffect(() => {
  if (props.isOnSave) {
    if (
      useDragAndDropTableStore.getList("column").length > 0 ||
      useDragAndDropTableStore.getList("row").length > 0
    ) {
      emit("changeIsOnSave", true);
    } else {
      notify({ title: "Выберите некоторые поля!", type: "warn" });
      emit("changeIsOnSave", false);
    }
  }
});
</script>

<style>
</style>