import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiKey = '14b2021cfe6f43f74b37f10d188974a5'

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  path: string = 'https://api.themoviedb.org/3/'
  popular: string = 'discover/movie?sort_by=popularity.desc'
  inTheaters: string = 'discover/movie?primary_release_date.gte=2018-06-15&primary_release_date.lte=2018-07-22'
  forKids: string = 'discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc'
  dramas: string = 'discover/movie?with_genres=18&primary_release_year=2018'
  authentication: string = '&api_key='
  authenticationQuery: string = '?api_key='
  constructor(private http: HttpClient) { }

  getPopular() {
    return this.http.get(this.path + this.popular + this.authentication + apiKey)
  }

  getInTheaters() {
    return this.http.get(this.path + this.inTheaters + this.authentication + apiKey)
  }

  getForKids() {
    return this.http.get(this.path + this.forKids + this.authentication + apiKey)
  }

  getDramas() {
    return this.http.get(this.path + this.dramas + this.authentication + apiKey)
  }

  getMovieById(id){
    return this.http.get(this.path + `movie/${id}` + this.authenticationQuery + apiKey)
  }

  findAMovie(name){
    return this.http.get(this.path + 'search/movie' + this.authenticationQuery + apiKey + '&query=' + name)
  }
}
