import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/message';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-photographer-messages',
  templateUrl: './photographer-messages.component.html',
  styleUrls: ['./photographer-messages.component.css']
})
export class PhotographerMessagesComponent implements OnInit {
  @Input() recipientId;
  messages: Message[];
  newMessage: any = {};

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.userService
      .getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .subscribe(
        data => {
          this.messages = data;
        },
        err => {
          this.alertify.error(err);
        }
      );
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe((data: Message) => {
        this.messages.unshift(data);
        this.newMessage.content = '';
      }, err => {
        this.alertify.error(err);
      });
  }
}
