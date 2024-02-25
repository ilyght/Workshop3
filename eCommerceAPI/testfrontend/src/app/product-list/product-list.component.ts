import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpFacadeService} from "../http-facade.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  products : { productId: number; name: string, description: string; category: string; price: number; quantity: number }[] = [];
  emptyProductList: boolean = false;

  constructor(private route: ActivatedRoute, private httpFacadeService : HttpFacadeService, private router : Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe({
      next: params => {
      }
    });
    this.httpFacadeService.getAllProducts().subscribe({
      next: products => {
        this.products = products.map((product: { productId: number; name: string, description: string; category: string; price: number; quantity: number }) => ({
          productId: product.productId,
          name: product.name,
          description: product.description,
          category: product.category,
          price: product.price,
          quantity: product.quantity,
        }));
        if (this.products.length ===0){
          this.emptyProductList = true;
        }
      },
    });
  }
  productDetail(productId: number) {
    this.router.navigate(['/products-details'], {
      queryParams: {
        productId: productId,
      }
    });
  }
}
