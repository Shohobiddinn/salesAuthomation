<template>
  <div
    class="w-44 flex relative flex bg-white rounded-lg border justify-center items-center"
  >
    <div class="relative w-1/2 flex items-center">
      <input
        :value="`${selectedHour}`"
        type="time-local"
        class="w-3/5 p-2 border-none outline-none"
        readonly
      />
      <div :class="isOpenHours ? 'rotate-180' : ''" v-click-outside="() => (isOpenHours = false)"><fa-icon hash="&#xf078" class="cursor-pointer transition" @click="isOpenHours = !isOpenHours"/></div>
      <div
        v-if="isOpenHours"
        class="p-2 w-full rounded-lg shadow top-[34px] overflow-auto z-49 mt-2 dropdown bg-white text-center"
      >
        <div v-for="hour in hours" :key="hour">
          <div class="cursor-pointer" @click="onSelectHour(hour)">
            <div class="text-lg">
              {{ hour }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <span class="font-semibold text-lg">:</span>

    <div class="relative w-1/2 flex items-center">
      <input
        :value="`${selectedMinute}`"
        type="time-local"
        class="w-3/5 p-2 border-none outline-none"
        readonly
      />
      <div :class="isOpenMinutes ? 'rotate-180' : ''" v-click-outside="() => (isOpenMinutes = false)"><fa-icon hash="&#xf078" class="cursor-pointer" @click="isOpenMinutes = !isOpenMinutes"/></div>
      <div
        v-if="isOpenMinutes"
        class="p-2 w-full rounded-lg shadow top-[34px] overflow-auto z-50 mt-2 dropdown bg-white text-center"
      >
        <div v-for="minute in minutes" :key="minute">
          <div class="cursor-pointer" @click="onSelectMinute(minute)">
            <div class="text-lg">{{ minute }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  selectedTime: String,
});

const emit = defineEmits(["onSelectedTime"]);

const selectedHour = ref("00");
const selectedMinute = ref("00");

const isOpenHours = ref(false);
const isOpenMinutes = ref(false);

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));

const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0")
);

const onSelectHour = (hour: string) => {
  selectedHour.value = hour;
  emit("onSelectedTime", `${selectedHour.value} : ${selectedMinute.value}`);
};

const onSelectMinute = (minute: string) => {
  selectedMinute.value = minute;
  emit("onSelectedTime", `${selectedHour.value} : ${selectedMinute.value}`);
};

onMounted(() => {
  if (props.selectedTime) {
    const timeParts = props.selectedTime.trim().split(":");
    selectedHour.value = timeParts[0];
    selectedMinute.value = timeParts[1];
  }
});
</script>

<style scoped>
.input-group {
  position: relative;
}

.dropdown {
  position: absolute;
  max-height: 6rem; /* Set the desired maximum height */
  overflow-y: auto; /* Enable vertical scroll if necessary */
}

.dropdown-select {
  width: 4rem;
  padding: 0.5rem;
  background-color: #fff;
  border: 1px solid #cbd5e0;
  border-radius: 0.25rem;
}

.dropdown-select:hover {
  border-color: #4a5568;
}

.selected-time-input {
  width: 4rem;
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.25rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.selected-time-input:focus {
  border-color: var(--primary-color);
}

.dropdown-select:focus {
  border-color: var(--primary-color);
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
</style>
