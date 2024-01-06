<template>
  <div class="flex flex-col gap-2.5 transition-all relative">
    <label v-show="title" :for="id" class="fs-14"
      >{{ title }}
      <span v-show="_required" class="text-red-3 fs-16">*</span>
    </label>
    <input
      class="my-input fa-solid mainLoginInput p-2 border-primary-gray border-1 rounded-lg relative"
      :disabled="disabled"
      :id="id"
      :type="_type"
      v-model="_value"
      :placeholder="placeholder"
      :required="required"
      @invalid="requiredCheck(true)"
      @input="requiredCheck(false)"
      :class="[
        (invalid || invalidRequiredLength) && ' !border-red-600',
        borderless ? '' : 'border-1',
        _value === '' ? 'border-red-600' : '',
      ]"
      @focusout="!_value && requiredCheck(true)"
      @blur="onBlur($event.target.value)"
    />
    <span v-show="invalid" class="text-red-3 fs-12 absolute top-12 right-2"
      >Обязательно поле "{{ title }}"</span
    >
    <span
      v-show="invalidRequiredLength"
      class="text-red-3 fs-12 absolute top-12 right-2"
      >{{ invalidRequiredLength }}</span
    >
    <div
      v-if="type === 'password'"
      class="absolute z-50 w-full flex justify-end w-fit top-2 right-2"
    >
      <IconEye v-show="_type === 'password'" @click="_type = 'text'" />
      <IconCloseEye
        v-show="_type === 'text'"
        @click="_type = 'password'"
        class="mt-[-2px]"
      />
    </div>
  </div>
</template>

<script setup>
import { watchEffect } from "vue";

const props = defineProps({
  placeholder: {
    type: String,
    required: false,
  },
  id: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
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
  borderless: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  requiredLength: Number,
});

const _value = ref(props.value);
const _required = ref(props.required);
const _type = ref(props.type || "text");
let invalid = ref(false);
const invalidRequiredLength = ref(null);

const emit = defineEmits(["change", "blur"]);

const requiredCheck = (value) => {
  if (_value.value < 0 || _value.value?.toString().trim()?.length === 0)
    value = true;
  if (props.required === true) invalid.value = value;
};

const requiredLengthCheck = () => {
  if (_value.value && _value.value.toString().length !== props.requiredLength) {
    invalidRequiredLength.value = `требуется ${props.requiredLength} символов`;
  } else {
    invalidRequiredLength.value = null;
  }
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

const onBlur = (value) => {
  emit("blur", value);
};

const addPrefixToPhoneNumber = (phoneNumber) => {
  return phoneNumber
    ?.replace(/\D/g, "")
    ?.replace(/^(\d)/, "($1")
    ?.replace(/^(\(\d{2})(\d)/, "$1) $2")
    ?.replace(/(\d{3})(\d{1,5})/, "$1-$2")
    ?.replace(/(-\d{4})\d+?$/, "$1");
};

watchEffect(() => {
  if (props.type === "tel") {
    _value.value = addPrefixToPhoneNumber(_value.value);
  }
});

watchEffect(() => {
  if (props.requiredLength) {
    requiredLengthCheck();
  }
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
}

/* Remove arrow buttons from number input */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
