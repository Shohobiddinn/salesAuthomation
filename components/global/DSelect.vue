<template>
  <div class="flex flex-col gap-2.5 transition-all relative">
    <label v-show="title" :for="id" class="fs-14"
      >{{ title }}
      <span v-show="_required" class="text-red-3 fs-16">*</span>
    </label>

    <select
      :id="id"
      placeholder="dsfdsdf"
      v-model="_value"
      :required="required"
      :disabled="readonly"
      @invalid="requiredCheck(true)"
      @change="requiredCheck(false)"
      :class="invalid && ' !border-red-600 !border-1'"
      @focusout="!_value && requiredCheck(true)"
      class="border h-[42px] bg-[#FAFDFD] rounded-lg px-[15px] outline-0 focus:border-blue-10"
    >
      <option value="" disabled selected>Выбрать</option>
      <slot></slot>
    </select>
    <span v-show="invalid" class="text-red-3 fs-12 absolute top-11.5 right-5"
      >Обязательно поле "{{ title }}"</span
    >
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  value: {
    required: false,
  },
  title: {
    required: false,
  },
  required: {
    type: Boolean,
    required: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});
let _value = ref(props.value || "");
const _required = ref(props.required);
let invalid = ref(false);
const emit = defineEmits(["change"]);

const requiredCheck = (value) => {
  if (props.required === true) invalid.value = value;
};

watch(
  () => props.value,
  (newValue) => {
    _value.value = newValue;
  }
);
watch(_value, async (value, oldValue, onCleanup) => {
  emit("change", value);
});
</script>

<style scoped></style>
