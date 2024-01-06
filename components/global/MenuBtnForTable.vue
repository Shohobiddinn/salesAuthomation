<template>
  <div class="dropdown" ref="ourMenu" @keydown.esc="isMenuActive = false">
    <div @click="activate" ref="menuBtn" class="z-0">
      <slot name="btn"></slot>
    </div>
    <div
        class="dropdown-content block z-41 p-4 flex flex-row"
        :class="[
        isMenuActive && !disabled ? 'block-display' : '',
        menuPosition === 'left' ? 'left-0' : 'right-0',
        menuTop ? 'bottom-50px' : '',
      ]"
        ref="menuContent"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
import { variableData } from "~/variable/variable";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});

const { isActive } = variableData;

let isMenuActive = ref(false);
const ourMenu = ref(null);
let menuPosition = ref("right");
let menuTop = ref(false);
let menuBtn = ref(null);
let menuContent = ref(null);
const router = useRouter();
// Methods
function activate() {
  isActive.value = true;
  isMenuActive.value = !isMenuActive.value;

  if (window.innerWidth / 2 > ourMenu.value?.offsetLeft) {
    menuPosition.value = "left";
  }
}

function setContentPosition() {
  const h = window.innerHeight;
  const o = parseInt(ourMenu.value?.getBoundingClientRect()?.top);
  const c = menuContent.value?.clientHeight;

  menuTop.value = h - o - 42 < c;
}

function activateListener() {
  if (isMenuActive.value) {
    document.addEventListener("click", function fnc(e) {
      if (ourMenu.value !== null) {
        if (!ourMenu.value?.contains(e.target)) {
          isMenuActive.value = false;
          document.removeEventListener("click", function emp(e) {});
        }
      }
    });
  } else {
    document.removeEventListener("click", function emp(e) {});
  }
}

watch(isMenuActive, () => {
  setTimeout(() => {
    setContentPosition();
    activateListener();
  }, 0);
});

watch(isActive, () => {
  if (!isActive.value) {
    isMenuActive.value = false;
  }
});
</script>

<style scoped>
.dropdown {
  display: inline-block;
  position: relative;
}
.dropdown.disabled {
  cursor: not-allowed;
}

.dropdown-content {
  display: none;
  position: absolute;
  width: auto;
  overflow: auto;
  background: #ffffff;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  transform: translateY(5px);
  transition: all 200ms linear;
}
.block-display {
  display: block;
}
</style>
