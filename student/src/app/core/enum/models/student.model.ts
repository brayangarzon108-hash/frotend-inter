export interface Student {
  studentId: number;
  fullName: string;
  email: string;
  programName: string;
}

export interface ItemModal {
  itemId: number;
  catalogId: number;
  itemName: string;
  itemValue: string;
  userId: string;
  enabled: boolean;
}
export interface Catalog {
  catalog_id: number;
  catalog_name: string;
  description: string;
  createdDate: string;
  updateDate: string;
  createdBy: number;
  updatedBy: number;
  enabled: boolean;
}

export interface Item {
  item_id: number | string;
  item_name: string;
  item_value: string;
  catalog_id: number;
  createdDate: string;
  updateDate: string;
  createdBy: number;
  updatedBy: number;
  enabled: boolean;
}

export interface CatalogModal {
  catalogId: number;
  catalogName: string;
  description: string;
  userId: string;
  enabled: boolean;
}

export interface FormFilter {
  typeForm: number;
  nameForm: string;
}

export interface CatalogFilter {
  nameCatalog: string;
  page: number;
  pagesize: number;
}
