import { Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { TestComponent } from './components/test/test.component';

export const routes: Routes = [
    { 'path': 'map', 'title': 'Map', 'component': MapComponent },
    { 'path': 'test', 'title': 'Test', 'component': TestComponent}
];
