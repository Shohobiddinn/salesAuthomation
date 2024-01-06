<template>
  <div class="grid grid-cols-1 w-full gap-2">
    <div class="flex-row mt-2">
      <span class="fs-14 fw-4 text-gray-3">
        Названия <span class="text-red-3 fs-14">*</span></span
      >
    </div>

    <form @submit.prevent="save" class="flex flex-col gap-3">
      <div class="flex-row">
        <d-input
          placeholder="Введите"
          class="w-full"
          type="text"
          :value="data.name"
          @change="(value) => (data.name = value)"
          required
        />
      </div>
      <div></div>

      <div class="flex flex-col gap-2">
        <div class="text-gray-3 fs-14 fw-4 whitespace-nowrap mt-3">
          Продаваемые категории <span class="text-red-3 fs-14">*</span>
        </div>
        <menu-btn class="relative z-47 w-100" @click="onOpenDropdown">
          <template #btn>
            <m-btn-outlined
              class="border-grey bg-white flex items-center w-full gap-2"
            >
              <div class="w-full flex items-center justify-between">
                <div class="flex gap-2">
                  <fa-icon hash="&#xf078" />
                  Выбрать
                </div>
                <div
                  v-if="productCategoryStore.data?.total_count"
                  class="flex gap-2"
                >
                  {{ selectedCategory.length }} из
                  {{ productCategoryStore.data.total_count }}
                </div>
              </div>
            </m-btn-outlined>
          </template>
          <template #content>
            <div class="h-auto overflow-auto w-68">
              <FilterItems
                :data="productCategoryStore.data"
                :selectedItems="selectedCategory"
                @onSelectItems="selectedCategory = $event"
                @onLoadElse="onLoadElseProductCategories"
              />
            </div>
          </template>
        </menu-btn>
      </div>
      <div
        class="flex flex-row mt-8 items-center justify-between w-full gap-2 w-100"
      >
        <m-btn class="grow">
          {{ dialogStore.singleData ? "Сохранить" : "Добавить" }}
        </m-btn>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { CategoryGroups } from "~/interfaces/api/category-groups";
import { notify } from "@kyvg/vue3-notification";

// Store
const productCategoryStore = useProductCategoryStore("true");
const dialogStore = useDialogStore("category_groups");
const productActiveStore = useCategoryGroupsStore(true);

const emit = defineEmits(['closeDialog'])

// State
const selectedCategory = ref([]);

const data: Ref<CategoryGroups> = ref({
  is_active: true,
  id: undefined,
  name: "",
  category_id_arr: [],
});

// Methods
const save = async () => {
  data.value.category_id_arr = selectedCategory.value;

  notify({ title: "Пожалуйста подождите!" });
  await productActiveStore.add(data.value);
  await productActiveStore.refresh();
  notify({ title: "Сохранено!" });
  dialogStore.closeDialog();
  emit('closeDialog')
};

onMounted(async () => {
  await productCategoryStore.getData(true);
  if (dialogStore.singleData !== null) {
    const { id, name, is_active, categories } = dialogStore.singleData;
    selectedCategory.value = categories?.map((category: object) => category.id);

    data.value = {
      id,
      name,
      is_active,
      category_id_arr: selectedCategory.value,
    };

    console.log(data.value);
  } else selectedCategory.value = [];
});

const onLoadElseProductCategories = () => {
  productCategoryStore.params.page_size += 10;
};
</script>
