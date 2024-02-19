import { Component, Inject,   OnDestroy,   OnInit } from '@angular/core';
import { SellerServiceService } from '../../services/seller-service.service';

/* Imports from Angular Material */
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA
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
export class MapComponent implements OnInit, OnDestroy {
  coordinates: {lat: number, lng: number, vehicle: string, id: string}[] = []
  sellers: Seller[] = []
  private intervalId: any;

  constructor(private sellerService: SellerServiceService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadSellers()
    this.intervalId = setInterval(() => {
      this.loadSellers();
      this.coordinates = []
    }, 120000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
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
          this.initMap();
        },
        error: (e) => console.log('Error: ', e)
      })
  }

  private getCenter(): {lat: number, lng: number} {
    var shortestLatitude = 0;
    var longestLatitude = 0;
    var shortestLongitude = 0;
    var longestLongitude = 0;

    var initial = false;

    this.coordinates.forEach(coordinate => {
      if (!initial) {
        shortestLatitude = coordinate.lat
        longestLatitude = coordinate.lat
        shortestLongitude = coordinate.lng
        longestLongitude = coordinate.lng
        initial = true
      } else {
        if(coordinate.lat < shortestLatitude)
          shortestLatitude = coordinate.lat
        else if (coordinate.lat > longestLatitude)
          longestLatitude = coordinate.lat
      

        if(coordinate.lng < shortestLongitude)
          shortestLongitude = coordinate.lng
        else if (coordinate.lng > longestLongitude)
          longestLongitude = coordinate.lng
      }
    })

    var midLatitude = (shortestLatitude + longestLatitude)/2
    var midLongitude = (shortestLongitude + longestLongitude)/2

    return {lat: midLatitude, lng: midLongitude}
  }


  private initMap() {
    const center = this.getCenter()
    
    if (typeof google !== undefined && google.maps) {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 12
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
    } else {
      console.log('Google Maps API is not loaded yet');
    }
  }

  openDialog(id: string) {
    const seller = this.sellers.find(seller => seller.id === id)
    this.dialog.open(SellerModal, {
      data: seller
    });
  }
}

@Component({
  selector: 'seller-modal',
  templateUrl: 'seller-modal.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle],
  styleUrl: './map.component.css'
})
export class SellerModal {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Seller) {}
}