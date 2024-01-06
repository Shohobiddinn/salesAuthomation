<template>
  <div class="flex">
    <div class="settingsSidebireContent" v-if="active">
      <div class="settings-content-item">
        <nuxt-link
          :to="'/audit/settings' + menu.url"
          class="settings-sidebar flex"
          :class="{ activeColor: $route.name === 'audit-' + menu.nameEng }"
          v-for="menu in auditMenu"
          :key="menu"
        >
          {{ menu.name }}
        </nuxt-link>
      </div>
    </div>
    <div class="q-pa-md" :class="active ? 'table-container' : ''">
      <NuxtPage></NuxtPage>
    </div>
  </div>
</template>

<script>
import { Sidebars } from "~/variable/sidebar";

export default {
  setup() {
    const { auditMenu } = Sidebars();
    const { fullWindowLocations } = Sidebars();
    let active = ref(true);
    let route = useRoute();
    const router = useRouter();

    function isFullWindow() {
      const k = fullWindowLocations.filter((s) => s === route.name.toString());
      if (k.length) {
        active.value = false;
        return;
      }
      active.value = true;
    }

    function pushNext(path) {
      router.push(path);
    }

    watch(
      () => route.name,
      () => {
        isFullWindow();
      }
    );

    onMounted(() => {
      isFullWindow();
    });

    return {
      auditMenu,
      active,
      fullWindowLocations,
      pushNext,
    };
  },
};
</script>
<style scoped>
.activeColor:after {
  position: absolute;
  content: "";
  right: 0;
  bottom: 0;
  border-radius: 8px;
  top: 0;
  border-right: 5px solid #299b9b;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}
</style>
