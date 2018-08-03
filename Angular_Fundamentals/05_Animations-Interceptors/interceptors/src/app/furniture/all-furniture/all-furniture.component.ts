import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furniture.service';
import { Observable } from 'rxjs';
import { FurnitureModel } from '../models/furniture.model';

@Component({
  selector: 'app-all-furniture',
  templateUrl: './all-furniture.component.html',
  styleUrls: ['./all-furniture.component.css']
})
export class AllFurnitureComponent implements OnInit {
  furnitures : Observable<FurnitureModel[]>

  constructor(private furnService : FurnitureService) { }

  ngOnInit() {
    this.furnitures = this.furnService.allFurnitures()
  }
}
