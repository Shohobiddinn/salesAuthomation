<template>
  <form id="app" class="w-full" @submit.prevent="save">
    <div class="w-full">
      <div>
        <div>
          <div class="flex-row">
            <span class="text-gray-3 fs-14 fw-4"> Дата </span>
          </div>
          <div class="flex-row mt-2">
            <d-input-date-picker
              :value="data.expectedShippingdate"
              @change="(v) => (data.expectedShippingdate = v)"
              placeholder="Введите"
              class="w-full"
              type="text"
            />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 mt-4">
        <div></div>
        <m-btn type="submit" class="w-full">Сохранить</m-btn>
      </div>
    </div>
  </form>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification";
import moment from "moment";
const router = useRouter();
const dialogStore = useDialogStore("order-accept");
const orderStore = useOrdersStore("");
const data = ref({
  id: "",
  expectedShippingdate: moment().format("YYYY-MM-DD HH:MM"),
});
const save = async (e) => {
  e.preventDefault();
  notify({ title: "Пожалуйста подождите!" });
  await orderStore.accepted(data.value);
  await orderStore.refresh();
  await dialogStore.closeDialog();
};

const datas = ref({});
onBeforeMount(() => {
  if (dialogStore.singleData !== null) {
    datas.value = dialogStore.singleData;
  }
  data.value.id = datas.value.id;
  console.log("data.value.id", data.value.id);
});
</script>

<style scoped>
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
