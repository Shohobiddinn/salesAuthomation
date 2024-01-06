import { BoxTypeModel } from "./box-type-model"
import { imageModel } from "./image-model"
import { ProductCategoryModel } from "./product-category-model"
import { ProductGroupsModel } from "./product-groups-model"
import { UnitModel } from "./unit-model"

export interface ProductsModel{
    name?:string,
    volume:number
    category_id?:string,
    unit_id?:string,
    quantity_in_package?:number | null,
    weight?:number,
    sort?:number,
    sales_channel_id?:string,
    box_type_id?:string,
    code?:string,
    sub_code?:string,
    bar_code?:string,
    IKPU_code?:string,
    MML?:boolean,
    image_id?:string,
    brand_id?:string,
    product_group_id?:string,
    category: ProductCategoryModel,
    unit: UnitModel,
    sales_channel: unknown,
    box_type: BoxTypeModel,
    image: imageModel,
    brand: unknown,
    product_group: ProductGroupsModel,
    id?:number | undefined,
    is_active?:boolean,

}
