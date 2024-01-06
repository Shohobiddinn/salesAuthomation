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
              :value="data.shippedDate"
              @change="(v) => (data.shippedDate = v)"
              placeholder="Введите"
              class="w-full"
              type="text"
            />
          </div>
        </div>
        <div>
          <flex-col class="gap-2">
            <div class="flex-row">
              <div class="text-gray-3 fs-12 fw-4 mt-3">Экспедитор</div>
            </div>
            <menu-btn class="h-11 w-full">
              <template #btn>
                <m-btn-outlined
                  @click="onOpenDropdown"
                  class="border-grey flex items-center w-full gap-2"
                >
                  <fa-icon hash="&#xf078" />
                  {{
                    data.expeditorId
                      ? getSelectedName(data.expeditorId)
                      : "Выбрать"
                  }}
                </m-btn-outlined>
              </template>
              <template #content>
                <div class="overflow-auto">
                  <FilterItems
                    :data="expeditors"
                    :singleSelect="true"
                    :selectedItems="data.expeditorId"
                    @onSingleItemSelect="data.expeditorId = $event"
                    @onLoadElse="onLoadElseExpeditors"
                  />
                </div>
              </template>
            </menu-btn>
          </flex-col>
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

// stores
const dialogStore = useDialogStore("order-shipped");
const orderStore = useOrdersStore("");

//state
const router = useRouter();
const expeditors = ref(null);
const expeditorsParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
  filter: [
    {
      field: "is_active",
      value: ["true"],
    },
  ],
});

const data = ref({
  id: "",
  expeditorId: "",
  shippedDate: moment().format("YYYY-MM-DD HH:MM"),
});

const datas = ref({});

// methods
const getExpeditors = async () => {
  expeditors.value = await orderStore.getExpeditors(expeditorsParams.value);
};

const onLoadElseExpeditors = async () => {
  expeditorsParams.value.page_size += 10;
  await getExpeditors();
};

const onOpenDropdown = async () => {
  if (!expeditors.value) {
    await getExpeditors();
    return;
  }
  return;
};

const getSelectedName = (selectedId) => {
  console.log(data.value.expeditorId);
  if (expeditors.value) {
    const name =  expeditors.value.items?.find(
      (expeditor) => expeditor.id === selectedId
    )
    return name?.first_name || name?.last_name || name?.middle_name
  }
  return "";
};

const save = async (e) => {
  if(!data.value.expeditorId){
    notify({ title: "Выберите экспедитора!", type: 'error' });
    return
  }
  else {
    notify({ title: "Пожалуйста подождите!" });
    await orderStore.setShipped(data.value);
    await orderStore.refresh();
    dialogStore.closeDialog()
  }
};

onBeforeMount(() => {
  if (dialogStore.singleData !== null) {
    datas.value = dialogStore.singleData;
  }
  data.value.id = datas.value.id;
  console.log("data.value.id", data.value.id);
});
</script>
