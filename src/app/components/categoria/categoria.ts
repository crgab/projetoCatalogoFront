import { Component, inject, signal, effect } from '@angular/core';
import { Categoria } from '../../interfaces/Catalogo';
import { CatalogoService } from '../../services/catalogo';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categoria',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './categoria.html',
  styleUrl: './categoria.css'
})
export class CategoriaComponent {
  private catalogoService : CatalogoService = inject(CatalogoService);
  // listaCategorias: Categoria[] = []
  // novaCategoria: Partial<Categoria> = {nome_categoria:''}
  listaCategoria = signal<Categoria[]>([]);

  private loadEffect = effect(() => {
    this.catalogoService.getCategoria().subscribe({
      next: (categorias) => {
        this.listaCategoria.set(categorias);
      },
      error: (err) => {
        console.error('[DEBUG] Erro ao carregar categorias', err);
      }
    });
  });

  // ngOnInit() : void{
  //   this.catalogoService.getCategoria()
  //     .subscribe({
  //       next: (response: Categoria[]) => {
  //         this.listaCategorias = response;
  //       },
  //       error: (err) => {
  //         console.error(`Erro ao carregar categorias`, err);
  //       }
  //     });
  // }
}