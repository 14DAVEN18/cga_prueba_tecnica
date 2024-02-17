import { Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { TestComponent } from './components/test/test.component';
import { Page1Component } from './components/page-1/page-1.component';
import { Page2Component } from './components/page-2/page-2.component';
import { Page3Component } from './components/page-3/page-3.component';

export const routes: Routes = [
    { 'path': 'map', 'title': 'Map', 'component': MapComponent },
    { 'path': 'page-1', 'title': 'Page 1', 'component': Page1Component},
    { 'path': 'page-2', 'title': 'Page 2', 'component': Page2Component},
    { 'path': 'page-3', 'title': 'Page 3', 'component': Page3Component}
];
