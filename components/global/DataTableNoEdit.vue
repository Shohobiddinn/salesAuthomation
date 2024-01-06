<template>
  <table class="w-full table-content">
    <thead class="">
    <tr class="mr-1.5 border-primary-gray border-y-1 header-row ">
      <th :style="{borderRight: header.borderR}" v-for="header in headers"
          :key="header" >
        <div v-if="header.checked === false" :style="{width: header.thWidth}" class="flex gap-1 fs-14 fw-4">
          <div class="secondary-gray-text">
            {{ header.name }}
          </div>
          <div class="grid grid-cols-1 gap-0">
            <fa-icon class="fa-icon cursor-pointer"
                     :class="!(sorted.key === header.key && sorted.mode === 'down') ? '-my-0.8':' -my-0 '"
                     v-if="!(sorted.key === header.key && sorted.mode === 'up')"
                     @click="changeSort(header.key, 'up')"
                     hash="&#xf0d8" />
            <fa-icon class="fa-icon cursor-pointer"
                     :class="!(sorted.key === header.key && sorted.mode === 'up') ? '-my-3.5':'mt-0'"
                     v-if="!(sorted.key === header.key && sorted.mode === 'down')"
                     @click="changeSort(header.key, 'down')"
                     hash="&#xf0d7" />
          </div>
        </div>
      </th>
    </tr>
    </thead>
    <tbody>
    <slot name="body"></slot>
    </tbody>
  </table>
</template>

<script setup>

const emit = defineEmits([
  'sort'
])

const props = defineProps({
  headers: Array,
  sorted: Object,
  tdStyle:Object
});

function changeSort(key, mode){
  emit('sort', {key: key, mode: mode})
}
</script>

<style scoped>
td, th {
  padding: 14px;
}
.fa-icon {
  color: #374957;
}
.header-row{
  background: #FAFDFD;
}
.table-content{
  width: 100%; overflow-y: auto; position: relative; margin-bottom: 18px
}
.th-style{
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
</style>

