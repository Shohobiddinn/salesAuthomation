<template>
  <form id="app" class="w-full relative" @submit="save">
    <div class="grid grid-cols-3 gap-4">
      <div>
        <div class="flex-row mt-1">
          <d-input
            placeholder="Введите"
            class="w-full"
            type="text"
            title="Имя"
            :value="data.first_name"
            @change="(value) => (data.first_name = value)"
            :required="true"
          />
        </div>
      </div>
      <div>
        <div class="flex-row mt-3">
          <span class="fs-14 fw-4 text-gray-3"> Отчество </span>
        </div>
        <div class="flex-row mt-1">
          <d-input
            placeholder="Введите"
            class="w-full"
            type="text"
            :value="data.middle_name"
            @change="(value) => (data.middle_name = value)"
          />
        </div>
      </div>
      <div>
        <div class="flex-row mt-1">
          <d-input
            placeholder="Введите"
            class="w-full"
            type="text"
            title="Фамилия"
            :value="data.last_name"
            @change="(value) => (data.last_name = value)"
            :required="true"
          />
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <div class="flex-row mt-3">
          <span class="text-gray-3 fs-14 fw-4"> Телефон </span>
        </div>
        <div class="flex-row mt-1">
          <d-input
            placeholder="Введите"
            type="tel"
            class="w-full"
            :value="data.phone"
            @change="(value) => (data.phone = value)"
          />
        </div>
        <div class="flex-row mt-2">
          <span class="text-gray-3 fs-14 fw-4"> E-mail </span>
        </div>
        <div class="flex-row mt-1">
          <d-input
            placeholder="Введите"
            type="email"
            class="w-full"
            :value="data.email"
            @change="(value) => (data.email = value)"
          />
        </div>
        <div class="flex-row mt-2">
          <d-input
            placeholder="Введите"
            type="text"
            class="w-full"
            title="Логин"
            :required="true"
            :value="data.login"
            @change="(value) => (data.login = value)"
          />
        </div>
        <div v-if="meId !== dialogStore.singleData?.id"  class="mt-6">
          <div class="flex flex-row items-center gap-2">
            <span class="text-gray-3 fs-14 fw-4"> Aктивность  </span>
            <label class="switch">
              <input v-model="data.is_active" type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <div class="flex-row mt-3">
          <span class="text-gray-3 fs-14 fw-4"> Роль </span>
        </div>
        <div class="flex-row mt-1">
        <menu-btn
          class="w-100 relative z-47"
          @click="onOpenDropdown"
        >
          <template #btn>
            <m-btn-outlined class="bg-white flex items-center w-full gap-2" :class="invalidRoleId ? 'border-red-3' : 'border-grey'">
              <fa-icon hash="&#xf078" />
              {{
                
                 getRoleId || data.role ? getRoleName(roleId)
                  : "Выбрать"
              }}
            </m-btn-outlined>
          </template>
          <template #content>
            <div class="h-auto max-h-66 overflow-auto pr-3">
              <FilterItems
                  :data="roles"
                  :singleSelect="true"
                  @onSingleItemSelect="roleId = $event"
                  :selectedItems="roleId"
                />
            </div>
          </template>
        </menu-btn>
        <small v-if="invalidRoleId" class="text-red-3">Это обязательное поле</small>
        </div>
        <div class="flex-row mt-2">
          <span class="text-gray-3 fs-14 fw-4"> Код </span>
        </div>
        <div class="flex-row mt-1">
          <d-input
            placeholder="Введите"
            type="text"
            class="w-full"
            :value="data.code"
            @change="(value) => (data.code = value)"
          />
        </div>
        <div class="flex-row mt-2">
          <span class="text-gray-3 fs-14 fw-4"> Пароль </span>
        </div>
        <div class="flex-row w-full mt-2">
          <d-input
            placeholder="*********"
            :type="'password'"
            class="w-full pb-1"
            :value="data.password"
            @change="(value) => (data.password = value)"
            required
          />
        </div>
        <div class="flex flex-row items-center justify-between w-full gap-2 mt-4">
          <m-btn v-if="!data.id" class="grow" type="submit"> Добавить </m-btn>
          <m-btn v-else class="grow" type="submit"> Сохранить </m-btn>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { notify } from "@kyvg/vue3-notification";
import { UserModel } from "~/interfaces/api/user-model";
import {Ref} from 'vue'

const props = defineProps({
  isActive: Boolean
})

// Store
const dialogStore = useDialogStore("users");
const rolesStore = useRolesStore();
const usersActiveStore = useUsersStore(props.isActive.toString());
const meId: Ref<string | undefined> = ref()

// State
const data: Ref<UserModel> = ref({
  id: undefined,
  last_name: "",
  first_name: "",
  middle_name: "",
  phone: "",
  email: "",
  login: "",
  password: "",
  dealer: "",
  role: "",
  code: "",
  is_active: true,
});
const roleId: Ref<number> = ref(null)
const roles = ref({items: null})
const invalidRoleId = ref(false)

// Methods
const getRoleName = (_roleId: number) => {
  if(roles.value.items){
    return roles.value.items.find((role: number) => role.id === _roleId)?.name
  }else return
}

const onOpenDropdown = async () => {
 if(!roles.value.items){
   roles.value.items = await rolesStore.getData()
 }
}
const save = async (e: any) => {
  e.preventDefault();
  if(!data.value.role?.toString() && !roleId.value?.toString()) {
    invalidRoleId.value = true
    return
  }
  notify({ title: "Пожалуйста подождите!" });
  if (data.value.login !== "") {
    data.value.role = roleId.value?.toString()
    await usersActiveStore.add(data.value);
    await usersActiveStore.refresh()
    notify({ title: "Сохранено!" });
    dialogStore.closeDialog();
  }
};

// Hooks
onMounted(async () => {
  if (dialogStore.singleData !== null) {
    data.value = dialogStore.singleData;
    const meData = await usersActiveStore.getMe()
    meId.value = meData?.id
    roles.value.items = await rolesStore.getData()
    roleId.value = roles.value?.items?.find((role: any) => role.key == data.value.role)?.id
  }
});

const getRoleId = computed(() => {
  if(roleId.value || roleId.value === 0) {
    return roleId.toString()
  }
  return ''
})

watchEffect(() => {
  if(roleId.value?.toString()) {
    invalidRoleId.value = false
  }
})
</script>

<style scoped>
.slider {
  transition: 0.2s !important;
}

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
