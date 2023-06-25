import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  product: Product = new Product();
  imageUrl!: string;
  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
  }
  uploadFiles() {
    const formData = new FormData();
    formData.append('productName', this.product.productName);
    formData.append('price', this.product.price);

    const fileInput : any = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];
    formData.append('file', file);

    this.productService.createProduct(formData).subscribe((response: any) => {
      this.imageUrl = `http://localhost:3000/uploads/files/${response.data.image}`;
      console.log('File uploaded successfully');
      this.goToProductList()
    },
    error => console.error('Error uploading file:', error)
  );
  }



  saveProduct(){
    this.productService.createProduct(this.product).subscribe( data =>{
      console.log(data);
      this.goToProductList();
    },
    error => console.log(error));
  }

  goToProductList(){
    this.router.navigate(['/product']);
  }
  
  onSubmit(){
    console.log(this.product);
    this.uploadFiles();
  }
}