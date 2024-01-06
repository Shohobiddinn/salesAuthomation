<template>
  <div class="mt-3 w-full overflow-auto date-for">
    <DataTableCommon
      :headers="priceStore.templatesSettingNew"
      @selectFormat="selectFormat = $event"
      @getAllId="getAllAgentsId()"
    >
      <template #body>
        <c-tr
          v-for="data in priceStore.data?.items"
          :key="data"
          style="border-bottom: none"
        >
          <c-td-no-edit>
            <div class="pt-2 pb-2 flex">
              <label>
                <input
                  :checked="isTableChecked(data.id)"
                  @change="onSelectPrice(data.id)"
                  type="checkbox"
                />
                <span></span>
              </label>
              <div class="ml-3">{{ data.name }}</div>
            </div>
          </c-td-no-edit>
          <c-td-no-edit>
            <div class="pt-1 pb-1 flex justify-end">
              <div v-if="selectFormat === 'date'">
                <div class="flex-row relative">
                  <DInputDatePicker @change="(newDate) => (selectItemVal = newDate)" />
                </div>
              </div>
              <div v-else>
                <DInput
                  placeholder="Выбрать"
                  type="number"
                  :value="selectItemVal"
                  @change="selectItemVal = $event"
                  class="h-11 w-full"
                />
              </div>
            </div>
          </c-td-no-edit>
        </c-tr>
      </template>
    </DataTableCommon>
  </div>
  <div class="flex justify-end">
    <div class="flex flex-row mt-2 items-center justify-between gap-2">
      <m-btn class="grow"> Сохранить </m-btn>
    </div>
  </div>
</template>

<script setup>
// Store
const priceStore = usePriceStore("");

// State
let selectFormat = ref(null);
let selectItemVal = ref(null);
const isAllTableChecked = ref(false);

// Methods
const getAllAgentsId = () => {
  isAllTableChecked.value = !isAllTableChecked.value;
  if (isAllTableChecked.value) {
    priceStore.editMultipleDialog = priceStore.data?.items.map((agent) => agent.id);
  } else {
    priceStore.setNullMultipleDialog();
  }
};

const onSelectPrice = (priceId) => {
  if (!isTableChecked(priceId)) {
    priceStore.editMultipleDialog.push(priceId);
  } else {
    priceStore.editMultipleDialog = priceStore.editMultipleDialog.filter(
      (id) => id !== priceId
    );
  }
};

const isTableChecked = (priceId) => {
  return !!priceStore.editMultipleDialog.find((id) => priceId === id);
};

onMounted(() => {
  priceStore.getData(true);
});
</script>

<style scoped>
.date-for {
  border: 1px solid #e1e4e4;
  border-radius: 8px;
}

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
