import { Component , Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
// Angular Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
@Component({
  selector: 'app-update-step-dialog',
  standalone: true,
  imports: [MatFormField,FormsModule, MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule, CommonModule, MatRadioModule],
  templateUrl: './update-step-dialog.component.html',
  styleUrl: './update-step-dialog.component.scss'
})
export class UpdateStepDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateStepDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {console.log(data)}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(updatedQuestion: any): void {
    // implement the save logic here
   
    this.dialogRef.close(updatedQuestion);
  }
}
