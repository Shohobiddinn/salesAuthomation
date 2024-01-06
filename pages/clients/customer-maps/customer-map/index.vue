<template>
  <div>
    <button
      @click="$router.push('/clients/customer-maps')"
      class="h-[44px] px-[46px] mt-4 bg-[#FFFFFF] text-black rounded-lg border"
    >
      <div class="flex">
        <IconArrowLeft class="mt-[5px] mr-[10px]"></IconArrowLeft>
        Назад
        <slot></slot>
      </div>
    </button>
    <div class="mt-4">
      <rounded-white-container>
        <div class="flex justify-between">
          <page-title :title="'Клиенты на карте'" />
          <div class="flex">
            <div>
              <div
                class="flex justify-self-end gap-6 items-center rounded-lg bg-[#F4F9F9] px-3 h-[44px] mr-4"
              >
                <div class="flex gap-2">
                  <input type="radio" name="item" />
                  <span class="text-gray-3 fs-14 fw-4"> Перечисление </span>
                </div>
                <div class="flex gap-2">
                  <input type="radio" name="item" />
                  <span class="text-gray-3 fs-14 fw-4"> Наличный сум </span>
                </div>
              </div>
            </div>
            <div>
              <m-btn>
                <div class="flex">
                  <div><IconPrinter /></div>
                  <div class="ml-2">Печать</div>
                </div>
              </m-btn>
            </div>
          </div>
        </div>
        <div class="w-full">
          <div class="grid h-[700px] rounded-lg w-full gap-2 mt-4 relative">
            <GMapMap
              :center="markerPosition"
              :zoom="7"
              map-type-id="terrain"
              style=""
              :ref="mapRef"
              @click="onMapClicked"
              :options="{
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: true,
                disableDefaultUi: false,
              }"
            >
              <GMapMarker
                key="mainMarker"
                :position="markerPosition"
                :draggable="true"
                :clickable="true"
              />
            </GMapMap>
          </div>
        </div>
      </rounded-white-container>
    </div>
    <div class="mt-4">
      <rounded-white-container>
        <div class="grid grid-cols-4 gap-4">
          <div v-for="i in 40" class="mt-4">
            <div class="fw-6 fs-16 leading-[22px]">
              Inomjom golden (OOO Kucharov)
            </div>
            <div class="fs-14 leading-[19px] fw-4 text-[#424F4F] mt-1">
              Агент: ТП Николай
            </div>
            <div class="fs-14 leading-[19px] fw-4 text-[#424F4F] mt-1">
              День посещения: Пн
            </div>
          </div>
        </div>
      </rounded-white-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { TerritoryModel } from "~/interfaces/api/territory-model";
import { notify } from "@kyvg/vue3-notification";

const data: Ref<TerritoryModel> = ref({
  id: undefined,
  name: "",
  lat: "",
  lon: "",
  is_active: true,
  region: {
    name: "",
    description: "",
  },
});

const mapRef = ref();

const markerPosition = ref({ lat: 41.311081, lng: 69.240562 });

// endregion

// region Stores

const territoriesActiveStore = useTerritoriesStore("true");
const territoriesInActiveStore = useTerritoriesStore("false");
const dialogStore = useDialogStore("territories");

// endregion

// region Methods and Hooks

const save = async () => {
  notify({ title: "Пожалуйста подождите!" });

  data.value.lat = markerPosition.value.lat.toString();
  data.value.lon = markerPosition.value.lng.toString();

  await territoriesActiveStore.add(data.value);

  await territoriesActiveStore.refresh();
  await territoriesInActiveStore.refresh();

  notify({ title: "Сохранено!" });

  await dialogStore.closeDialog();
};

const onMapClicked = (event: any) => {
  markerPosition.value = event.latLng.toJSON();
  data.value.lat = markerPosition.value.lat.toString();
  data.value.lon = markerPosition.value.lng.toString();
};

// onMounted(() => {
//   if (dialogStore.singleData !== null) {
//     data.value = dialogStore.singleData;
//     markerPosition.value = {lat: parseFloat(data.value.lat), lng: parseFloat(data.value.lon)}
//   }
// });

// endregion
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
