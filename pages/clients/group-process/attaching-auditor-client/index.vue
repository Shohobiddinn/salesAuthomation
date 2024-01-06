<template>
  <div>
    <div v-if="auditors && employedAuditors">
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
        Прикперление и открепление аудиторов к клиентам
      </div>
      <div class="w-full overflow-auto bg-white rounded-[12px] border mt-4">
        <table
          class="w-full border border-[#E1E4E4] overflow-auto rounded-[12px] bg-white"
        >
          <tr class="border-b border-[#E1E4E4]">
            <th v-for="key in headers" :key="key">
              <div
                v-if="key.key === 'client_name'"
                class="fs-12 p-2 text-[#424F4F]"
              >
                {{ key.name }}
              </div>
              <div class="w-[200px] p-2 flex" v-if="key.key === 'employees'">
                <div class="flex items-center gap-2">
                  <div class="fs-12 text-gray-3">{{ key.name }}</div>
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
                            Выбрать для всех одного
                          </div>
                        </m-btn-outlined>
                      </template>
                      <template #content>
                        <div class="overflow-auto font-normal">
                          <FilterItems
                            v-if="auditors"
                            :data="auditors"
                            :selectedItems="selectedAuditorsToAllClients"
                            @onSelectItems="selectedAuditorsToAllClients = $event"
                            :maxSelectionLimit="3"
                          />
                        </div>
                      </template>
                    </menu-btn>
                  </div>
                </div>
              </div>
              <div class="p-2" v-if="key.key === 'visit'">
                <div class="flex items-center justify-center gap-2">
                  <div class="fs-12 text-[#424F4F]">{{ key.name }}</div>
                  <div class="flex">
                    <menu-btn class="h-11 w-full">
                      <template #btn>
                        <m-btn-outlined
                          class="border-none flex items-center w-full justify-between"
                        >
                          <div class="flex items-center gap-2">
                            <fa-icon hash="&#xf078" />
                            Указать для всех одинаковые дни
                          </div>
                        </m-btn-outlined>
                      </template>
                      <template #content>
                        <div class="overflow-auto font-normal">
                          <FilterItems
                            :data="weakDay"
                            :selectedItems="selectedDaysToAllClients"
                            @onSelectItems="selectedDaysToAllClients = $event"
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
            v-for="(data, index) in employedAuditors"
            :key="index"
          >
            <td class="p-2" v-for="key in headers" :key="key">
              <div
                v-if="key.key === 'client_name'"
                class="fs-14 text-[#013636]"
                :style="{ width: key.thWidth }"
              >
                {{ data[key.key] }}
              </div>
              <div v-if="key.key === 'employees'" class="flex gap-5 flex-col">
                <div
                  v-for="item in data?.employees"
                  class="w-full"
                  :key="item.client_id"
                >
                  <div class="w-full">
                    <div class="group w-full relative flex justify-between">
                      <menu-btn class="h-11 w-full">
                        <template #btn>
                          <m-btn-outlined
                            class="border-grey flex items-center w-full justify-between"
                          >
                            <div class="flex items-center gap-2">
                              <fa-icon hash="&#xf078" />
                              {{
                                item.employee_id
                                  ? getSelectedName(item.employee_id)
                                  : "Выбрать"
                              }}
                            </div>
                          </m-btn-outlined>
                        </template>
                        <template #content>
                          <div class="overflow-auto">
                            <FilterItems
                              :data="auditors"
                              :singleSelect="true"
                              :selectedItems="item.employee_id"
                              @onSingleItemSelect="item.employee_id = $event"
                            />
                          </div>
                        </template>
                      </menu-btn>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="key.key === 'visit'" class="flex gap-5 flex-col">
                <div
                  v-for="item in data?.employees"
                  :key="item"
                  class="flex items-center"
                >
                  <div class="w-9/10 flex gap-2 items-center justify-center">
                    <div
                      v-for="day in weakDay.items"
                      :key="day.id"
                      class="flex mt-2 check pt-1"
                    >
                      <div>
                        <label>
                          <input
                            @input="onSelectWorkingDay(item.visit, day.id)"
                            :checked="isWorkingDay(item.visit, day.id)"
                            type="checkbox"
                          />
                          <span></span>
                        </label>
                      </div>
                      <div class="pl-1 fs-12 text-[#013636]">
                        {{ day.name }}
                      </div>
                    </div>
                  </div>

                  <div class="w-1/10 flex justify-end">
                    <button
                      v-if="item.employee_id"
                      @click="removeEmployee(data, item.employee_id)"
                      class="a fw-6 p-0 m-0"
                    >
                      <IconTrash :size="'21'" />
                    </button>
                  </div>
                </div>
              </div>
            </td>
            <div
              v-if="data.employees.length < 3"
              class="my-2 flex items-center justify-center"
            >
              <button
                class="fs-14 h-11 border border-[#299B9B] rounded-lg px-6 p-2"
                @click="onAddEmployee(data)"
              >
                Добавить
              </button>
            </div>
          </tr>
        </table>
      </div>
      <div @click="onSave" class="flex justify-end mt-2">
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
const employedAuditors = ref(null);
const auditors = ref(null);
const selectedAuditorsToAllClients = ref([]);
const selectedDaysToAllClients = ref([]);

const auditorsParams = ref({
  page: 1,
  page_size: 100,
  search: null,
  order_by: {
    field: "created_date",
    is_asc: true,
  },
});

const headers = ref([
  {
    name: "Название клиента",
    checked: true,
    key: "client_name",
    thWidth: "200px",
    bRadius: "8px",
  },
  {
    name: "Аудитор",
    checked: true,
    key: "employees",
    thWidth: "550px",
  },
  {
    name: "Дни посещений",
    checked: true,
    key: "visit",
    thWidth: "550px",
  },
]);

const weakDay = ref({
  items: [
    {
      name: "Пн",
      id: "Monday",
      checked: false,
    },
    {
      name: "Вт",
      id: "Tuesday",
      checked: false,
    },
    {
      name: "Ср",
      id: "Wednesday",
      checked: false,
    },
    {
      name: "Чт",
      id: "Thursday",
      checked: false,
    },
    {
      name: "Пт",
      id: "Friday",
      checked: false,
    },
    {
      name: "Сб",
      id: "Saturday",
      checked: false,
    },
    {
      name: "Вс",
      id: "Sunday",
      checked: false,
    },
  ],
});

// methods
const onSave = async () => {
  await clientsStore.saveAttachClientsAuditors(employedAuditors.value);
  router.push("/clients/clients");
};

onMounted(async () => {
  if(!clientsStore.clientsIds.length > 0){
    router.push('/clients/clients')
    notify({title: 'Сначала выберите клиента!', type: 'error'})
    return
  }
  [employedAuditors.value, auditors.value] = await Promise.all([
    clientsStore.getEmployedAuditors(clientsStore.clientsIds),
    clientsStore.getAuditors(auditorsParams.value),
  ]);
});

const getSelectedName = (agentId) => {
  if (auditors.value) {
    const agent = auditors.value.items?.find((agent) => agent.id === agentId);
    return agent?.first_name || agent?.last_name || agent?.middle_name;
  }
};

const onAddEmployee = (client) => {
  client?.employees?.push({
    employee_id: "",
    visit: [],
  });
};

const removeEmployee = (client, employeeId) => {
  const employeeIdx = client.employees.findIndex(
    (employee) => employee.employee_id === employeeId
  );
  client.employees.splice(employeeIdx, 1);
};

const isWorkingDay = (visitDays, day) => {
  return visitDays.includes(day);
};

const onSelectWorkingDay = (visitDays, day) => {
  visitDays.push(day);
};

watchEffect(() => {
  if (selectedAuditorsToAllClients.value.length) {
    for (const employedAuditor of employedAuditors.value) {
      employedAuditor.employees = selectedAuditorsToAllClients.value.map(
        (agent) => ({
          employee_id: agent,
          visit: [],
        })
      );
    }
  }
});

watchEffect(() => {
  if (selectedDaysToAllClients.value.length) {
    for (const employedAuditor of employedAuditors.value) {
      employedAuditor.employees = employedAuditor.employees.map((employee) => ({
        ...employee,
        visit: selectedDaysToAllClients.value,
      }));
    }
  }
});
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
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
.check [type="checkbox"]:checked + span:before {
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
