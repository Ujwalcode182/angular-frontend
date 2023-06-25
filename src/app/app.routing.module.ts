import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
// import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

const routes: Routes = [
  {path: 'product', component: ProductListComponent},
  {path: 'create-product', component: CreateProductComponent},
  {path: '', redirectTo: 'product', pathMatch: 'full'},
  {path: 'update-product/:id', component: UpdateProductComponent},
//   {path: 'employee-details/:id', component: EmployeeDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],                                                                                                                                                                                                                                                                                                          
  exports: [RouterModule]
})
export class AppRoutingModule { }