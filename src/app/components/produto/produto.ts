import { Component, inject, signal, effect } from '@angular/core';
import { Produto } from '../../interfaces/Catalogo';
import { CatalogoService } from '../../services/catalogo';
import { CategoriaComponent } from '../categoria/categoria';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produto',
  imports: [],
  standalone: true,
  templateUrl: './produto.html',
  styleUrl: './produto.css'
})
export class ProdutoComponent {
  private catalogoService : CatalogoService = inject(CatalogoService);
  private route = inject(ActivatedRoute);
  // listaProduto: Produto[] = [];
  // novoProduto: Partial<Produto> = {descricao:'', marca: '', preco: 0, categoria: 0, imagem: ''};
  categoriaId = signal<string | null>(null);
  listaProduto = signal<Produto[]>([]);

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

  // ngOnInit() : void{
  // this.route.paramMap.subscribe(params => {
  //   const categoriaId = params.get('id');
  //   if (categoriaId) {
  //     this.catalogoService.getFiltered(categoriaId)
  //     .subscribe({
  //       next: (response: Produto[]) => {
  //         this.listaProduto = response;
  //       },
  //       error: (err) => {
  //         console.error(`Erro ao carregar produtos`, err);
  //       }
  //     });
  //   }
  // })
      
} 



  
