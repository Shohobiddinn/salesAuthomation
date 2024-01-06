<template>
  <div>
    <div @click="$router.push('/clients/combining-clients/unifactions')">
      <page-title :title="'Объединение клиентов'"/>
    </div>
    <div>
      <div v-click-outside="clickOutside" class="mt-6 h-full">
        <div class="mt-4">
          <OrdersCreateReturnFiltr/>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <ClientsCombiningClientsDataTable/>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const filter = ref({
  isSelectCategory: false,
  isSelectTerritory: false,
  isSelectAgent: false,
})
const clickOutside = () => {
  filter.value.isSelectCategory = false;
  filter.value.isSelectTerritory = false;
  filter.value.isSelectAgent = false;
}
</script>

<style scoped>

</style>
