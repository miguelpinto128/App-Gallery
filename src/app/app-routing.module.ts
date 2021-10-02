import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsSearchComponent } from './details-search/details-search.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ListComponent } from './list/list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'list/:page', component: ListComponent },
  {path: 'details-search/:id', component: DetailsSearchComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'Search/:search', component:SearchComponent},
  {path: 'not-found', component:NotFoundComponent},
  {path: '**', redirectTo: 'not-found'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
