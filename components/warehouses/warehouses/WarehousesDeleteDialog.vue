<template>
  <div class="w-full">
    <div class="flex justify-center w-full">
      <div>
        <IconTrashB />
      </div>
    </div>
    <div class="flex justify-center w-full mt-7">
      <div class="text-[18px] text-center w-[250px] font-[600]">
        Вы действительно хотите удалить?
      </div>
    </div>
    <div class="flex justify-center w-full mt-5">
      <div class="fs-16 flex text-center justify-center w-[250px] font-[400]">
        <label>
          <input type="checkbox" v-model="isAccepted" />
          <span></span>
        </label>
        <div class="ml-3">Я согласен</div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-6 mt-4">
      <button
        class="fs-14 bg-[#FAFDFD] border rounded-lg py-3"
        @click="closeDialog"
      >
        Нет, выйти
      </button>
      <button
        class="fs-14 bg-[#D10505] rounded-lg text-white disabled"
        @click="deleteWarehouses"
      >
        Да, удалить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
  id: String,
});

// emits
const emit = defineEmits(["closeDeleteDialog"]);

const closeDialog = () => {
  emit("closeDeleteDialog");
};

// State
const { isActive } = toRefs(props);
const isAccepted = ref(false);

// store
const allowDeletes = useWarehousesStore(isActive.value.toString());
const agentStore = useAgentsStore(isActive.value.toString());

// methods
const deleteWarehouses = async () => {
  if (isAccepted.value) {
    await allowDeletes.allowDeleteSuccess(props.id);
    await allowDeletes.refresh()
    emit("closeDeleteDialog");
  }
};
</script>

<style scoped>
label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
[type="checkbox"]:checked + span:before {
  content: "\f106";
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all 0.4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299b9b;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
