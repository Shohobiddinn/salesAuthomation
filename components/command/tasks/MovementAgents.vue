<template>
  <div class="rounded-lg bg-white border-grey px-[2px]">
    <div class="flex mb-4 ml-4 flex-row gap-4 mt-4 items-center">
      <div @click="draggable = true">
        <i-btn>
          <IconColsSVG />
        </i-btn>
      </div>
      <SettingsRlpDiscountsTableCheckbox :headers="tasksStore.headers" />
      <div>
        <search-input @change="tasksStore.search" class="w-full h-38px" />
      </div>
      <div>
        <excel-btn :size="'340kb'"></excel-btn>
      </div>
    </div>
    <div class="w-full overflow-x-clip">
      <data-table
        :headers="tasksStore.headers"
        @sort="tasksStore.sortData"
        :sorted="tasksStore.params.order_by"
      >
        <template #body>
          <template v-for="data in tasksStore.data?.items" :key="data.id">
            <c-tr
              @click="openTr(data.id)"
              class="border-b-none b-bottom cursor-pointer"
            >
              <c-td v-for="key in tasksStore.headers" :key="key">
                <div v-if="key.key === 'file' || key.key === 'result_file'">
                  <div
                    class="text-[#299B9B]"
                    :class="data[key.key] && 'underline'"
                    @click="
                      data[key.key] && (fullScreenImageUrl = data[key.key])
                    "
                  >
                    {{ data[key.key] ? "Посмотреть" : "-" }}
                  </div>
                </div>
                <div
                  v-else-if="
                    key.key === 'created_date' || key.key === 'due_date'
                  "
                  class="py-3.5"
                >
                  {{ moment(data[key.key]).format("DD.MM.YY") }}
                </div>
                <div
                  v-else-if="key.key === 'status'"
                  class="mt-[-16px] mb-[-14px] py-3.5 relative"
                >
                  <button
                    class="rounded-lg bgy py-2 px-4"
                    :class="[
                      data?.status === 'Completed' && 'bgy',
                      data?.status === 'New' && 'bg-new',
                      data?.status === 'Accepted' && 'bg-accepted',
                      data?.status === 'Rejected' && 'bg-rejected',
                      data?.status === 'Closed' && 'bg-closed',
                      data?.status === 'Deleted' && 'bg-deleted',
                      data?.status === 'InProgress' && 'bg-deleted',
                    ]"
                    @click="onOpenStatusDropdown(data.id)"
                  >
                    <div class="flex gap-3">
                      <div
                        :class="changeStatus === data.id ? 'rotate-180' : ''"
                      >
                        <fa-icon hash="&#xf078" class="cursor-pointer transition" />
                      </div>
                      <div
                        class="text-[#BD7F06]"
                        v-if="data?.status === 'Completed'"
                      >
                        Выполнен
                      </div>
                      <div
                        class="text-[#23C00A]"
                        v-if="data?.status === 'Accepted'"
                      >
                        Принято
                      </div>
                      <div class="text-[#299B9B]" v-if="data?.status === 'New'">
                        Новый
                      </div>
                      <div
                        class="text-[#299B9B]"
                        v-if="data?.status === 'InProgress'"
                      >
                        В ходе выполнении
                      </div>
                      <div
                        class="text-[#D10505]"
                        v-if="data?.status === 'Rejected'"
                      >
                        Отклонён
                      </div>
                      <div
                        class="text-[#BD00DC]"
                        v-if="data?.status === 'Closed'"
                      >
                        Закрыто
                      </div>
                    </div>
                    <div
                      class="text-[#BD00DC]"
                      v-if="data?.status === 'Deleted'"
                    >
                      Удалённый
                    </div>
                  </button>
                  <div
                    v-if="changeStatus === data.id"
                    class="absolute right-14 z-50 bg-white rounded-lg py-5 px-4.5 border"
                  >
                    <div
                      class="flex items-center justify-center flex-col gap-5"
                    >
                      <div
                        v-if="
                          data.status === 'Accepted' ||
                          data.status === 'Completed'
                        "
                        class="w-full flex items-center gap-3.5"
                      >
                        <IconCheck
                          v-if="data?.status === 'Completed'"
                          :color="'#299B9B'"
                        />
                        <div
                          :class="
                            data?.status === 'Completed'
                              ? 'text-[#299B9B]'
                              : 'pl-10'
                          "
                          @click="
                            data.status !== 'Completed' &&
                              onChangeStatus(data.id, 'Completed')
                          "
                        >
                          Выполнен
                        </div>
                      </div>
                      <div
                        v-if="
                          data?.status === 'New' || data.status === 'Accepted'
                        "
                        class="w-full flex items-center gap-3.5"
                      >
                        <IconCheck
                          v-if="data?.status === 'Accepted'"
                          :color="'#299B9B'"
                        />
                        <div
                          :class="
                            data?.status === 'Accepted'
                              ? 'text-[#299B9B]'
                              : 'pl-10'
                          "
                          @click="
                            data.status !== 'Accepted' &&
                              onChangeStatus(data.id, 'Accepted')
                          "
                        >
                          Принято
                        </div>
                      </div>
                      <div
                        v-if="data.status === 'New'"
                        class="w-full flex items-center gap-3.5"
                      >
                        <IconCheck
                          v-if="data?.status === 'New'"
                          :color="'#299B9B'"
                        />
                        <div
                          :class="
                            data?.status === 'New' ? 'text-[#299B9B]' : 'pl-10'
                          "
                          @click="
                            data.status !== 'New' &&
                              onChangeStatus(data.id, 'New')
                          "
                        >
                          Новый
                        </div>
                      </div>
                      <div
                        v-if="data.status === 'Accpeted'"
                        class="w-full flex items-center gap-3.5"
                      >
                        <IconCheck
                          v-if="data?.status === 'InProgress'"
                          :color="'#299B9B'"
                        />
                        <div
                          :class="
                            data?.status === 'InProgress'
                              ? 'text-[#299B9B]'
                              : 'pl-10'
                          "
                          @click="
                            data.status !== 'InProgress' &&
                              onChangeStatus(data.id, 'InProgress')
                          "
                        >
                          В ходе выполнении
                        </div>
                      </div>
                      <div class="w-full flex items-center gap-3.5">
                        <IconCheck
                          v-if="data?.status === 'Rejected'"
                          :color="'#299B9B'"
                        />
                        <div
                          :class="
                            data?.status === 'Rejected'
                              ? 'text-[#299B9B]'
                              : 'pl-10'
                          "
                          @click="
                            data.status !== 'Rejected' &&
                              onChangeStatus(data.id, 'Rejected')
                          "
                        >
                          Отклонён
                        </div>
                      </div>
                      <div class="w-full flex items-center gap-3.5">
                        <IconCheck
                          v-if="data?.status === 'Deleted'"
                          :color="'#299B9B'"
                        />
                        <div
                          :class="
                            data?.status === 'Deleted'
                              ? 'text-[#299B9B]'
                              : 'pl-10'
                          "
                          @click="
                            data.status !== 'Deleted' &&
                              onChangeStatus(data.id, 'Deleted')
                          "
                        >
                          Удалённый
                        </div>
                      </div>
                      <div class="w-full flex items-center gap-3.5">
                        <IconCheck
                          v-if="data?.status === 'Closed'"
                          :color="'#299B9B'"
                        />
                        <div
                          :class="
                            data?.status === 'Closed'
                              ? 'text-[#299B9B]'
                              : 'pl-10'
                          "
                          @click="
                            data.status !== 'Closed' &&
                              onChangeStatus(data.id, 'Closed')
                          "
                        >
                          Закрыто
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="py-3.5">
                  {{ data[key.key] }}
                </div>
              </c-td>
              <c-td>
                <div class="custom-shadow py-3.5 px-2">
                  <div
                    @click="tasksStore.editDialog = data.id"
                    class="flex justify-start"
                  >
                    <IconEdit />
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
          :current-size="tasksStore.params.page_size"
          @setPageSize="tasksStore.setPageSize"
        />
      </div>
      <div class="p-3">
        <page-index
          :available-pages="tasksStore.data?.total_pages"
          :current-page="tasksStore.data?.page_number"
          @setPage="tasksStore.setPage"
        />
      </div>
    </div>
  </div>
  <transition name="modal">
    <div v-if="draggable">
      <d-modal @closeDialog="draggableDialog" :name="'Управление меню таблицы'">
        <drag-and-drop
          :templates="tasksStore.headers"
          @change="onChangeTableHeaders"
        />
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="props.addTask || tasksStore.editDialog">
      <d-modal
        @closeDialog="closeAddTaskDialog"
        :name="props.addTask ? 'Добавить задачи' : 'Изменить задачи'"
      >
        <CommandTasksAddTaskDialog @closeDialog="closeAddTaskDialog" />
      </d-modal>
    </div>
  </transition>
  <transition name="modal">
    <div v-if="fullScreenImageUrl">
      <FullScreenImage
        :imageUrl="fullScreenImageUrl"
        @closeImage="fullScreenImageUrl = false"
      />
    </div>
  </transition>
  <transition name="modal">
    <div v-if="tasksStore.changeStatus.id">
      <d-modal
        @closeDialog="tasksStore.closeChangeStatusDiaog"
        :name="`Вы уверены что хотите изменить статус задачи на ${
          tasksStore.changeStatus.status === 'Completed' ? 'Выполнен' : ''
        } ${tasksStore.changeStatus.status === 'New' ? 'Новый' : ''} ${
          tasksStore.changeStatus.status === 'Accepted' ? 'Принять' : ''
        } ${
          tasksStore.changeStatus.status === 'InProgress'
            ? 'В ходе выполнении'
            : ''
        } ${tasksStore.changeStatus.status === 'Deleted' ? 'Удалённый' : ''} ${
          tasksStore.changeStatus.status === 'Closed' ? 'Закрыто' : ''
        } ${tasksStore.changeStatus.status === 'Rejected' ? 'Отклонён' : ''}?`"
      >
        <CommandTasksChangeTaskStatusDialog
          @onAcceptChangeStatus="
            onAcceptChangeStatus(tasksStore.changeStatus.id, $event)
          "
        />
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
import moment from "moment";
// store
const tasksStore = useTasksStore("main");

// props
const props = defineProps({
  addTask: Boolean,
});

const emit = defineEmits(["closeAddTaskDialog"]);

// State
const draggable = ref(false);
const changeStatus = ref(false);
const fullScreenImageUrl = ref(false);

// Methods
function closeAddTaskDialog() {
  emit("closeAddTaskDialog", false);
  tasksStore.editDialog = "";
}

function draggableDialog() {
  draggable.value = false;
}

const assignmentTr = ref({
  isActive: false,
  index: false,
});

function openTr(index) {
  assignmentTr.value.isActive = !assignmentTr.value.isActive;
  assignmentTr.value.index = index;
}

const onChangeTableHeaders = (value) => {
  tasksStore.headers = value;
  draggableDialog();
};

const onOpenStatusDropdown = (taskId) => {
  if (taskId === changeStatus.value) {
    changeStatus.value = false;
  } else {
    changeStatus.value = taskId;
  }
};

const onChangeStatus = (taskId, statusType) => {
  tasksStore.changeStatus.id = taskId;
  tasksStore.changeStatus.status = statusType;
  changeStatus.value = false;
};

const onAcceptChangeStatus = async (taskId, comment) => {
  await tasksStore.onChangeStatus(taskId, comment);
};

onMounted(async () => {
  await tasksStore.getData();
});
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
  bottom: 20px;
  top: 20px;
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
.bg-rejected {
  background: rgba(209, 5, 5, 0.1);
}
.bg-closed {
  background: rgba(189, 0, 220, 0.1);
}
.bg-deleted {
  background: rgba(220, 53, 0, 0.1);
}
.custom-shadow {
  box-shadow: -4px 0px 4px rgba(0, 0, 0, 0.04);
}
</style>
