<template>
  <div
    v-click-outside="clickOutside"
    class="rounded-lg bg-white border-grey px-[2px]"
  >
    <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <table-filter :templates="clientStore.templates"></table-filter>
      <div>
        <search-input @change="clientStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="w-full overflow-auto">
      <data-table
        :headers="clientStore.templates"
        :check="isAllTableChecked"
        @getAllId="getAllClientsId()"
      >
        <template #body>
          <template
            v-for="(data, index) in clientStore.data?.items"
            :key="index"
          >
            <c-tr class="border-b-none b-bottom cursor-pointer">
              <c-td v-for="key in clientStore.templates" :key="key">
                <div class="pt-2 check" v-if="key.key === 'checkbox'">
                  <label>
                    <input
                      type="checkbox"
                      :id="data.id"
                      :checked="isTableChecked(data.id)"
                      @change="onSelectAgent(data.id)"
                    />
                    <span></span>
                  </label>
                </div>
                <div
                  v-if="
                    key.checked &&
                    (key.key === 'name' || key.key === 'company_name')
                  "
                >
                  <nuxt-link
                    :to="`/clients/about-clients/${data.id}`"
                    class="underline"
                  >
                    {{ data[key.key] }}
                  </nuxt-link>
                </div>
                <div v-else-if="key.checked && key.key === 'agents'">
                  <div v-for="agent in data[key.key]" :key="agent.employee_id">
                    {{agent.employee_name}}
                  </div>
                </div>
                <div v-else-if="key.checked && key.key === 'visit_days'">
                  <div v-for="agent in data?.agents" :key="agent.employee_id" class="flex gap-2">
                    <span v-for="day in agent?.visit_days" :key="day">
                      {{day}}
                    </span>
                  </div>
                </div>
                <div v-else-if="key.key === 'is_active'">
                  {{ data[key.key] ? "Активный" : "Не активный" }}
                </div>
                <div v-else>
                  {{ data[key.key] }}
                </div>
              </c-td>
              <c-td>
                <div
                  :key="index"
                  @click="openDropdown(index)"
                  class="relative drop td-shadow py1"
                >
                  <div
                    :key="index"
                    class="cursor-pointer flex justify-center w-[30px] pl-2 py-[6px]"
                  >
                    <svg
                      width="3"
                      height="17"
                      viewBox="0 0 3 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.5 3C2.32842 3 2.99999 2.32843 2.99999 1.5C2.99999 0.671573 2.32842 0 1.5 0C0.671572 0 0 0.671573 0 1.5C0 2.32843 0.671572 3 1.5 3Z"
                        fill="#424F4F"
                      />
                      <path
                        d="M1.5 10C2.32843 10 3 9.32843 3 8.5C3 7.67157 2.32843 7 1.5 7C0.671573 7 0 7.67157 0 8.5C0 9.32843 0.671573 10 1.5 10Z"
                        fill="#424F4F"
                      />
                      <path
                        d="M1.49999 17C2.32841 17 2.99998 16.3284 2.99998 15.5C2.99998 14.6716 2.32841 14 1.49999 14C0.671568 14 0 14.6716 0 15.5C0 16.3284 0.671568 17 1.49999 17Z"
                        fill="#424F4F"
                      />
                    </svg>
                  </div>
                  <div
                    :key="index"
                    :class="{
                      'active-down': td.isActive && td.index === index,
                    }"
                    class="bg-white bottom-[0px] down rounded-lg z-50 w-[170px] border right-[44px] absolute"
                  >
                    <div class="m-3">
                      <div
                        @click="editClient(data.id)"
                        class="flex cursor-pointer"
                      >
                        <div><IconEdit /></div>
                        <div class="fs-12 text-[#299B9B] ml-2 mt-1">
                          Редактрировать
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </c-td>
            </c-tr>
          </template>
        </template>
      </data-table>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex p-3 gap-2 items-center">
        <span class="secondary-gray-text fs-14"> Показать по </span>
        <page-size-btn
          :current-size="clientStore.params.page_size"
          @setPageSize="clientStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="clientStore.data?.total_pages"
          :current-page="clientStore.data?.page_number"
          @setPage="clientStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          @change="onChangeTableHeaders"
          :templates="clientStore.templates"
        ></drag-and-drop>
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
// store
const clientStore = useClientsStore("main");

// State
const draggable = ref(false);
const router = useRouter();
const isAllTableChecked = ref(false);

const td = reactive({
  isActive: false,
  index: -1,
});

// Methods
const draggableDialog = () => {
  draggable.value = false;
};

const onChangeTableHeaders = (param) => {
  clientStore.templates = param;
  draggable.value = false;
};

const openDropdown = (index) => {
  td.isActive = !td.isActive;
  td.index = index;
};

const clickOutside = () => {
  td.isActive = false;
};

const editClient = (id) => {
  router.push({ path: "/clients/clients/create-clients", query: { id: id } });
};

onMounted(async () => {
  await clientStore.getData();
});

const getAllClientsId = () => {
  isAllTableChecked.value = !isAllTableChecked.value;
  if (isAllTableChecked.value) {
    clientStore.clientsIds = clientStore.data?.items.map((agent) => agent.id);
  } else {
    clientStore.setNullMultipleDialog();
  }
};

const isTableChecked = (agentId) => {
  return clientStore.clientsIds.find((id) => agentId === id);
};

const onSelectAgent = (agentId) => {
  if (!isTableChecked(agentId)) {
    clientStore.clientsIds.push(agentId);
  } else {
    clientStore.clientsIds = clientStore.clientsIds.filter(
      (id) => id !== agentId
    );
  }
};

const getAgentsVisitDays = (agent) => {
  return agent?.visit_days
}
</script>

<style scoped>
.down {
  display: none;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
.active-down {
  display: block;
  background-color: white;
}
.down:after {
  position: absolute;
  content: "";
  right: -11px;
  top: 6px;
  border-left: 15px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
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
.b-bottom:last-child {
  border-bottom: 1px solid #e1e4e4;
}
.b-top-none {
  border-top: none;
}
.bgy {
  background: rgba(189, 127, 6, 0.1);
}
.bg-accepted {
  background: rgba(35, 192, 10, 0.1);
}
.bg-new {
  background: rgba(41, 155, 155, 0.1);
}
.td-shadow {
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.04);
  cursor: pointer;
}
</style>
