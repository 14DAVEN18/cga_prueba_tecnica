import { Component, OnInit } from '@angular/core';
import { Seller } from '../../models/seller';
import { SellerServiceService } from '../../services/seller-service.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

/* Imports Angular Material */
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-locations-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './locations-list.component.html',
  styleUrl: './locations-list.component.css'
})
export class LocationsListComponent implements OnInit {
  sellers: Seller[] = [];

  constructor(private sellerService: SellerServiceService, public dialog: MatDialog) {}

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

  openDialog() {
    this.dialog.open(CreateSellerModal);
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

@Component({
  selector: 'create-seller-modal',
  templateUrl: 'create-seller-modal.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogContent, MatDialogModule, MatDialogTitle, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, ReactiveFormsModule],
  styleUrl: './locations-list.component.css'
})
export class CreateSellerModal {

  constructor(private sellerService: SellerServiceService) {}

  name = new FormControl('');

  createSeller() {

  }
}