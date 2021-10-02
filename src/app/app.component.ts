import { Component, OnInit } from '@angular/core';
import { FilmesService } from 'src/services/filmes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'aula';

  constructor(private filmesService: FilmesService) {}

  ngOnInit() {
    this.filmesService.getFilmes(this.filmesService.page).subscribe();
  }


}
