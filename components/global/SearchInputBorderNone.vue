<template>
  <input class="my-input fa-solid mainLoginInput p-2 border-primary-gray border-none rounded-lg"
         type="text"
         v-model="inputVal"
         placeholder="&#xf002 Поиск">
</template>

<script setup lang="ts">
const props = defineProps({
  value: String,
});
const emit = defineEmits(["updated"]);
const inputVal = computed({
  get(): string {
    return props.value;
  },
  set(val): void {
    emit("updated", val);
  },
});
</script>

<style scoped>
.my-input {
  transition: border 200ms ease-out;
}

.my-input:active {
  border-color: white;
}

.my-input:focus {
  outline: none !important;
  border: white;
}

.mainLoginInput::-webkit-input-placeholder {
  font-family: FontAwesome, 'Inter', sans-serif;
  font-weight: normal;
  overflow: visible;
  vertical-align: top;
  display: inline-block !important;
  outline: none;
}

.mainLoginInput::-moz-placeholder {
  font-family: FontAwesome, 'Inter', sans-serif;
  font-weight: normal;
  overflow: visible;
  vertical-align: top;
  display: inline-block !important;
  outline: none;
}

.mainLoginInput:-ms-input-placeholder {
  font-family: FontAwesome, 'Inter', sans-serif;
  font-weight: normal;
  overflow: visible;
  vertical-align: top;
  display: inline-block !important;
  outline: none;
}
.search-placeholder {
  position: relative;
  top: 10%;
  left: -70%;
  color: #d2d7d7;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
}
</style>
