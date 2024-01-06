<template>
  <menu-btn>
    <template #btn>
      <m-btn-outlined
          class="border-grey flex items-center w-full gap-2 bg-white">
        <fa-icon hash="&#xf078" />
        Выбрать
      </m-btn-outlined>
    </template>
    <template #content>
      <flex-col class="gap-2 z-[99999999999]">
        <search-input />
        <flex-col class="gap-2 ">
          <flex-row class="items-center gap-2">
            <label class="-mb-1">
              <input type="checkbox"
                     @click="selectAll"
                     :checked="selected_id?.length === data?.length">
              <span></span>
            </label>
            <button @click="selectAll"
                    :class="selected_id?.length === data?.length ? 'text-primary':''">
              Выбрать все
            </button>
          </flex-row>
          <flex-row class="items-center gap-2 "
                    v-for="(cargo, index) in data" :key="cargo">
            <label class="-mb-1">
              <input v-if="selected_id" type="checkbox"
                     :checked="selected_id.includes(cargo.key)"
              >
              <span></span>                </label>
            <button @click="selected(cargo.key, index)"
                    :class="[selected_id && selected_id.includes(cargo.key) ? 'text-primary':'']">
              <span>{{ cargo.name }}</span>
            </button>
          </flex-row>
        </flex-col>
      </flex-col>
    </template>
  </menu-btn>
</template>
<script setup>
// Props
const emit = defineEmits(['clear', 'selectAll'])
const props = defineProps({
  data: Array,
  agent:Boolean,
  defaul:[],
  selected_id:{
    type:Array,
    required:true
  },
  field_name:{
    type:String,
    required:true
  }
});

// State

// Methods
function selectAll(){
  if (props.data.length !== props.selected_id.length){
    for (let i = 0; i < props.data.length; i++){
      if (!props.selected_id.includes(props.data[i].key)){
        props.selected_id.push(props.data[i].key)
      }
    }
  } else {
    emit('clear');
  }
}
function selected(key){
  if(props.selected_id && props.selected_id.includes(key)){
    let index = props.selected_id.findIndex(i => i.key === key)
    props.selected_id?.splice(index, 1)
  }else {
    props.selected_id.push(key)
  }
}
//TODO: THIS IS MULTISELECT
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
