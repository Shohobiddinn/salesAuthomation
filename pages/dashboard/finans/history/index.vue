<template>
  <div>
    <div class="flex gap-5">
      <button @click="$router.go(-1)" class="h-11 px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border">
        <div class="flex">
          <IconArrowLeft class="mt-[5px] mr-2.5"></IconArrowLeft>
          Назад
          <slot></slot>
        </div>
      </button>
      <div class="mt-7">История удалений</div>
    </div>
    <div class="text-[24px] mt-5">
      Мавлюда ва Абдуламинхон
    </div>
    <div class="mt-5">
      <DashboardFinansHistoryDataTable/>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>
