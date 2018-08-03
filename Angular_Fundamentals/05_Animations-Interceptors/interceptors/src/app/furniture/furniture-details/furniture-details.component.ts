import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FurnitureModel } from '../models/furniture.model';
import { ActivatedRoute } from '@angular/router';
import { FurnitureService } from '../furniture.service';

@Component({
  selector: 'app-furniture-details',
  templateUrl: './furniture-details.component.html',
  styleUrls: ['./furniture-details.component.css']
})
export class FurnitureDetailsComponent implements OnInit {
  furniture: Observable<FurnitureModel>
  id: string

  constructor(private route: ActivatedRoute, private furnService: FurnitureService) {
    this.id = this.route.snapshot.params['id']
   }

  ngOnInit() {
    this.furniture = this.furnService.getById(this.id)  
  }

}
