<template>
  <div>
    <div>
      <ul id="items-list" class="move">
        <li
          class="move-item"
          v-for="(item, index) in _templates"
          :key="index"
          draggable="true"
          @dragstart="dragStart($event, index)"
          @drop="dropped($event, index)"
          @dragover="cancelDefault"
          @dragenter="cancelDefault"
        >
          <div class="flex">
            <span class="mt-2 ml-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20 12C20 11.5678 19.6534 11.2174 19.2258 11.2174H4.77419C4.34662 11.2174 4 11.5678 4 12C4 12.4322 4.34662 12.7826 4.77419 12.7826H19.2258C19.6534 12.7826 20 12.4322 20 12Z"
                  fill="#8FA0A0"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20 6.78261C20 6.35039 19.6534 6 19.2258 6H4.77419C4.34662 6 4 6.35039 4 6.78261C4 7.21483 4.34662 7.56522 4.77419 7.56522H19.2258C19.6534 7.56522 20 7.21483 20 6.78261Z"
                  fill="#8FA0A0"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20 17.2174C20 16.7852 19.6534 16.4348 19.2258 16.4348H4.77419C4.34662 16.4348 4 16.7852 4 17.2174C4 17.6496 4.34662 18 4.77419 18H19.2258C19.6534 18 20 17.6496 20 17.2174Z"
                  fill="#8FA0A0"
                />
              </svg>
            </span>
            <span class="ml-2 mt-2 text-black">{{ item.name }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="flex flex-row mt-6 items-center justify-between w-full gap-2">
      <m-btn @click="save" class="grow"> Сохранить </m-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Template } from "~/interfaces/ui/template";
import { PropType } from "vue";
import { notify } from "@kyvg/vue3-notification";

const props = defineProps({
  templates: {
    required: true,
    type: Object as PropType<Template[]>,
  },
});

const _templates = ref(props.templates?.slice());

const emit = defineEmits(["change", "closeDialog"]);

function dragStart(e: any, index: any) {
  e.dataTransfer.setData("text/plain", index);
}

function dropped(e: any, index: any) {
  cancelDefault(e);
  // get new and old index
  let oldIndex = e.dataTransfer.getData("text/plain");
  let element = _templates.value.splice(oldIndex, 1)[0];
  _templates.value.splice(index, 0, element);
}

const save = () => {
  emit("change", _templates.value);
  emit("closeDialog", false);
  notify({ title: "Сохранено!" });
};

function cancelDefault(e: any) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}
</script>

<style scoped>
</style>
