<template>
  <div>
    <div class="flex flex-row my-6">
      <button @click="$router.push('/command/kpi-install')"
              class="border-1 rounded-lg bg-white hover:bg-gray-50 active:bg-gray-200 py-2 px-6 whitespace-nowrap flex gap-2 items-center border-primary-gray">
        <IconBackArrowSVG/> Назад
      </button>
    </div>
    <form id="app" class="w-full" @submit="save">
      <rounded-white-container>

        <div class="flex flex-row my-3">
          <p-title>
            Установка
          </p-title>
        </div>
        <div class="grid grid-cols-5 gap-4 mt-4">
          <d-select
              :required="true"
              title="Месяц"
              :value="data.month"
              @change="(value) => (data.month = value)"
          >
            <option v-for="i in month" :value="i.key">
              {{ i.name }}
            </option>
          </d-select>
          <!--        <div>-->
          <!--          <i-title>-->
          <!--            Месяц-->
          <!--          </i-title>-->
          <!--          <div class="flex-row">-->
          <!--            <select v-model="data.month" class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">-->
          <!--              <option disabled value="">Выбрать</option>-->
          <!--              <option v-for="i in month" :value="i.key">{{i.name}}</option>-->
          <!--            </select>-->
          <!--          </div>-->
          <!--        </div>-->
          <div>
            <i-title>
              Год
            </i-title>
            <div class="flex-row">
              <select v-model="data.year" class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
                <option disabled value="">Выбрать</option>
                <option :value="year.currentYear">{{year.currentYear}}</option>
                <option :value="year.nextYear">{{year.nextYear}}</option>
              </select>
            </div>
          </div>
          <div>
            <i-title>
              Группировка
            </i-title>
            <div class="flex-row">
              <select v-model="data.group" class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
                <option disabled value="">Выбрать</option>
                <option v-for="i in groupList" :value="i.task_id">{{i.name}}</option>
              </select>
            </div>
          </div>
          <div>
            <i-title>
              Роль
            </i-title>
            <div class="flex-row">
              <select v-model="data.role" class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
                <option disabled value="">Выбрать</option>
                <option v-for="i in kpiSettingsStore.role" :value="i.id">{{i.name}}</option>
              </select>
            </div>
          </div>
          <m-btn type="submit" class="self-end">
            Применить
          </m-btn>
        </div>
      </rounded-white-container>
    </form>
    <loading-modal v-if="loading"
                   name="Управление меню таблицы">
      <Loading/>
    </loading-modal>
  </div>

</template>

<script setup>
import {useKpiGroupStore} from "~/stores/command/kpi-group-templates/kpi-group-templates.store";
import {useKpiSettingsStore} from "~/stores/command/kpi-settings/kpi-settings.store";

const kpiSettingsStore = useKpiSettingsStore('')
const router = useRouter()
let loading = ref(false)

// State
const data = ref({
  year:null,
  month:null,
  role:null,
  group:null
})
const date = new Date()
const month = ref([
  {
    key:1,
    name:'Январь'
  },
  {
    key:2,
    name:'Февраль'
  },
  {
    key:3,
    name:'Март'
  },
  {
    key:4,
    name:'Апрель'
  },
  {
    key:5,
    name:'Май'
  },
  {
    key:6,
    name:'Июнь'
  },
  {
    key:7,
    name:'Июль'
  },
  {
    key:8,
    name:'Август'
  },
  {
    key:9,
    name:'Сентябрь'
  },
  {
    key:10,
    name:'Октябрь'
  },
  {
    key:11,
    name:'Ноябрь'
  },
  {
    key:12,
    name:'Декабрь'
  }
])
const year = ref({
  currentYear: null,
  nextYear:null
})
const save = async (e) =>{
  e.preventDefault()
  try {
    loading.value = true
    await kpiSettingsStore.getSettings(data.value)
  }catch (error){

  }finally {
    loading.value = false
    router.push({path:'/command/kpi-install/install/result', query:{month:data.value.month, year:data.value.year}})
  }
}

const groupList = ref(null)
onMounted(async ()=>{
  year.value.currentYear = date.getFullYear()
  year.value.nextYear = year.value.currentYear + 1
  data.value.month = date.getMonth()
  data.value.year = year.value.currentYear
  groupList.value = await kpiSettingsStore.getGroupSettings()
  await kpiSettingsStore.getDataRole()
})
</script>

<style scoped>

</style>
