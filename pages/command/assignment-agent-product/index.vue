<template>
  <div>
    <div
      class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center mt-6"
    >
      <div>
        <span class="text-lg font-semibold">
          Распределения товара по агентам
        </span>
      </div>
      <div class="flex gap-4 justify-self-end">
        <nuxt-link to="/command/assignment-agent-product/movement-agents">
          <button
            class="border-[#299B9B] border rounded-lg py-2 fs-14 px-6 bg-white"
          >
            Текущий статус лимита
          </button>
        </nuxt-link>
      </div>
    </div>
    <div>
      <CommandAssignmentAgentProductsActiveData />
    </div>
  </div>
</template>

<script setup>
const dataContainerWidth = ref("1140px");
</script>

<style scoped></style>
