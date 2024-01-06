<template>
  <rounded-white-container>
    <div class="flex flex-row gap-2 items-center">
      <label class="-mb-2">
        <input @input="tableInput" v-model="_value" type='checkbox'>
        <span></span>
      </label>
      <span class="fs-16 fw-4 text-gray-3">
        Этапы выполнения задачи
      </span>
    </div>
    <div v-if="_value" class="flex w-full flex-row mt-4">
      <data-table-kpi :headers="headers" class="w-full"
                  @sort="sortData"
                      :detectR="detectR" :detectV="detectV"
                  :sorted="sortedData">
        <template #body>
          <c-tr v-for="(d,index) in loadedData" :key="d">
            <c-td-no-edit v-for="key in headers" :key="key">
              <div class="rounded-full p-3 w-2"
                   v-if="key.key === 'indicator'"
                   :style="{background: d[key.key]}">
              </div>
              <span v-if="key.key === 'step'">
                {{ d[key.key] }}
              </span>
              <div class="flex items-center  gap-2" v-if="key.key === 'completed'">
                <span>
                  От {{d.completed.from}}% - До
                </span>
                <div v-if="d.step !== 'Чемпион'" class="relative">
                  <percent-input :value="d.completed.to"/>
                  <button @click="decrement(index)" class="absolute z-50 right-2 top-4 increment" >
                    <fa-icon hash="&#xf078" />
                  </button>
                  <button @click="increment(index)" class="absolute decrement top-0 right-2 z-50" >
                    <fa-icon hash="&#xf077" />
                  </button>
                </div>

              </div>
              <div v-if="detectR">
                <div v-if="key.key === 'bonus'">
                  <percent-input :value="d.bonus" @change="e => d.bonus = e"/>
                </div>
              </div>
              <div v-if="detectV">
                <div v-if="key.key === 'share'">
                  <percent-input :value="d.kpi_share" @change="e => d.kpi_share = e"/>
                </div>
              </div>
            </c-td-no-edit>
          </c-tr>
        </template>
      </data-table-kpi>
    </div>
  </rounded-white-container>
</template>

<script setup>

const props = defineProps({
  data:Object,
  detectR:Boolean,
  detectV:Boolean,
  loadedData:Array,
  detectT:Boolean
})
const emit = defineEmits(['dataLoad','tableInput'])
function tableInput(){
  emit('tableInput')
}
// State
const headers = ref([
  {
    name: "Индикатор",
    key: "indicator",
    thWidth:"80px",
    checked:true,
  },
  {
    name: "Этапы выполнения задачи",
    key: "step",
    thWidth:"200px",
    checked:true,
  },
  {
    name: "Процент выполнение",
    key: "completed",
    thWidth:"auto",
    checked:true,
  },
  {
    name: "Бонус",
    key: "bonus",
    thWidth:"auto",
    checked:true,
  },
  {
    name: "Доля в KPI",
    key: "share",
    thWidth:"auto",
    checked:true,
  }
])
let sortedData = ref({key: '', mode: ''});

//to
function increment(index){
  props.loadedData[index].completed.to ++
  for(let i = index +1; i < props.loadedData.length; i++){
      if(props.loadedData[i].completed.to > props.loadedData[i -1].completed.to){
         props.loadedData[i].completed.from = props.loadedData[i -1].completed.to +1
      }
    if(props.loadedData[i].completed.to === props.loadedData[i -1].completed.to){
      props.loadedData[i].completed.to ++
      props.loadedData[i].completed.from = props.loadedData[i -1].completed.to +1
    }
  }
}
function decrement(index){
  if(props.loadedData[index].completed.to > props.loadedData[index].completed.from){
    props.loadedData[index].completed.to --
    props.loadedData[index +1].completed.from = props.loadedData[index].completed.to
  }
}
const _value = ref(props.detectT)
watch(
    () => props.detectT,
    (newValue) => {
      _value.value = newValue
    }
)
// Methods
function sortData(data) {
  sortedData.value = data
}
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
</style>
