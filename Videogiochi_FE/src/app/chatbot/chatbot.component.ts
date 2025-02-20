import { Component } from '@angular/core';
import { ChatbotService } from '../chatbot.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  imports: [FormsModule, NgForOf, NgClass],
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent {
  userMessage: string = '';
  conversation: { sender: string; text: string }[] = [];

  constructor(private chatbotService: ChatbotService) {}

  sendMessage(): void {
    if (this.userMessage.trim()) {
      this.conversation.push({ sender: 'You', text: this.userMessage });

      this.chatbotService.sendMessage(this.userMessage).subscribe(
        (response) => {
          this.formatResponse(response);
        },
        (error) => {
          console.error('Errore:', error);
          this.conversation.push({
            sender: 'Chatbot',
            text: 'Errore nel server.',
          });
        }
      );

      this.userMessage = '';
    }
  }

  private formatResponse(response: string): void {
    const lines = response.split('\n');
    lines.forEach((line) => {
      this.conversation.push({ sender: 'Chatbot', text: line });
    });
  }
}
