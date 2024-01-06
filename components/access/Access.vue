<template>
  <div class="rounded-lg bg-white">
    <div class="">
      <div class="flex justify-between w-full px-4 pt-8">
        <page-title20 :title="'Доступ пользователя'" />
        <div class="w-[50%]"><search-input class="w-full" /></div>
      </div>
      <div class="flex justify-between w-full px-4 py-4">
        <div class="border rounded-lg">
          <button
            v-for="(item, index) in role"
            @click="selectAccess(index)"
            class="h-10 access w-28"
            :class="
              status.isActive && status.index === index
                ? 'bg-blue-20 text-white'
                : ''
            "
          >
            {{ item.name }}
          </button>
        </div>
        <button
          v-show="status.isRole"
          @click="isRole = true"
          class="px-8 py-2 border hover:bg-blue-200 hover:shadow-2xl border-blue-20 fs-14 rounded-lg"
        >
          Прикрепить роль
        </button>
        <button
          v-show="status.isOperation"
          @click="isOperation = true"
          class="px-8 py-2 border hover:bg-blue-200 hover:shadow-2xl border-blue-20 fs-14 rounded-lg"
        >
          Прикрепить Операции
        </button>
      </div>
      <div v-show="status.isRole" class="mt-4">
        <AccessDataTable />
      </div>
      <div v-show="status.isOperation" class="mt-4">
        <AccessOperationTable />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="isRole">
      <h-no-modal
        :dataContainerWidth="'1146px'"
        @closeDialog="closeRole"
        :name="'Конфигурации: ТП андрей'"
      >
        <div class="relative w-full">
          <AccessDialogRole />
        </div>
      </h-no-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="isOperation">
      <h-no-modal
        :dataContainerWidth="'1146px'"
        @closeDialog="closeOperation"
        :name="'Конфигурации: ТП андрей'"
      >
        <div class="relative w-full">
          <AccessDialogOperation />
        </div>
      </h-no-modal>
    </div>
  </transition>
</template>

<script setup>
const role = ref([
  {
    name: "Роли",
  },
  {
    name: "Операции",
  },
]);
const status = ref({
  isRole: true,
  isOperation: false,
  isActive: true,
  index: 0,
});
const isRole = ref(false);
function closeRole() {
  isRole.value = false;
}
const isOperation = ref(false);
function closeOperation() {
  isOperation.value = false;
}
function selectAccess(index) {
  status.value.isActive = true;
  status.value.index = index;
  status.value.isRole = !status.value.isRole;
  status.value.isOperation = !status.value.isOperation;
}
</script>

<style scoped>
.access:first-child {
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
}
.access:last-child {
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
}
</style>
