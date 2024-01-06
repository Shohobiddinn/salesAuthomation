<template>
  <div class="mx-3 mt-2 drag">
    <svg style="cursor: pointer" @click="centerDialogVisible = true" width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="37" height="38" rx="8" fill="#299B9B"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M26.7672 11.1456C25.147 10.6573 23.3898 10.6573 21.7697 11.1456C21.2213 16.7023 21.2213 22.2976 21.7697 27.8544C23.3898 28.3427 25.147 28.3427 26.7672 27.8544C27.3155 22.2976 27.3155 16.7023 26.7672 11.1456ZM28.568 10.8508C29.144 16.6032 29.144 22.3968 28.568 28.1492C28.5046 28.7833 28.0598 29.3162 27.4455 29.511C25.3894 30.163 23.1474 30.163 21.0913 29.511C20.477 29.3162 20.0322 28.7833 19.9688 28.1492C19.3928 22.3968 19.3928 16.6032 19.9688 10.8508C20.0322 10.2167 20.477 9.68374 21.0913 9.48899C23.1474 8.837 25.3894 8.837 27.4455 9.48899C28.0598 9.68374 28.5046 10.2167 28.568 10.8508Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2303 11.1456C13.6102 10.6573 11.8529 10.6573 10.2328 11.1456C9.68454 16.7023 9.68454 22.2976 10.2328 27.8544C11.8529 28.3427 13.6102 28.3427 15.2303 27.8544C15.7786 22.2976 15.7786 16.7023 15.2303 11.1456ZM17.0312 10.8508C17.6072 16.6032 17.6072 22.3968 17.0312 28.1492C16.9678 28.7833 16.5229 29.3162 15.9087 29.511C13.8526 30.163 11.6105 30.163 9.55445 29.511C8.94024 29.3162 8.49542 28.7833 8.43193 28.1492C7.85602 22.3968 7.85602 16.6032 8.43193 10.8508C8.49542 10.2167 8.94024 9.68374 9.55445 9.48899C11.6105 8.837 13.8526 8.837 15.9087 9.48899C16.5229 9.68374 16.9678 10.2167 17.0312 10.8508Z" fill="white"/>
    </svg>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: "DragAndDrop",
  data() {
    return {

      centerDialogVisible: false,
    };
  },
  setup(){
    const arr1 = ref([
      {one:'item1'},
      {one:'item2'},
      {one:'item3'},
      {one:'item4'},
      {one:'item4'}
    ])
    function dragStart (e, index) {
      e.dataTransfer.setData('text/plain', index)
    }
    function dropped (e, index) {
      cancelDefault(e)
      // get new and old index
      let oldIndex = e.dataTransfer.getData('text/plain')
      let element = arr1.value.splice(oldIndex, 1)[0]
      arr1.value.splice(index, 0, element)
      console.log(element , 'element')
    }

    function cancelDefault (e) {
      e.preventDefault()
      e.stopPropagation()
      return false
    }
    return{
      dragStart,
      dropped,
      cancelDefault,
      arr1
    }
  },
};
</script>
<style >

</style>
