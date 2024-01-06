<template>
  <div class="flex flex-row my-6 justify-between">
    <button @click="$router.push('/command/kpi-install')"
            class="border-1 rounded-lg bg-white hover:bg-gray-50 active:bg-gray-200 py-2 px-6 whitespace-nowrap flex gap-2 items-center border-primary-gray">
      <IconBackArrowSVG/> Назад
    </button>
    <m-btn @click="dialogStore.openDialog">
      Добавить
    </m-btn>
  </div>
  <p-title>
    Группировка
  </p-title>
  <CommandKpiInstallGroupingDataTable/>
  <d-modal v-if="dialogStore.isDialogOpen"
           @closeDialog="dialogStore.closeDialog"
           name="Добавить">
    <CommandKpiInstallGroupingDialog @errorDefine="errorDefine"/>
  </d-modal>
  <d-modal v-if="errorMessage"
           @closeDialog="closeDialog"
           name="Ошибка">
    <div class="w-full">
      <Internal500 :data="data1"></Internal500>
    </div>
  </d-modal>
</template>

<script setup>
import Internal500 from "~/components/global/Internal500.vue";

const dialogStore = useDialogStore('kpi-group')

let errorMessage = ref(false)
function closeDialog(){
  errorMessage.value = false
}
const data1 = ref({name:'', messages:''})
function errorDefine(error, data){
  if (error === 500){
    errorMessage.value = true
    data1.value.messages = data.response.data.Messages
    data1.value.name = data.response.statusText
    console.log('data', data1.value)
  }
}
</script>

<style scoped>

</style>
