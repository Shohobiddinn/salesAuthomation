<template>
  <div>
    <flex-row class="my-6">
      <router-link to="/reports/customer">
        <back-btn />
      </router-link>
    </flex-row>
    <p-title> Прикперление и открепление аудиторов к клиентам </p-title>
    <div class="my-6 w-full">
      <table class="w-full rounded-large border-grey overflow-hidden">
        <thead class="bg-lotion">
          <tr>
            <th class="px-2">
              <i-title> Название клиента </i-title>
            </th>
            <th class="px-2">
              <flex-row v-click-outside="outside" class="gap-2 items-center">
                <i-title> Аудитор </i-title>
                <div class="relative z-[9999999]">
                  <div @click="audit" class="fs-12 fw-4 flex cursor-pointer">
                    <IconArrowBottom class="mt-1.5 ml-2 mr-1" />
                    Выбрать для всех одного
                  </div>
                  <div
                    v-if="isActive"
                    class="absolute h-28 w-30 fs-12 fw-4 shadow bg-white top-6"
                  >
                    <div
                      @click="selAuditor(index)"
                      v-for="(item, index) in data"
                      :class="[
                        act.isActive && act.index === index
                          ? 'text-blue-10'
                          : '',
                      ]"
                      class="flex cursor-pointer px-3 pk py-2.5"
                    >
                      {{ item.name }}
                      <IconCheck
                        v-if="act.isActive && act.index === index"
                        class="h-4 ml-4"
                      />
                    </div>
                  </div>
                </div>
                <!--              <select-->
                <!--                class="w-1/3 fs-14 fw-4 h-[42px] bg-[#FAFDFD] rounded-lg my-1 mr-[18px] pl-[15px]"-->
                <!--              >-->
                <!--                <option value="">Выбрать</option>-->
                <!--                <option value="">hello</option>-->
                <!--                <option value="">hello</option>-->
                <!--                <option value="">hello</option>-->
                <!--              </select>-->
              </flex-row>
            </th>
            <th class="px-2">
              <flex-row class="gap-2">
                <i-title> Дни посещений </i-title>
              </flex-row>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <c-tr class="last:border-b-0" v-for="center in auditorStore.fakeData">
            <c-td-no-edit>
              {{ center.name }}
            </c-td-no-edit>
            <c-td-no-edit>
              <select
                v-model="center.auditor"
                class="border w-1/2 h-[42px] focus:border-0 avtive:border-0 bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]"
              >
                <option value="">Выбрать</option>
                <option value="">hello</option>
                <option value="">hello</option>
                <option value="one">hello</option>
                <option value="">hello</option>
              </select>
            </c-td-no-edit>
            <c-td-no-edit>
              <flex-row class="items-center gap-2">
                <div class="flex gap-2" v-for="day in center.days">
                  <label class="pl-1">
                    <input type="checkbox" v-model="day.selected" />
                    <span></span>
                  </label>
                  {{ day.name }}
                </div>
              </flex-row>
            </c-td-no-edit>
          </c-tr>
        </tbody>
      </table>
    </div>
    <flex-row class="justify-end">
      <m-btn> Сохранить </m-btn>
    </flex-row>
  </div>
</template>

<script setup>
// Store

const auditorStore = useReportCustomerAuditors("main");

const data = ref([
  {
    name: "Аудитор 1",
  },
  {
    name: "Аудитор 2",
  },
  {
    name: "Аудитор 3",
  },
]);
const act = ref({
  isActive: false,
  index: -1,
});
const isActive = ref(false);
function audit() {
  isActive.value = !isActive.value;
}
function outside() {
  isActive.value = false;
}
function selAuditor(index) {
  act.value.isActive = true;
  act.value.index = index;
}
</script>

<style scoped>
label input {
  display: none; /* Hide the default checkbox */
}

/* Style the artificial checkbox */
label span {
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #d2d7d7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
[type="checkbox"]:checked + span:before {
  content: "\f106";
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all 0.4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299b9b;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.pk {
}
.pk:first-child {
  border-bottom: 1px solid #d5d0d0;
}
.pk:nth-child(2) {
  border-bottom: 1px solid #d5d0d0;
}
</style>
