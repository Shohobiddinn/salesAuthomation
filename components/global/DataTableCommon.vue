<template>
  <table class="w-full table-content">
    <thead>
      <tr class="mr-1.5 border-primary-gray header-row">
        <th v-for="header in headers" :key="header.name">
          <div
            class="flex gap-1 w-[200px] fs-14 fw-4"
            :style="{ width: header.thWidth }"
            v-if="header.key !== 'radio'"
          >
            <div class="secondary-gray-text flex">
              <label>
                <input @input="$emit('getAllId')" type="checkbox" />
                <span></span>
              </label>
              <div class="ml-3">{{ header.name }}</div>
            </div>
          </div>

          <div v-if="header.key === 'radio'" class="flex gap-1 fs-14 fw-4 justify-end">
            <div
              v-for="item in Format"
              :key="item.key"
              class="secondary-gray-text checkbox flex mr-3"
            >
              <input
                type="radio"
                :value="item.key"
                name="price"
                :checked="Format[0] === item"
                @change="selectFormat(item)"
                class="mr-1"
              />
              <span class="text-gray-3 fs-14 fw-4">
                {{ item.name }}
              </span>
            </div>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <slot name="body"></slot>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  headers: Array,
});
const emit = defineEmits(["selectFormat"]);

const Format = ref([
  {
    name: "День",
    key: "day",
  },
  {
    name: "Дата",
    key: "date",
  },
]);
let selectItem = ref({
  name: "Дата",
  key: "date",
});
const selectFormat = (item) => {
  selectItem.value = item;
  emit("selectFormat", item.key);
};
</script>

<style scoped>
td,
th {
  padding: 14px;
}
.fa-icon {
  color: #374957;
}
.header-row {
  background: #fafdfd;
}
.table-content {
  width: 100%;
  overflow-y: auto;
  position: relative;
}
.th-style {
  /*display: flex;*/
  justify-content: center;
  padding-right: 10px;
  position: sticky;
  right: 0px;
  top: auto;
  width: 50px;
  height: 49px;
  background: white;
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.04);
}
label input {
  display: none;
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

/* input[type="radio"]::before {
  content: "";
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #299b9b;
  border: 1px solid #cccccc;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
} */
input[type="radio"]:checked::before {
  transform: scale(1);
}
</style>
