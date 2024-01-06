<template>
  <div class="flex">
    <div class="">
      <div class="settingsSidebireContent settings-content-item">
        <div class="flex justify-center py-6 border-b">
          <search-input />
        </div>

        <div
          class="settings-sidebar"
          :class="{ activeColors: access.isActive && access.index === index }"
          v-for="(menu, index) in teamsMenu"
          :key="menu"
        >
          <div class="flex">
            <div><img src="~assets/ellipse.png" /></div>
            <div @click="accessF(index)" class="ml-4">
              <div class="fs-16 fw-6">{{ menu.name }}</div>
              <div class="fs-12">{{ menu.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="q-pa-md teams">
      <Access />
    </div>
  </div>
</template>

<script setup>
const teamsMenu = ref([
  {
    id: 1,
    name: "Eshonov Fakhriyor",
    role: "supervisors",
  },
  {
    id: 2,
    name: "Eshonov Fakhriyor",
    role: "supervisors",
  },
  {
    id: 3,
    name: "Eshonov Fakhriyor",
    role: "supervisors",
  },
])
const access = ref({
  isActive: true,
  index: 0,
})
const router = useRouter()
function accessF(index) {
  access.value.isActive = true
  access.value.index = index
}
</script>

<style scoped>
.teams {
  width: calc(100% - 280px);
}
.activeColors {
  position: relative;
  background: rgba(41, 155, 155, 0.05);
}

.activeColors:after {
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
