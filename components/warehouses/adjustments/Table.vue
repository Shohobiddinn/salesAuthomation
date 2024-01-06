<template>
  <div class="rounded-lg bg-white border-grey px-[2px] pr-2 pb-2 relative">
    <div class="w-full h-[500px] overflow-y-auto ">
      <div class="h-full w-3 bg-white absolute z-50 right-4 border-l-1"></div>
      <div class="w-[96.5%] h-3 bg-white absolute z-50 bottom-4 border-t-1"></div>
      <div class=" mr-2 flex">
        <data-table-common2 :headers="headers">
          <template #body>
            <template v-for="(data, index) in loadedData" :key="index">
              <c-tr class=" b-bottom cursor-pointer">
                <c-td-no-edit v-for="key in headers" :key="key" >
                  <div v-if="key.key !== 'difference' && key.key !== 'difference'">
                    {{ data[key.key] }}
                  </div>
                  <div class="py-2" v-if="key.key === 'difference'">
                    <d-input placeholder="Пишите"></d-input>
                  </div>
                  <div class="py-2" v-if="key.key === 'difference1'">
                    <d-input placeholder="Пишите"></d-input>
                  </div>
                </c-td-no-edit>
              </c-tr>
            </template>
          </template>
        </data-table-common2>
      </div>
    </div>
  </div>
  <div class="mt-4">
    <m-btn class="w-[200px]">Сохранить</m-btn>
  </div>
</template>
<script setup>
// State
let headers = ref([
  {
    name: "Товары",
    checked:true,
    key: "product",
    type:"product",
    thWidth:'200px',
    bRadius:'8px'
  },
  {
    name: "Текущий склад",
    checked:true,
    key: "current",
    type:"current",
    thWidth:'120px'
  },
  {
    name: "Разница",
    checked:true,
    key: "difference",
    type:"difference",
    thWidth:'120px'
  },
  {
    name: "После корректировки",
    checked:true,
    key: "after",
    type:"after",
    thWidth:'160px'
  },
  {
    name: "Разница",
    checked:true,
    key: "difference1",
    type:"difference1",
    thWidth:'140px'
  }
]);
const loadedData = ref([
  {
    product:"\"Dena\" - Зеленая Яблоко 1л",
    current:"1236",
    difference:"",
    after:"13268",
    difference1:""
  },
  {
    product:"\"Dena\" - Зеленая Яблоко 1л",
    current:"1236",
    difference:"",
    after:"13268",
    difference1:""
  },
  {
    product:"\"Dena\" - Зеленая Яблоко 1л",
    current:"1236",
    difference:"",
    after:"13268",
    difference1:""
  },
  {
    product:"\"Dena\" - Зеленая Яблоко 1л",
    current:"1236",
    difference:"",
    after:"13268",
    difference1:""
  },
  {
    product:"\"Dena\" - Зеленая Яблоко 1л",
    current:"1236",
    difference:"",
    after:"13268",
    difference1:""
  },
  {
    product:"\"Dena\" - Зеленая Яблоко 1л",
    current:"1236",
    difference:"",
    after:"13268",
    difference1:""
  },
  {
    product:"\"Dena\" - Зеленая Яблоко 1л",
    current:"1236",
    difference:"",
    after:"13268",
    difference1:""
  },
  {
    product:"\"Dena\" - Зеленая Яблоко 1л",
    current:"1236",
    difference:"",
    after:"13268",
    difference1:""
  },
  {
    product:"\"Dena\" - Зеленая Яблоко 1л",
    current:"1236",
    difference:"",
    after:"13268",
    difference1:""
  },
  {
    product:"\"Dena\" - Зеленая Яблоко 1л",
    current:"1236",
    difference:"",
    after:"13268",
    difference1:""
  },
])
</script>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
}
</style>
