import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Filme } from "src/models/filme.model";
import { map } from 'rxjs/operators'


@Injectable()
export class FilmesService {
  filmes = [];
  favorites = [];
  page: number = 1;
  searchPage : number = 1;
  arrayImges: Filme[] = [];



  constructor(private httpClient: HttpClient) {
  }


  getFilmes(page: number) {
    let url = `https://api.unsplash.com/photos?per_page=24&page=${page}&order_by=latest&client_id=hsntDSGlKnHUNoVJgTTvMw14mHh9GgNAEwRrwLP_j_0`;
    return this.httpClient.get(url)
      .pipe(map((resp) => { return this.converterImage(resp); }));
  }
  // -ybX9OW1NwHAc7z4gIs247pdcgoVTv71CEXyARPtdAo
  // dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578
  // hsntDSGlKnHUNoVJgTTvMw14mHh9GgNAEwRrwLP_j_0

  getImageByID(id: string) {
    let url = `https://api.unsplash.com/photos/${id}?client_id=hsntDSGlKnHUNoVJgTTvMw14mHh9GgNAEwRrwLP_j_0`;
    return this.httpClient.get(url);
  }


  converterImage(respostaHttp): Filme[] {
    let filmesResposta = respostaHttp;
    for (let i = 0; i < filmesResposta.length; i++) {
      let filme = filmesResposta[i];
   

        let id = filme.id;
        let alt_description = filme.alt_description == null ? "" : filme.alt_description;
        let description = filme.description == null ? "" : filme.description;
        let imagem = filme.urls.raw + '&fit=crop&w=500&h=500';
        let imagem_reg = filme.urls.regular + '&fit=crop&w=500&h=500';
        let created_at = filme.created_at;
        let likes = filme.likes;
        let user = filme.user.name;

        this.filmes.push(new Filme(
          id,
          alt_description,
          description,
          imagem,
          imagem_reg,
          created_at,
          likes,
          null,
          null,
          user));
    }
    return this.filmes;
  }

  addToFavorites(filmes: {
    id: string;
    alt_description: string;
    description: string;
    imagem: string;
    imagem_reg: string;
    created_at: string;
    likes: number;
    downloads: number;
    tags: string[];
    user: string;
  }) {
    this.insertFavorites(filmes);
  }


  insertFavorites(filmes: Filme) {
    if (this.favorites.find((x) => x.id == filmes.id) == undefined) {
      this.favorites.push(filmes);
    }
  }


  checkFavorites(id: string): boolean {
    return this.favorites.find((x) => x.id == id) == undefined;
  }

  removeFromFavorites(id: string) {
    let i: number = 0;
    for (let i = 0; i < this.favorites.length; i++) {
      if (this.favorites[i].id === id) {
        this.favorites.splice(i, 1);
      }
    }
  }


  getSearch(query: string, searchPage: number): Promise<any> {

    return new Promise((resolve, reject) => {

      let url1 = `https://api.unsplash.com/search/photos?per_page=24&page=${searchPage}&order_by=latest&client_id=hsntDSGlKnHUNoVJgTTvMw14mHh9GgNAEwRrwLP_j_0` + '&query=' + query;
      this.httpClient.get(url1)
        .toPromise().then((resp: any) => {
          return this.converterSearch(resp).then((data: any) => {
            resolve({ images: data.array })
          })
        })
    });
  }

  getSearchByID(id: string) {
    let url1 = `https://api.unsplash.com/photos/${id}?client_id=hsntDSGlKnHUNoVJgTTvMw14mHh9GgNAEwRrwLP_j_0`;
    return this.httpClient.get(url1);
  }


  converterSearch(respostaHttp): Promise<any> {
    this.arrayImges = [];
    return new Promise((resolve, reject) => {
      let filmesResposta = respostaHttp;
      for (let i = 0; i < filmesResposta.results.length; i++) {
        let filme = filmesResposta.results[i];

        let id = filme.id;
        let alt_description = filme.alt_description == null ? "" : filme.alt_description;
        let description = filme.description == null ? "" : filme.description;
        let imagem = filme.urls.raw.concat('&fit=crop&w=500&h=500');
        let imagem_reg = filme.urls.regular.concat('&fit=crop&w=500&h=500');
        let created_at = filme.created_at;
        let likes = filme.likes;
        let user = filme.user.name;

        this.arrayImges.push(new Filme(
          id,
          alt_description,
          description,
          imagem,
          imagem_reg,
          created_at,
          likes,
          null,
          null,
          user));

      }
      resolve({ array: this.arrayImges });
    })
  }


  convertSingleImage(id: string): Promise<any> {
    let filmesRes: Filme;
    return new Promise((resolve, reject) => {
      this.getImageByID(id).toPromise().then((data: any) => {
        const arraytags: string[] = [];
        data.tags.forEach((item) => {
          arraytags.push(item.title);
        });
        let id = data.id;
        let alt_description = data.alt_description == null ? "" : data.alt_description;
        let description = data.description == null ? "" : data.description;
        let imagem = data.urls.raw + '&fit=crop&w=500&h=500';
        let imagem_reg = data.urls.regular + '&fit=crop&w=500&h=500';
        let created_at = data.created_at;
        let likes = data.likes;
        let user = data.user.name;

        filmesRes = new Filme(
          id,
          alt_description,
          description,
          imagem,
          imagem_reg,
          created_at,
          likes,
          data.downloads,
          arraytags,
          user);
          resolve({ image: filmesRes });
      })   
    })
  }
}