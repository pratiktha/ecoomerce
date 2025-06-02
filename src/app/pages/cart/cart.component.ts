import { Component } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cart',
  imports: [CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems: any[] = [];
  Math = Math;
  isLoading = true;
  errorMessage: any;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCartItemsFromAPI().subscribe({
      next: (items) => this.cartItems = items,
      error: (err) => console.error('Failed to load cart items:', err)
    });
  }

  removeItem(productId: string): void {
    if (confirm('Are you sure you want to remove this item from the cart?')) {
      this.isLoading = true;
  
      this.cartService.removeItemFromAPI(productId).subscribe({
        next: () => {
          this.loadCartItems();
          this.isLoading = false;
          this.showNotification('Item removed successfully!');
        },
        error: (err) => {
          console.error('Failed to remove item:', err);
          this.errorMessage = 'Failed to remove item from cart';
          this.isLoading = false;
        }
      });
    }
  }
  private showNotification(message: string): void {
    // Implement your notification system (MatSnackBar, Toastr, etc.)
    console.log(message); // Temporary fallback
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}