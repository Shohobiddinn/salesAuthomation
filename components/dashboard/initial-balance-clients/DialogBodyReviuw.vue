<template>
  <div class="w-full" v-if="detail">
    <div class="flex justify-between py-3 border-b-1" v-if="detail.fact">
      <div class="fs-14">Факт</div>
      <div class="fs-16 font-medium">{{ detail.fact }}</div>
    </div>

    <div class="flex justify-between py-3 border-b-1" v-if="detail.payment_courier">
      <div class="fs-14">Поставщик</div>
      <div class="fs-16 font-medium">{{ detail.payment_courier
        ?.name }}</div>
    </div>

    <div class="flex justify-between py-3 border-b-1" v-if="detail.agent">
      <div class="fs-14">Агент</div>
      <div class="fs-16 font-medium">{{ detail.agent?.name }}</div>
    </div>

    <div class="flex justify-between py-3 border-b-1" v-if="detail.phone">
      <div class="fs-14">Телефон</div>
      <div class="fs-16 font-medium">{{ detail.phone }}</div>
    </div>

    <div class="flex justify-between py-3 border-b-1" v-if="detail.payment_date">
      <div class="fs-14">Дата оплаты</div>
      <div class="fs-16 font-medium">
        {{ moment(detail.payment_date).format("YYYY-MM-DD") }}
      </div>
    </div>

    <div class="flex justify-between py-3 border-b-1" v-if="detail.created_by">
      <div class="fs-14">Создал</div>
      <div class="fs-16 font-medium">{{ detail.created_by?.name }}</div>
    </div>

    <div class="flex justify-between py-3 border-b-1" v-if="detail.edited_by">
      <div class="fs-14">Изменил</div>
      <div class="fs-16 font-medium">{{ detail.edited_by?.name }}</div>
    </div>

    <div class="flex justify-between py-3 border-b-1" v-if="detail.description">
      <div class="fs-14">Комментарий</div>
      <div class="fs-16 font-medium">{{ detail.description }}</div>
    </div>

    <div class="flex justify-between py-3 border-b-1" v-if="detail.created_date">
      <div class="fs-14">Дата создания</div>
      <div class="fs-16 font-medium">
        {{ moment(detail.created_date).format("YYYY-MM-DD") }}
      </div>
    </div>

    <div class="flex justify-between py-3 border-b-1" v-if="detail.trade_direction">
      <div class="fs-14">Направление торговли</div>
      <div class="fs-16 font-medium">{{ detail.trade_direction?.name }}</div>
    </div>
    <div class="flex justify-between">
      <div></div>
      <div class="flex pt-4 mb-[-20px]">
        <button class="bg-[#EFF3F3] py-[10px] px-3 rounded-lg mr-4" @click.prevent="deleteItem(detail.id)">
          <IconTrash />
        </button>
        <m-btn @click.prevent="$emit('editItem')">
          <div class="flex">
            <IconEditb :color="true" class="mr-3" />
            <div>Изменить</div>
          </div>
        </m-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
const emit = defineEmits(["closeModal", "editItem"]);
// Store
const clientsInitialBalanceStore = useClientsInitialBalanceStore("");

// State
const detail = ref(clientsInitialBalanceStore.detail)

// Methods
const deleteItem = async (id) => {
  await clientsInitialBalanceStore.deleteItem(id);
  emit("closeModal");
};
</script>
