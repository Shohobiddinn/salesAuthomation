<template>
  <div
    class="rounded-lg flex justify-center items-center py-[27px] cursor-pointer relative"
  >
    <div class="flex gap-5">
      <div class="flex justify-center items-center">
        <div v-if="icon === 'check'" class="bg-[#E2EBE1] rounded-[50%] p-4">
          <IconCheckGreen />
        </div>
        <div v-if="icon === 'puls'" class="bg-[#EDBFBF] rounded-[50%] p-4">
          <IconPuls />
        </div>
        <div v-if="icon === 'calendar'" class="bg-[#DEE8EA] rounded-[50%] p-4">
          <IconCalendar />
        </div>
        <div v-if="icon === 'hourGlass'" class="bg-[#DEE8EA] rounded-[50%] p-4">
          <IconHourGlass />
        </div>
      </div>
      <div class="flex flex-col">
        <div class="font-seimbold text-black text-2xl">{{ amount }}</div>
        <div class="fs-12 text-[#89A385]">{{ text }}</div>
      </div>
      <div
        v-if="edit === 'edit'"
        class="absolute right-[13px] top-[14px] bg-[#000] rounded-[8px] p-[6px]"
      >
        <IconEditW />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//imports
import { withDefaults } from "vue";

export interface ITopTabs {
  amount?: number | string;
  icon?: string;
  text?: string;
  edit?: string;
}

withDefaults(defineProps<ITopTabs>(), {
  amount: "",
  icon: "",
  text: "",
  edit: "",
});

// const props = defineProps({
//   amount: Number,
//   icon: String,
//   text: String,
// });
</script>

<style></style>
