import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/* Import of self developed components */
import { MenuComponent } from './components/menu/menu.component';
import { LocationsListComponent } from './components/locations-list/locations-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, LocationsListComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cga_prueba_tecnica';
}
