import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe], // Necesario para formatear el precio con el signo de $
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  // El signo de exclamación (!) le dice a TypeScript: "Confía en mí, este dato llegará"
  @Input({ required: true }) product!: Product; 
}