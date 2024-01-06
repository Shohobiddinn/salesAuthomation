<template>
  <rounded-white-container>
    <div class="flex flex-row my-4">
      <transparent-btn class="border-1 -py-[1px]"
                       @click="$router.push('/settings/products')">
        <fa-icon hash="&#xf060"/> Назад
      </transparent-btn>
    </div>
    <div class="flex flex-row mb-2">
      <span class="text-lg font-semibold">
        Добавления товара
      </span>
    </div>
    <div class="my-3 w-full overflow-auto px-4 min-h-[170px]">
      <data-table :headers="headers"
                  class="-mx-4"
                  @sort="sortData"
                  :sorted="sortedData">
        <template #body>
          <tr v-for="(key, index) in enteredData" :key="key">
            <td class="px-4 py-2.5 w-full">
              <div class="flex justify-center w-full">

                <menu-btn class="w-full">
                  <template #btn>
                    <m-btn-outlined
                      class="border-primary-gray flex items-center w-full gap-2"
                      @click="onOpenDropdown($event, 'productCategories')"
                    >
                      <fa-icon hash="&#xf078" />
                      {{
                        key.category_id
                          ? getSelectedName("productCategories", key.category_id)
                          : "Выбрать"
                      }}
                    </m-btn-outlined>
                  </template>
                  <template #content>
                    <flex-col class="gap-2 w-54 max-h-88 overflow-auto">
                      <FilterItems
                        singleSelect
                        :data="productCategoryStore.data"
                        :selectedItems="key.category_id"
                        @onSingleItemSelect="key.category_id = $event"
                        @onLoadElse="onLoadElseProductCategories"
                      />
                    </flex-col>
                  </template>
                </menu-btn>

              </div>
            </td>
            <td class="px-4 py-2.5">
              <div class="flex justify-center w-full">
                <d-input placeholder="Введите"
                         type="text"
                         class="w-full"
                         :value="key.name"
                         @change="(value) => key.name = value"/>
              </div>
            </td>
            <td class="px-4 py-2.5">
              <div class="flex justify-center w-full">
                <div class="w-full">
                  <d-input placeholder="Введите"
                           type="text"
                           class="w-full"
                  />
                </div>
              </div>
            </td>
            <td class="px-4 py-2.5">
              <d-input placeholder="Введите"
                       type="number"
                       class="w-full"
                       :value="key.quantity_in_package"
                       @change="(value) => key.quantity_in_package = value"/>
            </td>
            <td class="px-4 py-2.5">
              <d-input placeholder="Введите"
                       type="text"
                       class="w-full"
                       :value="yourState"
                       @updated="setInput"/>
            </td>
            <td class="px-4 py-2.5">
              <div class="flex justify-center w-full">
                <div class="w-full">
                  <menu-btn class="w-full">
                    <template #btn>
                      <m-btn-outlined
                        class="border-primary-gray w-54 flex items-center w-full gap-2"
                        @click="onOpenDropdown($event, 'units')"
                      >
                        <fa-icon hash="&#xf078" />
                        {{
                          key.unit_id
                            ? getSelectedName("units", key.unit_id)
                            : "Выбрать"
                        }}
                      </m-btn-outlined>
                    </template>
                    <template #content>
                      <flex-col class="gap-2 w-42 max-h-88 overflow-auto">
                        <FilterItems
                          singleSelect
                          :data="unitsStore.data"
                          :selectedItems="key.unit_id"
                          @onSingleItemSelect="key.unit_id = $event"
                          @onLoadElse="onLoadElseUnits"
                        />
                      </flex-col>
                    </template>
                  </menu-btn>
                </div>
              </div>
            </td>
            <td class="px-4 py-2.5">
              <div class="flex justify-center w-full">
                <div class="w-full">
                  <menu-btn class="w-full">
                    <template #btn>
                      <m-btn-outlined
                        class="border-primary-gray w-54 flex items-center w-full gap-2"
                        @click="onOpenDropdown($event, 'productGroup')"
                      >
                        <fa-icon hash="&#xf078" />
                        {{
                          key.product_group_id
                            ? getSelectedName("productGroup", key.product_group_id)
                            : "Выбрать"
                        }}
                      </m-btn-outlined>
                    </template>
                    <template #content>
                      <flex-col class="gap-2 w-42 max-h-88 overflow-auto">
                        <FilterItems
                          singleSelect
                          :data="productGroup.data"
                          :selectedItems="key.product_group_id"
                          @onSingleItemSelect="key.product_group_id = $event"
                          @onLoadElse="onLoadElseProductGroup"
                        />
                      </flex-col>
                    </template>
                  </menu-btn>
                </div>
              </div>
            </td>
            <td class="px-4 py-2.5">
              <label class="switch mb-1">
                <input type="checkbox" @change="key.is_active = !key.is_active">
                <span class="slider round"></span>
              </label>
            </td>
            <td>
              <sm-btn @click="deleteF(index)" class="text-red-500 p-2">
                <fa-icon hash="&#xf00d"/>
              </sm-btn>
            </td>
          </tr>
        </template>
      </data-table>
    </div>
    <div class="flex flex-row justify-between">
      <m-btn-outlined class="border-color-primary"
                      @click="addMore">
        <fa-icon hash="&#x2b" /> Добавить еще
      </m-btn-outlined>
      <div class="flex items-center gap-2">
        <m-btn @click="save">
          Добавить
        </m-btn>
      </div>
    </div>
  </rounded-white-container>
</template>

<script setup lang="ts">
// State
import {notify} from "@kyvg/vue3-notification";
const props = defineProps({
  name: String,
  isActive: {
    type: Boolean,
    required: true,
  },
})
const {isActive} = toRefs(props);
import { ProductsModel } from "~/interfaces/api/products-model";

// Store
const boxType = useBoxTypesStore(isActive.value.toString())
const productGroup = useProductGroupsStore(isActive.value.toString())
const unitsStore = useUnitsStore(isActive.value.toString());
const dialogStore = useDialogStore("products");
const productCategoryStore = useProductCategoryStore(isActive.value.toString())
const products = useProductsStore("true")
const router = useRouter()


// State
let headers = ref([
  {
    name: "Кат. товара",
    key: "productCategory",
    checked:true,
    thWidth:"280px"
  },
  {
    name: "Название",
    key: "name",
    checked:true,
    thWidth:"120px"
  },
  {
    name: "Объем",
    key: "volume",
    checked:true,
    thWidth:"120px"
  },
  {
    name: "Кол-во блок",
    key: "quantity",
    checked:true,
    thWidth:"120px"
  },
  {
    name: "Код 1С",
    key: "code",
    checked:true,
    thWidth:"120px"
  },
  {
    name: "Eд. измерения",
    key: "unk",
    checked:true,
    thWidth:"160px"
  },
  {
    name: "Группа продуктов",
    key: "group",
    checked:true,
    thWidth:"160px"
  },
  {
    name: "Aктивный ",
    checked: true,
    key: "isActive"
  }
]);
let sortedData = ref({key: '', mode: ''});

let enteredData = ref<ProductsModel[]>([
  {
    id: undefined,
    category_id:"",
    name:"",
    unit_id:"",
    product_group_id:"",
    quantity_in_package:null,
    code:"",
    is_active: false
  }
])
let yourState = ref('')

// Methods
function addMore(){
  enteredData.value.push({
    id:undefined,
    category_id:"",
    name:"",
    unit_id:"",
    product_group_id:"",
    quantity_in_package:null,
    code:"",
    is_active: false
  })
};

function deleteF(index: any){
  enteredData.value.splice(index, 1)
};

const save = async () => {
  notify({ title: "Пожалуйста подождите!" });
  for (let valueElement of enteredData.value) {
    await products.add(valueElement);
    await products.refresh(true);
    router.push('/settings/products')
  }
  enteredData.value = [{
    id: undefined,
    category_id: "",
    name: "",
    unit_id: "",
    product_group_id: "",
    quantity_in_package: null,
    code: "",
    is_active: false
  }]

  notify({ title: "Сохранено!" })

  dialogStore.closeDialog();
};

onMounted(() => {
  boxType.getData(isActive.value)
})

const onOpenDropdown = async (value: any, state: string) => {
  if(state === 'productCategories' && !productCategoryStore.data) {
    await productCategoryStore.getData(true)
  }
  if(state === 'productGroup' && !productGroup.data) {
    await productGroup.getData(true)
  }
  if(state === 'units' && !unitsStore.data) {
    await unitsStore.getData(true)
  }
  return
}

const onLoadElseProductCategories = () => {
  productCategoryStore.params.page_size += 10
}

const onLoadElseProductGroup = () => {
  productGroup.params.page_size += 10
}

const onLoadElseUnits = () => {
  unitsStore.params.page_size += 10
}

const getSelectedName = (state: string, selectedId: string) => {
  if(state === 'productCategories' && productCategoryStore.data) {
    return productCategoryStore.data?.items?.find((item: any) => item.id === selectedId)?.name
  }
  if(state === 'productGroup' && productGroup.data) {
    return productGroup.data?.items?.find((item: any) => item.id === selectedId)?.name
  }
  if(state === 'units' && unitsStore.data) {
    return unitsStore.data?.items?.find((item: any) => item.id === selectedId)?.name
  }
  return ''
}
</script>
