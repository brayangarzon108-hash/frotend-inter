import { Component, Input, input, OnInit, output } from '@angular/core';
import {
  CreateSubjectStudent,
  Subject,
} from '../../../../core/enum/models/student.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { StudentService } from '../../../../core/services/student.service';
import { ApiResponse } from '../../../../core/enum/response/api-response.model';
import { MessageService } from 'primeng/api';
import { StatusCode } from '../../../../core/enum/response/status-code.enum';

@Component({
  selector: 'app-modal-subject-list',
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
  templateUrl: './modal-subject-list.html',
  styleUrl: './modal-subject-list.scss',
})
export class ModalSubjectList implements OnInit {
  @Input() visible2: boolean = false;
  subjectList: Subject[] = [];
  data = input.required<number | null | undefined>();
  visibility = input.required<boolean>();
  handleLoadingUpsert: boolean = false;
  modeModal: boolean = false;
  closeUno = output<boolean>();
  upsertCatalog!: FormGroup;
  tempEnabled: boolean = false;
  constructor(
    private fb: FormBuilder,
    private dynamicCatalogService: StudentService,
    private messageService: MessageService,
  ) {
    this.upsertCatalog = this.fb.group({
      studentId: [0],
      subjectId: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    this.getSubject();
    if (this.data()) {
      const data = this.data() ?? {};
      this.upsertCatalog.patchValue({
        studentId: this.data()!,
      });
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
    this.closeUno.emit(true);
    this.visible2 = false;
  }
  upsertDynamicSubject(data: CreateSubjectStudent) {
    const payload: CreateSubjectStudent = {
      studentId: data.studentId,
      subjectId: data.subjectId,
    };
    this.handleLoadingUpsert = true;

    this.dynamicCatalogService.upsertDynamicSubject(payload).subscribe({
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

  getSubject() {
    this.handleLoadingUpsert = true;
    this.dynamicCatalogService.getSubject().subscribe({
      next: (response: ApiResponse<Subject[]>) => {
        if (response.status === StatusCode.OK) {
          this.subjectList = response.data;
        } else {
          this.subjectList = [];
        }
      },
      complete: () => {
        this.handleLoadingUpsert = false;
      },
    });
  }
}
