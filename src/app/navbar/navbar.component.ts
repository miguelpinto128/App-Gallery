import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilmesService } from 'src/services/filmes.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
@Injectable()
export class NavbarComponent implements OnInit {
  search : string = '' ;

  constructor(
    private filmesService: FilmesService,
    private modalService: NgbModal,
    private router:Router,
  ) { }

  isMenuCollapsed = true;
  iconFontAwesome = faImage;

  ngOnInit(): void {
  }

  modal(content: any) {
    this.modalService.open(content).result.then();
  }


  detail(query: string){
    this.router.navigate(['/Search', query]);
  }

  noResults(){
    
  }

  triggerModal(query: string) {
    this.modalService.open(query).result.then();
  }

}
