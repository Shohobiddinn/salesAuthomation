<template>
  <div class="py-9 px-5">
    <back-btn @click="$router.go(-1)"></back-btn>

    <div class="flex flex-col bg-white rounded-lg p-12.5 mt-6.5">
      <h3 class="font-semibold text-2xl text-black text-gray-3 pb-8">
        Добавить опрос
      </h3>
      <div class="flex justify-between">
        <p class="font-semibold text-xl text-black text-gray-3 pb-9 w-2/5">
          Основные
        </p>
        <div class="w-3/5 flex flex-col gap-6">
          <div class="w-full">
            <label for="name" class="fs-12">Название *</label>
            <div class="py-2">
              <d-input
                placeholder="Введите название клиента"
                type="text"
                class="w-full"
                :id="'name'"
              />
            </div>
          </div>
          <div class="w-full">
            <label for="sort" class="fs-12">Сортировка *</label>
            <div class="py-2">
              <d-input
                placeholder="Введите название клиента"
                type="text"
                class="w-full"
                :id="'sort'"
              />
            </div>
          </div>
          <div class="w-full flex gap-11.5">
            <div class="flex items-center gap-2.5">
              <div class="pt-2 check">
                <checkbox type="checkbox" :id="'activity'" />
              </div>
              <label for="activity" class="whitespace-nowrap fs-16"
                >Активный</label
              >
            </div>
            <div class="flex items-center gap-2.5">
              <div class="pt-2 check">
                <checkbox type="checkbox" :id="'activity'" />
              </div>
              <label for="activity" class="whitespace-nowrap fs-16"
                >Показать в отчёте</label
              >
            </div>
            <div class="flex items-center gap-2.5">
              <div class="pt-2 check">
                <checkbox type="checkbox" :id="'activity'" />
              </div>
              <label for="activity" class="whitespace-nowrap fs-16"
                >Обязательно для заполнение</label
              >
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-6">
        <h3 class="font-semibold text-2xl text-black text-gray-3 pb-8">
          Опросы
        </h3>
        <div
          class="flex border-x-1 border-y-1 b border-[#E1E4E4] bg-[#FAFDFD] rounded-lg p-6 gap-6 relative"
          v-for="(form, index) in surveyForms"
          :key="index"
        >
          <IconTrash
            class="absolute right-7 top-6 cursor-pointer"
            :size="'24'"
            @click="deleteForm(index)"
          />
          <div class="w-1/2 flex flex-col gap-4.5">
            <p class="font-semibold fs-16 text-black text-gray-3">Вопрос #1</p>
            <div class="w-full">
              <label for="survey-name" class="fs-12">Название *</label>
              <div class="py-2">
                <d-input
                  placeholder="Введите..."
                  type="text"
                  class="w-full h-11 border-[#D2D7D7]"
                  :id="'survey-name'"
                />
              </div>
            </div>
            <div class="flex flex-col w-full relative">
              <div class="font-normal fs-12">Тип *</div>
              <div
                @click="filter.isSelectType = !filter.isSelectType"
                class="flex p-2 my-2.76 h-11 border rounded-lg bg-[#fff] border-[#D2D7D7] w-full"
              >
                <div class="ml-4 mt-2 arrow-icon">
                  <IconArrowBottom />
                </div>
                <div class="fs-14 ml-2 text-gray-3">Выбрать</div>
              </div>
              <div
                v-if="filter.isSelectType"
                class="absolute w-full pt-2 border top-[85px] z-50 rounded-lg bg-[#FAFDFD]"
              >
                <div class="flex pl-3 border-b border-[#E1E4E4]">
                  <div>
                    <label>
                      <input type="checkbox" />
                      <span></span>
                    </label>
                  </div>
                  <div class="fs-14 ml-2">Select all</div>
                </div>
                <div class="h-[200px] overflow-auto mr-3">
                  <div v-for="i in 15" :key="i" class="flex pl-3 pt-2">
                    <div>
                      <label>
                        <input type="checkbox" />
                        <span></span>
                      </label>
                    </div>
                    <div class="fs-14 ml-2">Checkbox</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full">
              <label for="sort-survey" class="fs-12">Сортировка</label>
              <div class="py-2">
                <d-input
                  placeholder="Введите..."
                  type="text"
                  class="w-full h-11"
                  :id="'sort-survey'"
                />
              </div>
            </div>
          </div>
          <div class="w-1/2 flex flex-col gap-4.5">
            <p class="font-semibold fs-16 text-black text-gray-3">Варианты</p>
            <div class="w-full">
              <div class="flex gap-4.5">
                <label class="fs-12 text-black text-gray-3">Вариант 1</label>
                <span class="fs-12 text-[#D10505]">Удалить</span>
              </div>
              <div class="py-2">
                <d-input
                  placeholder="Введите..."
                  type="text"
                  class="w-full h-11"
                />
              </div>
            </div>
            <div class="w-full">
              <div class="flex gap-4.5">
                <label class="fs-12 text-black text-gray-3">Вариант 1</label>
                <span class="fs-12 text-[#D10505]">Удалить</span>
              </div>
              <div class="py-2">
                <d-input
                  placeholder="Введите..."
                  type="text"
                  class="w-full h-11"
                />
              </div>
            </div>
            <div class="w-full">
              <div class="flex gap-4.5">
                <label class="fs-12 text-black text-gray-3">Вариант 1</label>
                <span class="fs-12 text-[#D10505]">Удалить</span>
              </div>
              <div class="py-2">
                <d-input
                  placeholder="Введите..."
                  type="text"
                  class="w-full h-11"
                />
              </div>
            </div>
            <div class="w-full">
              <p class="color-[#299b9b] fs-16 cursor-pointer">
                <span class="mr-3.5">+</span> Добавить еще
              </p>
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <m-btn-outlined class="border-color-primary w-1/6 whitespace-nowrap" @click="addForm">
            <fa-icon hash="&#x2b" /> Добавить еще
          </m-btn-outlined>
        </div>
      </div>
    </div>
    <div class="flex justify-end w-full pt-6">
      <m-btn class="w-1/5"> Добавить</m-btn>
    </div>
  </div>
</template>

<script setup>
const surveyForms = ref([0]);
const surveyFormsCounter = ref(1);
const filter = ref({
  isSelectType: false,
});

const addForm = () => {
  surveyForms.value.push(surveyFormsCounter.value);
  surveyFormsCounter.value++;
};

const deleteForm = (idx) => {
  surveyForms.value = surveyForms.value.filter((form, index) => index !== idx);
};
</script>
