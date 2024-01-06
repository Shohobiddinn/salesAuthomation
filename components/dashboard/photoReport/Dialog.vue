<template>
  <div class="grid grid-cols-2 w-full gap-5">
    <div>
      <div class="w-full">
        <div class="fs-14 ">Дата отправление</div>
        <DInputDatePicker class="w-full mt-2"/>
      </div>
      <div class="w-full mt-4">
        <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
            Получатель
          </span>
        </div>
        <div class="flex-row mt-2">
          <select class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
            <option value="">Выбрать</option>
            <option value="">hello</option>
            <option value="">hello</option>
            <option value="">hello</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-5">
        <div class="w-full mt-4">
          <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
            Сумма
          </span>
          </div>
          <div class="flex-row mt-2">
            <d-input class="w-full"/>
          </div>
        </div>
        <div class="w-full mt-4">
          <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
            Получатель
          </span>
          </div>
          <div class="flex-row mt-2">
            <select class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
              <option value="">Выбрать</option>
              <option value="">hello</option>
              <option value="">hello</option>
              <option value="">hello</option>
            </select>
          </div>
        </div>
      </div>
      <div class="w-full mt-4">
        <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
            Комментария
          </span>
        </div>
        <div class="flex-row mt-2">
          <d-input class="w-full"/>
        </div>
      </div>
    </div>
    <div>
      <div class="fs-14">Фото</div>
      <div class="flex mt-2 border rounded-lg justify-center items-center w-full h-60">
         <div class="w-50">
           <div class="flex justify-center">
             <IconImage/>
           </div>
           <div class="text-center fs-12 mt-3">Чтобы добавить фото кликните или перетащите фото в эту область</div>
         </div>
      </div>
      <div class="mt-8">
        <m-btn class="w-full">Добавить</m-btn>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>
