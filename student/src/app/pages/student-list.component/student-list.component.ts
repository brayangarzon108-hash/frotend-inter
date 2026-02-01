import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectModule } from 'primeng/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { StudentService } from '../../core/services/student.service';
import {
  Student,
  CreateStudent,
  CatalogFilter,
  ResponseStudent,
} from '../../core/enum/models/student.model';
import { ApiResponse } from '../../core/enum/response/api-response.model';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { StatusCode } from '../../core/enum/response/status-code.enum';
import { ModalStudentListComponent } from './modal-student-list/modal-student-list.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { debug } from 'console';
import { RoutesApp } from '../../core/enum/routes/routes.enum';

@Component({
  selector: 'app-student-list',
  imports: [
    ButtonModule,
    TableModule,
    PaginatorModule,
    TagModule,
    SelectModule,
    InputTextModule,
    ToastModule,
    ToggleSwitchModule,
    ReactiveFormsModule,
    //ModalCatalogsComponent,
    ProgressSpinnerModule,
    FormsModule,
    TooltipModule,
    ModalStudentListComponent,
    SubjectListComponent,
  ],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss',
})
export class StudentListComponent implements OnInit {
  typeForm: string = '';
  first: number = 0;
  rows: number = 10;
  dataCatalog!: CreateStudent | null;
  filterCatalog!: FormGroup;
  handleLoading: boolean = false;
  visibilityModal: boolean = true;
  handleCatalogModal: boolean = false;
  handleItemModal: boolean = false;
  totalRecords: number = 0;
  dynamicCatalogId: number = 0;
  sizeWindow: string = '';
  formsList: Student[] = [];
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dynamicService: StudentService,
  ) {
    this.filterCatalog = this.fb.group({
      nameCatalog: [''],
    });
  }
  ngOnInit(): void {
    this.getStudent(this.filterCatalog);
  }

  clearFilter() {
    this.filterCatalog.patchValue({ nameCatalog: '' });
    this.getStudent(this.filterCatalog);
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }

  // Open Modal Form
  openModalForm(data: CreateStudent | null, visibility: boolean) {
    this.handleCatalogModal = true;
    if (data) {
      this.dataCatalog = data;
    }
    this.visibilityModal = visibility;
  }

  // Open Modal Item
  openModalItem(data: CreateStudent | null, visibility: boolean) {
    if (data) {
      this.dataCatalog = data;
    }
    this.router.navigate(['/' + RoutesApp.SUBJECTLIST], {
      queryParams: {
        idStudent: this.dataCatalog?.studentId,
        nameStudent: this.dataCatalog?.fullName,
      },
    });
    this.visibilityModal = visibility;
    this.handleItemModal = true;
  }

  closeDialog() {
    this.handleCatalogModal = false;
    this.handleLoading = false;
    this.getStudent(this.filterCatalog);
    this.dataCatalog = null;
  }

  closeDialogItem() {
    this.handleItemModal = false;
    this.dataCatalog = null;
    this.handleLoading = false;
    this.getStudent(this.filterCatalog);
  }

  getStudent(filter: FormGroup) {
    this.handleLoading = true;
    const data: CatalogFilter = {
      ...filter.value,
      page: this.first,
      pagesize: this.rows,
    };
    this.dynamicService.getStudents(data.page, data.pagesize, data.nameCatalog).subscribe({
      next: (response: ApiResponse<ResponseStudent>) => {
        if (response.status === StatusCode.OK) {
          this.formsList = response.data.infomationProcess;
          this.totalRecords = response.data.countRegister;
          this.handleLoading = false;
          this.cdr.detectChanges();
        } else {
          this.formsList = [];
          this.totalRecords = 0;
          this.handleLoading = false;
          this.cdr.detectChanges();
        }
      },
      complete: () => {
        this.handleLoading = false;
      },
    });
  }
}
