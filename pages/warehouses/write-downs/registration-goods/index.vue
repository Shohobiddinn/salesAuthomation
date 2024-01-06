<template>
  <div class="flex">
    <div class="" >
      <div class="settingsSidebireContent settings-content-item">
        <div class="settings-sidebar"
             :class="{activeColor: $route.path === menu.url}"
             v-for="menu in teamsMenu"
             :key="menu">
          <div >
            {{ menu.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="q-pa-md teams" >
      <LazyWarehousesWriteDownsRegistrationTable/>
    </div>
  </div>
</template>

<script setup>
const teamsMenu = ref([
  {
    id: 1,
    name: "Dena",
    nameEng: "auditors",
    url: "/auditors",
  }
])

</script>

<style scoped>
.teams{
  width: calc(100% - 280px)
}

</style>
