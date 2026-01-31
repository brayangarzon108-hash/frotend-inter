import { Component, OnInit } from '@angular/core';
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
  Catalog,
  ItemModal,
  CatalogModal,
  Item,
  CatalogFilter,
} from '../../core/enum/models/student.model';
import { ApiResponse } from '../../core/enum/response/api-response.model';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { StatusCode } from '../../core/enum/response/status-code.enum';

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
    //ModalItemsComponent,
  ],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss',
})
export class StudentListComponent implements OnInit {
  typeForm: string = '';
  first: number = 0;
  rows: number = 10;
  dataCatalog!: CatalogModal | null;
  filterCatalog!: FormGroup;
  handleLoading: boolean = false;
  visibilityModal: boolean = true;
  handleCatalogModal: boolean = false;
  handleItemModal: boolean = false;
  totalRecords: number = 0;
  dynamicCatalogId: number = 0;
  sizeWindow: string = '';
  formsList: Catalog[] = [];
  itemsList: Item[] = [];
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
    this.getCatalog(this.filterCatalog.value);
  }

  clearFilter() {
    this.filterCatalog.patchValue({ nameCatalog: '' });
    this.getCatalog(this.filterCatalog.value);
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }

  // Open Modal Form
  openModalForm(data: CatalogModal | null, visibility: boolean) {
    this.handleCatalogModal = true;
    if (data) {
      this.dataCatalog = data;
    }
    this.visibilityModal = visibility;
  }

  // Open Modal Item
  openModalItem(dynamicCatalogId: number) {
    this.dynamicCatalogId = dynamicCatalogId;
    this.handleItemModal = true;
  }

  closeDialog() {
    this.handleCatalogModal = false;
    this.getCatalog(this.filterCatalog.value);
    this.dataCatalog = null;
  }

  closeDialogItem() {
    this.handleItemModal = false;
    this.getCatalog(this.filterCatalog.value);
  }

  getCatalog(payload: CatalogFilter) {
    this.handleLoading = true;
    this.dynamicService.getStudents(payload.page, payload.pagesize, payload.nameCatalog).subscribe({
      next: (response: ApiResponse<Catalog[]>) => {
        if (response.status === StatusCode.OK) {
          this.formsList = response.data;
          this.totalRecords = response.data.length;
        }
      },
      complete: () => {
        this.handleLoading = false;
      },
    });
  }
}
