import { Component, OnInit } from '@angular/core';
import { Filme } from 'src/models/filme.model';
import { FilmesService } from 'src/services/filmes.service';
import { faEye, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  filmes: Filme[] = [];
  page: number = 1;
  iconFontAwesome = faEye;
  isdesabled = false;
  up = faChevronUp;

  constructor(
    public filmesService: FilmesService,
    private router:Router) { }

  ngOnInit(): void {
  }

  right(){
    this.page = this.filmesService.page += 1;
    this.filmesService.filmes = [];
    this.filmesService.getFilmes(this.page).subscribe();
  
  }

  left() {
    this.page = this.filmesService.page -= 1;

    this.filmesService.filmes = [];
    this.filmesService.getFilmes(this.page).subscribe();
  }

  scrollToTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  
}
