import { Routes } from '@angular/router';
import { AuthGuard } from './_services/auth-guard.guard';
import { AuthenticateComponent } from './_components/authenticate/authenticate.component';
import { InvestigationListComponent } from './_components/investigation-list/investigation-list.component';
import { InvestigationDetailsComponent } from './_components/investigation-details/investigation-details.component';
import { UpdateInvestegationStepsComponent } from './_components/dialog-components/update-investegation-steps/update-investegation-steps.component';
export const appRoutes: Routes = [
  //{ path: '', redirectTo: '/investigation/list', pathMatch: 'full' },
  { path: 'user/login', component: AuthenticateComponent },
  { path: 'investigation/list', component: InvestigationListComponent, canActivate: [AuthGuard] },
  { path: 'investigation/detail/:id', component: InvestigationDetailsComponent, canActivate: [AuthGuard] },
  { path: 'investigation/detail/update/:id', component: UpdateInvestegationStepsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/user/login' }
];
