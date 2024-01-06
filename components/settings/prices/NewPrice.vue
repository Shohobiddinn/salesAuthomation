<template>
  <div class="grid grid-cols-1 w-full gap-2">
    <div class="w-full">
      <div class="secondary-gray-text fs-14 mt-3">Исходный тип цены</div>
      <menu-btn class="w-full mt-2">
        <template #btn>
          <m-btn-outlined
            class="border-primary-gray flex items-center w-full gap-2"
            @click="onOpenDropdown($event, 'priceTypes')"
          >
            <fa-icon hash="&#xf078" />
            {{
              selectedPriceType
                ? getSelectedName("priceTypes", selectedPriceType)
                : "Выбрать"
            }}
          </m-btn-outlined>
        </template>
        <template #content>
          <flex-col class="gap-2 max-h-88 overflow-auto">
            <FilterItems
              singleSelect
              :data="priceStore.data"
              :selectedItems="selectedPriceType"
              @onSingleItemSelect="selectedPriceType = $event"
              @onLoadElse="onLoadElsePriceTypes"
            />
          </flex-col>
        </template>
      </menu-btn>
    </div>

    <div class="w-full">
      <div class="secondary-gray-text fs-14 mt-3">Категории продуктов</div>
      <menu-btn
        class="w-full mt-2"
        @click="onOpenDropdown($event, 'productCategories')"
      >
        <template #btn>
          <m-btn-outlined
            class="border-primary-gray flex огыешан-иуецуут items-center w-full gap-2"
          >
            <div class="flex gap-2 items-center">
              <fa-icon hash="&#xf078" />
              Выбрать
            </div>
            <div v-if="productCategories?.total_count">
              {{selectedProductCategories.length}} из {{productCategories.total_count}}
            </div>
          </m-btn-outlined>
        </template>
        <template #content>
          <flex-col class="gap-2 max-h-88 overflow-auto">
            <FilterItems
              :data="productCategories"
              :selectedItems="selectedProductCategories"
              @onSelectItems="selectedProductCategories = $event"
              @onLoadElse="onLoadElseProductCategories"
            />
          </flex-col>
        </template>
      </menu-btn>
    </div>

    <div class="w-full">
      <div class="secondary-gray-text fs-14 mt-3">Метод</div>
      <menu-btn
        class="w-full mt-2"
      >
        <template #btn>
          <m-btn-outlined
            class="border-primary-gray flex items-center w-full gap-2"
          >
            <fa-icon hash="&#xf078" />
            {{
              selectedPriceMethods
                ? getSelectedName("priceMethods", selectedPriceMethods)
                : "Выбрать"
            }}
          </m-btn-outlined>
        </template>
        <template #content>
          <flex-col class="gap-2 max-h-88 overflow-auto">
            <FilterItems
              singleSelect
              :data="priceMethods"
              :selectedItems="selectedPriceMethods"
              @onSingleItemSelect="selectedPriceMethods = $event"
            />
          </flex-col>
        </template>
      </menu-btn>
    </div>

    <div class="flex-row">
      <span class="fs-14 text-gray-3"> {{ selectedPriceMethods === 2 ? 'Курс' : 'Процент (%)'}} </span>
    </div>
    <div class="flex-row">
      <d-input
        placeholder="Введите"
        class="w-full"
        type="number"
        :value="rate"
        @change="newVal => rate = newVal"
      />
    </div>

    <div class="w-full">
      <div class="secondary-gray-text fs-14 mt-3">Метод округления</div>
      <menu-btn class="w-full mt-2">
        <template #btn>
          <m-btn-outlined
            class="border-primary-gray flex items-center w-full gap-2"
          >
            <fa-icon hash="&#xf078" />
            {{
              `${selectedRoundingMethods}`
                ? getSelectedName("roundingMethods", selectedRoundingMethods)
                : "Выбрать"
            }}
          </m-btn-outlined>
        </template>
        <template #content>
          <flex-col class="gap-2 max-h-88 overflow-auto">
            <FilterItems
              singleSelect
              :data="roundingMethods"
              :selectedItems="selectedRoundingMethods"
              @onSingleItemSelect="selectedRoundingMethods = $event"
            />
          </flex-col>
        </template>
      </menu-btn>
    </div>

    <div class="w-full">
      <div class="secondary-gray-text fs-14 mt-3">Точность округления</div>
      <menu-btn class="w-full mt-2">
        <template #btn>
          <m-btn-outlined
            class="border-primary-gray flex items-center w-full gap-2"
          >
            <fa-icon hash="&#xf078" />
            {{
              `${selectedRoundingAccuraccies}`
                ? getSelectedName(
                    "roundingAccuraccies",
                    selectedRoundingAccuraccies
                  )
                : "Выбрать"
            }}
          </m-btn-outlined>
        </template>
        <template #content>
          <flex-col class="gap-2 max-h-88 overflow-auto">
            <FilterItems
              singleSelect
              :data="roundingAccuraccies"
              :selectedItems="selectedRoundingAccuraccies"
              @onSingleItemSelect="selectedRoundingAccuraccies = $event"
            />
          </flex-col>
        </template>
      </menu-btn>
    </div>

    <div class="flex-row py-4 px-8">
      <span class="fs-14 text-gray-3">
        Новая цена = ИСХОДНАЯ ЦЕНА х (100 + Надбавка) / 100
      </span>
    </div>
    <div class="flex flex-row mt-2 items-center justify-between w-full gap-2">
      <m-btn :disabled="!selectedPriceType || !rate" class="grow" @click="onSave"> Добавить </m-btn>
    </div>
  </div>
</template>

<script setup>
// Store
const priceStore = usePriceStore("true");

// emits
const emit = defineEmits(['closeDialog'])

// State
const libraryConstants = ref(null);

const productCategories = ref(null);
const selectedProductCategories = ref([]);
const productCategoriesParams = ref({
  page: 1,
  page_size: 10,
  search: "",
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: "is_active",
      value: ["true"],
    },
  ],
});

const selectedPriceType = ref("");

const selectedPriceMethods = ref("");

const rate = ref()

const selectedRoundingMethods = ref("");

const roundingAccuraccies = ref({
  items: [
    {
      id: 100,
      name: "100",
    },
    {
      id: 10,
      name: "10",
    },
    {
      id: 0,
      name: "0",
    },
    {
      id: 0.1,
      name: "0.1",
    },
    {
      id: 0.01,
      name: "0.01",
    },
  ],
});
const selectedRoundingAccuraccies = ref(0.01);

// Hooks
onMounted(async () => {
  libraryConstants.value = await priceStore.getLibraryConstants();
});

const priceMethods = computed(() => {
  if (libraryConstants.value) {
    const { SetPriceMethod } = libraryConstants.value;
    selectedPriceMethods.value = SetPriceMethod[0]?.id
    return { items: [...SetPriceMethod] };
  }
  return [];
});

const roundingMethods = computed(() => {
  if (libraryConstants.value) {
    const { MidpointRounding } = libraryConstants.value;
    selectedRoundingMethods.value = MidpointRounding[0]?.id
    return { items: [...MidpointRounding] };
  }
  return [];
});

// methods
const onOpenDropdown = async (value, state) => {
  if (state === "productCategories" && !productCategories.value) {
    await getProductCategories();
  }
  if (state === "priceTypes" && !priceStore.data) {
    await priceStore.getData();
  }
};

const getSelectedName = (state, selectedId) => {
  if (state === "priceTypes" && priceStore.data) {
    return priceStore.data.items?.find((item) => item?.id === selectedId)
      ?.name;
  }
  if (state === "priceMethods" && priceMethods.value) {
    return priceMethods.value.items.find((item) => item?.id === selectedId)
      ?.name;
  }
  if (state === "roundingMethods" && roundingMethods.value) {
    return roundingMethods.value.items.find(
      (item) => item?.id.toString() === selectedId.toString()
    )?.name;
  }
  if (state === "roundingAccuraccies" && roundingAccuraccies.value) {
    return roundingAccuraccies.value.items.find(
      (item) => item?.id === selectedId
    )?.name;
  }
  return "Выбрать";
};

const getProductCategories = async () => {
  productCategories.value = await priceStore.getProductCategories(
    productCategoriesParams.value
  );
};

const onLoadElseProductCategories = async () => {
  productCategoriesParams.value.page_size += 10;
  await getProductCategories();
};

const onLoadElsePriceTypes = async () => {
  priceStore.params.page_size += 10;
};

const onSave = async () => {
  const data = {
    price_type_id: selectedPriceType.value,
    product_category_id_arr: selectedProductCategories.value,
    set_price_method: selectedPriceMethods.value,
    rate: rate.value,
    midpoint_rounding: selectedRoundingMethods.value,
    rounding_accuracy: selectedRoundingAccuraccies.value
  }

  await priceStore.setMarginPrice(data)
  emit('closeDialog')
}
</script>
