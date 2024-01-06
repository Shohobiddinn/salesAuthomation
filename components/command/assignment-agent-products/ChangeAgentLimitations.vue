<template>
  <div class="rounded-lg bg-white border-grey px-[2px]">
    <div class="w-full overflow-auto">
      <data-table
        :headers="headers"
        :withInformationAboveHeader="true"
        :loading="!loadedData"
        :check="isAllTableChecked"
        @getAllId="getAllProductsId()"
      >
        <template #body>
          <template v-for="data in loadedData" :key="data.product_id">
            <c-tr class="border-b-none b-bottom cursor-pointer">
              <c-td-no-edit v-for="key in headers" :key="key">
                <div
                  class="mt-[10px] ml-[-3px] mb-[-10px] check"
                  v-if="key.key === 'checkbox'"
                >
                  <label>
                    <input
                      type="checkbox"
                      :id="data.product_id"
                      :checked="isTableChecked(data.product_id)"
                      @change="onSelectProduct(data)"
                    />
                    <span></span>
                  </label>
                </div>
                <label :for="data.product_id" class="py-2" v-if="key.checked">
                  {{ data[key.key] }}
                </label>
              </c-td-no-edit>
            </c-tr>
          </template>
        </template>
      </data-table>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex p-3 gap-2 items-center"></div>
      <div class="pb-3 pr-3">
        <button
          @click="onOpenChangeDialog"
          class="rounded-lg border-[#299B9B] py-1 px-12 border"
        >
          {{ isNew ? "Создать" : "Изменить" }}
        </button>
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="changeModal">
      <h-no-modal
        @closeDialog="changeModal = false"
        :dataContainerWidth="'1040px'"
      >
        <div class="relative w-full">
          <CommandAssignmentAgentProductsChangeModal @onSave="onSave" />
        </div>
      </h-no-modal>
    </div>
  </transition>
</template>

<script setup>
import { useNotification } from "@kyvg/vue3-notification";

// store
const assignmentProductsStore = useAssignmentProductsStore("main");
const route = useRoute();

// props
const props = defineProps({
  selectedWarehouseId: {
    type: String,
    required: true,
  },
  selectedCategoryId: {
    type: String,
    required: true,
  },
  selectedType: {
    type: Number,
    default: null,
  },
  isNew: Boolean,
});

// State
const isAllTableChecked = ref(false);
const changeModal = ref(false);

const loadedData = ref();
let headers = ref([
  {
    name: "",
    checked: true,
    key: "checkbox",
    type: "checkbox",
    thWidth: "40px",
  },
  {
    name: "Ассортимент",
    checked: true,
    key: "product_name",
    type: "diapazon",
    thWidth: "440px",
  },
  {
    name: "На складе",
    checked: true,
    key: "amount",
    type: "inWarehouse",
    thWidth: "140px",
  },
]);

// Methods
const getLoadedData = async () => {
  loadedData.value = await assignmentProductsStore.getLimitsProducts(
    props.selectedWarehouseId,
    props.selectedCategoryId
  );
};

const getAllProductsId = () => {
  isAllTableChecked.value = !isAllTableChecked.value;
  if (isAllTableChecked.value) {
    assignmentProductsStore.editMultipleDialog = loadedData.value?.map(
      (product) => product
    );
  } else {
    assignmentProductsStore.setNullMultipleDialog();
  }
};

const isTableChecked = (productId) => {
  return assignmentProductsStore.editMultipleDialog.find(
    (product) => product.product_id === productId
  );
};

const onSelectProduct = (product) => {
  if (!isTableChecked(product.product_id)) {
    assignmentProductsStore.editMultipleDialog.push(product);
  } else {
    assignmentProductsStore.editMultipleDialog =
      assignmentProductsStore.editMultipleDialog.filter(
        (products) => products.product_id !== product.product_id
      );
  }
};

const onOpenChangeDialog = () => {
  const { notify } = useNotification();
  if (!assignmentProductsStore.editMultipleDialog.length > 0) {
    notify({ title: "Сначала выберите ассортимент!", type: "error" });
    return;
  }
  if (props.isNew && !props.selectedType) {
    notify({ title: "Сначала выберите тип!", type: "error" });
    return;
  } else {
    changeModal.value = true;
  }
};

watchEffect(async () => {
  if (props.selectedCategoryId || props.selectedWarehouseId) {
    await getLoadedData();
  }
});

const onSave = async (productItems) => {
  const data = {
    agent_id: route.params.edit,
    warehouse_id: props.selectedWarehouseId,
    type: props.selectedType,
    items: productItems,
  };
  await assignmentProductsStore.onSave(data);
  changeModal.value = false;
};
</script>

<style scoped>
.down {
  display: none;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
.active-down {
  display: block;
  background-color: white;
}
.down:after {
  position: absolute;
  content: "";
  right: -11px;
  bottom: 20px;
  top: 20px;
  border-left: 15px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
.check label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
.check label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
.check [type="checkbox"]:checked + span:before {
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
.b-bottom:last-child {
  border-bottom: 1px solid #e1e4e4;
}
.b-top-none {
  border-top: none;
}
</style>
