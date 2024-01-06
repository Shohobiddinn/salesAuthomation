<template>
  <div style="padding: 0; position: relative;" class="content flex flex-col flex-column-fluid" id="kt_content">
    <div  class="flex flex-column-fluid">
      <div class="container" >
        <div class="rounded-lg w-full flex">
          <div class="settingsSidebireContent">
            <div class="settings-content-item">
              <div class="settings-sidebar" :class="{activeColor: active === item.name}" v-for="item in menu_array" :key="item">
                <div @click="active = item.name;" >
                  {{item.name}}
<!--                  <NuxtLink to="/company-profile">companyyyyyyyyyyyyyyyyyyyyy</NuxtLink>-->
                </div>
              </div>
            </div>
          </div>
          <div class="q-pa-md flex table-container" >
            <slot></slot>adsdsasdsda
            <NuxtPage></NuxtPage>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import {ref} from 'vue'
import {Sidebars} from "@/variable/sidebar";

export default {
  setup(){
    const {menu_array} = Sidebars()
    let active = ref(false)
    return{
      menu_array,
      active
    }
  }
}


</script>
<style scoped>

</style>
