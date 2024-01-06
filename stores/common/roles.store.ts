import { SystemConstantModel } from "~/interfaces/api/system-constant-model";
import { APIRoutes } from "~/variable/api-routes";
import { Ref } from "vue";
import { RoleModel } from "~/interfaces/api/role-model";
import { UnwrapNestedRefs } from "@vue/reactivity";

export const useRolesStore = defineStore('roles', () => {
    const { $axios } = useNuxtApp();

    // region States

    const conf = {
        headers: {
            "Authorization": "Bearer " + useCookie("token").value,
            "Content-Type": "application/json",
            "Accept-Language": "ru-RU"
        }
    };

    const data: UnwrapNestedRefs<Array<RoleModel>> = reactive([]);

    const isAllSelected: Ref<boolean> = ref(false);
    const isOpen: Ref<boolean> = ref(false);

    // endregion

    watch(data, async (value, oldValue, onCleanup) => {
        let check = false;

        value?.forEach((item) => {
            if (!item.isSelected) {
                check = true;
            }
        });
        isAllSelected.value = !check;
    });

    watch(isAllSelected, async (value, oldValue, onCleanup) => {
        data.map((v) => {
            v.isSelected = value;
            return v;
        });
    });

    // region Actions

    const getData = async () => {
        try {
            const response = await $axios.get<Array<SystemConstantModel>>(
                APIRoutes.SystemConstantsRoles,
                conf,
            );

            if (response.data) {
                data.length = 0;
                response.data.forEach((value) => {
                    data.push({
                        key: value.key,
                        name: value.name,
                        isSelected: false,
                    });
                });
            }
            return response.data
        } catch (error) {
            console.log(error)
        }

    }

    const open = () => {
        isOpen.value = !isOpen.value
    }

    const close = () => {
        isOpen.value = false;
    }

    // endregion

    return {
        data,
        isAllSelected,
        isOpen,
        getData,
        open,
        close,
    };
});
