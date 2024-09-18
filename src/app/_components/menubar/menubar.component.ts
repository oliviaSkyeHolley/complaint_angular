import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [RouterModule, NgIf, NgOptimizedImage],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class MenubarComponent {
  constructor(protected authService: AuthService, private router: Router) {}
  logout(): void {
    this.authService.logout();
  }


}
