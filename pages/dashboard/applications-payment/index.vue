<template>
  <div>
    <div class="flex justify-between mt-7">
      <page-title v-if="active.isActive && active.index === 0" :title="'Заявки на оплату'"/>
      <page-title v-if="active.isActive && active.index === 1" :title="'Заявки на оплату (Van Selling)'"/>
      <page-title v-if="active.isActive && active.index === 2" :title="'Заявки на оплату (Продавец)'"/>
      <div class="flex bg-white rounded-lg">
        <button
            @click="selectApplications(index)" v-for="(item, index) in applications"
            :class="[active.isActive && active.index === index ? 'bg' : '']"
            class="bg-white bg-btn px-4 fs-14">{{item.name}}</button>
      </div>
    </div>
    <div v-if="active.isActive && active.index === 0">
      <div class="mt-5">
        <DashboardApplicationsPaymentFilterCard/>
      </div>
      <div class="mt-7">
        <DashboardApplicationsPaymentDataTable/>
      </div>
      <div class="flex gap-5 mt-6">
        <m-btn>Подтверждения</m-btn>
        <button class="bg-red rounded-lg py-2 px-6 text-white">Удалить</button>
      </div>
    </div>
    <div v-if="active.isActive && active.index === 1">
      <div class="mt-5">
        <DashboardApplicationsPaymentVanSellingFilterCard/>
      </div>
      <div class="mt-7">
        <DashboardApplicationsPaymentVanSellingDataTable/>
      </div>
      <div class="flex gap-5 mt-6">
        <m-btn>Подтверждения</m-btn>
        <button class="bg-red rounded-lg py-2 px-6 text-white">Удалить</button>
      </div>
    </div>
    <div v-if="active.isActive && active.index === 2">
      <div class="mt-5">
        <DashboardApplicationsPaymentVanSellingFilterCard/>
      </div>
      <div class="mt-7">
        <DashboardApplicationsPaymentVanSellingDataTable/>
      </div>
      <div class="flex gap-5 mt-6">
        <m-btn>Подтверждения</m-btn>
        <button class="bg-red rounded-lg py-2 px-6 text-white">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const applications = ref([
  {
    name:"Оплата доставки"
  },
  {
    name:"Оплата (Van selling)"
  },
  {
    name:"Оплата (Продавец)"
  }
])
const active = ref({
  isActive:true,
  index:0
})
function selectApplications(index){
  active.value.isActive = true
  active.value.index = index
}
</script>

<style scoped>
.bg{
  background: #299B9B;
  color: white;
}
.bg-btn:first-child{
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.bg-btn:last-child{
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>
