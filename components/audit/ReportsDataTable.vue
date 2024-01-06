<template>
  <rounded-white-container>
    <div class="-mx-4 -mt-4">
      <div class="w-full overflow-auto rounded-t-large">
        <data-table :headers="headers" :reportsTable="true">
          <template #body>
            <c-tr v-for="data in loadedData" :key="data">
              <c-td-no-edit class="td" v-for="key in headers" :key="key">
                <div
                  v-if="key.key === 'showInMenu'"
                  class="grid justify-center"
                >
                  <label class="switch">
                    <input v-model="data[key.key]" type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </div>
                <div v-else class="py-4.5 px-5.5">
                  {{ data[key.key] }}
                </div>
              </c-td-no-edit>
            </c-tr>
          </template>
        </data-table>
      </div>
    </div>
  </rounded-white-container>
</template>

<script setup>
// State
const headers = ref([
  {
    name: "Отчёт",
    checked: true,
    key: "report",
    thWidth: "120px",
    type: "come",
  },
  {
    name: "Группа",
    checked: true,
    key: "group",
    thWidth: "120px",
    type: "come",
  },
  {
    name: "Описание",
    checked: true,
    key: "description",
    thWidth: "120px",
    type: "come",
  },
  {
    name: "Показать в меню",
    checked: true,
    key: "showInMenu",
    thWidth: "120px",
    type: "come",
  },
]);
const loadedData = ref([
  {
    report: "Ритэйл Аудит",
    group: "Ритэйл",
    description: "Ритэйл",
    showInMenu: true,
  },
  {
    report: "Ритэйл Аудит",
    group: "Ритэйл",
    description: "Ритэйл",
    showInMenu: true,
  },
  {
    report: "Ритэйл Аудит",
    group: "Ритэйл",
    description: "Ритэйл",
    showInMenu: true,
  },
  {
    report: "Ритэйл Аудит",
    group: "Ритэйл",
    description: "Ритэйл",
    showInMenu: true,
  },
  {
    report: "Ритэйл Аудит",
    group: "Ритэйл",
    description: "Ритэйл",
    showInMenu: true,
  },
  {
    report: "Ритэйл Аудит",
    group: "Ритэйл",
    description: "Ритэйл",
    showInMenu: true,
  },
]);
</script>