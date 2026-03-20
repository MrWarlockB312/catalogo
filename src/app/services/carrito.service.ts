import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  // Lista reactiva del carrito
  private productosSignal = signal<Product[]>([]);
  
  // Exponer como readonly para que nadie lo modifique por error desde fuera
  productos = this.productosSignal.asReadonly();

  agregar(producto: Product) {
    this.productosSignal.update(lista => [...lista, producto]);
  }

  quitar(id: number) {
    this.productosSignal.update(lista => lista.filter(p => p.id !== id));
  }

  vaciar() {
    this.productosSignal.set([]);
  }

  total(): number {
    return this.productosSignal().reduce((acc, p) => acc + p.price, 0);
  }

  exportarXML() {
    const productos = this.productosSignal();
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<recibo>\n';
    
    for (const p of productos) {
      xml += '  <producto>\n';
      xml += `    <id>${p.id}</id>\n`;
      xml += `    <nombre>${this.escapeXml(p.name)}</nombre>\n`;
      xml += `    <precio>${p.price}</precio>\n`;
      if (p.description) {
        xml += `    <descripcion>${this.escapeXml(p.description)}</descripcion>\n`;
      }
      xml += '  </producto>\n';
    }
    
    xml += `  <total>${this.total()}</total>\n`;
    xml += '</recibo>';

    // Creación del archivo virtual en el navegador
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recibo.xml';
    a.click();
    URL.revokeObjectURL(url);
  }

  private escapeXml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}