import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlusCircle, faMinusCircle, faHeart, faHeartBroken, faDownload, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import { Filme } from 'src/models/filme.model';
import { FilmesService } from 'src/services/filmes.service';

@Component({
  selector: 'app-details-search',
  templateUrl: './details-search.component.html',
  styleUrls: ['./details-search.component.css']
})
export class DetailsSearchComponent implements OnInit {

  isFavorite = false;
  filme: Filme;

  icons = {
    plus: faPlusCircle,
    minus: faMinusCircle,
    heart: faHeart,
    heartBroken: faHeartBroken,
    download: faDownload,
    thumbsUp: faThumbsUp
  }

  filmesService: FilmesService;
  constructor(
    private activeRoute: ActivatedRoute,
    filmesService: FilmesService

  ) {
    this.filmesService = filmesService;
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((p) => {
      this.isFavorite = this.filmesService.checkFavorites(p.id);
      this.filmesService.convertSingleImage(p.id).then((data : any) => {
        debugger;
    this.filme = data.image;
      });
    });
  }
}
