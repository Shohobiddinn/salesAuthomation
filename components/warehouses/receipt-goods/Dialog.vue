<template>
  <div class="w-full">
    <div v-for="item in products.data?.items" class="border-b-1 cursor-pointer p-1 text-[18px]">{{item.name}}</div>
    <div class="p-3 flex justify-center">
      <page-index :available-pages="products.data?.total_pages"
                  :current-page="products.data?.page_number"
                  @setPage="products.setPage"/>
    </div>
    <m-btn class="w-full">Сохранить</m-btn>
  </div>
</template>

<script setup>
// State
import {ref} from "vue";
import {useProductsStore} from "~/stores/settings/products/products.store";

const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
  },
});
const dialogStore = useDialogStore("products");
const {isActive} = toRefs(props);

const products = useProductsStore(isActive.value.toString())
onMounted(()=>{
  products.getData(isActive.value.toString())
})
</script>

<style scoped>

</style>
