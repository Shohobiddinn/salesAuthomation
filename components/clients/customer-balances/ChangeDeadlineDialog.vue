<template>
  <div class="w-full">
    <div class="flex w-full">
      <div class="mt-2">Клиент</div>
      <div class="w-full ml-2">
        <m-btn-outlined
          class="border-grey flex gap-2 items-center hover:bg-gray-50 active:bg-gray-200"
        >
          <fa-icon hash="&#xf078" />
          {{ props.changeDeadlineInfo?.clientName }}
        </m-btn-outlined>
      </div>
    </div>
    <div class="flex justify-between w-full mt-6">
      <div class="flex gap-5 items-center">
        <div class="mt-2">Срок:</div>
        <DInputDatePicker
          withoutTime
          :value="term"
          @change="(newVal) => (term = newVal)"
        />
      </div>
      <div class="flex gap-2 items-center">
        <div
          @click="onDeleteCurrentTerm"
          class="rounded-lg cursor-pointer bg-[#EFF3F3] py-3 px-3 mr-2 hover:bg-gray-50 active:bg-gray-200"
        >
          <IconTrash />
        </div>
        <div><m-btn @click="onSave">Сохранить</m-btn></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";

// store
const clientsBalancesStore = useClientsBalancesStore('main')

// props
const props = defineProps({
  changeDeadlineInfo: Object,
});

// emits
const emit = defineEmits(['closeDialog'])

// state
const term = ref(
  moment(props.changeDeadlineInfo.currentTerm).format("YYYY-MM-DD")
);

const onDeleteCurrentTerm = () => {
  term.value = "";
};

const onSave = async () => {
  const data = {
    client_id: props.changeDeadlineInfo.clientId,
    current_term: props.changeDeadlineInfo.currentTerm,
    new_term: term.value
  }
  await clientsBalancesStore.onChangeTerm(data);
  emit('closeDialog')
}
</script>

<style scoped>
.date-picker input {
  width: 100%;
  padding-left: 45px;
  position: relative;
}
.date-picker input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  color: rgba(0, 0, 0, 0);
  opacity: 1;
  display: block;
  background: url(~/assets/svg/date-pickerscg.svg) no-repeat;
  width: 20px;
  height: 20px;
  left: 10px;
  border-width: thin;
  top: 12px;
}
</style>
