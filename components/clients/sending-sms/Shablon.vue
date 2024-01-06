<template>
  <div class="mt-4">
    <page-title :title="'Шаблон смс'"/>
    <div class="grid grid-cols-2 gap-4">
      <div class="h-[303px] rounded-lg bgf">
        <div class="h-[8px] rounded-t-lg bg-[#299B9B]">
          <div class="pt-7 ml-4"><page-title :title="'Описание ключей'"/></div>
          <div class="grid grid-cols-3 ml-4 mt-4 w-[250px]">
            <div >{date}</div>
            <div class="ml-6 mt-2"><IconArrowRighti/></div>
            <div class="ml-6">Дата</div>
          </div>
          <div class="grid grid-cols-3 ml-4 mt-4 w-[250px]">
            <div >{company}</div>
            <div class="ml-6 mt-2"><IconArrowRighti/></div>
            <div class="ml-6">Дата</div>
          </div>
          <div class="grid grid-cols-3 ml-4 mt-4 w-[250px]">
            <div >{payment}</div>
            <div class="ml-6 mt-2"><IconArrowRighti/></div>
            <div class="ml-6">Дата</div>
          </div>
          <div class="grid grid-cols-3 ml-4 mt-4 w-[250px]">
            <div >{balance}</div>
            <div class="ml-6 mt-2"><IconArrowRighti/></div>
            <div class="ml-6">Дата</div>
          </div>
          <div class="grid grid-cols-3 ml-4 mt-4 w-[250px]">
            <div >{new_line}</div>
            <div class="ml-6 mt-2"><IconArrowRighti/></div>
            <div class="ml-6">Дата</div>
          </div>
        </div>
      </div>
      <div class="h-[303px] rounded-lg bgr">
        <div class="h-[8px] rounded-t-lg bg-red-700">
          <div class="pt-7 ml-4"><page-title :title="'Напоминание !'"/></div>
          <div class="flex ml-4 mt-4 ">
            Вы можете изменить содержание SMS, но не забудьте указать основное ключевое слово, например {debt}, иначе система выдаст ошибку при отправке SMS клиенту.
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <div class="rounded-lg bg-white border-grey px-[2px]">
        <div class=" w-full overflow-auto">
          <data-table-common2 :headers="headers"
                              @sort="sortData"
                              :sorted="sortedData">
            <template #body>
              <template v-for="(data, index) in loadedData" :key="index">
                <c-tr class="border-b-none b-bottom cursor-pointer">
                  <c-td v-for="key in headers" :key="key" >
                    <div class="pt-2 check" v-if="key.key === 'checkbox'">
                      <checkbox :values="key.checked"/>
                    </div>
                    <div class="pt-1 pb-1 check" v-if="key.key === 'remainedQty'">
                      <button class="py-2 px-8 fs-12 rounded-lg bg-[#299B9B] text-white">Редактрирование</button>
                    </div>
                    <div class="py-2" v-if="key.checked && key.key !== 'remainedQty'">
                      {{ data[key.key] }}
                    </div>
                  </c-td>
                </c-tr>
              </template>
            </template>
          </data-table-common2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

let headers = ref([
  {
    name: "Тип",
    checked:true,
    key: "type",
    type:"type",
    thWidth:'120px'
  },
  {
    name: "Контент",
    checked:true,
    key: "content",
    type:"content",
    thWidth:'380px',
    bRadius:'8px'
  },
  {
    name: "Остал. Кол-во",
    checked:true,
    key: "remainedQty",
    type:"remainedQty",
    thWidth:'140px'
  }
]);
const loadedData = ref([
  {
    type:"Долг",
    content:"{date} ga {company} dan {debt} so'm qarzdorlik hisoblandi.",
    qty:"100 000",
  },
  {
    type:"Долг",
    content:"{date} ga {company} dan {debt} so'm qarzdorlik hisoblandi.",
    qty:"100 000",
  },
  {
    type:"Долг",
    content:"{date} ga {company} dan {debt} so'm qarzdorlik hisoblandi.",
    qty:"100 000",
  },
  {
    type:"Долг",
    content:"{date} ga {company} dan {debt} so'm qarzdorlik hisoblandi.",
    qty:"100 000",
  },
  {
    type:"Долг",
    content:"{date} ga {company} dan {debt} so'm qarzdorlik hisoblandi.",
    qty:"100 000",
  },
  {
    type:"Долг",
    content:"{date} ga {company} dan {debt} so'm qarzdorlik hisoblandi.",
    qty:"100 000",
  },
])
let sortedData = ref({key: '', mode: ''});

// Methods
function searchUpdated(text) {
  console.log(text)
}

function sortData(data) {
  sortedData.value = data
}

function setPage(index){
  currentPage.value = index
}

function setPageSize(size){
  pageSize.value = size
}
</script>

<style scoped>
.bgf{
  background: rgba(41, 155, 155, 0.1);
}
.bgr{
  background: rgba(209, 5, 5, 0.04);
}
</style>

