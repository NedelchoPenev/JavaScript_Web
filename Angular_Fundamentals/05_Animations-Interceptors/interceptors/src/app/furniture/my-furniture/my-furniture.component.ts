import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { FurnitureModel } from '../models/furniture.model';
import { FurnitureService } from '../furniture.service';

@Component({
  selector: 'app-my-furniture',
  templateUrl: './my-furniture.component.html',
  styleUrls: ['./my-furniture.component.css']
})
export class MyFurnitureComponent implements OnInit {
  furnitures: Observable<FurnitureModel[]>

  constructor(
    private furnService: FurnitureService, 
    private toastr: ToastrService, 
    private router: Router) { }

  ngOnInit() {
    this.furnitures = this.furnService.myFurnitures()
  }

  deleteItem(id: string) {
    this.furnService.deleteById(id).subscribe(data => {
      this.toastr.success(data['message'], 'Success!')
      this.router.navigate(['furniture/all'])
    })
  }
}
