<template>
  <div class="flex" ref="content">
    <div class="settingsSidebireContent" v-if="active">
      <div class="settings-content-item">
        <nuxt-link @click="navigate(menu.url)"  class="settings-sidebar flex"
             :class="{activeColor: $route.name === 'settings-' + menu.nameEng}"
             v-for="menu in settingsMenu"
             :key="menu">
          {{ menu.name }}
        </nuxt-link>
      </div>
    </div>
    <div class="q-pa-md " :class="[active ? 'table-container':'']">
      <NuxtPage></NuxtPage>
    </div>
  </div>
</template>
<script setup>
import { Sidebars } from "~/variable/sidebar";
import {clientsPayment} from "~/stores/clients/clients/cleints-payment";

const { settingsMenu } = Sidebars();
const { fullWindowLocations } = Sidebars();
let active = ref(true);
let route = useRoute()
const router = useRouter()
const {isActive} = clientsPayment
function isFullWindow(){
  const k = fullWindowLocations.filter(s => s === route.name.toString())
  if (k.length){
    active.value = false
    return
  }
  active.value = true
}
function navigate(url) {
  router.push('/settings' + url)
  isActive.value.scrollTop = 0
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
watch(() => route.name, () => {
      isFullWindow()
})
const isMounted = ref(false)
onMounted(() => {
  isFullWindow()
  isMounted.value = true
  console.log('isMounted.value',isMounted.value)
})
</script>
<style scoped>
.activeColor:after{
  position: absolute;
  content: '';
  right: 0;
  bottom: 0;
  border-radius: 8px;
  top: 0;
  border-right: 5px solid #299B9B;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}
.content {
  height: 100vh;
}
</style>
