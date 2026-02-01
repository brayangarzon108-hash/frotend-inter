import { ChangeDetectorRef, Component, inject, input, Input, OnInit, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectModule } from 'primeng/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { StudentService } from '../../../core/services/student.service';
import { CreateStudent, ListStudentSubject } from '../../../core/enum/models/student.model';
import { ApiResponse } from '../../../core/enum/response/api-response.model';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { StatusCode } from '../../../core/enum/response/status-code.enum';
import { ModalSubjectList } from './modal-subject-list/modal-subject-list';
import { ConfirmDialogModule, ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConsultStudentSubjectComponent } from './consult-student-subject.component/consult-student-subject.component';

@Component({
  selector: 'app-subject-list',
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
    ConfirmDialogModule,
    ProgressSpinnerModule,
    FormsModule,
    TooltipModule,
    ModalSubjectList,
    ConsultStudentSubjectComponent,
    ConfirmDialog,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.scss',
})
export class SubjectListComponent implements OnInit {
  @Input() visible: boolean = false;
  //data = input.required<CreateStudent | null>();
  visibility = input.required<boolean>();
  close = output<boolean>();
  typeForm: string = '';
  first: number = 0;
  rows: number = 10;
  dataCatalog!: number | undefined | null;
  handleLoading: boolean = false;
  visibilityModal: boolean = true;
  handleCatalogModal: boolean = false;
  handleItemModal: boolean = false;
  totalRecords: number = 0;
  dataSubject: ListStudentSubject | undefined | null;
  sizeWindow: string = '';
  formsList: ListStudentSubject[] = [];
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  studentId: number = 0;
  nameStudent: string = '';
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dynamicService: StudentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['idStudent']) {
        this.studentId = parseInt(decodeURIComponent(params['idStudent']));
        this.getStudentsSubject(this.studentId);
      }
      if (params['nameStudent']) {
        this.nameStudent = decodeURIComponent(params['nameStudent']);
      }
    });
  }

  clearFilter() {
    this.getStudentsSubject(this.studentId);
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }

  // Open Modal Form
  openModalForm(data: number | undefined, visibility: boolean) {
    this.handleCatalogModal = true;
    if (data) {
      this.dataCatalog = data;
    }
    this.visibilityModal = visibility;
  }

  // Open Modal Item
  openModalItem(data: ListStudentSubject) {
    if (data) {
      this.dataSubject = data;
    }
    this.handleItemModal = true;
  }

  closeDialog() {
    this.handleCatalogModal = false;
    this.handleLoading = false;
    this.getStudentsSubject(this.studentId);
    this.dataCatalog = null;
    this.close.emit(true);
    this.visible = false;
  }

  closeDialogItem() {
    this.handleItemModal = false;
    this.handleLoading = false;
    this.getStudentsSubject(this.studentId);
    this.dataCatalog = null;
  }

  getStudentsSubject(filter: number) {
    this.handleLoading = true;
    this.dynamicService.getStudentsSubject(filter).subscribe({
      next: (response: ApiResponse<ListStudentSubject[]>) => {
        if (response.status === StatusCode.OK) {
          this.formsList = response.data;
          this.totalRecords = response.data.length;
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

  confirmDelete(item: any) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar este registro?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',

      accept: () => {
        this.delete(item);
      },

      reject: () => {
        // opcional
      },
    });
  }

  delete(item: any) {
    // Servicio de eliminacion
    this.dynamicService.deleteStudentsSubject(item.studentSubjectId).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Eliminado',
        detail: 'Registro eliminado correctamente',
      });
      this.getStudentsSubject(this.studentId);
    });
  }
}
