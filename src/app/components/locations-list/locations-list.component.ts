import { Component, OnInit } from '@angular/core';
import { Seller } from '../../models/seller';
import { SellerServiceService } from '../../services/seller-service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/* Imports Angular Material */
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        },
        error: (e) => console.log('Error: ', e),
        complete: () => console.info('Complete')
      })
  }

  openDialog() {
    this.dialog.open(CreateSellerModal);
  }

  formatCoordinates(coordinates: { latitude: number, longitude: number, height: number }): string {
    return `Longitude = ${coordinates.longitude}<br> Latitude = ${coordinates.latitude}<br> Height = ${coordinates.height}`;
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
  imports: [MatButtonModule, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, ReactiveFormsModule],
  styleUrl: './locations-list.component.css'
})
export class CreateSellerModal implements OnInit {

  sellerForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    category: new FormControl(''),
    address: new FormControl(''),
    photo: new FormControl(''),
    vehicle: new FormControl('')
  })

  constructor(private sellerService: SellerServiceService, private formBuilder: FormBuilder, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.sellerForm = this.formBuilder.group(
      {
        id      : ['', Validators.required],
        name    : ['', Validators.required],
        category: ['', Validators.required],
        address : ['', Validators.required],
        photo   : ['', Validators.required],
        vehicle : ['', Validators.required]
      }
    )
  }
  
  createSeller() {
    const seller = {
      id: this.sellerForm.value.id,
      name: this.sellerForm.value.name,
      category: this.sellerForm.value.category,
      address: this.sellerForm.value.address,
      photo: this.sellerForm.value.photo,
      vehicle: this.sellerForm.value.vehicle
    }

      this.sellerService.createSeller(seller)
        .subscribe({
          next: (response) => {
            this._snackBar.open("El venededor " + response.body.name + " fue registrado exitosamente", 'Aceptar');
            this.sellerService.getSellers()
          },
          error: (e) => {
            this._snackBar.open(e, 'Aceptar');
          }
        })
  }
}