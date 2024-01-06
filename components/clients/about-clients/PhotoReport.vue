<template>
  <div>
    <div class="text-[24px] fw-5">Фотоотчёты</div>
    <div v-if="photoReports" class="grid grid-cols-4 gap-4 mt-5">
      <div
        v-for="photo in photoReports"
        :key="photo"
        class="border rounded-lg h-[244px] relative"
      >
        <div class="flex justify-center h-full">
          <img
            :src="photo"
            alt="photo-report"
            class="w-full h-full object-cover rounded-lg cursor-pointer"
            @click="photo && (fullScreenImageUrl = photo)"
          />
          <button
            class="absolute bottom-[10px] rounded-lg py-1 px-5 w-4/5 h-9.5 bg-[#299B9B]"
          >
            <div
              class="flex w-full gap-2 text-white items-center justify-center"
            >
              <div class="mr-2">+</div>
              <div>Добавить в образец</div>
            </div>
          </button>
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center">
      <IconLoading :loading="true" :width="9" :height="9" />
    </div>
    <transition name="modal">
      <div v-if="fullScreenImageUrl">
        <FullScreenImage
          :imageUrl="fullScreenImageUrl"
          @closeImage="fullScreenImageUrl = null"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
// store
const clientsStore = useClientsStore("main");

// props
const props = defineProps({
  isActive: Boolean,
});

// state
const route = useRoute();
const photoReports = ref(null);
const fullScreenImageUrl = ref(null);

watchEffect(async () => {
  if (props.isActive) {
    photoReports.value = await clientsStore.getClientsPhotoReports(
      route.params.id
    );
  }
});
</script>

<style scoped></style>
