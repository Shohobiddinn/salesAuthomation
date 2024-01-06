<template>
  <div class="mt-4">
    <div class="flex justify-between">
      <div><page-title :title="'Объединение клиентов'"/></div>
      <div class="flex mt-3">
        <button @click="$router.push('/clients/contacts/clients-bonus')" class="bg-white hover:bg-blue-50 rounded-lg border border-[#299B9B] py-2 px-15 mr-4">Бонус</button>
        <m-btn @click="$router.push('/clients/contacts/products-packages')">Пакеты продуктов</m-btn>
      </div>
    </div>
    <div class="flex">
      <div class="w-[270px]">
        <multiply-selection :filter.sync="filter.isSelectAgent" @toggle="toggle => filter.isSelectAgent = toggle" :name="'Агент'"/>
      </div>
      <div class="check flex mt-11 ml-3">
        <div class=" mr-2">
          <label>
            <input type='checkbox'>
            <span></span>
          </label>
        </div>
        <div class="text-[#013636]">Только реферальные клиенты</div>
      </div>
    </div>
    <div>
      <div class="mt-6">
        <ClientsContactsDatatable/>
      </div>
    </div>
  </div>

</template>

<script setup>
const filter = ref({
  isSelectAgent: false
})
const contactModal = ref(false)
function contactDialog(){
  contactModal.value = false
}
</script>

<style scoped>
.check label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
.check label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #D2D7D7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
.check [type=checkbox]:checked + span:before {
  content: '\f106';
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all .4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299B9B;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
