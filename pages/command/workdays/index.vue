<template>
  <div class="flex flex-col py-7.5 gap-7.5">
    <div class="flex justify-between items-center">
      <h2 class="text-gray-3 text-2xl font-semibold">Рабочие дни</h2>
      <flex-row class="gap-3 w-1/4 items-center">
        <div class="flex w-1/4 justify-end">
          <div class="text-gray-3 fs-14 fw-4 whitespace-nowrap">Должность</div>
        </div>
        <menu-btn
          class="w-3/4 relative z-47"
          @click="onOpenDropdown"
        >
          <template #btn>
            <m-btn-outlined class="border-grey bg-white flex items-center w-full gap-2">
              <fa-icon hash="&#xf078" />
              {{
                roleId === 0 || roleId
                  ? getRoleName(roleId)
                  : "Выбрать"
              }}
            </m-btn-outlined>
          </template>
          <template #content>
            <div class="h-auto overflow-auto">
              <FilterItems
                  :data="roles"
                  :singleSelect="true"
                  @onSingleItemSelect="roleId = $event"
                />
            </div>
          </template>
        </menu-btn>
      </flex-row>
    </div>
    <CommandWorkdaysDataTable/>
    <div>
      <span class="text-red-3">*</span>Чтобы установить рабочие дни, выберите персонала
    </div>
  </div>
</template>

<script setup>
// store
const workdaysStore = useWorkdaysStore("main");

// states
const roleId = ref('')
const roles = ref({items: null})

// methods
const getRoleName = (_roleId) => {
  if(roles.value.items){
    return roles.value.items.find(role => role.id == _roleId)?.name
  }else return
}

const onOpenDropdown = async () => {
 if(!roles.value.items){
   roles.value.items = await workdaysStore.getRoles()
 }
}

watchEffect(() => {
  if(roleId.value || roleId.value === 0){
    workdaysStore.params.role = roleId.value
  }
})
</script>

<style></style>
