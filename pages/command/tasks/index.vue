<template>
  <div class="flex flex-col gap-6 py-7.5">
    <div class="flex justify-between items-center">
      <div class="mt-2 text-[24px] font-[600] text-[#424F4F]">Задачи</div>
      <m-btn class="w-1/8" @click="addTask = true"> Добавить задачи </m-btn>
    </div>
    <CommandTasksFilterCard />
    <div class="mt-4">
      <CommandTasksMovementAgents
        :addTask="addTask"
        @closeAddTaskDialog="addTask = $event"
      />
    </div>
  </div>
</template>

<script setup>
const addTask = ref(false);
</script>

<style scoped>
.h-100vh {
  height: calc(100vh - 70px);
}
label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
[type="checkbox"]:checked + span:before {
  content: "\f106";
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all 0.4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299b9b;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
input[type="radio"] {
  /* ...existing styles */
  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #299b9b;
  border: 1px solid #cccccc;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
}
input[type="radio"]:checked::before {
  transform: scale(1);
}
.date-for {
  border: 1px solid #e1e4e4;
  border-radius: 8px;
}
.date-picker input {
  width: 114px;
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
.shadow {
  box-shadow: 0px 0px 28px rgba(0, 0, 0, 0.08);
}
.date:before {
  content: "";
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
