import { ChangeDetectorRef, Component, inject, input, Input, OnInit, output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectModule } from 'primeng/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { StudentService } from '../../../../core/services/student.service';
import {
  Student,
  CreateStudent,
  CatalogFilter,
  ResponseStudent,
  ListStudentSubject,
} from '../../../../core/enum/models/student.model';
import { ApiResponse } from '../../../../core/enum/response/api-response.model';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { StatusCode } from '../../../../core/enum/response/status-code.enum';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-consult-student-list',
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
    Dialog,
  ],
  templateUrl: './consult-student-subject.component.html',
  styleUrl: './consult-student-subject.component.scss',
})
export class ConsultStudentSubjectComponent implements OnInit {
  @Input() visible: boolean = false;
  data = input.required<ListStudentSubject | null | undefined>();
  typeForm: string = '';
  close = output<boolean>();
  first: number = 0;
  rows: number = 10;
  dataCatalog!: number | undefined | null;
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

  closeDialog() {
    this.handleCatalogModal = false;
    this.handleLoading = false;
    this.getStudent(this.filterCatalog);
    this.dataCatalog = null;
    this.close.emit(true);
    this.visible = false;
  }

  getStudent(filter: FormGroup) {
    debugger;
    this.handleLoading = true;
    const data: CatalogFilter = {
      ...filter.value,
      page: this.first,
      pagesize: this.rows,
    };
    this.dynamicService
      .getStudentsSubjectName(
        data.page,
        data.pagesize,
        this.data()!.studentId,
        this.data()!.subjectId,
        data.nameCatalog,
      )
      .subscribe({
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
