import { Routes } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria';
import { ProdutoComponent } from './components/produto/produto';

export const routes: Routes = [
    { path: 'categoria', component : CategoriaComponent },
    { path: 'produto', component : ProdutoComponent },
    { path: '**', redirectTo: 'categoria'}
];
