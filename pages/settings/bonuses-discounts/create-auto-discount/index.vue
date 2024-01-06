<template>
  <div>
    <div>
      <transparent-btn @click="$router.push('/settings/bonuses-discounts')">
        <fa-icon hash="&#xf060"/> Назад
      </transparent-btn>
    </div>
    <div class="mt-4 text-[24px] font-[600]">Создать автоскидку</div>
    <form id="app" class="w-full" @submit="save">
      <div class="mt-3">
        <rounded-white-container>
          <div class="grid grid-cols-4 gap-4">
            <div>
              <div class="flex-row">
             <span class="text-gray-3 fs-14 fw-4">
                Тип бонуса
             </span>
              </div>
              <div class="flex-row mt-2">
                <select v-model="data.type" class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
                  <option v-for="i in discountsStore.discountType" :value="i.key">{{i.name}}</option>
                </select>
              </div>
            </div>
            <div>
              <div class="flex-row">
                <d-input placeholder="Введите"
                         class="w-full"
                         title="Название"
                         :required="true"
                         :value="data.name"
                         @change="(v) => data.name = v"
                         type="text"
                />
              </div>
            </div>
            <div>
              <div class="flex-row">
             <span class="text-gray-3 fs-14 fw-4">
                Действителен с
             </span>
              </div>
              <div class="flex-row mt-2">
                <d-input-date-picker :values="data.valid_from" @change="(v) => data.valid_from = v" placeholder="Введите" class="w-full" type="text"/>
              </div>
            </div>
            <div>
              <div class="flex-row">
             <span class="text-gray-3 fs-14 fw-4">
                Действителен по
             </span>
              </div>
              <div class="flex-row mt-2">
                <d-input-date-picker :values="data.valid_to" @change="(v) => data.valid_to = v" placeholder="Введите" class="w-full" type="text"/>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4">

            <div class="grid grid-cols-2 gap-4">
              <div>
                <div class="mb-2 fs-12">Категория клиента</div>
                <menu-btn  class="w-full" @click="onOpenDropdown($event, 'clientCategory')">
                  <template #btn>
                    <m-btn-outlined
                        class="border-grey flex items-center w-full gap-2">
                      <fa-icon hash="&#xf078" />
                      Выбрать
                    </m-btn-outlined>
                  </template>
                  <template #content>

                    <flex-col class="gap-2 max-h-66 overflow-auto pr-2">
                      <search-input @change="search($event, 'clientCategory')" />
                      <FilterItems
                          :data="clientCategory.data"
                          :selectedItems="data.client_categories"
                          @onSelectItems="selectClientsCategory"
                          @onLoadElse="onLoadElseClientsCategory"
                      />
                    </flex-col>
                  </template>
                </menu-btn>
              </div>
              <div>
                <div class="mb-2 fs-12">Тип оплаты</div>
                <menu-btn  class="w-full" @click="onOpenDropdown($event, 'currency')">
                  <template #btn>
                    <m-btn-outlined
                        class="border-grey flex items-center w-full gap-2">
                      <fa-icon hash="&#xf078" />
                      Выбрать
                    </m-btn-outlined>
                  </template>
                  <template #content>

                    <flex-col class="gap-2 max-h-66 overflow-auto pr-2">
                      <search-input @change="search($event, 'currency')" />
                      <FilterItems
                          :data="currencyStore.data"
                          :selectedItems="data.currencies"
                          @onSelectItems="selectCurrency"
                          @onLoadElse="onLoadElseCurrency"
                      />
                    </flex-col>
                  </template>
                </menu-btn>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <div class="mb-2 fs-12">Тип цены</div>
                <menu-btn  class="w-full" @click="onOpenDropdown($event, 'priceType')">
                  <template #btn>
                    <m-btn-outlined
                        class="border-grey flex items-center w-full gap-2">
                      <fa-icon hash="&#xf078" />
                      Выбрать
                    </m-btn-outlined>
                  </template>
                  <template #content>

                    <flex-col class="gap-2 max-h-66 overflow-auto pr-2">
                      <search-input @change="search($event, 'priceType')" />
                      <FilterItems
                          :data="priceTypeStore.data"
                          :selectedItems="data.price_types"
                          @onSelectItems="selectPriceType"
                          @onLoadElse="onLoadElsePriceType"
                      />
                    </flex-col>
                  </template>
                </menu-btn>
              </div>
              <div>
                <div class="mb-2 fs-12">Агенты</div>
                <menu-btn  class="w-full" @click="onOpenDropdown($event, 'agents')">
                  <template #btn>
                    <m-btn-outlined
                        class="border-grey flex items-center w-full gap-2">
                      <fa-icon hash="&#xf078" />
                      Выбрать
                    </m-btn-outlined>
                  </template>
                  <template #content>

                    <flex-col class="gap-2 max-h-66 overflow-auto pr-2">
                      <search-input @change="search($event, 'agent')" />
                      <FilterItems
                          :data="agentsStore.data"
                          :selectedItems="data.agents"
                          @onSelectItems="selectAgents"
                          @onLoadElse="onLoadElseAgents"
                      />
                    </flex-col>
                  </template>
                </menu-btn>
              </div>
            </div>

          </div>
        </rounded-white-container>
      </div>
      <div class="mt-6">
        <rounded-white-container>
          <div class="text-[20px] font-[600] ">Условии</div>
          <div v-if="data.terms !== undefined">
            <div v-for="(i, index) in data.terms" :key="i" class="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div class="flex-row">
             <span class="text-gray-3 fs-14 fw-4">
                Минимальное количество
             </span>
              </div>
              <div class="flex-row mt-2">
                <d-input placeholder="Введите"
                         class="w-full"
                         :required="true"
                         :value="i.value"
                         @change="(v) => i.value = v"
                         type="number"
                />
              </div>
            </div>
            <div>
              <div class="flex-row">
             <span class="text-gray-3 fs-14 fw-4">
               Процент скидки
             </span>
              </div>
              <div class="flex flex-row mt-2">
                <d-input placeholder="Введите"
                         class="w-full"
                         :required="true"
                         :value="i.rebate"
                         @change="(v) => i.rebate = v"
                         type="number"
                />
                <div @click="deleteF(index)" class="mt-3 ml-2 w-[30px] cursor-pointer"><IconTrash/></div>
              </div>
            </div>
          </div>
          </div>
          <div class="mt-4 flex justify-end">
            <button @click="addMore" class="fs-14 border border-[#299B9B] rounded-lg px-6 p-2">Добавить еще</button>
          </div>
        </rounded-white-container>
        <div>
          <div class="mt-4 w-[400px] rounded-lg bg-white flex justify-around">
            <div v-for="i in tabs" :key="i" class="flex">
              <div class="mt-2 mb-3">
                <input
                  class="mt-1"
                  @input="inputValue(i.number)"
                  type="radio"
                  name="product"
                  :value="amount"
                  :checked="amount === i.number"
                />
              </div>
              <label class="mt-2 fs-14">{{ i.name }}</label>
            </div>
          </div>
        </div>
        <div class="font-bold mt-2">Продукты</div>
        <div  class="border rounded-lg bg-white w-full h-[344px] mr-3 mt-2 relative ">
          <div class="absolute z-50 h-[55px] bg-[#fff] w-[93%] tara-search">
            <div class="mt-2 ml-[12px]">
              <search-input-border-none @updated="onSearchProductCategory"/>
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
                    <IconTopArrow v-if="tara.id === item.id"></IconTopArrow>
                    <IconBottomArrow v-else></IconBottomArrow>
                  </div>
                </div>
                <div v-if="tara.isActive && tara.id === item.id" class="check">
                  <div v-if="productsBySelectedCategoryId?.length">
                    <div v-for="(itemChild, itemIndex) in productsBySelectedCategoryId" :key="itemIndex" class="flex">
                      <div @click="selectProduct(itemChild.id, itemIndex)" class="flex">
                        <label>
                          <input :checked="data.to_products !== undefined && data.to_products.includes(itemChild.id) "  type='checkbox'>
                          <span></span>
                        </label>
                        <div class="ml-[10px]">{{itemChild.name}}</div>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    Нет продуктов
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-2 mb-3 flex justify-end">
          <i-btn type="submit">Сохранить</i-btn>
        </div>
      </div>
    </form>

  </div>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue";
import {DiscountModel} from "~/interfaces/api/bonuses-discounts-models";
import {notify} from "@kyvg/vue3-notification";
import { ProductsModel } from "~~/interfaces/api/products-model";

// stores
const priceTypeStore = usePriceTypesStore('')
const clientCategory = useClientCategoriesStore('')
const currencyStore = useCurrenciesStore('')
const agentsStore = useAgentsStore('true')
const productCategoryStore = useProductCategoryStore('true')
const productStore = useProductsStore('true')
const discountsStore = useDiscountsStore('')

// states
const productsBySelectedCategoryId: Ref<ProductsModel[] | undefined> = ref()
const selectedProductcategoryId: Ref<string> = ref('')
const route = useRoute()
const router = useRouter()
const amount = ref(1)
const checkProduct = ref(false)

const data: Ref<DiscountModel> = ref({
  to_products:[],
  currencies:[],
  price_types:[],
  client_categories:[],
  agents:[],
  name:'',
  terms:[
    {
      value:null,
      rebate:null,
    }
  ]
})

const tabs = ref([
  {
    name: "Для всех клиентов",
    number: 1,
    tab: "tab1",
  },
  {
    name: "Для избранных клиентов",
    number: 2,
    tab: "tab2",
  },
]);

const tara = ref({
  isActive:false,
  isActiveTo:false,
  id: ''
})

const filters = ref({
  isAgent: false,
  categoryClient:false,
})

// hooks
watchEffect(() => {
  if(selectedProductcategoryId.value) {
    productsBySelectedCategoryId.value = productStore.data?.items.filter((product: ProductsModel) => product.category_id === selectedProductcategoryId.value)
  }
})

onMounted(async ()=>{
  if(productStore.params.page_size === 100) {
    await productStore.getData(true, '')
  } else productStore.params.page_size = 100
  await discountsStore.getDiscountType()
  productCategoryStore.params.page_size = 100
  if (!!route.query.id){
    await discountsStore.getWithId(route.query.id)
    data.value = discountsStore.clientId
  }
})

// methods
const openProducts = async (id: string) => {
  if (tara.value.id === id) {
    tara.value.isActive = false;
    tara.value.id = '';
  } else {
    tara.value.isActive = true;
    tara.value.id = id;
  }

  selectedProductcategoryId.value = id
}

const selectProduct = (id:any, index:any) =>{
  if(data.value.to_products.includes(id)){
    data.value.to_products.splice(index, 1)
    checkProduct.value = false
  }else {
    data.value.to_products.push(id)
    checkProduct.value = true
  }
}

function inputValue(param:any){
  amount.value = param
  if (amount.value === 1){
    data.value.is_public = true
    data.value.is_special = false
  }else if (amount.value === 2){
    data.value.is_special = true
    data.value.is_public = false
  }
}

function clickOutside(){
  filters.value.isAgent = false
  filters.value.categoryClient = false
}

function addMore(){
  data.value.terms.push({
    value:0,
    rebate:0
  })
}

function deleteF(index: any){
  data.value.terms.splice(index, 1)
}

const onOpenDropdown = async (value:any, state:any) => {
  if (state === "priceType" && !priceTypeStore.data?.items) {
    await getPriceType();
    return;
  }if (state === "clientCategory" && !clientCategory.data?.items) {
    await getClientsCategory();
    return;
  }if (state === "currency" && !currencyStore.data?.items) {
    await getCurrency();
    return;
  }if (state === "agents" && !agentsStore.data?.items) {
    await getAgents();
    return;
  }
  return;
};

const search = async (value:any, state:any) => {
  if (state === "priceType") {
    priceTypeStore.params.search = value;
    await getPriceType();
    return;
  }if (state === "clientCategory") {
    clientCategory.params.search = value
    await getClientsCategory();
    return;
  }if (state === "currency") {
    currencyStore.params.search = value
    await getCurrency();
    return;
  }if (state === "agents") {
    agentsStore.params.search = value
    await getAgents();
    return;
  }
};

const getPriceType = async () => {
  await priceTypeStore.getData(true)
};

const getClientsCategory = async () => {
  await clientCategory.getData(true)
};

const getCurrency = async () => {
  await currencyStore.getData(true)
};

const getAgents = async () => {
  await agentsStore.getData(true)
};

function selectPriceType(param:any){
  data.value.price_types = param
}

const onLoadElsePriceType = async () => {
  priceTypeStore.params.page_size += 10
};

function selectClientsCategory(param:any){
  data.value.client_categories = param
}

const onLoadElseClientsCategory = async () => {
  clientCategory.params.page_size += 10
};

function selectCurrency(param:any){
  data.value.currencies = param
}

const onLoadElseCurrency = async () => {
  currencyStore.params.page_size += 10
};

function selectAgents(param:any){
  data.value.agents = param
}

const onLoadElseAgents = async () => {
  agentsStore.params.page_size += 10
};

const save = async (e:any) => {
  e.preventDefault()
  notify({title: "Пожалуйста подождите!"});
  if (data.value.name !== ''){
    await discountsStore.add(data.value);

    await discountsStore.refresh();

    router.push('/settings/bonuses-discounts')
    data.value.id = ''
    data.value.is_active = false
    data.value.name = ''
    data.value.valid_from = ''
    data.value.valid_to = ''
    data.value.is_public = false
    data.value.is_special = false
    data.value.client_categories = []
    data.value.currencies = []
    data.value.agents = []
    data.value.price_types = []
    data.value.terms = []
    data.value.to_products = []
    notify({title: "Сохранено!"})
  }
}

const onSearchProductCategory = async (newVal: string) => {
  productCategoryStore.data.items = productCategoryStore.data?.items.filter((item: ProductCategoryModel) => item.name.toLocaleLowerCase().includes(newVal.toLocaleLowerCase()))
  if(!newVal) {
    productCategoryStore.data.items = await productCategoryStore.getData(true)
  }
  return
}
</script>

<style scoped>
input[type="radio"] {
  /* ...existing styles */
  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #299B9B;
  border: 1px solid #cccccc;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
}
input[type="radio"]:checked::before {
  transform: scale(1);
}
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
