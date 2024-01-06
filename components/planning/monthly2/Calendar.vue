
<script setup>
import { ref } from 'vue'
// states
const months = ref(["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"])
const weekDays = ref(["ПH", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"])
const currentMonth = ref(1)
const currentDay = ref(0)
// functions
const nextMonth = () => {
  if (currentMonth.value < 11) {
    currentMonth.value++
  }
}
const previousMonth = () => {
  if (currentMonth.value > 0) {
    currentMonth.value--
  }
}
</script>

<template>
  <div class="w-full">

      <div class="flex justify-center date_month">
        <button @click="previousMonth()"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
          </svg>
        </button>
        <p class="w-20 text-lg font-semibold text-center date_month_name">{{ months[currentMonth] }}</p>
        <button @click="nextMonth()">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
          </svg>
        </button>
      </div>

      <div class="flex justify-between w-full space-x-4 date_picker pa">
        <div class="flex flex-col flex-1 space-y-1 day">
          <label for="day_title"> День</label>
          <select class="px-1 py-2 border-2 rounded-md outline-none cursor-pointer day_picker" name="day_picker"
            id="day_picker">
            <option v-for="day in 31" :value="day">{{ day }}</option>
            <option value="select" selected>Выбрать</option>
          </select>
        </div>  

        <div class="flex flex-col flex-1 space-y-1 month">
          <label for="month_title">Месяц</label>
          <select class="px-1 py-2 border-2 rounded-md outline-none cursor-pointer month_picker" name="month_picker"
            id="month_picker">
            <option v-for="month in months" :value="month">{{ month }}</option>
            <option value="select" selected>Выбрать</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-7 gap-2 py-2 week_days">
        <div class="text-sm font-medium text-center" v-for="weekDay in weekDays">{{ weekDay }}</div>
      </div>

      <div class="grid grid-cols-7 grid-rows-5 gap-2 month_days">
        <div class="col-start-4 px-5 py-4 font-semibold text-center rounded-lg cursor-pointer"
          @click="currentDay = monthDay"
          :style="(monthDay == currentDay) ? 'background: #269D97; color:white' : 'background: white'">
          1</div>
        <div class=" w-[60px] h-[60px] font-semibold flex justify-center items-center transition rounded-[8px] cursor-pointer"
          @click="currentDay = monthDay"
          :style="(monthDay == currentDay) ? 'background: #269D97; color:white' : 'background: white'"
          v-for="monthDay in 27">{{ monthDay + 1 }}</div>
      </div>

      <div class="grid grid-cols-2 mt-4">
      <div></div>
      <m-btn class="w-full">Сохранить</m-btn>
    </div>

  </div>
</template>