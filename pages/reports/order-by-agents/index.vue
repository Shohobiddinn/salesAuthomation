<template>
  <div>
    <div class="mt-3">
      <page-title :title="'Заказы по агентам'" />
    </div>
    <div>
      <div v-click-outside="clickOutside" class="mt-2 h-full">
        <ReportsOrderByAgentsFilterCard />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-4 mt-6">
      <div class="h-[166px] rounded-lg bg-white">
        <div class="h-[50px] rounded-t-lg bg-[#daf6f6] text-[#384949] p-3">
          Общие заказы
        </div>
        <div class="w-full h-full flex">
          <div class="w-[65%] flex justify-center mt-9">
            <div class="text-[20px] fw-6">118, 181, 500</div>
          </div>
          <div class="w-[35%] h-full mt-6">
            <div class="flex">
              <div class="fw-4 fs-14">Обьем:</div>
              <div class="fw-6 fs-14 ml-1">10,263</div>
            </div>
            <div class="flex">
              <div class="fw-4 fs-14">Обьем:</div>
              <div class="fw-6 fs-14 ml-1">10,263</div>
            </div>
            <div class="flex">
              <div class="fw-4 fs-14">Обьем:</div>
              <div class="fw-6 fs-14 ml-1">10,263</div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-[166px] rounded-lg bg-white">
        <div class="h-[50px] rounded-t-lg bg-[#efe6d3] text-[#384949] p-3">
          Общие заказы
        </div>
        <div class="w-full h-full flex">
          <div class="w-[65%] flex justify-center mt-9">
            <div class="text-[20px] fw-6">118, 181, 500</div>
          </div>
          <div class="w-[35%] h-full mt-6">
            <div class="flex">
              <div class="fw-4 fs-14">Обьем:</div>
              <div class="fw-6 fs-14 ml-1">10,263</div>
            </div>
            <div class="flex">
              <div class="fw-4 fs-14">Обьем:</div>
              <div class="fw-6 fs-14 ml-1">10,263</div>
            </div>
            <div class="flex">
              <div class="fw-4 fs-14">Обьем:</div>
              <div class="fw-6 fs-14 ml-1">10,263</div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-[166px] rounded-lg bg-white">
        <div class="h-[50px] rounded-t-lg bg-[#e9f8e6] text-[#384949] p-3">
          Общие заказы
        </div>
        <div class="w-full h-full flex">
          <div class="w-[65%] flex justify-center mt-9">
            <div class="text-[20px] fw-6">118, 181, 500</div>
          </div>
          <div class="w-[35%] h-full mt-6">
            <div class="flex">
              <div class="fw-4 fs-14">Обьем:</div>
              <div class="fw-6 fs-14 ml-1">10,263</div>
            </div>
            <div class="flex">
              <div class="fw-4 fs-14">Обьем:</div>
              <div class="fw-6 fs-14 ml-1">10,263</div>
            </div>
            <div class="flex">
              <div class="fw-4 fs-14">Обьем:</div>
              <div class="fw-6 fs-14 ml-1">10,263</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-6 mt-6">
      <div><page-title :title="'Торговые агенты'" /></div>
      <div
        class="h-[38px] grid grid-cols-3 bg-white rounded-lg font-normal text-sm text-[#8FA0A0]"
      >
        <div class="form_radio_btn h-full">
          <input id="radio-1" type="radio" name="radio" value="1" checked />
          <label
            for="radio-1"
            class="h-[38px] rounded-l-lg w-full py-[12px] px-4"
            >По АКБ</label
          >
        </div>
        <div class="form_radio_btn h-full border-x">
          <input id="radio-2" type="radio" name="radio" value="2" />
          <label for="radio-2" class="h-[38px] w-full py-[12px] px-4"
            >По сумме</label
          >
        </div>
        <div class="form_radio_btn h-full w-full">
          <input id="radio-3" type="radio" name="radio" value="3" />
          <label
            for="radio-3"
            class="h-[38px] w-full rounded-r-lg py-[12px] px-4"
            >По объему</label
          >
        </div>
      </div>
    </div>
    <div>
      <div class="mt-6">
        <reports-order-by-agents-data-table />
      </div>
    </div>
    <div class="flex gap-6 mt-6">
      <div><page-title :title="'По категории продукторв'" /></div>
      <div
        class="h-[38px] grid grid-cols-3 bg-white rounded-lg font-normal text-sm text-[#8FA0A0]"
      >
        <div class="form_radio_btn h-full">
          <input id="product-1" type="radio" name="product" value="1" checked />
          <label
            for="product-1"
            class="h-[38px] rounded-l-lg w-full py-[12px] px-4"
            >По кол-во</label
          >
        </div>
        <div class="form_radio_btn h-full border-x">
          <input id="product-2" type="radio" name="product" value="2" />
          <label for="product-2" class="h-[38px] w-full py-[12px] px-4"
            >По сумме</label
          >
        </div>
        <div class="form_radio_btn h-full w-full">
          <input id="product-3" type="radio" name="product" value="3" />
          <label
            for="product-3"
            class="h-[38px] w-full rounded-r-lg py-[12px] px-4"
            >По объему</label
          >
        </div>
      </div>
    </div>
    <div>
      <div class="mt-6">
        <reports-order-by-agents-product-category-data-table />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
const amount = ref(1)
const filter = ref({
  isSelectProductCategory: false,
  isSelectTerritory: false,
  isSelectAgent: false,
  isProduct: false,
  isTypeAmount: false,
  date: false,
})
const clickOutside = () => {
  filter.value.isSelectCategory = false
  filter.value.isSelectTerritory = false
  filter.value.isSelectAgent = false
  filter.value.isProduct = false
  filter.value.isTypeAmount = false
  filter.value.date = false
}
</script>

<style scoped>
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
