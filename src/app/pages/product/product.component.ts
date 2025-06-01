import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product',
  imports: [CommonModule,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  product: any = null;
  isLoading = true;
  error: string | null = null;
  productId: string | null = null;
  selectedImage: string = '';

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
    private http: HttpClient,
    private cartService: CartService,
    private router: Router
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
  selectImage(img: string) {
    this.selectedImage = img;
  }

  openZoomModal() {
    // Implement your zoom modal logic here
    console.log('Open zoom modal');
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
      productId: this.product._id,
      name: this.product.name,
      price: this.product.price,
      selectedColor: this.selectedColor,
      selectedSize: this.selectedSize,
      quantity: this.quantity,
      image: this.selectedImage || this.product.image
    };
  
    this.http.post('http://localhost:3200/cart/add', productToAdd).subscribe({
      next: (res) => {
        console.log('Added to cart:', res);
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
      }
    });
  }
  
  

  addToWishlist(): void {
    // Implement your wishlist service logic here
    console.log('Added to wishlist:', this.product);
  }
  buyNow(): void {
    console.log('hi')
    const productToAdd = {
      productId: this.product._id,
      name: this.product.name,
      price: this.product.price,
      selectedColor: this.selectedColor,
      selectedSize: this.selectedSize,
      quantity: this.quantity,
      image: this.selectedImage || this.product.image
    };
  
    this.http.post('http://localhost:3200/cart/add', productToAdd).subscribe({
      next: (res) => {
        console.log('Added to cart:', res);
        this.router.navigate(['/cart']); // 🔁 navigate after successful POST
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
      }
    });
  }
  
  
}