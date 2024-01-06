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
          to="/planning/plan-product/create"
          class="fw-6 fs-16 text-[#299B9B]"
        >
          Установить план по товарам
        </NuxtLink>
      </div>
    </div>

    <div class="mt-6">
      <PlanningPlanProductFilterCard />
    </div>

    <div class="mt-6">
      <PlanningPlanProductDiagram />
    </div>

    <div class="mt-8">
      <span class="text-[24px] font-semibold"> Выберите товар</span>
    </div>

    <div class="mt-4">
      <PlanningPlanProductDataTable />
    </div>
  </div>
</template>
