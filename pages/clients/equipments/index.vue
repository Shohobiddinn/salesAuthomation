<template>
  <div>
    <div>
      <page-title :title="'Оборудования'" />
    </div>
    <div class="mt-4">
      <ClientsEquipmentFilter />
    </div>

    <div class="flex justify-between mt-5">
      <div><page-title :title="'Таблица'" /></div>
      <div class="flex gap-4">
        <nuxt-link to="/clients/equipments/history-equipment">
          <button
            class="py-2 px-6 hover:bg-blue-50 rounded-lg border border-[#299B9B] bg-white"
          >
            История инвентаризации
          </button>
        </nuxt-link>
        <button
          class="py-2 px-6 hover:bg-green-500 rounded-lg text-white bg-[#23C00A] ml-4 mr-4"
        >
          Импортировать с excel
        </button>
        <m-btn @click="addInventoryModal = true">Добавить</m-btn>
      </div>
    </div>
    <div>
      <div class="mt-4">
        <ClientsEquipmentDatatable @editInventory="editInventory($event)" />
      </div>
    </div>
    <transition name="modal">
      <div v-if="addInventoryModal">
        <d-modal
          @closeDialog="closeInventoryDialog"
          :dataContainerWidth="'738px'"
          :name="`${
            equipmentStore.inventoryId ? 'Изменить' : 'Добавить'
          } инвентарь`"
        >
          <ClientsEquipmentAddInventory @closeDialog="closeInventoryDialog" />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
// Store
const equipmentStore = useClientsEquipmentStore("main");

// States
const addInventoryModal = ref(false);

// Methods
function closeInventoryDialog() {
  equipmentStore.inventoryId = null;
  addInventoryModal.value = false;
}
const editInventory = (id) => {
  equipmentStore.inventoryId = id;
  addInventoryModal.value = true;
};
</script>

<style scoped></style>
