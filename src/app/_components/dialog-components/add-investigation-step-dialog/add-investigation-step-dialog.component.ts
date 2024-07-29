import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray  } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-add-investigation-step-dialog',
  standalone: true,
  imports: [MatFormField, ReactiveFormsModule,
    MatDialogModule, CommonModule,MatIconModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './add-investigation-step-dialog.component.html',
  styleUrl: './add-investigation-step-dialog.component.scss'
})
export class AddInvestigationStepDialogComponent {
  form: FormGroup;
  displayType: DisplayType[] = [
    { value: 'radio', label: 'Radio' },
    { value: 'radio&text', label: 'Radio & Text' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'checkbox&text', label: 'Checkbox & Text' },
    { value: 'textbox', label: 'Textbox' }
  ];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddInvestigationStepDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      description: [''],
      required: [''],
      displayType:[''],
      options: this.fb.array([]),
      conditions: this.fb.array([])
    });
    
  }

  get options() {
    return this.form.get('options') as FormArray;
  }

  addOption() {
    this.options.push(this.fb.control(''));
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

//logic
  get conditions() {
    return this.form.get('conditions') as FormArray;
  }

  addCondition() {
    this.conditions.push(this.fb.control(''));
  }

  removeCondition(index: number) {
    this.conditions.removeAt(index);
  }

 
  //get the values of a step(have to work on it)
  getValues(id: string) {
  console.log(id)
    if (Array.isArray(this.data.step)) {
   
      for (const step of this.data.step) {
      
        if (step.choice && step.stepId === id) {
          console.log(step.choice)
          return step.choice; 
        }
      }
    }
    return []; 
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      console.log(this.form.value)
      this.dialogRef.close(this.form.value);
    } else {

    }

  }
}

interface DisplayType {
  value: string;
  label: string;
}
