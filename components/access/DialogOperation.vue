<template>
  <div class="flex gap-5 -mt-6 mb-4">
    <div class="fs-5 text-[24px]">Прикрепить Операции</div>
    <search-input/>
  </div>
  <div class="w-full h-150 overflow-y-auto">
    <div class="absolute w-286 rounded-b-lg -ml-8 bg-white bottom-0 h-14 shadoww z-50">
      <div class="flex justify-end p-2">
        <div class="fs-14 m-2">Выделено:  <span class="fw-6 fs-14">12</span></div>
        <m-btn>Открепить операции</m-btn>
      </div>
    </div>

    <div class="grid grid-cols-3 mt-4 w-full border-b-1 pb-4">
      <div class="border-r-1 pr-4">
        <div class="flex justify-between">
          <div class="fs-14">Кассир</div>
          <div class="flex gap-2">
            <div class="pl-8 pt-1">
              <label>
                <input type='checkbox'>
                <span></span>
              </label>
            </div>
            <div class="fs-14 mt-1">Выбрать все</div>
          </div>
        </div>
        <div class="mt-2 rounded-lg border p-4">
          <div class=" h-70 overflow-y-auto">
            <div v-for="i in 20" class="flex gap-2 py-1 pr-4">
              <div class="pt-1">
                <label>
                  <input type='checkbox'>
                  <span></span>
                </label>
              </div>
              <div class="fs-14 mt-1">Lorem Ipsum is simply dummy text</div>
            </div>
          </div>
        </div>
      </div>
      <div class="border-r-1 px-4">
        <div class="flex justify-between">
          <div class="fs-14">Кассир</div>
          <div class="flex gap-2">
            <div class="pl-8 pt-1">
              <label>
                <input type='checkbox'>
                <span></span>
              </label>
            </div>
            <div class="fs-14 mt-1">Выбрать все</div>
          </div>
        </div>
        <div class="mt-2 rounded-lg border p-4">
          <div class=" h-70 overflow-y-auto">
            <div v-for="i in 20" class="flex gap-2 py-1 pr-4">
              <div class="pt-1">
                <label>
                  <input type='checkbox'>
                  <span></span>
                </label>
              </div>
              <div class="fs-14 mt-1">Lorem Ipsum is simply dummy text</div>
            </div>
          </div>
        </div>
      </div>
      <div class=" px-4">
        <div class="flex justify-between">
          <div class="fs-14">Кассир</div>
          <div class="flex gap-2">
            <div class="pl-8 pt-1">
              <label>
                <input type='checkbox'>
                <span></span>
              </label>
            </div>
            <div class="fs-14 mt-1">Выбрать все</div>
          </div>
        </div>
        <div class="mt-2 rounded-lg border p-4">
          <div class=" h-70 overflow-y-auto">
            <div v-for="i in 20" class="flex gap-2 py-1 pr-4">
              <div class="pt-1">
                <label>
                  <input type='checkbox'>
                  <span></span>
                </label>
              </div>
              <div class="fs-14 mt-1">Lorem Ipsum is simply dummy text</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 mt-4 w-full ">
      <div class="border-r-1 pr-4">
        <div class="flex justify-between">
          <div class="fs-14">Кассир</div>
          <div class="flex gap-2">
            <div class="pl-8 pt-1">
              <label>
                <input type='checkbox'>
                <span></span>
              </label>
            </div>
            <div class="fs-14 mt-1">Выбрать все</div>
          </div>
        </div>
        <div class="mt-2 rounded-lg border p-4">
          <div class=" h-70 overflow-y-auto">
            <div v-for="i in 20" class="flex gap-2 py-1 pr-4">
              <div class="pt-1">
                <label>
                  <input type='checkbox'>
                  <span></span>
                </label>
              </div>
              <div class="fs-14 mt-1">Lorem Ipsum is simply dummy text</div>
            </div>
          </div>
        </div>
      </div>
      <div class="border-r-1 px-4">
        <div class="flex justify-between">
          <div class="fs-14">Кассир</div>
          <div class="flex gap-2">
            <div class="pl-8 pt-1">
              <label>
                <input type='checkbox'>
                <span></span>
              </label>
            </div>
            <div class="fs-14 mt-1">Выбрать все</div>
          </div>
        </div>
        <div class="mt-2 rounded-lg border p-4">
          <div class=" h-70 overflow-y-auto">
            <div v-for="i in 20" class="flex gap-2 py-1 pr-4">
              <div class="pt-1">
                <label>
                  <input type='checkbox'>
                  <span></span>
                </label>
              </div>
              <div class="fs-14 mt-1">Lorem Ipsum is simply dummy text</div>
            </div>
          </div>
        </div>
      </div>
      <div class=" px-4">
        <div class="flex justify-between">
          <div class="fs-14">Кассир</div>
          <div class="flex gap-2">
            <div class="pl-8 pt-1">
              <label>
                <input type='checkbox'>
                <span></span>
              </label>
            </div>
            <div class="fs-14 mt-1">Выбрать все</div>
          </div>
        </div>
        <div class="mt-2 rounded-lg border p-4">
          <div class=" h-70 overflow-y-auto">
            <div v-for="i in 20" class="flex gap-2 py-1 pr-4">
              <div class="pt-1">
                <label>
                  <input type='checkbox'>
                  <span></span>
                </label>
              </div>
              <div class="fs-14 mt-1">Lorem Ipsum is simply dummy text</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DialogRole"
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
  border: 1px solid #D2D7D7;
  display: inline-block;
  position: relative;
}

/* Style its checked state...with a ticked icon */
[type=checkbox]:checked + span:before {
  content: '\f106';
  position: absolute;
  font-weight: 700;
  color: transparent;
  transition: all .4s;
  left: 7px;
  top: 2px;
  width: 5px;
  height: 11px;
  border: solid #299B9B;
  border-width: 0 1px 1px 0;
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
}
.shadoww{
  box-shadow: 0px -4px 12px rgba(0, 0, 0, 0.08);
}
</style>
