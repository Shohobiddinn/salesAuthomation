<template>
  <div>
    <div class="bg-[#FAFDFD] w-[622px] ml-[-30px] mr-[-25px] mt-[-22px] h-[350px] overflow-auto border-b border-[#E1E4E4]">
      <div class="flex justify-between mx-6 py-3 border-b border-[#E1E4E4]">
        <div class="fs-14 text-[#8FA0A0]">Факт</div>
        <div class="fs-16 text-[#013636]">120,000 Наличный Cум</div>
      </div>
      <div class="flex justify-between mx-6 py-3 border-b border-[#E1E4E4]">
        <div class="fs-14 text-[#8FA0A0]">Клиент</div>
        <div class="fs-16 text-[#013636]">Андрей ака</div>
      </div>
      <div class="flex justify-between mx-6 py-3 border-b border-[#E1E4E4]">
        <div class="fs-14 text-[#8FA0A0]">Телефон</div>
        <div class="fs-16 text-[#013636]">+998 97 628 28 82</div>
      </div>
      <div class="flex justify-between mx-6 py-3 border-b border-[#E1E4E4]">
        <div class="fs-14 text-[#8FA0A0]">Агент</div>
        <div class="fs-16 text-[#013636]">ТП Андрей</div>
      </div>
      <div class="flex justify-between mx-6 py-3 border-b border-[#E1E4E4]">
        <div class="fs-14 text-[#8FA0A0]">ТП Андрей</div>
        <div class="fs-16 text-[#013636]">13.10.2022</div>
      </div>
      <div class="flex justify-between mx-6 py-3 border-b border-[#E1E4E4]">
        <div class="fs-14 text-[#8FA0A0]">Создал</div>
        <div class="fs-16 text-[#013636]">Fakhriyor</div>
      </div>
      <div class="flex justify-between mx-6 py-3 border-b border-[#E1E4E4]">
        <div class="fs-14 text-[#8FA0A0]">Изменил</div>
        <div class="fs-16 text-[#013636]">Fakhriyor</div>
      </div>
      <div class="flex justify-between mx-6 py-3 border-b border-[#E1E4E4]">
        <div class="fs-14 text-[#8FA0A0]">Комментарий</div>
        <div class="fs-16 text-[#013636]"></div>
      </div>
      <div class="flex justify-between mx-6 py-3 border-b border-[#E1E4E4]">
        <div class="fs-14 text-[#8FA0A0]">Дата создания</div>
        <div class="fs-16 text-[#013636]">13.10.2022 12:25</div>
      </div>
      <div class="flex justify-between mx-6 py-3 border-b border-[#E1E4E4]">
        <div class="fs-14 text-[#8FA0A0]">Направления торговли</div>
        <div class="fs-16 text-[#013636]">Направления Торговли</div>
      </div>
    </div>
    <div class="flex justify-between">
      <div></div>
      <div class="flex pt-4 mb-[-20px]">
        <button class="bg-[#EFF3F3] py-[10px] px-3 rounded-lg mr-4"><IconTrash/></button>
         <button class="flex mr-4 py-[10px]  rounded-lg px-4 bg-[#EFF3F3] text-[#299B9B] fs-14"><IconRe class="mt-1 mr-2"/> Изменить</button>
         <m-btn>
           <div class="flex"><IconEditb :color="true" class="mr-3"/> <div>Изменить</div></div>
         </m-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentDialog"
}
</script>

<style scoped>

</style>
