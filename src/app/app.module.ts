import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FilmesService } from 'src/services/filmes.service';
import { ListComponent } from './list/list.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsSearchComponent } from './details-search/details-search.component';
import { NoResultsComponent } from './no-results/no-results.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListComponent,
    FavoritesComponent,
    NotFoundComponent,
    SearchComponent,
    DetailsSearchComponent,
    NoResultsComponent,

  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FilmesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
