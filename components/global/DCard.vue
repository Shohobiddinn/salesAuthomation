<template>
  <rounded-white-container id="data-card" class="data-container">
    <div>
      <div class="rounded-t-large border-b-1px -mx-4 px-4 pb-4 flex items-center data-header">
        <slot name="header"></slot>
      </div>
      <div class="flex pb-4 px-4 pt-2">
        <slot name="body"></slot>
      </div>
    </div>
  </rounded-white-container>
</template>

<script setup>
</script>

<style scoped>
.data-header {
  background-color: #FAFDFD;
}

</style>
