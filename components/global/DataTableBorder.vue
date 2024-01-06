<template>
  <table class="w-full table-content">
    <thead class="">
    <tr>
      <th class="td" v-for="(i, index) in 6">
        <div v-if="index === 3">Задание 1</div>
      </th>
    </tr>
    <tr class="mr-1.5 border-primary-gray border-y-1 header-row ">
      <th class="td" v-for="header in headers"
          :key="header">
        <div v-if="header.checked">
          <div v-if="header.type === 'checkbox'">
            <div class="pt-1">
              <label class="mt-1">
                <input type='checkbox'>
                <span></span>
              </label>
            </div>
          </div>
          <div v-if="header.type !== 'checkbox'" :style="{width: header.thWidth}" class="flex p-1 gap-1 fs-14 fw-4">
            <div class="secondary-gray-text">
              {{ header.name }}
            </div>
            <div v-if="header.type !== 'diapazon' && header.type !== 'inWarehouse' && header.type !== 'come' && header.type !== 'quantitys'" class="grid grid-cols-1 gap-0">
              <fa-icon class="fa-icon cursor-pointer"
                       :class="!(sorted.field === header.key && sorted.is_asc) ? '-my-0.8':'-mb-0'"
                       v-if="!(sorted.field === header.key && !sorted.is_asc)"
                       @click="changeSort(header.key, false)"
                       hash="&#xf0d8"/>
              <fa-icon class="fa-icon cursor-pointer"
                       :class="!(sorted.field === header.key && !sorted.is_asc) ? '-my-3.5':'mt-0'"
                       v-if="!(sorted.field === header.key && sorted.is_asc)"
                       @click="changeSort(header.key, true)"
                       hash="&#xf0d7"/>
            </div>
          </div>
        </div>
      </th>
      <th v-if="configuration.isCreate" class="th-style"></th>
      <th v-if="configuration.isNoCreate" class="th-styles"></th>
    </tr>
    </thead>
    <tbody>
    <slot name="body"></slot>
    </tbody>
  </table>
</template>

<script setup lang="ts">

import {PropType} from "vue";
import {DataTableConfiguration} from "~/interfaces/ui/data-table-configuration";

const emit = defineEmits([
  'sort'
])

const props = defineProps({
  headers: Array,
  sorted: Object,
  bordered: String,
  configuration: {
    type: Object as PropType<DataTableConfiguration>,
    default: {
      isCreate: false,
      isNoCreate: true,
    }
  }
});

function changeSort(field: string, is_asc: boolean) {
  emit('sort', {field: field, is_asc: is_asc})
}
</script>

<style scoped>
td, th {
  padding: 9px;
}

.fa-icon {
  color: #374957;
}

.header-row {
  background: #FAFDFD;
}

.table-content {
  width: 100%;
  overflow-y: auto;
  position: relative;
  margin-bottom: 18px
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
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.04)
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
  border: 1px solid #D2D7D7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
[type=checkbox]:checked + span:before {
  content: '\f106';
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all .4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299B9B;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.td:nth-child(2){
  border-right: 1px solid #E1E4E4;
}
.td:nth-child(4){
  border-right: 1px solid #E1E4E4;
}
.td:nth-child(5){
  border-right: 1px solid #E1E4E4;
}
</style>
