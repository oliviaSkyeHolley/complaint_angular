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
  selector: 'app-add-report-dialog',
  standalone: true,
  imports: [MatFormField, ReactiveFormsModule,
    MatDialogModule, CommonModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './add-report-dialog.component.html',
  styleUrl: './add-report-dialog.component.scss'
})
export class AddReportDialogComponent {

  form: FormGroup;
  revisionStatus: RevisionStatus[] = [
    { value: '1', label: 'Archived' },
    { value: '2', label: 'Draft' },
    { value: '3', label: 'Published' }
  ];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddReportDialogComponent>) {
    this.form = this.fb.group({
      label: [''],
      revision_status: ['1']
    });
  }

  close(): void {
    this.dialogRef.close();
    this.form.reset();
  }

  save(): void {
    if (this.form.valid) {
      console.log(this.form.value)
      this.dialogRef.close(this.form.value);
    } else {

    }

  }
}

interface RevisionStatus {
  value: string;
  label: string;
}

