import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { ActivatedRoute, Router } from '@angular/router';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  id!: number;
  product: Product = new Product();
  imageUrl!: string;
  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadData();
  }

  loadData(): void {
    this.productService.getProductbyId(this.id).subscribe(
      (response:any) => {
  
        this.product = response.data;
        
      }
      , error => console.log(error));
  }

  uploadFiles() {
    this.productService.getProductbyId(this.id).subscribe(
      (data) => {
        this.product = data;
        
      }
      , error => console.log(error));
    const formData = new FormData();
    formData.append('productName', this.product.productName);
    formData.append('price', this.product.price);

    const fileInput : any = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];
    formData.append('file', file);

    this.productService.updateProduct(this.id,formData).subscribe((response: any) => {
      this.imageUrl = `http://localhost:3000/uploads/files/${response.data.image}`;
      console.log('File uploaded successfully');
      this.goToProductList()
    },
    error => console.error('Error uploading file:', error)
  );
  }


  onSubmit(){
    console.log(this.product);
    this.uploadFiles();
  }

  goToProductList(){
    this.router.navigate(['/product']);
  }
}