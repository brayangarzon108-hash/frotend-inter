export enum EndPointRoute {
  //STUDENT ITEMS
  ALL_PROGRAMATION = 'Student/GetAllProgramation',
  ALL_SUBJECT = 'StudentSubject/GetAllSubject',
  ALL_STUDENTS = 'Student/GetAllAlumn',
  ALL_STUDENTS_SUBJECT = 'StudentSubject/GetAllSubjectAlumn',
  UPSERT_STUDENTS = 'Student/CreateAlumn',
  UPDATE_STUDENTS = 'Student/UpdateAlumn',
  DELETE_STUDENTS_SUBJECT = 'StudentSubject/DeleteAlumn',
  UPSERT_STUDENTS_SUBJECTS = 'StudentSubject/InsertAlumnSubject',
  ALL_STUDENTS_SUBJECT_NAME = 'Classmate/GetClassmates',
}
