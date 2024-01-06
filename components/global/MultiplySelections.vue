<template>
  <div class="relative cursor-pointer">
    <div >
      <div @click="onToggle" :class="h ? 'h-11' : '32px'" class="w-full relative flex items-center p-3 border rounded-lg bg-[#FAFDFD]">
        <div class="flex justify-between w-full">
          <div class="flex items-center gap-4 ml-2">
            <fa-icon hash="&#xf078" />
            <div class="fs-14 text-gray-3">
              {{name}}
            </div>
          </div>
          <div class="fs-12 text-gray mr-2">{{subtitle}}</div>
        </div>
      </div>
      <div v-if="filter" class="absolute w-full pt-2 border top-[50px] z-50 rounded-lg bg-[#FAFDFD]">
        <div class="flex pl-3 border-b border-[#E1E4E4]">
          <div>
            <label>
              <input type='checkbox'>
              <span></span>
            </label>
          </div>
          <div class="fs-14 ml-2 text-gray-3">Выбрать все</div>
        </div>
        <div class="h-[200px] overflow-auto mr-3">
          <div v-for="item in data?.items" :key="item.id" class="flex pl-3 pt-2">
            <div>
              <label>
                <input :id="item.id" :checked="selectedIds.includes(item.id)" @change="selectData(item.id)" type='checkbox'>
                <span></span>
              </label>
            </div>
            <label :for="item.id" class="fs-14 ml-2">{{ item[showBy] }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  filter: Boolean,
  h: Boolean,
  name: {
    type: String,
    default: "Выбрать",
  },
  subtitle: {
    type: String,
    default: "",
  },
  data: {
    type: Object,
    default: {},
  },
  showBy: String,
  borderless: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle", "onChangeSelectedIds"]);

const onToggle = () => {
  emit("toggle", !props.filter);
};

const selectedIds = ref([]);
const selectData = (id: any) => {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter((agentId) => agentId !== id);
    emit("onChangeSelectedIds", selectedIds.value);
    return;
  } else {
    selectedIds.value.push(id);
    emit("onChangeSelectedIds", selectedIds.value);
    return;
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

