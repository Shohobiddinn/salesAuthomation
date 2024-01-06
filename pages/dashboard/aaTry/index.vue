<template>
  <div>
<!--    <input type="string" v-model="number" />-->
<!--    <p>Roman Numeral: {{ romanNumeral }}</p>-->
<!--    <div class="w-60 h-30 border border-black bg-blue-50">-->
<!--      <div style="width:100%;  display: flex; justify-content: space-between; margin: 10px;">-->
<!--        <div style="width: 150px; height: 100px;  background: #08f05d;"></div>-->
<!--        <div style="transform: translate(10%, 80%) rotate(270deg); height: 10px; margin-left: -60px">Ibrohimjon Fayzullayev</div>-->

<!--      </div>-->
<!--    </div>-->
<!--    <select>-->
<!--      <option v-for="i in 12" value="option1"><div class="mx-2">Option 1</div></option>-->
<!--    </select>-->
    <div></div>
  </div>
</template>

<script setup>

// function Person(name, number){
//   this.name = name
//   this.number = number
// }
// Person.prototype.greet = function (){
//   console.log("Hello, my name is " + this.name);
// }
// const person1 = new Person("John", 25);
// const person2 = new Person("Jane", 30);
//
// // Accessing properties
// console.log(person1.name); // Output: "John"
// console.log(person2.number); // Output: 30
// console.log(person1.greet)
// // Calling the prototype method
// person1.greet(); // Output: "Hello, my name is John"
// person2.greet(); // Output: "Hello, my name
var numIdenticalPairs = function(nums) {
  let res = 0
  // res = nums.filter(i => i === i)
  for(let i = 0; i < nums.length; i++){
    for(let j = i +1; j < nums.length;j++){
      if (nums[i] === nums[j]){
        res++
      }
    }
  }
  return res
};
let nums = ref([1,2,3,1,1,3])
console.log('numIdenticalPairs',numIdenticalPairs(nums.value))
</script>
<style>
select {
  padding: 10px;
  width: 200px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  color: #555;
}

option {
  background-color: #fff;
  color: #555;
  padding: 12px;
}

</style>
