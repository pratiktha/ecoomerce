import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { HttpClient } from '@angular/common/http';
// import * as alertify from 'alertifyjs';



@Component({
  selector: 'app-productadd',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './productadd.component.html',
  styleUrl: './productadd.component.css'
})
export class ProductaddComponent {
  activeSection: string = 'products';

  // Dummy data for demonstration
 
  @Input() editing = false;
  @Input() productData: any = null;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();


  apiUrl = 'http://localhost:3000/addproducts'; 

  productForm!: FormGroup;
  categories = ['Electronics', 'Clothing', 'Home', 'Books', 'Toys', 'Other'];
  productId: string | null = null;
  

  constructor(private fb: FormBuilder, private productadd: ProductService,private http:HttpClient) {}

  ngOnInit(): void {
    this.initializeForm();
    
    if (this.editing && this.productData) {
      this.populateForm();
    }
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
}