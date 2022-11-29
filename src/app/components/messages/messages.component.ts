import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageModel } from 'src/app/models/message.model';
import { MessageShowModel } from 'src/app/models/messageShow.model';
import { BackendService } from '../../services/backend/backend.service';

const zigabuguleAvatar = '../../../assets/bugule.png';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  @Output() loadingComplete = new EventEmitter();

  messageList: MessageShowModel[] = [];

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.listen('clientBetHistory').subscribe((messages) => {
      let wheelMessages = messages as Array<MessageModel>;
      this.messageList = [];
      wheelMessages.forEach(message => {
        var avatar = zigabuguleAvatar;
        if (message.clientId && message.avatar) {
          avatar = "https://cdn.discordapp.com/avatars/" + message.clientId + "/" + message.avatar + ".jpg";
        }
        this.messageList.push(new MessageShowModel(avatar, message.message));
      });
      setTimeout(() => {
        var chatHistory = document.getElementById("chat-box");
        if (chatHistory) {
          chatHistory.scrollTop = chatHistory.scrollHeight;
          this.loadingComplete.emit('messages');
        }
      }, 50);
    });
  }
}
