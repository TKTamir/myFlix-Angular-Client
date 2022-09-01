import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = []; //Movies returned from the API will be stored here, similiar to State in React
  constructor(public fetchApiData: FetchApiDataService) { } //FetchApiDatService calls the api and returns movies.

  //Lifecycle hook that's being called with the getMovies function after Angular finishes creating the component
ngOnInit(): void {
  this.getMovies();
}
//Function calls the api with FetchApiData and getAllMovies and returns the movies in the state of this.movies
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
}