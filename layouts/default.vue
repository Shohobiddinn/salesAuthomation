<template>
  <div class=" flex flex-col flex-root">
    <div class="h-full w-full flex flex-row flex-column-fluid page">
      <Sidebar :isMenuOpen="collapse"></Sidebar>
      <div class="flex flex-col flex-row-fluid wrapper" id="kt_wrapper">
        <div class="overflow-y-auto w-full h-full">
          <Header v-if="active"></Header>
          <div ref="isActive" class="rout-content" :class="active ? 'header-available':'h-[100vh]'">
            <div class="content content-b h-full flex flex-col flex-column-fluid" id="kt_content">
              <div  class="flex flex-column-fluid">
                <div class="container">
                  <slot></slot>
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
// State
import {Sidebars} from "../variable/sidebar";
import {clientsPayment} from "~/stores/clients/clients/cleints-payment";
const {isActive} = clientsPayment
let look = ref(true)
let collapse = ref(false)
const { fullWindowLocations } = Sidebars();
let active = ref(true);
const route = useRoute()

// Methods
function isFullWindow(){
  const k = fullWindowLocations.filter(s => s === route.name.toString())
  if (k.length){
    active.value = false
    return
  }
  active.value = true
}

watch(
    () => route.name, () => {
      isFullWindow()
    }
)

onMounted(() => {

  isFullWindow()
})

</script>

<style scoped>
.rout-content{
  overflow-y: auto; background-color: #EAEAEA
}
.rout-content::-webkit-scrollbar{
  width: 6px;
}
.header-available{
  height: calc(100vh - 62px);
}
.content-b{
  padding: 0; position: relative;
}
.basic-container{
  width: 100%; height: 100%;
}
</style>
