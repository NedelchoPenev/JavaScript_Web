import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message';
import { Pagination } from '../models/pagination';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Inbox';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage,
      this.pagination.itemsPerPage, this.messageContainer).subscribe(res => {
        this.messages = res.result;
        this.pagination = res.pagination;
      }, err => {
        this.alertify.error(err);
      });
  }

  deleteMessage(id) {
    this.alertify.confirm('Are you sure you want to delete this message', () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertify.success('Message deleted successfully');
      }, err => {
        this.alertify.error('Failed to delete');
      });
    });
  }

  pageChanged(event) {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
}
