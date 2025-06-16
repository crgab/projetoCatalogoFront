import { Routes } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria';
import { ProdutoComponent } from './components/produto/produto';
import { AdicionarProdComponent } from './components/adicionar-prod/adicionar-prod';

export const routes: Routes = [
    // { path: 'categoria', component : CategoriaComponent },
    { path: 'categoria', component: CategoriaComponent},
    { path: 'produto/:id', component : ProdutoComponent },
    { path: 'adicionarProd', component: AdicionarProdComponent},
    { path: '**', redirectTo: 'categoria'}
];
