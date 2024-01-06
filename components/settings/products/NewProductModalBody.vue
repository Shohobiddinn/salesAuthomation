<template>
  <rounded-white-container class="data-container">
    <div>
      <div class="rounded-t-large border-b-1px -mx-4 data-header px-4 pb-4 flex justify-between items-center">
        <div>
           <span v-if="data.id" class="text-20px fw-6 text-gray-3">
            Изменить новый товар
          </span>
          <span v-else class="text-20px fw-6 text-gray-3">
            Добавить новый товар
          </span>
          <div class="grid grid-cols-2 tab-btn mt-5 mr-5">
            <button class="px-3 py-3 fs-14 fw-4 rounded-l-lg"
                    @click="activeTab = (activeTab !== 1 ? 1 : 1)"
                    :class="activeTab === 1 ?
                  'text-white button-bg hover:bg-teal-600 active:bg-teal-700':
                  'border-1 border border-color-primary'">
              Основное
            </button>
            <button class="px-3 py-3 fs-14 fw-4 rounded-r-lg"
                    @click="activeTab = (activeTab !== 2 ? 2 : 2)"
                    :class="activeTab === 2 ?
                  'text-white button-bg hover:bg-teal-600 active:bg-teal-700':
                  'border-1 border border-color-primary border-l-0'">
              Дополнительное
            </button>
          </div>
        </div>
        <div class="self-start">
          <span>
            <index-btn :is-active="false" @click="dialogStore.closeDialog()" class="close-btn">
              <fa-icon :hash="'&#xf00d'"/>
            </index-btn>
        </span>
        </div>
      </div>
      <form id="app" class="w-full" @submit="save">
        <div class="grid grid-cols-2 gap-4 pt-2 pb-4 px-4" v-if="activeTab === 1">
          <div class=" gap-3">
            <div>
              <span class="fs-14">Категории</span><span class="text-red">*</span>
            </div>
            <menu-btn class="w-full mt-3" @click="onOpenDropdown($event)">
              <template #btn>
                <m-btn-outlined :isSelect="requiredSelect" @focusout="requiredCheck"
                                :class="requiredSelect ? 'border border-red' : 'border-grey'"
                    class="border  flex items-center w-full gap-2">
                  <fa-icon hash="&#xf078" />
                  <span v-if="getCategroyName">{{getCategroyName}}</span>
                  <span v-else>Выбрать</span>
                </m-btn-outlined>
              </template>
              <template #content>
                <flex-col
                    class="gap-2 max-h-88 overflow-auto pr-2"
                >
                  <search-input @change="search($event)" />
                  <FilterItems
                      :data="category"
                      :singleSelect="true"
                      :selectedItems="data?.category_id"
                      @onSingleItemSelect="onSingleItemSelect"
                      @onLoadElse="onLoadElseUnits"
                  />
                </flex-col>
              </template>
            </menu-btn>
            <div class="flex flex-row mt-3">
            <span class="text-gray-3 fs-14 fw-4">
              Ед. измерение
            </span>
            </div>
            <div class="flex flex-row gap-4 mt-3">
              <div class="flex justify-center w-full">
                <div class="w-full">
                  <select v-model="data.unit_id" class="form-select my-input w-full
                              block p-2 border-primary-gray border-1 rounded-lg
                              text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid
                              transition ease-in-out
                              focus:text-gray-700 focus:border-cyan-600 focus:outline-none"
                          aria-label="Default select example">
                    <option v-for="key in unitsStore.data?.items" :value="key.id">{{key.name}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="flex-row mt-2">
          <span class="text-gray-3 fs-14 fw-4">
            Код
          </span>
            </div>
            <div class="flex-row mt-3">
              <d-input placeholder="Введите"
                       type="text"
                       class="w-full"
                       :value="data.code"
                       @change="(value) => data.code = value"/>
            </div>
            <div class="flex-row mt-3">
          <span class="text-gray-3 fs-14 fw-4">
            Кол-во в упаковке
          </span>
            </div>
            <div class="flex-row mt-3">
              <d-input placeholder="Введите"
                       type="text"
                       class="w-full"
                       :value="data.quantity_in_package"
                       @change="(value) => data.quantity_in_package = value"/>
            </div>
            <div class="flex flex-row items-center gap-4 h-[35px] mt-9">
            <span class="text-gray-3 fs-14 fw-4">
              Aктивный 
            </span>
              <label class="switch mb-1">
                <input v-model="data.is_active" type="checkbox">
                <span class="slider round"></span>
              </label>
            </div>
          </div>
          <div class=" gap-3">
            <div class="flex-row">
              <d-input placeholder="Введите"
                       type="text"
                       class="w-full"
                       title="Название"
                       :required="true"
                       :value="data.name"
                       @change="(value) => data.name = value"/>
            </div>
            <div class="flex-row mt-2">
          <span class="text-gray-3 fs-14 fw-4">
            Объем
          </span>
            </div>
            <div class="flex-row mt-3">
              <d-input placeholder="Введите"
                       type="text"
                       class="w-full"
                       :value="data.volume"
                       @change="(value) => data.volume = value"
              />
            </div>
            <div class="flex-row mt-2">
          <span class="text-gray-3 fs-14 fw-4">
            Вес
          </span>
            </div>
            <div class="flex-row mt-3">
              <d-input placeholder="Введите"
                       type="text"
                       class="w-full"
                       :value="data.weight"
                       @change="(value) => data.weight = value"/>
            </div>
            <div class="flex flex-row mt-3">

              <div class="w-full">
                <div class="secondary-gray-text fs-14 fw-4">Группа</div>
                <menu-btn
                  class="w-full mt-2"
                  @click="onOpenDropdown($event, 'product-group')"
                >
                  <template #btn>
                    <m-btn-outlined
                      class="border-primary-gray flex items-center w-full gap-2"
                    >
                    <fa-icon hash="&#xf078" />
                    <div v-if="getProductGroupName">
                      {{getProductGroupName}}
                    </div>
                    <div v-else>
                      Выбрать
                    </div>
                    </m-btn-outlined>
                  </template>
                  <template #content>
                    <flex-col class="gap-2 max-h-88 overflow-auto">
                      <FilterItems
                        :data="productGroups"
                        :selectedItems="data.product_group_id"
                        singleSelect
                        @onSingleItemSelect="data.product_group_id = $event"
                        @onLoadElse="onLoadElseProductGroups"
                      />
                    </flex-col>
                  </template>
                </menu-btn>
              </div>
            </div>
            <div class="flex justify-between gap-1 items-center mt-12">
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
        <div class="grid grid-cols-2 gap-4 pt-2 pb-4 px-4" v-if="activeTab === 2">
          <div class="grid grid-cols-1 gap-3">
            <div v-if="productSubCategories?.items.length" class="flex flex-row">
            <span class="text-gray-3 fs-14 fw-4">
              Подкатегория
            </span>
            </div>
            <div class="flex flex-row gap-4">
              <div v-if="productSubCategories?.items.length" class="flex justify-center w-full">
                <div class="w-full">
                  <select v-model="productSubCategory" class="form-select my-input w-full
                              block p-2 border-primary-gray border-1 rounded-lg
                              text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid
                              transition ease-in-out
                              focus:text-gray-700 focus:border-cyan-600 focus:outline-none"
                          aria-label="Default select example">
                    <option v-for="subCategory in productSubCategories.items" :key="subCategory.id" :value="subCategory.id">{{subCategory?.name}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="flex flex-row">
            <span class="text-gray-3 fs-14 fw-4">
              Тип коробки
            </span>
            </div>
            <div class="flex flex-row gap-4">
              <div class="flex justify-center w-full">
                <div class="w-full">
                  <select v-model="data.box_type_id" class="form-select my-input w-full
                              block p-2 border-primary-gray border-1 rounded-lg
                              text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid
                              transition ease-in-out
                              focus:text-gray-700 focus:border-cyan-600 focus:outline-none"
                          aria-label="Default select example">
                    <option v-for="key in boxType.data?.items" :value="key.id">{{key.name}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div v-if="tradeDirections?.items?.length" class="flex flex-row">
            <span class="text-gray-3 fs-14 fw-4">
              Направление торговли
            </span>
            </div>
            <div class="flex flex-row gap-4">
              <div class="flex justify-center w-full">
                <div class="w-full">
                  <select v-if="tradeDirections?.items?.length" v-model="tradeDirection" class="form-select my-input w-full
                              block p-2 border-primary-gray border-1 rounded-lg
                              text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid
                              transition ease-in-out
                              focus:text-gray-700 focus:border-cyan-600 focus:outline-none"
                          aria-label="Default select example">
                    <option v-for="item in tradeDirections.items" :key="item.id" :value="item.id">{{item?.name}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="flex flex-row">
            <span class="text-gray-3 fs-14 fw-4">
              Загрузить фото
            </span>
            </div>
            <div class="flex flex-row rounded-lg border-1">
              <div class="grid grid-cols-2 items-center">
                <div>
                <span v-if="photoFile">
                  {{ photoFile.name }}
                </span>
                  <input id="file_upload_id"
                         accept="image/*"
                         ref="file"
                         @change="onFileChanged($event)"
                         style="display:none"
                         capture
                         type="file">
                </div>
                <div class="justify-self-end">
                  <m-btn @click="upload">
                    Загрузить фото
                  </m-btn>
                </div>
              </div>
            </div>
            <div class="flex flex-row items-center gap-4 h-[42px]">
            <span class="text-gray-3 fs-14 fw-4">
              ММЛ
            </span>
              <label class="switch mb-1">
                <input v-model="data.MML" type="checkbox">
                <span class="slider round"></span>
              </label>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-3">
            <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
            Сортировка
          </span>
            </div>
            <div class="flex-row">
              <d-input placeholder="Введите"
                       type="text"
                       class="w-full"
                       :value="data.sort"
                       @change="(value) => data.sort = value"/>
            </div>
            <div class="flex-row">
            <span class="text-gray-3 fs-14 fw-4">
            Сап код
          </span>
            </div>
            <div class="flex-row">
              <d-input placeholder="Введите"
                       type="text"
                       class="w-full"
                       :value="data.sub_code"
                       @change="(value) => data.sub_code = value"/>
            </div>
            <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
            Штрих (Бар) код
          </span>
            </div>
            <div class="flex-row">
              <d-input placeholder="Введите"
                       type="text"
                       class="w-full"
                       :value="data.bar_code"
                       @change="(value) => data.bar_code = value"/>
            </div>
            <div class="flex flex-row">
            <span class="text-gray-3 fs-14 fw-4">
              ИКПУ Код
            </span>
            </div>
            <div class="flex flex-row gap-4">
              <d-input placeholder="Введите"
                       type="text"
                       class="w-full"
                       :value="data.IKPU_code"
                       @change="(value) => data.IKPU_code = value"/>
            </div>
            <div class="flex justify-between gap-1 items-center">
              <m-btn @click="save" class="w-full">
                Добавить
              </m-btn>
            </div>
          </div>
        </div>
    </div>
  </rounded-white-container>
</template>

<script setup lang="ts">
import {notify} from "@kyvg/vue3-notification";
import {ProductsModel} from "~/interfaces/api/products-model";

const props = defineProps({
  name: String,
  atTrue:Boolean,
  isActive: {
    type: Boolean,
    required: true,
  },
})
const { isActive } = toRefs(props);
// Store
const boxType = useBoxTypesStore(isActive.value.toString())
const unitsStore = useUnitsStore(isActive.value.toString());
const dialogStore = useDialogStore("products");
const productCategoryStore = useProductCategoryStore(isActive.value.toString())
const productsActive = useProductsStore("")
const filterStore = useFilterListStore('')

// State
const data: Ref<ProductsModel> = ref({
  product_group_id:'',
  box_type_id:'',
  unit_id:'',
  category_id: null,
  is_active:false,
})
let activeTab = ref(1)
const file = ref<File | null>();
let photoFile = ref(null)
const productSubCategories = ref(null)

const productSubCategoryParams = ref({
    page: 1,
    page_size: 10,
    search: null,
    order_by: {
        field: "id",
        is_asc: true,
    },
    filter: [
        {
            field: "is_active",
            value: ["true"],
        }
    ],
});

const tradeDirections = ref(null)

const tradeDirectionsParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

const categoriesParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: 'is_active',
      value: [
        "true"
      ]
    }
  ]
});
const category = ref(null)
const categoryName: Ref<string> = ref('')
const productSubCategory = ref('')
const requiredSelect = ref(false)
const atTrue1 = ref(props.atTrue) as any
const productGroups = ref(null);
const selectedProductGroups = ref([]);
const productGroupsParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

// Methods
function upload() {
  document.getElementById('file_upload_id').click();
};
function onFileChanged(e: any){
  const target = e.target;
  if (target && target.files) {
    photoFile.value = target.files[0]
  }
};

const getCategroyName = computed(() => {
  if(category.value && data.value?.category_id){
    return category.value?.items?.find((item: any) => item.id === data.value.category_id)?.name
  }
  return ''
})

const getProductGroupName = computed(() => {
  if(productGroups.value && data.value?.product_group_id){
    return productGroups.value?.items?.find((item: any) => item.id === data.value.product_group_id)?.name
  }
  return ''
})

const getProductCategory = async () => {
  const data = await filterStore.getProductCategory(categoriesParams.value);
  category.value = data
};

const onOpenDropdown = async (value:any, state:any) => {
  if (state === "product-group" && !productGroups.value) {
    await getProductGroups();
    return;
  }
  if (!category.value) {
    await getProductCategory();
    return;
  }
  return;
};

const getProductGroups = async () => {
  productGroups.value = await productsActive.getProductGroups(
    productGroupsParams.value
  );
  
};

const onLoadElseProductGroups = async () => {
  productGroupsParams.value.page_size += 10;
  await getProductGroups();
};

function onSingleItemSelect(categoryId:string, name:string){
  data.value.category_id = categoryId
  categoryName.value = name
};

const search = async (value:any) => {
  categoriesParams.value.search = value;
  await getProductCategory();
  return;
};

const onLoadElseUnits = async () => {
  categoriesParams.value.page_size += 10;
  await getProductCategory();
};

watch(data.value, async (value, oldValue, onCleanup) => {
  if (data.value.category_id !== undefined){
    requiredSelect.value = false
  }
});
const save = async (e:any) => {
  e.preventDefault()
  
  if (data.value.name !== '' && data.value.category_id !== null){
    let photoFileData = null
    if(photoFile.value){
      const formData = new FormData();
      formData.append("form_file", photoFile.value);
      photoFileData = await productCategoryStore.onPhotoFileUpload(formData)
    }
    if(photoFileData){
      data.value = {...data.value, image_id: photoFileData?.data?.id}
    }
    notify({title: "Пожалуйста подождите!"});
    await productsActive.add(data.value);
    await productsActive.refresh('true');

    notify({title: "Сохранено!"})

    dialogStore.closeDialog();
  }else if(data.value.category_id === null){
    requiredSelect.value = true
  }else {
  }
}

function requiredCheck(){
  data.value?.category_id === null
}

onBeforeMount(async () => {
  if (dialogStore.singleData !== null) {
    data.value = dialogStore.singleData;
    await getProductCategory()
    await getProductGroups()
  }
  await boxType.getData(true)
  await unitsStore.getData(true);
});

onMounted(async () => {
  productSubCategories.value = await productCategoryStore.getProductSubCategories(productSubCategoryParams.value)
  tradeDirections.value = await productCategoryStore.getTradeDirections(tradeDirectionsParams.value)
  if (atTrue1.value === true){
    setTimeout(() => {
      data.value.box_type_id = boxType.data?.items[0].id
      data.value.unit_id = unitsStore.data?.items[0].id
      let index = category.value?.items.findIndex((i: any) => i.id === data.value.category_id)
      categoryName.value = category.value?.items[index]?.name
    }, 200);

  }
})
</script>

<style scoped>
.data-container{
  min-width: 700px;
}

</style>
