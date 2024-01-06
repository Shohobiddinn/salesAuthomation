<template>
  <div class="content content-pos flex flex-col flex-column-fluid " id="kt_content">
    <div  class="flex flex-column-fluid ">
      <div class="container" >
        <slot></slot>
      </div>
    </div>
  </div>

</template>

<script setup>
import {AppRoutes} from "~/variable/routes";
await navigateTo('/dashboard/supervayzer')
</script>

<style scoped>
.content-pos{
  padding: 0; position: relative;
}
</style>
