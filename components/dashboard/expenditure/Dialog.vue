<template>
  <div class="w-full">
    <form action="" @submit.prevent="save" class="grid grid-cols-1 w-full gap-4">
      <div class="mt-4">
        <div class="flex-row">
          <label class="fs-12">Название кассы <span class="text-red-3 fs-16">*</span></label>
        </div>
        <div class="flex-row">
          <d-input placeholder="Введите" class="w-full" type="text" :value="data.name" required
            @change="(value) => data.name = value" />
        </div>
      </div>
      <div class="flex-row mt-1 mb-4 ">
        <div class="flex-row ">
          <label class="fs-12">Выберите фонд <span class="text-red-3 fs-16">*</span></label>
        </div>
        <menu-btn class="w-100 relative " @click="onOpenDropdown($event, 'funds')">
          <template #btn>
            <m-btn-outlined class="border-grey bg-white flex items-center w-full gap-2">
              <fa-icon hash="&#xf078" />
              {{
                data.expense_category_id ? getSelectedName(data.expense_category_id, 'funds')
                : "Выбрать"
              }}
            </m-btn-outlined>
          </template>
          <template #content>
            <div>
              <FilterItems :data="funds" :singleSelect="true" @onSingleItemSelect="data.expense_category_id = $event"
                :selectedItems="data.expense_category_id" />

            </div>
          </template>
        </menu-btn>
        <small v-if="invalidCategoryId" class="text-red-3 mt-2">Фонд для обязательное
          поле</small>
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
const expandStore = useExpandature('');

// State
const isEdit = ref(false)
const data = ref({
  name: '',
  expense_category_id: '',
  is_active: true
})
const funds = ref({ items: null });
const invalidCategoryId = ref(false);


// Methods
const getSelectedName = (_roleId, key) => {
  if (funds.value && key === "funds") {
    invalidCategoryId.value = false;
    return funds.value.items.find((role) => role.id === _roleId)?.name;
  }
};

const onOpenDropdown = async (value, type) => {
  if (type === "funds" && !funds.value.items) {
    await getFunds();
  }
};

const getFunds = async () => {
  funds.value.items = expandStore.dataExpense
};

const save = async () => {
  if (!data.value.expense_category_id) {
    invalidCategoryId.value = true
    return
  }
  notify({ title: "Пожалуйста подождите!" });
  await expandStore.addCategory(data.value);
  notify({ title: "Сохранено!" })
  emit('closeModal')
}

// Hooks
onBeforeMount(async () => {
  if (value.value?.id) {
    isEdit.value = true
    funds.value.items = expandStore.dataExpense
    data.value = value.value;
  }
});
</script>
