import { Component, OnInit } from '@angular/core';
import { CreateFurnitureModel } from '../models/create-furniture.model';
import { FurnitureService } from '../furniture.service';

@Component({
  selector: 'app-create-furniture',
  templateUrl: './create-furniture.component.html',
  styleUrls: ['./create-furniture.component.css']
})
export class CreateFurnitureComponent implements OnInit {
  furniture: CreateFurnitureModel
  constructor(private furnService: FurnitureService) {
    this.furniture = new CreateFurnitureModel('', '', 0, '', 0, '', '')
  }

  ngOnInit() {
  }

  create() {
    this.furnService.createFurniture(this.furniture).subscribe()
  }
}
