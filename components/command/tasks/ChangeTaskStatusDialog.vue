<template>
  <div class="grid grid-cols-1 w-[380px] gap-2">
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4"> Комментарии </span>
    </div>
    <div class="flex-row">
      <textarea
        v-model="comment"
        placeholder="Введите"
        class="w-full border rounded-lg h-[100px] p-2"
      ></textarea>
    </div>

    <div class="grid grid-cols-2 mt-4 gap-4">
      <button
        class="py-2 rounded-lg bg-[#E1E4E4]"
        @click="tasksStore.closeChangeStatusDiaog"
      >
        Нет
      </button>
      <m-btn class="grow" @click="emit('onAcceptChangeStatus', comment)">
        Да
      </m-btn>
    </div>
  </div>
</template>

<script setup>
// store
const tasksStore = useTasksStore("main");

const emit = defineEmits(["onAcceptChangeStatus"]);

const comment = ref("");
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #ffffff;
  z-index: 1;
}

.dropdown-content a {
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.show {
  display: block;
}
.input-color-container {
  position: relative;
  overflow: hidden;
  width: 28px;
  height: 28px;
  border-radius: 8px;
}

.input-color {
  position: absolute;
  right: -8px;
  top: -8px;
  width: 56px;
  height: 56px;
  border: none;
}
textarea:active {
  border-color: var(--primary-color);
}

textarea:focus {
  outline: none !important;
  border: 1px solid var(--primary-color);
}
</style>
