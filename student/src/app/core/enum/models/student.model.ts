export interface Student {
  studentId: number;
  fullName: string;
  email: string;
  programId: number;
  programName: string;
}

export interface ResponseStudent {
  countRegister: number;
  infomationProcess: Student[];
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

export interface ListStudentSubject {
  studentSubjectId: number;
  subjectId: number;
  nameSubjectId: string;
  nameStudentId: number;
  studentId: number;
  credits: number;
}

export interface CreateStudent {
  studentId: number;
  fullName: string;
  email: string;
  programId: number;
}

export interface CreateSubjectStudent {
  studentId: number;
  subjectId: number;
}

export interface Programation {
  programId: number;
  name: string;
}

export interface Subject {
  subjectId: number;
  nameSubject: string;
  teacher: string;
}

export interface CatalogFilter {
  nameCatalog: string;
  page: number;
  pagesize: number;
}
