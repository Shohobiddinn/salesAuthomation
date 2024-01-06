<template>
  <div>
    <div v-if="expeditors && employedExpeditors">
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
      <div class="mt-2 text-[24px] font-[600] text-[#424F4F]">
        Прикрепить / открепить экспедиторов
      </div>
      <div class="w-full bg-white rounded-[12px] border mt-4">
        <table
          class="w-full border border-[#E1E4E4] rounded-[12px] bg-white"
        >
          <tr class="border-b border-[#E1E4E4]">
            <th v-for="key in headers" :key="key">
              <div
                v-if="key.key === 'client_name'"
                class="fs-12 p-2 text-[#424F4F]"
              >
                {{ key.name }}
              </div>
              <div class="p-2" v-else>
                <div class="flex justify-end items-center gap-2">
                  <div class="fs-12 text-[#424F4F]">{{ key.name }}</div>
                  <div class="flex">
                    <menu-btn class="h-11 w-full">
                      <template #btn>
                        <m-btn-outlined
                          class="border-none flex items-center w-full justify-between"
                        >
                          <div
                            class="flex items-center gap-2 whitespace-nowrap"
                          >
                            <fa-icon hash="&#xf078" />
                            {{
                              selectedExpeditorToAllClients
                                ? getSelectedName(selectedExpeditorToAllClients)
                                : "Выбрать для всех одного"
                            }}
                          </div>
                        </m-btn-outlined>
                      </template>
                      <template #content>
                        <div class="overflow-auto font-normal">
                          <FilterItems
                            v-if="expeditors"
                            :data="expeditors"
                            :singleSelect="true"
                            :selectedItems="selectedExpeditorToAllClients"
                            @onSingleItemSelect="
                              onSelectExpeditorToAllClients($event)
                            "
                          />
                        </div>
                      </template>
                    </menu-btn>
                  </div>
                </div>
              </div>
            </th>
          </tr>
          <tr
            class="border-b border-[#E1E4E4]"
            v-for="data in employedExpeditors"
            :key="data"
          >
            <td class="p-2" v-for="key in headers" :key="key">
              <div class="fs-14 text-[#013636]" :style="{ width: key.thWidth }">
                {{ data[key.key] }}
              </div>
              <div v-if="key.key === 'expeditor'" class="w-full">
                <div v-if="data.employees.length">
                  <div
                    v-for="item in data.employees"
                    :key="item.employee_id"
                    class="w-full flex justify-end"
                  >
                    <menu-btn class="h-11 w-1/2 bg-lotion">
                      <template #btn>
                        <m-btn-outlined
                          class="border-grey flex items-center w-full gap-2"
                        >
                          <fa-icon hash="&#xf078" />

                          {{
                            item.employee_id
                              ? getSelectedName(item.employee_id)
                              : "Выбрать"
                          }}
                        </m-btn-outlined>
                      </template>
                      <template #content>
                        <div class="overflow-auto absoulte z-50">
                          <FilterItems
                            :data="expeditors"
                            :singleSelect="true"
                            :selectedItems="item.employee_id"
                            @onSingleItemSelect="
                              onSelectExpeditor(data, $event)
                            "
                          />
                        </div>
                      </template>
                    </menu-btn>
                  </div>
                </div>
                <div v-else class="w-full flex justify-end">
                  <menu-btn class="h-11 w-1/2 bg-lotion">
                    <template #btn>
                      <m-btn-outlined
                        class="border-grey flex items-center w-full gap-2"
                      >
                        <fa-icon hash="&#xf078" />
                        Выбрать

                      </m-btn-outlined>
                    </template>
                    <template #content>
                      <div class="overflow-auto absoulte z-50">
                        <FilterItems
                          :data="expeditors"
                          :singleSelect="true"
                          @onSingleItemSelect="onSelectExpeditor(data, $event)"
                        />
                      </div>
                    </template>
                  </menu-btn>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div @click="save" class="flex justify-end mt-2">
        <m-btn>Сохранить</m-btn>
      </div>
    </div>
    <div v-else>
      <Loading />
    </div>
  </div>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification";

// store
const clientsStore = useClientsStore("main");

// states
const router = useRouter();
const route = useRoute()
const expeditors = ref(null);
const employedExpeditors = ref(null);
const selectedExpeditorToAllClients = ref(null);

const headers = ref([
  {
    name: "Название клиента",
    checked: true,
    key: "client_name",
    thWidth: "250px",
    bRadius: "8px",
  },
  {
    name: "Экспедтор",
    checked: true,
    key: "expeditor",
    thWidth: "300px",
  },
]);

// methods
async function save() {
  await clientsStore.saveAttachClientsExpeditors(employedExpeditors.value);
  router.push("/clients/clients");
}

const expeditorsParams = ref({
  page: 1,
  page_size: 100,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

onMounted(async () => {
  if (!clientsStore.clientsIds.length > 0 && !route.query.clientId) {
    router.push("/clients/clients");
    notify({ title: "Сначала выберите клиента!", type: "error" });
    return;
  }
  let clientsIdsArr = clientsStore.clientsIds.length ? clientsStore.clientsIds : [route.query.clientId];
  [employedExpeditors.value, expeditors.value] = await Promise.all([
    clientsStore.getEmployedExpeditors(clientsIdsArr),
    clientsStore.getExpeditors(expeditorsParams.value),
  ]);
});

const getSelectedName = (expeditorId) => {
  if (expeditors.value) {
    const selectedExpeditor = expeditors.value.items?.find(
      (expeditor) => expeditor.id === expeditorId
    );
    return (
      selectedExpeditor?.first_name ||
      selectedExpeditor?.last_name ||
      selectedExpeditor?.middle_name
    );
  }
};

const onSelectExpeditor = (client, expeditorId) => {
  const employee = {
    employee_id: expeditorId,
    visit: [],
  };
  client.employees[0] = employee;
};

const onSelectExpeditorToAllClients = (expeditorId) => {
  selectedExpeditorToAllClients.value = expeditorId;
  const employee = {
    employee_id: expeditorId,
    visit: [],
  };

  employedExpeditors.value.forEach((expeditor) => {
    expeditor.employees[0] = employee;
  });
};
</script>
