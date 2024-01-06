<template>
  <div class="w-full">
    <form class="grid grid-cols-1 w-full gap-2" @submit.prevent="save">
      <div class="flex-row mt-2">
        <span class="fs-14 fw-4 text-gray-3 d-flex">
          Категория расхода
        </span>
        <span class="text-red-3 fs-16">*</span>
      </div>
      <div class="flex-row mb-4">
        <d-input placeholder="Введите" class="w-full" type="text" :value="data.name"
          @change="(value) => data.name = value" required />
      </div>
      <div class="flex flex-row mt-2 items-center justify-between w-full gap-2">
        <m-btn class="grow">
          {{ isEdit ? "Сохранять" : "Добавлять" }}

        </m-btn>
      </div>
    </form>
  </div>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification";
const emit = defineEmits(["closeModal"]);
const props = defineProps({
  value: Object
});
// State
// Store
const { value } = toRefs(props);
// Store
const expandStore = useExpandature('')
const isEdit = ref(false)

// State
const data = ref({
  name: ''
})

// Methods
const save = async () => {
  notify({ title: "Пожалуйста подождите!" });
  await expandStore.add(data.value);
  notify({ title: "Сохранено!" })
  emit('closeModal')

}

// Hooks
onBeforeMount(() => {
  if (value.value?.id) {
    isEdit.value = true
    data.value = value.value;
  }
});
</script>


