
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-duplicate-investigation-dialog',
  templateUrl: './duplicate-investigation-dialog.component.html',
  imports: [MatFormField, ReactiveFormsModule,
    MatDialogModule, CommonModule, MatInputModule, MatButtonModule, MatSelectModule],
  standalone: true,
  styleUrls: ['./duplicate-investigation-dialog.component.scss']
})
export class DuplicateInvestigationDialogComponent {

  form: FormGroup;
  revisionStatus = [
    { value: 'Archived', label: 'Archived' },
    { value: 'Draft', label: 'Draft' },
    { value: 'Published', label: 'Published' }
  ];

  constructor( private fb: FormBuilder,public dialogRef: MatDialogRef<DuplicateInvestigationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      label: [this.data.investigation.label],
      revision_status: [this.data.investigation.revisionStatus],
      json_string: this.data.investigation.json_string
    });
  }

  close(): void {
    this.dialogRef.close(null);
    this.form.reset();
    }

  onSave(): void {
    if (this.form.valid) {
      const duplicateInvestigation = {
        ...this.data,
        label: this.form.value.label,
        revision_status: this.form.value.revision_status,
        json_string: this.data.investigation.json_string

      };
      this.dialogRef.close(duplicateInvestigation);
    }
  }
}
