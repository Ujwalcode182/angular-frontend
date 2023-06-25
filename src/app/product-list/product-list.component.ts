import { Component, OnInit } from '@angular/core';
import { Product } from '../product'
import { ProductService } from '../product.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  Products: Product[] =[];
  sanitizer: any;
  thumbnail: any;
  imageUrl!: string;

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
    
  }

  private getProducts(){
    this.productService.getProductList().subscribe( (response: any) => {
      this.Products = response.data; // Extract the 'data' property from the response
      console.log(this.Products)
      for(let i=0 ; i< this.Products.length; i++){
      this.imageUrl = `https://product-admin-panel-api.vercel.app/product/image/${this.Products[i].image}`;
      }
    },
    (error: any) => {
      console.log(error);
    });
  }
  
  getImage(){

  }

  updateProduct(id: number){
    this.router.navigate(['update-product', id]);
  }

  deleteProduct(id: number){
    this.productService.deleteProduct(id).subscribe( data => {
      console.log(data);
      this.getProducts();
    })
  }
}