<template>
  <form id="app" class="w-full" @submit="save">
    <div class="grid grid-cols-1 w-full gap-4">
      <div class="grid grid-cols-2 w-full gap-4">
        <div>
          <div class="flex-row">
            <d-input placeholder="Введите"
                     class="w-full"
                     type="text"
                     title="Название"
                     :required="true"
                     :value="data.name"
                     @change="(setName) => data.name = setName"/>
          </div>
        </div>
        <div>
          <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
           Код
          </span>
          </div>
          <div class="flex-row mt-2.5">
            <d-input placeholder="Введите"
                     type="number"
                     class="w-full"
                     :value="data.sort"
                     @change="(setTitle) => data.sort = setTitle"/>
          </div>
        </div>
      </div>
      <div>
        <div class="mb-[10px]">Продукты</div>
        <div  class="border rounded-lg w-full h-[344px] mr-3 relative ">
          <div class="absolute z-50 h-[55px] bg-[#fff] w-[547px] tara-search">
            <div class="mt-2 ml-[12px]">
              <search-input-border-none></search-input-border-none>
            </div>
          </div>
          <div class="w-[98%] h-full tara-content">
            <div class="mr-3 pt-[55px] h-full tara-content-item">
              <div v-for="(item, index) in productCategoryStore.data?.items" :key="index" class="p-[10px] tara-child">
                <div @click="openProducts(item.id)" class="flex mt-1 check">
                  <label>
                    <input type='checkbox'>
                    <span></span>
                  </label>
                  <div class="ml-[10px]">{{item.name}}</div>
                  <div class="flex justify-end ml-[20px] mt-2">
                    <IconBottomArrow v-if="!tara.isActive"></IconBottomArrow>
                    <IconTopArrow v-else></IconTopArrow>
                  </div>
                </div>
                <div v-if="tara.isActive && tara.index === item.id" class="check">
                  <div v-for="(itemChild, itemIndex) in productStore.data?.items" :key="itemIndex" class="flex">
                    <div @click="selectProduct(itemChild.id, itemIndex)" class="flex">
                      <label>
                        <input :checked="data.products.find(i => i.product_id === itemChild.id) "  type='checkbox'>
                        <span></span>
                      </label>
                      <div class="ml-[10px]">{{itemChild.name}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 w-full gap-4">
        <div class="flex flex-row items-center gap-2 mt-1">
      <span class="text-gray-3 fs-14 fw-4">
        Aктивный 
      </span>
          <label class="switch">
            <input v-model="data.is_active" type="checkbox">
            <span class="slider round"></span>
          </label>
        </div>
        <div class="flex flex-row mt-2 items-center justify-between w-full gap-2">
          <m-btn v-if="!data.id" class="grow" type="submit">
            Добавить
          </m-btn>
          <m-btn v-else class="grow" type="submit">
            Сохранить
          </m-btn>
        </div>
      </div>
    </div>
  </form>

</template>

<script setup lang="ts">
import {Ref} from "vue";
import {notify} from "@kyvg/vue3-notification";
import {useTarasStore} from "~/stores/settings/taras/taras.store";
import {TarasModel,Products} from "~/interfaces/api/taras-model";
const props = defineProps({
  tarasStore:Object,
  isActive: {
    type: Boolean,
    required: true,
  },
});
// State
const {isActive} = toRefs(props);

// Store
const productStore = useProductsStore(isActive.value.toString())
const productCategoryStore = useProductCategoryStore('')
// State
const products: Ref<Products> = ref({})
const data: Ref<TarasModel> = ref({
  id: undefined,
  name: "",
  sort: 0,
  products:[],
  is_active: true
});
const tara = ref({
  isActive:false,
  index:0
})
const checkProduct = ref(false)
const selectProduct = (id:any, index:any) =>{
  if(data.value.products.find(i => i.product_id === id)){
    data.value.products.splice(index, 1)
    checkProduct.value = false
  }else {
    data.value.products.push({product_id:id})
    checkProduct.value = true
  }
}
const openProducts = async (id:any) => {
  tara.value.isActive = !tara.value.isActive
  tara.value.index = id
  await productStore.getData(true, id)
}
const tarasActiveStore = useTarasStore("true");
const tarasInActiveStore = useTarasStore("false");
const dialogStore = useDialogStore("taras");

const save = async (e:any) => {
  e.preventDefault()
  notify({title: "Пожалуйста подождите!"});
  if (data.value.name !== ''){
    await props.tarasStore.add(data.value);

    await props.tarasStore.refresh();

    notify({title: "Сохранено!"})

    await dialogStore.closeDialog();
  }
}

onBeforeMount(() => {
  if (dialogStore.singleData !== null) {
    data.value = dialogStore.singleData;
  }
});
onMounted(()=>{
  productStore.getData(true, null)
  productCategoryStore.getData(true)
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
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
}
.check label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
.check label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #D2D7D7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
.check [type=checkbox]:checked + span:before {
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
.tara-content{
  overflow-y: scroll;
  cursor: pointer;
}
.tara-search{
  border-bottom: 1px solid #E1E4E4; border-top-left-radius: 8px
}
.tara-content-item{
  border-right: 1px solid #E1E4E4
}
.tara-child{
  border-bottom: 1px solid #E1E4E4;
}
</style>
