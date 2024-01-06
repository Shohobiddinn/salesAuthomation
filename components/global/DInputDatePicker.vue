<template>
  <div class="date-picker">
    <input
      :disabled="disabled"
      class="my-input h-[42px] fa-solid mainLoginInput p-2 border-primary-gray border-1 rounded-lg"
      :class="borderless && 'border-none'"
      :type="!withoutTime ? 'datetime-local' : 'date'"
      v-model="_value"
      placeholder="Выбрать"
    />
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
const props = defineProps({
  disabled: Boolean,
  value: String,
  borderless: Boolean,
  withoutTime: Boolean,
});
const _value = ref(
  props.withoutTime
    ? props.value || moment().format("YYYY-MM-DD")
    : props.value || moment().format("YYYY-MM-DD HH:MM")
);
const emit = defineEmits(["change"]);

watchEffect(() => {
  if(props.value){
    _value.value = props.value
  }
})

watch(_value, async (value) => {
  if (props.withoutTime) {
    emit("change", moment(value).format("YYYY-MM-DD"));
  }
  else emit("change", moment(value).format("YYYY-MM-DDTHH:MM"));
});
</script>

<style scoped>
.my-input {
  transition: border 200ms ease-out;
}
.my-input:active {
  border-color: var(--primary-color);
}
.my-input:focus {
  outline: none !important;
  border: 1px solid var(--primary-color);
}
.date-picker input {
  width: 100%;
  padding-left: 45px;
  position: relative;
}
.date-picker input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  position: absolute;
  color: rgba(0, 0, 0, 0);
  opacity: 1;
  display: block;
  background: url(~/assets/svg/date-pickerscg.svg) no-repeat;
  width: 20px;
  height: 20px;
  left: 10px;
  border-width: thin;
  top: 12px;
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
  top: 12px;
}
</style>
