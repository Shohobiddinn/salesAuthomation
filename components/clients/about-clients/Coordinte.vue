<template>
  <div>
    <div class="text-[24px] fw-5 mb-3">Координаты</div>
    <div v-if="locationHistoryData" class="flex gap-6">
      <div
        class="flex justify-center items-center h-[495px]"
        :class="locationHistoryData.length ? 'w-[80%]' : 'w-full'"
      >
        <GMapMap
          :center="showingPosition || { lat: 41.311081, lng: 69.240562 }"
          :zoom="13"
          map-type-id="terrain"
          class="w-full h-full"
        >
          <GMapCluster v-if="showingPosition">
            <GMapMarker :position="showingPosition" :draggable="true" />
          </GMapCluster>
        </GMapMap>
      </div>
      <div v-if="locationHistoryData.length" class="w-[20%]">
        <div class="settings-content-item border">
          <div
            v-for="menu in locationHistoryData"
            :key="menu"
            class="settings-sidebar"
            :class="{
              activeColor:
                isSelected.isActive && isSelected.date === menu?.for_date,
            }"
          >
            <div @click="onSelectLocation(menu?.for_date)">
              {{ getFormattedDate(menu?.for_date) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full flex justify-center items-center">
      <icon-loading :loading="true" :width="14" :height="14" />
    </div>
  </div>
</template>

<script setup>
import moment from "moment";

// store
const clientsStore = useClientsStore("main");

// props
const props = defineProps({
  isActive: Boolean,
});

// state
const route = useRoute();
const clientId = ref(null);
const locationHistoryData = ref(null);
const showingPosition = ref(null);

const isSelected = ref({
  isActive: false,
  date: "",
});

// methods
const getClientLocationHisotry = async () => {
  locationHistoryData.value = await clientsStore.getClientLocationHisotry(
    clientId.value
  );
};

watchEffect(async () => {
  if (props.isActive) {
    clientId.value = route.params.id;
  }
});

watchEffect(async () => {
  if (clientId.value) {
    await getClientLocationHisotry();
    onSelectLocation();
  }
});

const getLocationByDate = (date) => {
  if (locationHistoryData.value && date) {
    return locationHistoryData.value.find(
      (locationData) => locationData.for_date === date
    )?.lat_lng;
  }
};

function onSelectLocation(date = locationHistoryData.value[0]?.for_date) {
  isSelected.value.isActive = true;
  isSelected.value.date = date;

  const location = getLocationByDate(date);
  if (location) {
    showingPosition.value = {
      lat: location?.latitude,
      lng: location?.longitude,
    };
  }
}

const getFormattedDate = (date) => {
  return date && moment(date).format("YYYY-MM-DD");
};
</script>
