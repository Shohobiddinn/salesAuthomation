<template>
  <div class="flex flex-col gap-7.5">
    <div>
      <div class="mt-2 text-2xl font-semibold text-gray-3">
        Создать
        {{ title }}
      </div>
    </div>
    <OrdersCreateOrdersFilterCard />
    <div class="flex justify-between pt-2.5">
      <div class="mt-2 text-2xl font-semibold text-gray-3">
        Пожалуйста, чтобы создать {{ title }} выберите клиента
      </div>
      <nuxt-link to="/clients/clients/create-clients">
        <m-btn>Добавить клиента</m-btn>
      </nuxt-link>
    </div>
    <div>
      <OrdersCreateOrdersDataTable />
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const title = ref("");

watchEffect(() => {
  if (route.query) {
    const queryKey = Object.keys(route.query)?.join("");
    if (queryKey === "request") title.value = "заказ";
    else if (queryKey === "exchange") title.value = "обмен";
    else if (queryKey === "refund" && route.query[queryKey] === "tara") {
      title.value = "возврать тары";
    } else {
      title.value = "возврать с полки";
    }
  }
});
</script>
