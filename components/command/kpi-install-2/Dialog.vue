<template>
  <div class="block w-full">
    <div
        class="bg-white overflow-y-scroll w-full mt-4 border-primary-gray -mt-[1px] scroll"
        :style="{ height: height - 41 + 'px' }"
    >
      <div v-for="i in kpiStore.kpiActiveData?.items" @click="selectedProducts(i.id, i.name)" class="flex mt-4 pb-3 pl-3 cursor-pointer border-b-[1px]">
        <div>
          <label>
            <input :checked="tasks?.find(it => it.id === i.id)" type="checkbox" />
            <span></span>
          </label>
        </div>
        <div class="fs-14 ml-2">{{ i.name }}</div>
      </div>
    </div>
    <div class="flex flex-row mt-6 items-center justify-between w-full gap-2">
      <m-btn class="grow" @click="save">
        Добавить
      </m-btn>
    </div>
  </div>

</template>

<script setup>

const props = defineProps({
  tasks:Array
})
const emit = defineEmits(['deTasks'])
const kpiStore = useKpiTemplateStore('')
const dialogStore = useDialogStore('kpi-agents')

const productsStore = useProductsStore('')
const usersParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "id",
    is_asc: true,
  },
});
const tasks = ref([])
function selectedProducts(id, name){
  if(tasks.value.includes(id)){
    var index = tasks.value.findIndex(i => i.id === id)
    tasks.value.splice(index, 1)
  }else {
    tasks.value.push({id:id, name:name})
  }
}
function save(){
  props.tasks = tasks.value
  emit('deTasks',tasks.value)
  dialogStore.closeDialog()
}
const products = ref(null)
// Methods
function yourMethod() {}
onMounted(async ()=>{
  await productsStore.getData(true)
  await kpiStore.getTemplateActive()
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
.scroll {
}
.scroll::-webkit-scrollbar {
  margin-right: 5px;
  width: 8px;
}

/* .scroll::-webkit-scrollbar-track {
  //border-radius: 10px;
}

.scroll::-webkit-scrollbar-thumb {
  //border-radius: 10px;
} */
</style>
