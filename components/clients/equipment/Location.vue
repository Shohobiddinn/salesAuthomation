<template>
  <div v-if="position" class="w-full">
    <GMapMap
      :center="position"
      :zoom="13"
      map-type-id="terrain"
      class="w-full h-[300px]"
    >
      <GMapCluster>
        <GMapMarker :position="position" :draggable="true" />
      </GMapCluster>
    </GMapMap>
    <div class="flex justify-between items-center border-t-1 pt-5">
      <m-btn @click="onShareLocation">Поделиться</m-btn>
      <cancel-btn @click="onCloseDialog">Закрить</cancel-btn>
    </div>
  </div>
  <div v-else>У клиента нет локации</div>
</template>

<script setup>
// props
const props = defineProps({
  location: Object,
});

// emits
const emit = defineEmits(["closeDialog"]);

// methods
const position = computed(() => {
  if (props.location && Object.keys(props.location).length > 0) {
    return { lat: props.location?.latitude, lng: props.location?.longitude };
  } else {
    return false;
  }
});

const onShareLocation = () => {
  const locationUrl = `https://www.google.com/maps/search/?api=1&query=${props.location?.latitude},${props.location?.longitude}`;
  const url = `https://t.me/share/url?url=${encodeURIComponent(locationUrl)}`;
  window.open(url);
};

const onCloseDialog = () => {
  emit("closeDialog");
};
</script>
