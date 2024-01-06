<template>
  <div>
    <RoundedWhiteContainer>
      <div
        class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
      >
        <div>
          <span class="text-lg font-semibold"> 17. Пользователи </span>
        </div>
        <div class="flex gap-4 justify-self-end">
          <menu-btn class="relative z-47 w-100" @click="onOpenDropdown">
            <template #btn>
              <m-btn-outlined
                class="border-grey bg-white flex items-center w-full gap-2"
              >
                <fa-icon hash="&#xf078" />
                Выбрать
              </m-btn-outlined>
            </template>
            <template #content>
              <div class="h-auto overflow-auto">
                <FilterItems
                  :data="roles"
                  :selectedItems="selectedRole"
                  @onSelectItems="selectedRole = $event"
                />
              </div>
            </template>
          </menu-btn>
          <filtr-btn @click="filterByRoles">Фильтр</filtr-btn>
        </div>
      </div>
      <div>
        <div class="justify-self-end mb-4">
          <m-btn @click="dialogStore.openDialog" class="justify-self-auto">
            Добавить пользователя
          </m-btn>
        </div>
      </div>
      <DoubleTab
        @change="activeTab = $event"
        first-tab-name="Активный"
        second-tab-name="Не активный"
      >
        <template #first>
          <SettingsUsersTableData :is-active="true" />
        </template>
        <template #second>
          <SettingsUsersTableData :is-active="false" />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal
          :dataContainerWidth="'700px'"
          @closeDialog="dialogStore.closeDialog"
          :name="
            dialogStore?.singleData?.id
              ? 'Редактировать пользователя'
              : 'Добавить нового пользователя'
          "
        >
          <SettingsUsersDataDialog :is-active="isActive" />
        </d-modal>
      </div>
    </transition>
    <loading-modal
      v-if="usersStore(isActive).loading"
      name="Управление меню таблицы"
    >
      <Loading />
    </loading-modal>
  </div>
</template>

<script setup lang="ts">
// Store
const dialogStore = useDialogStore("users");
const usersStore = (value: boolean) => useUsersStore(value.toString());

// State
const selectedRole = ref([]);
const activeTab: Ref<number> = ref(1);

const roles = ref({ items: null });
const filter = ref({
  field: "role",
  value: [],
});

// Methods
const isActive = computed(() => {
  return activeTab.value === 1;
});

const filterByRoles = () => {
  selectedRole.value.forEach((id) => {
    filter.value.value.push(id.toString());
  });
  usersStore(isActive.value).params.filter = [
    {
      field: "is_active",
      value: [isActive.value.toString()],
    },
    filter.value,
  ];
};

const onOpenDropdown = async () => {
  if (!roles.value.items) {
    roles.value.items = await usersStore(isActive.value).getRoles();
  }
};
</script>

<style scoped>
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
</style>
