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
                  <div v-if="key.key !== 'inventory'">
                    {{ data[key.key] }}
                  </div>
                  <div class="py-2" v-if="key.key === 'inventory'">
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
    name: "Остаток по учету",
    checked:true,
    key: "balance",
    type:"balance",
    thWidth:'120px'
  },
  {
    name: "Бронь",
    checked:true,
    key: "booking",
    type:"booking",
    thWidth:'120px'
  },
  {
    name: "Доступные",
    checked:true,
    key: "available",
    type:"available",
    thWidth:'100px'
  },
  {
    name: "Реальный остаток по инвентаризации",
    checked:true,
    key: "inventory",
    type:"inventory",
    thWidth:'140px'
  },
  {
    name: "Корректировка",
    checked:true,
    key: "adjustment",
    type:"adjustment",
    thWidth:'120px'
  }
]);
const loadedData = ref([
  {
    product:"\"Dena\" - Зеленая Яблоко 1л",
    balance:"1236",
    booking:"1236",
    available:"13268",
    inventory:"",
    adjustment:"13268",
  },
  {
    product:"\"Dena\" - Зеленая Яблоко 1л",
    balance:"1236",
    booking:"1236",
    available:"13268",
    inventory:"",
    adjustment:"13268",
  },
  {
    product:"\"Dena\" - Зеленая Яблоко 1л",
    balance:"1236",
    booking:"1236",
    available:"13268",
    inventory:"",
    adjustment:"13268",
  },
  {
    product:"\"Dena\" - Зеленая Яблоко 1л",
    balance:"1236",
    booking:"1236",
    available:"13268",
    inventory:"",
    adjustment:"13268",
  },
  {
    product:"\"Dena\" - Зеленая Яблоко 1л",
    balance:"1236",
    booking:"1236",
    available:"13268",
    inventory:"",
    adjustment:"13268",
  },
  {
    product:"\"Dena\" - Зеленая Яблоко 1л",
    balance:"1236",
    booking:"1236",
    available:"13268",
    inventory:"",
    adjustment:"13268",
  },
  {
    product:"\"Dena\" - Зеленая Яблоко 1л",
    balance:"1236",
    booking:"1236",
    available:"13268",
    inventory:"",
    adjustment:"13268",
  },
  {
    product:"\"Dena\" - Зеленая Яблоко 1л",
    balance:"1236",
    booking:"1236",
    available:"13268",
    inventory:"",
    adjustment:"13268",
  },
  {
    product:"\"Dena\" - Зеленая Яблоко 1л",
    balance:"1236",
    booking:"1236",
    available:"13268",
    inventory:"",
    adjustment:"13268",
  },
  {
    product:"\"Dena\" - Зеленая Яблоко 1л",
    balance:"1236",
    booking:"1236",
    available:"13268",
    inventory:"",
    adjustment:"13268",
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
