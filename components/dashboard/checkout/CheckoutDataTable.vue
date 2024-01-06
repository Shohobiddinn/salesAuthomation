<template>
    <table class="w-full rounded-t-large overflow-hidden">
        <thead>
            <tr class="bg-lotion border-b-1 border-t-1">
                <template v-for="({ key,  name, thWidth }) in cashboxesStore.templates" :key="key">
                    <td class="fw-4 text-gray-3 px-4 py-2.5">
                        <div :style="{ width: thWidth }" class="fw-4 fs-14 items-center text-gray-400">
                            {{ name }}
                        </div>
                    </td>
                </template>
            </tr>
        </thead>

        <tbody>
            <template v-for="row in cashboxesStore.data" :key="row">
                <tr class="border-t-1">
                    <td class="px-4">
                        <div class=" fw-4 fs-14 items-center text-gray-700">{{ row.name }}</div>
                    </td>

                    <td class="px-4 py-2">
                        <div class="fw-4 fs-14 items-center text-gray-700">{{ convertDate(row.created_date) }}</div>
                    </td>

                    <td class="px-4 py-2">
                        <div class=" fw-4 fs-14 items-center text-gray-700">
                            <button 
                                class="px-[68px] py-[11px] rounded-lg border hover:bg-gray-50 border-blue-20 fs-12"
                                @click="() => dialogStore.edit({ ...row })"
                            >Изменить</button>
                        </div>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>    
</template>

<script setup lang="ts">
const cashboxesStore = useCashboxesStore();
const dialogStore = useDialogStore("cashboxes");

const convertDate = (date) => {
    const newDate = date ? new Date(date) : new Date
    const day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()
    const month = newDate.getMonth()+1 < 10 ? `0${newDate.getMonth()+1}` : newDate.getMonth()+1
    return `${day}.${month}.${newDate.getFullYear()}`
}

</script>