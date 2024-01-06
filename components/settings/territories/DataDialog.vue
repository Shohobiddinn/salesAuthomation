<template>
  <form id="app" class="w-full h-[400px]" @submit="save">
    <div class="grid gap-4 grid-cols-1 w-full h-full">
      <div class="grid w-full gap-2 grid-cols-2 h-full">
        <div class="flex flex-col h-full justify-between">
          <d-input
            placeholder="Введите"
            class="w-full h-11"
            type="text"
            title="Названия"
            :required="true"
            :value="data.name"
            @change="(value) => (data.name = value)"
          />
          <flex-col class="gap-2">
            <div class="flex-row">
              <div class="text-gray-3 fs-12 fw-4 mt-3">
                Регион <span class="text-red-3 fs-14">*</span>
              </div>
            </div>
            <menu-btn class="h-11 w-full">
              <template #btn>
                <m-btn-outlined
                  @click="getRegions"
                  class="border-grey flex items-center w-full gap-2"
                >
                  <fa-icon hash="&#xf078" />
                  {{
                    data.region_id
                      ? getSelectedName(data.region_id, "regions")
                      : "Выбрать"
                  }}
                </m-btn-outlined>
              </template>
              <template #content>
                <div class="overflow-auto h-44 w-56">
                  <FilterItems
                    :data="regions"
                    :singleSelect="true"
                    :selectedItems="data.region_id"
                    @onSingleItemSelect="data.region_id = $event"
                    @onLoadElse="onLoadElseRegions"
                  />
                </div>
              </template>
            </menu-btn>
            <small v-show="isRegionUnSelected" class="text-red-3 fs-12"
              >Это обязательно поле *</small
            >
          </flex-col>
          <div
            class="flex flex-col mt-2 items-center justify-between w-full gap-2 h-1/4"
          >
            <div class="flex flex-row items-center gap-2 w-full">
              <span class="text-gray-3 fs-14 fw-4"> Aктивный  </span>
              <label class="switch">
                <input v-model="data.is_active" type="checkbox" />
                <span class="slider round"></span>
              </label>
            </div>
            <m-btn v-if="!data.id" class="w-full" type="submit">
              Добавить
            </m-btn>
            <m-btn v-else class="w-full" type="submit"> Сохранить </m-btn>
          </div>
        </div>
        <div class="h-70 w-full gap-2">
          <GMapMap
            :center="markerPosition"
            :zoom="7"
            map-type-id="terrain"
            style="height: 400px"
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
    </div>
  </form>
</template>

<script setup lang="ts">
import { TerritoryModel } from "~/interfaces/api/territory-model";
import { AppResponse } from "~~/interfaces/api/app-response";
import { RegionModel } from "~~/interfaces/api/region-model";
import { notify } from "@kyvg/vue3-notification";

// Store
const territoriesStore = useTerritoriesStore("");
const dialogStore = useDialogStore("territories");

// State
const data: Ref<TerritoryModel> = ref({
  id: undefined,
  name: "",
  lat_lng: {
    latitude: "41.311081",
    longitude: "69.240562",
  },
  is_active: true,
  region_id: "",
});
const mapRef = ref();
const markerPosition = ref({ lat: 41.311081, lng: 69.240562 });
const isRegionUnSelected = ref(false);
const regions: Ref<AppResponse<RegionModel> | undefined> = ref();
  const regionsParams = ref({
  page: 1,
  page_size: 10,
  search: null,
  order_by: {
    field: "id",
    is_asc: true,
  },
  filter: [
    {
      field: "is_active",
      value: ["true"],
    },
  ],
});

// Methods
const save = async (e: any) => {
  e.preventDefault();
  if (!data.value.region_id) {
    isRegionUnSelected.value = true;
    return;
  }
  if (data.value.name !== "") {
    data.value.lat = markerPosition.value.lat.toString();
    data.value.lon = markerPosition.value.lng.toString();
    await territoriesStore.add(data.value);
    await territoriesStore.refresh();
    dialogStore.closeDialog();
    notify({ title: "Сохранено!" });
  }
};

const onMapClicked = (event: any) => {
  markerPosition.value = event.latLng.toJSON();
  data.value.lat_lng.latitude = markerPosition.value.lat.toString();
  data.value.lat_lng.longitude = markerPosition.value.lng.toString();
};

const getRegions = async () => {
  if (!regions.value) {
    regions.value = await territoriesStore.getRegions(
      regionsParams.value
    );
  }
  isRegionUnSelected.value = true;
};

const getSelectedName = (selectedId: any, state: string) => {
  if (state === "regions" && regions.value) {
    isRegionUnSelected.value = false;
    return (
      regions.value.items?.find((region) => region.id === selectedId)?.name ||
      "---"
    );
  } else return;
};

const onLoadElseRegions = async () => {
  regionsParams.value.page_size += 10;
  regions.value = await territoriesStore.getRegions(regionsParams.value);
};

// Hooks
onMounted(async () => {
  if (dialogStore.singleData !== null) {
    const { id, is_active, lat, lon, name, region } = dialogStore.singleData;
    data.value.id = id
    data.value.is_active = is_active;
    data.value.name = name;
    data.value.lat_lng.latitude, markerPosition.value.lat = parseFloat(lat?.replace(',', '.'));
    data.value.lat_lng.longitude, markerPosition.value.lng = parseFloat(lon?.replace(',', '.'));
    await getRegions();
    data.value.region_id = region.id;
  }
});
</script>

<style scoped>
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
</style>
