<template>
  <div class="w-full flex flex-col">
    <div class="flex justify-between items-center">
      <div class="grid grid-cols-2 tab-btn">
        <button
          class="px-3 py-3 fs-14 fw-4 rounded-l-lg"
          @click="activeTab = activeTab !== 1 ? 1 : 0"
          :class="
            activeTab === 1
              ? 'text-white button-bg hover:bg-teal-600 active:bg-teal-700'
              : 'border-1 border border-color-primary'
          "
        >
          От А-Я
        </button>
        <button
          class="px-5 py-3 fs-14 fw-4 rounded-r-lg"
          @click="activeTab = activeTab !== 2 ? 2 : 0"
          :class="
            activeTab === 2
              ? 'text-white button-bg hover:bg-teal-600 active:bg-teal-700'
              : 'border-1 border border-color-primary border-l-0'
          "
        >
          От А-Я
        </button>
      </div>

      <div>
        <button
          class="rounded-lg px-[36px] py-[11px] bg-[#013636] text-[#FFFFFF]"
          @click="updateModalValue()"
        >
          Топ
        </button>
      </div>
    </div>

    <div class="border rounded-lg w-full h-[344px] mr-3 relative mt-6">
      <div class="absolute z-50 h-[55px] bg-[#fff] w-[93%] tara-search">
        <div class="mt-2 ml-[12px]">
          <search-input-border-none></search-input-border-none>
        </div>
      </div>
      <div class="w-[98%] h-full tara-content">
        <div class="mr-3 pt-[55px] h-full tara-content-item">
          <div
            v-for="(item, index) in loadData"
            :key="index"
            class="p-[10px] tara-child"
          >
            <div @click="item.checked = !item.checked" class="flex mt-1 check">
              <label>
                <input type="checkbox" />
                <span></span>
              </label>
              <div class="ml-[10px]">{{ item.name }}</div>
            </div>
            <div v-if="item.checked" class="check">
              <div
                v-for="(itemChild, itemIndex) in item.item"
                :key="itemIndex"
                class="flex"
              >
                <label>
                  <input type="checkbox" />
                  <span></span>
                </label>
                <div class="ml-[10px]">{{ itemChild.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-4 mb-4">
      <m-btn>Сохранить</m-btn>
    </div>
  </div>
  <transition name="modal">
    <div v-if="popUpIsOpen">
      <d-modal
        @closeDialog="onClosePopUp"
        :name="'Агент'"
        :dataContainerWidth="'618px'"
      >
        <ReportSaleTopButtonDialog />
      </d-modal>
    </div>
  </transition>
</template>

<script setup>
//state
const popUpIsOpen = ref(false);

const onClosePopUp = () => {
  popUpIsOpen.value = false;
};

const updateModalValue = () => {
  popUpIsOpen.value = !popUpIsOpen.value;
};

const activeTab = ref(1);

const loadData = ref([
  {
    name: "Coca cola",
  },
  {
    name: "Coca cola",
  },
  {
    name: "Coca cola",
  },
  {
    name: "Coca cola",
  },
  {
    name: "Coca cola",
  },
  {
    name: "Coca cola",
  },
  {
    name: "Coca cola",
  },
  {
    name: "Coca cola",
  },
]);
</script>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
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
.tara-content {
  overflow-y: scroll;
  cursor: pointer;
}
.tara-search {
  border-bottom: 1px solid #e1e4e4;
  border-top-left-radius: 8px;
}
.tara-content-item {
  border-right: 1px solid #e1e4e4;
}
.tara-child {
  border-bottom: 1px solid #e1e4e4;
}
</style>
