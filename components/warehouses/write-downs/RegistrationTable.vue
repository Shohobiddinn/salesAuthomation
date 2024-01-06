<template>
  <div v-click-outside="clickOutside" class="rounded-lg bg-white border-grey px-[2px]">
    <div class="overflow-auto table-containers">
      <data-table-common2 :headers="headers" @sort="sortData" :sorted="sortedData">
        <template #body>
          <template v-for="(data, index) in loadedData" :key="index">
            <c-tr class="border-b-none b-bottom cursor-pointer">
              <c-td-no-edit v-for="key in headers" :key="key" >
                <div class="py-2" v-if="key.checked">
                  {{ data[key.key] }}
                </div>
              </c-td-no-edit>
            </c-tr>
          </template>
          <tr class="fs-12 fw-6 border-b-1 border-t-1">
            <td class="p-2">Итого</td>
            <td></td>
            <td class="p-2">23000</td>
          </tr>
        </template>
      </data-table-common2>
    </div>
  </div>
</template>

<script setup>
// State

const filter = ref({
  isCash:false
})

let headers = ref([
  {
    name: "Код",
    checked:true,
    key: "code",
    type:"code",
    thWidth:'40px',
    bRadius:'8px'
  },
  {
    name: "Товар",
    checked:true,
    key: "product",
    type:"product",
    thWidth:'140px'
  },
  {
    name: "Списание",
    checked:true,
    key: "write",
    type:"write",
    thWidth:'70px'
  }
]);
const loadedData = ref([
  {
    code:"123234",
    product:"Coca cola 1,5",
    write:"1000 000"
  },
  {
    code:"123234",
    product:"Coca cola 1,5",
    write:"1000 000"
  },
  {
    code:"123234",
    product:"Coca cola 1,5",
    write:"1000 000"
  },
  {
    code:"123234",
    product:"Coca cola 1,5",
    write:"1000 000"
  },
  {
    code:"123234",
    product:"Coca cola 1,5",
    write:"1000 000"
  },
  {
    code:"123234",
    product:"Coca cola 1,5",
    write:"1000 000"
  },
])
let sortedData = ref({key: '', mode: ''});

// Methods
function searchUpdated(text) {
  console.log(text)
}

function sortData(data) {
  sortedData.value = data
}

function setPage(index){
  currentPage.value = index
}

function setPageSize(size){
  pageSize.value = size
}

</script>

<style scoped>

/* Style the artificial checkbox */

</style>

