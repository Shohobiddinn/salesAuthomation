 <template>
  <div>
    <div class="flex flex-row justify-between my-4 items-center">
      <div class="flex flex-col gap-2">
        <p-title> Табел </p-title>
        <div class="flex flex-row gap-6">
          <button
            :class="
              isActive
                ? 'fs-14 fw-6 text-primary border-color-primary border-b-2'
                : 'fs-14 text-[#8FA0A0]'
            "
            @click="isActive = true"
          >
            По дням
          </button>
          <button
            :class="
              !isActive
                ? 'fs-14 fw-6 text-primary border-color-primary border-b-2'
                : 'fs-14 text-[#8FA0A0]'
            "
            @click="isActive = false"
          >
            По Месяцам
          </button>
        </div>
      </div>
      <div class="flex flex-row gap-4">
        <div class="flex flex-col">
          <i-title> Должность </i-title>
          <MultiSelect />
        </div>
        <div class="flex flex-col">
          <i-title> Сотрудник </i-title>
          <MultiSelect />
        </div>
        <div class="flex flex-col self-end">
          <DatePicker />
        </div>
        <flex-row class="self-end gap-2">
          <m-btn> Применить </m-btn>
          <reload-btn />
        </flex-row>
      </div>
    </div>
    <div class="mt-5 flex justify-end w-full">
      <div class="flex justify-center items-center gap-2">
        <checkbox class="mt-2"/>
        <span class="text-[#424F4F] fs-14 font-normal text-base"
          >Показать измененные результаты</span
        >
      </div>
    </div>
    <flex-row class="mt-4">
      <ReportTableDataTables />
    </flex-row>
  </div>
</template>

<script setup>
// State
const isActive = ref(true)
</script>

<style scoped></style>
