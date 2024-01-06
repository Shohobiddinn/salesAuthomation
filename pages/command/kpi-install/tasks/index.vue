<template>
  <div>
    <div class="flex flex-row my-6 justify-between">
      <button @click="$router.push('/command/kpi-install')"
              class="border-1 rounded-lg bg-white hover:bg-gray-50 active:bg-gray-200 py-2 px-6 whitespace-nowrap flex gap-2 items-center border-primary-gray">
        <IconBackArrowSVG/> Назад
      </button>
      <m-btn @click="$router.push('/command/kpi-install/tasks/new')">
        Создать шаблон
      </m-btn>
    </div>
    <p-title>
      Задачи
    </p-title>
    <double-tab first-tab-name="Активный"
                second-tab-name="Неактивный" class="border-0" @change="dataGet">
      <template #first>
        <CommandKpiInstallTasksDataTable @kpiInActivite="kpiInActivite" :kpiStore="kpiStore.kpiActiveData"/>
      </template>
      <template #second>
        <CommandKpiInstallTasksDataTable @kpiActivite="kpiActivite" :kpiStore="kpiStore.kpiInActiveData"/>
      </template>
    </double-tab>
    <loading-modal v-if="loading"
                   name="Управление меню таблицы">
      <Loading/>
    </loading-modal>
  </div>

</template>

<script setup>

import LoadingModal from "~/components/global/LoadingModal.vue";

const kpiStore = useKpiTemplateStore('')
const dataGet = (value) => {
  if (value === 1){
    kpiStore.getTemplateActive()
  }else if(value === 2){
    kpiStore.getTemplateInActive()
  }
}
let loading = ref(false)
const kpiActivite = async (id) => {
  try{
    loading.value = true
    await kpiStore.kpiActivite(id)
    await kpiStore.getTemplateInActive()
  }catch (error){

  }finally {
    loading.value = false
  }
}
const kpiInActivite = async (id) => {
  try{
    loading.value = true
    await kpiStore.kpiDeActivite(id)
    await kpiStore.getTemplateActive()
  }catch (error){

  }finally {
    loading.value = false
  }
}
onMounted(()=>{
  kpiStore.getTemplateActive()
})
</script>

<style scoped>

</style>
