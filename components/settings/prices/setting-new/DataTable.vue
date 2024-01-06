<template>
  <div class="w-full min-h-[200px] overflow-auto border-grey rounded-lg">
    <data-table
      :headers="headers"
      :loading="isLoading"
      :isEmpty="!products?.length"
    >
      <template #body>
        <c-tr v-for="(data, index) in products" :key="data.id">
          <c-td v-for="key in headers" :key="key">
            <span v-if="key.key === 'no'">{{ ++index }}</span>
            <span v-if="key.key !== 'cost'">
              {{ data[key.key] }}
            </span>
            <div v-if="key.key === 'cost'" class="py-2">
              <d-input
                :value="data?.cost"
                @change="onChangePrice($event, data)"
                type="number"
                class="w-1/2"
              />
            </div>
          </c-td>
        </c-tr>
      </template>
    </data-table>
  </div>
</template>

<script setup>
const props = defineProps({
  products: Object,
  datas: Object,
  data: Object,
  isLoading: Boolean,
});

const emit = defineEmits(["onChangePrice"]);

const headers = ref([
  {
    name: "№",
    key: "no",
    checked: true,
  },
  {
    name: "Название",
    key: "product_name",
    checked: true,
  },
  {
    name: "Сумма",
    key: "cost",
    checked: true,
  },
]);
const pro = {
  product_id: null,
  cost: 0,
};
const draggable = ref(false);

function onChangePrice(newValue, product) {
  product.cost = newValue;
  const { cost, product_id } = product;
  emit("onChangePrice", { cost, product_id });
}
</script>

<style scoped>
.w-full {
  border-top: 0;
}
</style>
