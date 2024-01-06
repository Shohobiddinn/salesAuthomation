<template>
  <input class="my-input fa-solid placeholder: mainLoginInput p-2 border-primary-gray border-1 rounded-lg  "
         type="text"
         @input="event => emit('change', event.target.value)"
         placeholder="&#xf002 Поиск">
<!--        <span class="search-placeholder"></span>-->
</template>

<script setup lang="ts">
const emit = defineEmits(['change'])
</script>

<style scoped>
.my-input {
  transition: border 200ms ease-out;
}
/* .search-placeholder{*/
/*  position: relative;*/
/*  top:10%;*/
/*  left:-70%;*/
/*  color: #D2D7D7;*/
/*  font-family: 'Inter' !important;*/
/*  font-style: normal;*/
/*  font-weight: 400;*/
/*  font-size: 14px;*/
/*  line-height: 140%;*/
/*} */
.my-input:active {
  border-color: var(--primary-color);
}

.my-input:focus {
  outline: none !important;
  border: 1px solid var(--primary-color);
}

.mainLoginInput::-webkit-input-placeholder {
  font-family: FontAwesome, 'Inter', sans-serif;
  font-weight: normal;
  overflow: visible;
  vertical-align: top;
  display: inline-block !important;
}

.mainLoginInput::-moz-placeholder {
  font-family: FontAwesome, 'Inter', sans-serif;
  font-weight: normal;
  overflow: visible;
  vertical-align: top;
  display: inline-block !important;
}

.mainLoginInput:-ms-input-placeholder {
  font-family: FontAwesome, 'Inter', sans-serif;
  font-weight: normal;
  overflow: visible;
  vertical-align: top;
  display: inline-block !important;
}
</style>
