<template>
  <div>
    <RoundedWhiteContainer>
      <div
        class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center"
      >
        <div>
          <span class="text-lg font-semibold">
            30. Настройка избранных страниц
          </span>
        </div>
      </div>
      <div class="flex justify-between mb-4">
        <div class="flex">
          <div class="mt-2 fs-14">Изменить вид</div>
          <div
            class="ml-3 w-[223px] rounded-lg bg-[#F4F9F9] flex justify-around"
          >
            <div class="mt-2">
              <input
                @input="filterList(1)"
                class="mt-1"
                type="radio"
                v-model="count"
                value="1"
              />
            </div>
            <label class="mt-2 fs-14" for="">Лист</label>
            <div class="mt-2">
              <input
                @input="filterList(2)"
                class="mt-1"
                type="radio"
                v-model="count"
                value="2"
              />
            </div>
            <label class="mt-2 fs-14" for="">Слайдер</label>
          </div>
        </div>
        <div class="flex justify-end">
          <m-btn @click="dialogStore.openDialog" class="justify-self-auto">
            Добавиить страницу
          </m-btn>
        </div>
      </div>
      <DoubleTab first-tab-name="Активный" second-tab-name="Не активный">
        <template #first>
          <SettingsSettingsFovoritePageActiveData />
        </template>
        <template #second>
          <SettingsSettingsFovoritePageActiveData />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal
          @closeDialog="dialogStore.closeDialog"
          :name="dialogStore.singleData ? 'Редактировать страницу\n' : 'Добавить страницу\n'"
        >
          <SettingsSettingsFovoritePageFovoritPageDialogBody
            @iconE="iconE"
            :iconName="iconName"
          />
        </d-modal>
      </div>
    </transition>
    <transition name="modal">
      <div v-if="icon">
        <data-model-two @closeDialog="iconDialog" :name="'Выберите иконку'">
          <div class="relative">
            <SettingsSettingsFovoritePageChooseIcon @addIcon="addIcon" />
          </div>
        </data-model-two>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useCountStore } from "~/stores/settings";
const dialogStore = useDialogStore("favorite");
const fovoritePageModal = ref(false);
const countStore = useCountStore();
const count = ref(countStore.filtersList);
const first = ref(null);
// Methods
function fovoritePageDialog() {
  fovoritePageModal.value = false;
}
const icon = ref(false);
function iconE(param) {
  param.icon = !param.icon;
  icon.value = param.icon;
  if (icon.value) {
    fovoritePageModal.value = false;
  }
}
function filterList(param) {
  countStore.filterListFn(param);
}
// Methods
function iconDialog() {
  icon.value = false;
  if (icon.value === false) {
    fovoritePageModal.value = true;
  }
}
const iconName = ref([]);
function addIcon(param) {
  iconName.value.push(param);
  console.log(param);
}
</script>

<style scoped>
input[type="radio"] {
  /* ...existing styles */
  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #299b9b;
  border: 1px solid #cccccc;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--form-control-color);
}
input[type="radio"]:checked::before {
  transform: scale(1);
}
</style>
