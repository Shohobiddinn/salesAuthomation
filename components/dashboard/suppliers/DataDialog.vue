<template>
  <div class="grid grid-cols-1 w-full gap-2">
    <div class="flex-row">
      <label for="name" class="fs-14 fw-4 text-gray-3"> Названия </label>
    </div>
    <div class="flex-row">
      <d-input
        :id="'name'"
        placeholder="Введите"
        class="w-full"
        type="text"
        :value="methodData.name"
        @change="(newVal) => (methodData.name = newVal)"
      />
    </div>
    <div class="flex-row">
      <label for="phone" class="text-gray-3 fs-14 fw-4"> Номер телефона </label>
    </div>
    <div class="flex-row">
      <d-input
        :id="'phone'"
        placeholder="Введите"
        :type="'tel'"
        class="w-full"
        :value="methodData.phone"
        @change="(newVal) => (methodData.phone = newVal)"
      />
    </div>
    <div class="flex flex-row items-center gap-2 mt-1">
      <span class="text-gray-3 fs-14 fw-4"> Aктивный  </span>
      <label class="switch">
        <input type="checkbox" v-model="methodData.is_active" @change="methodData.is_active"/>
        <span class="slider round"></span>
      </label>
    </div>
    <div class="flex-row">
      <label for="address" class="text-gray-3 fs-14 fw-4"> Адрес </label>
    </div>
    <div class="flex-row">
      <d-input
        :id="'address'"
        placeholder="Введите"
        type="text"
        class="w-full"
        :value="methodData.address"
        @change="(newVal) => (methodData.address = newVal)"
      />
    </div>

    <div class="flex flex-row mt-4 items-center justify-between w-full gap-2">
      <m-btn class="grow" @click="onSaveSupplier">
        {{ props.supplierId ? "Сохранить" : "Добавить" }}
      </m-btn>
    </div>
  </div>
</template>

<script setup>
// props
const props = defineProps({
  supplierId: String,
});

// emits
const emit = defineEmits(['closeDialog'])

// store
const suppliersStore = useSuppliersStore("main");

// state
const methodData = ref({
  name: "",
  phone: "",
  is_active: true,
  code: "",
});

// methods
onMounted(async () => {
  if (props.supplierId) {
    const data = await suppliersStore.getSupplierById(props.supplierId);
    methodData.value = data;
  }
});

const onSaveSupplier = async () => {
  if (props.supplierId) {
    await suppliersStore.onSaveSupplierById(props.supplierId, methodData.value);
  } else {
    await suppliersStore.onAddSupplier(methodData.value);
  }
  emit('closeDialog')
};
</script>
