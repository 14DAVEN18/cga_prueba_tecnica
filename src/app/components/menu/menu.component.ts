/* Angular Imports */
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/* Import self developed modules */

/* Imports from Angular Material */


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  selectedOption?: string

  displayedContent(option: string) {
    this.selectedOption = option;
    console.log(this.selectedOption)
  }
}