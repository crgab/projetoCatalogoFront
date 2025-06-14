import { Component, inject } from '@angular/core';
import { Produto, Categoria } from '../../interfaces/Catalogo';
import { CatalogoService } from '../../services/catalogo';

@Component({
  selector: 'app-produto',
  imports: [],
  standalone: true,
  templateUrl: './produto.html',
  styleUrl: './produto.css'
})
export class ProdutoComponent {
  private catalogoService : CatalogoService = inject(CatalogoService);
    listaProduto: Produto[] = [];
    novoProduto: Partial<Produto> = {descricao:'', marca: '', preco: 0, categoria: 0, imagem: ''};

    ngOnInit() : void{
        this.catalogoService.getProduto()
          .subscribe({
            next: (response: Produto[]) => {
              this.listaProduto = response;
            },
            error: (err) => {
              console.error(`Erro ao carregar produtos`, err);
            }
          });
      }

}
