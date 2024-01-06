<template>
  <div>
    <div
        class="rounded-lg bg-white border-grey px-[2px]"
    >
      <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
        <div @click="draggable = true">
          <i-btn>
            <IconColsSVG />
          </i-btn>
        </div>
        <SettingsRlpDiscountsTableCheckbox
            :headers="headers"
        ></SettingsRlpDiscountsTableCheckbox>
        <div>
          <search-input
              :value="searchText"
              @updated="searchUpdated"
              class="w-full h-38px"
          />
        </div>
        <div>
          <excel-btn :size="'340kb'"></excel-btn>
        </div>
      </div>
      <div class="w-full overflow-auto">
        <data-table
            :headers="reportWarehouses.templates"
            :CreateConfiguration="CreateConfiguration"
            @sort="sortData"
            :sorted="sortedData"
        >
          <template #body>
            <template v-for="(data, index) in reportWarehouses.data?.items" :key="index">
              <c-tr
                  @click="openTr(index)"
                  class="border-b-none b-bottom cursor-pointer border-y-1"
              >
                <c-td-no-edit
                    v-for="key in reportWarehouses.templates"
                    :key="key"
                    :class="key.key === 'stockEnough' ? 'bg-new border-x-1' : ''"
                >
                  <div
                      class="py-1"
                      v-if="key.checked && key.key !== 'stockEnough'"
                  >
                    {{ data[key.key] }}
                  </div>
                  <div
                      class="p-1"
                      v-if="key.checked && key.key === 'stockEnough'"
                  >
                    {{ data[key.key] }}
                  </div>
                </c-td-no-edit>
              </c-tr>
            </template>
          </template>
        </data-table>
      </div>
      <div class="flex justify-between w-full">
        <div class="flex p-3 gap-2 items-center">
          <span class="secondary-gray-text fs-14"> Показать по </span>
          <page-size-btn :current-size="filters.pageSize" @setPageSize="setPageSize" />
        </div>
        <div class="p-3">
          <page-index
              :available-pages="reportWarehouses.data?.total_pages"
              :current-page="reportWarehouses.data?.page_number"
              @setPage="setPage"
          />
        </div>
      </div>
    </div>
  </div>
<!--  <transition name="modal">-->
<!--    <div v-if="draggable">-->
<!--      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">-->
<!--        <drag-and-drop></drag-and-drop>-->
<!--      </d-modal>-->
<!--    </div>-->
<!--  </transition>-->
<!--  <transition name="modal">-->
<!--    <div v-if="addTask">-->
<!--      <d-modal @closeDialog="addTaskDialog" :name="'Добавить задачи'">-->
<!--        <CommandTasksAddTaskDialog></CommandTasksAddTaskDialog>-->
<!--      </d-modal>-->
<!--    </div>-->
<!--  </transition>-->
<!--  <transition name="modal">-->
<!--    <div v-if="changeStatus">-->
<!--      <d-modal-->
<!--        @closeDialog="changeStatusDialog"-->
<!--        :name="'Вы уверены что хотите изменить статус задачи на Принят?'"-->
<!--      >-->
<!--        <CommandTasksChangeTaskStatusDialog></CommandTasksChangeTaskStatusDialog>-->
<!--      </d-modal>-->
<!--    </div>-->
<!--  </transition>-->
</template>

<script setup>
// State
const props = defineProps({
  reportWarehouses:Object,
  filters:Object
})
const emit = defineEmits(['setPageSize', 'setPage'])
const searchText = ref("");
const availablePages = ref(28);
let currentPage = ref(1);
let pageSize = ref(10);
const draggable = ref(false);
// Methods
// const dataContainerWidth = ref("1140px");
// const changeStatus = ref(false);
// function changeStatusDialog() {
//   changeStatus.value = false;
// }
// const addTask = ref(false);
// function addTaskDialog() {
//   addTask.value = false;
// }
function draggableDialog() {
  draggable.value = false;
}
const CreateConfiguration = ref({
  isCreate: true,
  isNoCreate: false,
});
const assignmentTr = ref({
  isActive: false,
  index: false,
});
function openTr(index) {
  assignmentTr.value.isActive = !assignmentTr.value.isActive;
  assignmentTr.value.index = index;
}

let sortedData = ref({ key: "", mode: "" });

// Methods
function searchUpdated(text) {
  console.log(text);
}

function sortData(data) {
  sortedData.value = data;
}

function setPage(index) {
  emit('setPage',index)
}

function setPageSize(size) {
  emit('setPageSize',size)
}

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
.b-bottom:last-child {
  border-bottom: 1px solid #e1e4e4;
}
.bg-new {
  background: rgba(35, 192, 10, 0.1);
}
</style>
