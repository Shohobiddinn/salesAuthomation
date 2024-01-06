<template>
  <div v-click-outside="clickOutside" class="w-full">
    <div class="grid grid-cols-2">
      <div class="flex justify-between">
        <div>
          <span class="text-[#8FA0A0] fs-14 fw-4">
           Клиент
          </span>
        </div>
        <div>
          <span class="text-gray-3 fs-14 fw-6">
           Qurbon ali SIlver
          </span>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 mt-4">
      <div>
        <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
           Агент
          </span>
        </div>
        <div  class="flex-row relative">
          <div @click="filter.isAgent = !filter.isAgent" class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]">
            <div class="ml-4 mt-2">
              <IconArrowBottom/>
            </div>
            <div class="fs-14 text-gray ml-2">Выбрать</div>
          </div>
          <div v-if="filter.isAgent" class="absolute w-full  pt-2 border top-[50px] z-50 rounded-lg bg-[#FAFDFD]">
            <div class="flex pl-3 border-b border-[#E1E4E4]">
              <div>
                <label>
                  <input type='checkbox'>
                  <span></span>
                </label>
              </div>
              <div class="fs-14 ml-2">Select all</div>
            </div>
            <div class="h-[200px] overflow-auto mr-3 ">
              <div style="border-bottom-right-radius: 8px; border-bottom-left-radius: 8px" class="absolute flex justify-center bottom-0 h-40px w-100 bg-white z-[9999]">
                <button class="w-[80%] bg-[#299B9B] fs-12 h-[30px] text-white rounded-lg mt-1">load </button>
              </div>
              <div v-for="i in 15" class="flex pl-3 pt-2">
                <div>
                  <label>
                    <input type='checkbox'>
                    <span></span>
                  </label>
                </div>
                <div class="fs-14 ml-2">Checkbox</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
           Экспедитор
          </span>
        </div>
        <div  class="flex-row relative">
          <div @click="filter.isExpeditor = !filter.isExpeditor" class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]">
            <div class="ml-4 mt-2">
              <IconArrowBottom/>
            </div>
            <div class="fs-14 text-gray ml-2">Выбрать</div>
          </div>
          <div v-if="filter.isExpeditor" class="absolute w-full  pt-2 border top-[50px] z-50 rounded-lg bg-[#FAFDFD]">
            <div class="flex pl-3 border-b border-[#E1E4E4]">
              <div>
                <label>
                  <input type='checkbox'>
                  <span></span>
                </label>
              </div>
              <div class="fs-14 ml-2">Select all</div>
            </div>
            <div class="h-[200px] overflow-auto mr-3 ">
              <div style="border-bottom-right-radius: 8px; border-bottom-left-radius: 8px" class="absolute flex justify-center bottom-0 h-40px w-100 bg-white z-[9999]">
                <button class="w-[80%] bg-[#299B9B] fs-12 h-[30px] text-white rounded-lg mt-1">load </button>
              </div>
              <div v-for="i in 15" class="flex pl-3 pt-2">
                <div>
                  <label>
                    <input type='checkbox'>
                    <span></span>
                  </label>
                </div>
                <div class="fs-14 ml-2">Checkbox</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
           Тип оплаты
          </span>
        </div>
        <div  class="flex-row relative">
          <div @click="filter.isPayment = !filter.isPayment" class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]">
            <div class="ml-4 mt-2">
              <IconArrowBottom/>
            </div>
            <div class="fs-14 text-gray ml-2">Выбрать</div>
          </div>
          <div v-if="filter.isPayment" class="absolute w-full  pt-2 border top-[50px] z-50 rounded-lg bg-[#FAFDFD]">
            <div class="flex pl-3 border-b border-[#E1E4E4]">
              <div>
                <label>
                  <input type='checkbox'>
                  <span></span>
                </label>
              </div>
              <div class="fs-14 ml-2">Select all</div>
            </div>
            <div class="h-[200px] overflow-auto mr-3 ">
              <div style="border-bottom-right-radius: 8px; border-bottom-left-radius: 8px" class="absolute flex justify-center bottom-0 h-40px w-100 bg-white z-[9999]">
                <button class="w-[80%] bg-[#299B9B] fs-12 h-[30px] text-white rounded-lg mt-1">load </button>
              </div>
              <div v-for="i in 15" class="flex pl-3 pt-2">
                <div>
                  <label>
                    <input type='checkbox'>
                    <span></span>
                  </label>
                </div>
                <div class="fs-14 ml-2">Checkbox</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
           Касса
          </span>
        </div>
        <div  class="flex-row relative">
          <div @click="filter.isCash = !filter.isCash" class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]">
            <div class="ml-4 mt-2">
              <IconArrowBottom/>
            </div>
            <div class="fs-14 text-gray ml-2">Выбрать</div>
          </div>
          <div v-if="filter.isCash" class="absolute w-full  pt-2 border top-[50px] z-50 rounded-lg bg-[#FAFDFD]">
            <div class="flex pl-3 border-b border-[#E1E4E4]">
              <div>
                <label>
                  <input type='checkbox'>
                  <span></span>
                </label>
              </div>
              <div class="fs-14 ml-2">Select all</div>
            </div>
            <div class="h-[200px] overflow-auto mr-3 ">
              <div style="border-bottom-right-radius: 8px; border-bottom-left-radius: 8px" class="absolute flex justify-center bottom-0 h-40px w-100 bg-white z-[9999]">
                <button class="w-[80%] bg-[#299B9B] fs-12 h-[30px] text-white rounded-lg mt-1">load </button>
              </div>
              <div v-for="i in 15" class="flex pl-3 pt-2">
                <div>
                  <label>
                    <input type='checkbox'>
                    <span></span>
                  </label>
                </div>
                <div class="fs-14 ml-2">Checkbox</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border mt-8 w-full"></div>
    <div class="grid grid-cols-2 gap-4 mt-4">
      <div>
        <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
           <DInputDatePicker @change="(newDate) => date = newDate"/>
          </span>
        </div>
        <div  class="flex-row relative">
          <div class="date-picker">
            <input v-model="date" class="my-input  fa-solid mainLoginInput p-2 border-primary-gray border-1 rounded-lg"
                   type="date"
                   placeholder="Выбрать">
          </div>
        </div>
      </div>
      <div>
        <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
           Сумма
          </span>
        </div>
        <div  class="flex-row relative">
          <d-input placeholder="Введите сумму" type="text" class="w-full"/>
        </div>
      </div>
      <div>
        <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
           Направление торговли:
          </span>
        </div>
        <div  class="flex-row relative">
          <d-input placeholder="Введите сумму" type="text" class="w-full"/>
        </div>
      </div>
      <div>
        <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
           Комментарии
          </span>
        </div>
        <div  class="flex-row relative">
          <d-input placeholder="Введите комментарию" type="text" class="w-full"/>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 mt-6">
      <div></div>
      <button class="bg-[#299B9B] text-white rounded-lg h-[44px]">Добавить</button>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
const date = ref(null)
const filter = ref({
  isAgent: false,
  isExpeditor: false,
  isPayment: false,
  isCash: false,
})
const clickOutside = () => {
  filter.value.isSelectProduct = false;
}
</script>

<style scoped>
.date-picker input{
  width: 100%;
  padding-left: 35px;
  position: relative;
  font-size: 12px;
}
.date-picker input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  color: rgba(0, 0, 0, 0);
  opacity: 1;
  display: block;
  background: url(~/assets/svg/date-pickerscg.svg) no-repeat;
  width: 20px;
  height: 20px;
  left: 10px;
  border-width: thin;
  top: 8px;
}
.shadow{
  box-shadow: 0px 0px 28px rgba(0, 0, 0, 0.08);
}
.date:before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  right: 14px;
  top: -10px;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
  border-bottom: 10px solid white;
}
</style>
