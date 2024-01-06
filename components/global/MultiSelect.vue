<template>
    <menu-btn>
          <template #btn>
            <m-btn-outlined
              class="border-grey flex items-center w-full gap-2 bg-white">
              <fa-icon hash="&#xf078" />
              <div class="flex justify-between w-full">
                <div>Выбрать</div>
                <div>{{selected_id?.length}} из {{data?.length}}</div>
              </div>

            </m-btn-outlined>
          </template>
          <template #content>
            <flex-col class="gap-2">
              <search-input />
              <flex-col class="gap-2">
                <flex-row class="items-center gap-2">
                <label class="-mb-1">
                    <input type="checkbox"
                        @click="selectAll"
                        :checked="selected_id?.length === data?.length">
                  <span></span>
                </label>
                <div @click="selectAll" class="cursor-pointer"
                        :class="selected_id?.length === data?.length ? 'text-primary':''">
                    Выбрать все
                </div>
                </flex-row>
                <flex-row class="items-center gap-2"
                        v-for="(cargo, index) in data" :key="cargo">
                <label class="-mb-1">
                    <input v-if="selected_id" type="checkbox"
                           :checked="selected_id.find(i => i[field_name] === cargo.id)"
                    >
                  <span></span>                </label>
                <div @click="selected(cargo.id, index)" class="cursor-pointer"
                        :class="[selected_id && selected_id.find(i => i[field_name] === cargo.id) ? 'text-primary':'']">
                  <span v-if="!agent">{{ cargo.name }}</span>
                  <span v-else>{{ cargo.first_name }}</span>
                </div>
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
  if (props.data.length !== props.selected_id.length && props.data.length > props.selected_id.length){
   for (let i = 0; i < props.data.length; i++){
      if (!props.selected_id.find(i => i[props.field_name] === props.data[i]?.id)){
        props.selected_id.push({[props.field_name]:props.data[i].id})
      }
   }
  } else {
    emit('clear');
  }
}
function selected(id){
  if(props.selected_id && props.selected_id.find((i) => i[props.field_name] === id)){
    let index = props.selected_id.findIndex(i => i[props.field_name] === id)
    props.selected_id?.splice(index, 1)
  }else {
    const data = {}
    data[props.field_name] = id
    console.log('props.selected_id',props.selected_id)
    if (props.selected_id){
      props.selected_id.push(data)
    }
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
