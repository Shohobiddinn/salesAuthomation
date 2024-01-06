<template>
  <div>
    <button
      @click="$router.go(-1)"
      class="h-[44px] px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border"
    >
      <div class="flex">
        <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
        Назад
        <slot></slot>
      </div>
    </button>
    <div>
      <page-title :title="'История перемещения оборудования'" />
    </div>
    <div class="mt-4">
      <ClientsEquipmentHistoryFilter />
    </div>
    <div>
      <div class="mt-4">
        <ClientsEquipmentHistoryEquipmentDataTable
          @editInventory="editInventory($event)"
        />
      </div>
    </div>
    <transition name="modal">
      <div v-if="editInventoryModal">
        <d-modal
          @closeDialog="closeInventoryDialog"
          :dataContainerWidth="'738px'"
          :name="'Изменить инвентарь'"
        >
          <ClientsEquipmentAddInventory @closeDialog="closeInventoryDialog" />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup>
// store
const equipmentStore = useClientsEquipmentStore("main");

// states
const editInventoryModal = ref(false);

// methods
function closeInventoryDialog() {
  equipmentStore.inventoryId = null;
  editInventoryModal.value = false;
}

const editInventory = (id) => {
  equipmentStore.inventoryId = id;
  editInventoryModal.value = true;
};
</script>

<style scoped></style>
