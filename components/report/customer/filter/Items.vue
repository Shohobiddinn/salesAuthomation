<template>
  <flex-col class="gap-2">
    <flex-row class="items-center gap-2">
      <label class="-mb-1">
        <input type="checkbox"
               @click="selectAll"
               v-model="allSelected">
        <span></span>
      </label>
      <button @click="selectAll"
              :class="allSelected ? 'text-primary':''">
        Выбрать все
      </button>
    </flex-row>
    <flex-row class="items-center gap-2"
              v-for="(cargo, index) in data">
      <label class="-mb-1">
        <input type="checkbox"
               v-model="cargo.selected">
        <span></span>
      </label>
      <button @click="$emit('selected', index)"
              :class="cargo.selected ? 'text-primary':''">
        {{ cargo.name }}
      </button>
    </flex-row>
  </flex-col>
</template>

<script setup>
// Props
const props = defineProps({
  data: Array,
});

// State
const allSelected = ref(false)

// Methods
function selectAll(){
  props.data.forEach(d => d.selected = !allSelected.value)
  allSelected.value = !allSelected.value
}
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
  border: 1px solid #D2D7D7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
[type=checkbox]:checked + span:before {
  content: '\f106';
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all .4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299B9B;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
