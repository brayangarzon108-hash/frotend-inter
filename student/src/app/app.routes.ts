import { Routes } from '@angular/router';
import { RoutesApp } from './core/enum/routes/routes.enum';
import { StudentListComponent } from './pages/student-list.component/student-list.component';

export const routes: Routes = [
  {
    path: RoutesApp.STUDENTLIST,
    component: StudentListComponent,
  },
  { path: '', component: StudentListComponent },
];
