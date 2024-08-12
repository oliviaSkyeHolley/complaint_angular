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
import { Step } from '../../../_classes/step';
@Component({
  selector: 'app-update-investigation-step-dialog',
  standalone: true,
  imports: [MatFormField, ReactiveFormsModule,
    MatDialogModule, CommonModule,MatIconModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './update-investigation-step-dialog.component.html',
  styleUrl: './update-investigation-step-dialog.component.scss'
})
export class UpdateInvestigationStepDialogComponent {
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

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<UpdateInvestigationStepDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { step: any; stepsData: any[] } ) {
    this.form = this.fb.group({
      description: [data.step.description],
      required: [data.step.required],
      displayType:[data.step.displayType],
      choices: this.fb.array(
        data.step.choices.map((choice: any) => this.fb.group({
          id: [choice.id],
          choiceUuid:[choice.choiceUuid],
          description: [choice.description || '']
        })) || []
      ),
      conditions: this.fb.array(
        data.step.conditions.map((condition: any) => this.fb.group({
          stepUuid: [condition.stepUuid || ''],
          choiceUuid: [condition.choiceUuid || '']
        })) || []
      )
    });
    this.filteredStepsData = data.stepsData.filter(s => s.stepUuid !== data.step.stepUuid);
  }

  get choices() {
    return this.form.get('choices') as FormArray;
  }

  addChoice() {
    const index = this.choices.length + 1;
    this.choices.push(this.fb.group({
       id: [index],
      choiceUuid:[''],
      description:['']
    }));
  }

  removeChoice(index: number) {
    this.choices.removeAt(index);
  }

//logic
  get conditions() {
    console.log("selected id: ", this.data.step.stepUuid)
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
      for (const step of this.data.stepsData) {   
        if (step.choices && step.stepUuid === uuid) {
          this.stepChoices = step.choices;
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
      console.log(this.form.value.displayType )
      console.log(this.form.value.stepChoices )
      if(this.form.value.displayType == "textbox"){
        this.form.value.choices = [];
      }
      const updatedStep = {
        id: this.data.step.id,
        stepUuid: this.data.step.stepUuid,
        ...this.form.value,
      };
      this.dialogRef.close(updatedStep);
    } else {

    }

  }
}

interface DisplayType {
  value: string;
  label: string;
}
