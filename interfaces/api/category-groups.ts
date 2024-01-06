export interface Categories {
  category_id: string;
}
export interface CategoryGroups {
  id: string | undefined;
  name: string;
  categories: Array<Categories>;
}

export interface CategoryGroupsModel {
  category_id: string;
  category_name: string;
}
