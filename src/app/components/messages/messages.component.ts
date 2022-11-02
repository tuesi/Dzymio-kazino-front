import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend/backend.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  
  messageList: string[] = [];

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.getWheelMessages().subscribe((messages: string[]) => {
      this.messageList = [];
      messages.forEach(message => {
        this.messageList.push(message);
      });
      setTimeout(() => {
        var chatHistory = document.getElementById("chat-box");
        if(chatHistory) {
          console.log("meesage scrol");
          chatHistory.scrollTop = chatHistory.scrollHeight;
        }
      }, 50);
    })
  }
}
