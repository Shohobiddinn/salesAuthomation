import {defineStore} from "pinia";
import {APIRoutes} from "~/variable/api-routes";
import {Ref} from "vue";
import {AppResponse} from "~/interfaces/api/app-response";
import {ListParams} from "~/interfaces/api/list-parameters";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {Template} from "~/interfaces/ui/template";
import {ProductSubCategoryModel} from "~/interfaces/api/product-sub-category-model";

export const useProductSubCategoryStore = (tableId: string) => defineStore(`product_sub_category_${tableId}`, () => {
    const {$axios} = useNuxtApp();

    // region States

    const data: Ref<AppResponse<ProductSubCategoryModel> | undefined> = ref();

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
            type:"name",
            checked: true,
            thWidth:"120px"
        },
        {
            name: "Сортировка",
            key: "code",
            type:"code",
            checked: true,
            thWidth:"120px"
        },
        {
            name: "Единицы Измерение",
            key: "unit",
            type:"unit",
            checked: true,
            thWidth:"120px"
        },
    ]);

    // endregion

    watch(params, async (value, oldValue, onCleanup) => {
        await _loadData();
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
        const response = await $axios.post<AppResponse<ProductSubCategoryModel>>(APIRoutes.ProductSubCategoriesList,
            params,
            conf,
        );
        if (response.data) {
            data.value = response.data;
            console.log('product', response)
        }
    }

    const add = async (value: ProductSubCategoryModel): Promise<ProductSubCategoryModel> => {
        if (value.id !== undefined) {
            const response = await $axios.put<ProductSubCategoryModel>(APIRoutes.ProductSubCategoriesWithId(value.id!.toString()),
                value,
                conf,
            );
            return response.data;
        }
        const response = await $axios.post<ProductSubCategoryModel>(APIRoutes.ProductSubCategories,
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
