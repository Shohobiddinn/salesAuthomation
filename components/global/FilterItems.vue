<template>
  <flex-col class="gap-2">
    <div class="flex justify-center items-center">
      <IconLoading :loading="!data?.items" :width="6" :height="6" />
    </div>
    <div v-if="data?.items?.length === 0">Нет данных</div>
    <flex-col v-else class="gap-1">
      <flex-row v-if="!singleSelect" class="items-center gap-2">
        <label class="-mb-1">
          <input type="checkbox" v-model="allSelected" @click="onAllSelect" />
          <span></span>
        </label>
        <label @click="onAllSelect" :class="allSelected ? 'text-primary' : ''">
          Выбрать все
        </label>
      </flex-row>
      <flex-row v-for="cargo in data?.items" :key="cargo">
        <flex-row v-if="!singleSelect" class="items-center gap-2">
          <label class="-mb-1">
            <input
              type="checkbox"
              v-model="cargo.selected"
              @change="onSelectItem(cargo.selected, cargo?.id, cargo?.name)"
              :id="cargo?.id"
            />
            <span></span>
          </label>
          <label
            v-if="cargo?.name"
            :for="cargo?.id"
            :class="cargo.selected ? 'text-primary' : ''"
          >
            {{ cargo?.name }}
          </label>
          <label
            v-else
            :for="cargo?.id"
            :class="cargo.selected ? 'text-primary' : ''"
          >
            {{ nameComputable("fio", cargo) }}
          </label>
        </flex-row>
        <flex-col
          v-else
          class="w-full p-1 hover:bg-[#299B9B] hover:text-white rounded-md"
          :class="selectedItems === cargo?.id && 'button-bg text-white'"
        >
          <div
            v-if="cargo?.name"
            @click="onSingleItemSelect(cargo?.id, cargo?.name)"
            class="cursor-pointer"
          >
            {{ cargo?.name }}
          </div>
          <div
            v-else
            @click="onSingleItemSelect(cargo?.id)"
            class="cursor-pointer"
          >
            {{ nameComputable("fio", cargo) }}
          </div>
        </flex-col>
      </flex-row>
      <input
        type="button"
        value="Загрузить ещё"
        :disabled="!data?.has_next_page"
        @click="$emit('onLoadElse')"
        class="disabled:opacity-45 disabled:cursor-not-allowed bg-blue-10 text-white rounded-lg py-2 cursor-pointer hover:bg-teal-600 active:bg-teal-700"
      />
    </flex-col>
  </flex-col>
</template>

<script setup>
import { variableData } from "~/variable/variable";

// Props
const props = defineProps({
  singleSelect: {
    type: Boolean,
    default: false,
  },
  data: Object,
  selectedItems: {
    type: [Array, String],
    validator: (value) => {
      return Array.isArray(value) || typeof value === "string";
    },
  },
  maxSelectionLimit: Number,
});

const emit = defineEmits(["onLoadElse", "onSelectItems", "onSingleItemSelect"]);

// State
const { isActive } = variableData;
const allSelected = ref(false);

// Methods
const onAllSelect = () => {
  props.data?.items?.forEach((d) => (d.selected = !allSelected.value));
  allSelected.value = !allSelected.value;
  if (allSelected.value) {
    emit(
      "onSelectItems",
      props.data?.items?.map((item) => item?.id),
      props.data?.items?.map((item) => item?.name)
    );
  } else {
    emit("onSelectItems", [], []);
  }
};
const ar = ref([]);
const onSelectItem = (isSelected, itemId, name) => {
  ar.value.push({ name: name, id: itemId });
  if (isSelected) {
    emit("onSelectItems", [...props.selectedItems, itemId], ar.value);
  } else {
    emit(
      "onSelectItems",
      props.selectedItems?.filter((id) => id !== itemId)
    );
  }
};

const onSingleItemSelect = (itemId, name) => {
  emit("onSingleItemSelect", itemId, name);
  isActive.value = false;
};

watchEffect(() => {
  if (!props.singleSelect && props.selectedItems?.length > 0) {
    props.selectedItems.forEach((id) => {
      const item = props.data?.items?.find((d) => d?.id === id);
      if (item) {
        item.selected = true;
      }
    });
  }
});

const nameComputable = (type, data) => {
  switch (type) {
    case "fio": {
      return `${data?.last_name ?? "-"} ${data?.first_name ?? "-"} ${
        data?.middle_name ?? "-"
      }`;
    }
    default: {
      return "Not found";
    }
  }
};

watchEffect(() => {
  if (props.maxSelectionLimit) {
    if (props.selectedItems?.length > props.maxSelectionLimit) {
      const selectedItems = props.selectedItems.slice(
        0,
        props.maxSelectionLimit
      );
      props.data?.items?.forEach((item) => {
        if (!selectedItems.includes(item?.id)) {
          item.selected = false;
        }
      });
      emit("onSelectItems", selectedItems);
    }
  }
});
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
