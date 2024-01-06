<template>
  <NuxtLayout>
    <notifications />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup></script>

<style>
@import "assets/css/style.bundles.css";
/* width */
::-webkit-scrollbar {
  width: 0.1px;
  border-radius: 3px;
  height: 8px;
  margin: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #e1e4e4;
  border-radius: 8px;
  margin: 20px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #299b9b;
  margin: 20px;
  border-radius: 8px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #299b9b;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
