<template>
  <flex-row class="w-full overflow-auto pb-3 bg-white mb-2 rounded-lg border-grey">
    <table class="w-full rounded-t-large overflow-hidden whitespace-nowrap">
      <thead>
      <tr class="bg-lotion border-b-1">
        <td></td>
        <template v-for="expeditor in expeditorStore.expeditorList">
          <td class="fw-6 text-gray-3 px-2 py-2 border-l"
              v-if="expeditor.selected">
            {{ expeditor.name }}
          </td>
        </template>
      </tr>
      <tr class="bg-lotion border-b-1">
        <td class="fw-4 fs-14 items-center text-gray-400 pl-4">
          Категория товара
        </td>
        <template v-for="expeditor in expeditorStore.expeditorList">
          <td class="fw-4 text-gray-3 px-2 py-2.5 border-l"
              v-if="expeditor.selected">
            <flex-row class="justify-between fw-4 fs-14 items-center text-gray-400">
            <span>
              Блок
            </span>
              <span>
              Объем
            </span>
            </flex-row>
          </td>
        </template>
      </tr>
      </thead>
      <tbody>
      <tr v-for="category in expeditorStore.productsByCategory"
          class="border-b-1">
        <td class="pl-3">
          <sm-btn
              class="px-1"
              @click="category.explained = !category.explained">
            {{ category.name }}
          </sm-btn>
          <flex-col class="pl-4" v-if="category.explained">
            <flex-row v-for="product in category.products">
              <span class="fw-4 text-gray-400">
                {{ product.name }}
              </span>
            </flex-row>
          </flex-col>
        </td>
        <template  v-for="expeditor in expeditorStore.expeditorList">
          <td class="px-3 border-l" v-if="expeditor.selected">
            <flex-col class="">
              <flex-row class="justify-between py-2">
                <span class="fw-4 text-gray-400">
                  {{ getCategoryProducts(category.id, expeditor.shipments).totalBlocks }}
                </span>
                <span class="fw-4 text-gray-400">
                  {{ getCategoryProducts(category.id, expeditor.shipments).totalVolume }}
                </span>
              </flex-row>
              <flex-row class="justify-between"
                        v-for="product in category.products">
                <template v-if="category.explained">
                  <span class="fw-4 text-gray-400">
                    {{ getShipmentByCategory(category.id, expeditor.shipments, product.id).block }}
                  </span>
                  <span class="fw-4 text-gray-400">
                    {{ getShipmentByCategory(category.id, expeditor.shipments, product.id).volume }}
                  </span>
                </template>
              </flex-row>
            </flex-col>
          </td>
        </template>
      </tr>
      </tbody>
    </table>
  </flex-row>
</template>

<script setup>
// Stores
const expeditorStore = useReportExpeditorStore("main")

// Methods
function getShipmentByCategory(categoryId, shipments, product){
  const category = getCategoryProducts(categoryId, shipments)
  return category.products.filter(c => c.product === product)[0]
}
function getCategoryProducts(categoryId, shipments){
  return shipments.filter(s => s.category === categoryId)[0]
}
</script>

<style scoped>

</style>