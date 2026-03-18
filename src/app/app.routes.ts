import { Routes } from '@angular/router';
import { CatalogoComponent } from './components/catalogo/catalogo.component';

export const routes: Routes = [
  // Cuando la ruta está vacía (inicio), carga el catálogo
  { path: '', component: CatalogoComponent },
  // Si el usuario escribe una ruta que no existe, regrésalo al inicio
  { path: '**', redirectTo: '' }
];