<template>
  <div class="w-full">
     <div v-for="item in payments" class="flex justify-between py-3 border-b-1">
       <div class="fs-14">{{item.name}}</div>
       <div class="fs-16 font-[500]">{{item.title}}</div>
     </div>
    <div class="flex justify-between">
      <div></div>
      <div class="flex pt-4 mb-[-20px]">
        <button class="bg-[#EFF3F3] py-[10px] px-3 rounded-lg mr-4"><IconTrash/></button>
        <m-btn>
          <div class="flex"><IconEditb :color="true" class="mr-3"/> <div>Изменить</div></div>
        </m-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
const payments = ref([
  {
    name:"Факт",
    title:"120,000 Наличный Cум"
  },
  {
    name:"Поставщик",
    title:"Основной поставщик"
  },
  {
    name:"Телефон",
    title:"+998 97 628 28 82"
  },
  {
    name:"Дата оплаты",
    title:"13.10.2022"
  },
  {
    name:"Комментарий",
    title:""
  }
])
</script>

<style scoped>

</style>
