<template>
  <div>
    <RoundedWhiteContainer>
      <div class="grid gap-5">
        <div
          class="flex justify-between items-center fw-6 fs-16 border-1 rounded-lg pt-2 pb-4 px-4 bg-input"
        >
          <div>Параметр список</div>

          <div>
            <m-btn @click="changeDialogValue()" class="justify-self-auto">
              Добавить
            </m-btn>
          </div>
        </div>

        <hr class="-mx-4" />

        <div
          class="flex justify-between items-center fw-6 fs-16 border-1 rounded-lg pt-2 pb-4 px-4 bg-input"
        >
          <div>Параметр текст</div>

          <div class="justify-self-end">
            <m-btn @click="changeDialogValue()" class="justify-self-auto">
              Добавить
            </m-btn>
          </div>
        </div>
      </div>
    </RoundedWhiteContainer>
    <transition name="modal">
      <div v-if="popUpIsOpen">
        <d-modal @closeDialog="onClosePopUp" name="Добавить">
          <AuditSettingsAdditionalOptionsDataDialog />
        </d-modal>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const popUpIsOpen = ref(false);

//methods

const onClosePopUp = () => {
  popUpIsOpen.value = false;
};

const changeDialogValue = () => {
  popUpIsOpen.value = !popUpIsOpen.value;
};
</script>
