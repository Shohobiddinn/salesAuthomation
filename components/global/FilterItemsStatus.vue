<template>
  <flex-col class="gap-2">
    <div class="flex justify-center items-center">
      <IconLoading :loading="!data" :width="6" :height="6" />
    </div>
    <flex-row class="items-center gap-2">
      <label class="-mb-1">
        <input type="checkbox" v-model="allSelected" @click="onAllSelect" />
        <span></span>
      </label>
      <label @click="onAllSelect" :class="allSelected ? 'text-primary' : ''">
        Выбрать все
      </label>
    </flex-row>
    <flex-row class="items-center gap-2" v-for="cargo in data" :key="cargo">
      <label class="-mb-1">
        <input
          type="checkbox"
          v-model="cargo.selected"
          @change="onSelectItem(cargo.selected, cargo.id)"
          :id="cargo.id"
        />
        <span></span>
      </label>
      <label
        v-if="cargo.name"
        :for="cargo.id"
        :class="cargo.selected ? 'text-primary' : ''"
      >
        {{ cargo.name }}
      </label>
      <label
        v-else
        :for="cargo.id"
        :class="cargo.selected ? 'text-primary' : ''"
      >
        {{ nameComputable("fio", cargo) }}
      </label>
    </flex-row>
    <m-btn
      class="disabled:opacity-45 disabled:cursor-not-allowed"
      :disabled="!data?.has_next_page"
      @click="$emit('onLoadElse')"
      >Загрузить ещё</m-btn
    >
  </flex-col>
</template>

<script setup>
// Props
const props = defineProps({
  data: Object,
  selectedItems: Array,
});

const emit = defineEmits(["onLoadElse", "onSelectItems"]);

// State
const allSelected = ref(false);

// Methods

const onAllSelect = () => {
  props.data?.forEach((d) => (d.selected = !allSelected.value));
  allSelected.value = !allSelected.value;
  if (allSelected.value) {
    emit(
      "onSelectItems",
      props.data?.map((item) => item.id)
    );
  } else {
    emit("onSelectItems", []);
  }
};

const onSelectItem = (isSelected, itemId) => {
  if (isSelected) {
    emit("onSelectItems", [...props.selectedItems, itemId]);
  } else {
    emit(
      "onSelectItems",
      props.selectedItems.filter((id) => id !== itemId)
    );
  }
};

onMounted(() => {
  if (props.selectedItems?.length > 0) {
    props.selectedItems.forEach((id) => {
      const item = props.data?.find((d) => d.id === id);
      if (item) {
        item.selected = true;
      }
    });
  }
});

const nameComputable = (type, data) => {
  switch (type) {
    case "fio": {
      return `${data.last_name ?? "-"} ${data.first_name ?? "-"} ${
        data.middle_name ?? "-"
      }`;
    }
    default: {
      return "Not found";
    }
  }
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
