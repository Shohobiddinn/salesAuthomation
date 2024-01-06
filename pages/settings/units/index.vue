<template>
  <div>
    <RoundedWhiteContainer>
      <div class="grid grid-cols-2 justify-items-stretch w-full mb-4 items-center">
        <div>
          <span class="text-lg font-semibold"> 3. Единицы измерения </span>
        </div>
        <div class="justify-self-end">
          <m-btn @click="dialogStore.openDialog" class="justify-self-auto">
            Добавить единицы измерения
          </m-btn>
        </div>
      </div>
      <DoubleTab
        first-tab-name="Активный"
        second-tab-name="Не активный"
        @change="dataGet"
      >
        <template #first>
          <SettingsUnitsTableData />
        </template>
        <template #second>
          <SettingsUnitsTableData />
        </template>
      </DoubleTab>
    </RoundedWhiteContainer>
    <transition name="modal">
      <div v-if="dialogStore.isDialogOpen">
        <d-modal
          @closeDialog="dialogStore.closeDialog"
          :name="
            dialogStore?.singleData?.id
              ? 'Сохранить единицы измерения'
              : 'Добавить единицы измерения'
          "
        >
          <SettingsUnitsDataDialog />
        </d-modal>
      </div>
    </transition>
    <div class="linear-activity" v-if="detect">
      <div class="indeterminate"></div>
    </div>
    <loading-modal v-if="unitsStore.loading" name="Управление меню таблицы">
      <Loading />
    </loading-modal>
  </div>
</template>

<script setup lang="ts">
const dialogStore = useDialogStore("units");
const unitsStore = useUnitsStore("");
// Hooks
onMounted(() => {
  unitsStore.getData(true);
});

function dataGet(param: any) {
  if (param === 1) {
    unitsStore.getData(true);
  } else if (param === 2) {
    unitsStore.getData(false);
  }
}
const detect = ref(false);
</script>

<style scoped>
.linear-activity {
  overflow: hidden;
  width: 100%;
  height: 10px;
  background-color: #b3e5fc;
  margin: -24px auto 20px;
}

.determinate {
  position: relative;
  max-width: 100%;
  height: 100%;
  -webkit-transition: width 500ms ease-out 1s;
  -moz-transition: width 500ms ease-out 1s;
  -o-transition: width 500ms ease-out 1s;
  transition: width 500ms ease-out 1s;
  background-color: #03a9f4;
}

.indeterminate {
  position: relative;
  width: 100%;
  height: 100%;
}

.indeterminate:before {
  content: "";
  position: absolute;
  height: 100%;
  background-color: #03a9f4;
  animation: indeterminate_first 1.5s infinite ease-out;
}

.indeterminate:after {
  content: "";
  position: absolute;
  height: 100%;
  background-color: #4fc3f7;
  animation: indeterminate_second 1.5s infinite ease-in;
}

@keyframes indeterminate_first {
  0% {
    left: -100%;
    width: 100%;
  }
  100% {
    left: 100%;
    width: 10%;
  }
}

@keyframes indeterminate_second {
  0% {
    left: -150%;
    width: 100%;
  }
  100% {
    left: 100%;
    width: 10%;
  }
}
</style>
