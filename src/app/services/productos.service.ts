import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando: boolean = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();

  }

  private cargarProductos() {

    return new Promise<void>( ( resolve, reject ) => {

      this.http.get('https://curso-angular-html-9ee9a-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( (resp: any) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });

    });

  }

  getProducto( id: string ) {
    return this.http.get(`https://curso-angular-html-9ee9a-default-rtdb.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string ) {

    if( this.productos.length === 0 ) {
      this.cargarProductos().then( () => {
        this.filtrarProductos( termino );
      });
    } else {
      this.filtrarProductos( termino );
    }

  }

  private filtrarProductos( termino: string ) {

    termino = termino.toLocaleLowerCase();

    this.productosFiltrado = this.productos.filter( producto => {
      const tituloLower = producto!.titulo!.toLocaleLowerCase();
      return (producto!.categoria!.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 );
    });
  }

}
