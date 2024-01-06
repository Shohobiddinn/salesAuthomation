<template>
  <div class="relative">
  <table class="w-full table-content ">
    <thead v-if="!withoutHeader" class="">
    <tr class="mr-1.5 border-primary-gray header-row"  :class="!withInformationAboveHeader && 'border-y-1'">
      <th :style="{background: header.bgHeader}" :class="[header.key === 'stockEnough' || header.borderX ? 'border-r-1' : '', orderBy ? 'brr' : '', header.thWidthWithClass && header.thWidthWithClass, border ? 'brr1' : '']" v-for="header in headers"
          :key="header">
        <div @click="changeSort(header.key)" class="cursor-pointer h-6">
          <div v-if="header.type === 'checkbox'">
            <div class="pt-1">
              <label class="mt-1">
                <input @input="$emit('getAllId')" :checked="check" type='checkbox'>
                <span></span>
              </label>
            </div>
          </div>
          <div v-if="header.type !== 'checkbox' && header.checked" :style="{width: header.thWidth, height: header.thHeight}" class="flex  p-1 gap-1 fs-14 fw-4" :class="[reportsTable && 'justify-center']">
            <div class="secondary-gray-text">
              {{ header.name }}
            </div>
            <div v-if="header.type !== 'diapazon' && header.type !== 'inWarehouse' && header.type !== 'come' && header.type !== 'quantitys'" class="grid" :class="header.thHeight && 'flex flex-col gap-1'">
              <fa-icon class="fa-icon cursor-pointer"
                       :class="!(sorted?.field === header.key && sorted.is_asc) ? '-my-0.8':'-mb-0'"
                       v-if="!(sorted?.field === header.key && !sorted.is_asc)"
                       hash="&#xf0d8"/>
              <fa-icon class="fa-icon cursor-pointer"
                       :class="!(sorted?.field === header.key && !sorted.is_asc) ? '-my-3.5':'mt-0'"
                       v-if="!(sorted?.field === header.key && sorted.is_asc)"
                       hash="&#xf0d7"/>
            </div>
          </div>
        </div>
      </th>
      <th v-if="configuration.isCreate" class="th-style"></th>
      <th v-if="configuration.isNoCreate" class="th-styles"></th>
    </tr>
    </thead>
    <tbody :class="loading && 'opacity-50'">
    <slot name="body"></slot>
    </tbody>
  </table>
  <div v-if="isEmpty && !loading" class="absolute top-[320%] left-[50%] text-2xl">
    Пусто
  </div>
  <div v-show="loading" class="absolute top-[50%] left-[50%]">
    <icon-loading :loading="true" :width="14" :height="14"/>
  </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { DataTableConfiguration } from "~/interfaces/ui/data-table-configuration";

const emit = defineEmits(["sort",'getAllId']);

const props = defineProps({
  check:Boolean,
  headers: Array,
  loading: Boolean,
  sorted: Object,
  bordered: String,
  orderBy: Boolean,
  border:Boolean,
  configuration: {
    type: Object as PropType<DataTableConfiguration>,
    default: {
      isCreate: false,
      isNoCreate: true,
    },
  },
  withoutHeader: {
    type: Boolean,
    default: false,
  },
  withInformationAboveHeader: Boolean,
  reportsTable: Boolean,
  isEmpty: Boolean
});
const active = ref(true)
function changeSort(field: string) {
  active.value = !active.value
  emit("sort", { field: field, is_asc: active.value });
}
</script>

<style scoped>
td,
th {
  padding: 9px;
}

.fa-icon {
  color: #374957;
}

.header-row {
  background: #fafdfd;
}

.table-content {
  width: 100%;
  overflow-y: auto;
  position: relative;
  margin-bottom: 18px;
}

.th-style {
  /*display: flex;*/
  justify-content: center;
  padding-right: 10px;
  position: sticky;
  right: 0px;
  top: auto;
  width: 50px;
  height: 49px;
  background: white;
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.04);
}

.th-styles {
  display: flex;
  width: 50px;
}

label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
[type="checkbox"]:checked + span:before {
  content: "\f106";
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all 0.4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299b9b;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.brr {
  border-right: 1px solid #e1e4e4;
}
.brr1:nth-child(3){
  border-right: 1px solid #E1E4E4;
}
.brr1:nth-child(5){
  border-right: 1px solid #E1E4E4;
}
</style>
