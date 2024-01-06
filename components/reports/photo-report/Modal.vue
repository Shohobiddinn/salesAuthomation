<template>
    <div v-show="isOpen" class="fixed z-[9999999] top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.8)]">  
        <div class="flex justify-between">
        <index-btn :is-active="false"
                       @click="isOpen=false"
                       class="fixed top-4 left-4">
              <fa-icon :hash="'&#xf00d'"/>
            </index-btn>
            <div></div>
            
            <div class="bg-white h-[100vh]">
              <div class="bg-[#FAFDFD] p-6 w-[362px] border-b">
              <reports-photo-report-tab-btn/>
              </div>
              <div>
                <div class="p-6 flex flex-col justify-between" >
                    <div class="flex flex-col gap-5">
                  <div class="flex flex-col w-full gap-2.5">
                    <label class="fs-12"
                      >Название задачи </label
                    >
                    <DInput
                      :form="true"
                      :placeholder="'Введите название'"
                      :type="'text'"
                    />
                  </div>
                  <div class="flex flex-col w-full gap-2.5">
                    <label for="client-inp" class="fs-12"
                      >Дата выполнение </label
                    >
                    <d-input-date-picker />
                  </div>
                    <div class="flex flex-col w-full gap-2.5">
                    <label class="fs-12"
                      >Тип задачи </label
                    >
                    <multiply-selections
                      :h="true"
                    
                    />
                    </div>
                    <div class="flex flex-col w-full gap-2.5">
                            <label class="fs-12"
                              >Исполняющий </label
                            >
                            <DInput
                              :form="true"
                              :placeholder="'Введите сумму'"
                              :type="'text'"
                            />
                    </div>
                    <div class="flex flex-col w-full gap-2.5">
                      <label class="fs-12"
                        > Комментарий</label
                      >
                      <DInput
                        :form="true"
                        :placeholder="'Введите комментарий'"
                        :type="'text'"
                      />
                    </div>
                      
                    </div>
                    <div class="grid grid-cols-2 gap-6 mt-10">
                      <cancel-btn>Закрыть</cancel-btn>
                      <m-btn>Сохранить</m-btn>
                    </div>
                </div>
              </div>

            </div>
        </div>
    </div>
</template>
<script setup>
let isOpen = ref(false)

</script>
