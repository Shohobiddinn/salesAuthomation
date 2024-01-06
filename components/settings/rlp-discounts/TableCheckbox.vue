<template>
  <div class="checkbox-table" style="position:relative;">
    <i-btn>
      <IconRowSVG/>
    </i-btn>
    <div class="table-checkbox">
      <div class="flex p10">
            <span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.18934 2.875C4.18932 2.80079 4.1673 2.72827 4.12604 2.66659C4.08479 2.60491 4.02616 2.55686 3.95759 2.52852C3.88902 2.50017 3.81357 2.49281 3.74081 2.50735C3.66805 2.5219 3.60124 2.55771 3.54884 2.61025L1.71959 4.44025C1.57899 4.58089 1.5 4.77162 1.5 4.9705C1.5 5.16937 1.57899 5.3601 1.71959 5.50075L3.54884 7.33C3.60124 7.38253 3.66805 7.41834 3.74081 7.43289C3.81357 7.44744 3.88902 7.44007 3.95759 7.41173C4.02616 7.38338 4.08479 7.33533 4.12604 7.27365C4.1673 7.21198 4.18932 7.13945 4.18934 7.06525L4.18934 5.71975L13.1893 5.71975L13.1893 7.06525C13.1892 7.13951 13.2111 7.21214 13.2523 7.27394C13.2935 7.33573 13.3521 7.3839 13.4207 7.41233C13.4893 7.44077 13.5649 7.4482 13.6377 7.43367C13.7105 7.41915 13.7774 7.38333 13.8298 7.33075L15.6591 5.50075C15.7997 5.3601 15.8787 5.16937 15.8787 4.9705C15.8787 4.77162 15.7997 4.58089 15.6591 4.44025L13.8298 2.61025C13.7774 2.55771 13.7106 2.5219 13.6379 2.50735C13.5651 2.49281 13.4897 2.50017 13.4211 2.52851C13.3525 2.55686 13.2939 2.60491 13.2526 2.66659C13.2114 2.72827 13.1894 2.80079 13.1893 2.875L13.1893 4.21975L4.18934 4.21975L4.18934 2.875Z" fill="#8FA0A0"/>
                <path d="M12.5 12.5C12.5 13.3284 13.1716 14 14 14C14.8284 14 15.5 13.3284 15.5 12.5C15.5 11.6716 14.8284 11 14 11C13.1716 11 12.5 11.6716 12.5 12.5Z" fill="#8FA0A0"/>
                <path d="M7.24999 12.5C7.24999 13.3284 7.92156 14 8.74999 14C9.57841 14 10.25 13.3284 10.25 12.5C10.25 11.6716 9.57841 11 8.74999 11C7.92156 11 7.24999 11.6716 7.24999 12.5Z" fill="#8FA0A0"/>
                <path d="M2 12.5C2 13.3284 2.67157 14 3.5 14C4.32842 14 4.99999 13.3284 4.99999 12.5C4.99999 11.6716 4.32842 11 3.5 11C2.67157 11 2 11.6716 2 12.5Z" fill="#8FA0A0"/>
              </svg>
            </span>
        <span class="text-[14px] font-[400] leading-[19px] mt-[-4px] ml-[15px]">Стольбцы3/10</span>
      </div>
      <div v-for="item in headers" class="flex checkbox">
        <label>
          <input v-model="item.checked" type='checkbox'>
          <span></span>
        </label>
        <div class="checkbox-text">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  headers: Array
})
</script>

<style scoped>
.checkbox-text{
  margin-top: -2px; margin-left: 15px
}
.checkbox{
  padding: 0px 10px
}
.table-checkbox{
  position: absolute;
  display: none;
  top: 38px;
  padding: 5px;
}
.checkbox-table:hover .table-checkbox{
  display: block;
  background-color: white;
  z-index: 9999;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  border-radius: 8px;
}
label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #D2D7D7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
[type=checkbox]:checked + span:before {
  content: '\f106';
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all .4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299B9B;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.p10{
  padding: 10px;
}
.table-checkbox:after{
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  border-right: 15px solid red;
  border-bottom: 10px inherit;
  border-top: 10px inherit;
  z-index: 9999999999;
}
</style>
