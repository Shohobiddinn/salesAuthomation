<template>
  <div>
    <div
      class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center mt-[44px]"
    >
      <div>
        <span class="text-lg font-semibold"> Рейтинг фото-отчётов </span>
      </div>
    </div>
    <RoundedWhiteContainer class="mb-9">
      <flex-flow>
        <AuditPhotoReportFilterCard />
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
        <AuditPhotoReportDataTable />
      </flex-flow>
    </div>

    <div
      class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
    >
      <div>
        <span class="text-lg font-semibold"> По пользователю </span>
      </div>
    </div>

    <flex-flow>
      <AuditPhotoReportUserDataTable class="mb-6" />
    </flex-flow>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped></style>
