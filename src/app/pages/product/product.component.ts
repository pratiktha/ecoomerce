import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  product: any = null;
  isLoading = true;
  error: string | null = null;
  productId: string | null = null;

  selectedColor: string | null = null;
  selectedSize: string | null = null;
  quantity: number = 1;
  
  // Mock data for variants (you can replace with actual data from your API)
  colorVariants = [
    { colorName: 'Red', colorCode: '#ff0000', isActive: true },
    { colorName: 'Blue', colorCode: '#0000ff', isActive: false },
    { colorName: 'Green', colorCode: '#00ff00', isActive: false }
  ];
  
  sizeVariants = ['S', 'M', 'L', 'XL', 'XXL'];


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.fetchProductDetails(this.productId);
    } else {
      this.error = 'Product ID not found';
      this.isLoading = false;
    }
  }

  fetchProductDetails(productId: string): void {
    this.http.get<any>(`http://localhost:3200/productsdetails/${productId}`).subscribe({
      next: (data) => {
        this.product = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load product details';
        this.isLoading = false;
        console.error('Error fetching product:', err);
      }
    });
  }
  selectColor(variant: any): void {
    this.selectedColor = variant.colorName;
    // Update active state for color variants
    this.product.colorVariants.forEach((v: any) => {
      v.isActive = v.colorName === variant.colorName;
    });
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  isSizeAvailable(size: string): boolean {
    // Implement your size availability logic here
    return true;
  }

  increaseQuantity(): void {
    if (this.quantity < (this.product.stock || 10)) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    const productToAdd = {
      ...this.product,
      selectedColor: this.selectedColor,
      selectedSize: this.selectedSize,
      quantity: this.quantity
    };
    // Implement your cart service logic here
    console.log('Added to cart:', productToAdd);
  }

  addToWishlist(): void {
    // Implement your wishlist service logic here
    console.log('Added to wishlist:', this.product);
  }

  buyNow(): void {
    // Implement your buy now logic here
    this.addToCart();
    // Then navigate to checkout
    console.log('Proceeding to checkout');
  }
}