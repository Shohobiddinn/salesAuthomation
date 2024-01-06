<template>
  <div>
    <div class="rounded-lg bg-white border-grey py-3">
      <div class="flex flex-row gap-4 px-4 items-center">
        <div @click="draggable = true">
          <i-btn>
            <IconColsSVG />
          </i-btn>
        </div>
        <table-filter
            :templates="knowledgeCategoriesStore.templates"
        ></table-filter>
        <div>
          <search-input
              @change="knowledgeCategoriesStore.search"
              class="w-full h-38px"
          />
        </div>
        <div>
          <excel-btn :size="'340kb'"></excel-btn>
        </div>
      </div>
      <div class="mt-3 w-full overflow-auto">
        <data-table
            :headers="knowledgeCategoriesStore.templates"
            @sort="knowledgeCategoriesStore.sortData"
            :sorted="knowledgeCategoriesStore.params.order_by"
        >
          <template #body>
            <c-tr
                v-for="data in knowledgeCategoriesStore.data?.items"
                :key="data"
            >
              <c-td v-for="key in knowledgeCategoriesStore.templates" :key="key">
                <div v-if="key.checked">
                  <template v-if="key.isComputable">
                    {{ tableComputable(key.key, data) }}
                  </template>
                  <template v-else>
                    {{ data[key.key] }}
                  </template>
                </div>
              </c-td>
              <c-td class="">
                <div class="p-2 td-shadow">
                  <IconEdit
                      @click="() => dialogStore.edit({ ...data })"
                  ></IconEdit>
                </div>
              </c-td>
            </c-tr>
          </template>
        </data-table>
      </div>
      <div class="flex justify-between w-full">
        <div class="flex p-3 gap-2 items-center">
          <span class="secondary-gray-text fs-14"> Показать по </span>
          <page-size-btn
              :current-size="knowledgeCategoriesStore.params.page_size"
              @setPageSize="knowledgeCategoriesStore.setPageSize"
          />
        </div>
        <div class="p-3">
          <page-index
              :available-pages="knowledgeCategoriesStore.data?.total_pages"
              :current-page="knowledgeCategoriesStore.data?.page_number"
              @setPage="knowledgeCategoriesStore.setPage"
          />
        </div>
      </div>
    </div>
    <transition name="modal">
      <div v-if="draggable">
        <d-modal @closeDialog="draggableDialog" name="Управление меню таблицы">
          <drag-and-drop
              @change="(value) => (knowledgeCategoriesStore.templates = value)"
              :templates="knowledgeCategoriesStore.templates"
          ></drag-and-drop>
        </d-modal>
      </div>
    </transition>
    <loading-modal v-if="knowledgeCategoriesStore.loading"
                   name="Управление меню таблицы">
      <Loading/>
    </loading-modal>
  </div>

</template>

<script setup lang="ts">
// Props
import { KnowledgeCategoryModel } from "~/interfaces/api/knowledge-category-model";
import moment from "moment/moment";

const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});

// State
const draggable = ref(false);
const { isActive } = toRefs(props);

// Stores
const knowledgeCategoriesStore = useKnowledgeCategoriesStore(
  isActive.value.toString()
);
const dialogStore = useDialogStore("knowledge_categories");
const rolesStore = useRolesStore();

// Hooks
onMounted(() => {
  knowledgeCategoriesStore.getData(isActive.value);
});

function draggableDialog() {
  draggable.value = false;
}

const tableComputable = (type: string, data: KnowledgeCategoryModel) => {
  switch (type) {
    case "roles": {
      let result: Array<string> = [];

      data.roles.forEach((value) => {
        rolesStore.data.forEach((role) => {
          if (role.key === value) {
            result.push(role.name);
          }
        });
      });

      return result.join(", ");
    }
    case "created_date": {
      moment.locale("ru");
      return moment(data.created_date).format("DD,MM,YYYY HH:MM");
    }
    default: {
      return "Not found";
    }
  }
};
</script>

<style scoped></style>
