<template>
  <div>
    <div class="flex flex-row my-6">
      <button @click="$router.push('/command/kpi-install')"
              class="border-1 rounded-lg bg-white hover:bg-gray-50 active:bg-gray-200 py-2 px-6 whitespace-nowrap flex gap-2 items-center border-primary-gray">
        <IconBackArrowSVG/> Назад
      </button>
    </div>
    <div class="flex">
      <p-title>
        Создание целевой задачи
      </p-title>
    </div>
    <div class="flex flex-row mt-4 w-full">
      <rounded-white-container>
        <div class="flex flex-row gap-4">
          <div class="w-full">
            <i-title>
              Задача{{data.name}}
            </i-title>
            <d-input placeholder="Введите"
                     class="w-full"
                     type="text"
                     :value="data.name"
                     @change="(value) => data.name = value"
            />
          </div>
          <div class="w-full">
            <i-title>
              Выберите тип задачи
            </i-title>
            <div class="flex-row">
              <select v-model="data.type" class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
                <option disabled value="">Выбрать</option>
                <option v-for="item in kpiType" :value="item.id">{{item.name}}</option>
              </select>
            </div>
          </div>
          <div class="w-full">
            <i-title>
              Комментарии
            </i-title>
            <d-input placeholder="Введите"
                     class="w-full"
                     type="text"
                     :value="data.comment" @change="(v) => data.comment = v"/>
          </div>
        </div>
      </rounded-white-container>
    </div>
    <div class="flex flex-row gap-4 mt-4">
      <div class="w-full" ref="criteria">
        <CommandKpiInstallTasksCriteria :data="data"/>
      </div>
      <div class="w-full" v-if="cHeight">
        <CommandKpiInstallTasksProducts :height="cHeight" :data="data"/>
      </div>

    </div>
    <div class="flex gap-4">
      <div class="flex flex-row mt-4 w-full">
        <rounded-white-container>
          <div class="flex flex-row gap-4 items-center w-full">
            <label class="-mb-2">
              <input @change="detectRR" v-model="detectR" type='checkbox'>
              <span></span>
            </label>
            <span class="text-gray-3">
            Вознаграждение
          </span>
            <div v-if="detectR" class="flex gap-4 ml-2">
              <i-title>
                Тип
              </i-title>
              <div class="flex-row min-w-[180px]">
                <select v-model="data.reward_type" class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
                  <option value="">Выбрать</option>
                  <option v-for="item in kpiRewardType" :value="item.id">{{item.name}}</option>
                </select>
              </div>
            </div>
            <percent-input :value="data.reward" @change="e => data.reward = e"/>
          </div>
        </rounded-white-container>
      </div>
      <div class="flex flex-row mt-4 w-full">
        <rounded-white-container>
          <div class="flex flex-row gap-4 items-center w-full">
            <label class="-mb-2">
              <input @change="detectCh" v-model="detectV" type='checkbox'>
              <span></span>
            </label>
            <span class="text-gray-3">
            Вознаграждение
          </span>
            <percent-input v-if="detectV" class="" :value="data.share_in_total_kpi" @change="e => data.share_in_total_kpi = e"/>
          </div>
        </rounded-white-container>
      </div>
    </div>
    <div class="flex flex-row mt-4">
      <CommandKpiInstallTasksSteps :loadedData="loadedData" :detect="detectT"  @tableInput="tableInput" :data="data" :detectR="detectR" :detectV="detectV"/>
    </div>
    <div class="mt-4 flex justify-end">
      <m-btn @click="save">Создать</m-btn>
    </div>
  </div>

</template>

<script setup lang="ts">
//State

import {useFilterListStore} from "~/stores/list-for-filter/list.store";
import {KpiTemplate} from "~/interfaces/api/kpi-templete";
import {Ref} from "vue";
import {notify} from "@kyvg/vue3-notification";
import {useKpiTemplateStore} from "~/stores/command/kpi-templete/kpi-templete.store";

let route = useRoute()
const kpiStore = useKpiTemplateStore('')
let yourState = ref('')
let criteria = ref(null)
let cHeight = ref(0)
const data:Ref<KpiTemplate> = ref({
  products:[],
  price_types:[],
  segments:[],
  items:[],
  currencies:[],
  territories:[],
  order_statuses:[]
})
const loadedData = ref([
  {
    indicator: "#D10505",
    step: "Минимальный порог",
    completed: {
      to:50,
      from:0
    },
    bonus: 0,
    kpi_share: 100,
  },
  {
    indicator: "#013636",
    step: "Неудовлетворительно",
    completed: {
      to:60,
      from:51
    },
    bonus: 100,
    kpi_share: 100,
  },
  {
    indicator: "#BD7F06",
    step: "Удовлетворительно",
    completed: {
      to:70,
      from:61
    },
    bonus: 100,
    kpi_share: 100,
  },
  {
    indicator: "#057CD1",
    step: "Хорошо",
    completed: {
      to:80,
      from:71
    },
    bonus: 100,
    kpi_share: 100,
  },
  {
    indicator: "#23C00A",
    step: "Отлично",
    completed: {
      to:90,
      from:81
    },
    bonus: 100,
    kpi_share: 100,
  },
  {
    indicator: "#299B9B",
    step: "Супер",
    completed: {
      to:100,
      from:91
    },
    bonus: 100,
    kpi_share: 100,
  },
  {
    indicator: "linear-gradient(180deg, #057CD1 0%, #23C00A 100%)",
    step: "Чемпион",
    completed: {
      to:90,
      from:100
    },
    bonus: 100,
    kpi_share: 100,
  },
])
const usersParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "id",
    is_asc: true,
  },
});
let detectV = ref(false)
let detectR = ref(false)
let detectT = ref(false)
function tableInput(){
  if (detectT.value === false){
    detectT.value = true
    data.value.items = data.value.items.sort((a,b) => a.from - b.from)
    for (let i = 0; i < data.value.items.length; i++){
      loadedData.value[i].completed.to = data.value.items[i].to
      loadedData.value[i].completed.from = data.value.items[i].from
      loadedData.value[i].bonus = data.value.items[i].bonus
      loadedData.value[i].kpi_share = data.value.items[i].kpi_share
    }
  }else {
    detectT.value = false
  }
  detectT.value = !detectT.value
  console.log('wwwwwwwwwwwwwwwwwwwwwww1')
}
function detectCh(e:any){
  if (detectV.value === false){
    detectV.value = true
  }else {
    detectV.value = false
  }
  detectV.value = !detectV.value
  console.log('detectV.value',detectV.value)
}
function detectRR(e:any){
  if (detectR.value === false){
    detectR.value = true
  }else {
    detectR.value = false
  }
  detectR.value = !detectR.value
}
const filterStore = useFilterListStore('')

// Methods
function yourMethod(k:any){
  console.log(k)
}
const kpiType = ref(null)
const kpiRewardType = ref(null)

const save = async () => {
  data.value.items = []
  for(let i = 0; i< loadedData.value.length;i++){
    if (detectR.value){
      data.value.items.push({to: loadedData.value[i].completed.to, from:loadedData.value[i].completed.from, bonus:loadedData.value[i].bonus})
    }else if(detectV.value){
      data.value.items.push({to: loadedData.value[i].completed.to, from:loadedData.value[i].completed.from, kpi_share:loadedData.value[i].kpi_share})
    }else if(detectV.value && detectR.value){
      data.value.items.push({to: loadedData.value[i].completed.to, from:loadedData.value[i].completed.from, bonus:loadedData.value[i].bonus, kpi_share:loadedData.value[i].kpi_share})
    }else {
      data.value.items.push({to: loadedData.value[i].completed.to, from:loadedData.value[i].completed.from})
    }
  }
  if (detectR.value === false){
    data.value.items
  }
  notify({title: "Пожалуйста подождите!"});

  await kpiStore.add(data.value);

  notify({title: "Сохранено!"})
}
onMounted(async () => {
  cHeight.value = criteria.value.clientHeight
  kpiType.value = await filterStore.getKpiType()
  kpiRewardType.value = await filterStore.getKpiRewardType()
  if (!!route.query.id){
    data.value = await kpiStore.getKpiId(route.query.id)
    // loadedData.value = loadedData.value.sort((a,b) => a.completed.from - b.completed.from)
  }
})
</script>

<style scoped>
label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
[type="checkbox"]:checked + span:before {
  content: "\f106";
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all 0.4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299b9b;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
