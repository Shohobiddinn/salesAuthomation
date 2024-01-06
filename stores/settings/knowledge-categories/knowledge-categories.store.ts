import {defineStore} from "pinia";
import {APIRoutes} from "~/variable/api-routes";
import {Ref} from "vue";
import {AppResponse} from "~/interfaces/api/app-response";
import {ListParams} from "~/interfaces/api/list-parameters";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {Template} from "~/interfaces/ui/template";
import {KnowledgeCategoryModel} from "~/interfaces/api/knowledge-category-model";


export const useKnowledgeCategoriesStore = (tableId: string) => defineStore(`knowledge_categories_${tableId}`, () => {
    const {$axios} = useNuxtApp();

    // region States

    const data: Ref<AppResponse<KnowledgeCategoryModel> | undefined> = ref();

    const params: UnwrapNestedRefs<ListParams> = reactive({
        page: 1,
        page_size: 10,
        search: null,
        order_by: {
            field: "id",
            is_asc: true,
        },
        filter: [
            {
                field: "is_active",
                value: ["true"],
            }
        ],
    });

    const conf = {
        headers: {
            "Authorization": "Bearer " + useCookie("token").value,
            "Content-Type": "application/json",
            "Accept-Language": "ru-RU"
        }
    };

    const templates: Ref<Template[]> = ref([
        {
            name: "Название",
            key: "name",
            thWidth: '140px',
            background: '1px solid red',
            checked: true,
        },
        {
            name: "Роль",
            key: "roles",
            thWidth: '140px',
            checked: true,
            isComputable: true,
        },
        {
            name: "Дата",
            key: "created_date",
            thWidth: '140px',
            checked: true,
            isComputable: true,
        },
    ]);

    // endregion

    const loading = ref(false)
    watch(params, async (value, oldValue, onCleanup) => {
        try {
            loading.value = true
            await _loadData();
        }catch (error){

        }finally {
            loading.value = false
        }
        // await _loadData();
    });

    // region Actions

    const getData = async (type: boolean) => {
        if (params.filter![0].value.includes(type.toString())) {
            params.filter![0].value.push(type.toString()) ;
            await _loadData();
        } else {
            params.filter![0].value.push(type.toString());
        }
    }

    const refresh = async () => {
        await _loadData();
    }

    const _loadData = async () => {
        const response = await $axios.post<AppResponse<KnowledgeCategoryModel>>(APIRoutes.KnowledgeCategoriesList,
            params,
            conf,
        );

        if (response.data) {
            data.value = response.data;
        }
    }

    const add = async (value: KnowledgeCategoryModel): Promise<KnowledgeCategoryModel> => {
        if (value.id !== undefined) {
            const response = await $axios.put<KnowledgeCategoryModel>(APIRoutes.KnowledgeCategoriesWithId(value.id!.toString()),
                value,
                conf,
            );
            return response.data;
        }
        const response = await $axios.post<KnowledgeCategoryModel>(APIRoutes.KnowledgeCategories,
            value,
            conf,
        );
        return response.data;
    }

    const setPage = (page: number) => {
        params.page = page;
    }

    const setPageSize = (pageSize: number) => {
        params.page_size = pageSize;
    }

    const sortData = (data: any) => {
        params.order_by = data;
    }

    const search = (value: string) => {
        params.page = 1;
        params.search = value;
    }

    // endregion

    return {
        data,
        params,
        templates,
        getData,
        setPage,
        setPageSize,
        sortData,
        search,
        add,
        refresh,
    };
})();
