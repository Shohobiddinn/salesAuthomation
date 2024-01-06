<template>
  <div class="rounded-large bg-white">
    <search-input class="w-full rounded-b-0" @change="yourMethod" />
  </div>
  <div
    class="bg-white overflow-y-scroll rounded-b-large border-1 border-primary-gray -mt-[1px] scroll"
    :style="{ height: height - 41 + 'px' }"
  >
    <div v-for="i in productsStore.data?.items" @click="selectedProducts(i.id)" class="flex pl-3 pt-2 cursor-pointer border-b-[1px]">
      <div>
        <label>
          <input :checked="data.products?.includes(i.id)" type="checkbox" />
          <span></span>
        </label>
      </div>
      <div class="fs-14 ml-2">{{ i.name }}</div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  height: Number,
  data:Object
})
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
function selectedProducts(id){
  if(props.data.products?.includes(id)){
    var index = props.data.products.findIndex(i => i === id)
    props.data.products.splice(index, 1)
  }else {
    props.data.products.push(id)
  }
}
const products = ref(null)
// Methods
function yourMethod() {}
onMounted(async ()=>{
  await productsStore.getData(true)
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
