<template>
  <div
      :class="{ 'scrolled': !view.atTopOfPage }"
      class="fixed flex w-full bg-white border-b items-center justify-between flex-wrap p-5 m-auto top-0 animated">
    dfdfdfsdd
  </div>
</template>

<script setup>
let view = ref({
  atTopOfPage: true
})

onBeforeMount(()=>{
  window.addEventListener('scroll', handleScroll);
})
function handleScroll(){
  // when the user scrolls, check the pageYOffset
  if(window.pageYOffset > 0){
    // user is scrolled
    if(view.value.atTopOfPage) view.value.atTopOfPage = false
  }else{
    // user is at top of page
    if(!view.value.atTopOfPage) view.value.atTopOfPage = true
  }
}
// a beforeMount call to add a listener to the window



</script>

<style lang="scss" module>
div {
  z-index: 10
}

div.scrolled {
  @apply shadow-2xl;
  border-bottom: 0px;
}
</style>
