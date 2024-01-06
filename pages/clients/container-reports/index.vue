<template>
   <div>
     <div><page-title :title="'Отчет по таре'"/></div>
     <div>
       <ClientsContainerReportsFilterCard :filters="filters" @filterClicked="filterClicked(filters)"/>
     </div>
     <div class="mt-4 mb-2"><page-title :title="'Клиент'"/></div>
     <div>
       <LazyClientsContainerReportsClientDataTable :clientsTaraDebts="clientsTaraDebts"/>
     </div>
     <div class="mt-4 mb-2"><page-title :title="'Тара'"/></div>
     <div>
       <LazyClientsContainerReportsTaraDataTable/>
     </div>
   </div>
</template>

<script setup>

const filters = ref({
  page: 1,
  page_size: 10,
  agent: [],
  territory: [],
  tara: [],
  type: []
})
async function filterClicked(filters){
  await clientsTaraDebts.getData(filters)
}

const clientsTaraDebts = useClientsTaraStore('')

onMounted(()=>{
  clientsTaraDebts.getData(filters.value)
})
</script>

<style scoped>

</style>
