<template>
  <div class="flex">
    <div class="">
      <div class="settingsSidebireContent settings-content-item">
        <nuxt-link
          :to="'/command/teams' + menu.url"
          class="settings-sidebar flex"
          :class="{
            activeColor: $route.path === '/command/teams/' + menu.nameEng,
          }"
          v-for="menu in teamsMenu"
          :key="menu"
        >
          {{ menu.name }}
        </nuxt-link>
      </div>
    </div>
    <div class="q-pa-md teams">
      <NuxtPage></NuxtPage>
    </div>
  </div>
</template>

<script setup>
const teamsMenu = ref([
  {
    id: 1,
    name: "1. Мерчандайзеры",
    nameEng: "auditors",
    url: "/auditors",
  },
  {
    id: 2,
    name: "2. Супервайзеры",
    nameEng: "supervisors",
    url: "/supervisors",
  },
  {
    id: 3,
    name: "3. Агенты",
    nameEng: "agents",
    url: "/agents",
  },
]);
</script>

<style scoped>
.teams {
  width: calc(100% - 280px);
}

.activeColor:after {
  position: absolute;
  content: "";
  right: 0;
  bottom: 0;
  border-radius: 8px;
  top: 0;
  border-right: 5px solid #299b9b;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}
</style>
