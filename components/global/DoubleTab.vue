<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <ul class="flex list-none flex-row nav-tabs">
        <li
          v-if="firstTabName"
          class="-mb-px last:mr-0 text-center"
          :class="{
            '': openTab != '1',
            'rounded-t-lg hidden-bottom-border': openTab == '1',
            'border-grey': !borderless && openTab == '1',
          }"
        >
          <a
            class="fs-14 px-5 py-3 block leading-normal rounded-t-lg"
            href="javascript:"
            v-on:click="toggleTabs(1)"
            :class="[
              openTab != '1' ? 'text-space fw-400' : 'text-primary fw-500',
              openTab == '1' && bgWhite
                ? 'bg-white'
                : openTab == '1'
                ? 'bg-lotion'
                : '',
            ]"
          >
            {{ firstTabName }}
          </a>
        </li>
        <li
          v-if="secondTabName"
          class="-mb-px last:mr-0 text-center"
          :class="{
            '': openTab != '2',
            'rounded-t-lg hidden-bottom-border': openTab == '2',
            'border-grey': !borderless && openTab == '2',
          }"
        >
          <a
            class="fs-14 px-5 py-3 block leading-normal rounded-t-lg"
            href="javascript:"
            v-on:click="toggleTabs(2)"
            :class="[
              openTab != '2' ? 'text-space fw-400' : 'text-primary fw-500',
              openTab == '2' && bgWhite
                ? 'bg-white'
                : openTab == '2'
                ? 'bg-lotion'
                : '',
            ]"
          >
            {{ secondTabName }}
          </a>
        </li>
        <li
          v-if="thirdTabName"
          class="-mb-px last:mr-0 text-center"
          :class="{
            '': openTab !== 3,
            'rounded-t-lg hidden-bottom-border': openTab === 3,
            'border-grey': !borderless && openTab === 3,
          }"
        >
          <a
            class="fs-14 px-5 py-3 block leading-normal rounded-t-lg"
            href="javascript:"
            v-on:click="toggleTabs(3)"
            :class="[
              openTab !== 3 ? 'text-space fw-400' : 'text-primary fw-500',
              openTab === 3 && bgWhite
                ? 'bg-white'
                : openTab === 3
                ? 'bg-lotion'
                : '',
            ]"
          >
            {{ thirdTabName }}
          </a>
        </li>
        <li
          v-if="fourthTabName"
          class="-mb-px last:mr-0 text-center"
          :class="{
            '': openTab !== 4,
            'rounded-t-lg hidden-bottom-border': openTab === 4,
            'border-grey': !borderless && openTab === 4,
          }"
        >
          <a
            class="fs-14 px-5 py-3 block leading-normal rounded-t-lg"
            href="javascript:"
            v-on:click="toggleTabs(4)"
            :class="[
              openTab !== 4 ? 'text-space fw-400' : 'text-primary fw-500',
              openTab === 4 && bgWhite
                ? 'bg-white'
                : openTab === 4
                ? 'bg-lotion'
                : '',
            ]"
          >
            {{ fourthTabName }}
          </a>
        </li>
        <li
          v-if="fifthTabName"
          class="-mb-px last:mr-0 text-center"
          :class="{
            '': openTab !== 12,
            'rounded-t-lg hidden-bottom-border': openTab === 12,
            'border-grey': !borderless && openTab === 12,
          }"
        >
          <a
            class="fs-14 px-5 py-3 block leading-normal rounded-t-lg"
            href="javascript:"
            v-on:click="toggleTabs(12)"
            :class="[
              openTab !== 12 ? 'text-space fw-400' : 'text-primary fw-500',
              openTab === 12 && bgWhite
                ? 'bg-white'
                : openTab === 12
                ? 'bg-lotion'
                : '',
            ]"
          >
            {{ fifthTabName }}
          </a>
        </li>
        <li
          v-if="tabName"
          class="-mb-px last:mr-0 text-center"
          :class="{
            '': openTab !== 5,
            'rounded-t-lg hidden-bottom-border': openTab === 5,
            'border-grey': !borderless && openTab === 5,
          }"
        >
          <a
            class="fs-14 px-5 py-3 block leading-normal rounded-t-lg"
            href="javascript:"
            v-on:click="toggleTabs(5)"
            :class="[
              openTab !== 5 ? 'text-space fw-400' : 'text-primary fw-500',
              openTab === 5 && bgWhite
                ? 'bg-white'
                : openTab === 5
                ? 'bg-lotion'
                : '',
            ]"
          >
            <div class="flex">
              <div><IconShopping :openTab="openTab" /></div>
              <div class="ml-2">{{ tabName }}</div>
            </div>
          </a>
        </li>
        <li
          v-if="rangeTabName"
          class="-mb-px last:mr-0 text-center"
          :class="{
            '': openTab !== 6,
            'rounded-t-lg hidden-bottom-border': openTab === 6,
            'border-grey': !borderless && openTab === 6,
          }"
        >
          <a
            class="fs-14 px-5 py-3 block leading-normal rounded-t-lg"
            href="javascript:"
            v-on:click="toggleTabs(6)"
            :class="[
              openTab !== 6 ? 'text-space fw-400' : 'text-primary fw-500',
              openTab === 6 && bgWhite
                ? 'bg-white'
                : openTab === 6
                ? 'bg-lotion'
                : '',
            ]"
          >
            <div class="flex">
              <div><IconStack :openTab="openTab" /></div>
              <div class="ml-2">{{ rangeTabName }}</div>
            </div>
          </a>
        </li>
        <li
          v-if="salesTabName"
          class="-mb-px last:mr-0 text-center"
          :class="{
            '': openTab !== 7,
            'rounded-t-lg hidden-bottom-border': openTab === 7,
            'border-grey': !borderless && openTab === 7,
          }"
        >
          <a
            class="fs-14 px-5 py-3 block leading-normal rounded-t-lg"
            href="javascript:"
            v-on:click="toggleTabs(7)"
            :class="[
              openTab !== 7 ? 'text-space fw-400' : 'text-primary fw-500',
              openTab === 7 && bgWhite
                ? 'bg-white'
                : openTab === 7
                ? 'bg-lotion'
                : '',
            ]"
          >
            <div class="flex">
              <div><IconChart :openTab="openTab" /></div>
              <div class="ml-2">{{ salesTabName }}</div>
            </div>
          </a>
        </li>
        <li
          v-if="debtTabName"
          class="-mb-px last:mr-0 text-center"
          :class="{
            '': openTab !== 8,
            'rounded-t-lg hidden-bottom-border': openTab === 8,
            'border-grey': !borderless && openTab === 8,
          }"
        >
          <a
            class="fs-14 px-5 py-3 block leading-normal rounded-t-lg"
            href="javascript:"
            v-on:click="toggleTabs(8)"
            :class="[
              openTab !== 8 ? 'text-space fw-400' : 'text-primary fw-500',
              openTab === 8 && bgWhite
                ? 'bg-white'
                : openTab === 8
                ? 'bg-lotion'
                : '',
            ]"
          >
            <div class="flex">
              <div><IconCash :openTab="openTab" /></div>
              <div class="ml-2">{{ debtTabName }}</div>
            </div>
          </a>
        </li>
        <li
          v-if="equipmentTabName"
          class="-mb-px last:mr-0 text-center"
          :class="{
            '': openTab !== 9,
            'rounded-t-lg hidden-bottom-border': openTab === 9,
            'border-grey': !borderless && openTab === 9,
          }"
        >
          <a
            class="fs-14 px-5 py-3 block leading-normal rounded-t-lg"
            href="javascript:"
            v-on:click="toggleTabs(9)"
            :class="[
              openTab !== 9 ? 'text-space fw-400' : 'text-primary fw-500',
              openTab === 9 && bgWhite
                ? 'bg-white'
                : openTab === 9
                ? 'bg-lotion'
                : '',
            ]"
          >
            <div class="flex">
              <div><IconImage :openTab="openTab" /></div>
              <div class="ml-2">{{ equipmentTabName }}</div>
            </div>
          </a>
        </li>
        <li
          v-if="photoTabName"
          class="-mb-px last:mr-0 text-center"
          :class="{
            '': openTab !== 10,
            'rounded-t-lg hidden-bottom-border': openTab === 10,
            'border-grey': !borderless && openTab === 10,
          }"
        >
          <a
            class="fs-14 px-5 py-3 block leading-normal rounded-t-lg"
            href="javascript:"
            v-on:click="toggleTabs(10)"
            :class="[
              openTab !== 10 ? 'text-space fw-400' : 'text-primary fw-500',
              openTab === 10 && bgWhite
                ? 'bg-white'
                : openTab === 10
                ? 'bg-lotion'
                : '',
            ]"
          >
            <div class="flex">
              <div><IconImage :openTab="openTab" /></div>
              <div class="ml-2">{{ photoTabName }}</div>
            </div>
          </a>
        </li>
        <li
          v-if="coordinateTabName"
          class="-mb-px last:mr-0 text-center"
          :class="{
            '': openTab !== 11,
            'rounded-t-lg hidden-bottom-border': openTab === 11,
            'border-grey': !borderless && openTab === 11,
          }"
        >
          <a
            class="fs-14 px-5 py-3 block leading-normal rounded-t-lg"
            href="javascript:"
            v-on:click="toggleTabs(11)"
            :class="[
              openTab !== 11 ? 'text-space fw-400' : 'text-primary fw-500',
              openTab === 11 && bgWhite
                ? 'bg-white'
                : openTab === 11
                ? 'bg-lotion'
                : '',
            ]"
          >
            <div class="flex">
              <div><IconLocation :openTab="openTab" /></div>
              <div class="ml-2">{{ coordinateTabName }}</div>
            </div>
          </a>
        </li>
      </ul>
      <div
        class="relative flex flex-col min-w-0 break-words w-full rounded-lg tab-content"
        :class="[
          openTab === 1 && 'rounded-tl-none',
          !borderless && 'border-grey',
          bgWhite ? 'bg-white' : 'bg-lotion',
        ]"
      >
        <div class="p-4 flex-auto">
          <div class="tab-content tab-space">
            <div v-bind:class="{ hidden: openTab !== 1, block: openTab === 1 }">
              <slot name="first"></slot>
            </div>
            <div v-bind:class="{ hidden: openTab !== 2, block: openTab === 2 }">
              <slot name="second"></slot>
            </div>
            <div v-bind:class="{ hidden: openTab !== 3, block: openTab === 3 }">
              <slot name="third"></slot>
            </div>
            <div v-bind:class="{ hidden: openTab !== 4, block: openTab === 4 }">
              <slot name="fourth"></slot>
            </div>
            <div
              v-bind:class="{ hidden: openTab !== 12, block: openTab === 12 }"
            >
              <slot name="fifth"></slot>
            </div>
            <div v-bind:class="{ hidden: openTab !== 5, block: openTab === 5 }">
              <slot name="order"></slot>
            </div>
            <div v-bind:class="{ hidden: openTab !== 6, block: openTab === 6 }">
              <slot name="range"></slot>
            </div>
            <div v-bind:class="{ hidden: openTab !== 7, block: openTab === 7 }">
              <slot name="sales"></slot>
            </div>
            <div v-bind:class="{ hidden: openTab !== 8, block: openTab === 8 }">
              <slot name="debt"></slot>
            </div>
            <div v-bind:class="{ hidden: openTab !== 9, block: openTab === 9 }">
              <slot name="equipment"></slot>
            </div>
            <div
              v-bind:class="{ hidden: openTab !== 10, block: openTab === 10 }"
            >
              <slot name="photo"></slot>
            </div>
            <div
              v-bind:class="{ hidden: openTab !== 11, block: openTab === 11 }"
            >
              <slot name="coordinate"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// region Props and Emits

const props = defineProps({
  firstTabName: String,
  secondTabName: String,
  thirdTabName: String,
  fourthTabName: String,
  fifthTabName: String,
  tabName: String,
  rangeTabName: String,
  salesTabName: String,
  debtTabName: String,
  equipmentTabName: String,
  photoTabName: String,
  coordinateTabName: String,
  tabNumber: Number,
  borderless: {
    type: Boolean,
    default: false,
  },
  bgWhite: Boolean,
  initialTabNumber: Number,
});

const emit = defineEmits(["change"]);

// endregion

// region States

const openTab = ref(props.initialTabNumber || 1);

// endregion

// region Methods

const toggleTabs = (tabNumber: number) => {
  openTab.value = tabNumber;
  emit("change", tabNumber);
};

// endregion
</script>
<style scoped>
.hidden-bottom-border {
  border-bottom: #fafdfd;
  z-index: 1;
}

.nav-tabs .active:nth-child(1).tab-content {
  border: none;
}
</style>
