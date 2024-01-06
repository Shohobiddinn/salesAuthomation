<template>
  <div>
    <div
      class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
    >
      <div>
        <span class="text-lg font-semibold"> Store Check </span>
      </div>
    </div>
    <RoundedWhiteContainer class="mb-9">
      <flex-flow>
        <AuditStoreCheckFilterCard />
      </flex-flow>
    </RoundedWhiteContainer>

    <div class="mb-9">
      <div
        class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
      >
        <div>
          <span class="text-lg font-semibold"> По клиентам </span>
        </div>
      </div>

      <flex-flow>
        <AuditStoreCheckDataTable />
      </flex-flow>
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped></style>
