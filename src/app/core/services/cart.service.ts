import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  private baseUrl = 'http://localhost:3200/cart';

  constructor(private http: HttpClient) {}

  getCartItemsFromAPI() {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  removeItemFromAPI(productId: string) {
    return this.http.delete(`${this.baseUrl}/remove/${productId}`);
  }

  addToCart(item: any) {
    return this.http.post(`${this.baseUrl}/add`, item);
  }

  clearCart() {
    return this.http.post(`${this.baseUrl}/clear`, {});
  }
}
