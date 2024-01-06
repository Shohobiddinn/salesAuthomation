<template>
  <div>
    <div v-if="clientsCategoriesAndTerritories && territories && categories">
      <button
        @click="$router.go(-1)"
        class="h-[44px] px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border"
      >
        <div class="flex">
          <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
          Назад
          <slot></slot>
        </div>
      </button>
      <div class="mt-2 text-[24px] font-[600] text-[#424F4F]">Распределение клиентов по категориям и территориям.</div>
      <div class="w-full bg-white rounded-[12px] border mt-4">
        <table
          class="w-full border border-[#E1E4E4] rounded-[12px] bg-white"
        >
          <tr class="border-b border-[#E1E4E4]">
            <th v-for="key in headers" :key="key">
              <div
                v-if="key.key === 'client_name'"
                class="fs-12 p-2 text-[#424F4F]"
              >
                {{ key.name }}
              </div>
              <div class="p-2" v-else-if="key.key === 'is_active'">
                <div class="flex gap-6 justify-center">
                  <div class="fs-12 text-[#424F4F]">{{ key.name }}</div>
                  <div class="flex gap-2">
                    <div class="check">
                      <label>
                        <input
                          @input="onChangeAllActivity"
                          :checked="isAllActive"
                          type="checkbox"
                        />
                        <span></span>
                      </label>
                    </div>
                    <div class="fs-12 text-[#424F4F] w-[200px]">
                      Отметить для всех
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-2" v-else>
                <div class="flex items-center gap-2 mb-2">
                  <div class="fs-12 text-[#424F4F]">{{ key.name }}</div>
                </div>
              </div>
            </th>
          </tr>
          <tr
            class="border-b border-[#E1E4E4]"
            v-for="data in clientsCategoriesAndTerritories"
            :key="data"
          >
            <td class="p-2" v-for="key in headers" :key="key">
              <div
                v-if="key.key === 'is_active'"
                class="flex gap-2 items-center justify-center"
              >
                <div class="check">
                  <label>
                    <input
                      @input="data.category_and_territories[key.key]"
                      :checked="data.category_and_territories[key.key]"
                      type="checkbox"
                    />
                    <span></span>
                  </label>
                </div>
                Aктивный 
              </div>
              <div v-else-if="key.key === 'clientCategory'" class="fs-14 text-[#013636]"
                :style="{ width: key.thWidth }">
                <div
                  v-if="data?.category_and_territories?.client_category_id"
                  class="w-full"
                >
                  <menu-btn class="h-11 w-full bg-lotion">
                    <template #btn>
                      <m-btn-outlined
                        class="border-grey flex items-center w-full gap-2"
                      >
                        <fa-icon hash="&#xf078" />

                        {{
                          data.category_and_territories.client_category_id
                            ? getSelectedName(data.category_and_territories.client_category_id, 'category')
                            : "Выбрать"
                        }}
                      </m-btn-outlined>
                    </template>
                    <template #content>
                      <div class="overflow-auto absoulte z-50">
                        <FilterItems
                          :data="categories"
                          :singleSelect="true"
                          :selectedItems="data.category_and_territories.client_category_id"
                          @onSingleItemSelect="
                            onSelectCategory(data, $event)
                          "
                        />
                      </div>
                    </template>
                  </menu-btn>
                </div>
                <div v-else class="w-full">
                  <menu-btn class="h-11 w-full bg-lotion">
                    <template #btn>
                      <m-btn-outlined
                        class="border-grey flex items-center w-full gap-2"
                      >
                        <fa-icon hash="&#xf078" />
                        Выбрать
                      </m-btn-outlined>
                    </template>
                    <template #content>
                      <div class="overflow-auto absoulte z-50">
                        <FilterItems
                          :data="categories"
                          :singleSelect="true"
                          @onSingleItemSelect="
                            onSelectCategory(data, $event)
                          "
                        />
                      </div>
                    </template>
                  </menu-btn>
                </div>
              </div>
              <div
                v-else-if="key.key === 'territory'"
                class="fs-14 text-[#013636]"
                :style="{ width: key.thWidth }"
              >
                <div
                  v-if="data?.category_and_territories?.territory_id"
                  class="w-full"
                >
                  <menu-btn class="h-11 w-full bg-lotion">
                    <template #btn>
                      <m-btn-outlined
                        class="border-grey flex items-center w-full gap-2"
                      >
                        <fa-icon hash="&#xf078" />

                        {{
                          data.category_and_territories.territory_id
                            ? getSelectedName(data.category_and_territories.territory_id, 'territory')
                            : "Выбрать"
                        }}
                      </m-btn-outlined>
                    </template>
                    <template #content>
                      <div class="overflow-auto absoulte z-50">
                        <FilterItems
                          :data="territories"
                          :singleSelect="true"
                          :selectedItems="data.category_and_territories.territory_id"
                          @onSingleItemSelect="
                            onSelectTerritory(data, $event)
                          "
                        />
                      </div>
                    </template>
                  </menu-btn>
                </div>
                <div v-else class="w-full flex justify-end">
                  <menu-btn class="h-11 w-full bg-lotion">
                    <template #btn>
                      <m-btn-outlined
                        class="border-grey flex items-center w-full gap-2"
                      >
                        <fa-icon hash="&#xf078" />
                        Выбрать

                      </m-btn-outlined>
                    </template>
                    <template #content>
                      <div class="overflow-auto absoulte z-50">
                        <FilterItems
                          :data="territories"
                          :singleSelect="true"
                          @onSingleItemSelect="
                            onSelectTerritory(data, $event)
                          "
                        />
                      </div>
                    </template>
                  </menu-btn>
                </div>
              </div>
              <div v-else class="fs-14 text-[#013636]"
                :style="{ width: key.thWidth }">
                {{data[key.key]}}
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div @click="save" class="flex justify-end mt-2">
        <m-btn>Сохранить</m-btn>
      </div>
    </div>
    <div v-else>
      <Loading />
    </div>
  </div>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification";

// store
const clientsStore = useClientsStore("main");

// states
const router = useRouter();
const categories = ref(null);
const territories = ref(null)
const clientsCategoriesAndTerritories = ref(null);
const isAllActive = ref(false);

const headers = ref([
  {
    name: "Название клиента",
    checked:true,
    key: "client_name",
    thWidth:'150px',
    bRadius:'8px'
  },
  {
    name: "Категория клиента",
    checked:true,
    key: "clientCategory",
    thWidth:'250px',
    bRadius:'8px'
  },
  {
    name: "Территория",
    checked:true,
    key: "territory",
    thWidth:'250px',
    bRadius:'8px'
  },
  {
    name: "Aктивный ",
    checked:true,
    key: "is_active",
    thWidth:'150px'
  },
]);

const territoriesParams = ref({
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
});

// methods
async function save() {
  await clientsStore.saveAttachCategoryTerritories(clientsCategoriesAndTerritories.value);
  router.push("/clients/clients");
}

onMounted(async () => {
  if (!clientsStore.clientsIds.length > 0) {
    router.push("/clients/clients");
    notify({ title: "Сначала выберите клиента!", type: "error" });
    return;
  }
  [clientsCategoriesAndTerritories.value, categories.value, territories.value] = await Promise.all([
    clientsStore.getClientsCategoryAndTerritories(clientsStore.clientsIds),
    clientsStore.getClientCategories(categoriesParams.value),
    clientsStore.getTerritories(territoriesParams.value)
  ]);
});

const getSelectedName = (id, state) => {
  if (state === 'category' && categories.value) {
    return categories.value.items?.find(
      (category) => category.id === id
    )?.name
  }
  if (state === 'territory' && territories.value) {
    return territories.value.items?.find(
      (territory) => territory.id === id
    )?.name
  }
  else return
};

const onSelectCategory = (client, categoryId) => {
  client.category_and_territories.client_category_id = categoryId
};

const onSelectTerritory = (client, territoryId) => {
  client.category_and_territories.territory_id = territoryId
};

const onChangeAllActivity = () => {
  if(clientsCategoriesAndTerritories.value){
    isAllActive.value = !isAllActive.value;
  for (const categoryAndTerritory of clientsCategoriesAndTerritories.value)
    categoryAndTerritory.category_and_territories.is_active = isAllActive.value;
  }
};
</script>

<style scoped>
.check label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
.check label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
.check [type="checkbox"]:checked + span:before {
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
</style>
