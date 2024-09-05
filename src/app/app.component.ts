import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, RouterOutlet, Router} from '@angular/router';
import { MenubarComponent } from "./_components/menubar/menubar.component";
import { HomeComponent } from "./_components/home/home.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, MenubarComponent, HomeComponent],
  //Want to see if this template works for I can easily build it
  templateUrl: './app.component.html',
  /*template: `
  <main>
    <header class="brand-name">
      <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
    </header>
    <section class="content">
      <app-home></app-home>
    </section>
  </main>
`,*/
  styleUrl: './app.component.scss'

})
export class AppComponent {
  constructor(public router: Router){}
  title = 'Complaint Investigation Angular Components';
}

