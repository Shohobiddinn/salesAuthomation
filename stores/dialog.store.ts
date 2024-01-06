import {defineStore} from "pinia";
import {Ref} from "vue";
import {CurrencyModel} from "~/interfaces/api/currency-model";

export const useDialogStore = (storeId: string) => defineStore(`dialog_${storeId}`, () => {
    // region States

    const isDialogOpen = ref(false);

    const singleData: Ref<any> = ref();

    // endregion

    // region Actions

    const openDialog = () => {
        isDialogOpen.value = true;
        singleData.value = null;
    }

    const closeDialog = () => {
        isDialogOpen.value = false;
        singleData.value = null;
    }

    const edit = (value: any) => {
        openDialog();
        singleData.value = value;
    }

    // endregion

    return {
        isDialogOpen,
        singleData,
        openDialog,
        closeDialog,
        edit,
    }
})();