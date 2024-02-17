import { Component, Inject,   OnInit } from '@angular/core';
import { SellerServiceService } from '../../services/seller-service.service';

/* Imports from Angular Material */
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/* Import Interfaces */
import { Seller } from '../../models/seller';


declare const google: any;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  coordinates: {lat: number, lng: number, vehicle: string, id: string}[] = []
  sellers: Seller[] = []

  constructor(private sellerService: SellerServiceService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadSellers()
    this.initMap();
  }

  loadSellers() {
    this.sellerService.getSellers()
      .subscribe({
        next: (sellers) => {
          this.sellers= sellers
          sellers.forEach((seller) => {
            this.coordinates.push({
              lat: seller.coordinates.latitude,
              lng: seller.coordinates.longitude,
              vehicle: seller.vehicle,
              id: seller.id
            })
          })
          console.log('Coordinates: ', this.coordinates)
        },
        error: (e) => console.log('Error: ', e),
        complete: () => console.info('Complete')
      })
  }


  private initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 4.6497035, lng: -74.1751445 },
      zoom: 13
    })

    this.coordinates.forEach(coordinate => {
      const icon = {
        url: '/assets/img_prueba/' + coordinate.vehicle + '.svg',
        scaledSize: new google.maps.Size(40, 40),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(20, 40)
      }

      const marker = new google.maps.Marker({
        position: coordinate,
        map: map,
        icon: icon
      });

      marker.addListener("click", () => {
        this.openDialog(coordinate.id)
      })
    });
  }

  openDialog(id: string) {
    const seller = this.sellers.find(seller => seller.id === id)
    console.log("Selected seller: " , seller)
    this.dialog.open(SellerModal, {
      data: seller
    });
  }
}

@Component({
  selector: 'seller-modal',
  templateUrl: 'seller-modal.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle],
  styleUrl: './map.component.css'
})
export class SellerModal {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Seller) {}
}