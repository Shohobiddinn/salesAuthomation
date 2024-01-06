<template>
  <div class="relative">
    <div class="fs-12 my-2">{{name}}</div>
    <div class="cursor-pointer">
      <div @click="$emit('toggle', !filter)" class="w-full relative flex pt-2 h-[42px] border rounded-lg bg-[#FAFDFD]">
        <div class="ml-4 mt-2">
          <IconArrowBottom/>
        </div>
        <div class="fs-14 text-gray ml-2">Выбрать</div>
      </div>
      <div v-if="filter" class="absolute w-full border top-[85px] z-50 rounded-lg bg-[#FAFDFD]">
        <div class="flex w-full p-3 border-b border-[#E1E4E4]">
          <search-input class="w-full"/>
        </div>
        <div class="flex pl-3 ">
          <div>
            <label>
              <input type='checkbox'>
              <span></span>
            </label>
          </div>
          <div class="fs-14 ml-2">Select all</div>
        </div>
        <div class="h-50 overflow-auto mr-3">
          <div v-for="(item, index) in data.data?.items" @click="selectData(item.id, index)" class="flex pl-3 pt-2">
            <div>
              <label>
                <input :checked="selected_id.find(i => i[field_name] === item.id)" type='checkbox'>
                <span></span>
              </label>
            </div>
            <div class="fs-14 ml-2">{{ item.first_name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  filter: Boolean,
  name:{
    type: String,
    default:'yes'
  },
  data:{
    type:Array,
    default: false
  },
  selected_id:{
    type:Array,
    required:true
  },
  field_name:{
    type:String,
    required:true
  }
})
const checkProduct = ref(false)
const selectData = (id:any, index:any) =>{
  console.log('props.selected_id',props.selected_id)
  console.log('index',index)
  console.log('id',id)
  if(props.selected_id.find((i:any) => i[props.field_name] === id)){
    props.selected_id?.splice(index, 1)
    checkProduct.value = false
  }else {
    const data = {} as any
    data[props.field_name] = id
    props.selected_id.push(data)
    checkProduct.value = true
  }
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
