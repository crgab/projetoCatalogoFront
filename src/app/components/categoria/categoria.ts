import { Component, inject, signal, effect } from '@angular/core';
import { Categoria } from '../../interfaces/Catalogo';
import { CatalogoService } from '../../services/catalogo';
import { RouterLink } from '@angular/router';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria',
  imports: [RouterLink, CommonModule,FormsModule],
  standalone: true,
  templateUrl: './categoria.html',
  styleUrl: './categoria.css'
})
export class CategoriaComponent {
  private catalogoService : CatalogoService = inject(CatalogoService);
  listaCategoria = signal<Categoria[]>([]);
  novaCategoria = signal<string>('');
  get nomeCategoria() {
  return this.novaCategoria();
  }
  set nomeCategoria(valor: string) {
    this.novaCategoria.set(valor);
  }


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


  removerCategoria(id: number) {
    if(!confirm('Tem certeza que deseja excluir esta categoria?')) return;

    this.catalogoService.deleteCategoria(id).subscribe({
      next: () => {
        console.log('[DEBUG] Categoria removida');
        this.listaCategoria.update((lista) => lista.filter(c => c.id !== id));
      },
      error: (err) => {
        console.error('[DEBUG] Erro ao remover categoria');
      }
    });
  }

  adicionarCategoria() {
    const nome = this.novaCategoria().trim();
    if (!nome) return;

    const categoria: Categoria = { id: 0, nome_categoria: nome };

    this.catalogoService.saveCategoria(categoria).subscribe({
      next: () => {
        console.log('[DEBUG] Categoria adicionada com sucesso');
        this.novaCategoria.set('');
        this.catalogoService.getCategoria().subscribe((categorias) => {
          this.listaCategoria.set(categorias);
        });
      },
      error: (err) => {
        console.error('[DEBUG] Erro ao adicionar categoria', err);
      }
    });
  }

  
}