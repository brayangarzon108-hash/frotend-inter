import { Component, Input, input, OnInit, output } from '@angular/core';
import {
  CreateStudent,
  Programation,
} from '../../../core/enum/models/student.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { StudentService } from '../../../core/services/student.service';
import { ApiResponse } from '../../../core/enum/response/api-response.model';
import { MessageService } from 'primeng/api';
import { StatusCode } from '../../../core/enum/response/status-code.enum';

@Component({
  selector: 'app-modal-student-list',
  imports: [
    ToastModule,
    Dialog,
    ButtonModule,
    CommonModule,
    InputTextModule,
    SelectModule,
    ToggleSwitchModule,
    ReactiveFormsModule,
    TagModule,
  ],
  templateUrl: './modal-student-list.component.html',
  styleUrl: './modal-student-list.component.scss',
})
export class ModalStudentListComponent implements OnInit {
  @Input() visible: boolean = false;
  programList: Programation[] = [];
  data = input.required<CreateStudent | null>();
  visibility = input.required<boolean>();
  handleLoadingUpsert: boolean = false;
  modeModal: boolean = false;
  close = output<boolean>();
  upsertCatalog!: FormGroup;
  tempEnabled: boolean = false;
  constructor(
    private fb: FormBuilder,
    private dynamicCatalogService: StudentService,
    private messageService: MessageService,
  ) {
    this.upsertCatalog = this.fb.group({
      studentId: [0],
      fullName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      programId: [0, Validators.required],
    });
  }
  ngOnInit(): void {
    this.getProgram();
    if (this.data()) {
      const data = this.data() ?? {};
      this.upsertCatalog.patchValue(data);
      if (this.visibility()) {
        this.upsertCatalog.enable();
      } else {
        this.upsertCatalog.disable();
      }
      this.tempEnabled = this.upsertCatalog.get('enabled')?.value;
      this.modeModal = true;
    }
  }
  closeDialog() {
    this.close.emit(true);
    this.visible = false;
  }
  upsertDynamicCatalog(data: CreateStudent) {
    const payload: CreateStudent = {
      studentId: data.studentId,
      fullName: data.fullName,
      email: data.email,
      programId: data.programId,
    };
    this.handleLoadingUpsert = true;

    if (payload.studentId === 0) {
      this.dynamicCatalogService.upsertDynamicStudent(payload).subscribe({
        next: (response: ApiResponse<string>) => {
          if (response.status === StatusCode.OK) {
            this.messageService.add({
              severity: 'success',
              summary: 'Proceso exitoso',
              detail: `Catalogo ${payload.studentId === 0 ? 'creado' : 'actualizado'} existosamente`,
              life: 3000,
            });
            this.closeDialog();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Proceso erroneo',
              detail: response.message,
              life: 3000,
            });
          }
        },
        complete: () => {
          this.handleLoadingUpsert = false;
        },
      });
    } else {
      this.dynamicCatalogService.updateDynamicStudent(payload).subscribe({
        next: (response: ApiResponse<string>) => {
          if (response.status === StatusCode.OK) {
            this.messageService.add({
              severity: 'success',
              summary: 'Proceso exitoso',
              detail: `Catalogo ${payload.studentId === 0 ? 'creado' : 'actualizado'} existosamente`,
              life: 3000,
            });
            this.closeDialog();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Proceso erroneo',
              detail: response.message,
              life: 3000,
            });
          }
        },
        complete: () => {
          this.handleLoadingUpsert = false;
        },
      });
    }
  }

  getProgram() {
    this.handleLoadingUpsert = true;
    this.dynamicCatalogService.getProgramation().subscribe({
      next: (response: ApiResponse<Programation[]>) => {
        if (response.status === StatusCode.OK) {
          this.programList = response.data;
        } else {
          this.programList = [];
        }
      },
      complete: () => {
        this.handleLoadingUpsert = false;
      },
    });
  }
}
