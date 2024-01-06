<template>
  <div class="flex flex-col flex-root">
    <div class="h-full w-full flex flex-row flex-column-fluid page">
      <Sidebar></Sidebar>
      <div   class="flex flex-col flex-row-fluid wrapper" id="kt_wrapper">
        <div  class="h-full w-full">
          <div :ref="isActive" class="rout-content">
            <div class="content content-b flex flex-col flex-column-fluid" id="kt_content">
              <div  class="flex flex-column-fluid">
                <div class="container basic-container" >
                  <NuxtPage></NuxtPage>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {clientsPayment} from "~/stores/clients/clients/cleints-payment";
const {isActive} = clientsPayment
definePageMeta({
  layout: 'LayoutSidebar'
})
</script>

<style scoped>
.rout-content{
  height: 100vh; background-color: #EAEAEA
}
.content-b{
  padding: 0; position: relative;
}
.basic-container{
  width: 100%; height: 100%;
}
</style>

