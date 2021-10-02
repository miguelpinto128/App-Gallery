import { Component, OnInit } from '@angular/core';
import { Filme } from 'src/models/filme.model';
import { faEye,faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FilmesService } from 'src/services/filmes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  Search: Filme[] = [];
  query!: string;
  searchPage: number = 1;
  searchQuery :string ='';

  iconFontAwesome = faEye;
  up = faChevronUp;

  constructor(
    public filmesService: FilmesService,
    private activeRoute: ActivatedRoute,
    private router: Router) {
    this.router.events.subscribe((data: any) => {

      
      let query = this.activeRoute.snapshot.params['search'];
      if(query != this.searchQuery){
        this.searchQuery = query;
        this.filmesService.getSearch(query, this.searchPage).then((data: any) => {
          this.Search = data.images;
        });
      }
     
    });
  }


  right(){
    debugger;
    this.searchPage = this.filmesService.searchPage += 1;
    this.filmesService.arrayImges = [];
    this.filmesService.getSearch(this.searchQuery ,this.searchPage).then((data: any) => {
      this.Search = data.images;
    });;
  }

  left() {
    this.searchPage = this.filmesService.searchPage -= 1;
    this.filmesService.arrayImges = [];
    this.filmesService.getSearch(this.searchQuery, this.searchPage).then((data: any) => {
      this.Search = data.images;
    });;
  }

  ngOnInit(): void {
  }

  scrollToTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
