import { Component, inject, signal, effect } from '@angular/core';
import { Produto } from '../../interfaces/Catalogo';
import { CatalogoService } from '../../services/catalogo';
import { CategoriaComponent } from '../categoria/categoria';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  // novoProduto = signal<Partial<Produto>>({
  //   descricao: '',
  //   marca: '',
  //   preco: 0,
  //   categoria: 0,
  //   imagem: ''
  // });


  // get descricaoProduto() {
  // return this.novoProduto().descricao || '';
  // }
  // set descricaoProduto(valor: string) {
  //   this.novoProduto.update(p => ({ ...p, descricao: valor }));
  // }

  // get marcaProduto() {
  //   return this.novoProduto().marca || '';
  // }
  // set marcaProduto(valor: string) {
  //   this.novoProduto.update(p => ({ ...p, marca: valor }));
  // }

  // get precoProduto() {
  //   return this.novoProduto().preco || 0;
  // }
  // set precoProduto(valor: number) {
  //   this.novoProduto.update(p => ({ ...p, preco: valor }));
  // }

  // get categoriaProduto() {
  //   return this.novoProduto().categoria || 0;
  // }
  // set categoriaProduto(valor: number) {
  //   this.novoProduto.update(p => ({ ...p, categoria: valor }));
  // }

  // get imagemProduto() {
  //   return this.novoProduto().imagem || '';
  // }
  // set imagemProduto(valor: string) {
  //   this.novoProduto.update(p => ({ ...p, imagem: valor }));
  // }


  
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



//   adicionarProduto() {
//     const produto = this.novoProduto();

//     if (!produto.descricao?.trim() || !produto.marca?.trim() || !produto.preco || !produto.categoria) {
//       alert('Preencha todos os campos obrigatórios.');
//       return;
//     }

//       this.catalogoService.saveProduto(produto as Produto).subscribe({
//         next: () => {
//           console.log('[DEBUG] Produto adicionado com sucesso');
//           this.novoProduto.set({
//             descricao: '',
//             marca: '',
//             preco: 0,
//             categoria: 0,
//             imagem: ''
//           });

//           // Atualiza a lista após inserção
//           const categoriaId = this.categoriaId();
//           if (categoriaId) {
//             this.catalogoService.getFiltered(categoriaId).subscribe((produtos) => {
//               this.listaProduto.set(produtos);
//             });
//           }
//         },
//         error: (err) => {
//           console.error('[DEBUG] Erro ao adicionar produto', err);
//         }
//     });
//   }

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

