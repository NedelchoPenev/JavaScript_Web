import { Component, OnInit } from '@angular/core';
import { MoviesService } from './../service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  popular: Object;
  theaters: Object;
  kids: Object;
  dramas: Object;
  searched: Object;
  submitted : boolean = false;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.moviesService.getInTheaters().subscribe(data => {
      this.theaters = data
    })
    
    this.moviesService.getPopular().subscribe(data => {
      this.popular = data
    })

    this.moviesService.getForKids().subscribe(data => {
      this.kids = data
    })

    this.moviesService.getDramas().subscribe(data => {
      this.dramas = data
    })
  }

  search(name) {
    this.moviesService.findAMovie(name.search).subscribe(data => {
      this.searched = data
      this.submitted = true;
    })
  }
}
