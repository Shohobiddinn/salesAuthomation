<template>
  <button class="h-[44px] px-[46px] bg-[#FFFFFF] text-black rounded-lg border">
    <nuxt-link :to="link">
      <div class="flex">
        <ArrowLeft class="mt-[5px] mr-[10px]"></ArrowLeft>
          Назад
        <slot></slot>
      </div>
    </nuxt-link>
  </button>
</template>
<script setup>
const props = defineProps({
  link: String
})
import ArrowLeft from "~/components/icon/ArrowLeft.vue";
</script>

<style scoped>

</style>
