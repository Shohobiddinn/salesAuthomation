<template>
  <menu-btn class="w-full" :disabled="disabled" :menuTopPositionOff="true">
    <template #btn>
      <m-btn-outlined class="border-color-primary bg-white w-full">
        <div class="flex flex-row items-center gap-2 fs-14 fw-4">
          <IconCalendarSVG />
          {{ moment(dateData.fromDate || moment().format('YYYY-MM-DD')).format("DD-MMM") }} -
          {{ moment(dateData.toDate || moment().format('YYYY-MM-DD')).format("DD-MMM") }}
        </div>
      </m-btn-outlined>
    </template>
    <template #content>
      <div class="flex flex-col gap-5 pt-4 pb-2 px-2">
        <button class="flex justify-between gap-5">
          <label
            for="today"
            class="whitespace-nowrap text-sm p-1"
            :class="selectedRange === 'today' && 'text-[#299B9B]'"
            >Сегодня</label
          >
          <input
            type="radio"
            id="today"
            value="today"
            v-model="selectedRange"
            class="hidden"
          />
          <IconCheck v-if="selectedRange === 'today'" :color="'#299B9B'" />
        </button>
        <button class="flex justify-between gap-5">
          <label
            for="yesterday"
            class="whitespace-nowrap text-sm p-1"
            :class="selectedRange === 'yesterday' && 'text-[#299B9B]'"
            >Вчера</label
          >
          <input
            type="radio"
            id="yesterday"
            value="yesterday"
            v-model="selectedRange"
            class="hidden"
          />
          <IconCheck v-if="selectedRange === 'yesterday'" :color="'#299B9B'" />
        </button>
        <button class="flex justify-between gap-5">
          <label
            for="past-7-days"
            class="whitespace-nowrap text-sm p-1"
            :class="selectedRange === 'past-7-days' && 'text-[#299B9B]'"
            >Последние 7 дней</label
          >
          <input
            type="radio"
            id="past-7-days"
            value="past-7-days"
            v-model="selectedRange"
            class="hidden"
          />
          <IconCheck
            v-if="selectedRange === 'past-7-days'"
            :color="'#299B9B'"
          />
        </button>
        <button class="flex justify-between gap-5">
          <label
            for="past-30-days"
            class="whitespace-nowrap text-sm p-1"
            :class="selectedRange === 'past-30-days' && 'text-[#299B9B]'"
            >Последние 30 дней</label
          >
          <input
            type="radio"
            id="past-30-days"
            value="past-30-days"
            v-model="selectedRange"
            class="hidden"
          />
          <IconCheck
            v-if="selectedRange === 'past-30-days'"
            :color="'#299B9B'"
          />
        </button>
        <button class="flex justify-between gap-5">
          <label
            for="this-month"
            class="whitespace-nowrap text-sm p-1"
            :class="selectedRange === 'this-month' && 'text-[#299B9B]'"
            >Этот месяц</label
          >
          <input
            type="radio"
            id="this-month"
            value="this-month"
            v-model="selectedRange"
            class="hidden"
          />
          <IconCheck v-if="selectedRange === 'this-month'" :color="'#299B9B'" />
        </button>
        <button class="flex justify-between gap-5">
          <label
            for="past-month"
            class="whitespace-nowrap text-sm p-1"
            :class="selectedRange === 'past-month' && 'text-[#299B9B]'"
            >Прошлый месяц</label
          >
          <input
            type="radio"
            id="past-month"
            value="past-month"
            v-model="selectedRange"
            class="hidden"
          />
          <IconCheck v-if="selectedRange === 'past-month'" :color="'#299B9B'" />
        </button>
        <button class="flex justify-between gap-5">
          <span class="whitespace-nowrap text-[#8FA0A0]"> Выбрать дату </span>
        </button>
        <DateCalendarPicker
          :withDatePicker="true"
          :initialStartDate="dateData.fromDate"
          :initialEndDate="dateData.toDate"
          @onSave="onSelfSelect"
        />
        <div class="flex flex-row gap-2">
          <cancel-btn class="w-1/2" @click="onCancel">Отменить</cancel-btn>
          <m-btn class="w-1/2" @click="onApply"> Применить </m-btn>
        </div>
      </div>
    </template>
  </menu-btn>
</template>
<script setup>
import moment from "moment";
import { variableData } from "~/variable/variable";

const { isActive } = variableData;

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  initialFromDate: String,
  initialToDate: String
});

const emit = defineEmits(["onApply"]);

// state
const selectedRange = ref(props.initialFromDate || "today");

const dateData = ref({
  fromDate: props.initialFromDate || "",
  toDate: props.initialToDate || "",
});

// methods
watchEffect(() => {
  if (selectedRange.value === "today") {
    dateData.value.toDate = moment().format("YYYY-MM-DD");
    dateData.value.fromDate = moment().format("YYYY-MM-DD");
    return;
  }
  if (selectedRange.value === "yesterday") {
    dateData.value.toDate = moment().format("YYYY-MM-DD");
    dateData.value.fromDate = moment().subtract(1, "day").format("YYYY-MM-DD");
    return;
  }
  if (selectedRange.value === "past-7-days") {
    dateData.value.toDate = moment().format("YYYY-MM-DD");
    dateData.value.fromDate = moment().subtract(7, "day").format("YYYY-MM-DD");
    return;
  }
  if (selectedRange.value === "past-30-days") {
    dateData.value.toDate = moment().format("YYYY-MM-DD");
    dateData.value.fromDate = moment().subtract(30, "day").format("YYYY-MM-DD");
    return;
  }
  if (selectedRange.value === "this-month") {
    dateData.value.toDate = moment().format("YYYY-MM-DD");
    dateData.value.fromDate = moment().startOf("month").format("YYYY-MM-DD");
    return;
  }
  if (selectedRange.value === "past-month") {
    dateData.value.toDate = moment().format("YYYY-MM-DD");
    dateData.value.fromDate = moment()
      .subtract(1, "month")
      .startOf("month")
      .format("YYYY-MM-DD");
    return;
  }
});

const onSelfSelect = (dateRange) => {
  selectedRange.value = "";
  dateData.value.fromDate = dateRange.fromDate;
  dateData.value.toDate = dateRange.toDate;
};

const onCancel = () => {
  isActive.value = false;
  selectedRange.value = "today";
};

const onApply = () => {
  emit("onApply", dateData.value);
  isActive.value = false;
};
</script>
