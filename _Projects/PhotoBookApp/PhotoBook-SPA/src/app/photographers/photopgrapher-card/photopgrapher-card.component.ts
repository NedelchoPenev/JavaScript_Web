import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-photopgrapher-card',
  templateUrl: './photopgrapher-card.component.html',
  styleUrls: ['./photopgrapher-card.component.css']
})
export class PhotopgrapherCardComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit() {
  }

}
