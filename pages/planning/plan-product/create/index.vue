<template>
  <div>
    <div class="flex justify-between items-center mt-[29px]">
      <div>
        <span class="text-[24px] font-semibold">
          Установка плана по товарам
        </span>
      </div>

      <div>
        <NuxtLink
          to="/planning/plan-product/"
          class="fw-6 fs-16 text-[#299B9B]"
        >
          Посмотреть таблицу
        </NuxtLink>
      </div>
    </div>

    <div class="mt-4">
      <PlanningPlanProductFilterCard />
    </div>

    <div class="mt-4">
      <PlanningPlanProductCreateDataTable />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
