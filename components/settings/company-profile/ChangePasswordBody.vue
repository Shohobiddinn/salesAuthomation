<template>
  <div class="w-full">
    <div class="flex flex-row mb-2">
      <span class="text-gray-3 fs-12 fw-4">
        Логин
      </span>
    </div>
    <div class="flex flex-row gap-4">
      <d-input :placeholder="'Введите'"
               class="w-full"
               type="text"
               :value="data.login"
               @change="e => data.login = e" />
    </div>
    <div class="flex flex-row my-2">
      <span class="text-gray-3 fs-12 fw-4">
        Пароль
      </span>
    </div>
    <div class="flex flex-row gap-4">
      <d-input :placeholder="'***********'"
               class="w-full"
               type="password"
               :value="data.password"
               @change="e => data.password = e" />
    </div>
    <div class="flex flex-row mt-4 items-center">
      <m-btn @click="save" class="w-11/12">
        Сохранить
      </m-btn>
      <div class="dropdown flex-none" id="toggle-6">
        <button class="px-2 py-1.5 fs-14 text-white bg-none"
                @click="toggleOpen = !toggleOpen">
          <IconInfoSVG/>
        </button>
        <div id="slide-6" class="flex dropdown-content px-4 mt-1.5 rounded-lg shadow-xl border-1 border-grey"
             :class="toggleOpen ? 'show': ''">
          bu qo'shgani faqat shu filialga tegishli bo'lishi, boshqa filialda ko'rinmasligi, umumiy ko'rinishi
          uchun controldan qo'shishini
        </div>
      </div>
      <div id="close-6"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// State
import { onMounted, ref, Ref } from "vue";
import {CompanyPassword} from "~/interfaces/api/company_profile";
let toggleOpen = ref(false)
const data: Ref<CompanyPassword> = ref({

})
const dialogStore = useDialogStore("change_password");
const companyProfile = useCompany_profileStore()
// Methods
async function save(){
  await companyProfile.addChangePassword(data.value)

  dialogStore.closeDialog()
}
function clicked() {
  toggleOpen.value = false
  document.removeEventListener('click', function emp(e) {
  })
}
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
