<template>
  <div class="flex flex-col gap-6">
    <div class="flex w-full">
      <button class="h-[30px] w-[30px] border rounded-lg p-2 mt-1">
        <IconArrowLefti />
      </button>
      <div class="text-[24px] font-[600] ml-4">Изменить</div>
    </div>
    <div class="flex items-center">
      <div>Рекомендации по ограничении</div>
      <div class="ml-4">
        <select disabled class="border py-3 rounded-large">
          <option value="3-weak">Ограничить исходя из истории 3 недель</option>
        </select>
      </div>
    </div>
    <div class="rounded-lg w-full bg-white border-grey px-[2px]">
      <div class="w-full overflow-auto">
        <data-table :headers="headers" :withInformationAboveHeader="true">
          <template #body>
            <template
              v-for="data in assignmentStore.editMultipleDialog"
              :key="data.product_id"
            >
              <c-tr class="cursor-pointer">
                <c-td-no-edit v-for="key in headers" :key="key">
                  <div v-if="key.key === 'quantitys'">
                    <d-input
                      class="w-[82px]"
                      type="number"
                      @blur="onAddAmount(data.product_id, $event)"
                      :required="true"
                      :disabled="!data.amount > 0"
                    />
                  </div>
                  <div
                    class="py-2"
                    v-if="key.checked && key.key !== 'quantitys'"
                  >
                    {{ data[key.key] }}
                  </div>
                </c-td-no-edit>
              </c-tr>
            </template>
          </template>
        </data-table>
      </div>
      <div class="w-full">
        <div class="w-full flex justify-end pb-3 pr-3">
          <m-btn :disabled="disableSaveBtn" class="w-1/5" @click="onSave">
            Сохранить
          </m-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// store
const assignmentStore = useAssignmentProductsStore("main");

const emit = defineEmits(["onSave"]);

const disableSaveBtn = ref(true);
const productItems = ref([]);
let headers = ref([
  {
    name: "Ассортимент",
    checked: true,
    key: "product_name",
    type: "diapazon",
  },
  {
    name: "На складе",
    checked: true,
    key: "amount",
    type: "inWarehouse",
  },
  {
    name: "Количество",
    checked: true,
    key: "quantitys",
    type: "quantitys",
  },
]);

const onAddAmount = (productId, productAmount) => {
  if (productAmount <= 0) {
    disableSaveBtn.value = true;
    return;
  }
  disableSaveBtn.value = false;
  const productIndex = productItems.value.findIndex(
    (item) => item.product_id === productId
  );
  if (productIndex !== -1) {
    productItems.value[productIndex] = {
      product_id: productId,
      amount: productAmount,
    };
  } else {
    productItems.value.push({ product_id: productId, amount: productAmount });
  }
};

const onSave = () => {
  if (disableSaveBtn.value) return;
  emit("onSave", productItems.value);
};
</script>

<style scoped>
label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
[type="checkbox"]:checked + span:before {
  content: "\f106";
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all 0.4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299b9b;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
