import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando: boolean = true;
  productos: Producto[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();

  }

  private cargarProductos() {
    this.http.get('https://curso-angular-html-9ee9a-default-rtdb.firebaseio.com/productos_idx.json')
             .subscribe( (resp: any) => {
               console.log(resp);
               this.productos = resp;
               this.cargando = false;
             });
  }

}
