<template>
  <div>
    <div class="flex justify-between mt-4">
      <div><page-title :title="'Клиенты на карте'"></page-title></div>
      <div>
        <m-btn>
          <div
            @click="$router.push('/clients/customer-maps/customer-map')"
            class="flex"
          >
            <div><IconPrinter /></div>
            <div class="ml-2">Печать</div>
          </div>
        </m-btn>
      </div>
    </div>
    <div class="text-[#8FA0A0]">
      Отображено клиентов на карте ({{ filteredLocations?.length }})
    </div>
    <div class="w-full">
      <div class="grid h-[700px] w-full gap-2 relative">
        <div class="absolute top-14 left-8 rounded-lg bg-white box-shadow z-50">
          <div
            v-for="item in clients"
            :key="item"
            class="py-3 px-5 border-b border-[#E1E4E4]"
          >
            <div
              @click="item.isActive = !item.isActive"
              class="flex cursor-pointer"
            >
              <div v-if="!item.isActive" class="text-[18px] text-[#8FA0A0]">
                +
              </div>
              <div
                v-if="item.isActive"
                :class="[item.isActive ? 'tx' : '']"
                class="text-[18px] mt-[-5px] text-[#8FA0A0]"
              >
                -
              </div>
              <div
                :class="[item.isActive ? 'tx' : '']"
                class="fs-16 fw-5 pl-4 text-[#424F4F]"
              >
                {{ item.name }}
              </div>
              <div class="fs-16 fw-4 text-[#8FA0A0] pl-6">
                {{ item.amount }}
              </div>
            </div>
            <div v-if="item.isActive">
              <div
                v-for="agent in item.agents"
                :key="agent"
                class="pl-6 pt-2 pb-2"
              >
                <div
                  @click="agent.isActive = !agent.isActive"
                  class="flex cursor-pointer"
                >
                  <div v-if="!agent.isActive" class="text-[#8FA0A0]">+</div>
                  <div
                    v-if="agent.isActive"
                    :class="[agent.isActive ? 'tx' : '']"
                    class="text-[#8FA0A0] mt-[-5px]"
                  >
                    -
                  </div>
                  <div :class="[agent.isActive ? 'tx' : '']" class="ml-2 fs-14">
                    {{ agent.name }}
                  </div>
                </div>
                <div v-if="agent.isActive">
                  <div
                    v-for="day in agent.days"
                    :key="day"
                    class="pl-4 pt-2 pb-2"
                  >
                    <div
                      @click="day.isActive = !day.isActive"
                      class="flex cursor-pointer"
                    >
                      <div v-if="!day.isActive" class="text-[#8FA0A0]">+</div>
                      <div
                        v-if="day.isActive"
                        :class="[day.isActive ? 'tx' : '']"
                        class="text-[#8FA0A0] mt-[-5px]"
                      >
                        -
                      </div>
                      <div
                        :class="[day.isActive ? 'tx' : '']"
                        class="ml-2 fs-14"
                      >
                        {{ day.name }}
                      </div>
                    </div>
                    <div v-if="day.isActive">
                      <div
                        v-for="childItem in day.items"
                        :key="childItem"
                        class="pt-2 pb-2"
                      >
                        <div class="flex">
                          <div class="text-[#8FA0A0]"><IconLocation /></div>
                          <div class="ml-2 fs-14">{{ childItem.name }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="py-3 px-5 border-b border-[#E1E4E4]">
            <div @click="filter = !filter" class="flex cursor-pointer">
              <div v-if="!filter" class="text-[18px] text-[#8FA0A0]">+</div>
              <div
                v-if="filter"
                :class="[filter ? 'tx' : '']"
                class="text-[18px] mt-[-5px] text-[#8FA0A0]"
              >
                -
              </div>
              <div
                :class="[filter ? 'tx' : '']"
                class="fs-16 fw-5 pl-4 text-[#424F4F]"
              >
                Фильтры
              </div>
            </div>
            <div class="w-full" v-if="filter">
              <ClientsCustomerMapsFilterColumn />
            </div>
          </div>
          <div class="py-3 px-5 border-b border-[#E1E4E4]">
            <div @click="statistic = !statistic" class="flex cursor-pointer">
              <div v-if="!statistic" class="text-[18px] text-[#8FA0A0]">+</div>
              <div
                v-if="statistic"
                :class="[statistic ? 'tx' : '']"
                class="text-[18px] mt-[-5px] text-[#8FA0A0]"
              >
                -
              </div>
              <div
                :class="[statistic ? 'tx' : '']"
                class="fs-16 fw-5 pl-4 text-[#424F4F]"
              >
                Статистика
              </div>
            </div>
            <div v-if="statistic">
              <div
                v-for="item in clientMapsStore.data?.statistics"
                :key="item"
                class="flex justify-between py-1"
              >
                <div class="text-[#8FA0A0] fs-14">{{ item?.category }}</div>
                <div class="text-[#000000] fs-14 fw-5">{{ item?.count }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full h-full">
          <GMapMap
            class="w-full h-full"
            :center="{ lat: 41.311081, lng: 69.240562 }"
            :zoom="8"
            map-type-id="terrain"
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
            <gmap-info-window :content="'Info isjaoisja'" />
            <GMapMarker
              v-for="client in filteredLocations"
              :key="client.id"
              :position="client.lat_lng"
              :draggable="true"
              :clickable="true"
            >
            </GMapMarker>
          </GMapMap>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { notify } from "@kyvg/vue3-notification";

// store
const clientMapsStore = useClientsmappStore("main");

// region States
const statistic = ref(false);
const filter = ref(false);

const clients = ref([
  {
    name: "Агенты",
    amount: "354 из 1000",
    isActive: false,
    agents: [
      {
        name: "Тп николай",
        isActive: false,
        days: [
          {
            name: "Понедельник",
            isActive: false,
            items: [
              {
                name: "Qurbon ali",
              },
              {
                name: "Al faxriyoriy halol savdo",
              },
              {
                name: "Avaz + inom burger",
              },
              {
                name: "Do’kondi jinnisi",
              },
            ],
          },
          {
            name: "Вторник",
            isActive: false,
            items: [
              {
                name: "Qurbon ali",
              },
              {
                name: "Al faxriyoriy halol savdo",
              },
              {
                name: "Avaz + inom burger",
              },
              {
                name: "Do’kondi jinnisi",
              },
            ],
          },
          {
            name: "Среда",
            isActive: false,
            items: [
              {
                name: "Qurbon ali",
              },
              {
                name: "Al faxriyoriy halol savdo",
              },
              {
                name: "Avaz + inom burger",
              },
              {
                name: "Do’kondi jinnisi",
              },
            ],
          },
          {
            name: "Четверг",
            isActive: false,
            items: [
              {
                name: "Qurbon ali",
              },
              {
                name: "Al faxriyoriy halol savdo",
              },
              {
                name: "Avaz + inom burger",
              },
              {
                name: "Do’kondi jinnisi",
              },
            ],
          },
        ],
      },
      {
        name: "Тп Андрей",
        isActive: false,
        days: [
          {
            name: "Понедельник",
            isActive: false,
            items: [
              {
                name: "Qurbon ali",
              },
              {
                name: "Al faxriyoriy halol savdo",
              },
              {
                name: "Avaz + inom burger",
              },
              {
                name: "Do’kondi jinnisi",
              },
            ],
          },
          {
            name: "Вторник",
            isActive: false,
            items: [
              {
                name: "Qurbon ali",
              },
              {
                name: "Al faxriyoriy halol savdo",
              },
              {
                name: "Avaz + inom burger",
              },
              {
                name: "Do’kondi jinnisi",
              },
            ],
          },
          {
            name: "Среда",
            isActive: false,
            items: [
              {
                name: "Qurbon ali",
              },
              {
                name: "Al faxriyoriy halol savdo",
              },
              {
                name: "Avaz + inom burger",
              },
              {
                name: "Do’kondi jinnisi",
              },
            ],
          },
          {
            name: "Четверг",
            isActive: false,
            items: [
              {
                name: "Qurbon ali",
              },
              {
                name: "Al faxriyoriy halol savdo",
              },
              {
                name: "Avaz + inom burger",
              },
              {
                name: "Do’kondi jinnisi",
              },
            ],
          },
        ],
      },
      {
        name: "Тп Гайбулла ака",
        isActive: false,
        days: [
          {
            name: "Понедельник",
            isActive: false,
            items: [
              {
                name: "Qurbon ali",
              },
              {
                name: "Al faxriyoriy halol savdo",
              },
              {
                name: "Avaz + inom burger",
              },
              {
                name: "Do’kondi jinnisi",
              },
            ],
          },
          {
            name: "Вторник",
            isActive: false,
            items: [
              {
                name: "Qurbon ali",
              },
              {
                name: "Al faxriyoriy halol savdo",
              },
              {
                name: "Avaz + inom burger",
              },
              {
                name: "Do’kondi jinnisi",
              },
            ],
          },
          {
            name: "Среда",
            isActive: false,
            items: [
              {
                name: "Qurbon ali",
              },
              {
                name: "Al faxriyoriy halol savdo",
              },
              {
                name: "Avaz + inom burger",
              },
              {
                name: "Do’kondi jinnisi",
              },
            ],
          },
          {
            name: "Четверг",
            isActive: false,
            items: [
              {
                name: "Qurbon ali",
              },
              {
                name: "Al faxriyoriy halol savdo",
              },
              {
                name: "Avaz + inom burger",
              },
              {
                name: "Do’kondi jinnisi",
              },
            ],
          },
        ],
      },
    ],
  },
]);

onMounted(async () => {
  await clientMapsStore.getData();
});

const filteredLocations = computed(() => {
  return clientMapsStore.data?.clients?.map((client) => ({
    ...client,
    lat_lng: {
      lat: client.lat_lng.latitude,
      lng: client.lat_lng.longitude,
    },
  }));
});
</script>

<style scoped>
.box-shadow {
  box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.12);
}
.tx {
  color: #299b9b;
}
</style>
