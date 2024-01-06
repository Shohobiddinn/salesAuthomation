<template>
  <div class="rounded-lg bg-white border-grey py-3">
    <div class="flex flex-row gap-4 px-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <SettingsUsersTableCheckbox
        :headers="usersStore.templates"
      ></SettingsUsersTableCheckbox>
      <div>
        <search-input @change="usersStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="mt-3 w-full overflow-auto">
      <data-table
        :headers="usersStore.templates"
        @sort="usersStore.sortData"
        :sorted="usersStore.params.order_by"
      >
        <template #body>
          <c-tr v-for="data in usersStore.data?.items" :key="data">
            <c-td v-for="key in usersStore.templates" :key="key">
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
                <IconEdit @click="() => dialogStore.edit({ ...data })"></IconEdit>
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
          :current-size="usersStore.params.page_size"
          @setPageSize="usersStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="usersStore.data?.total_pages"
          :current-page="usersStore.data?.page_number"
          @setPage="usersStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" name="Управление меню таблицы">
        <drag-and-drop @change="change" :templates="usersStore.templates"></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { UserModel } from "~/interfaces/api/user-model";
import { RoleModel } from "~/interfaces/api/role-model";

// props
const props = defineProps({
  isActive: Boolean
})

// Stores
const dialogStore = useDialogStore("users");
const rolesStore = useRolesStore();
const usersStore = useUsersStore(props.isActive.toString());

// Store
const draggable = ref(false);

// Methods
function change(param: any) {
  usersStore.templates = param;
  draggable.value = false;
}

function draggableDialog() {
  draggable.value = false;
}

const tableComputable = (type: string, data: UserModel) => {
  switch (type) {
    case "fio": {
      return `${data.last_name ?? "-"} ${data.first_name ?? "-"} ${
        data.middle_name ?? "-"
      }`;
    }
    case "role": {
      return (
        rolesStore.data.find((x: RoleModel) => x.key === data.role)?.name ?? data.role
      );
    }
    default: {
      return "Not found";
    }
  }
};

// Hooks
onMounted(() => {
  usersStore.getData(props.isActive)
});
</script>
