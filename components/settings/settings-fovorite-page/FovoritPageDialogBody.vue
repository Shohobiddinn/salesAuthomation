<template>
  <form id="app" class="w-full" @submit="save">
    <div class="grid grid-cols-1 w-full gap-2">
      <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
             Модуль
          </span>
      </div>
      <div class="flex-row">
        <select class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
          <option value="">Выбрать</option>
          <option value="">hello</option>
          <option value="">hello</option>
          <option value="">hello</option>
        </select>
      </div>
      <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
             Страница
          </span>
      </div>
      <div class="flex-row">
        <select class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
          <option value="">Выбрать</option>
          <option value="">hello</option>
          <option value="">hello</option>
          <option value="">hello</option>
        </select>
      </div>
      <div class="flex-row">
        <d-input placeholder="Введите"
                 class="w-full"
                 type="text"
                 title="Название"
                 :required="true"
                 :value="methodData.name"
                 @updated="setName"/>
      </div>
      <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Сортировка
      </span>
      </div>
      <span>&#xf001</span>
      <div class="flex-row">
        <d-input placeholder=" Введите "
                 type="text"
                 class="w-full"
                 :value="methodData.title"
                 @updated="setTitle"/>
      </div>
      <div class="flex mt-2">
      <span class="text-gray-3 fs-14 fw-4 mt-2">
        Выбрать иконку
      </span>
        <div v-if="iconName !== []" @click="handleChange" class="flex justify-center h-[38px] w-[38px] border rounded-lg bg-[#FAFDFD] pt-2 ml-[10px]"><IconPlus></IconPlus></div>
        <div  class="fa-solid font-awesome p-[1px] pl-[8px]" v-for="item in iconName">
          <span class="text-[24px]" v-html="item"></span>
        </div>
      </div>
      <div class="flex mt-2">
      <span class="text-gray-3 fs-14 fw-4 mt-2">
        Выбрать цвет
      </span>
      </div>
      <div class="grid grid-cols-10 gap-2">
        <div class="h-[28px] w-[28px] bg-red rounded-[50%]"></div>
        <div class="h-[28px] w-[28px] bg-[#299B9B] rounded-[50%]"></div>
        <div class="h-[28px] w-[28px] bg-[#057CD1] rounded-[50%]"></div>
        <div class="h-[28px] w-[28px] bg-[#23C00A] rounded-[50%]"></div>
        <div class="h-[28px] w-[28px] bg-[#336666] rounded-[50%]"></div>
        <div class="h-[28px] w-[28px] bg-[#BD7F06] rounded-[50%]"></div>
        <div class="h-[28px] w-[28px] bg-[#424F4F] rounded-[50%]"></div>
        <div class="h-[28px] w-[28px] bg-[#000000] rounded-[50%]"></div>
        <div class="h-[28px] w-[28px] bg-[#C100A2] rounded-[50%]"></div>
      </div>
      <div class="flex flex-row items-center gap-2 mt-1">
      <span class="text-gray-3 fs-14 fw-4">
        Aктивный 
      </span>
        <label class="switch">
          <input v-model="methodData.active" type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
      <div class="flex flex-row mt-2 items-center justify-between w-full gap-2">
        <m-btn type="submit" class="grow">
          Добавить
        </m-btn>

      </div>
    </div>

  </form>

</template>

<script setup>
const props = defineProps({
  iconName: Array
})
const emit =defineEmits([
  'iconE'
])
const icon = ref({
  icon:false
})
const handleChange = () =>{
  emit('iconE', icon.value)
}
// State
import {onMounted, ref} from "vue";

let toggleOpen = ref(false)
let methodData = ref({
  name: "",
  code: "",
  title: "",
  active: true
})

// Methods
function setName(name) {
  methodData.value.name = name
}

function setCode(code) {
  methodData.value.code = code
}

function setTitle(title) {
  methodData.value.title = title
}

function clicked() {
  toggleOpen.value = false
  document.removeEventListener('click', function emp(e) {
  })
}
function save(){

}
onMounted(() => {
  const open = ref(document.getElementById("toggle-1"));
  const slide = ref(document.getElementById("slide-1"));
  const close = ref(document.getElementById("close-1"));
  document.addEventListener('click', function clickeds(e) {
    if (!slide.value.contains(e.target) && !open.value.contains(e.target) || close.value.contains(e.target)) {
      clicked()
    }
  });
})
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #ffffff;
  z-index: 1;
}

.dropdown-content a {
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.show {
  display: block;
}
</style>
