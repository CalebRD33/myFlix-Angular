import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';
import { InfoBoxComponent } from '../info-box/info-box.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      let user = JSON.parse(localStorage.getItem("user") || "");
      this.movies.forEach((movie: any) => {
        movie.isFavorite = user.FavoriteMovies.includes(movie._id);
      })
      return this.movies;
    }, err => {
      console.error(err)
    })
  }

  addDeleteFavorite(movie: any): void {
    const user = JSON.parse(localStorage.getItem('user') || "");
    let icon = document.getElementById(`${movie._id}-favorite-icon`);

    if (user.FavoriteMovies.includes(movie._id)) {
      this.fetchApiData.deleteFavoriteMovie(user.Username, movie._id).subscribe((resp: any) => {
        icon?.setAttribute("fontIcon", "favorite_border");
        this.snackBar.open('Movie deleted from favorites', 'OK', {duration: 2000});
        user.FavoriteMovies = resp.FavoriteMovies;
        localStorage.setItem("user", JSON.stringify(user));
        
      });
    } else {
      this.fetchApiData.addFavoriteMovie(user.Username, movie._id).subscribe((resp: any) => {
        icon?.setAttribute("fontIcon", "favorite");
        this.snackBar.open('Movie added to favorites', 'OK', {duration: 2000});
        user.FavoriteMovies = resp.FavoriteMovies;
        localStorage.setItem("user", JSON.stringify(user));
      });
    }
  }

  openGenreDialog(movie: any): void {
    this.dialog.open(InfoBoxComponent, {
      data: {
        title: movie.Genre.Name,
        content: movie.Genre.Description
      },
      width: '400px'
    });
  }

  openDirectorDialog(movie: any): void {
    this.dialog.open(InfoBoxComponent, {
      data: {
        title: movie.Director.Name,
        content: movie.Director.Bio
      },
      width: '400px'
    });
  }

  openSynopsisDialog(movie: any): void {
    this.dialog.open(InfoBoxComponent, {
      data: {
        title: movie.Title,
        content: movie.Description
      },
      width: '400px'
    });
  }
}
