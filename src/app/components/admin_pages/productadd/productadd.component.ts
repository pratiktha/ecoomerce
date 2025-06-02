import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { HttpClient } from '@angular/common/http';
// import * as alertify from 'alertifyjs';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  createdAt: string;
}

@Component({
  selector: 'app-productadd',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './productadd.component.html',
  styleUrl: './productadd.component.css'
})
export class ProductaddComponent {
  activeSection: string = 'products';
  selectedProduct: Product | null = null;
  showEditModal = false;
  
  // Dummy data for demonstration
 
  @Input() editing = false;
  @Input() productData: any = null;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();


  apiUrl = 'http://localhost:3200/addproducts'; 
  apiUrl1 = 'http://localhost:3200/productsdetails'; 
  products: Product[] = [];
  error: string | null = null;
  productForm!: FormGroup;
  categories = ['Electronics', 'Clothing', 'Home', 'Books', 'Toys', 'Other'];
  productId: string | null = null;
  isLoading = true;
errorMessage: any;
  
  
  constructor(private fb: FormBuilder, private productadd: ProductService,private http:HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.initializeForm();
    
    if (this.editing && this.productData) {
      this.populateForm();
    }
  }
  fetchProducts(): void {
    this.isLoading = true
    this.errorMessage = null;
    
    this.http.get<Product[]>(this.apiUrl1).subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load products. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching products:', err);
      }
    });
  }
 

  initializeForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      category: [''],
      image: ['', Validators.pattern(/^https?:\/\/.+/)], // Simple URL pattern
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  populateForm(): void {
    this.productForm.patchValue({
      name: this.productData.name,
      description: this.productData.description,
      price: this.productData.price,
      category: this.productData.category,
      image: this.productData.image,
      stock: this.productData.stock
    });
  }

  onSubmit(): void {
    const formData = this.productForm.value;

    this.http.post(this.apiUrl, formData).subscribe({
      next: (response) => {
        this.formSubmit.emit(response);
        if (!this.editing) {
          this.productForm.reset();
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  

  onCancel(): void {
    this.formCancel.emit();
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.isLoading = true;
      
      this.http.delete<{ success: boolean, deletedProduct: Product }>(
        `${this.apiUrl1}/${productId}`
      ).subscribe({
        next: (response) => {
          if (response.success) {
            // Fast immutable update
            this.products = this.products.filter(p => p._id !== productId);
            
            // Optional: Show toast/snackbar notification
            this.showNotification('Product deleted successfully!');
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Delete error:', err);
          this.errorMessage = 'Failed to delete product';
          this.isLoading = false;
        }
      });
    }
  }
  
  // Optional notification helper
  private showNotification(message: string): void {
    // Implement your notification system (MatSnackBar, Toastr, etc.)
    console.log(message); // Temporary fallback
  }
  editProduct(productId: string): void {
    this.isLoading = true;
    this.http.get<Product>(`${this.apiUrl1}/${productId}`).subscribe({
      next: (product) => {
        this.selectedProduct = product;
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          image: product.image,
          stock: product.stock
        });
        this.showEditModal = true;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load product details';
        this.isLoading = false;
        console.error('Error loading product:', err);
      }
    });
  }
  
  // Add this method for modal submission
  updateProduct(): void {
    if (this.productForm.invalid || !this.selectedProduct) return;
    
    this.isLoading = true;
    const updatedData = this.productForm.value;
    
    // Fix: Add type parameter to the put request
    this.http.put<Product>(`${this.apiUrl1}/${this.selectedProduct._id}`, updatedData)
      .subscribe({
        next: (updatedProduct) => {
          const index = this.products.findIndex(p => p._id === updatedProduct._id);
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }
          this.showEditModal = false;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Failed to update product';
          this.isLoading = false;
          console.error('Error updating product:', err);
        }
      });
  }
  
}