import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Seller } from '../models/seller';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerServiceService {

  private getSellerUrl = 'http://74.235.109.154/api/salesman'
  private createSellerUrl = 'http://74.235.109.154/api/salesman'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getSellers(): Observable<Seller[]> {
    return this.http.get<Seller[]>(this.getSellerUrl)
  }

  createSeller(
    seller: {
      id: string,
      name: string,
      category: string,
      address: string,
      photo: string,
      vehicle: string
    }): Observable<any> {
    return this.http.post<Seller>(this.createSellerUrl, seller, this.httpOptions)
  }
}