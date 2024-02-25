import { Component, OnInit } from '@angular/core';
import { HttpFacadeService } from "../http-facade.service";
import { ActivatedRoute, Router } from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId: number = 0;
  product!: { productId: number; name: string; description: string; category: string; price: number; quantity: number };
  quantForm!: FormGroup;
  constructor(private route: ActivatedRoute, private httpFacadeService: HttpFacadeService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.productId = params['productId'];
      this.loadProduct(this.productId);
    });
  }

  loadProduct(productId: number) {
    this.httpFacadeService.getProduct(productId).subscribe({
      next: product => {
        this.product = product;
        this.initializeForm();
      },
      error: err => {
        console.error('Une erreur s\'est produite lors de la récupération du produit :', err);
      }
    });
  }

  initializeForm() {
    // Initialiser le formulaire avec FormBuilder après avoir reçu les données du produit
    this.quantForm = this.formBuilder.group({
      quantity: ['', [Validators.required, Validators.min(0), Validators.max(this.product.quantity)]]
    });
  }

}
