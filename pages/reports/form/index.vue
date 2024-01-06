<template>
  <RoundedWhiteContainer class="mt-6">
    <form  @submit="checkForm">
      <DInput
        placeholder="name"
        :required="true"
        type="Name"
        :value="methodData.name"
        title="salomlar"
        @change="(value) => (methodData.name = value)"
      />

      <d-select
        :required="true"
        title="scsdas"
        :value="methodData.type"
        @change="(value) => (methodData.type = value)"
        :id="'sjdnbfb'"
      >
        <option value="" disabled selected>Выбрать</option>
        <option v-for="item in data" :value="item.key" :key="item">
          {{ item.name }}
        </option>
      </d-select>
      <m-btn type="submit" class="mt-6 bg-red-200">submit</m-btn>
    </form>
  </RoundedWhiteContainer>
</template>
<script setup>
let methodData = {
  name: "",
  type: "",
}
const checkForm = (e) => {
  e.preventDefault()
}
const data = [
  { name: "item 1", key: "item 1" },
  { name: "item 2", key: "item 2" },
]
</script>
