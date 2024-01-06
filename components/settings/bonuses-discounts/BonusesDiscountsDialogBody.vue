<template>
  <div class="grid grid-cols-1 w-full gap-2">
    <div class="flex-row">
      <span class="text-gray-3 fs-14 fw-4">
        Агент
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
        Территория
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
      <m-btn class="grow">
        Добавить
      </m-btn>
      <div class="dropdown flex-none" id="toggle-1">
        <button class="px-2 py-1.5 fs-14 text-white bg-none"
                @click="toggleOpen = !toggleOpen">
          <IconInfoSVG/>
        </button>
        <div id="slide-1" class="flex dropdown-content px-4 mt-1.5 rounded-lg shadow-xl border-1 border-grey"
             :class="toggleOpen ? 'show': ''">
          bu qo'shgani faqat shu filialga tegishli bo'lishi, boshqa filialda ko'rinmasligi, umumiy ko'rinishi uchun controldan qo'shishini
        </div>
      </div>
      <div id="close-1"></div>
    </div>
  </div>
</template>

<script setup>

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
