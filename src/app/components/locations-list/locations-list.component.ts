import { Component, OnInit } from '@angular/core';
import { Seller } from '../../models/seller';
import { SellerServiceService } from '../../services/seller-service.service';
import { CommonModule } from '@angular/common';

/* Imports Angular Material */
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './locations-list.component.html',
  styleUrl: './locations-list.component.css'
})
export class LocationsListComponent implements OnInit {
  sellers: Seller[] = [];

  constructor(private sellerService: SellerServiceService) {}

  ngOnInit() {
    this.loadSellers()
  }

  loadSellers() {
    this.sellerService.getSellers()
      .subscribe({
        next: (sellers) => {
          this.sellers = sellers
          console.log('Local sellers: ', this.sellers)
        },
        error: (e) => console.log('Error: ', e),
        complete: () => console.info('Complete')
      })
  }

  formatCoordinates(coordinates: { latitude: number, longitude: number, height: number }): string {
    return `Longitude = ${coordinates.longitude}<br> Altitude = ${coordinates.latitude}<br> Height = ${coordinates.height}`;
  }

  setActive(text: boolean): string {
    if(text)
      return 'activo'
    else
      return 'inactivo'
  }
}
