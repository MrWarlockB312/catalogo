import { Component, inject } from '@angular/core'; // <-- 1. Añadimos 'inject' aquí
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../services/products.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductCardComponent], // Importamos el "ladrillo" para poder usarlo en el HTML
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  // toSignal convierte el flujo de datos del XML en una variable reactiva
  private productsService = inject(ProductsService);

 
  products = toSignal(this.productsService.getAll(), { initialValue: [] });
}