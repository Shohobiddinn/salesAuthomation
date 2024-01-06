<template>
  <div>
    <div class="mt-4">
      <page-title :title="'Отчет - продажа по товарам'" class="mb-4" />
      <ReportsVolumeReportFilter/>
    </div>
    <page-title :title="'Таблица'" />
    <div class="mt-4"><ReportVolumeReportDatatable /></div>
  </div>
</template>

<script setup lang="ts">

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

.form_radio_btn {
  display: inline-block;
}

.form_radio_btn input[type="radio"] {
  display: none;
}

.form_radio_btn label {
  display: inline-block;
  cursor: pointer;
  line-height: 100%;
  user-select: none;
}

/* Checked */
.form_radio_btn input[type="radio"]:checked + label {
  background: #299b9b;
  color: white;
}

/* Hover */
.form_radio_btn label:hover {
  color: #666;
}

/* Disabled */
.form_radio_btn input[type="radio"]:disabled + label {
  background: #efefef;
  color: #666;
}
</style>
