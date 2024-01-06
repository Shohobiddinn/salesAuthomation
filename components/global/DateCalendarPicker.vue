<template>
  <div class="w-full">
    <div class="calendar rounded-lg bg-white w-full">
      <div
        class="flex items-center justify-center gap-2.5 font-semibold pb-6 text-2xl"
      >
        <button @click="prevMonth" class="scale-150"><IconArrowLefti /></button>
        <span>{{ currentMonth }}</span>
        <button @click="nextMonth" class="scale-150">
          <IconArrowRighti />
        </button>
      </div>
      <div class="calendar-body">
        <div
          class="flex items-center justify-center font-semibold"
          v-for="day in sortedDays"
          :key="day"
        >
          {{ day }}
        </div>
        <div v-for="blank in blanks" :key="blank" class="day disabled"></div>
        <div
          v-for="date in getDaysInMonth"
          :key="date"
          class="flex items-center justify-center rounded-lg font-semibold cursor-pointer"
          :class="[
            isDateSelected(date) && 'button-bg text-white',
            isSunday(date) && 'bg-[#D105051A]',
            withDatePicker ? 'p-2' : 'p-7',
          ]"
          @click="selectDate(date)"
        >
          {{ date }}
        </div>
      </div>
      <div v-if="!withDatePicker" class="pt-6 flex justify-end gap-4">
        <cancel-btn @click="onCancel">Отменить</cancel-btn>
        <m-btn @click="onSave">Сохранить</m-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import { watchEffect } from "vue";
const props = defineProps({
  singleSelect: {
    type: Boolean,
    default: false,
  },
  withDatePicker: {
    type: Boolean,
    default: false,
  },
  initialStartDate: String,
  initialEndDate: String,
});
const emit = defineEmits(["onSave", "closeDialog"]);

const startDate = ref("");
const endDate = ref("");
const currentMonth = ref(moment().format("MMMM YYYY"));
const selectedDate = ref(null);
const selectedDays = ref([]);

// computed functions
const days = computed(() => {
  return moment.weekdaysMin();
});

const sortedDays = computed(() => {
  return ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
});

const blanks = computed(() => {
  const firstDayOfMonth = moment(currentMonth.value).date(1).format("d");
  if (firstDayOfMonth === "0") {
    return Array(Number(6)).fill("");
  }
  return Array(Number(firstDayOfMonth - 1)).fill("");
});

const getDaysInMonth = computed(() => {
  const daysInMonth = moment(currentMonth.value).daysInMonth();
  return Array(daysInMonth)
    .fill()
    .map((_, i) => i + 1);
});

// methods
watchEffect(() => {
  if (props.initialStartDate && props.initialEndDate) {
    startDate.value = props.initialStartDate;
    endDate.value = props.initialEndDate;
    currentMonth.value = moment(props.initialStartDate).format("MMMM YYYY");
  }
});

const prevMonth = () => {
  currentMonth.value = moment(currentMonth.value, "MMMM YYYY")
    .subtract(1, "months")
    .format("MMMM YYYY");
};

const nextMonth = () => {
  currentMonth.value = moment(currentMonth.value, "MMMM YYYY")
    .add(1, "months")
    .format("MMMM YYYY");
};

const selectDate = (date) => {
  const selectedDate = moment(`${date} ${currentMonth.value}`, "D MMMM YYYY");

  if (props.singleSelect) {
    const isExist = selectedDays.value.find(
      (day) => day === selectedDate.format("YYYY-MM-DD")
    );
    if (!!isExist) {
      selectedDays.value = selectedDays.value.filter(
        (day) => day !== selectedDate.format("YYYY-MM-DD")
      );
    } else {
      selectedDays.value.push(selectedDate.format("YYYY-MM-DD"));
    }
  } else {
    if (!startDate.value) {
      startDate.value = selectedDate.format("YYYY-MM-DD");
    } else if (!endDate.value) {
      endDate.value = selectedDate.format("YYYY-MM-DD");
    } else {
      startDate.value = selectedDate.format("YYYY-MM-DD");
      endDate.value = "";
    }
    if (props.withDatePicker && startDate.value && endDate.value) {
      const selectedRange = {
        fromDate: startDate.value,
        toDate: endDate.value,
      };
      emit("onSave", selectedRange);
    }
  }
};

const isDateSelected = (date) => {
  const selectedDate = moment(`${date} ${currentMonth.value}`, "D MMMM YYYY");

  if (props.singleSelect) {
    return selectedDays.value.find(
      (day) => day === selectedDate.format("YYYY-MM-DD")
    );
  } else {
    if (startDate.value && !endDate.value) {
      return selectedDate.isSame(startDate.value, "day");
    } else if (startDate.value && endDate.value) {
      const _startDate = moment(startDate.value, "YYYY-MM-DD");
      const _endDate = moment(endDate.value, "YYYY-MM-DD");
      const selectedDate = moment(
        `${date} ${currentMonth.value}`,
        "D MMMM YYYY"
      );
      return selectedDate.isBetween(_startDate, _endDate, "day", "[]");
    }
    return false;
  }
};

const isSunday = (date) => {
  return (
    moment(`${date} ${currentMonth.value}`, "DD MMMM YYYY").isoWeekday() === 7
  );
};

const onSave = () => {
  if (props.singleSelect) {
    emit("onSave", selectedDays.value);
    emit("closeDialog");
  } else {
    const selectedRange = `${startDate.value}-${endDate.value}`;
    emit("onSave", selectedRange);
    emit("closeDialog");
  }
};

const onCancel = () => {
  emit("closeDialog");
};
</script>

<style scoped>
.calendar {
  padding: 10px;
  margin-top: 10px;
  display: inline-block;
}

.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 16px;
}

.disabled {
  color: #ccc;
}
</style>
