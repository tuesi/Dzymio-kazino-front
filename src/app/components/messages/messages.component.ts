import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageObject } from 'src/app/objects/messageObject';
import { MessageShowObject } from 'src/app/objects/messageShowObject';
import { SocketEventObject } from 'src/app/objects/socketEventObject';
import { BackendService } from '../../services/backend/backend.service';

const wheelAvatar = '../../../assets/wheelAvatar.png';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  @Output() loadingComplete = new EventEmitter();

  messageList: MessageShowObject[] = [];

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.listen('clientBetHistory').subscribe((messages) => {
      let wheelMessages = messages as Array<MessageObject>;
      this.messageList = [];
      wheelMessages.forEach(message => {
        var avatar = wheelAvatar;
        if (message.clientId && message.avatar) {
          avatar = "https://cdn.discordapp.com/avatars/" + message.clientId + "/" + message.avatar + ".jpg";
        }
        this.messageList.push(new MessageShowObject(avatar, message.message));
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
