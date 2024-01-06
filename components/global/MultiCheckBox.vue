<template>
  <div v-click-outside="clickOutside">
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        {{ name }}
      </span>
    </div>
    <div class="relative">
      <div>
        <div @click="dropdown.isOpen = !dropdown.isOpen"
             class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]">
          <div class="ml-4 mt-2">
            <IconArrowBottom/>
          </div>
          <div class="fs-14 text-gray ml-2">Выбрать</div>
        </div>
        <div v-if="dropdown.isOpen" class="absolute w-full pt-2 border top-[50px] z-50 rounded-lg bg-[#FAFDFD]">
          <div class="flex pl-3 border-b border-[#E1E4E4]">
            <div>
              <label>
                <input type='checkbox'>
                <span></span>
              </label>
            </div>
            <div class="fs-14 ml-2">Выбрать все</div>
          </div>
          <div class="h-[200px] overflow-auto mr-3">
            <div v-for="(value, index) in _values" class="flex pl-3 pt-2">
              <div>
                <label>
                  <input type='checkbox' @change="e => onChanged(e, index, value)" v-model="_values[index].isSelected">
                  <span></span>
                </label>
              </div>
              <div class="fs-14 ml-2">{{ value.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {PropType, Ref} from "vue";
import {MultiCheckboxModel} from "~/interfaces/ui/multi-checkbox-model";
import MultiCheckBox from "~/components/global/MultiCheckBox.vue";

const props = defineProps({
  values: {
    type: Object as PropType<Array<MultiCheckboxModel>>,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
});

const _values: Ref<Array<MultiCheckBox>> = ref([...props.values]);

const emit = defineEmits(['change']);

const dropdown = ref({
  isOpen: false,
});


const onChanged = (event: any, index: number, value: MultiCheckBox) => {
  emit('change', _values.value.filter(x => x.isSelected));
}
const clickOutside = () => {
  dropdown.value.isOpen = false;
}
</script>

<style scoped>

</style>