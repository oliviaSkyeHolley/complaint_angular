import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-investigation-dialog',
  standalone: true,
  imports: [MatFormField, ReactiveFormsModule,
    MatDialogModule, CommonModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './add-investigation-dialog.component.html',
  styleUrl: './add-investigation-dialog.component.scss'
})
export class AddInvestigationDialogComponent {

  form: FormGroup;
  revisionStatus: RevisionStatus[] = [
    { value: 'Archived', label: 'Archived' },
    { value: 'Draft', label: 'Draft' },
    { value: 'Published', label: 'Published' }
  ];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddInvestigationDialogComponent>) {
    this.form = this.fb.group({
      label: [''],
      revision_status: ['Draft']
    });
  }

  close(): void {
    this.dialogRef.close();
    this.form.reset();
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {

    }

  }
}

interface RevisionStatus {
  value: string;
  label: string;
}

