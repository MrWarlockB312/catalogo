import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../services/products.service';
import { CarritoService } from '../../services/carrito.service'; // Inyectamos el carrito
import { ProductCardComponent } from '../product-card/product-card.component';
import { CarritoComponent } from '../carrito/carrito.component'; // Importamos el componente
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductCardComponent, CarritoComponent], // Añadimos CarritoComponent aquí
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  private productsService = inject(ProductsService);
  private carritoService = inject(CarritoService);

  products = toSignal(this.productsService.getAll(), { initialValue: [] });

  // Esta función atrapa el producto de la tarjeta y lo manda al cerebro
  agregarAlCarrito(producto: Product) {
    this.carritoService.agregar(producto);
  }
}