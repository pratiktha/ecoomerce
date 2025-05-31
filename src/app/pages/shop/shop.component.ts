import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';  // <-- Make sure to import Router

@Component({
  selector: 'app-shop',
  imports: [CommonModule, RouterModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{
  products: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private http: HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.fetchProducts();
  }
  goToProductDetail(productId: string): void {
    this.router.navigate(['/product', productId]);
  }

  fetchProducts() {
    this.http.get<any[]>('http://localhost:3200/productsdetails').subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products';
        this.isLoading = false;
        console.error('Error fetching products:', err);
      }
    });
  }


}
