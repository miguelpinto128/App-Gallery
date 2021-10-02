import { Component, OnInit } from '@angular/core';
import { Filme } from 'src/models/filme.model';
import { FilmesService } from 'src/services/filmes.service';
import { faEye, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  p: number = 1;
  filmesService: FilmesService;
  favorites!: Filme[];
  page: number = 0;
  isFav: string = 'false';

  iconFontAwesome = faEye;
  up = faChevronUp;

  constructor(
    filmesService: FilmesService,
    private router: Router,
    private activeRoute: ActivatedRoute

  ) { 
    this.filmesService = filmesService; 
  }

  ngOnInit(): void {
    let favorites : Filme[] = this.filmesService.favorites;
    this.favorites= this.filmesService.favorites;
  }

  scrollToTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
