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
import { StepChoice } from '../../../_classes/step-choice';
import { UuidService } from '../../../_services/uuid.service';
import { Step } from '../../../_classes/step';

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
  stepChoices: StepChoice[]=[];
  filteredStepsData: Step[] = [];
  constructor(private fb: FormBuilder, private uuidService: UuidService, public dialogRef: MatDialogRef<AddInvestigationStepDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any[]) {
    this.form = this.fb.group({
      description: [''],
      required: [''],
      displayType:[''],
      choices: this.fb.array([]),
      conditions: this.fb.array([])
    });

    this.filteredStepsData = data.filter(s => s.displayType !== "textbox");
   
  }

  get choices() {

    return this.form.get('choices') as FormArray;
  }

  addChoice() {
    const index = this.choices.length + 1;
    this.choices.push(this.fb.group({
      id: [index],
      choiceUuid:[this.uuidService.generateUuid()],
      description:['']
    }));
  }

  removeChoice(index: number) {
    this.choices.removeAt(index);
  }

//logic
  get conditions() {
    return this.form.get('conditions') as FormArray;
  }

  addCondition() {
    const index = this.conditions.length + 1;
    this.conditions.push(this.fb.group({
      conditionId:[index],
      stepUuid: [''],
      choiceUuid: ['']
    }));
  }

  removeCondition(index: number) {
    this.conditions.removeAt(index);
  }

 
  getValues(uuid: string) {

    for (const step of this.filteredStepsData) {
   
      if (step.choices && step.stepUuid === uuid) {
        this.stepChoices = step.choices   
      }
    }
  
  return []; 
}

  close(): void {
    this.dialogRef.close();
    this.form.reset();
  }

  save(): void {
    if (this.form.valid) {
      
      const newStepData = {
        id: this.data.length + 1,
        stepUuid: this.uuidService.generateUuid(),
        answer: '',
        textAnswer: '',
        isVisible:false,
        isCompleted:false,
        ...this.form.value
      }
      this.dialogRef.close(newStepData);
    } else {

    }

  }
}

interface DisplayType {
  value: string;
  label: string;
}
