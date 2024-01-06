<template>
  <div class="px-[2px]">
    <div class="w-full overflow-auto">
      <table class="w-full">
        <tr class="border-b border-t">
          <th v-for="item in headers" class="py-2 ">
            <div class="pl-8 pt-1" v-if="item.key === 'checkbox'">
              <label>
                <input type='checkbox'>
                <span></span>
              </label>
            </div>
            <div class="fs-14 fw-5">
              {{item.name}}
            </div>
          </th>
        </tr>
        <tr v-for="(data, index) in loadedData" :key="data" class="border-b ">
          <td v-for="key in headers" class="py-2">
            <div class="pt-2 pl-8" v-if="key.key === 'checkbox'">
              <label>
                <input type='checkbox'>
                <span></span>
              </label>
            </div>
            <div class="fs-12">{{ data[key.key] }}</div>
          </td>
        </tr>
      </table>
    </div>
  </div>

</template>

<script setup>
// State

let headers = ref([
  {
    name: "",
    checked:true,
    key: "checkbox",
    type:'checkbox',
    thWidth:'20px',
    bRadius:'8px'
  },
  {
    name: "Роли",
    checked:true,
    key: "role",
    thWidth:'120px'
  },
  {
    name: "Родитель",
    checked:true,
    key: "child",
    thWidth:'140px'
  }
]);
const loadedData = ref([
  {
    checkbox:"",
    role: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    child:"Отчеты аудит 2"
  },
  {
    checkbox:"",
    role: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    child:"Отчеты аудит 2"
  },
  {
    checkbox:"",
    role: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    child:"Отчеты аудит 2"
  },
  {
    checkbox:"",
    role: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    child:"Отчеты аудит 2"
  },
  {
    checkbox:"",
    role: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    child:"Отчеты аудит 2"
  },
  {
    checkbox:"",
    role: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    child:"Отчеты аудит 2"
  },
  {
    checkbox:"",
    role: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    child:"Отчеты аудит 2"
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
.down{
  display: none;
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
}
.active-down{
  display: block;
  background-color: white;
}
.down:after{
  position: absolute;
  content: '';
  right: -11px;
  bottom: 20px;
  top: 20px;
  border-left: 15px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
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
</style>


