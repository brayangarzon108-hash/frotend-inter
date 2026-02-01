import { Component, Input, input, OnInit, output } from '@angular/core';
import {
  Student,
  Catalog,
  ItemModal,
  CatalogModal,
  Item,
  CatalogFilter,
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
  data = input.required<CatalogModal | null>();
  visibility = input.required<boolean>();
  handleLoadingUpsert: boolean = false;
  modeModal: boolean = false;
  close = output<boolean>();
  itemsList: Item[] = [];
  upsertCatalog!: FormGroup;
  tempEnabled: boolean = false;
  constructor(
    private fb: FormBuilder,
    private dynamicCatalogService: StudentService,
    private messageService: MessageService
  ) {
    this.upsertCatalog = this.fb.group({
      catalogId: [0],
      catalogName: [null, Validators.required],
      description: [null, Validators.required],
      userId: [0],
      enabled: [false, Validators.required],
    });
  }
  ngOnInit(): void {

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
  upsertDynamicCatalog(data: CatalogModal) {
    const previousValue = data.enabled;

    const payload: CatalogModal = {
      catalogId: data.catalogId,
      catalogName: data.catalogName,
      description: data.description,
      userId: data.userId,
      enabled: data.enabled,
    };
    this.handleLoadingUpsert = true;
    this.dynamicCatalogService.upsertDynamicCatalogs(null).subscribe({
      next: (response: ApiResponse<string>) => {
        if (response.status === StatusCode.OK) {
          this.messageService.add({
            severity: 'success',
            summary: 'Proceso exitoso',
            detail: `Catalogo ${payload.catalogId === 0 ? 'creado' : 'actualizado'} existosamente`,
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
          this.tempEnabled = previousValue;
        }
      },
      complete: () => {
        this.handleLoadingUpsert = false;
      },
    });
  }
}
