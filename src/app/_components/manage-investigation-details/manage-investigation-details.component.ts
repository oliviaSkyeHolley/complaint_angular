import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { InvestigationDetailsComponent } from "../investigation-details/investigation-details.component";
import { UpdateInvestegationStepsComponent } from "../update-investegation-steps/update-investegation-steps.component";

@Component({
  selector: 'app-manage-investigation-details',
  standalone: true,
  imports: [MatTabsModule, InvestigationDetailsComponent, UpdateInvestegationStepsComponent],
  templateUrl: './manage-investigation-details.component.html',
  styleUrl: './manage-investigation-details.component.scss'
})
export class ManageInvestigationDetailsComponent {

}
