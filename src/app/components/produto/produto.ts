import { Component, inject, signal, effect } from '@angular/core';
import { Produto } from '../../interfaces/Catalogo';
import { CatalogoService } from '../../services/catalogo';
import { CategoriaComponent } from '../categoria/categoria';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../interfaces/Catalogo';


@Component({
  selector: 'app-produto',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './produto.html',
  styleUrl: './produto.css'
})
export class ProdutoComponent {
  private catalogoService : CatalogoService = inject(CatalogoService);
  private route = inject(ActivatedRoute);

  categoriaId = signal<string | null>(null);
  listaProduto = signal<Produto[]>([]);
  listaCategoria = signal<Categoria[]>([])

  
  // Efeito 1: observa mudanças na rota
  private routeEffect = effect(() => {
    const id = this.route.snapshot.paramMap.get('id');
    this.categoriaId.set(id);
  });

 

  private loadEffect = effect(() => {
    const id = this.categoriaId();
    if(id) {
      this.catalogoService.getFiltered(id).subscribe((p) => {
        this.listaProduto.set(p);
      });
    }
    });     


  removerProduto(id: number) {
  if (!confirm('Tem certeza que deseja excluir este produto?')) return;

  this.catalogoService.deleteProduto(id).subscribe({
    next: () => {
      console.log('[DEBUG] Produto removido');
      this.listaProduto.update((lista) => lista.filter(p => p.id !== id));
    },
    error: (err) => {
      console.error('[DEBUG] Erro ao remover produto', err);
    }
  });
}


} 

